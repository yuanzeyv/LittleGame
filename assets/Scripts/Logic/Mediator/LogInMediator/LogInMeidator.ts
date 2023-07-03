import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";

export class LogInMeidator extends WindowBaseMediator{  
    
    static get MediatorName(){ return "LogInMeidator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.LongInOpen,this.LogInOpenHandle.bind(this))   
        .set(NotificationEnum.SetMusicVolume,this.LayerHandle.bind(this))   
        .set(NotificationEnum.SetEffectVolume,this.LayerHandle.bind(this))   
    }  
    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/LoginLayer/LoginLayer";
    }

    LogInOpenHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.MinBottom);//创建一个window请求
        windowRequest.SetFullScreenMask(true,false,new Color(0,128,25,255));
        windowRequest.SetWindowTouchMask(true);
        _Facade.Send(NotificationEnum.CreateWindow,windowRequest);//创建一个window请求
    }  
}