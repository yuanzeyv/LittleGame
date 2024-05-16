import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { IServerInfoItem, LoginProxy } from "../../LoginProxy/LoginProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
//进入条件
//1:必定已经成功连接了COnnect服务器，这里面只是进行一道中转
export class ConnectorLoadingNetStatus extends NetStatusBase{  
    public OnEnter(proxy: NetProxy): void {
        let selectServerInfo:IServerInfoItem  = _Facade.FindProxy(LoginProxy).GetSelectServer()!;//能过来说明一定时连接了网路的
        _Facade.FindProxy(NetWorkProxy).Connect(selectServerInfo.ip,selectServerInfo.port); 
    } 
    
    
    public ConnectorConnectHandle(proxy:NetProxy){//验证状态
        _Facade.Send(eNotice.ConnectGameServerSuccess);
        proxy.ChangeStatus(eNetStatus.Connector); 
    } 

    public DisconnectHandle(proxy:NetProxy){//断开连接校验
        console.warn("DisconnectHandle:连接Gate服务器失败");
        proxy.ChangeStatus(eNetStatus.None);//连接成功，进入
    } 
} 
/*
*1：连接到Gate服务器
*2: Gate服务器初始化
*3: 登入Gate服务器
*4: 选择区服后，连接Connector服务区
*5：进行游戏的登入工作，并等待登入成功。切换为Game状态
*6：Game网络状态，当收到玩家的断线消息后会尝试重连，当收到玩家的T出消息，会进行通报，并退回主界面
*/