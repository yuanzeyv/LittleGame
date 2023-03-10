import { find, instantiate,Node, Prefab, resources } from "cc"; 
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { Resource } from "../../../Util/Resource/Resource";
import { WindowCreateRequest, LayerOrder, PrefabLoadStruct } from "./Class";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class WindowProxy extends BaseProxy{
    private m_WindowPrefab:Prefab;//主要的窗口

    //窗口预制体
    private m_WaitloadingFinishMap:Map<string,WindowBaseMediator> = new Map<string,WindowBaseMediator>();
    private m_PrefabCache:Map<string,Prefab> = new Map<string,Prefab>();

    //value 窗口的控制组件 key mediator分配的名称
    private m_WindowMap:Map<string,WindowCreateRequest> = new Map<string,WindowCreateRequest>()//保存所有的窗口对象信息，支持打开一个窗口，支持关闭一个窗口。
    private m_OrderNodeMap:Map<LayerOrder,Node> = new Map<LayerOrder,Node>();
    
    public onRegister(): void { 
        this.InitOrderNode();
    }  

    InitOrderNode() {
        this.m_OrderNodeMap.set(LayerOrder.MinBottom,find("Canvas/UINode/MinBottom"));
        this.m_OrderNodeMap.set(LayerOrder.Bottom,find("Canvas/UINode/Bottom"));
        this.m_OrderNodeMap.set(LayerOrder.Normal,find("Canvas/UINode/Normal"));
        this.m_OrderNodeMap.set(LayerOrder.Float,find("Canvas/UINode/Float"));
        this.m_OrderNodeMap.set(LayerOrder.Top,find("Canvas/UINode/Top"));
        this.m_OrderNodeMap.set(LayerOrder.MaxTop,find("Canvas/UINode/MaxTop"));
    }


    SetWindowPrefab(prefab: Prefab) {//初始化预制体资源
        this.m_WindowPrefab = prefab;
    }

    RetrievePrefab(path:string,windowBaseMediator:WindowBaseMediator):Prefab{//为真代表已经存在缓存，为假代表不存在与缓存中，需要在下一帧
        let prefab:Prefab = this.m_PrefabCache.get(path);
        if( prefab == undefined ){
            this.m_WaitloadingFinishMap.set(path,windowBaseMediator);
            Resource.LoadPrefab(path,( prefab:Prefab)=>{
                if(prefab == undefined)
                    _Facade.Send(NotificationEnum.M_PrefabLoadFail,path);
                else
                    _Facade.Send(NotificationEnum.M_PrefabLoadSuccess,new PrefabLoadStruct(path,prefab));
            });
            return undefined;
        }
        return prefab;
    }

    GenerateWindow():WindowInterface{
        let windowNode:Node = instantiate(this.m_WindowPrefab);//实例化一个窗口节点
        let windowNodeCompoment:WindowInterface = windowNode.getComponent(WindowInterface);//获取到当前节点的窗口组件
        return windowNodeCompoment;
    }

    //创建一个window 
    CreateWindow(winRequest:WindowCreateRequest){
        if(!(winRequest.m_Mediator instanceof WindowBaseMediator))
            return;
        if(this.m_WindowMap.has(winRequest.m_Mediator.getMediatorName()))//当前界面已经拥有一个窗口了，不再需要了
            return;
        let orderNode:Node = this.m_OrderNodeMap.get(winRequest.m_WindowType);
        if( orderNode == undefined )//判断待加入的层级是否存在
            return;
        let windowNodeCompoment:WindowInterface = this.GenerateWindow();
        windowNodeCompoment.node.name = winRequest.m_Mediator.getMediatorName();
        winRequest.m_Mediator.SetWindowInterface(windowNodeCompoment);//用mediator打开组件
        orderNode.addChild(windowNodeCompoment.node);//节点进行添加
        //窗口接口的初始化工作
        windowNodeCompoment.CreateWindow(this.RetrievePrefab(winRequest.m_Mediator.PrefabPath,winRequest.m_Mediator));//开始创建 或者开始 加载prefab
        //windowNodeCompoment.WindowNode.setPosition(winRequest.m_WindowPos.x,winRequest.m_WindowPos.y);
        windowNodeCompoment.SetFullScreenMask(winRequest.m_OpenFullScreenMask,winRequest.m_OpenFullScreenBackGround,winRequest.m_FullScreenMaskColor);
        windowNodeCompoment.SetWindowTouchMask(winRequest.m_WindowTouchMask); 

        
        //正式打开成功添加入其中
        this.m_WindowMap.set(winRequest.m_Mediator.getMediatorName(),winRequest); 
    } 

    //销毁一个winodw
    DeleteWindow(mediatorName:string){
        let winRequest:WindowCreateRequest = this.m_WindowMap.get(mediatorName);
        if(winRequest == undefined) return;//没有找到之前的这条创建请求的话 
        winRequest.m_Mediator.DestoryWindow();//删除当前的窗口
        this.m_WindowMap.delete(mediatorName);//删除当前mediator
    }

    
    LoadPrefabSuccess(loadStruct: PrefabLoadStruct) { 
        let mediator:WindowBaseMediator = this.m_WaitloadingFinishMap.get(loadStruct.m_Path);//当前希望加载窗口的mediator
        if(mediator == undefined)   //不存在
            return;
        loadStruct.m_Prefab.addRef();//增加引用，之后会对其进行生命周期管理
        
        this.m_WaitloadingFinishMap.delete(loadStruct.m_Path);
        this.m_PrefabCache.set(loadStruct.m_Path,loadStruct.m_Prefab);
        
        if(!this.m_WindowMap.has(mediator.getMediatorName()))//对应窗口已经关闭的情况下
            return;
        mediator.WindowInterface.CreateWindow(this.RetrievePrefab(mediator.PrefabPath,mediator));//重新加载一下当前的节点
    }

    LoadPrefabFail(path: string) { 
        let mediator:WindowBaseMediator = this.m_WaitloadingFinishMap.get(path);
        if(mediator == undefined)   //不存在
            return;
        this.m_WaitloadingFinishMap.delete(path);
        _Facade.Send(NotificationEnum.M_CloseWindow,mediator.getMediatorName());
    }
    
}