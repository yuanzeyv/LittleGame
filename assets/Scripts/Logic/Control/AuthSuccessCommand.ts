import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { eNotificationEnum } from "../../NotificationTable"; 

export class AuthSuccessCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){ 
        //向服务器发送请求用户数据信息的消息
        //_Facade.Send(NotificationEnum.CloseWindow,LogInMeidator.MediatorName)//关闭登录界面
        _Facade.Send(eNotificationEnum.MainBoxLayerOpen); //打开主界面
        _Facade.Send(eNotificationEnum.UserBaseOpen); //打开主界面的插件
    } 
} 