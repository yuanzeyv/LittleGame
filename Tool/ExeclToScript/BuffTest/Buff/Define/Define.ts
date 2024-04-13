export type TKV = {k:number,v:number};
export type TBuffType = number;
export type TBuffID = number; 

export enum eBuffType{
    Territory = 1,//领域Buff，
    Normal = 2,//标准Buff，
    StackLevel = 3,//叠加等级Buff
    Stack = 4,//叠加Buff 
}; 

export enum eConditionType{
    TotalMissGreater = 1 ,//自获得Buff后，累计闪避次数大于多少次
    TotalMissLess    = 2 ,//自获得Buff后，累计闪避次数小于多少次

    TotalDoubleHitGreater = 3 ,//自获得Buff后，累计连击次数大于多少次
    TotalDoubleHitLess    = 4 ,//自获得Buff后，累计连击次数小于多少次

    TotalBackHitGreater = 5,//自获得Buff后，累计反击次数大于多少次
    TotalBackHitLess    = 6,//自获得Buff后，累计反击次数小于多少次

    TotalHpPercentGreater = 7,//当前玩家血量大于总生命的百分之多少时
    TotalHpPercentLess = 8,//当前玩家血量小于总生命的百分之多少时

    InsertBuffCompare = 9,//插入的BuffID与自己相同的话
    //回合状态等于开始
    //回合状态不等于开始

    //回合状态为结束状态
    //回合状态不为结束状态
};

export enum eDoSomeType {
    BaseHPPercentADD = 1,//基础生命增加
    BaseHPPercentDEC = 2,//基础生命减少 
}


export enum eTriggerType{ 
    BattleStart        = 0 ,//对局开始=
    RoundStart         = 1 ,//回合开始
    RoundEnd           = 2 ,//回合结束
    BuffInsert         = 3 ,//Buff被插入时
    //攻击消息区域
    AttackFront        = 4 ,//进行攻击前
    AttackAfter        = 5 ,//进行攻击后    
    BeAttackFront        = 6 ,//被攻击前 
    BeAttackAfter        = 7 ,//被攻击后

    HPChangeFront      = 8,//血量变动前
    HPChangeAfter      = 9,//血量变动后
    
    HitTarget = 10,//命中时
    MissAttack = 11,//闪避时

    FINAL                  ,//占位

};