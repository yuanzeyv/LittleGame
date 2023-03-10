import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
export class PlayerMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.PlayerLayerOpen,this.PlayerLayerOpenHandle.bind(this))
        .set(NotificationEnum.PlayerLayerClose,this.PlayerLayerCloseHandle.bind(this))
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "Perfab/PlayerLayer/PlayerLayer";
    }

    PlayerLayerOpenHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.Normal);//创建一个window请求
        windowRequest.SetFullScreenMask(false,false,new Color(255,0,0,250));
        windowRequest.SetWindowTouchMask(true);
        _Facade.Send(NotificationEnum.M_CreateWindow,windowRequest);//创建一个window请求
    } 
    PlayerLayerCloseHandle(data:any){   
        if(!this.ExistWindow) return;//存在的话直接进行返回 
        _Facade.Send(NotificationEnum.M_CloseWindow,this.mediatorName);
    } 
}