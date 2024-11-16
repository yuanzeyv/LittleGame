import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";   
import { PhysicsBuildingChooseLayer } from "../../Layer/PhysicsBuildingChooseLayer/PhysicsBuildingChooseLayer";
import { PhysicsBuildingInfoLayer } from "../../Layer/PhysicsBuildingInfoLayer/PhysicsBuildingInfoLayer";

export class PhysicsBuildingInfoMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OpenBuildingInfoLayer,this.OpenMultLayer.bind(this))
        .set(eNotice.CloseBuildingInfoLayer,this.CloseLayer.bind(this)) 
    } 
     
    protected InitResourcePathSet(resourceSet:Set<string>):void{  
        resourceSet.add("resources/LayerSource/PhysicsBuildingInfoLayer");    
    }   
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/PhysicsBuildingInfoLayer/Prefab/PhysicsBuildingInfoLayer",layerComp:PhysicsBuildingInfoLayer}; 
    }   
      
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:false,bgColor:new Color(125,125,125,125),showLoading:false,closeNotice:eNotice.CloseBagLayer,windowBlock:false,}; 
    } 
   
    public WindowOrder():eLayerOrder{  
        return eLayerOrder.Top;  
    }     
}  