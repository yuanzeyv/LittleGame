import { Color, Prefab, Vec2 ,Node} from "cc"; 
import { WindowBaseMediator } from "../../../Frame/BaseMediator/WindowBaseMediator";
export class PrefabLoadStruct{
    public m_Path:string;
    public m_Prefab:Prefab;
    public m_Data:any;
    constructor(path:string,prefab:Prefab,data:any){
        this.m_Path = path;
        this.m_Prefab = prefab;
        this.m_Data = data;
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
    private mMediator:WindowBaseMediator;//被打开的Mediator
    private mData:any;//窗口被打开时，所携带的数据
    //全屏遮罩
    private mOpenFullScreenMask:boolean = false;//是否需要全屏遮罩
    private mFullScreenTouchCloseLayer:boolean = false;//拥有全屏遮罩状态时，触摸关闭当前界面
    //全屏背景
    private mOpenFullScreenBackGround:boolean = false;//是否显示遮罩背景
    private mFullScreenMaskColor:Color = new Color(0,0,0,64);//全屏遮罩的颜色
    //窗口是否可以遮挡触摸
    private mWindowTouchBlock:boolean = false;//窗口是否能够遮挡触摸
    //加载资源时是否应该显示Loading
    private mShowLoadingNode:boolean = false;
    //常量请求区域
    public get Mediator():WindowBaseMediator{ return this.mMediator; }
    public get Data():any{ return this.mData; }
    public get IsOpenFullScreen():boolean{ return this.mOpenFullScreenMask; }
    public get IsOpenTouchCloseSwitch():boolean{ return this.mFullScreenTouchCloseLayer; }
    public get IsOpenFullScreenBG():boolean{ return this.mOpenFullScreenBackGround; }
    public get FullBGColor():Color{ return this.mFullScreenMaskColor; }
    public get IsShowLoadingNode():boolean{ return this.mShowLoadingNode; }
    public get IsWindowTouchBlock():boolean{ return this.mWindowTouchBlock; }

    constructor(mediator:WindowBaseMediator,data:any){
        this.mData = data;
        this.mMediator = mediator;
    }
    
    //设置全屏遮罩信息
    SetFullScreenMask(screenEnable:boolean = false,touchClose:boolean = false){
        this.mOpenFullScreenMask = screenEnable;
        this.mFullScreenTouchCloseLayer = touchClose;
    }

    SetFullScreenBackGround(isOpen:boolean = false,color:Color = new Color(0,0,0,0)){
        this.mOpenFullScreenBackGround = isOpen;
        this.mFullScreenMaskColor = color;
    }

    SetWindowTouchBlock(isOpen:boolean = false){
        this.mWindowTouchBlock = isOpen; 
    }

    SetIsLoadingShow(isOpen:boolean = false){
        this.mShowLoadingNode = isOpen;
    }
} 