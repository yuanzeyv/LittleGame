import { find,Node, Vec3, Widget } from "cc"; 
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import {  eLayerOrder } from "./Class";
import { SetFullWidget } from "../../../Util/Util";
import { PoolProxy } from "../PoolProxy/PoolProxy";
import { ePoolDefine } from "../PoolProxy/PoolDefine";
import { InterfaceWindowNode } from "./NodePool/InterfaceWindowNode";
import { eNotice } from "../../../NotificationTable"; 
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class WindowProxy extends BaseProxy{
    static get ProxyName():string { return "WindowProxy" }; 
    //多面板窗口
    private mMultWindowMap:Map<number,WindowInterface> = new Map<number,WindowInterface>();
    //value 窗口的控制组件 key mediator分配的名称
    private mWindowMap:Map<string,WindowInterface> = new Map<string,WindowInterface>()//保存所有的窗口对象信息，支持打开一个窗口，支持关闭一个窗口。
    private mOrderNodeMap:Array<Node> = new Array<Node>();
    public onLoad(): void {
        this.InitOrderNode();   
    }  
    //初始化层级节点 
    private InitOrderNode() {
        let UINode:Node =new Node("UINode"); 
        SetFullWidget(UINode.addComponent(Widget))
        let nodeDataArray:Array<{order:eLayerOrder,name:string,node:Node }> = [
            {order:eLayerOrder.MinBottom,node:undefined,name:"MinBottom" },
            {order:eLayerOrder.Bottom   ,node:undefined,name:"Bottom" },
            {order:eLayerOrder.Normal   ,node:undefined,name:"Normal" },
            {order:eLayerOrder.Float    ,node:undefined,name:"Float" },
            {order:eLayerOrder.Top      ,node:undefined,name:"Top" },
            {order:eLayerOrder.MaxTop   ,node:undefined,name:"MaxTop" }];
        for(let cell of nodeDataArray){
            this.mOrderNodeMap[cell.order] = cell.node = new Node(cell.name);
            SetFullWidget(cell.node.addComponent(Widget))
            UINode.addChild(cell.node);   
        }
        for(let cell of nodeDataArray)
            cell.node.setSiblingIndex(cell.order);
        find("Canvas").addChild(UINode); 
    } 

    public WindowIsEarlyOpen(windowName:string):boolean{
        return this.mWindowMap.has(windowName);
    }
    //普通面板用
    public OpenWindow(windowName:string,windowComp:WindowInterface,order:eLayerOrder):boolean{
        if(this.WindowIsEarlyOpen(windowName))
            return false;
        let orderNode:Node|undefined = this.mOrderNodeMap[order];//尝试获取到这个节点
        if(orderNode == undefined) //不存在此层级
            return false;
        orderNode.addChild(windowComp.node);//将当前界面添加到层级下
        this.mWindowMap.set(windowName,windowComp);//设置插入到节点中去 
        return true;
    }

    public CloseWindow(windowName:string):boolean{ 
        if(!this.WindowIsEarlyOpen(windowName))
            return;
        let interfaceWindow:WindowInterface = this.mWindowMap.get(windowName);
        this.mWindowMap.delete(windowName); 
        interfaceWindow.node.removeFromParent();//删除自己
        interfaceWindow.CloseLayer();
        _Facade.Send(eNotice.DelWindowNode,windowName);//发送关闭节点的消息
    } 

    
    //打开多面板用
    public OpenMultWindow(windowName:string,windowComp:WindowInterface,order:eLayerOrder):boolean{
        if(this.WindowIsEarlyOpen(windowName))
            return false;
        if(this.WindowIsEarlyOpen("MultWindowMediator"))
            return false;
        let interfaceWindow:WindowInterface = this.mWindowMap.get("MultWindowMediator");
        interfaceWindow.node.addChild(windowComp.node);//将当前界面添加到层级下
        this.mWindowMap.set(windowName,windowComp);//设置插入到节点中去 
        return true;
    }

    public CloseMultWindow(windowName:string):boolean{ 
        if(!this.WindowIsEarlyOpen(windowName))
            return;
        let interfaceWindow:WindowInterface = this.mWindowMap.get(windowName);
        this.mWindowMap.delete(windowName); 
        interfaceWindow.node.removeFromParent();//删除自己
        interfaceWindow.CloseLayer();
        _Facade.Send(eNotice.DelWindowNode,windowName);//发送关闭节点的消息
    } 
 
    //实例化一个窗口预制体
    public InitNodePool():void{
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.WindowInterface,new InterfaceWindowNode("LayerSource/Basics/Component/WindowInterface"));
    } 
}   