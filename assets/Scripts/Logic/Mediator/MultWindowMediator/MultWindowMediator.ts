import { Color } from "cc";
import { NotificationHandle } from "../../../Frame/BaseMediator/BaseMediator";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eLayerOrder } from "../../Proxy/WindowProxy/Class"; 
import { MultWindowLayer } from "../../Layer/MultWindowLayer/MultWindowLayer";
import { MultWindowProxy } from "../../Proxy/MultWindowProxy/MultWindowProxy";
import { WindowBaseMediator, LayerComp, WindowParam } from "../../../Frame/BaseMediator/WindowBaseMediator";
//设计思路，游戏中永远只可能弹出一个 一级弹窗，所以多面板的设计是放在统一文件中

export class MultWindowMediator extends WindowBaseMediator{  
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(eNotice.MultPanleOpen,this.OpenLayer.bind(this))
        .set(eNotice.MultPanleClose,this.CloseLayer.bind(this)) 
    } 
     
    protected InitResourcePathSet(resourceSet:Set<string>):void{  
        resourceSet.add("resources/LayerSource/MultWindowLayer");   
    }   
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/MultWindowLayer/Prefab/MultWindowLayer",layerComp:MultWindowLayer}; 
    }  
    
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:true,canTouchClose:true,bgColor:new Color(0,255,0,0),showLoading:false,windowBlock:false,closeNotice:eNotice.MultPanleClose}; 
    } 
  
    public WindowOrder():eLayerOrder{ 
        return eLayerOrder.Top;   
    }  
    
    //打开一个界面
    protected OpenLayer(windowID:number){
        let mainID:number = _Facade.FindProxy(MultWindowProxy).GetOneLevelWindowID(windowID);//主窗口ID赋值
        if(mainID == 0)//没有找到这个窗口ID的话，直接会返回
            return;
        super.OpenLayer({mainID:mainID,selectID:windowID});//尝试打开这个ID对应的文件
    } 
}  