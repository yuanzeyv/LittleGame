import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { FishSettingLayer } from "../../Layer/FishSettingLayer/FishSettingLayer";
import { HelpWindowLayer } from "../../Layer/HelpWindowLayer/HelpWindowLayer";
export class HelpWindowMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.HelpWindowLayerOpen,this.OpenLayer.bind(this))
        .set(eNotice.HelpWindowLayerClose,this.CloseLayer.bind(this))
    }  
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/HelpWindowLayer/HelpWindowLayer",layerConst:HelpWindowLayer};
    }  
}