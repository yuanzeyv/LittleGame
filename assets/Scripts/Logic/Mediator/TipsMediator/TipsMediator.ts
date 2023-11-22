import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotificationEnum } from "../../../NotificationTable";
import { TipsLayer } from "../../Layer/TipsLayer/TipsLayer";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";

export class TipsMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotificationEnum.TipsLayerOpen,this.OpenLayer.bind(this))
        .set(eNotificationEnum.TipsShow,this.LayerHandle.bind(this));
    }  
     
    protected InitResourcePathSet(resourceSet:Set<string>):void{
        resourceSet.add("resources/Perfab/TipsLayer");
    } 
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/TipsLayer/TipsLayer",layerConst:TipsLayer};
    } 
    
    protected GetWindowParam():{fullScrenMask:boolean,touchClose:boolean,openBg:boolean,bgColor:Color,showLoading:boolean,windowBlock:boolean}{
        return {fullScrenMask:false,touchClose:false,openBg:false,bgColor:new Color(0,255,0,125),showLoading:false,windowBlock:false}; 
    }
      
    public WindowOrder():LayerOrder{
        return LayerOrder.MaxTop;
    }  
}