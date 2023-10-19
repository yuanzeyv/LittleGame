import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { FishSettingLayer } from "../../Layer/FishSettingLayer/FishSettingLayer";
import { FishCommonPopWindowLayer } from "../../Layer/FishCommonPopWindowLayer/FishCommonPopWindowLayer";

export class FishCommonPopWindowMediator extends WindowBaseMediator{
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.FishCommonLayerOpen,this.OpenLayer.bind(this))  
        .set(NotificationEnum.FishCommonLayerClose,this.CloseLayer.bind(this))  
    
}  

    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/FishCommonPopWindowLayer/FishCommonPopWindowLayer" ,layerConst: FishCommonPopWindowLayer}
    } 
}