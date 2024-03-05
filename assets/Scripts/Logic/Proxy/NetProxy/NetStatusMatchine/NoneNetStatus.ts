import { _Facade } from "../../../../Global";
import { eNotice } from "../../../../NotificationTable";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
//进入条件
//1:当前Plemo没有网络连接

export class NoneNetStatus extends NetStatusBase{
    public OnEnter(proxy: NetProxy): void {
        this.Log("当前进入了OnEnter函数");
        _Facade.FindProxy(NetProxy).Connect();
    }
    
    public Connect(proxy:NetProxy){//连接状态
        _Facade.FindProxy(NetWorkProxy).GateConnect("192.168.1.100",3014);//开始连接搭到网关服务器
    } 
    
    //执行事件回调
    public GateConnectHandle(proxy:NetProxy){//验证状态 
        this.Log("准备进入GateVirify");
        proxy.ChangeStatus(eNetStatus.GateVirify);//连接上之后，立马进入验证状态
    } 
    //连接失败校验
    public DisconnectHandle(proxy:NetProxy){ 
        //弹出第一个对话框，是否尝试重新连接区服服务
        _Facade.Send(eNotice.TipsShow,"是否尝试重新连接区服服务器");
        proxy.ChangeStatus(eNetStatus.None);//重新连接Gate服务器
    }  
}