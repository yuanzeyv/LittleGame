import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { eNotificationEnum } from "../../NotificationTable";
import { BundleProxy, ListenObj, LoadID, LoadStruct } from "../Proxy/BundleProxy/BundleProxy";
import { WindowProxy } from "../Proxy/WindowProxy/WindowProxy";
import { Prefab } from "cc";

export class InitGameDataCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        let bundleProxy:BundleProxy = _Facade.FindProxy(BundleProxy);
        let loadID:LoadID = bundleProxy.LoadDirs([{bundleName:"resources",dirName:"LayerSource/Basics"}]);//加载基础资源信息
        bundleProxy.RegisterListen(new ListenObj(loadID,this.FinishResourceHandle.bind(this),this.PorgressResourceHandle.bind(this)));

    } 
    private PorgressResourceHandle(loadStruct:LoadStruct){ 
        console.log(`当前加载进度 ${loadStruct.GetSuccessCount() + loadStruct.GetFailCount()}/${loadStruct.GetLoadSumCount()}`);
    }
    private FinishResourceHandle(loadStruct:LoadStruct){  
        _Facade.Send(eNotificationEnum.TipsLayerOpen);//打开通知面板
        _Facade.Send(eNotificationEnum.AnnouncementOpen);//打开公告面板
        //_Facade.Send(NotificationEnum.FishLoadingLayerOpen);//打开小鱼加载界面
        //_Facade.Send(NotificationEnum.MusicControlLayerOpem);
    }  
}    