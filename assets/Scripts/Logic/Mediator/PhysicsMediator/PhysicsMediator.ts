import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class"; 
import { PhysicsLayer } from "../../Layer/PhysicsLayer/PhysicsLayer";
import { PhysicsProxy } from "../../Proxy/PhysicsProxy/PhysicsProxy";

export class PhysicsMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.PhysicsLayerOpen,this.OpenLayer.bind(this))
        .set(eNotice.PhysicsLayerClose,this.CloseLayer.bind(this)) 
        .set(eNotice.RefreshOperationInfo,this.LayerHandle.bind(this)) 
        .set(eNotice.RefreshCurrencyInfo,this.LayerHandle.bind(this)) 
        .set(eNotice.AddOperationInfo,this.LayerHandle.bind(this)) 
        .set(eNotice.DelOperationInfo,this.LayerHandle.bind(this)) 
        .set(eNotice.AddPhysicsRigidBody,this.LayerHandle.bind(this)) 
        .set(eNotice.DelPhysicsRigidBody,this.LayerHandle.bind(this)) 
        .set(eNotice.AddPhysicsCollider,this.LayerHandle.bind(this)) 
        .set(eNotice.DelPhysicsCollider,this.LayerHandle.bind(this))
        .set(eNotice.PlayerBaseAttrChange,this.LayerHandle.bind(this))
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