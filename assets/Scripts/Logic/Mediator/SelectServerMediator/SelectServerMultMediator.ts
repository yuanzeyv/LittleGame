import { Color , Node } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowParam, LayerComp } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { MultWindowBaseMediator } from "../../../Frame/BaseMediator/MultWindowBaseMediator";
import { eNotice } from "../../../NotificationTable"; 
import { INotification } from "../../../Frame/PureMVC";
import { MultWindowLayer } from "../../Layer/MultWindowLayer/MultWindowLayer";
export class SelectServerMultMediator extends MultWindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OpenMultChooseServerLayer,this.OpenLayer.bind(this))
        .set(eNotice.ClosMultChooseServerLayer,this.CloseLayer.bind(this))   
        .set(eNotice.AddMultMultChooseServerLayer,this.AddNodeHandle.bind(this))   
    }  

    protected GetWindowParam():WindowParam{ 
        return {fullScreenBlock:true,bgColor:new Color(255,0,0,0),showLoading:true,closeNotice:eNotice.ClosMultBagLayer,windowBlock:false,};
    }  
    
}  
 