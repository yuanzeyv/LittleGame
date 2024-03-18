import { NATIVE } from "cc/env";
import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { eNotice } from "../../NotificationTable";
import { BundleProxy, ListenObj, LoadID, LoadStruct } from "../Proxy/BundleProxy/BundleProxy";
import { PoolProxy } from "../Proxy/PoolProxy/PoolProxy";
import { WindowProxy } from "../Proxy/WindowProxy/WindowProxy";
import { Prefab, Sorting } from "cc";
import { SkeletonProxy } from "../Proxy/SkeletonProxy/SkeletonProxy";

export class InitGameDataCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        let bundleProxy:BundleProxy = _Facade.FindProxy(BundleProxy);
        let loadID:LoadID = bundleProxy.LoadDirs([
            {bundleName:"resources",dirName:"LayerSource/Basics"}, 
        ]);//加载基础资源信息
        bundleProxy.RegisterListen(new ListenObj(loadID,this.FinishResourceHandle.bind(this),this.PorgressResourceHandle.bind(this)));

    } 
    private PorgressResourceHandle(loadStruct:LoadStruct){ 
       // console.log(`当前加载进度 ${loadStruct.GetSuccessCount() + loadStruct.GetFailCount()}/${loadStruct.GetLoadSumCount()}`);
    }
    private FinishResourceHandle(loadStruct:LoadStruct){  
        _Facade.FindProxy(WindowProxy).InitNodePool();//初始化窗口对象池
        _Facade.FindProxy(SkeletonProxy).InitNodePool();//初始化窗口对象池
        _Facade.Send(eNotice.TipsLayerOpen);//打开通知面板
        _Facade.Send(eNotice.AnnouncementOpen);//打开公告面板
        //判断当前是否是Native平台 
        if(!NATIVE) 
            _Facade.Send(eNotice.LongInOpen);//打开登录面板  
        else 
            _Facade.Send(eNotice.HotUpdateOpen);//打开登录面板 
        //_Facade.Send(NotificationEnum.FishLoadingLayerOpen);//打开小鱼加载界面
        //_Facade.Send(NotificationEnum.MusicControlLayerOpem);
    }  
}        
//如何通过一个功能ID来打开一个游戏界面