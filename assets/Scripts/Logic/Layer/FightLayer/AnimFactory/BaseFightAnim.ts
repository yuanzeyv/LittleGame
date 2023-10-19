import { Player } from "../FightLayer";

export enum eFightAnim{
    IDLE,//空闲
    ATTACK,//攻击
    SKILL,//技能
    MOVE,//移动
    TELEPORT,//瞬间移动
    BE_HIT,//受击
    DIE,//死亡
} 

export abstract class BaseFightAnim{
    public abstract Enter(player:Player):void;//进入时要做的事情
    public abstract Exit(player:Player):void;//离开时要做的事情
};