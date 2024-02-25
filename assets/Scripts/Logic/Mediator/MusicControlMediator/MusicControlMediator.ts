import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { MusicControlLayer } from "../../Layer/MusicControlLayer/MusicControlLayer";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
export class MusicControlMediator extends WindowBaseMediator{
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
        notificationMap.set(eNotice.MusicControlLayerOpem,this.OpenLayer.bind(this)); 
        notificationMap.set(eNotice.PlayMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(eNotice.StopMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(eNotice.EffectPlayFinish,this.LayerHandle.bind(this)); 
    } 
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/Perfab/MusicControlLayer/MusicControlLayer",layerComp:MusicControlLayer};
    } 

    public InitWindowLayerOrder():eLayerOrder{
        return eLayerOrder.MinBottom;
    } 
}  