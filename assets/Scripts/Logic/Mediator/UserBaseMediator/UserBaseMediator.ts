import { Color, Vec2, Widget } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
export class UserBaseMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.UserBaseOpen,this.UserBaseOpenHandle.bind(this)); 
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "Perfab/UserBaseLayer/UserBaseLayer";
    }

    UserBaseOpenHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.Bottom);//创建一个window请求
        windowRequest.SetFullScreenMask(false,false,new Color(255,0,0,255));
        windowRequest.SetWindowTouchMask(true);
        //windowRequest.SetWindowPosition(new Vec2(0,500));
        _Facade.Send(NotificationEnum.M_CreateWindow,windowRequest);//创建一个window请求
    } 
}