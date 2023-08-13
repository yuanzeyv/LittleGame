import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { AudioProxy } from "../../Proxy/AudioProxy/AudioProxy";
import { BannerAdvertisingProxy } from "../../Proxy/BannerAdvertisingProxy/BannerAdvertisingProxy";
import { InterstitialAdvertisingProxy } from "../../Proxy/InterstitialAdvertisingProxy/InterstitialAdvertisingProxy";
import { RewardedVideoAdvertisingProxy } from "../../Proxy/RewardedVideoAdvertisingProxy/RewardedVideoAdvertisingProxy";

export class InterstitialAdvertisingMediator extends BaseMediator{  
    private m_InterstitialAdvertisingProxy:InterstitialAdvertisingProxy;
    static get MediatorName(){ return "InterstitialAdvertisingMediator"; }
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
         
        notificationMap.set(NotificationEnum.InterstitialAdvertisingShow,this.InterstitialAdvertisingShowHandle.bind(this)); 
    } 
    
    public onRegister(){
        this.m_InterstitialAdvertisingProxy = _Facade.FindProxy(InterstitialAdvertisingProxy);//寻找到当前的代理 
    } 
    
    private InterstitialAdvertisingShowHandle(path:string){ 
        this.m_InterstitialAdvertisingProxy.ShowIntersitialAD();
    }
}