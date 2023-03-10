import { Color, Prefab, Vec2 } from "cc"; 
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
export class PrefabLoadStruct{
    public m_Path:string;
    public m_Prefab:Prefab;
    constructor(path:string,prefab:Prefab){
        this.m_Path = path;
        this.m_Prefab = prefab;
    }
}

export enum LayerOrder{
    MinBottom,//最底部
    Bottom,//底部
    Normal,//通用
    Float,//悬浮
    Top,//顶部
    MaxTop,//最顶部

}

//创建一个窗口的传入信息
export class WindowCreateRequest{
    public m_Mediator:WindowBaseMediator;//被注册的mediator
    public m_Data:any;//一个窗口所携带的信息
    public m_WindowType:LayerOrder;//窗口类型，用于判断窗口应该添加到哪一层之上  
    public m_WindowPos:Vec2 = new Vec2(0,0);//窗口类型，用于判断窗口应该添加到哪一层之上  
    
    public m_OpenFullScreenMask:boolean = false;//是否需要全屏遮罩
    public m_OpenFullScreenBackGround:boolean = false;//是否显示遮罩背景
    public m_FullScreenMaskColor:Color = new Color(0,0,0,64);//全屏遮罩的颜色

    public m_WindowTouchMask:boolean;//是否需要窗口遮罩

    constructor(mediator:WindowBaseMediator,data:any,windowType:LayerOrder = LayerOrder.Normal){
        this.m_Data = data;
        this.m_WindowType =windowType;
        this.m_Mediator = mediator;
    }

    //设置是否打开全屏mask
    SetFullScreenMask(touchEnable:boolean = false,maskBGEnable:boolean = false,color:Color = new Color(0,0,0,64)){
        this.m_OpenFullScreenMask = touchEnable;
        this.m_OpenFullScreenBackGround = maskBGEnable;
        this.m_FullScreenMaskColor = color;
    }

    //Window Table Mask
    SetWindowTouchMask(touchEnable:boolean = false){
        this.m_WindowTouchMask = touchEnable;
    }

    SetWindowPosition(pos:Vec2){
        this.m_WindowPos.set(pos);
    }
} 