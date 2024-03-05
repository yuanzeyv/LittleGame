import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class"; 
import { MainLayer } from "../../Layer/MainLayer/MainLayer";
import { MainTopLayer } from "../../Layer/MainTopLayer/MainTopLayer";

export class MainTopMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.MainTopLayerOpen,this.OpenLayer.bind(this))
        .set(eNotice.MainTopLayerClose,this.CloseLayer.bind(this)) 
    } 
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{  
        resourceSet.add("resources/LayerSource/MainTopInfoLayer");   
        
    }   
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/MainTopInfoLayer/Prefab/MainTopInfoLayer",layerComp:MainTopLayer}; 
    }  
    
    protected GetWindowParam():{fullScrenMask:boolean,touchClose:boolean,openBg:boolean,bgColor:Color,showLoading:boolean,windowBlock:boolean}{
        return {fullScrenMask:false,touchClose:false,openBg:false,bgColor:new Color(0,255,0,125),showLoading:false,windowBlock:false}; 
    }
      
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Bottom;  
    }  
}  