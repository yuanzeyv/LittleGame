import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { eNotice } from "../../NotificationTable"; 

export class AuthSuccessCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){ 
        _Facade.Send(eNotice.MainBoxLayerOpen); //打开主界面
        _Facade.Send(eNotice.UserBaseOpen); //打开主界面的插件
    } 
} 