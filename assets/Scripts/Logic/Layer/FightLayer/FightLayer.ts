import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { eNotificationEnum } from '../../../NotificationTable';
import { sp } from 'cc';
import { BaseFightAction, eFightAction } from './ActionFactory/BaseFightAction';
import { BaseFightAnim, eFightAnim } from './AnimFactory/BaseFightAnim';
import { find } from 'cc';
import { NormalPlayerAnimAttack, NormalPlayerAnimBeHit, NormalPlayerAnimDie, NormalPlayerAnimIdle, NormalPlayerAnimMove, NormalPlayerAnimSkill, NormalPlayerAnimTeleport } from './AnimFactory/NormalPlayerAnimMatching/NormalPlayerAnimMatching';
import { NormalPlayerActionAttack, NormalPlayerActionBeHit, NormalPlayerActionDie, NormalPlayerActionIdle, NormalPlayerActionMove, NormalPlayerActionSkill, NormalPlayerActionTeleport } from './ActionFactory/NormalPlayerActionMatching/NormalPlayerActionMatching';
const { ccclass, property,type} = _decorator;
//开宝箱界面转为战斗需要考虑的点:
//1:与实际战斗的关联度大不大。
//2:攻击角色共有几个动作状态? 新生、攻击、远程攻击、瞬移点位攻击、技能、受击、空闲、向敌人移动、回到自己的初始点位等。
//3:对应的动画存在多少个？ 攻击、防御、受击、技能、移动、空闲等。
//4:针对存在的Spine动画，是否有规范的命名规则
//5:后续是否会存在 多种攻击方式？  攻击、远程攻击、瞬移点位攻击，如何判断这些攻击方式
//6:击中敌人，在任何判定？  技能播放完毕 或者 是Spine动画帧？  如果是spine动画帧，是否有规范。
//7:玩家移动速度如何获取。
//8:敌人 模型如何获取？
//9:针对每个动作，都会接收对应的状态改变事件。
//  譬如:玩家处于新生状态 此时 被攻击了，是否播放受击动画？ 
//  譬如:玩家处于移动状态 此时 希望回归到初始点，移动状态是否应该兼容。


//1:目前不谈与真正的战斗关联

//(1)攻击角色共有几个动作状态
//譬如 攻击、防御、受击、技能、移动、空闲 等？ 
//(2)攻击角色共有多少个动画动作？ 
//譬如 攻击、防御、受击、技能、移动、空闲 等？ 
//(3)针对2制定的动画动作，其名称规范是什么？ 
//(4)如某些攻击动作，其必定不是动作 或技能播放 结束后才执行地方受击，所以 需要给每个 攻击 等一些动画动作，制定一些事件，并根据动作类型制定相应的事件名称规则。
//(5)攻击移速的规则如何获取
//(6)各种不同类型的人物是否 拥有 不同的攻击方式?  （1）瞬移后攻击 （2）移动后攻击 （3）使用道具进行远程攻击 ? 
//(7)敌人的模型根据什么来创建？  关卡进度 或 宝箱等级？ 
//(8)具体的案子，以及更详细的规则。
//(9)每个动作可能被中断,譬如:
//   空闲状态 会接受 移动 或者 受击的动作，以此来完成动作的替换
//   攻击动作 不接受任何 状态打断
//   受击动作 当再次接收到受击动作后，会重新播放受击动作


//是否与战斗相关联
//战斗的攻击方式是否会因为本次改动受到牵连。 譬如由于模型的更改，最终会关联到战斗的整体规则

enum ePlayerType{
    SELF,//自己
    ENEMY//敌人
}
export class Player{ 
    private mNode:Node;//自己的节点
    private mEnemy:Player;//敌人节点
    private mSpineComp:sp.Skeleton;
    //角色的虚拟状态机工厂
    private mActionMatching:BaseFightAction;//角色状态机
    private mAnimMatching:BaseFightAnim;//角色状态机
    constructor(node:Node){ 
        this.mNode = node; 
        this.mSpineComp = node.getComponent(sp.Skeleton);
        this.ChangeActionStatus(eFightAction.IDLE);
    }

