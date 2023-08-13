import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { AnnouncementLayer } from "../../Layer/AnnouncementLayer/AnnouncementLayer";

export class AnnouncementMediator extends WindowBaseMediator{
    static get MediatorName(){ return "AnnouncementMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.AnnouncementOpen,this.OpenLayer.bind(this))
        .set(NotificationEnum.AnnouncementShow,this.LayerHandle.bind(this));
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/AnnouncementLayer/AnnouncementLayer";
    }
    protected InitLayerComponent(): new () => BaseLayer {
        return AnnouncementLayer;
    }   
}