import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable";
import { LoginProxy } from "../../LoginProxy/LoginProxy";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
export class ConnectorNetStatus extends NetStatusBase{     
    public OnEnter(proxy: NetProxy): void { 
        let uid:number = _Facade.FindProxy(LoginProxy).LoginUID;//获取到要登陆的玩家UID
        let virifyCode:number = _Facade.FindProxy(LoginProxy).LoginVirifyCode;//获取到要登陆的玩家UID
        _Facade.FindProxy(NetProxy).Send(eNetProtocol.CS_Login,{virifyCode:virifyCode,uid:uid});
    } 

    public SendMessage(netID:eNetProtocol,msg:any){ 
        _Facade.FindProxy(NetWorkProxy).SendMessage(netID,msg);//开始准备校验
    } 

    public DisconnectHandle(proxy: NetProxy): void {
        _Facade.Send(eNotice.TipsShow,"网络连接中断");
        proxy.ChangeStatus(eNetStatus.None);//进入到空状态，等待网络连接
    }

    public KickHandle(proxy: NetProxy, msg: any): void {
        proxy.ChangeStatus(eNetStatus.None);//进入到空状态，等待网络连接
    }

}   