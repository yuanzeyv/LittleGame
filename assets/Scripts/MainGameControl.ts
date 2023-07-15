import {_decorator, Component} from "cc";
import {GameMVCRegister} from "./Register/GameMVCRegister";
import {_Facade, _G} from "./Global";
import { NotificationEnum } from "./NotificationTable";

const { ccclass, property } = _decorator;

interface MessageFormat {
    ID:number;//消息的id
    Data:any;//消息的详细数据
}

//脚本的职责 就是将初始资源进行全部的分配
@ccclass('MainGameControl')
class MainGameControl extends Component{ 
    start(){
        _G.GameMVCRegister = new GameMVCRegister();//游戏mvc控制对象
        _G.GameMVCRegister.Register(); //注册所有的登录MVC 
        _Facade.Send(NotificationEnum.InitGameData);//初始化游戏数据
    }
    
    protected update(tick:number){
        _G.TimeWheel.Tick(Math.ceil(tick * 1000));
    }
} 
