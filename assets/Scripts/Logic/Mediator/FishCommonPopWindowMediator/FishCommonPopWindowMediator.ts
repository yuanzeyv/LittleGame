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
    static get MediatorName(){ return "FishCommonPopWindowMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.FishCommonLayerOpen,this.OpenLayer.bind(this))  
    }  
    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/FishCommonPopWindowLayer/FishCommonPopWindowLayer";
    }
    protected InitLayerComponent(): new () => BaseLayer {
        return FishCommonPopWindowLayer;
    }   
}