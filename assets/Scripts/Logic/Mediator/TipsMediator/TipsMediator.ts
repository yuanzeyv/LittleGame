import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
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
        resourceSet.add("resources/Perfab/TipsLayer");
        resourceSet.add("resources/LayerSource/Basics");
    } 
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/Perfab/TipsLayer/TipsLayer",layerComp:TipsLayer};
    } 
    
    protected GetWindowParam(): WindowParam {
        return {
            fullScreenBlock:false,
            canTouchClose: false,
            bgColor:new Color(0,0,0,125), 
            showLoading: false,
            windowBlock:false,
            closeNotice: eNotice.TipsLayerClose
        } 
    }
    public WindowOrder():eLayerOrder{
        return eLayerOrder.MaxTop;
    }  
}