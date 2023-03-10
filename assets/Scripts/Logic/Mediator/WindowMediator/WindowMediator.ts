import { Prefab,Node, Scene, Director, find } from "cc";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { PrefabLoadStruct, WindowCreateRequest } from "../../Proxy/WindowProxy/Class";
import { WindowProxy } from "../../Proxy/WindowProxy/WindowProxy";

export class WindowMediator extends BaseMediator{  
    m_WindowProxy:WindowProxy;
    m_UINode:Node;
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap.set(NotificationEnum.M_CreateWindow,this.CreateWindowHandle.bind(this));
        notificationMap.set(NotificationEnum.M_CloseWindow,this.RemoveWIndowHandle.bind(this)); 
        notificationMap.set(NotificationEnum.M_PrefabLoadSuccess,this.PrefabLoadSuccessHandle.bind(this));
        notificationMap.set(NotificationEnum.M_PrefabLoadFail,this.PrefabLoadFailHandle.bind(this));
        notificationMap.set(NotificationEnum.M_SetWindowPrefab,this.SetWindowPrefabHandle.bind(this));
    } 
    onRegister(){
        this.m_WindowProxy = _Facade.retrieveProxy(WindowProxy.name);//寻找到当前的代理
        this.m_UINode = find("Canvas/UINode");
    }

    CreateWindowHandle(windowRequest:WindowCreateRequest){ 
        this.m_WindowProxy.CreateWindow(windowRequest);//尝试返回一个窗口给代理，让代理可以继续操作
    }

    RemoveWIndowHandle(mediator:string){//通过mediator的名字进行删除
        this.m_WindowProxy.DeleteWindow(mediator);//尝试返回一个窗口给代理，让代理可以继续操作
    }
  
    PrefabLoadSuccessHandle(loadStruct:PrefabLoadStruct){//通过mediator的名字进行删除
        this.m_WindowProxy.LoadPrefabSuccess(loadStruct); 
    }

    PrefabLoadFailHandle(path:string){//通过mediator的名字进行删除
        this.m_WindowProxy.LoadPrefabFail(path); 
    }
    SetWindowPrefabHandle(prefab:Prefab){
        this.m_WindowProxy.SetWindowPrefab(prefab); 
    }
}