import {_decorator, Component, Prefab} from "cc";
import {GameMVCRegister} from "./Register/GameMVCRegister";
import {_Facade, _G} from "./Global";
import {NotificationEnum} from "./NotificationTable";
import { BundleProxy } from "./Logic/Proxy/BundleProxy/BundleProxy";

const { ccclass, property } = _decorator;

interface MessageFormat {
    ID:number;//消息的id
    Data:any;//消息的详细数据
}

//脚本的职责 就是将初始资源进行全部的分配
@ccclass('MainGameControl')
class MainGameControl extends Component{ 
    public m_BundleProxy:BundleProxy|undefined;
    public get BundleProxy():BundleProxy{
        if(this.m_BundleProxy == undefined)
            this.m_BundleProxy = _Facade.FindProxy(BundleProxy);
        return this.m_BundleProxy;
    }
    start(){
        _G.GameMVCRegister = new GameMVCRegister();//游戏mvc控制对象
        _G.GameMVCRegister.Register(); //注册所有的登录MVC 
    }
    
    protected update(tick:number){
        this.BundleProxy.Update();
        _G.TimeWheel.Tick(Math.ceil(tick * 1000));
    }
} 
