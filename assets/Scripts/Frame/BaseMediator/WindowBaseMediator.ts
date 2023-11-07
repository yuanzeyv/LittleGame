/**
 * 后来的想法是，BaseMediator专注于处理消息传递。 新写一个WindowMediator专注与处理界面逻辑，大体逻辑就是，当用户需要编写一个待显示的界面时，应继承此Mediator。
 */
import { Color,Component,Node, Prefab, UITransform, Widget, instantiate } from "cc";
import { WindowInterface } from "../../Compoment/WindowInterface";
import { INotification } from "../PureMVC";
import { NotificationEnum } from "../../NotificationTable";
import { BaseMediator } from "./BaseMediator"; 
import { _Facade } from "../../Global";
import { BundleProxy, LoadStruct } from "../../Logic/Proxy/BundleProxy/BundleProxy";
import { WindowCreateRequest, LayerOrder } from "../../Logic/Proxy/WindowProxy/Class";
import { CopyWidget, SetFullWidget } from "../../Util/Util";
import { BaseLayer } from "../BaseLayer/BaseLayer";
import { WindowProxy } from "../../Logic/Proxy/WindowProxy/WindowProxy";
export  abstract class WindowBaseMediator extends BaseMediator {
    private mPrefabAsset:Prefab|undefined;//预制体资源
    private mLayerCompnent:new ()=>BaseLayer;
    private m_EnableScreenTouchMask:boolean = false;//是否应该存在触摸遮罩层
    private m_ShowScreenTaskImage:boolean = false;//存在的话，是否显示遮罩背景
    private m_ShowScreenMaskColor:Color = new Color(0,0,0,64);
    private m_EnableWindowMask:boolean = true;//窗口触摸是否被遮罩
    private m_EnableDragMove:boolean = false;//是否可以被拖动

    private m_WindowInterface:WindowInterface; //界面关联的组件
    private m_OpenNotify:NotificationEnum;

    private mPrefabPath:string;//获取到预制体资源
    public get PrefabPath():string{
        return this.mPrefabPath;
    }  

    public get WindowInterface():WindowInterface{
        return this.m_WindowInterface;
    }
    public get ExistWindow():boolean{
        return this.m_WindowInterface != undefined;
    } 
    //初始化界面层级
    public WindowOrder():LayerOrder{
        return LayerOrder.MinBottom;
    }  

    

    protected abstract InitPrefabInfo():{path:string,layerConst:new ()=>BaseLayer};

    protected InitWindow():void{
        let prefabInfo:{path:string,layerConst:new ()=>BaseLayer}|undefined = this.InitPrefabInfo();
        this.mPrefabPath = prefabInfo?.path;
        this.mLayerCompnent = prefabInfo?.layerConst; 
    }

    onRegister(): void {
        this.InitWindow();
    }

    SetWindowInterface(window:WindowInterface){
        this.m_WindowInterface = window;
    }

    DestoryWindow() {
        this.m_WindowInterface = undefined;
    }

    LayerHandle(body:any,notification:INotification){
        if(!this.ExistWindow)//窗口不存在直接关闭
            return;
        this.m_WindowInterface.ExcuteNotify(notification);
    }

    protected OpenLayer(data:any){//打开一个界面
        //if(this.ExistWindow)//存在的话直接进行返回
        //    return; 
        //发送一个窗口创建请求，以创建本窗口
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data);//创建一个window请求
        windowRequest.SetFullScreenMask(true,true,new Color(0,0,0,0));  
        windowRequest.SetWindowTouchMask(false);   
        _Facade.FindProxy(WindowProxy).CreateWindow(windowRequest,this.mLayerCompnent);//直接进行窗口创建

        //if(this.mPrefabAsset == undefined){
        //    _Facade.FindProxy(BundleProxy).Load(this.PrefabPath, Prefab,(loadStruct: LoadStruct)=>{
        //        if(this.mPrefabAsset != undefined){//防止连点
        //            console.warn(`尝试连续多次的加载${this.PrefabPath}`);
        //            return; 
        //        } 
        //        let prefab:Prefab = _Facade.FindProxy(BundleProxy).UseAsset(loadStruct.OperationAssetName,Prefab);
        //        if(prefab == undefined){
        //            _Facade.Send(NotificationEnum.M_TipsShow,`打开窗口失败:${this.getMediatorName()} 原因:窗口预制体加载失败`);//提示窗口打开失败
        //            return;                
        //        }  
        //        this.mPrefabAsset = prefab;
        //        this.OpenLayer(data);
        //    });
        //    return;
        //}  
        //let layerCell:Node = instantiate(this.mPrefabAsset);//实例化当前预制体     
        //layerCell.setPosition(0,0,0); 
        //let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,layerCell,data,this.mWindowLayerOrder);//创建一个window请求
        //windowRequest.SetFullScreenMask(false,false,new Color(0,0,0,0));
        //windowRequest.SetWindowTouchMask(false);
        //_Facade.FindProxy(WindowProxy).CreateWindow(windowRequest,this.mLayerCompnent);//直接进行窗口创建
    } 
    //关闭本界面
    protected CloseLayer(data:any){
        _Facade.Send(NotificationEnum.CloseWindow,this.getMediatorName());
    }
}
