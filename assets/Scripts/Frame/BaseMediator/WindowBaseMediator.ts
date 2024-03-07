import { Color,Node, Prefab,instantiate } from "cc";
import { WindowInterface } from "../../Compoment/WindowInterface";
import { INotification } from "../PureMVC";
import { eNotice } from "../../NotificationTable";
import { BaseMediator } from "./BaseMediator"; 
import { _Facade } from "../../Global";
import { eLayerOrder } from "../../Logic/Proxy/WindowProxy/Class";
import { BaseLayer } from "../BaseLayer/BaseLayer";
import { WindowProxy } from "../../Logic/Proxy/WindowProxy/WindowProxy";
import { ParaseUrl } from "../../Util/Util"; 
import { ePoolDefine } from "../../Logic/Proxy/PoolProxy/PoolDefine";  
import { PoolProxy } from "../../Logic/Proxy/PoolProxy/PoolProxy";
import { BundleProxy, ListenObj, LoadStruct } from "../../Logic/Proxy/BundleProxy/BundleProxy";
export type LayerComp = new ()=>BaseLayer; 
export type WindowParam = {
                            windowBlock:boolean,//窗口底部是否拥有遮罩
                           fullScreenBlock:boolean,//是否打开全屏的触摸遮罩 
                           bgColor?:Color,//再打开全屏触摸遮罩时，是否显示颜色，及 显示数目颜色
                           showLoading:boolean,//是否显示资源加载时的Loading图 
                           closeNotice?:eNotice,//如果需要点击关闭，需要传入关闭通知  
                           isChildWindow?:boolean,//当前界面是否属于子界面
                        };
export  abstract class WindowBaseMediator extends BaseMediator {
    protected mView:WindowInterface;//MVC视图组件
    protected mResourcePathSet:Set<string> = new Set<string>();//获取到初始资源列表 
    protected mPrefabPathObj:{path:string,layerComp:LayerComp};//获取到预制体路径
    protected mLoadResourceID:number = -1;//资源加载ID   

    //节点池初始化  这个变量会在资源加载完成后，进行调用
    private mIsInitPool:boolean = false;
    onRegister(): void {
        this.InitResourcePathSet(this.mResourcePathSet);//初始化界面资源信息参数
        this.mPrefabPathObj = this.InitPrefabInfo();//初始化预制体 及 界面代理
    }

    //传入界面打开所需要的所有游戏资源
    protected InitResourcePathSet(resourceSet:Set<string>):void{}
    public GetResourceArray():{bundleName:string,dirName:string}[]{
        let ret:Array<{bundleName:string,dirName:string}> = new Array<{bundleName:string,dirName:string}>();
        for(let cell of this.mResourcePathSet){
            let parse:{bundleName:string,url:string} = ParaseUrl(cell)
            ret.push({dirName:parse.url,bundleName:parse.bundleName});
        }
        return ret;
    }

    /*界面内的一些必要参数*/
    protected abstract InitPrefabInfo():{path:string,layerComp:LayerComp};
    public WindowOrder():eLayerOrder{ return eLayerOrder.MinBottom; }  //返回界面要加入的游戏层级
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:true,bgColor:new Color(255,0,0,125),showLoading:true,windowBlock:false,};
    }  
    public GenWindowNode():Node{
        let realPath:{bundleName:string,url:string}  = ParaseUrl(this.mPrefabPathObj.path);
        let windowPrefab:Prefab = _Facade.FindProxy(BundleProxy).UseAsset(realPath.bundleName,realPath.url,Prefab);
        let retNode:Node = instantiate(windowPrefab);
        if(!retNode.getComponent(this.mPrefabPathObj.layerComp)) 
            retNode.addComponent(this.mPrefabPathObj.layerComp);
        return retNode;
    }

    //窗口执行回调
    LayerHandle(body:any,notification:INotification){
        if(this.mView)//不存在的话
            this.mView.ExcuteNotify(notification);
    } 

    //打开一个界面
    protected OpenLayer(data:any){
        if(!!this.mView)//已经打开了本窗口的话，立即返回
            return; 
        let view:Node = _Facade.FindProxy(PoolProxy).Get(ePoolDefine.WindowInterface);//从对象池中取一个可用的窗口
        this.mView = view.getComponent(WindowInterface);//取到组件的Interface
        this.mView.SetWindowBaseData(this.GetWindowParam());
        let canOpen:boolean = _Facade.FindProxy(WindowProxy).OpenWindow(this.getMediatorName(),this.mView,this.WindowOrder());//判断组件是否被正常的添加
        if(!canOpen){//没有被正常打开的话
            _Facade.FindProxy(PoolProxy).Put(ePoolDefine.WindowInterface,view);//对视图节点进行回收
            return;
        } 
        if(this.mLoadResourceID == -1){//立即尝试加载所有的游戏资源
            this.mView.EnterLoadModel();//准备进行资源加载
            this.mLoadResourceID = _Facade.FindProxy(BundleProxy).LoadDirs(this.GetResourceArray());//加载到资源组下的所有资源信息
            _Facade.FindProxy(BundleProxy).RegisterListen(new ListenObj(this.mLoadResourceID,(loadInfo:LoadStruct)=>this.ResourceLoadComplete(loadInfo,data),this.ResourceLoadProgress.bind(this)));//注册监听
        }else{//资源加载成功了
            this.mView.CreateWindow(this.GenWindowNode(),data);//创建游戏窗口
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

 
    //资源加载中
    private ResourceLoadProgress(loadInfo:LoadStruct){ 
        if(!this.mView)//未打开窗口的情况
            return;
        this.mView.UpdateLoadingLayer(loadInfo);
    } 
  
    //加载完成回调
    private ResourceLoadComplete(loadInfo:LoadStruct,data:any){ 
        if(!this.mView)//未打开窗口的情况
            return; 
        this.mView.CompleteLoadingLayer(loadInfo,()=>{
            if(loadInfo.IsAllComplete()){ 
                this.InitNodePool();
                this.mView.CreateWindow(this.GenWindowNode(),data);//创建游戏窗口
                _Facade.Send(eNotice.OpenLayer,this.getMediatorName());
            }else{ 
                _Facade.FindProxy(BundleProxy).DestoryLoadID(this.mLoadResourceID);
                this.mLoadResourceID = -1;//代表资源加载完成了
            }
        }); 
    } 

    //初始化节点池
    private InitNodePool():void{
        if(this.mIsInitPool)
            return;
        this.CreateNodePool()
        this.mIsInitPool = true;
    }
    protected CreateNodePool():void{
    }
} 

