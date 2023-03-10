import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { AudioProxy } from "../../Proxy/AudioProxy/AudioProxy";

export class AudioMediator extends BaseMediator{  
    m_AudioProxy:AudioProxy;
    m_UINode:Node;
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
        notificationMap.set(NotificationEnum.M_PlayAudioEffect,this.PlayAudioEffect.bind(this));
    } 
    onRegister(){
        this.m_AudioProxy = _Facade.retrieveProxy(AudioProxy.name);//寻找到当前的代理 
    }

    PlayAudioEffect(path:string){ 
        this.m_AudioProxy.PlayAudioEffect(path);//尝试返回一个窗口给代理，让代理可以继续操作
    }
}