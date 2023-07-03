import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
export class MainGameMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "MainGameMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap 
        .set(NotificationEnum.MainGameOpen,this.MainGameOpenHandle.bind(this))
        .set(NotificationEnum.RefreshGamePass,this.LayerHandle.bind(this))
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/MainGameLayer/MainGameLayer";
    }

    MainGameOpenHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.Float);//创建一个window请求
        windowRequest.SetFullScreenMask(true,true,new Color(0,0,0,0));
        windowRequest.SetWindowTouchMask(true);
        _Facade.Send(NotificationEnum.CreateWindow,windowRequest);//创建一个window请求
    } 
}