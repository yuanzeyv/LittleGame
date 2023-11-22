import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { FishLoadingLayer } from "../../Layer/FishLoadingLayer/FishLoadingLayer";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";

export class FishLoadingMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotificationEnum.FishLoadingLayerOpen,this.OpenLayer.bind(this))  
        .set(eNotificationEnum.FishLoadingLayerClose,this.CloseLayer.bind(this))  
    }  
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"LayerSource/FishLoadingLayer",layerConst: FishLoadingLayer}
    }  
} 