import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { TipsPassWinLayer } from "../../Layer/TipsPassWinLayer/TipsPassWinLayer";
export class TipsPassWinMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "TipsPassWinMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.TipsPassWinLayerOpen,this.OpenLayer.bind(this))
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/TipsPassWinLayer/TipsPassWinLayer";
    } 
    protected InitLayerComponent(): new () => BaseLayer {
        return TipsPassWinLayer;
    }  
}