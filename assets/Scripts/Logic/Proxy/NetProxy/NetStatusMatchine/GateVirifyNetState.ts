import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
//进入条件
//1:必定成功连接到了Gate服务器，但未校验的情况下
export class GateLoadingNetStatus extends NetStatusBase{  
    //执行事件回调
    public OnEnter(proxy:NetProxy){//验证状态
        _Facade.FindProxy(NetWorkProxy).SendMessage(eNetProtocol.GateInit,{id:++proxy.mMessageID});//开始准备校验
    }  

    public GateVirifyHandle(proxy:NetProxy,reply:{err:number,id:number}){//Gate验证函数
        if(reply.err != 0 || proxy.mMessageID != reply.id){
            _Facade.FindProxy(NetWorkProxy).DisConnect();//尝试断开网络连接
            return;
        }
        proxy.ChangeStatus(eNetStatus.Gate);//连接成功，进入 
    }

    public DisconnectHandle(proxy:NetProxy){//断开连接校验
        this.Log("???????为什么会进入这里？ ");
        proxy.ChangeStatus(eNetStatus.None);//断线的情况下
    } 
}

