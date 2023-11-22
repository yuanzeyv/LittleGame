import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotificationEnum } from "../../../NotificationTable";
import { MusicControlLayer } from "../../Layer/MusicControlLayer/MusicControlLayer";
import { LayerOrder } from "../../Proxy/WindowProxy/Class";
export class MusicControlMediator extends WindowBaseMediator{
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
        notificationMap.set(eNotificationEnum.MusicControlLayerOpem,this.OpenLayer.bind(this)); 
        notificationMap.set(eNotificationEnum.PlayMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(eNotificationEnum.StopMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(eNotificationEnum.EffectPlayFinish,this.LayerHandle.bind(this)); 
    } 
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/MusicControlLayer/MusicControlLayer",layerConst:MusicControlLayer};
    } 

    public InitWindowLayerOrder():LayerOrder{
        return LayerOrder.MinBottom;
    } 
}  