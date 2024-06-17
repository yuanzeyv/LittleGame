import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { MusicControlLayer } from "../../Layer/MusicControlLayer/MusicControlLayer";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
export class MusicControlMediator extends WindowBaseMediator{
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
        notificationMap.set(eNotice.MusicControlLayerOpen,this.OpenLayer.bind(this)); 
        notificationMap.set(eNotice.PlayMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(eNotice.StopMusic,this.LayerHandle.bind(this)); 
        notificationMap.set(eNotice.EffectPlayFinish,this.LayerHandle.bind(this)); 
    } 
  
    protected InitResourcePathSet(resourceSet:Set<string>):void{ 
        resourceSet.add("resources/LayerSource/MusicControlLayer");   
    }  
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/MusicControlLayer/Prefab/MusicControlLayer",layerComp:MusicControlLayer};
    }  

    public InitWindowLayerOrder():eLayerOrder{
        return eLayerOrder.MinBottom;
    } 
    
    protected GetWindowParam():WindowParam{ 
        return {fullScreenBlock:false,bgColor:new Color(0,255,0,0),showLoading:false,closeNotice:eNotice.LoginInClose,windowBlock:false,}; 
    } 
}        