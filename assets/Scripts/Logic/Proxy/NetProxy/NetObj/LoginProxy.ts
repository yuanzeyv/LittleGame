import { BaseProxy } from "../../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../../Global";
import { eNetProtocol } from "../../../../NetNotification";
import { eNotice } from "../../../../NotificationTable";
import { NetWorkProxy } from "../../NetWorkProxy/NetWorkProxy";

//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class LoginProxy extends BaseProxy{ 
    static get ProxyName():string { return "LoginProxy" };
    private mServertMap:Map<string,{onlineNum:number,ip:string,port:number}> = new Map<string,{onlineNum:number,ip:string,port:number}>();
    //记录服务器信息
    //记录登录及服务器列表信息 
    public onLoad(): void {
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.QuaryServerList,this.QuaryServerListHandle.bind(this));
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_Login,this.SC_LoginHandle.bind(this));
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_Test,this.SC_TestHandle.bind(this));
    } 
    
    //查询服务器列表
    public QuaryServerListHandle(reply:{err:number,serverArr:[{ serverName:string, onLineNum: number,ip:string,port:number}]}){
        if(reply.err != 0){
            _Facade.Send(eNotice.TipsShow,"查询服务器列表异常");
            return;
        }
        this.mServertMap.clear();
        for(let cell of reply.serverArr)   
            this.mServertMap.set(cell.serverName,{onlineNum:cell.onLineNum,ip:cell.ip,port:cell.port}); 
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
 
    //获`
    public SC_TestHandle(reply:{err:number,msg?:string}){ 
        console.log("QQQQQQQQQQQQQQQQQQQQQ");
    }

    //获取到游戏中第一个可用服务器·
    public GetServerNameList():string[]{
        let ret:string[] = [];
        for(let cell of this.mServertMap)
            ret.push(cell[0]);
        return ret;
    }
    //获取到某个服务器的详细的名字
    public GetServerInfo(serverName:string):{onlineNum:number,ip:string,port:number}{
        return this.mServertMap.get(serverName);
    }
}