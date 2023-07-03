import { Asset } from "cc";
import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { NotificationEnum } from "../../NotificationTable";
import { LogInMeidator } from "../Mediator/LogInMediator/LogInMeidator";
import { ResouceProxy } from "../Proxy/BundleProxy/ResouceProxy";
import { PagePassProxy } from "../Proxy/PagePassProxy/PagePassProxy";
import { UserDataProxy } from "../Proxy/UserDataProxy/UserDataProxy";

export class InitGameDataCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        //打开这三个姐买你
        _Facade.Send(NotificationEnum.M_TipsOpen);
        _Facade.Send(NotificationEnum.AnnouncementOpen);
        _Facade.Send(NotificationEnum.LongInOpen);

        //请求关卡总数信息
        _Facade.FindProxy(PagePassProxy).RequestPassCount();
        //请求用户数据
        _Facade.FindProxy(UserDataProxy).RequestUserData({});

        
        //初始化两张图片
        let resouceProxy:ResouceProxy = _Facade.FindProxy(ResouceProxy);
        resouceProxy.Load("resources/Images/Private/PageSelectLayer/PassBGStart/spriteFrame",(asset:Asset | undefined)=>{});
        resouceProxy.Load("resources/Images/Private/PageSelectLayer/PassBGNoStart/spriteFrame",(asset:Asset | undefined)=>{});
        
    } 
}  