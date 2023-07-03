import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { AudioProxy } from "../../Proxy/AudioProxy/AudioProxy";
import { BannerAdvertisingProxy } from "../../Proxy/BannerAdvertisingProxy/BannerAdvertisingProxy";
import { RewardedVideoAdvertisingProxy } from "../../Proxy/RewardedVideoAdvertisingProxy/RewardedVideoAdvertisingProxy";

export class RewardedVideoAdvertisingMediator extends BaseMediator{  
    private m_RewardedVideoAdvertisingProxy:RewardedVideoAdvertisingProxy;
    static get MediatorName(){ return "RewardedVideoAdvertisingMediator"; }
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
         
        notificationMap.set(NotificationEnum.RewardedVideoAdvertisingShow,this.RewardedVideoAdvertisingShowHandle.bind(this)); 
    } 

    public onRegister(){
        this.m_RewardedVideoAdvertisingProxy = _Facade.FindProxy(RewardedVideoAdvertisingProxy);//寻找到当前的代理 
    }

    private RewardedVideoAdvertisingShowHandle(path:string){ 
        this.m_RewardedVideoAdvertisingProxy.ShowVideoAD();
    }
}