import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { BannerAdvertisingProxy } from "../../Proxy/BannerAdvertisingProxy/BannerAdvertisingProxy";
import { RewardedVideoAdvertisingProxy } from "../../Proxy/RewardedVideoAdvertisingProxy/RewardedVideoAdvertisingProxy";

export class RewardedVideoAdvertisingMediator extends BaseMediator{  
    private m_RewardedVideoAdvertisingProxy:RewardedVideoAdvertisingProxy;
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
         
        notificationMap.set(eNotice.RewardedVideoAdvertisingShow,this.RewardedVideoAdvertisingShowHandle.bind(this)); 
    } 

    public onRegister(){
        this.m_RewardedVideoAdvertisingProxy = _Facade.FindProxy(RewardedVideoAdvertisingProxy);//寻找到当前的代理 
    }

    private RewardedVideoAdvertisingShowHandle(path:string){ 
        this.m_RewardedVideoAdvertisingProxy.ShowVideoAD();
    }
}