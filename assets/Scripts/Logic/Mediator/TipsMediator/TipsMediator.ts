import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { TipsLayer } from "../../Layer/TipsLayer/TipsLayer";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";

export class TipsMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.M_TipsOpen,this.OpenLayer.bind(this))
        .set(NotificationEnum.M_TipsShow,this.LayerHandle.bind(this));
    }  
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/TipsLayer/TipsLayer",layerConst:TipsLayer};
    } 
    
    public InitWindowLayerOrder():LayerOrder{
        return LayerOrder.MaxTop;
    } 
}