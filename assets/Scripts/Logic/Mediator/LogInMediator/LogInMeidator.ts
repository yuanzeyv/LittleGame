import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { LoginLayer } from "../../Layer/LoginLayer/LoginLayer";

export class LogInMeidator extends WindowBaseMediator{  
    
    static get MediatorName(){ return "LogInMeidator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.LongInOpen,this.OpenLayer.bind(this))   
        .set(NotificationEnum.SetMusicVolume,this.LayerHandle.bind(this))   
        .set(NotificationEnum.SetEffectVolume,this.LayerHandle.bind(this))   
    }  
    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/LoginLayer/LoginLayer";
    }

    protected InitLayerComponent(): new () => BaseLayer {
        return LoginLayer;
    }   
}