import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { AudioProxy } from "../../Proxy/AudioProxy/AudioProxy";

export class AudioMediator extends BaseMediator{  
    m_AudioProxy:AudioProxy;
    m_UINode:Node;
    static get MediatorName(){ return "AudioMediator"; }
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
        notificationMap.set(NotificationEnum.PlayAudioEffect,this.PlayAudioEffect.bind(this));
        notificationMap.set(NotificationEnum.PlayMusic,this.PlayMusicHandle.bind(this));
        notificationMap.set(NotificationEnum.SetMusicVolume,this.SetMusicVolumeHandle.bind(this)); 
        notificationMap.set(NotificationEnum.SetEffectVolume,this.SetEffectVolumeHandle.bind(this)); 
    }          
    onRegister(){
        this.m_AudioProxy = _Facade.FindProxy(AudioProxy);//寻找到当前的代理 
    }

    SetMusicVolumeHandle(isOpen:boolean){ 
        this.m_AudioProxy.SetBGVolume(isOpen);//尝试返回一个窗口给代理，让代理可以继续操作
    } 
    SetEffectVolumeHandle(isOpen:boolean){ 
        this.m_AudioProxy.SetEffectVolume(isOpen);//尝试返回一个窗口给代理，让代理可以继续操作
    } 
    PlayAudioEffect(path:string){ 
        this.m_AudioProxy.PlayAudioEffect(path);//尝试返回一个窗口给代理，让代理可以继续操作
    } 
    PlayMusicHandle(path:string){ 
        this.m_AudioProxy.PlayMusic(path);//尝试返回一个窗口给代理，让代理可以继续操作
    }
}