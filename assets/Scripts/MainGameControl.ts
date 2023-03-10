import { Component, director, find, Prefab, _decorator } from "cc";
import { EDITOR } from "cc/env";
import { GameMVCRegister } from "./Config/GameConfig/GameMVCRegister";
import { _Facade, _G } from "./Global";
import { NotificationEnum } from "./NotificationTable";
const { ccclass, property } = _decorator;

interface MessageFormat {
    ID:number;//消息的id
    Data:any;//消息的详细数据
}

//脚本的职责 就是将初始资源进行全部的分配
@ccclass('MainGameControl')
class MainGameControl extends Component{ 
    @property({type:Prefab,displayName:"窗口预制体",readonly:true})
    m_WindowBaseNode:Prefab; 
    start(){ 
        _G.GameMVCRegister = new GameMVCRegister();//游戏mvc控制对象
        _G.GameMVCRegister.Register(); //注册所有的登录MVC
        _Facade.Send(NotificationEnum.M_SetWindowPrefab,this.m_WindowBaseNode);
        _Facade.Send(NotificationEnum.M_LongInOpen);//打开登录界面 
        _Facade.Send(NotificationEnum.M_TipsOpen);//打开登录界面 
        _Facade.Send(NotificationEnum.M_AnnouncementOpen);//打开登录界面  
    }
}