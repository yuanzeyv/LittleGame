import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
import { LoginLayer } from "../../Layer/LoginLayer/LoginLayer";
import { PhysicsLayer } from "../../Layer/PhysicsLayer/PhysicsLayer";
import { PhysicsProxy } from "../../Proxy/PhysicsProxy/PhysicsProxy";

export class PhysicsMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.PhysicsLayerOpen,this.OpenLayer.bind(this))
        .set(eNotice.PhysicsLayerClose,this.CloseLayer.bind(this)) 
        .set(eNotice.PlayerDie,this.LayerHandle.bind(this)) 
    }  
    protected OpenLayer(data: any): void { 
        super.OpenLayer(data);
    }
    
    
    protected CreateNodePool():void{
        _Facade.FindProxy(PhysicsProxy).InitPrefabArray();
    }

    protected InitResourcePathSet(resourceSet:Set<string>):void{ 
        resourceSet.add("resources/LayerSource/PhysicsLayer");   
    }  
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/PhysicsLayer/Prefab/PhysicsLayer",layerComp:PhysicsLayer};
    }  
     
    protected GetWindowParam():WindowParam{  
        return {fullScreenBlock:false,bgColor:new Color(0,255,0,0),showLoading:true,closeNotice:eNotice.LoginInClose,windowBlock:false,}; 
    } 
    
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Bottom;  
    }  
}    