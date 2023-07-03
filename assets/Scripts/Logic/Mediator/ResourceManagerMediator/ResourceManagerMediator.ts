import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { LoadResouceResult } from "../../Proxy/BundleProxy/BundleBase/BundleAsset";
import { ResouceProxy } from "../../Proxy/BundleProxy/ResouceProxy";
export class ResourceManagerMediator extends BaseMediator{  
    static get MediatorName(){ return "ResourceManagerMediator";}
    private m_ResourceProxy:ResouceProxy ;
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap.set(NotificationEnum.AssetLoadSuccess,this.AssetLoadSuccessHandle.bind(this));
        notificationMap.set(NotificationEnum.AssetLoadFail,this.AssetLoadFailHandle.bind(this));  
    } 
    onRegister(){
        this.m_ResourceProxy = _Facade.FindProxy(ResouceProxy);//寻找到当前的代理
    }

    AssetLoadSuccessHandle(result:LoadResouceResult){
        this.m_ResourceProxy.LoadAssetSuccess(result.m_FullPath,result.m_Asset);
    } 
    AssetLoadFailHandle(result:LoadResouceResult){ 
        this.m_ResourceProxy.LoadAssetFail(result.m_FullPath);
    } 
} 