import { Color } from "cc";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";
import { LoginLayer } from "../../Layer/LoginLayer/LoginLayer";

export class LoginMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.LongInOpen,this.OpenLayer.bind(this))
        .set(eNotice.LoginInClose,this.CloseLayer.bind(this)) 
    }
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{ 
        resourceSet.add("resources/LayerSource/LoginLayer");   
    }  
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/LoginLayer/Prefab/LoginLayer",layerComp:LoginLayer};
    }  
     
    protected GetWindowParam():WindowParam{ 
        return {fullScreenBlock:false,bgColor:new Color(0,255,0,0),showLoading:true,closeNotice:eNotice.LoginInClose,windowBlock:false,}; 
    } 
    
    public WindowOrder():eLayerOrder{
        return eLayerOrder.Bottom;  
    }  
}  