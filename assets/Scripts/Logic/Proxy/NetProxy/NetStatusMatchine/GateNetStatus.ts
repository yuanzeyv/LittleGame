import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable";
import { LoginProxy } from "../NetObj/LoginProxy";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
//值得注意的是，本步骤需要额外监听一个变量，用于判断是主动进行网络断开的 或 被动进行网络断开的
export class GateNetStatus extends NetStatusBase{
    public mInitiativeDisConnect:boolean = false;//当前是否正在连接服务器中
    public OnEnter(proxy: NetProxy): void {
        this.mInitiativeDisConnect = false;   
    }
    public OnExit(proxy: NetProxy): void {
        this.mInitiativeDisConnect = false;
    }

    public Connect(proxy:NetProxy){//连接状态
        let loginServerNameArr:string[]  = _Facade.FindProxy(LoginProxy).GetServerNameList();
        if( loginServerNameArr.length == 0 ){
            _Facade.Send(eNotice.TipsShow,"没有合适的服务器进行连接");
            return;
        }
        this.mInitiativeDisConnect = true;
        _Facade.FindProxy(NetWorkProxy).DisConnect();//断开当前的网络连接
         
    }
      
    public ConnectorConnectHandle(proxy: NetProxy): void {
        proxy.ChangeStatus(eNetStatus.ConnectorLoading);
    }
       
    public DisconnectHandle(proxy:NetProxy){//断开连接校验
        if(this.mInitiativeDisConnect){ 
            proxy.ChangeStatus(eNetStatus.ConnectorLoading);//切入Connect连接状态
            return;
        }
        proxy.ChangeStatus(eNetStatus.None);//直接切回空状态
    }  

    
    public SendMessage(netID:eNetProtocol,msg:any){ 
        _Facade.FindProxy(NetWorkProxy).SendMessage(netID,msg);//开始准备校验
    }
}


//空状态进入，直接连接Socket,连接完成后立即进入路由加载状态
//连接成功后,立即进入GateVirify
//GateVirify状态进入后，立即发送登录验证消息。如果验证失败的话，断开当前的网络连接，并返回到 1 空状态。
//验证成功后，立即进入Gate状态
//进入Gate状态后，可以发送Gate所能处理的网络消息。当用户准备连接服务器时，可以请求服务器列表数据，并调用连接接口来连接到指定的游戏服务器
//
//