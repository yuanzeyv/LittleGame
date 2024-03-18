import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class"; 
import { FightLayer } from "../../Layer/FightLayer/FightLayer";

export class FightLayerMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OpenFightLayer,this.OpenLayer.bind(this))
        .set(eNotice.CloseFightLayer,this.CloseLayer.bind(this)) 
    } 
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{  
        resourceSet.add("resources/LayerSource/FightLayer");    
    }   
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/FightLayer/Prefab/FightLayer",layerComp:FightLayer}; 
    }  
    
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:false,bgColor:new Color(0,255,0,0),showLoading:false,windowBlock:true,}; 
    } 
  
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Top;  
    }   
 
} 