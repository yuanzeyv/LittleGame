import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { eNetProtocol } from "../../../NetNotification";
import { eNotice } from "../../../NotificationTable";
import { NetProxy } from "../NetProxy/NetProxy";
import { eNetStatus } from "../NetProxy/NetStatusMatchine/NetStatusBase";
import { NetWorkProxy } from "../NetWorkProxy/NetWorkProxy"; 
export interface IServerInfoItem{
    serverName:string;
    onLineNum:number;
    ip:string;
    port:number;
};
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class LoginProxy extends BaseProxy{ 
    static get ProxyName():string { return "LoginProxy" };
    private mServertMap:IServerInfoItem[];
    private mSelectServer:IServerInfoItem|undefined;

    //玩家要登陆角色的UID
    private mUID:number = 0;
    private mServerVirifyCode:number = 0;
    //记录服务器信息
    //记录登录及服务器列表信息 
    public onLoad(): void {
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.QuaryServerList,this.QuaryServerListHandle.bind(this));
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_Login,this.SC_LoginHandle.bind(this)); 
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_LoginSuccess,this.SC_LoginSuccessHandle.bind(this)); 
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_GateLogin,this.SC_GateLoginHandle.bind(this));//网关服务器连接请求
    } 
    //尝试发送验证消息到Gate服务器.
    public CS_GateVirifyLogin(account:string,pass:string,selectServer:string):void{
        _Facade.FindProxy(NetProxy).Send(eNetProtocol.CS_GateLogin,{account:account,pass:pass,selectServer:selectServer})        
    }
    
    //查询服务器列表
    public QuaryServerListHandle(reply:{err:number,serverArr:IServerInfoItem[]}){
        if(reply.err != 0){
            _Facade.Send(eNotice.TipsShow,"查询服务器列表异常");
            return;
        }
        this.mServertMap = reply.serverArr;
        _Facade.Send(eNotice.RefreshServerList);//主界面打开 
    }
    //登录信息返回
    public SC_LoginHandle(reply:{err:number,msg?:string}){
        if(reply.err != 0){
            _Facade.Send(eNotice.TipsShow,reply.msg);
            return;  
        }
        _Facade.Send(eNotice.TipsShow,"玩家登录成功");
        _Facade.Send(eNotice.LoginInClose);//关闭登录界面
        _Facade.Send(eNotice.MainLayerOpen);//主界面打开
        _Facade.Send(eNotice.MainTopLayerOpen);//主界面打开 
    }   
    public SC_LoginSuccessHandle(reply:{err:number,msg?:string}){
        _Facade.FindProxy(NetProxy).ChangeStatus(eNetStatus.Game)
    } 


    //获取到某个服务器的详细的名字
    public GetServerInfos():IServerInfoItem[]{
        return this.mServertMap || [];
    } 
    
    //登陆服务器验证
    public SC_GateLoginHandle(reply:{err:number,sid:number,virifyCode:number}):void{
        if(reply.err){
            _Facade.Send(eNotice.TipsShow,`登陆失败:${reply.err}`);
            return;
        } 
        this.mUID = reply.sid;
        this.mServerVirifyCode = reply.virifyCode;
        _Facade.FindProxy(NetProxy).Connect();
    } 


    //设置当前选中的服务器
    public SetSelectServer(selectServer:IServerInfoItem){
        this.mSelectServer = selectServer;
        //向外发送切换选中服务器的消息
        _Facade.Send(eNotice.RefreshSelectServer);//刷新选中服务器
    }

    //获取到选中服务器
    public GetSelectServer():IServerInfoItem|undefined{
        return this.mSelectServer;
    } 

    //获取到登陆数据信息
    public get LoginUID():number{
        return this.mUID;
    }
    public get LoginVirifyCode():number{
        return this.mServerVirifyCode;
    }
}  