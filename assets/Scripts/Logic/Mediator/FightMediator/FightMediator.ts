import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { AnnouncementLayer } from "../../Layer/AnnouncementLayer/AnnouncementLayer";
import { FightLayer } from "../../Layer/FightLayer/FightLayer";

export class FightMediator extends WindowBaseMediator{ 
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotificationEnum.FightLayerOpen,this.OpenLayer.bind(this)) 
    }  

    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:  "resources/Perfab/FishChoosePetsLayer/FishChoosePetsLayer" ,layerConst: FightLayer}
    } 
} 