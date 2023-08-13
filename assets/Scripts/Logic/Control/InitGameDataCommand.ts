import { Asset } from "cc";
import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { NotificationEnum } from "../../NotificationTable";
import { LogInMeidator } from "../Mediator/LogInMediator/LogInMeidator";
import { ResouceProxy } from "../Proxy/BundleProxy/ResouceProxy";
import { PagePassProxy } from "../Proxy/PagePassProxy/PagePassProxy";
import { UserDataProxy } from "../Proxy/UserDataProxy/UserDataProxy";
import { BundleProxy, LoadStruct } from "../Proxy/BundleProxy/BundleProxy";
import { WindowProxy } from "../Proxy/WindowProxy/WindowProxy";

export class InitGameDataCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        _Facade.FindProxy(BundleProxy).LoadBundle("resources").then((ret:boolean)=>{
            //加载一款游戏所需要的基础游戏资源
            if(ret == false){
                console.error("游戏资源包加载异常，无法进入游戏!!!");
                return 
            }
            _Facade.FindProxy(BundleProxy).Load(`resources/Perfab/WindowInterface`,(loadStruct:LoadStruct)=>{
                if(loadStruct.IsFinish)
                    this.StartGame();
            });
        });
    }
    private StartGame(){
        _Facade.FindProxy(WindowProxy).InitWindowPrefab();
        //打开这三个姐
        _Facade.Send(NotificationEnum.M_TipsOpen);
        _Facade.Send(NotificationEnum.AnnouncementOpen);
        _Facade.Send(NotificationEnum.FishLoadingLayerOpen);

        ////请求关卡总数信息
        //_Facade.FindProxy(PagePassProxy).RequestPassCount();
        ////请求用户数据
        //_Facade.FindProxy(UserDataProxy).RequestUserData({});  
    }
}  