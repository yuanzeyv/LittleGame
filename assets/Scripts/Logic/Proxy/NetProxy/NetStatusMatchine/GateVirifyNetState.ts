import { _Facade, _G } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { SoltCell } from "../../../../Util/Time/TimeWheel";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
//进入条件
//1:必定成功连接到了Gate服务器，但未校验的情况下
export class GateLoadingNetStatus extends NetStatusBase{  
    private mTimerID:SoltCell|undefined;
    public OnEnter(proxy: NetProxy): void {
        //延时一秒钟之后尝试连接Gate服务器
        this.mTimerID = _G.TimeWheel.Set(1000,()=>{
            _Facade.FindProxy(NetWorkProxy).SendMessage(eNetProtocol.GateInit);//开始准备校验
            this.mTimerID = undefined;
        });
    }
    public OnExit(proxy: NetProxy): void {
        this.mTimerID?.Stop();
        this.mTimerID = undefined;
    } 
 
    public GateVirifyHandle(proxy:NetProxy,reply:{err:number}){//Gate验证函数
        //收到消息后立即进入Gate状态
        proxy.ChangeStatus(eNetStatus.Gate);//连接成功，进入 
    }

    public DisconnectHandle(proxy:NetProxy){//断开连接校验 
        proxy.ChangeStatus(eNetStatus.None);//断线的情况下
    } 

    public KickHandle(proxy:NetProxy,msg: any): void {
        proxy.ChangeStatus(eNetStatus.None);//断线的情况下
    }

    
}

 