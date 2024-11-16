import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowParam, LayerComp } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { MultWindowBaseMediator } from "../../../Frame/BaseMediator/MultWindowBaseMediator";
import { eNotice } from "../../../NotificationTable";
import { MultWindowLayer } from "../../Layer/MultWindowLayer/MultWindowLayer";
import { INotification } from "../../../Frame/PureMVC";
export class BuildingChooseMultMediator extends MultWindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OpenMultBuildingChooseLayer,this.OpenLayer.bind(this))
        .set(eNotice.CloseMultBuildingChooseLayer,this.CloseLayer.bind(this))   
        .set(eNotice.AddMultBuildingChooseLayer,this.AddNodeHandle.bind(this))   
    } 

    protected GetWindowParam():WindowParam{ 
        return {fullScreenBlock:true,bgColor:new Color(255,0,0,0),showLoading:true,closeNotice:eNotice.CloseMultBuildingChooseLayer,windowBlock:false,};
    }  
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{    
        resourceSet.add("resources/LayerSource/MultWindowLayer");    
    } 
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/MultWindowLayer/Prefab/MultWindowLayer",layerComp:MultWindowLayer}; 
    }  
}  