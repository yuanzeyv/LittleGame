import { Color,Node } from "cc";
import { eLayerOrder } from "../../Logic/Proxy/WindowProxy/Class";
import { eNotice } from "../../NotificationTable";
import { LayerComp, WindowBaseMediator, WindowParam } from "./WindowBaseMediator";
import { MultWindowLayer } from "../../Logic/Layer/MultWindowLayer/MultWindowLayer";
import { INotification } from "../PureMVC";

export  abstract class MultWindowBaseMediator extends WindowBaseMediator {
    public WindowOrder():eLayerOrder{ return eLayerOrder.Top; }  //返回界面要加入的游戏层级
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:true,closeNotice:eNotice.TipsLayerClose,bgColor:new Color(255,0,0,0),showLoading:true,windowBlock:false,};
    }  
    
    protected InitResourcePathSet(resourceSet:Set<string>):void{   
        resourceSet.add("resources/LayerSource/MultWindowLayer");    
    }  
    
    protected InitPrefabInfo(): { path: string; layerComp:LayerComp;} {
        return { path:"resources/LayerSource/MultWindowLayer/Prefab/MultWindowLayer",layerComp:MultWindowLayer}; 
    }

    //窗口执行回调
    protected AddNodeHandle(body:Node,notification:INotification){
        if(!this.mView)//不存在的话
            return;
        (this.mView.LayerComp as MultWindowLayer).AddNodeToContent(body);
    } 
}  

 