import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { TipsWindowLayer } from "../../Layer/TipsWindowLayer/TipsWindowLayer";
export class TipsWindowMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "TipsWindowMediator"; }

    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.TipsWindowLayerOpen,this.OpenLayer.bind(this))
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/TipsWindowLayer/TipsWindowLayer";
    }

    protected InitLayerComponent(): new () => BaseLayer {
        return TipsWindowLayer;
    }  
}