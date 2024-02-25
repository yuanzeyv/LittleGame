import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
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
        resourceSet.add("resources/Perfab/AnnouncementLayer");  
    } 
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/Perfab/AnnouncementLayer/AnnouncementLayer",layerComp:AnnouncementLayer};
    } 
    
    protected GetWindowParam():{fullScrenMask:boolean,touchClose:boolean,openBg:boolean,bgColor:Color,showLoading:boolean,windowBlock:boolean}{
        return {fullScrenMask:false,touchClose:false,openBg:false,bgColor:new Color(0,0,0,125),showLoading:false,windowBlock:false}; 
    }
      
    public WindowOrder():eLayerOrder{ 
        return eLayerOrder.MaxTop;
    }  
} 