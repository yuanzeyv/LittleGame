import { _decorator, Component, Node, EventTouch} from 'cc';
import { INotification } from "../PureMVC";
import { eNotice as eNotice } from "../../NotificationTable";
import { _Facade } from '../../Global';  
import { ButtonEvent } from './Class/ButtonEvent';
import { WindowInterface } from '../../Compoment/WindowInterface';
export type LayerExecute = (any)=>void;
const { ccclass, property,type} = _decorator; 
//窗口的基础
/**
 * 其本身是一个Component组件 拥有一个与BaseMediator功能类似的监听Map,用于监听并执行由WindowMediator发送消息。 并且会有一些功能方法，统一Layer的编写规范。
 */
@ccclass('BaseLayer') 
export class BaseLayer extends Component{ 
    private mWindowInterface:WindowInterface;//执行界面接口对象
    //按钮事件
    private mButtonEvent:ButtonEvent;
    //消息队列,不用map 数组效率更高
    private mExecuteHandle:Map<eNotice,LayerExecute> = new Map<eNotice,LayerExecute>();
    protected RegisterExecuteHandle(executeMap:Map<eNotice ,LayerExecute> ){}

    public NotificationExecute(notification:INotification){
        let handle = this.mExecuteHandle.get(notification.getName() as eNotice);
        if(handle == undefined) return; 
        try{
            handle(notification.getBody());//执行方法体
        }catch(errro){
            console.error(errro);
        }
    }
    
    public InitWindowInterface(windowInterface:WindowInterface):void{
        this.mWindowInterface = windowInterface;
    }

    //界面预制体被生成完成后，优先调用的
    public InitBaseLayer(data:any):void{
        this.RegisterExecuteHandle(this.mExecuteHandle);
        this.mButtonEvent = new ButtonEvent(this.node);
        this.InitNode();//创建界面时，直接初始化节点
        this.InitData(data);//初始化数据信息
    }
    public InitNode() {}//初始化节点信息
    protected InitData(data:any) {}//初始化数据信息
 
    protected onLoad(){ 
        this.InitLayer();
        this.AfterLoad();
    }

    protected onEnable(){ 
        this.OpenLayer(); 
    }

    protected InitLayer() {}//初始化界面信息
    protected AfterLoad() {}//初始化结束以后
    protected OpenLayer() {}//打开一个界面
 
    public CloseWindow():void{
        this.mWindowInterface.ToCloseWindow();
    }

    public CloseLayer(){//关闭界面后做的操作   
        this.mButtonEvent.ClearButtonEvent();
        this.onClose();
    }
    protected onClose(){} 

    //按钮点击注册区域
    protected ButtonClickHandle(eventTouch:EventTouch,args:any):void{
        this.mButtonEvent.ExecuteClickHandle(eventTouch,args);  
        //_Facade.FindProxy(MusicProxy).Play(1);//准备播放一个音效
    }
    public RegisterButtonEvent(node:Node,func:(event:EventTouch,...args)=>void,target?:any,...param):void{
        this.mButtonEvent.RegisterButtonEvent(node,func,target,param);
    } 

    //反注册一个按钮事件
    public UnregisterButtonClick(node:Node,func:(event:EventTouch,...args)=>void):void{ 
        this.mButtonEvent.UnregisterButtonClick(node,func);//反注册指定的回调 
    } 

    //游戏的更新函数，我不喜欢小写字母开头的函数，所以这里进行了修改
    protected update(dt: number): void {
        this.Update(dt);
    }

    protected Update(dt:number){
    }
}