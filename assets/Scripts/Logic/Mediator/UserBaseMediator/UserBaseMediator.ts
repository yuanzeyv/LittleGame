import { Color, Vec2, Widget } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { UserBaseLayer } from "../../Layer/UserBaseLayer/UserBaseLayer";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
export class UserBaseMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "UserBaseMediator"; }

    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.UserBaseOpen,this.OpenLayer.bind(this)); 
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/UserBaseLayer/UserBaseLayer";
    }

    protected InitLayerComponent(): new () => BaseLayer {
        return UserBaseLayer;
    }  
}