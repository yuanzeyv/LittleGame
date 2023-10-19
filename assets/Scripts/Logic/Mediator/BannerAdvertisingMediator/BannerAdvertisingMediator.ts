import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { BannerAdvertisingProxy } from "../../Proxy/BannerAdvertisingProxy/BannerAdvertisingProxy";

export class BannerAdvertisingMediator extends BaseMediator{  
    private m_BannerAdvertisingProxy:BannerAdvertisingProxy;
    public RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{ 
         
        notificationMap.set(NotificationEnum.BannerAdvertisingShow,this.BannerAdvertisingShowHandle.bind(this));
        notificationMap.set(NotificationEnum.BannerAdvertisingHide,this.BannerAdvertisingHideHandle.bind(this));
    } 
    public onRegister(){
        this.m_BannerAdvertisingProxy = _Facade.FindProxy(BannerAdvertisingProxy);//寻找到当前的代理 
    }

    private BannerAdvertisingShowHandle(path:string){ 
        this.m_BannerAdvertisingProxy.ShowBanner();
    }
    private BannerAdvertisingHideHandle(){
        this.m_BannerAdvertisingProxy.HideBanner();
    }
}