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
    ResistanceCircleDamagePercent     =   34,//抵抗爆伤百分比vb x
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



export let AttrNameMap:Map<eAttrType,string> = new Map<eAttrType,string>();
AttrNameMap.set(eAttrType.Attack             ,"攻击加成");
AttrNameMap.set(eAttrType.AttackPercent      ,"攻击百分比");
AttrNameMap.set(eAttrType.AttackFinalPercent ,"最终攻击百分比");
AttrNameMap.set(eAttrType.Defense            ,"防御加成");
AttrNameMap.set(eAttrType.DefensePercent     ,"防御百分比");
AttrNameMap.set(eAttrType.DefenseFinalPercent,"最终防御百分比");
AttrNameMap.set(eAttrType.Speed              ,"速度加成");
AttrNameMap.set(eAttrType.SpeedPercent       ,"速度百分比");
AttrNameMap.set(eAttrType.SpeedFinalPercent  ,"最终速度百分比");
AttrNameMap.set(eAttrType.Life               ,"生命加成");
AttrNameMap.set(eAttrType.LifePercent        ,"生命百分比");
AttrNameMap.set(eAttrType.LifeFinalPercent   ,"最终生命百分比");
AttrNameMap.set(eAttrType.SumAttack          ,"攻击力");
AttrNameMap.set(eAttrType.SumDefense         ,"防御力");
AttrNameMap.set(eAttrType.SumHPLimit         ,"生命值上限");
AttrNameMap.set(eAttrType.SumSpeed           ,"速度");
AttrNameMap.set(eAttrType.SumFinalHP         ,"生命值");  