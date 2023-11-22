import { AudioClip, AudioSource, director, find, instantiate,Node, Prefab, resources } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { eNotificationEnum } from "../../../NotificationTable";
import { NetConfig } from "./NetConfig";
import { NetAuth } from "./NetObj/NetAuth";
import { NetCellBase } from "./NetObj/NetCellBase";
import { MessageFormat } from "./NetObj/NetConnect";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class NetProxy extends BaseProxy{
    private m_WebSocketCell:NetCellBase;
    private m_UserAccount:string = "";
    private m_PassWord:string = "";
    private m_LoginFlag:boolean = false;
    static  get ProxyName():string { return "NetProxy" };
    public get UserAccount():string{
        return this.m_UserAccount;
    }
    public get PassWord():string{
        return this.m_PassWord;
    }
    public SetUserAccount(account:string){
        this.m_UserAccount = account;
    }
    public SetPassWord(passWord:string){
        this.m_PassWord = passWord;
    }
    public ClearLoginStatus(){
        this.m_LoginFlag = false;
    }
    public SetLoginStatus(){
        this.m_LoginFlag = true;
    }
    public ClearNetCell(){
        this.m_WebSocketCell = undefined;
    }
    public IsLogined(){
        return this.m_LoginFlag;
    }
    public SetSocketCell(cell:NetCellBase){
        this.m_WebSocketCell = cell;//创建一个验证单元，进行验证
    }

    public Connect(){//准备开始连接
        if(this.m_UserAccount == "" || this.m_PassWord == ""){
            _Facade.Send(eNotificationEnum.TipsShow,"账号或密码未输入");
            return;
        }
        //上一次的连接操作 ，没有结束
        if(this.m_WebSocketCell != undefined){
            //当前的登录状态出现了点问题,连接了却还想着继续连接
            _Facade.Send(eNotificationEnum.TipsShow,"已经连接或正在连接服务器中");
            return;
        }
        let socket:WebSocket = new WebSocket(NetConfig.NET_ADDRESS);
        this.SetSocketCell(new NetAuth(socket));//创建一个验证单元，进行验证
    }  
    public SendMessage(msgID:number,data:Object): void {
        if(this.m_WebSocketCell == undefined){
            console.log("网络单元不存在");            
            return;
        }
        let messageFormat:MessageFormat = {
            ID:msgID,//消息的id
            Data:data//消息的详细数据
        };
        this.m_WebSocketCell.Send(messageFormat);
    }

}