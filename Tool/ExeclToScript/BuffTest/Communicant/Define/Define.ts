export enum  eAttackType{
    Normal,//正常 
    Miss,//闪避
    ContinueAttack,//连击
    AttackBack,//反击
};

export enum eNotifyType{ 
    BattleInit         ,//对局初始化
    BattleStart         ,//对局开始
    BattleOver         ,//对局结束
    RoundStart          ,//回合开始
    RoundEnd            ,//回合结束
    BuffInsert          ,//Buff被插入时
    /**********
    *攻击消息区域
    ***********/
    AttackFront         ,//进行攻击前    
    AttackAfter         ,//进行攻击后 
    BeAttackFront       ,//被攻击前 
    BeAttackAfter       ,//被攻击后  
    /***********
    *闪避消息区域
    ***********/
    AttackMissFront         ,//进行闪避   
    AttackMissAfter         ,//进行闪避后
    BeAttackMissFront         ,//被闪避    
    BeAttackMissAfter         ,//被闪避后
    /************
    *连击消息区域
    ***********/
    AttackContinueFront         ,//进行连击前
    AttackContinueAfter         ,//进行连击后
    BeAttackContinueFront         ,//被连击前  
    BeAttackContinueAfter         ,//被连击后
    /***********
    *反击消息区域
    ***********/
    AttackBackFront         ,//进行反击前
    AttackBackAfter         ,//进行反击后
    BeAttackBackFront         ,//被反击前  
    BeAttackBackAfter         ,//被反击后
    /***********
    *暴击消息区域
    ***********/
    AttackCircleFront         ,//进行暴击前
    AttackCircleAfter         ,//进行暴击后
    BeAttackCircleFront         ,//被暴击前  
    BeAttackCircleAfter         ,//被暴击后

    /***********
    *吸血消息区域
    ***********/
    SuckBloodFront         ,//进行吸血前
    SuckBloodAfter         ,//进行吸血后
    
    PlayerDie         ,//玩家死亡时
    BattleReport,//进行一次战报记录
};