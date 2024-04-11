export enum eAttrType{//用于计算属性的基础信息
    //玩家的基础属性
    Attack                            =    0,//攻击
    AttackPercent                     =    1,//攻击百分比加成
    AttackFinalPercent                =    2,//攻击力最终百分比加成
    Defense                           =    3,//防御
    DefensePercent                    =    4,//防御百分比加成
    DefenseFinalPercent               =    5,//防御力最终百分比加成
    Speed                             =    6,//速度
    SpeedPercent                      =    7,//速度百分比加成
    SpeedFinalPercent                 =    8,//速度力最终百分比加成
    Life                              =    9,//生命
    LifePercent                       =   10,//生命百分比
    LifeFinalPercent                  =   11,//生命最终加成
    //玩家闪避属性    
    Miss                              =   12,//闪避
    MissPercent                       =   13,//闪避百分比
    MissFinalPercent                  =   14,//闪避最终加成
    //抵抗闪避
    ResistanceMiss                    =   15,//抵抗闪避
    ResistanceMissPercent             =   16,//抵抗闪避百分比
    ResistanceMissFinalPercent        =   17,//抵抗闪避最终加成
    //玩家暴击属性    
    Circle                            =   18,//暴击率
    CirclePercent                     =   19,//暴击 
    CircleFinalPercent                =   20,//暴击率
    //抵抗暴击
    ResistanceCircle                  =   21,//抵抗暴击率
    ResistanceCirclePercent           =   22,//抵抗暴击 
    ResistanceCircleFinalPercent      =   23,//抵抗暴击率
    //玩家反击属性
    AttackBack                        =   24,//反击率
    AttackBackPercent                 =   25,//反击  
    AttackBackFinalPercent            =   26,//反击率
    //玩家抵抗反击属性
    ResistanceAttackBack              =   27,//抵抗反击率
    ResistanceAttackBackPercent       =   28,//抵抗反击 
    ResistanceAttackBackFinalPercent  =   29,//抵抗反击率
    //玩家暴击增伤
    CircleDamage                      =   30,//暴击增伤
    CircleDamagePercent               =   31,//暴击增伤百分比
    CircleDamageFinalPercent          =   32,//暴击增伤最终加成 
    //抵抗爆伤
    ResistanceCircleDamage            =   33,//抵抗爆伤
    ResistanceCircleDamagePercent     =   34,//抵抗爆伤百分比
    ResistanceCircleDamageFinalPercent=   35,//抵抗爆伤最终百分比
    //连击
    AttackContinue                      =   36,//连击
    AttackContinuePercent               =   37,//连击百分比
    AttackContinueFinalPercent          =   38,//连击最终加成 
    //抵抗连击
    ResistanceAttackContinue            =   39,//抵抗连击
    ResistanceAttackContinuePercent     =   40,//抵抗连击百分比
    ResistanceAttackContinueFinalPercent=   41,//抵抗连击百分比 
    //攻击吸血
    SuckBlood                           =   42,//攻击吸血
    SuckBloodPercent                    =   43,//攻击吸血百分比
    SuckBloodFinalPercent               =   44,//攻击吸血最终加成 
    //抵抗攻击吸血      
    ResistanceSuckBlood                 =   45,//抵抗攻击吸血
    ResistanceSuckBloodPercent          =   46,//抵抗攻击吸血百分比
    ResistanceSuckBloodFinalPercent     =   47,//抵抗攻击吸血百分比 
    
    
    //玩家的额外基础属性
    SumAttack                         =   100,//总攻击力 
    SumDefense                        =   101,//总防御力
    SumHPLimit                        =   102,//最大生命值
    SumSpeed                          =   103,//总速度
    SumFinalHP                        =   104,//角色当前生命值
    SumMiss                           =   106,//玩家的总闪避属性
    SumResistanceMiss                 =   107,//玩家的总抗闪避属性
    SumCircle                         =   108,//玩家的总暴击属性
    SumResistancCircle                =   109,//玩家的总抗暴击属性
    SumAttackBack                     =   110,//玩家的总反击属性
    SumResistanceAttackBack           =   111,//玩家的总抗抗反击
    SumCircleDamage                   =   112,//玩家的爆伤加成
    SumResistanceCircleDamage         =   113,//玩家的总抗爆伤
    SumAttackContinue                 =   114,//玩家的连击加成
    SumResistanceAttackContinue       =   115,//玩家的抗连击
    SumSuckBlood                      =   116,//玩家的攻击吸血加成
    SumResistanceSuckBlood            =   117,//玩家的抵抗吸血 
};

