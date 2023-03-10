import { Component } from "cc";
import { INotification } from "../PureMVC";
export type LayerExecute = (any)=>void;
//窗口的基础
export class BaseLayer extends Component{
    //消息队列,不用map 数组效率更高
    private m_ExecuteHandle:Map<string,LayerExecute> = new Map<string,LayerExecute>();
    protected RegisterExecuteHandle(executeMap:Map<string,LayerExecute> ){}

    public NotificationExecute(notification:INotification){
        let name:string = notification.getName();
        let handle = this.m_ExecuteHandle.get(name);
        if(handle == undefined) return;
        let body = notification.getBody();
        handle(body);//执行方法体
    }

    onLoad(){
        this.RegisterExecuteHandle(this.m_ExecuteHandle);
        this.InitNode();
        this.InitData();
        this.InitLayer();
    }
    
    InitNode() {}//初始化节点信息
    InitData() {}//初始化数据信息
    InitLayer() {}//初始化界面信息

}
