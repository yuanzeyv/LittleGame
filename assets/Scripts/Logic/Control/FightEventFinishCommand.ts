import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { FightProxy } from "../Proxy/FightProxy/FightProxy";

export class FightEventFinishCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        let fightProxy:FightProxy = _Facade.FindProxy(FightProxy);//找到战斗模块，
        fightProxy.NoticeEventFinish();
    }
}  