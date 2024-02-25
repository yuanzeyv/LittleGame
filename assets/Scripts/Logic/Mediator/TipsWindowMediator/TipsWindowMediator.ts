import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { TipsWindowLayer } from "../../Layer/TipsWindowLayer/TipsWindowLayer";
export class TipsWindowMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.TipsWindowLayerOpen,this.OpenLayer.bind(this))
        .set(eNotice.TipsWindowLayerClose,this.OpenLayer.bind(this))
    }  
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/Perfab/TipsWindowLayer/TipsWindowLayer",layerComp:TipsWindowLayer};
    } 
} 