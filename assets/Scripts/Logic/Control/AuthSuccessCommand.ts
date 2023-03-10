import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { NotificationEnum } from "../../NotificationTable";
import { LogInMeidator } from "../Mediator/LogInMediator/LogInMeidator";
import { UserProxy } from "../Proxy/UserProxy/UserProxy";

export class AuthSuccessCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){ 
        _Facade.FindProxy(UserProxy).NetModule.SendGetUserInfo()//像后端发送请求用户信息的消息
        //向服务器发送请求用户数据信息的消息
        _Facade.Send(NotificationEnum.M_CloseWindow,LogInMeidator.name)//关闭登录界面 
    } 
} 