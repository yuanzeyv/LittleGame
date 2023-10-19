import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { MusicControlLayer } from "../../Layer/MusicControlLayer/MusicControlLayer";
import { LayerOrder } from "../../Proxy/WindowProxy/Class";
export class MusicControlMediator extends WindowBaseMediator{
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
        notificationMap.set(NotificationEnum.MusicControlLayerOpem,this.OpenLayer.bind(this)); 
        notificationMap.set(NotificationEnum.PlayMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(NotificationEnum.StopMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(NotificationEnum.EffectPlayFinish,this.LayerHandle.bind(this)); 
    } 
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/MusicControlLayer/MusicControlLayer",layerConst:MusicControlLayer};
    } 

    public InitWindowLayerOrder():LayerOrder{
        return LayerOrder.MinBottom;
    } 
}  