export enum eNotifyType{ 
    BattleInit         ,//对局初始化
    BattleStart         ,//对局开始
    BattleOver         ,//对局结束
    RoundStart          ,//回合开始
    RoundEnd            ,//回合结束
    BuffInsert          ,//Buff被插入时
    AttackFront         ,//进行攻击前    
    AttackAfter         ,//进行攻击后    
    BeAttackFront       ,//被攻击前 
    BeAttackAfter       ,//被攻击后 
    PlayerDie         ,//玩家死亡时

    BattleReport,//进行一次战报记录
};