import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
export class GameNetStatus extends NetStatusBase{      
    public SendMessage(netID:eNetProtocol,msg:any){ 
        _Facade.FindProxy(NetWorkProxy).SendMessage(netID,msg);//开始准备校验
    } 

    public DisconnectHandle(proxy: NetProxy): void {
        _Facade.Send(eNotice.TipsShow,"网络连接中断");
        //向外发出断线消息
        proxy.ChangeStatus(eNetStatus.None);//切换回空状态
    }

    public KickHandle(proxy: NetProxy): void {
        _Facade.Send(eNotice.TipsShow,"网络连接中断");
        //向外发出断线消息
        proxy.ChangeStatus(eNetStatus.None);//切换回空状态
    }

}   