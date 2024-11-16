import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
import { OnlyTheBraveLayer } from "../../Layer/OnlyTheBraveLayer/OnlyTheBraveLayer";

export class OnlyTheBraveMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OnlyTheBraveOpen,this.OpenLayer.bind(this))
        .set(eNotice.OnlyTheBraveClose,this.CloseLayer.bind(this))  
        .set(eNotice.OnlyTheBravePhysicsRigidBodyEnterView,this.LayerHandle.bind(this))  
        .set(eNotice.OnlyTheBravePhysicsRigidBodyLeaveView,this.LayerHandle.bind(this))  
    }  
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{ 
        resourceSet.add("resources/LayerSource/OnlyTheBraveLayer");   
    }  
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/OnlyTheBraveLayer/Prefab/OnlyTheBraveLayer",layerComp:OnlyTheBraveLayer};
    }  
      
    protected GetWindowParam():WindowParam{ 
        return {fullScreenBlock:false,bgColor:new Color(0,255,0,0),showLoading:true,closeNotice:eNotice.OnlyTheBraveClose,windowBlock:false,}; 
    } 
    
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Bottom;  
    }  
}  