import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";

export class LogInMeidator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.M_LongInOpen,this.LogInOpenHandle.bind(this)) 
        .set(NotificationEnum.NetStartConnect,this.LayerHandle.bind(this))//网络开始连接时的返回
        .set(NotificationEnum.NetConnectSuccess,this.LayerHandle.bind(this))//网络连接成功时的返回
        .set(NotificationEnum.NetConnectFail,this.LayerHandle.bind(this))//网络连接失败时的返回
        .set(NotificationEnum.NetAuthSuccess,this.LayerHandle.bind(this))//验证成功时的返回
        .set(NotificationEnum.NetAuthFail,this.LayerHandle.bind(this))//验证失败时的返回
        .set(NotificationEnum.NetStartAuth,this.LayerHandle.bind(this))//验证失败时的返回

        
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "Perfab/LoginLayer/LoginLayer";
    }

    LogInOpenHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.MinBottom);//创建一个window请求
        windowRequest.SetFullScreenMask(true,true,new Color(0,128,25,255));
        windowRequest.SetWindowTouchMask(true);
        _Facade.Send(NotificationEnum.M_CreateWindow,windowRequest);//创建一个window请求
    } 
}