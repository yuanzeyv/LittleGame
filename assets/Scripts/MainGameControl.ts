import {_decorator, Component, Director, director, dynamicAtlasManager, find, game, gfx, macro, setDisplayStats} from "cc";
import {_Facade, _G} from "./Global"; 
import { BundleProxy } from "./Logic/Proxy/BundleProxy/BundleProxy";
import { GameMVCRegister } from "./GameMVCRegister";
import { eNotice } from "./NotificationTable"; 
import { EDITOR } from "cc/env";
import Physics from '@dimforge/rapier2d-compat';
import { Util } from "pathfinding";
const { ccclass, property } = _decorator;
//  
//脚本的职责 就是将初始资源进行全部的分配
@ccclass('MainGameControl') 
class MainGameControl extends Component{ 
    start(){ 
        _G.GameMVCRegister = new GameMVCRegister();//游戏mvc控制对象
        _G.GameMVCRegister.Register(); //注册所有的登录MVC 
        this.InitGame();
    }
    private InitPhysics():Promise<void>{
        return Physics.init();
    }
    private LoadResourcesBundle():Promise<string|undefined>{
        return new Promise((resolve:(value:string|undefined)=>void)=>{
            _Facade.FindProxy(BundleProxy).LoadBundle("resources",(bundleName:string,isComplete:boolean)=>{
                resolve(isComplete ? bundleName : undefined);
            });
        });
    }
    
    private Sleep():Promise<void>{
        return new Promise<void>((resolve:(value:any)=>void)=>{
            setTimeout(()=>resolve(undefined),2);
        });
    }
    
    private async InitGame():Promise<void>{
        await this.InitPhysics();//等地啊物理引擎初始化成功
        
        let bundleName:string;
        while(!(bundleName = (await this.LoadResourcesBundle())))
            await this.Sleep();
        _Facade.Send(eNotice.InitGameData,{bundleName:bundleName,isComplete:true}); 
    }
     
    protected update(tick:number){ 
        _G.TimeWheel.Tick(Math.ceil(tick * 1000));
    }
    private BundleLoadResult(bundleName:string,isComplete:boolean){
    }
}   
if (!EDITOR) {  
    director.on(Director.EVENT_AFTER_SCENE_LAUNCH,()=>{
        find("Canvas").addComponent(MainGameControl);  
    })
}    
macro.CLEANUP_IMAGE_CACHE = false;
dynamicAtlasManager.enabled = true;
dynamicAtlasManager.maxFrameSize = 512; 

   
/*
*关于设计游戏中的Buff系统的设计思路
*Buff是什么：Buff分为增益Buff与减益Buff，其主要功能是动态增减角色的属性 或 记录一些角色的变量信息。
*举个例子:
1:游戏中有个药水叫做力量药水，其作用是在5分钟的时间里，增加500点的玩家物理攻击力。
2:在游戏地图里，存在一篇区域，进入其中的玩家会减速%30
3:在游戏地图中，有这样一个技能，释放一片毒雾范围，玩家进入其中每一秒会扣除5滴血。 如果玩家一直在该区域下，每秒Buff等级会叠加一层，造成的伤害也会进一步提升。 叠加等级最大到达7级，
4:游戏中存在有这种类型的Buff,当玩家死亡时,会向四周发射 1 - 5克子弹，攻击最近的敌人·
5:Buff可以被触发，譬如英雄联盟的冰女再击杀了人物之后，会使生成一个蓝色的虚拟人物，并自动寻找最近的敌人爆炸。 或者 子弹A在击中了敌人后，会爆炸生成4个子弹B
*/
 