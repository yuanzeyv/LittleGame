import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { FishMenuLayer } from "../../Layer/FishMenuLayer/FishMenuLayer";

export class FishMenuMediator extends WindowBaseMediator{
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotificationEnum.FishMenuLayerOpen,this.OpenLayer.bind(this))  
    }  
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/FishMenuLayer/FishMenuLayer",layerConst:FishMenuLayer};
    }  
}