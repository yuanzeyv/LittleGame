import { Prefab,Node, Scene, Director, find } from "cc";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { PrefabLoadStruct, WindowCreateRequest } from "../../Proxy/WindowProxy/Class";
import { WindowProxy } from "../../Proxy/WindowProxy/WindowProxy";

export class WindowMediator extends BaseMediator{  
    m_WindowProxy:WindowProxy;
    m_UINode:Node;
    static get MediatorName(){ return "WindowMediator"; }
    
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap.set(NotificationEnum.CreateWindow,this.CreateWindowHandle.bind(this));
        notificationMap.set(NotificationEnum.CloseWindow,this.RemoveWIndowHandle.bind(this));  
    } 
    onRegister(){
        this.m_WindowProxy = _Facade.FindProxy(WindowProxy);//寻找到当前的代理
        this.m_UINode = find("Canvas/UINode");
    }

    CreateWindowHandle(windowRequest:WindowCreateRequest){ 
        this.m_WindowProxy.CreateWindow(windowRequest);//尝试返回一个窗口给代理，让代理可以继续操作
    }

    RemoveWIndowHandle(mediatorName:string){//通过mediator的名字进行删除
        this.m_WindowProxy.DeleteWindow(mediatorName);//尝试返回一个窗口给代理，让代理可以继续操作
    } 
}