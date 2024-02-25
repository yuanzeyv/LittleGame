import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { ListenClick } from '../../../Util/Util';
import { NetWorkProxy } from '../../Proxy/NetWorkProxy/NetWorkProxy';
import { eNetProtocol } from '../../../NetNotification'; 
import { NetProxy } from '../../Proxy/NetProxy/NetProxy'; 
import { NATIVE } from 'cc/env';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy'; 
import { LoginProxy } from '../../Proxy/NetProxy/NetObj/LoginProxy';
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
        this.mAgeButton = find("",this.node);
    } 
    
    InitData() {   
        ListenClick(this.mLoginButton,this,this.LoginButtonHandle);  
        ListenClick(this.mCheckVector,this,this.CheckServerListHandle);  
        
    } 


    InitLayer() {  
    } 
   
    private CheckServerListHandle(){    
        _Facade.FindProxy(NetProxy).Send(eNetProtocol.QuaryServerList,{});
        _Facade.Send(eNotice.TipsShow,"准备登入服务器");
    }   
    
    private LoginButtonHandle(){   
        _Facade.FindProxy(NetProxy).Connect();//准备连接
        //_Facade.Send(eNotice.TipsShow,"准备登入服务器");
    }  
}   
  