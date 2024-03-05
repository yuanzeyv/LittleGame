import { Color } from "cc";
import { eLayerOrder } from "../../Logic/Proxy/WindowProxy/Class";
import { eNotice } from "../../NotificationTable";
import { WindowBaseMediator, WindowParam } from "./WindowBaseMediator";

export  abstract class MultWindowBaseMediator extends WindowBaseMediator {
    private mChildPanel:Node;//当前多面版监听的UI界面
    
    public WindowOrder():eLayerOrder{ return eLayerOrder.Top; }  //返回界面要加入的游戏层级
    protected GetWindowParam():WindowParam{
        return {fullScreenBlock:true,closeNotice:eNotice.TipsLayerClose,bgColor:new Color(255,0,0,125),showLoading:true,windowBlock:false,};
    }  
} 

