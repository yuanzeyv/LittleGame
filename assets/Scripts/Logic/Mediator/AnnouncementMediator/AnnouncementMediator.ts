import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";

export class AnnouncementMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.M_AnnouncementOpen,this.AnnouncementOpenHandle.bind(this))
        .set(NotificationEnum.M_AnnouncementShow,this.LayerHandle.bind(this));
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "Perfab/AnnouncementLayer/AnnouncementLayer";
    }

    AnnouncementOpenHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.MaxTop);//创建一个window请求
        _Facade.Send(NotificationEnum.M_CreateWindow,windowRequest);//创建一个window请求
    } 
}