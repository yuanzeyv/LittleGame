import { eNetProtocol } from "../../../../NetNotification";
import { NetProxy } from "../NetProxy";
export enum eNetStatus{
    None,            //空类型
    GateVirify,      //连接Gate服务器类型
    Gate,            //Gate服务器连接类型
    ConnectorLoading,//连接登录服务器类型
    Connector,       //登陆服务器连接类型
    Game,            //Game状态 
};
export abstract class NetStatusBase{
    private mStateName:string = "None"
    public constructor(name:string = "None"){
        this.mStateName = name;
    }
    public get StateName():string{ return this.mStateName; }
    //通用方法
    public OnEnter(proxy:NetProxy){}
    public OnExit (proxy:NetProxy){}
    //操作函数 
    public Connect(proxy:NetProxy){//连接状态 
    }
    public Login(proxy:NetProxy,account:string,pass:string){//验证状态 
    }
    public SendMessage(netID:eNetProtocol,msg:any){
        this.Log("无法发送消息");
    }
    //执行事件回调
    public GateConnectHandle(proxy:NetProxy){//验证状态
        this.Log("网络状态机，状态异常，请检查");
    }
    public ConnectorConnectHandle(proxy:NetProxy){//验证状态
        this.Log("网络状态机，状态异常，请检查");
    }
    public DisconnectHandle(proxy:NetProxy){//断开连接校验
        this.Log("网络状态机，状态异常，请检查");
    }
    public GateVirifyHandle(proxy:NetProxy,reply:{err:number}){//Gate验证函数
        this.Log("网络状态机，状态异常，请检查");
    } 
    public KickHandle(proxy:NetProxy,msg:any){
        this.Log("玩家被T下线了");
        this.Log(msg);
    }
    //打印函数
    public Log(msg:string){
        console.warn(`网络状态机) ${this.StateName}:${msg}`);
    }
}  
