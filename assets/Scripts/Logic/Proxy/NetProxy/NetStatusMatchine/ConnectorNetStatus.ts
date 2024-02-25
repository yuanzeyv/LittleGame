import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";
import { NetProxy } from "../NetProxy";
import { NetStatusBase, eNetStatus } from "./NetStatusBase";
export class ConnectorNetStatus extends NetStatusBase{     
    public OnEnter(proxy: NetProxy): void {
        _Facade.FindProxy(NetProxy).Send(eNetProtocol.CS_Login,{account:"QQQQQ",pass:"QQQQQ"});
    } 

    public SendMessage(netID:eNetProtocol,msg:any){ 
        _Facade.FindProxy(NetWorkProxy).SendMessage(netID,msg);//开始准备校验
    } 
} 