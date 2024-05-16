import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy"; 
import { eNetProtocol } from "../../../NetNotification";
export type NetDisposeCallBack = (...args)=>void;

export class NetWorkProxy extends BaseProxy{   
    static get ProxyName():string { return "NetWorkProxy" }; 
    private mPomelo = (window as any).pomelo; 
    private mNetListenMap:Map<eNetProtocol,NetDisposeCallBack> = new Map<eNetProtocol,NetDisposeCallBack>();//网络信息回调
 
    public onLoad(): void {
        this.mPomelo.on("disconnect",this.CustomServerHandle.bind(this,eNetProtocol.DisConnect));
        this.mPomelo.on("close",this.CustomServerHandle.bind(this,eNetProtocol.Close));
        this.mPomelo.on("onKick",this.CustomServerHandle.bind(this,eNetProtocol.Kick));
    }
    public GateConnect(host:string,port:number){
        this.mPomelo.disconnect();//由于Pomelo是一个全局变量，所以onLoad时断开连接一次
        this.mPomelo.init({host: host,port:port,log: true},this.CustomServerHandle.bind(this,eNetProtocol.GateConnect));
    }
    public Connect(host:string,port:number){
        this.mPomelo.disconnect();//由于Pomelo是一个全局变量，所以onLoad时断开连接一次
        this.mPomelo.init({host: host,port:port,log: true},this.CustomServerHandle.bind(this,eNetProtocol.ConnectorConnect));
    } 
    public DisConnect(){ 
        this.mPomelo.disconnect();//由于Pomelo是一个全局变量，所以onLoad时断开连接一次
    } 
    public RegisterNetHandle(netId:eNetProtocol,handle:NetDisposeCallBack){
        if(this.mNetListenMap.has(netId))
            this.mNetListenMap.delete(netId);
        this.mNetListenMap.set(netId,handle);
        this.mPomelo.on(netId,handle); 
    }
    public UnregisterNetHandle(netId:eNetProtocol){
        this.mNetListenMap.delete(netId); //清除网络监听信息
        this.mPomelo.off(netId);  
    }

    private CustomServerHandle(netID:eNetProtocol,data:any){
        let handle:NetDisposeCallBack = this.mNetListenMap.get(netID);
        if(handle) 
            handle(data);  
    }  
    
    public SendMessage(netID:eNetProtocol,msg?:any):void
    public SendMessage(netID:eNetProtocol,msg:any):void{ 
        this.mPomelo.notify(netID,msg);  
    }
} 