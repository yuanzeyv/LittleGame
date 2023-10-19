import { Player } from "../FightLayer";

export enum eFightAction{
    IDLE,//空闲
    ATTACK,//攻击
    SKILL,//技能
    MOVE,//移动
    TELEPORT,//瞬间移动
    BE_HIT,//受击
    DIE,//死亡
} 
export abstract class BaseFightAction{
    public abstract Enter(player:Player):void;//进入时要做的事情
    public abstract Exit(player:Player):void;//离开时要做的事情

    public Trigger(player:Player,activeStatus:eFightAction):void{//触发某一状态时，要做的事情
        let executeHandle:(player:Player)=>void = undefined;
        switch(activeStatus){
            case eFightAction.IDLE:
                executeHandle = this.TriggerIdle.bind(this);
                break;
            case eFightAction.SKILL:
                executeHandle = this.TriggerSkill.bind(this);
                break; 
            case eFightAction.ATTACK:
                executeHandle = this.TriggerAttack.bind(this);
                break; 
            case eFightAction.MOVE:
                executeHandle = this.TriggerMove.bind(this);
                break;
            case eFightAction.TELEPORT:
                executeHandle = this.TriggerTeleport.bind(this);
                break;
            case eFightAction.BE_HIT:
                executeHandle = this.TriggerBeHit.bind(this);
                break;
            case eFightAction.DIE:
                executeHandle = this.TriggerDie.bind(this);
                break;
        }
        executeHandle(player);
    }
    //接收到某个触发时
    protected TriggerMove(player:Player):void {} 
    protected TriggerIdle(player:Player):void {} 
    protected TriggerAttack(player:Player):void {} 
    protected TriggerSkill(player:Player):void {} 
    protected TriggerBeHit(player:Player):void {} 
    protected TriggerTeleport(player:Player):void {} 
    protected TriggerDie(player:Player):void {} 

};