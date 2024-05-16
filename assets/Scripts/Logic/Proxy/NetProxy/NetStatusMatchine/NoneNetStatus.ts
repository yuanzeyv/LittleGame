import { _Facade, _G } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable";
import { SoltCell } from "../../../../Util/Time/TimeWheel";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
export class NoneNetStatus extends NetStatusBase{ 
    private mTimerID:SoltCell|undefined;
    public OnEnter(proxy: NetProxy): void {
        //延时一秒钟之后尝试连接Gate服务器
        this.mTimerID = _G.TimeWheel.Set(1000,()=>{
            _Facade.FindProxy(NetProxy).Connect()
            this.mTimerID = undefined;
        });
    }
    public OnExit(proxy: NetProxy): void { 
        this.mTimerID?.Stop();
        this.mTimerID = undefined;
    } 
    
    public Connect(proxy:NetProxy){//连接状态
        _Facade.FindProxy(NetWorkProxy).GateConnect("192.168.1.100",3014);//开始连接到网关服务器
    } 
    
    //执行事件回调  
    public GateConnectHandle(proxy:NetProxy){//验证状态  
        proxy.ChangeStatus(eNetStatus.GateVirify);//连接上之后，立马进入验证状态
    } 

    //连接失败校验
    public DisconnectHandle(proxy:NetProxy){  
        _Facade.Send(eNotice.TipsShow,"连接登陆服务器失败，正在重新尝试");
        proxy.ChangeStatus(eNetStatus.None);//重新连接Gate服务器
    }   
    //尝试发送消息
    public SendMessage(netID: eNetProtocol, msg: any): void {
        _Facade.Send(eNotice.TipsShow,"请等待服务器连接成功");
        
    }
}