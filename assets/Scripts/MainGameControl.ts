import {_decorator, Component} from "cc";
import {_Facade, _G} from "./Global"; 
import { BundleProxy } from "./Logic/Proxy/BundleProxy/BundleProxy";
import { FishMainProxy } from "./Logic/Proxy/FishMainProxy/FishMainProxy";
import { GameMVCRegister } from "./GameMVCRegister";
import { eNotice } from "./NotificationTable";
const { ccclass, property } = _decorator;
 
//脚本的职责 就是将初始资源进行全部的分配
@ccclass('MainGameControl') 
class MainGameControl extends Component{ 
    start(){ 
    _G.GameMVCRegister = new GameMVCRegister();//游戏mvc控制对象
        _G.GameMVCRegister.Register(); //注册所有的登录MVC 
        _Facade.FindProxy(BundleProxy).LoadBundle("resources",this.BundleLoadResult.bind(this)); //加载游戏必要的基础资源信息
    }
    
    protected update(tick:number){
        _Facade.FindProxy(FishMainProxy).Update(tick); 
        _G.TimeWheel.Tick(Math.ceil(tick * 1000));
    }
    private BundleLoadResult(bundleName:string,isComplete:boolean){
        _Facade.Send(eNotice.InitGameData,{bundleName:bundleName,isComplete:isComplete});
    }
}   
  