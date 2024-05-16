import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable"; 
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
//值得注意的是，本步骤需要额外监听一个变量，用于判断是主动进行网络断开的 或 被动进行网络断开的
export class GateNetStatus extends NetStatusBase{
    private mWaitDisconnect:boolean = false; 
    public OnEnter(proxy: NetProxy): void { 
        this.mWaitDisconnect = false;
    }
    public OnExit(proxy: NetProxy): void { 
    }

    public Connect(proxy:NetProxy){//连接状态  
        this.mWaitDisconnect = true;
        //玩家进入等待断开连接的状态
        _Facade.FindProxy(NetWorkProxy).DisConnect();//断开当前的网络连接
        
    } 
      
    public DisconnectHandle(proxy:NetProxy){//断开连接校验
        if(this.mWaitDisconnect){
            proxy.ChangeStatus(eNetStatus.ConnectorLoading);//切入Connect连接状态
            return;
        }
        proxy.ChangeStatus(eNetStatus.None);//切入Connect连接状态
    }  

    public KickHandle(proxy: NetProxy, msg: any): void {
        _Facade.Send(eNotice.TipsShow,"玩家被踢出游戏" + msg);
    }
 
    public SendMessage(netID:eNetProtocol,msg:any){ 
        _Facade.FindProxy(NetWorkProxy).SendMessage(netID,msg);//开始准备校验
    }
}