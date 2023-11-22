import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { TipsWindowLayer } from "../../Layer/TipsWindowLayer/TipsWindowLayer";
export class TipsWindowMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotificationEnum.TipsWindowLayerOpen,this.OpenLayer.bind(this))
        .set(eNotificationEnum.TipsWindowLayerClose,this.OpenLayer.bind(this))
    }  
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/TipsWindowLayer/TipsWindowLayer",layerConst:TipsWindowLayer};
    } 
} 