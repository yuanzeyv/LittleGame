import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { NotificationEnum } from "../../NotificationTable";
import { BundleProxy, ListenObj, LoadID, LoadStruct } from "../Proxy/BundleProxy/BundleProxy";
import { WindowProxy } from "../Proxy/WindowProxy/WindowProxy";
import { Prefab } from "cc";

export class InitGameDataCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        let bundleProxy:BundleProxy = _Facade.FindProxy(BundleProxy);
        let loadID:LoadID = bundleProxy.LoadDirs([{bundleName:"resources",dirName:"LayerSource/Basics"}]);
        bundleProxy.RegisterListen(new ListenObj(loadID,this.FinishResourceHandle.bind(this),this.PorgressResourceHandle.bind(this)));

    } 
    private PorgressResourceHandle(loadStruct:LoadStruct){ 
        console.log(`当前加载进度 ${loadStruct.GetSuccessCount() + loadStruct.GetFailCount()}/${loadStruct.GetLoadSumCount()}`);
    }
    private FinishResourceHandle(loadStruct:LoadStruct){  
        _Facade.Send(NotificationEnum.FishLoadingLayerOpen);//打开小鱼加载界面
        //_Facade.Send(NotificationEnum.M_TipsOpen);
        //_Facade.Send(NotificationEnum.AnnouncementOpen);  
        //_Facade.Send(NotificationEnum.MusicControlLayerOpem);
    } 
}    