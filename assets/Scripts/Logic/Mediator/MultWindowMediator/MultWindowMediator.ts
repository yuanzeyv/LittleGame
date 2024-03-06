import { BaseMediator, NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { MultWindowProxy } from "../../Proxy/MultWindowProxy/MultWindowProxy";
import { MultWindowParam, MultWindowParamMap } from "../../Proxy/MultWindowProxy/MultWindowTypeDefine";
export class MultWindowMediator extends BaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.MultPanleOpen,this.OpenLayer.bind(this))
        .set(eNotice.MultPanleClose,this.CloseLayer.bind(this)) 
    } 
      
    //打开一个界面
    protected OpenLayer(windowID:number){
        let mainID:number = _Facade.FindProxy(MultWindowProxy).GetOneLevelWindowID(windowID);//主窗口ID赋值
        if(mainID == 0){//没有找到这个窗口ID的话，直接会返回
            _Facade.Send(eNotice.TipsShow,`窗口${windowID} 没有找到一级窗口 ${mainID}`);
            return;
        }
        let multConfig:MultWindowParam|undefined = MultWindowParamMap[mainID];
        if(multConfig == undefined){
            _Facade.Send(eNotice.TipsShow,`未配置一级窗口的多面板信息`)
            return;
        }
        _Facade.Send(multConfig.openNotice,{mainID:mainID,selectID:windowID});//尝试打开一级窗口
    } 


    //打开一个界面
    protected CloseLayer(windowID:number){
        let mainID:number = _Facade.FindProxy(MultWindowProxy).GetOneLevelWindowID(windowID);//主窗口ID赋值
        if(mainID == 0){//没有找到这个窗口ID的话，直接会返回
            _Facade.Send(eNotice.TipsShow,`窗口${windowID} 没有找到一级窗口 ${mainID}`);
            return;
        }
        let multConfig:MultWindowParam|undefined = MultWindowParamMap[mainID];
        if(multConfig == undefined){
            _Facade.Send(eNotice.TipsShow,`未配置一级窗口的多面板信息`)
            return;
        }
        _Facade.Send(multConfig.closeNotice);
    } 
}  