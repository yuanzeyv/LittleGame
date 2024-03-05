import { EventTouch, Button, EventHandler,Node } from "cc";
export class ButtonEvent{
    private mLayerNode:Node;
    private mButtonEventMap:Map<Node,Map<(event:EventTouch,...args)=>void,Array<any>>> = new Map<Node,Map<(event:EventTouch,...args)=>void,Array<any>>>();
    constructor(node:Node){ this.mLayerNode = node; } 
    //注册一个按钮事件
    public RegisterButtonEvent<T>(node:Node,func:(event:EventTouch,...args)=>void,target?:any,...args:any[]):void{
        let funcMap:Map<(event:EventTouch,...args)=>void,Array<any>>|undefined = this.mButtonEventMap.get(node);//通过节点获取到当前节点监听的函数信息
        if( undefined == funcMap ){//如果当前节点还没有进行监听的话
            funcMap = new Map<(event:EventTouch,...args)=>void,Array<any>>();
            this.mButtonEventMap.set(node,funcMap);//进行设置
        } 
        if(funcMap.has(func))
            this.UnregisterButtonClick(node,func);//反注册
        funcMap.set(func,args);//进行函数配置
        let button:Button|undefined = node.getComponent(Button) || node.addComponent(Button);//判断当前要注册事件的节点是否存在button组件
        const clickEventHandler = new EventHandler(); 
        clickEventHandler.target = this.mLayerNode; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'BaseLayer';// 这个是脚本类名
        clickEventHandler.handler = "ButtonClickHandle"; 
        clickEventHandler.customEventData = {func:func,args:args,target:target} as any;//传入要调用的函数名称
        button.clickEvents.push(clickEventHandler);
    }

    //反注册一个按钮事件
    public UnregisterButtonClick(node:Node,func:(event:EventTouch,...args)=>void):void{
        let funcMap:Map<(event:EventTouch,...args)=>void,Array<any>>|undefined = this.mButtonEventMap.get(node);//通过节点获取到当前节点监听的函数信息
        if( undefined == funcMap || !funcMap.has(func))
            return;
        funcMap.delete(func);
        if(funcMap.size == 0) this.mButtonEventMap.delete(node);
        let events:EventHandler[] = node.getComponent(Button).clickEvents;//获取到所有的事件数组
        for(let i = 0 ; i < events.length;i++){
            let cell:EventHandler = events[i];
            if(cell == undefined || cell.component != "BaseLayer" ||  cell.target.uuid != this.mLayerNode.uuid || cell.customEventData == undefined)
                continue;
            let data:{func:(event:EventTouch,...args)=>void,args:Array<any>} = cell.customEventData as any;
            if(data.func != func)
                continue;
            events.splice(i,1);//删除自己
            break;
        }
    }

    public ClearButtonEvent(){
        //循环遍历所有已经注册的
        this.mButtonEventMap.forEach((cell,node)=>{
            cell.forEach((value,func)=>{
                this.UnregisterButtonClick(node,func);
            })
        })
    } 

    public ExecuteClickHandle(eventTouch:EventTouch,param:{func:(event:EventTouch,...args)=>void,args:Array<any>,target:any}):void{
        let funcMap:Map<(event:EventTouch,...args)=>void,Array<any>>|undefined = this.mButtonEventMap.get(eventTouch.target);//通过节点获取到当前节点监听的函数信息
        if( undefined == funcMap )
            return;  
        if(param.target)
            param.func.call(param.target,eventTouch,...param.args);
        else 
            param.func.call(undefined,eventTouch,...param.args);
    }  
}