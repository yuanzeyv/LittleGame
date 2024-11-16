import { Vec2 } from "cc";
import { PhysicsCompBase } from "../../PhysicsCompBase";
import { _Facade } from "../../../../../../Global";
import { OnlyTheBraveProxy } from "../../../OnlyTheBraveProxy";
import { ColliderBase } from "../../../../../../Util/Physics/ColliderBase";
import { eColliderType, ePlayerType, eVisualFieldDetectionType } from "../../ColliderTypeDefine";
import { ActiveCollisionTypes } from "@dimforge/rapier2d-compat";
import { VisualFieldDetectionComp } from "./VisualFieldDetectionComp";
/*
*游戏中的角色类型:
*玩家阵营、怪物阵营、墙体阵营。
*不同阵营的玩家，其刚体下的身体会有不同的碰撞性质。
* 
*我要开发的是一款射击类型的小游戏，那么我们会有敌方英雄、己方英雄、子弹三个游戏类型。
*找一找他们的共同点的话， 
*英雄单位与子弹单位，都有一个身体，用于被其他单位发现。都有一个检测范围，用于观察可操作的角色信息。
*想一想正常的模拟游戏
*游戏中有玩家、敌人。 
*玩家与敌人都会释放子弹攻击敌人，子弹的属性是可以穿刺两个人后，在第三个人的时候消失。
*如何实现呢？
*敌人需要身体，敌人也需要一双眼睛观察自己的敌人(英雄)，当靠近英雄的时候敌人便会向英雄发起攻击
*英雄同样需要身体，英雄也需要一双眼睛观察自己的敌人，当有敌人考虑自己的视野范围内，便会向敌人发射一颗子弹。
*子弹也有身体，子弹也需要一个感应装置，用于确定子弹是否触碰到了敌人。同样的未来会加入墙体单元，子弹的身体会对墙体开放碰撞，到时候子弹便会进行反弹，也就是说未来墙体也会是一个新的碰撞单元
*
* 
* 
* 
* ok，那么现在我的游戏中需要一个摄像机，我该怎么做呢？
* 可以想象一下，摄像机其实就是一双眼睛，也仅有一双眼睛。
* 那么就可以直接将刚体的身体变换为一个相机，然后观察所有的刚体身体。当刚体进入或离开后，向外发送事件即可
* 
* 
* 这样做有好处有坏处。 好处就是游戏抽象很清晰明了。
* 坏处这是，异常耗费游戏内存单元。
* 试想，一个游戏中除了障碍物，大部分元素都是动态的。 
* 障碍物会有一个 刚体一个、一个碰撞器
* 子弹，如果仅仅进行判断攻击的子弹，与障碍物一致
* 子弹，如果需要反弹的话，需要额外加一个碰撞器
* 怪物与英雄需要两个
* 
* 那么我们可以考虑一下，一张游戏的话极端情况的怪物数据
* 如果我非常的菜，但是我的防御非常的高。那么会出现什么样的情况呢？假设一整局的怪物为2000个，如果一整局没有怪物可以伤害到我，并且我的攻击力又巨低，那么就会出现一个问题，我只能打1/3的怪，也就是
* 场上的怪物还会剩1200个，并且我的子弹特效非常的绚丽，极端情况下 场上的基础子弹可能就有 16 * 4 * 4 = 
* 再加上场上的一些基础建筑物按100个计算，512
* （100 + 1024 + 2400）场上至少会有3524个碰撞器
* 512 + 1200 + 100 至少会有1812个刚体单位。 这些是极端情况必定会遇到的。   
* 之前进行猛鬼叔叔开发的时候，总共的单位最多也不会超过800 但是那样已经会造成IOS的闪退。
*/
 
//线速度控制模块，使用此模块后 ，玩家的行进将会由线速度控制
export class AllDetectionComp extends VisualFieldDetectionComp{  
    public OnInit(){ 
        super.OnInit();
        this.mCollider.SetActiveCollisionTypes(32 | 15 | 60943);
    }  

    protected get ColliderGroups(): number {
        return  ((1 << eColliderType.Detection) << 16) | 
                (1 << eColliderType.Hero) |
                (1 << eColliderType.Enemy) |
                (1 << eColliderType.Neutrality);
    }
    
    protected get ColliderDetectionType(): eVisualFieldDetectionType {
        return  eVisualFieldDetectionType.ALL;
    } 
} 