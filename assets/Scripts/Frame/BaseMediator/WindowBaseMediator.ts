/**
 * 后来的想法是，BaseMediator专注于处理消息传递。 新写一个WindowMediator专注与处理界面逻辑，大体逻辑就是，当用户需要编写一个待显示的界面时，应继承此Mediator。
 */
import { Color } from "cc";
import { WindowInterface } from "../../Compoment/WindowInterface";
import { INotification } from "../PureMVC";
import { NotificationEnum } from "../../NotificationTable";
import { BaseMediator } from "./BaseMediator";
export class WindowBaseMediator extends BaseMediator {
    private m_OpenSound:string;//打开音效
    private m_CloseSound:string;//关闭音效
    private m_EnableScreenTouchMask:boolean = false;//是否应该存在触摸遮罩层
    private m_ShowScreenTaskImage:boolean = false;//存在的话，是否显示遮罩背景
    private m_ShowScreenMaskColor:Color = new Color(0,0,0,64);

    private m_EnableWindowMask:boolean = true;//窗口触摸是否被遮罩
    private m_EnableDragMove:boolean = false;//是否可以被拖动

    private m_WindowInterface:WindowInterface; //界面关联的组件

    private m_OpenNotify:NotificationEnum;

    private m_PrefabPath:string;//获取到预制体资源
    public get PrefabPath():string{
        return this.m_PrefabPath;
    }
    static get MediatorName(){ return "WindowBaseMediator"; }


    public get WindowInterface():WindowInterface{
        return this.m_WindowInterface;
    }
    public get ExistWindow():boolean{
        return this.m_WindowInterface != undefined;
    }

    protected InitPrefabPath(){
        return "";
    }

    protected InitWindow():void{
        this.m_PrefabPath = this.InitPrefabPath();
    }

    onRegister(): void {
        this.InitWindow();
    }

    SetWindowInterface(window:WindowInterface){
        this.m_WindowInterface = window;
    }

    DestoryWindow() {
        this.m_WindowInterface.DestoryWindow();//销毁当前的窗口节点
        this.m_WindowInterface = undefined;
    }

    LayerHandle(body:any,notification:INotification){
        if(!this.ExistWindow)//窗口不存在直接关闭
            return;
        this.m_WindowInterface.ExcuteNotify(notification);
    }
}
