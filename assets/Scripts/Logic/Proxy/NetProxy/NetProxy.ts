import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { eNetProtocol } from "../../../NetNotification";
import { NetWorkProxy } from "../NetWorkProxy/NetWorkProxy";
import { ConnectorLoadingNetStatus } from "./NetStatusMatchine/ConnectorLoadingNetStatus";
import { ConnectorNetStatus } from "./NetStatusMatchine/ConnectorNetStatus";
import { GateLoadingNetStatus } from "./NetStatusMatchine/GateVirifyNetState";
import { GateNetStatus } from "./NetStatusMatchine/GateNetStatus";
import { NetStatusBase, eNetStatus } from "./NetStatusMatchine/NetStatusBase"; 
import { NoneNetStatus } from "./NetStatusMatchine/NoneNetStatus";
import { GameNetStatus } from "./NetStatusMatchine/GameNetStatus";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class NetProxy extends BaseProxy{ 
    static get ProxyName():string { return "NetProxy" };
    public mMessageID:number = 0;
    private mConnectorStatusMap:Map<eNetStatus,NetStatusBase> = new Map<eNetStatus,NetStatusBase>();//用于验证当前的连接状态
    private mConnectStatus:NetStatusBase = undefined//用于验证当前的连接状态
    private mAccount:string = "";
    private mPassWord:string = "";
    public onRegister(): void {
        this.InitNetMatchingMap(); 
    }
    public onLoad():void{ 
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.GateConnect,this.GateConnectHandle.bind(this));
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.ConnectorConnect,this.ServerConnectHandle.bind(this));
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.DisConnect,this.DisconnectHandle.bind(this));
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.GateInit,this.GateVirifyHandle.bind(this));
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.Kick,this.KickHandle.bind(this));
        this.ChangeStatus(eNetStatus.None);
    }
    //初始化网络状态机
    public InitNetMatchingMap():void{
        this.mConnectorStatusMap.set(eNetStatus.None,new NoneNetStatus("None"));
        this.mConnectorStatusMap.set(eNetStatus.GateVirify,new GateLoadingNetStatus("GateVirify"));
        this.mConnectorStatusMap.set(eNetStatus.Gate,new GateNetStatus("Gate"));
        this.mConnectorStatusMap.set(eNetStatus.ConnectorLoading,new ConnectorLoadingNetStatus("ConnectorLoading"));
        this.mConnectorStatusMap.set(eNetStatus.Connector,new ConnectorNetStatus("Connector"));
        this.mConnectorStatusMap.set(eNetStatus.Game,new GameNetStatus("Game"));
    }
     
    public ChangeStatus(status:eNetStatus):void{  
        if(this.mConnectStatus)
            this.mConnectStatus.OnExit(this);
        this.mConnectStatus = this.GetStatusMatchine(status);
        if(this.mConnectStatus)
            this.mConnectStatus.OnEnter(this);

    }
    

    public GetStatusMatchine(status:eNetStatus):NetStatusBase{ 
        return this.mConnectorStatusMap.get(status);
    }
    
    
    //网络断线时的处理方案 
    private KickHandle(data:any):void{ 
        this.mConnectStatus.KickHandle(this,data);
    }
    //网络断线时的处理方案
    private DisconnectHandle():void{ 
        this.mConnectStatus.DisconnectHandle(this);
    }
    private GateConnectHandle():void{ 
        this.mConnectStatus.GateConnectHandle(this);
    }
    //Gate验证回调
    private GateVirifyHandle(reply:{err:number,id:number}):void{
        this.mConnectStatus.GateVirifyHandle(this,reply);
    }
    
    //连接上Server服务器的回调
    private ServerConnectHandle():void{
        this.mConnectStatus.ConnectorConnectHandle(this);
    } 
    //连接函数
    public Connect(){
        this.mConnectStatus.Connect(this);
    }
    //登录函数
    public Login(account:string,pass:string){ 
        this.mAccount = account;
        this.mPassWord = pass; 
        this.mConnectStatus.Login(this,account,pass);
    }
    //断开连接
    public DisConnect(){
        _Facade.FindProxy(NetWorkProxy).DisConnect();//断开连接
    }  

    //发送一条网络消息
    public Send(netID: eNetProtocol, msg: any = {} ):void{
        this.mConnectStatus.SendMessage(netID,msg);
    }
}