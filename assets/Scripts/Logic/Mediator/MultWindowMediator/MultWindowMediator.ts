import { Color } from "cc";
import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class"; 
import { MultWindowLayer } from "../../Layer/MultWindowLayer/MultWindowLayer";
import { MultWindowProxy } from "../../Proxy/MultWindowProxy/MultWindowProxy";
import { WindowBaseMediator, LayerComp, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
import { MultWindowParam, MultWindowParamMap } from "../../Proxy/MultWindowProxy/MultWindowTypeDefine";
//设计思路，游戏中永远只可能弹出一个 一级弹窗，所以多面板的设计是放在统一文件中

export class MultWindowMediator extends BaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.MultPanleOpen,this.OpenLayer.bind(this))
        .set(eNotice.MultPanleClose,this.CloseLayer.bind(this)) 
    } 
      
    //打开一个界面
    protected OpenLayer(windowID:number){
        let mainID:number = _Facade.FindProxy(MultWindowProxy).GetOneLevelWindowID(windowID);//主窗口ID赋值
        if(mainID == 0)//没有找到这个窗口ID的话，直接会返回
            return;
        let multConfig:MultWindowParam|undefined = MultWindowParamMap[mainID];
        if(multConfig == undefined){
            console.warn(`无法找到类型为${mainID}的主窗口信息`);
            return;
        }
        _Facade.Send(multConfig.openNotice,{mainID:mainID,selectID:windowID});
    } 


    //打开一个界面
    protected CloseLayer(windowID:number){
        let mainID:number = _Facade.FindProxy(MultWindowProxy).GetOneLevelWindowID(windowID);//主窗口ID赋值
        if(mainID == 0)//没有找到这个窗口ID的话，直接会返回
            return;
        let multConfig:MultWindowParam|undefined = MultWindowParamMap[mainID];
        if(multConfig == undefined){
            console.warn(`无法找到类型为${mainID}的主窗口信息`);
            return;
        } 
        _Facade.Send(multConfig.closeNotice);
    } 
}  