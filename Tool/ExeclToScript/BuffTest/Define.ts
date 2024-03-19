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
    BattleStart        = 0 ,//对局开始
    RoundStart         = 1 ,//回合开始
    RoundEnd           = 2 ,//回合结束
    BuffInsert         = 3 ,//Buff被插入时
    AttackFront        = 4 ,//进行攻击前
    DoubleHitFront     = 5 ,//进行连击前
    MissFornt          = 6 ,//进行闪避前
    BackHitFront       = 7 ,//进行反击前
    SuckBloodFront     = 8 ,//进行吸血前
    AttackAfter        = 9 ,//进行攻击后
    MissAfter          = 10,//进行闪避后
    DoubleHitAfter     = 11,//进行连击后
    BackHitAfter       = 12,//进行反击后
    SuckBloodAfter     = 13,//进行吸血后
    HPChangeFront      = 14,//血量变动前
    HPChangeAfter      = 15,//血量变动后
    FINAL                  ,//占位
};

export interface IBuffObj{
    TriggerType:eTriggerType;//触发条件
    WhyAdd:number;//谁被添加
    BuffID:number;//BuffID
    ExecIndex:number;//满足Index
    Attrs:Array<{k:number,v:number}>//添加属性数组
}