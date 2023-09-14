import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { NotificationEnum } from "../../NotificationTable";
import { BundleProxy, LoadStruct } from "../Proxy/BundleProxy/BundleProxy";
import { WindowProxy } from "../Proxy/WindowProxy/WindowProxy";
import { Prefab } from "cc";

export class BundleLoadResultCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        let result:{bundleName:string,isSuccess:boolean} = notification.getBody();
        if(!result.isSuccess){
            console.error("游戏资源包加载异常，无法进入游戏!!!");
            return 
        }
        _Facade.Send(NotificationEnum.InitGameData)
    }
}  