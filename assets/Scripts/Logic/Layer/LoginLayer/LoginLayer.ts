import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset, EventTouch} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { ListenClick } from '../../../Util/Util';
import { eNetProtocol } from '../../../NetNotification'; 
import { NetProxy } from '../../Proxy/NetProxy/NetProxy'; 
const {ccclass, property, type} = _decorator;

export class LoginLayer extends BaseLayer {  
    private mLoginButton:Node; 
    private mCheckVector:Node; 
    private mAgeButton:Node; 

    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
    } 
    
    InitNode() { 
        this.mLoginButton = find("StartButton",this.node);
        this.mCheckVector = find("ServerVector",this.node); 
        this.mAgeButton = find("ageMin",this.node);
    } 
    
    InitData() {   
        ListenClick(this.mLoginButton,this,this.LoginButtonHandle);  
        ListenClick(this.mCheckVector,this,this.CheckServerListHandle);  
        this.RegisterButtonEvent(this.mAgeButton,this.AgeHandle,this,1,2,3,4,5);    
    } 


    InitLayer() {  
    } 
   
    private CheckServerListHandle(){    
        _Facade.FindProxy(NetProxy).Send(eNetProtocol.QuaryServerList,{}); 
        _Facade.Send(eNotice.TipsShow,"准备登入服务器");
    }    
    private AgeHandle(eventTouch:EventTouch,a,b,c,d){    
        _Facade.Send(eNotice.TipsShow,`准备登入服务器 ${a} ${b} ${c}`);
        _Facade.Send(eNotice.MultPanleOpen,1);
    }    
    
    private LoginButtonHandle(){   
        _Facade.FindProxy(NetProxy).Connect();//准备连接 
        //_Facade.Send(eNotice.TipsShow,"准备登入服务器");
    }  
}   
  