import { Color,Node } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { LayerComp, WindowBaseMediator, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class";  
import { BagLayer } from "../../Layer/BagLayer/BagLayer";
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { BundleProxy, ListenObj, LoadStruct } from "../../Proxy/BundleProxy/BundleProxy";
import { ePoolDefine } from "../../Proxy/PoolProxy/PoolDefine";
import { PoolProxy } from "../../Proxy/PoolProxy/PoolProxy";
import { WindowProxy } from "../../Proxy/WindowProxy/WindowProxy";

export class BagMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.OpenBagLayer,this.OpenLayer.bind(this))
        .set(eNotice.CloseBagLayer,this.CloseLayer.bind(this)) 
    } 
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{  
        resourceSet.add("resources/LayerSource/BagLayer");    
    }   
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/BagLayer/Prefab/BagLayer",layerComp:BagLayer}; 
    }   
    
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:false,bgColor:new Color(125,125,125,125),showLoading:false,closeNotice:eNotice.CloseBagLayer,windowBlock:false,}; 
    } 
   
    public WindowOrder():eLayerOrder{ 
        return eLayerOrder.Top;  
    }    
 
    
    //打开一个界面
    protected OpenLayer(windowID:number){
        if(!!this.mView)//已经打开了本窗口的话，立即返回
            return; 
        let view:Node = _Facade.FindProxy(PoolProxy).Get(ePoolDefine.WindowInterface);//从对象池中取一个可用的窗口
        this.mView = view.getComponent(WindowInterface);//取到组件的Interface
        this.mView.SetWindowBaseData(this.GetWindowParam()); 
        let canOpen:boolean = _Facade.FindProxy(WindowProxy).OpenMultWindow(this.getMediatorName(),this.mView,windowID);//判断组件是否被正常的添加
        if(!canOpen){//没有被正常打开的话 
            _Facade.FindProxy(PoolProxy).Put(ePoolDefine.WindowInterface,view);//对视图节点进行回收 
            return;
        } 
        if(this.mLoadResourceID == -1){//立即尝试加载所有的游戏资源
            this.mView.EnterLoadModel();//准备进行资源加载
            this.mLoadResourceID = _Facade.FindProxy(BundleProxy).LoadDirs(this.GetResourceArray());//加载到资源组下的所有资源信息
            _Facade.FindProxy(BundleProxy).RegisterListen(new ListenObj(this.mLoadResourceID,(loadInfo:LoadStruct)=>this.ResourceLoadComplete(loadInfo,windowID),this.ResourceLoadProgress.bind(this)));//注册监听
        }else{//资源加载成功了
            this.mView.CreateWindow(this.GenWindowNode(),windowID);//创建游戏窗口
            _Facade.Send(eNotice.OpenLayer,this.getMediatorName()); 
        }
    } 

    //关闭本界面
    protected CloseLayer(data:any){
        if(!this.mView)//未打开窗口的情况
            return;

            _Facade.FindProxy(WindowProxy).CloseWindow(this.getMediatorName());
        _Facade.FindProxy(PoolProxy).Put(ePoolDefine.WindowInterface,this.mView.node);//对视图节点进行回收
        this.mView = undefined;
    } 
}  
