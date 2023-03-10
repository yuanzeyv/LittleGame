import { _Facade } from "../../../../Global";
import { NotificationEnum } from "../../../../NotificationTable";
import { NetConnect } from "./NetConnect";
import { NetProxy } from "../NetProxy"; 
import { NetCellBase } from "./NetCellBase";
interface AuthMessage{
    Account:string;//用户账户
    PassWord:string;//用户密码
    ReConnect:boolean;//是否是重连消息
}
interface AuthReturn{
    Error:boolean;//是否有错误
    ErrorData:string;//错误消息
    Status:boolean;//成功 或 失败
    IsReConnect:boolean;//是否时重连
}
export class NetAuth extends NetCellBase{
    private m_ConnectSuccessFlag:boolean = false;
    Init(): void {
        _Facade.Send(NotificationEnum.NetStartConnect);//网络开始连接
    }
    OpenHandle(ev: Event): void {
        this.m_ConnectSuccessFlag = true;//代表当前连接成功了
        _Facade.Send(NotificationEnum.NetConnectSuccess);//网络连接成功
        setTimeout(()=>{
            _Facade.Send(NotificationEnum.NetStartAuth);//开始验证用户名或密码
            let netProxy:NetProxy = _Facade.FindProxy(NetProxy);
            let sendObj:AuthMessage = {
                Account: netProxy.UserAccount,
                PassWord: netProxy.PassWord,
                ReConnect: netProxy.IsLogined()
            }
            this.Send(sendObj);
        },500);//0.5秒中之后，进行验证
    }
    CloseHandle(ev: CloseEvent): void {
        //能进入这里，说明连接成功了，并且验证失败了
        let netProxy:NetProxy = _Facade.FindProxy(NetProxy);
        if(!this.m_ConnectSuccessFlag){
            _Facade.Send(NotificationEnum.NetConnectFail);//网络连接失败
            netProxy.ClearNetCell();
            return;
        }
        _Facade.Send(NotificationEnum.NetAuthFail);//有可能验证超时了
        netProxy.ClearNetCell();//将网络单元清除

    }
    MessageHandle(ev: MessageEvent<any>): void {
        let netProxy:NetProxy = _Facade.FindProxy(NetProxy);
        //接收消息
        let data:string = ev.data;
        let auth:AuthReturn = JSON.parse(data);
        if(auth.Error){
            _Facade.Send(NotificationEnum.M_TipsShow,auth.ErrorData);
            return;
        }
        if(auth.Status == true){//成功的话
            netProxy.SetSocketCell(new NetConnect(this.m_WebSocket));
            if(auth.IsReConnect){
                _Facade.Send(NotificationEnum.M_NetReconnectSuccess);
            }
            else{
                _Facade.Send(NotificationEnum.NetAuthSuccess);//发送验证成功的消息 
            }
        }
        else {
            if(auth.IsReConnect)
                _Facade.Send(NotificationEnum.M_NetReconnectFail);
            else
                _Facade.Send(NotificationEnum.NetAuthFail);

        }
    }
}