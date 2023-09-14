import { BaseCommand } from "../../Frame/BaseControl/BaseCommand";
import { INotification } from "../../Frame/PureMVC";
import { _Facade } from "../../Global";
import { NotificationEnum } from "../../NotificationTable";
import { BundleProxy, LoadStruct } from "../Proxy/BundleProxy/BundleProxy";
import { WindowProxy } from "../Proxy/WindowProxy/WindowProxy";
import { Prefab } from "cc";

export class InitGameDataCommand extends BaseCommand{ 
    Execute(body:any,name:string,notification:INotification){  
        _Facade.FindProxy(BundleProxy).Load(`resources/Perfab/WindowInterface`,Prefab,(loadStruct:LoadStruct)=>{
            if(loadStruct.IsFinish)
                this.StartGame();
        }); 
    }
    private StartGame(){
        _Facade.FindProxy(WindowProxy).InitWindowPrefab(); 
        //打开这三个姐 
        _Facade.Send(NotificationEnum.M_TipsOpen);
        _Facade.Send(NotificationEnum.AnnouncementOpen); 
        _Facade.Send(NotificationEnum.FishLoadingLayerOpen);
        _Facade.Send(NotificationEnum.MusicControlLayerOpem);
        
    }
}    