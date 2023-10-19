import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { AnnouncementLayer } from "../../Layer/AnnouncementLayer/AnnouncementLayer";

export class AnnouncementMediator extends WindowBaseMediator{ 
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.AnnouncementOpen,this.OpenLayer.bind(this))
        .set(NotificationEnum.AnnouncementShow,this.LayerHandle.bind(this));
    }  

    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path: "resources/Perfab/AnnouncementLayer/AnnouncementLayer",layerConst: AnnouncementLayer}
    } 
}