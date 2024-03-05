import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable"; 
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
import { LoginLayer } from "../../Layer/LoginLayer/LoginLayer";

export class SelectLoginServerLayerMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.SelectLoginServerLayerOpen,this.OpenLayer.bind(this))
    }  
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{
        resourceSet.add("resources/Perfab/LoginLayer");
        resourceSet.add("resources/LayerSource/LoginLayer");
    }  

    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/Perfab/LoginLayer/LoginLayer",layerComp:LoginLayer};
    } 
     
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:false,bgColor:new Color(0,255,0,0),showLoading:false,windowBlock:false,}; 
    } 
      
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Bottom; 
    }  
} 