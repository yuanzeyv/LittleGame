import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { TipsLayer } from "../../Layer/TipsLayer/TipsLayer";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";

export class TipsMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "TipsMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.M_TipsOpen,this.OpenLayer.bind(this))
        .set(NotificationEnum.M_TipsShow,this.LayerHandle.bind(this));
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/TipsLayer/TipsLayer";
    }
    protected InitLayerComponent(): new () => BaseLayer {
        return TipsLayer;
    }  
}