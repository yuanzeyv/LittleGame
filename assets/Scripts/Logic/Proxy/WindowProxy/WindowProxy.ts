import { Animation, find, instantiate,Node, Prefab, tween, UITransform, Vec3, Widget } from "cc"; 
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { WindowCreateRequest, LayerOrder } from "./Class";
import { BundleProxy, ListenObj, LoadID, LoadStruct } from "../BundleProxy/BundleProxy";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { SetFullWidget } from "../../../Util/Util";
import { eNotificationEnum } from "../../../NotificationTable";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class WindowProxy extends BaseProxy{
    static get ProxyName():string { return "WindowProxy" };
    //窗口预制体的对象池
    private mWindowPrefabPool:Array<WindowInterface> = new Array<WindowInterface>();//空闲预制体最多不能超过20个
    private mPoolMaxCount:number = 20;
    //value 窗口的控制组件 key mediator分配的名称
    private mWindowMap:Map<string,WindowInterface> = new Map<string,WindowInterface>()//保存所有的窗口对象信息，支持打开一个窗口，支持关闭一个窗口。
    private mWindowResourceMap:Map<string,{loadID:LoadID,isLoading:boolean}> = new Map<string,{loadID:LoadID,isLoading:boolean}>();//窗口对应的资源信息
    private mOrderNodeMap:Array<Node> = new Array<Node>();
    public onLoad(): void {
        this.InitOrderNode();  
        this.StartDetectionPoolCount();//每经过两秒，都会对窗口对象此进行探测。
    }  
    //初始化层级节点
    InitOrderNode() {
        let CanvasNode:Node = find("Canvas");
        let UINode:Node =new Node("UINode"); 
        SetFullWidget(UINode.addComponent(Widget))
        let nodeDataArray:Array<{order:LayerOrder,name:string,node:Node }> = new Array<{order:LayerOrder,name:string,node:Node}>();
        nodeDataArray.push({order:LayerOrder.MinBottom,node:undefined,name:"MinBottom" });
        nodeDataArray.push({order:LayerOrder.Bottom   ,node:undefined,name:"Bottom" });
        nodeDataArray.push({order:LayerOrder.Normal   ,node:undefined,name:"Normal" });
        nodeDataArray.push({order:LayerOrder.Float    ,node:undefined,name:"Float" });
        nodeDataArray.push({order:LayerOrder.Top      ,node:undefined,name:"Top" });
        nodeDataArray.push({order:LayerOrder.MaxTop   ,node:undefined,name:"MaxTop" });
        for(let cell of nodeDataArray){
            this.mOrderNodeMap[cell.order] = cell.node = new Node(cell.name);
            SetFullWidget(cell.node.addComponent(Widget))
            UINode.addChild(cell.node); 
        }
        for(let cell of nodeDataArray)
            cell.node.setSiblingIndex(cell.order);
        CanvasNode.addChild(UINode); 
    } 
 
    //实例化一个窗口预制体
    public InstantiateWindowPrefab():Node{
        let windowPrefab:Prefab = _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/Basics/Component/WindowInterface",Prefab)!; 
        return instantiate(windowPrefab); 
    } 
    public PopWindowPrefab():WindowInterface{
        let windowNodeCompoment:WindowInterface|undefined = this.mWindowPrefabPool.pop();//通过对象池获取到一个窗口对象
        if(windowNodeCompoment == undefined){
            windowNodeCompoment = this.InstantiateWindowPrefab().getComponent(WindowInterface);//获取到当前节点的窗口组件
            windowNodeCompoment.InitWindowNode();//仅仅初始化一次
        }
        return windowNodeCompoment;
    } 
    //生成一个窗口预制
    private GenerateWindow(winRequest:WindowCreateRequest):WindowInterface | undefined{
        let mediator:WindowBaseMediator = winRequest.Mediator;//获取到请求的Mediator
        let windowInterface:WindowInterface = this.PopWindowPrefab();//弹出一个Window预制体
        windowInterface.node.name = mediator.getMediatorName();
        windowInterface.SetRequest(winRequest);
        windowInterface.SetMediator(mediator);
        return windowInterface; 
    }

    //创建一个window 
    public CreateWindow(winRequest:WindowCreateRequest,componentCons:new ()=>BaseLayer):boolean{
        if(!(winRequest.Mediator instanceof WindowBaseMediator))//要创建窗口节点的Mediator不是窗口Mediator
            return false;
        let mediator:WindowBaseMediator = winRequest.Mediator;
        let orderNode:Node|undefined = this.mOrderNodeMap[mediator.WindowOrder()];//获取到待插入节点
        if(orderNode == undefined) //不存在此层级
            return false;
        let mediatorName:string = mediator.getMediatorName();
        if(this.mWindowMap.has(mediatorName))//如果界面已经被打开过的话（不可能进入）
            return false;
        let windowNodeCompoment:WindowInterface = this.GenerateWindow(winRequest);//生成一个管理窗口
        mediator.WindowInterface = windowNodeCompoment;
        orderNode.addChild(windowNodeCompoment.node);
        windowNodeCompoment.node.setPosition(Vec3.ZERO); 
        this.mWindowMap.set(mediatorName,windowNodeCompoment);  
        windowNodeCompoment.InitLayer();//初始化界面 
        if(this.mWindowResourceMap.has(mediatorName) == false){
            windowNodeCompoment.StartLoadingLayer();//初始化Loading界面
            let loadID = _Facade.FindProxy(BundleProxy).LoadDirs(mediator.GetResourceArray());
            this.mWindowResourceMap.set(mediatorName,{loadID:loadID,isLoading:true})//尝试加载
            _Facade.FindProxy(BundleProxy).RegisterListen(new ListenObj(loadID,this.ResourceLoadComplete.bind(this,mediatorName),this.ResourceLoadProgress.bind(this,mediatorName)));
            return;
        }
        let loadingInfo:{loadID:LoadID,isLoading:boolean} = this.mWindowResourceMap.get(mediatorName);
        if(loadingInfo.isLoading)
            return;
        let createResource:boolean = windowNodeCompoment.CreateWindow(); 
        //否则资源已经存在 直接创建窗口内容
        if(!createResource){
            this.DeleteWindow(mediatorName);
            return false;
        }
        return true;
    } 
    //资源加载中
    private ResourceLoadProgress(mediatorName:string,loadInfo:LoadStruct){
        let windowInterface:WindowInterface = this.mWindowMap.get(mediatorName); 
        windowInterface?.UpdateLoadingLayer(loadInfo);
    } 
  
    //加载完成回调
    private ResourceLoadComplete(mediatorName:string,loadInfo:LoadStruct){
        let sourceInfo:{loadID: number;isLoading: boolean;} = this.mWindowResourceMap.get(mediatorName);
        sourceInfo.isLoading = false; 
        let windowInterface:WindowInterface = this.mWindowMap.get(mediatorName); 
        windowInterface?.CompleteLoadingLayer(loadInfo,()=>{
            if(loadInfo.IsAllComplete()){ 
                let windowNodeCompoment:WindowInterface = this.mWindowMap.get(mediatorName); 
                let createResource:boolean = windowNodeCompoment.CreateWindow();
                //否则资源已经存在 直接创建窗口内容
                if(!createResource){
                    this.DeleteWindow(mediatorName);
                    return ;
                }
            }else{
                _Facade.FindProxy(BundleProxy).DestoryLoadID(sourceInfo.loadID);
            }
        });
         
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
        _Facade.Send(eNotificationEnum.TipsShow,"我叫袁泽宇谢谢");
        _G.TimeWheel.Set(2000,this.StartDetectionPoolCount.bind(this));
        let difference:number =  this.mWindowPrefabPool.length - this.mPoolMaxCount
        if(difference <= 0) return;
        difference = Math.ceil(difference / 2);
        for(let i = 0 ; i < difference ; i++)
            this.mWindowPrefabPool.pop().destroy(); 
    }
}   