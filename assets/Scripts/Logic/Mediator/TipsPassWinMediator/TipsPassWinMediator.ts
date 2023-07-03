import { Color } from "cc"; 
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { WindowCreateRequest, LayerOrder } from "../../Proxy/WindowProxy/Class";
export class TipsPassWinMediator extends WindowBaseMediator{  
    static get MediatorName(){ return "TipsPassWinMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.TipsPassWinLayerOpen,this.OpenLayerHandle.bind(this))
    }  

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/TipsPassWinLayer/TipsPassWinLayer";
    } 
    OpenLayerHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.Top);//创建一个window请求
        windowRequest.SetFullScreenMask(true,true,new Color(0,0,0,125 )); 
        windowRequest.SetWindowTouchMask(true);
        _Facade.Send(NotificationEnum.CreateWindow,windowRequest);//创建一个window请求
    }  
}