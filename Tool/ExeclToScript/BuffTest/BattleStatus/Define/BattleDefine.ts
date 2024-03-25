//用以记录战斗中各种数据的 及 各种条件的判定
export enum eBattleStatus{
    RoundSumDamage,//单回合造成的伤害
    RoundSumBeDamage,//单回合受到的伤害
    RoundAttackCount,//单回合的攻击次数
    RoundDefenseCount,//单回合的防御次数
    RoundHurtSumCount,//单回合内造成伤害的总次数
    RoundBeHurtSumCount,//单回合内造成伤害的总次数 
    
    BattleSumDamage,//战斗总造成的伤害
    BattleSumBeDamage,//战斗总受到的伤害
    BattleAttackCount,//战斗总的攻击次数
    BattleDefenseCount,//战斗总的防御次数
    BattleHurtSumCount,//战斗总内造成伤害的总次数
    BattleBeHurtSumCount,//战斗总内造成伤害的总次数

    BattleRound,//当前游戏的回合数
};