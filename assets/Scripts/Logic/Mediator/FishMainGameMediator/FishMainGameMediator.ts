import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { FishMenuLayer } from "../../Layer/FishMenuLayer/FishMenuLayer";
import { FishMainGameLayer } from "../../Layer/FishMainGameLayer/FishMainGameLayer";
import { FishMainProxy } from "../../Proxy/FishMainProxy/FishMainProxy";

export class FishMainGameMediator extends WindowBaseMediator{ 
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.FishMainGameLayerOpen,this.OpenLayer.bind(this))  
        .set(eNotice.GenerateFish,this.GenerateFishHandle.bind(this)) //添加一个小鱼
    }  
    protected InitPrefabInfo(): { path: string; layerConst: new () => BaseLayer;} {
        return { path:"resources/Perfab/FishMainGameLayer/FishMainGameLayer",layerConst:FishMainGameLayer}
    }  
    protected GenerateFishHandle(data: any, notification: eNotice): void { 
        _Facade.FindProxy(FishMainProxy).GenerateFish();
    }   
} 