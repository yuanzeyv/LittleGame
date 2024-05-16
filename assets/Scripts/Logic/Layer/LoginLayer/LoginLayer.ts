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
    private mSelectMeshLabel:TextMeshLabel; 
    private mWorld:Physics.World;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.RefreshSelectServer,this.RefreshSelectServerHandle.bind(this)) 
    } 

    InitNode() { 
        this.mLoginButton = find("StartButton",this.node);
        this.mCheckVector = find("ServerVector",this.node); 
        this.mAgeButton = find("ageMin",this.node);
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
  
    protected update(dt: number): void {  
        if( this.mWorld == undefined) 
            return ;
        this.mWorld.step();
         
        let data = this.mWorld.debugRender();
        const g = find("Graphics",this.node).getComponent(Graphics);
        g.clear();    
        for(let i = 0; i < data.vertices.length ; i+=4){
            g.fillColor = new Color(data.colors[i],data.colors[i + 1],data.colors[ i + 2 ],data.colors[i + 3]); 
            g.moveTo(data.vertices[i] ,data.vertices[i+1] * 50);
            g.lineTo(data.vertices[i + 2],data.vertices[i+31] * 50);
        }
        g.stroke();     

        this.mWorld.forEachRigidBody((rigidBody:RAPIER.RigidBody)=>{
            let vector:RAPIER.Vector = rigidBody.translation();
            console.log(`${rigidBody.userData}刚体的坐标:${vector.x}  ${vector.y}`);
            find("Box",this.node).setPosition(vector.x,vector.y * 10 );
        });      
    }
    
    InitData() {   
        this.RegisterButtonEvent(this.mLoginButton,this.LoginButtonHandle,this);  
        this.RegisterButtonEvent(this.mCheckVector,this.CheckServerListHandle,this);  
        this.RegisterButtonEvent(this.mAgeButton,this.AgeHandle,this,1,2,3,4,5);    
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
    
    private LoginButtonHandle(eventTouch:EventTouch){ 
        let selectServer:IServerInfoItem = _Facade.FindProxy(LoginProxy).GetSelectServer();
        if(selectServer == undefined){
            _Facade.Send(eNotice.TipsShow,`未选择登陆服务器`);
            return;
        } 
        _Facade.FindProxy(LoginProxy).CS_GateVirifyLogin("123456","123456",selectServer.serverName);
        //_Facade.FindProxy(NetProxy).Connect();//准备连接  
    }  

    private RefreshSelectServerHandle(eventTouch:EventTouch){    
        let selectServer:IServerInfoItem|undefined = _Facade.FindProxy(LoginProxy).GetSelectServer();
        this.mSelectMeshLabel.string = "请选择服务器";
        if(selectServer != undefined) 
            this.mSelectMeshLabel.string = selectServer.serverName;
    }  
}   