    //改变当前的动画
    public PlayAnim(actionName:string,loop:boolean = true,completeHandle:()=>void = undefined){ 
        this.mSpineComp.setCompleteListener(completeHandle);
        this.mSpineComp.setEventListener((aaa)=>{
            console.log("QQQQQQQQQQQ");
        }); 

        this.mSpineComp.setAnimation(0,actionName,loop)
    } 
    //获取到自己节点位置
    public Node():Node{
        return this.mNode;
    }
    //获取到自己节点位置
    public Enemy():Player{
        return this.mEnemy;
    } 
    public SetEnemy(player:Player):void{
        this.mEnemy = player;
    } 
    //改变自己的状态
    public ChangeActionStatus(status:eFightAction){
        let chooseMatching:new ()=>BaseFightAction;
        switch(status){
            case eFightAction.ATTACK:
                chooseMatching = NormalPlayerActionAttack;
                break;  
            case eFightAction.SKILL:
                chooseMatching = NormalPlayerActionSkill;
                break; 
            case eFightAction.BE_HIT:
                chooseMatching = NormalPlayerActionBeHit;
                break; 
            case eFightAction.DIE:
                chooseMatching = NormalPlayerActionDie;
                break;
            case eFightAction.IDLE:
                chooseMatching = NormalPlayerActionIdle;
                break;
            case eFightAction.MOVE:
                chooseMatching = NormalPlayerActionMove;
                break;
            case eFightAction.TELEPORT:
                chooseMatching = NormalPlayerActionTeleport;
                break;
        }
        this.mActionMatching?.Exit(this);
        this.mActionMatching = new chooseMatching();
        this.mActionMatching.Enter(this);
    }
    //改变自己的状态
    public ChangeAnimStatus(status:eFightAnim){
        let chooseMatching:new ()=>BaseFightAnim;
        switch(status){
            case eFightAnim.ATTACK:
                chooseMatching = NormalPlayerAnimAttack;
                break;
            case eFightAnim.SKILL:
                chooseMatching = NormalPlayerAnimSkill;
                break;
            case eFightAnim.BE_HIT:
                chooseMatching = NormalPlayerAnimBeHit;
                break; 
            case eFightAnim.DIE:
                chooseMatching = NormalPlayerAnimDie;
                break;
            case eFightAnim.IDLE:
                chooseMatching = NormalPlayerAnimIdle;
                break;
            case eFightAnim.MOVE:
                chooseMatching = NormalPlayerAnimMove;
                break;
            case eFightAnim.TELEPORT:
                chooseMatching = NormalPlayerAnimTeleport;
                break;
        }
        this.mAnimMatching?.Exit(this);
        this.mAnimMatching = new chooseMatching(); 
        this.mAnimMatching.Enter(this);
    }

    //改变自己的状态
    public TriggerActionStatus(status:eFightAction){ 
       this.mActionMatching?.Trigger(this,status);
    }
}

export class FightLayer extends BaseLayer { 
    private mPlayerMap:Map<ePlayerType,Player> = new Map<ePlayerType,Player>();
    RegisterExecuteHandle(executeMap:Map<eNotificationEnum,LayerExecute> ){
    }

    InitNode() { 
    }  
     
    protected InitLayer() {
        this.mPlayerMap.set(ePlayerType.SELF,new Player(find("SpawnNode/PlayerSpawnNode/SpineNode",this.node)));
        this.mPlayerMap.set(ePlayerType.ENEMY,new Player(find("SpawnNode/EnemySpawnNode/SpineNode",this.node)));
        this.mPlayerMap.get(ePlayerType.SELF).SetEnemy(this.mPlayerMap.get(ePlayerType.ENEMY));
        this.mPlayerMap.get(ePlayerType.ENEMY).SetEnemy(this.mPlayerMap.get(ePlayerType.SELF));
        this.RegisterButtonEvent(find("BackGround",this.node),"PlayerAttack");
    }

    public PlayerAttack():void{ 
        this.mPlayerMap.get(ePlayerType.ENEMY).TriggerActionStatus(eFightAction.MOVE);
    }
}