//属性关联映射(意味着当某一个属性值发生变动时，玩家对应属性映射属性需要重新计算)
export let AttrMappingMap:Map<eAttrType,Array<eAttrType>> = new Map<eAttrType,Array<eAttrType>>();
//攻击
AttrMappingMap.set(eAttrType.Attack                  ,[eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.AttackPercent           ,[eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.AttackFinalPercent      ,[eAttrType.SumAttack]);
//防御
AttrMappingMap.set(eAttrType.Defense                 ,[eAttrType.SumDefense]);
AttrMappingMap.set(eAttrType.DefensePercent          ,[eAttrType.SumDefense]);
AttrMappingMap.set(eAttrType.DefenseFinalPercent     ,[eAttrType.SumDefense]);
//速度
AttrMappingMap.set(eAttrType.Speed                   ,[eAttrType.SumSpeed,eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.SpeedPercent            ,[eAttrType.SumSpeed,eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.SpeedFinalPercent       ,[eAttrType.SumSpeed,eAttrType.SumAttack]);
//生命
AttrMappingMap.set(eAttrType.Life                    ,[eAttrType.SumHPLimit,eAttrType.SumFinalHP]);
AttrMappingMap.set(eAttrType.LifePercent             ,[eAttrType.SumHPLimit,eAttrType.SumFinalHP]);
AttrMappingMap.set(eAttrType.LifeFinalPercent        ,[eAttrType.SumHPLimit,eAttrType.SumFinalHP]);
//闪避
AttrMappingMap.set(eAttrType.Miss                    ,[eAttrType.SumMiss]);
AttrMappingMap.set(eAttrType.MissPercent             ,[eAttrType.SumMiss]);
AttrMappingMap.set(eAttrType.MissFinalPercent        ,[eAttrType.SumMiss]);
//抵抗闪避
AttrMappingMap.set(eAttrType.ResistanceMiss                    ,[eAttrType.SumMiss]);
AttrMappingMap.set(eAttrType.ResistanceMissPercent             ,[eAttrType.SumMiss]);
AttrMappingMap.set(eAttrType.ResistanceMissFinalPercent        ,[eAttrType.SumMiss]);
//暴击伤害
AttrMappingMap.set(eAttrType.CircleDamage            ,[eAttrType.SumCircleDamage]);
AttrMappingMap.set(eAttrType.CircleDamagePercent     ,[eAttrType.SumCircleDamage]);
AttrMappingMap.set(eAttrType.CircleDamageFinalPercent,[eAttrType.SumCircleDamage]);
//抵抗暴伤
AttrMappingMap.set(eAttrType.ResistanceCircleDamage            ,[eAttrType.SumResistanceCircleDamage]);
AttrMappingMap.set(eAttrType.ResistanceCircleDamagePercent     ,[eAttrType.SumResistanceCircleDamage]);
AttrMappingMap.set(eAttrType.ResistanceCircleDamageFinalPercent,[eAttrType.SumResistanceCircleDamage]);
//连击
AttrMappingMap.set(eAttrType.AttackContinue            ,[eAttrType.SumCircleDamage]);
AttrMappingMap.set(eAttrType.AttackContinuePercent     ,[eAttrType.SumCircleDamage]);
AttrMappingMap.set(eAttrType.AttackContinueFinalPercent,[eAttrType.SumCircleDamage]);
//抵抗连击
AttrMappingMap.set(eAttrType.ResistanceAttackContinue            ,[eAttrType.SumAttackContinue]);
AttrMappingMap.set(eAttrType.ResistanceAttackContinuePercent     ,[eAttrType.SumAttackContinue]);
AttrMappingMap.set(eAttrType.ResistanceAttackContinueFinalPercent,[eAttrType.SumAttackContinue]);
//反击
AttrMappingMap.set(eAttrType.AttackBack            ,[eAttrType.SumAttackBack]);
AttrMappingMap.set(eAttrType.AttackBackPercent     ,[eAttrType.SumAttackBack]);
AttrMappingMap.set(eAttrType.AttackBackFinalPercent,[eAttrType.SumAttackBack]);
//抵抗反击
AttrMappingMap.set(eAttrType.ResistanceAttackBack            ,[eAttrType.SumResistanceAttackBack]);
AttrMappingMap.set(eAttrType.ResistanceAttackBackPercent     ,[eAttrType.SumResistanceAttackBack]);
AttrMappingMap.set(eAttrType.ResistanceAttackBackFinalPercent,[eAttrType.SumResistanceAttackBack]);
//暴击 
AttrMappingMap.set(eAttrType.Circle            ,[eAttrType.SumCircle]);
AttrMappingMap.set(eAttrType.CirclePercent     ,[eAttrType.SumCircle]);
AttrMappingMap.set(eAttrType.CircleFinalPercent,[eAttrType.SumCircle]);
//抵抗暴击
AttrMappingMap.set(eAttrType.ResistanceCircle            ,[eAttrType.SumResistancCircle]);
AttrMappingMap.set(eAttrType.ResistanceCirclePercent     ,[eAttrType.SumResistancCircle]);
AttrMappingMap.set(eAttrType.ResistanceCircleFinalPercent,[eAttrType.SumResistancCircle]);
//吸血 
AttrMappingMap.set(eAttrType.SuckBlood            ,[eAttrType.SumSuckBlood]);
AttrMappingMap.set(eAttrType.SuckBloodPercent     ,[eAttrType.SumSuckBlood]);
AttrMappingMap.set(eAttrType.SuckBloodFinalPercent,[eAttrType.SumSuckBlood]);
//抵抗吸血
AttrMappingMap.set(eAttrType.ResistanceSuckBlood            ,[eAttrType.SumResistanceSuckBlood]);
AttrMappingMap.set(eAttrType.ResistanceSuckBloodPercent     ,[eAttrType.SumResistanceSuckBlood]);
AttrMappingMap.set(eAttrType.ResistanceSuckBloodFinalPercent,[eAttrType.SumResistanceSuckBlood]);