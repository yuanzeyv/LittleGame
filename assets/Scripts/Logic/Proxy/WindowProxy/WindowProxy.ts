import { find, instantiate,Node, Prefab, resources } from "cc"; 
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { ResouceProxy } from "../BundleProxy/ResouceProxy";
import { WindowCreateRequest, LayerOrder, PrefabLoadStruct } from "./Class";
import { BundleAssest } from "../BundleProxy/BundleAsset";
import { BundleProxy, LoadStruct } from "../BundleProxy/BundleProxy";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class WindowProxy extends BaseProxy{
    static  get ProxyName():string { return "WindowProxy" };
    private m_WindowPrefab:Prefab;//窗口的预制体 
    //窗口预制体的对象池
    private mWindowPrefabPool:Array<WindowInterface> = new Array<WindowInterface>();
    private mPoolMaxCount:number = 50;
    //value 窗口的控制组件 key mediator分配的名称
    private m_WindowMap:Map<string,WindowCreateRequest> = new Map<string,WindowCreateRequest>()//保存所有的窗口对象信息，支持打开一个窗口，支持关闭一个窗口。
    private m_OrderNodeMap:Map<LayerOrder,Node> = new Map<LayerOrder,Node>();
    public onLoad(): void { 
        this.InitOrderNode();  
        this.StartDetectionPoolCount();
    }  

    InitOrderNode() {
        this.m_OrderNodeMap.set(LayerOrder.MinBottom,find("Canvas/UINode/MinBottom"));
        this.m_OrderNodeMap.set(LayerOrder.Bottom,find("Canvas/UINode/Bottom"));
        this.m_OrderNodeMap.set(LayerOrder.Normal,find("Canvas/UINode/Normal"));
        this.m_OrderNodeMap.set(LayerOrder.Float,find("Canvas/UINode/Float"));
        this.m_OrderNodeMap.set(LayerOrder.Top,find("Canvas/UINode/Top"));
        this.m_OrderNodeMap.set(LayerOrder.MaxTop,find("Canvas/UINode/MaxTop"));
    }

    public InitWindowPrefab(){ 
        this.m_WindowPrefab = _Facade.FindProxy(BundleProxy).UseAsset("resources/Perfab/WindowInterface") as Prefab;
    } 

    private GenerateWindow(winRequest:WindowCreateRequest):WindowInterface | undefined{
        let windowNodeCompoment:WindowInterface|undefined = this.mWindowPrefabPool.pop();
        if(windowNodeCompoment == undefined){
            windowNodeCompoment = instantiate(this.m_WindowPrefab).getComponent(WindowInterface);//获取到当前节点的窗口组件
            windowNodeCompoment.InitWindowData();
        }
        if(windowNodeCompoment == undefined)
            return undefined;
        windowNodeCompoment.node.name = winRequest.m_Mediator.getMediatorName();
        //窗口接口的初始化工作
        windowNodeCompoment.SetFullScreenMask(winRequest.m_OpenFullScreenMask,winRequest.m_OpenFullScreenBackGround,winRequest.m_FullScreenMaskColor);
        windowNodeCompoment.SetWindowTouchMask(winRequest.m_WindowTouchMask); 
        return windowNodeCompoment;
    }

    //创建一个window 
    public CreateWindow(winRequest:WindowCreateRequest){
        if(!(winRequest.m_Mediator instanceof WindowBaseMediator))//想创建窗口的中介不是窗口中介
            return false;
        let orderNode:Node = this.m_OrderNodeMap.get(winRequest.m_WindowType);
        let mediatorName:string = winRequest.m_Mediator.getMediatorName();
        if(orderNode == undefined  || this.m_WindowMap.has(mediatorName))
            return false;
        let windowNodeCompoment:WindowInterface|undefined = this.GenerateWindow(winRequest);
        if(windowNodeCompoment == undefined)    
            return false;
        winRequest.m_Mediator.SetWindowInterface(windowNodeCompoment);//用mediator打开组件
        orderNode.addChild(windowNodeCompoment.node);//节点进行添加
        //正式打开成功添加入其中
        this.m_WindowMap.set(winRequest.m_Mediator.getMediatorName(),winRequest); 
        //我希望所有的窗口，都是至少在下一帧进行显示
        _Facade.FindProxy(BundleProxy).Load(winRequest.m_Mediator.PrefabPath, (loadStruct: LoadStruct)=>{
            let prefab:Prefab = loadStruct.OperationAsset as Prefab;
            if(prefab == undefined){
                _Facade.Send(NotificationEnum.CloseWindow,mediatorName);//关闭当前mediator对应的窗口
                return;                
            }  
            if(!this.m_WindowMap.has(mediatorName))//对应窗口已经关闭的情况下
                return;
            let isSuccess:boolean = windowNodeCompoment.CreateWindow(prefab,winRequest.m_Data);//重新加载一下当前的节点
            if(isSuccess== false){
                _Facade.Send(NotificationEnum.M_TipsShow,`关闭窗口:${mediatorName} 原因:窗口初始化失败`);//提示窗口打开失败
                this.DeleteWindow(mediatorName);
            } 
        }); 
    } 

    //销毁一个winodw
    public DeleteWindow(mediatorName:string){
        let winRequest:WindowCreateRequest = this.m_WindowMap.get(mediatorName);
        if(winRequest == undefined) return;//没有找到之前的这条创建请求的话 
        this.m_WindowMap.delete(mediatorName);//删除当前mediator

        winRequest.m_Mediator.WindowInterface.node.removeFromParent();
        this.mWindowPrefabPool.push(winRequest.m_Mediator.WindowInterface);//组件插入到节点池

        winRequest.m_Mediator.DestoryWindow();//删除当前的窗口
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