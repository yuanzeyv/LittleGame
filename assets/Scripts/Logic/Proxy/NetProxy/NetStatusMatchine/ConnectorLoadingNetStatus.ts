import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { LoginProxy } from "../../LoginProxy/LoginProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
//进入条件
//1:必定已经成功连接了COnnect服务器，这里面只是进行一道中转
export class ConnectorLoadingNetStatus extends NetStatusBase{  
    public OnEnter(proxy: NetProxy): void {
        let loginServerNameArr:string[]  = _Facade.FindProxy(LoginProxy).GetServerNameList();
        let serverInfo:{onlineNum: number; ip: string;port: number;} = _Facade.FindProxy(LoginProxy).GetServerInfo(loginServerNameArr[0]); 
        _Facade.FindProxy(NetWorkProxy).Connect(serverInfo.ip,serverInfo.port); 
    } 
    
    
    public ConnectorConnectHandle(proxy:NetProxy){//验证状态
        _Facade.Send(eNotice.ConnectGameServerSuccess);
        proxy.ChangeStatus(eNetStatus.Connector);//直接关闭，退回到未连接状态
    } 

    public DisconnectHandle(proxy:NetProxy){//断开连接校验
        console.warn("DisconnectHandle:连接Gate服务器失败");
        proxy.ChangeStatus(eNetStatus.None);//连接成功，进入
    }
 
} 