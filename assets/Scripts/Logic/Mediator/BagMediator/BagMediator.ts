import { Color,Node } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";  
import { BagLayer } from "../../Layer/BagLayer/BagLayer";
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { BundleProxy, ListenObj, LoadStruct } from "../../Proxy/BundleProxy/BundleProxy";
import { ePoolDefine } from "../../Proxy/PoolProxy/PoolDefine";
import { PoolProxy } from "../../Proxy/PoolProxy/PoolProxy";
import { WindowProxy } from "../../Proxy/WindowProxy/WindowProxy";

export class BagMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OpenBagLayer,this.OpenMultLayer.bind(this))
        .set(eNotice.CloseBagLayer,this.CloseLayer.bind(this)) 
    } 
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{  
        resourceSet.add("resources/LayerSource/BagLayer");    
    }   
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/BagLayer/Prefab/BagLayer",layerComp:BagLayer}; 
    }   
    
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:false,bgColor:new Color(125,125,125,125),showLoading:false,closeNotice:eNotice.CloseBagLayer,windowBlock:false,}; 
    } 
   
    public WindowOrder():eLayerOrder{ 
        return eLayerOrder.Top;  
    }    
 
}  
 