import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { FishLoadingLayer } from "../../Layer/FishLoadingLayer/FishLoadingLayer";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";

export class FishLoadingMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "FishLoadingMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.FishLoadingLayerOpen,this.OpenLayer.bind(this))  
    }  
    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/FishLoadingLayer/FishLoadingLayer";
    }

    protected InitLayerComponent(): new () => BaseLayer {
        return FishLoadingLayer;
    }   
}