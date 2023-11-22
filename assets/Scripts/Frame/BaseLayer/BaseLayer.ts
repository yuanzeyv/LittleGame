import { _decorator, Component,EventHandler, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar, Label, Collider2D, Contact2DType, BoxCollider2D, IPhysics2DContact } from 'cc';
import { INotification } from "../PureMVC";
import { eNotificationEnum as eNotificationEnum } from "../../NotificationTable";
import { MusicControlMediator } from '../../Logic/Mediator/MusicControlMediator/MusicControlMediator';
import { _Facade } from '../../Global';
import { MusicProxy } from '../../Logic/Proxy/MusicProxy/MusicProxy';
export type LayerExecute = (any)=>void;
const { ccclass, property,type} = _decorator;
type KeyPartial<T> = {[Key in keyof T]: T[Key] extends DateConstructor ? never : Key;}[keyof T];
export class ButtonEvent{
    private mLayerNode:Node;
    private mButtonEventMap:Map<string,Map<string,Node>> = new Map<string,Map<string,Node>>();
    constructor(node:Node){
        this.mLayerNode = node;
    } 
    //注册一个按钮事件
    public RegisterButtonEvent<T>(node:Node,funcName:KeyPartial<T>,param:string):void{
        let funcMap:Map<string,Node>|undefined = this.mButtonEventMap.get(node.uuid);
        if( undefined == funcMap ){
            funcMap = new Map<string,Node>();
            this.mButtonEventMap.set(node.uuid,funcMap); 
        }
        let handleName:string = funcName.toString();//函数名称
        if(funcMap.has(handleName))//判断一下以前是否注册过类似的函数
            this.UnregisterButtonClick(node,handleName);
        funcMap.set(handleName,node);
        let button:Button|undefined = node.getComponent(Button);//判断当前要注册事件的节点是否存在button组件
        if(button == undefined)//无则添加一个按钮
            button = node.addComponent(Button);
        //添加按钮事件
        const clickEventHandler = new EventHandler(); 
        clickEventHandler.target = this.mLayerNode; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'BaseLayer';// 这个是脚本类名
        clickEventHandler.handler = handleName; 
        clickEventHandler.customEventData = param;// 这个是脚本类名
        button.clickEvents.push(clickEventHandler);
    }
    //反注册一个按钮事件
    public UnregisterButtonClick<T>(node:Node,funcName:KeyPartial<T>):void{
        let funcMap:Map<string,Node>|undefined = this.mButtonEventMap.get(node.uuid);
        let handleName:string = funcName.toString();
        if( undefined == funcMap || !funcMap.has(handleName))
            return;
        funcMap.delete(handleName);
        if(funcMap.size == 0)
            this.mButtonEventMap.delete(node.uuid);
        //准备正式删除按钮事件
        let events:EventHandler[] = node.getComponent(Button).clickEvents;
        for(let i = 0 ; i < events.length;i++){
            let cell:EventHandler = events[i];
            if(cell == undefined ||
                cell.component != "BaseLayer" || 
                cell.target.uuid != this.mLayerNode.uuid ||
                cell.handler != funcName)
                continue;
            events.splice(i,1);//删除自己
            break;
        }
    }

    public ClearButtonEvent(){
        //循环遍历所有已经注册的
        this.mButtonEventMap.forEach((cell:Map<string,Node>)=>{
            cell.forEach((grid:Node,key:string)=>{
                this.UnregisterButtonClick(grid,key);
            })
        })
    }
}
//窗口的基础
/**
 * 其本身是一个Component组件 拥有一个与BaseMediator功能类似的监听Map,用于监听并执行由WindowMediator发送消息。 并且会有一些功能方法，统一Layer的编写规范。
 */
@ccclass('BaseLayer') 
export class BaseLayer extends Component{ 
    //按钮事件
    private mButtonEvent:ButtonEvent;
    //消息队列,不用map 数组效率更高
    private mExecuteHandle:Map<eNotificationEnum,LayerExecute> = new Map<eNotificationEnum,LayerExecute>();
    protected RegisterExecuteHandle(executeMap:Map<eNotificationEnum ,LayerExecute> ){}

    public NotificationExecute(notification:INotification){
        let handle = this.mExecuteHandle.get(notification.getName() as eNotificationEnum);
        if(handle == undefined) return; 
        try{
            handle(notification.getBody());//执行方法体
        }catch(errro){
            console.error(errro);
        }
    }
    //按钮事件注册区域
    public ButtonSoundHandle(event:EventTouch,param:string = "1"){
        let musicID:number|undefined = Number(param);
        if(musicID != 0 && (isNaN(musicID) || musicID == undefined))
            musicID = 1;
        _Facade.FindProxy(MusicProxy).Play(musicID);
    }
    public RegisterButtonEvent<T>(node:Node,funcName:KeyPartial<T>,param:string = "",musicID:number = 1):void{
        this.mButtonEvent.RegisterButtonEvent(node,funcName,param);
        this.mButtonEvent.RegisterButtonEvent<BaseLayer>(node,"ButtonSoundHandle",musicID.toString());
    }
    //反注册一个按钮事件
    protected UnregisterButtonClick<T>(node:Node,funcName:KeyPartial<T>):void{ 
        this.mButtonEvent.UnregisterButtonClick(node,funcName.toString());//反注册指定的回调
        this.mButtonEvent.UnregisterButtonClick<BaseLayer>(node,"ButtonSoundHandle");//反注册音效回调
    }

    //界面预制体被生成完成后，优先调用的
    public InitBaseLayer(data:any):void{
        this.mButtonEvent = new ButtonEvent(this.node);
        this.RegisterExecuteHandle(this.mExecuteHandle);
        this.InitNode();//创建界面时，直接初始化节点
        this.InitData(data);//初始化数据信息
    }
    public InitNode() {}//初始化节点信息
    protected InitData(data:any) {}//初始化数据信息
 
    protected onLoad(){ 
        this.InitLayer();
        this.AfterLoad();
    }
    protected InitLayer() {}//初始化界面信息
    protected AfterLoad() {}//初始化结束以后
 
    public CloseLayer(){//关闭界面后做的操作
        this.mButtonEvent.ClearButtonEvent();//清理所有的按钮事件
        this.Close();
    }
    protected Close(){}


}
