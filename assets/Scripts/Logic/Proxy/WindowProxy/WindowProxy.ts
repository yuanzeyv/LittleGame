import { find, instantiate,Node, Prefab, resources } from "cc"; 
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { WindowCreateRequest, LayerOrder } from "./Class";
import { BundleProxy, LoadStruct } from "../BundleProxy/BundleProxy";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class WindowProxy extends BaseProxy{
    static  get ProxyName():string { return "WindowProxy" };
    private mWindowPrefab:Prefab;//窗口的预制体 
    //窗口预制体的对象池
    private mWindowPrefabPool:Array<WindowInterface> = new Array<WindowInterface>();
    private mPoolMaxCount:number = 50;
    //value 窗口的控制组件 key mediator分配的名称
    private mWindowMap:Map<string,WindowInterface> = new Map<string,WindowInterface>()//保存所有的窗口对象信息，支持打开一个窗口，支持关闭一个窗口。
    private mOrderNodeMap:Array<Node> = new Array<Node>(10);
    public onLoad(): void {
        this.InitOrderNode();  
        this.StartDetectionPoolCount();
    }  

    InitOrderNode() {
        this.mOrderNodeMap[LayerOrder.MinBottom] = find("Canvas/UINode/MinBottom");
        this.mOrderNodeMap[LayerOrder.Bottom] = find("Canvas/UINode/Bottom");
        this.mOrderNodeMap[LayerOrder.Normal] = find("Canvas/UINode/Normal");
        this.mOrderNodeMap[LayerOrder.Float] = find("Canvas/UINode/Float");
        this.mOrderNodeMap[LayerOrder.Top] = find("Canvas/UINode/Top");
        this.mOrderNodeMap[LayerOrder.MaxTop] = find("Canvas/UINode/MaxTop");
    }

    //初始化基础窗口预制体
    public InitWindowPrefab(){ 
        this.mWindowPrefab = _Facade.FindProxy(BundleProxy).UseAsset("resources/Perfab/WindowInterface") as Prefab;
    } 

    private GenerateWindow(winRequest:WindowCreateRequest):WindowInterface | undefined{
        let windowNodeCompoment:WindowInterface|undefined = this.mWindowPrefabPool.pop();
        if(windowNodeCompoment == undefined){
            windowNodeCompoment = instantiate(this.mWindowPrefab).getComponent(WindowInterface);//获取到当前节点的窗口组件
            windowNodeCompoment.InitWindowData();
        }
        windowNodeCompoment.node.name = winRequest.mMediator.getMediatorName();
        //窗口接口的初始化工作 
        windowNodeCompoment.SetFullScreenMask(winRequest.m_OpenFullScreenMask,winRequest.m_OpenFullScreenBackGround,winRequest.m_FullScreenMaskColor);
        windowNodeCompoment.SetWindowTouchMask(winRequest.m_WindowTouchMask); 
        windowNodeCompoment.SetMediator(winRequest.mMediator);
        return windowNodeCompoment;
    }

    //创建一个window 
    public CreateWindow(winRequest:WindowCreateRequest,componentCons:new ()=>BaseLayer):boolean{
        if(!(winRequest.mMediator instanceof WindowBaseMediator))//查看创建窗口的中介不是窗口中介
            return false;
        let orderNode:Node|undefined = this.mOrderNodeMap[winRequest.m_WindowType];//获取到待插入节点
        if(orderNode == undefined) 
            return false;
        let mediatorName:string = winRequest.mMediator.getMediatorName();
        if(this.mWindowMap.has(mediatorName))//如果界面已经被打开过的话（不可能进入）
            return false;
        let windowNodeCompoment:WindowInterface = this.GenerateWindow(winRequest);//生成一个管理窗口
        winRequest.mMediator.SetWindowInterface(windowNodeCompoment);
        orderNode.addChild(windowNodeCompoment.node);//节点进行添加
        this.mWindowMap.set(winRequest.mMediator.getMediatorName(),windowNodeCompoment); 
        if(!windowNodeCompoment.CreateWindow(winRequest.mInstanceNode,componentCons,winRequest.m_Data)){
            this.DeleteWindow(mediatorName);
            return false;
        }
        return true;
    } 

    //销毁一个winodw
    public DeleteWindow(mediatorName:string){
        let windowInterface:WindowInterface = this.mWindowMap.get(mediatorName);
        if(windowInterface == undefined) return;//没有找到之前的这条创建请求的话 
        this.mWindowMap.delete(mediatorName);//删除当前mediator
        windowInterface.DestoryWindow();//销毁窗口节点下的所有数据信息
        windowInterface.node.removeFromParent();
        this.mWindowPrefabPool.push(windowInterface);//组件插入到节点池
    } 

    private StartDetectionPoolCount(){
        _G.TimeWheel.Set(2000,this.StartDetectionPoolCount.bind(this));
        let difference:number =  this.mWindowPrefabPool.length - this.mPoolMaxCount
        if(difference > 0)
            return;
        difference = Math.ceil(difference / 2);
        for(let i = 0 ; i < difference ; i++)
            this.mWindowPrefabPool.pop().destroy();
    }
}