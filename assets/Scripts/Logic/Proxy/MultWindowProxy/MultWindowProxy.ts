import { IMultPanleStruct, MultPanleConfig } from "../../../Config/Cfg_MultPanle";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { eNetProtocol } from "../../../NetNotification";
import { eNotice } from "../../../NotificationTable";
import { NetWorkProxy } from "../NetWorkProxy/NetWorkProxy";

//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class MultWindowProxy extends BaseProxy{
    static get ProxyName():string { return "LoginProxy" };
    private mMultPanleCfgMap:Map<number,IMultPanleStruct> = new Map<number,IMultPanleStruct>();
    //记录服务器信息
    //记录登录及服务器列表信息 
    public onLoad(): void {
        //加载游戏配置表信息
    }
    
    //查询服务器列表
    public QuaryServerListHandle(reply:{err:number,serverArr:[{ serverName:string, onLineNum: number }]}){
        if(reply.err != 0){
            _Facade.Send(eNotice.TipsShow,"查询服务器列表异常");
            return;
        }
        this.mServertMap.clear();
        for(let cell of reply.serverArr)
            this.mServertMap.set(cell.serverName,cell.onLineNum);

    }

    private InitTable(){
        for(let cell of MultPanleConfig.GetDatas()){
            this.mMultPanleCfgMap.set(cell.key,cell);
        }
    }
}   