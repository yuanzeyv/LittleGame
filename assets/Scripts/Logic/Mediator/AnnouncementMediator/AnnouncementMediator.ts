import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { AnnouncementLayer } from "../../Layer/AnnouncementLayer/AnnouncementLayer";

export class AnnouncementMediator extends WindowBaseMediator{ 
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.AnnouncementOpen,this.OpenLayer.bind(this))
        .set(eNotice.AnnouncementShow,this.LayerHandle.bind(this));
    }  

    protected InitResourcePathSet(resourceSet:Set<string>):void{
        resourceSet.add("resources/LayerSource/AnnouncementLayer");  
    }  
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/AnnouncementLayer/Prefab/AnnouncementLayer",layerComp:AnnouncementLayer}; 
    } 
      
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:false,bgColor:new Color(0,255,0,141),showLoading:false,windowBlock:false,}; 
    } 

    public WindowOrder():eLayerOrder{ 
        return eLayerOrder.MaxTop; 
    }  
} 