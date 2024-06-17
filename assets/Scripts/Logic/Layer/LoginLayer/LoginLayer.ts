import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset, EventTouch, Graphics, math} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { eNetProtocol } from '../../../NetNotification'; 
import { NetProxy } from '../../Proxy/NetProxy/NetProxy'; 
import { IServerInfoItem, LoginProxy } from '../../Proxy/LoginProxy/LoginProxy';
import { GetTextMeshComp } from '../../../Util/Util';
import { TextMeshLabel } from '../../../../../extensions/TextMesh Pro/assets/TextMesh';
import  Physics from '@dimforge/rapier2d-compat';
const {ccclass, property, type} = _decorator;
@ccclass('LoginLayer') 
export class LoginLayer extends BaseLayer {    
    private mLoginButton:Node; 
    private mCheckVector:Node; 
    private mAgeButton:Node;  
    private mPhysicsButton:Node;  
    private mSelectMeshLabel:TextMeshLabel; 
    private mWorld:Physics.World;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.RefreshSelectServer,this.RefreshSelectServerHandle.bind(this)) 
    } 

    InitNode() { 
        this.mLoginButton = find("StartButton",this.node);
        this.mCheckVector = find("ServerVector",this.node); 
        this.mAgeButton = find("ageMin",this.node);
        this.mPhysicsButton = find("PhysicsButton",this.node);
        this.mSelectMeshLabel = GetTextMeshComp(find("ServerVector/ServerNameLabel",this.node))
        
        Physics.init().then(()=>{
            this.mWorld = new Physics.World({x:0,y:-9.81});  
            // Create the ground
            let groundColliderDesc = Physics.ColliderDesc.cuboid(10.0, 0.1);
            this.mWorld.createCollider(groundColliderDesc);
            // Create a dynamic rigid-body.
            let rigidBodyDesc = Physics.RigidBodyDesc.dynamic()
                    .setTranslation(0.0,20.0); 
            let rigidBody = this.mWorld.createRigidBody(rigidBodyDesc);
            rigidBody.applyImpulse(new Physics.Vector2(0,10),true);
            // Create a cuboid collider attached to the dynamic rigidBody.
            let colliderDesc = Physics.ColliderDesc.cuboid(0.5, 0.5);
            let collider = this.mWorld.createCollider(colliderDesc, rigidBody);
        });     
    }  
        
    InitData() {   
        this.RegisterButtonEvent(this.mLoginButton,this.LoginButtonHandle,this);  
        this.RegisterButtonEvent(this.mCheckVector,this.CheckServerListHandle,this);  
        this.RegisterButtonEvent(this.mAgeButton,this.AgeHandle,this,1,2,3,4,5);    
        this.RegisterButtonEvent(this.mPhysicsButton,this.PhysicsLayerOpenHandle,this,1,2,3,4,5);    

    } 


    InitLayer() {  
    } 
   
    private CheckServerListHandle(eventTouch:EventTouch){    
        _Facade.Send(eNotice.MultPanleOpen,11);   
//        _Facade.FindProxy(NetProxy).Send(eNetProtocol.QuaryServerList,{}); 
        //_Facade.Send(eNotice.TipsShow,"准备登入服务器");
    }    
    private AgeHandle(eventTouch:EventTouch,a,b,c,d){    
        _Facade.Send(eNotice.TipsShow,`准备登入服务器 ${a} ${b} ${c}`);
        _Facade.Send(eNotice.MultPanleOpen,2);
    }    
    private PhysicsLayerOpenHandle(eventTouch:EventTouch,a,b,c,d){    
        _Facade.Send(eNotice.PhysicsLayerOpen,2);
    }     
      
    private LoginButtonHandle(eventTouch:EventTouch){ 
        _Facade.Send(eNotice.CheatPokerLayerOpen);
        //let selectServer:IServerInfoItem = _Facade.FindProxy(LoginProxy).GetSelectServer();
        //if(selectServer == undefined){
        //    _Facade.Send(eNotice.TipsShow,`未选择登陆服务器`);
        //    return;
        //} 
        //_Facade.FindProxy(LoginProxy).CS_GateVirifyLogin("123456","123456",selectServer.serverName);
        //_Facade.FindProxy(NetProxy).Connect();//准备连接  
    }  

    private RefreshSelectServerHandle(eventTouch:EventTouch){    
        let selectServer:IServerInfoItem|undefined = _Facade.FindProxy(LoginProxy).GetSelectServer();
        this.mSelectMeshLabel.string = "请选择服务器";
        if(selectServer != undefined) 
            this.mSelectMeshLabel.string = selectServer.serverName;
    }  
}   