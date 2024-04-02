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
    //攻击消息区域
    AttackFront        = 4 ,//进行攻击前    
    AttackAfter        = 5 ,//进行攻击后    
    BeAttackFront        = 4 ,//被攻击前 
    BeAttackAfter        = 5 ,//被攻击后

    HPChangeFront      = 6,//血量变动前
    HPChangeAfter      = 7,//血量变动后
    
    //暴击消息区域
    CircleFront        = 8 ,//暴击前
    CircleAfter        = 9 ,//暴击后
    BeCircleFront      = 10,//被暴击前
    BeCircleAfter      = 11,//被暴击后
    
    //连击触发区域
    AttackContinueFront        = 8 ,//连击前
    AttackContinueAfter        = 9 ,//连击后
    BeAttackContinueFront      = 10,//被连击前
    BeAttackContinueAfter      = 11,//被连击后

    //反击触发区域
    AttackBackFront        = 8 ,//反击前
    AttackBackAfter        = 9 ,//反击后
    BeAttackBackFront      = 10,//被反击前
    BeCAttackBackfter      = 11,//被反击后

    FINAL                  ,//占位
};