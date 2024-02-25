import { Color } from "cc";
import { WindowInterface } from "../../Compoment/WindowInterface";
import { INotification } from "../PureMVC";
import { eNotice } from "../../NotificationTable";
import { _Facade } from "../../Global";
import { WindowCreateRequest, LayerOrder } from "../../Logic/Proxy/WindowProxy/Class";
import { BaseLayer } from "../BaseLayer/BaseLayer";
import { WindowProxy } from "../../Logic/Proxy/WindowProxy/WindowProxy";
import { ParaseUrl } from "../../Util/Util";
import { LayerComp, WindowBaseMediator } from "./WindowBaseMediator";
//一级面板弹窗管理
export  abstract class MultWindowBaseMediator extends WindowBaseMediator {   
    //基础的多面板是不需要进行多余的资源加载的
    //protected InitResourcePathSet(resourceSet:Set<string>):void{
    //} 
    ///*界面内的一些必要参数*/
    //protected InitPrefabInfo():{path:string,layerComp:LayerComp}{
    //    return {path:"resources/LayerSource/Basics/Component/WindowPrefab/FirstOrderPopupWindow",layerComp:BaseLayer} 
    //}
    ////由用户自定义
    ////public WindowOrder():LayerOrder{ return LayerOrder.MinBottom; }  
    //protected GetWindowParam():{fullScrenMask:boolean,touchClose:boolean,openBg:boolean,bgColor:Color,showLoading:boolean,windowBlock:boolean}{
    //    return {fullScrenMask:false,touchClose:false,openBg:false,bgColor:new Color(0,0,0,0),showLoading:true,windowBlock:true};
    //}
    ////是否显示资源加载信息界面 
    //protected ShowResourceLoadInfo():boolean{ return true; }
  //
    //protected OpenLayer(data:any){//打开一个界面
    //    if(this.WindowInterface) return; //默认情况下一个窗口只能够被打开一次
    //    let layerParam:{fullScrenMask:boolean,touchClose:boolean,openBg:boolean,bgColor:Color,showLoading:boolean,windowBlock:boolean} = this.GetWindowParam();
    //    //发送一个窗口创建请求，以创建本窗口
    //    let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data);//创建一个window请求
    //    windowRequest.SetFullScreenMask(layerParam.fullScrenMask,layerParam.touchClose);   
    //    windowRequest.SetFullScreenBackGround(layerParam.openBg,layerParam.bgColor);    
    //    windowRequest.SetIsLoadingShow(layerParam.showLoading);
    //    windowRequest.SetWindowTouchBlock(layerParam.windowBlock);
    //    _Facade.FindProxy(WindowProxy).CreateWindow(windowRequest,this.mLayerCompnent);//直接进行窗口创建 
    //} 
//
    ////关闭本界面
    //protected CloseLayer(data:any){
    //    _Facade.Send(eNotice.CloseWindow,this.getMediatorName());
    //}
}
