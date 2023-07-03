import { Component } from "cc";
import { INotification } from "../PureMVC";
export type LayerExecute = (any)=>void;
//窗口的基础
/**
 * 其本身是一个Component组件 拥有一个与BaseMediator功能类似的监听Map,用于监听并执行由WindowMediator发送消息。 并且会有一些功能方法，统一Layer的编写规范。
 */
export class BaseLayer extends Component{
    protected m_Custom:any;
    //消息队列,不用map 数组效率更高
    private m_ExecuteHandle:Map<string,LayerExecute> = new Map<string,LayerExecute>();
    protected RegisterExecuteHandle(executeMap:Map<string,LayerExecute> ){}

    public NotificationExecute(notification:INotification){
        let handle = this.m_ExecuteHandle.get(notification.getName());
        if(handle == undefined) return; 
        try{
            handle(notification.getBody());//执行方法体
        }catch(errro){
            console.error(errro);
        }
    }

    //界面预制体被生成完成后，优先调用的
    public InitBaseLayer(data:any):void{
        this.RegisterExecuteHandle(this.m_ExecuteHandle);
        this.InitNode();
        this.m_Custom = data;
        this.InitData(this.m_Custom);
    }
    onLoad(){
        this.InitLayer();
        this.AfterLoad();
    }
    InitNode() {}//初始化节点信息
    InitData(data:any) {}//初始化数据信息
    InitLayer() {}//初始化界面信息
    AfterLoad() { }//初始化结束以后

    CloseLayer(){}
}
