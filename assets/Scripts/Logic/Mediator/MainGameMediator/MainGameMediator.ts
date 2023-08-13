import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { MainGameLayer } from "../../Layer/MainGameLayer/MainGameLayer";
export class MainGameMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "MainGameMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap 
        .set(NotificationEnum.MainGameOpen,this.OpenLayer.bind(this))
        .set(NotificationEnum.RefreshGamePass,this.LayerHandle.bind(this))
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/MainGameLayer/MainGameLayer";
    }
    protected InitLayerComponent(): new () => BaseLayer {
        return MainGameLayer;
    }   
}