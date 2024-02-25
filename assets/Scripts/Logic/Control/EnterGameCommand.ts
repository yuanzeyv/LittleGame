import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { eNotice } from "../../NotificationTable";

export class EnterGameCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        let result:{bundleName:string,isComplete:boolean} = notification.getBody();
        if(!result.isComplete){
            console.error("游戏资源包加载异常，无法进入游戏!!!");
            return 
        } 
        _Facade.Send(eNotice.InitGameData);//初始化游戏数据
    }
}  