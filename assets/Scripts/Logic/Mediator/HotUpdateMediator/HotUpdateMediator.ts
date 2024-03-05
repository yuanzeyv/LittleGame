import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { TipsLayer } from "../../Layer/TipsLayer/TipsLayer";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
import { LoginLayer } from "../../Layer/LoginLayer/LoginLayer";
import { HotUpdateLayer } from "../../Layer/HotUpdateLayer/HotUpdateLayer";

export class HotUpdateMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.HotUpdateOpen,this.OpenLayer.bind(this))
        .set(eNotice.HotUpdateClose,this.CloseLayer.bind(this)) 
    } 
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{
        resourceSet.add("resources/LayerSource/HotUpdateLayer");  
    }    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/HotUpdateLayer/HotUpdateLayer",layerComp:HotUpdateLayer}; 
    } 
      
    
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:true,bgColor:new Color(0,255,0,0),showLoading:false,closeNotice:eNotice.HotUpdateClose,windowBlock:false,}; 
    } 
      
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Bottom; 
    }  
} 