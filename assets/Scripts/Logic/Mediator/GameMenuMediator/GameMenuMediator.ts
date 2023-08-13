import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { FishSettingLayer } from "../../Layer/FishSettingLayer/FishSettingLayer";
import { GameMenuLayer } from "../../Layer/GameMenuLayer/GameMenuLayer";
export class GameMenuMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "GameMenuMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.GameMenuLayerOpen,this.OpenLayer.bind(this))
        .set(NotificationEnum.SetEffectVolume,this.LayerHandle.bind(this))
        .set(NotificationEnum.SetMusicVolume,this.LayerHandle.bind(this))
    }  
    
    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/GameMenuLayer/GameMenuLayer";
    }


    protected InitLayerComponent(): new () => BaseLayer {
        return GameMenuLayer;
    }   
}