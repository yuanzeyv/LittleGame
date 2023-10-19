import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { AnnouncementLayer } from "../../Layer/AnnouncementLayer/AnnouncementLayer";
import { CheckFishPetLayer } from "../../Layer/CheckFishPetLayer/CheckFishPetLayer";
import { WindowProxy } from "../../Proxy/WindowProxy/WindowProxy";

export class CheckFishPetLayerMediator extends WindowBaseMediator{
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.FishChoosePetsLayerOpen,this.OpenLayer.bind(this))
        .set(NotificationEnum.FishChoosePetsLayerClose,this.CloseLayer.bind(this))
    }  
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:  "resources/Perfab/FishChoosePetsLayer/FishChoosePetsLayer" ,layerConst: CheckFishPetLayer}
    } 
 
    protected CloseLayer(){
        _Facade.FindProxy(WindowProxy).DeleteWindow(this.getMediatorName()) ;
    }

}