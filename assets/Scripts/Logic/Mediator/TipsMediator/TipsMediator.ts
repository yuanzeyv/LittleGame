import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { TipsLayer } from "../../Layer/TipsLayer/TipsLayer";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";

export class TipsMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.TipsLayerOpen,this.OpenLayer.bind(this))
        .set(eNotice.TipsLayerClose,this.CloseLayer.bind(this))
        .set(eNotice.TipsShow,this.LayerHandle.bind(this));
    }  
      
    protected InitResourcePathSet(resourceSet:Set<string>):void{
        resourceSet.add("resources/LayerSource/TipsLayer");  
    } 
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/TipsLayer/Prefab/TipsLayer",layerComp:TipsLayer};  
    } 
      
    protected GetWindowParam(): WindowParam {
        return {fullScreenBlock:false,bgColor:new Color(0,0,0,125), showLoading: false,closeNotice: eNotice.TipsLayerClose,windowBlock:false,} 
    }
    
    public WindowOrder():eLayerOrder{
        return eLayerOrder.MaxTop; 
    }  
}