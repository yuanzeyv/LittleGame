import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class"; 
import { MainLayer } from "../../Layer/MainLayer/MainLayer";
import { BottomMenuLayer } from "../../Layer/BottomMenuLayer/BottomMenuLayer";
import { PoolProxy } from "../../Proxy/PoolProxy/PoolProxy";
import { ePoolDefine } from "../../Proxy/PoolProxy/PoolDefine";
import { BottomMenuCellPool } from "./NodePool/BottomMenuCellPool";

export class BottomMenuMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OpenBottomMenuLayer,this.OpenLayer.bind(this))
        .set(eNotice.CloseBottomMenuLayer,this.CloseLayer.bind(this)) 
    } 
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{  
        resourceSet.add("resources/LayerSource/BottomMenuLayer");    
    }   
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/BottomMenuLayer/Prefab/BottomMenuLayer",layerComp:BottomMenuLayer}; 
    }  
    
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:true,bgColor:new Color(0,255,0,0),showLoading:false,closeNotice:eNotice.CloseBottomMenuLayer,windowBlock:false,}; 
    } 
  
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Bottom;  
    }   

    protected CreateNodePool():void{
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.ButtomMenuCell,new BottomMenuCellPool("LayerSource/BottomMenuLayer/Prefab/ItemCell"));
    } 
} 