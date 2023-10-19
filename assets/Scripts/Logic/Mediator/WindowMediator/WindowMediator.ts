import { Prefab,Node, Scene, Director, find } from "cc";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { PrefabLoadStruct, WindowCreateRequest } from "../../Proxy/WindowProxy/Class";
import { WindowProxy } from "../../Proxy/WindowProxy/WindowProxy";

export class WindowMediator extends BaseMediator{  
    private mWindowProxy:WindowProxy;
    private mUINode:Node;
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
        notificationMap.set(NotificationEnum.CloseWindow,this.RemoveWIndowHandle.bind(this));  
    } 
    
    onRegister(){
        this.mWindowProxy = _Facade.FindProxy(WindowProxy);//寻找到当前的代理
    }

    RemoveWIndowHandle(mediatorName:string){//通过mediator的名字进行删除
        this.mWindowProxy.DeleteWindow(mediatorName);//尝试返回一个窗口给代理，让代理可以继续操作
    } 
}