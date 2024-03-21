export enum eAttrType{//用于计算属性的基础信息
    //玩家的基础属性
    Attack              =    0,//攻击
    AttackPercent       =    1,//攻击百分比加成
    AttackFinalPercent  =    2,//攻击力最终百分比加成
    Defense             =    3,//防御
    DefensePercent      =    4,//防御百分比加成
    DefenseFinalPercent =    5,//防御力最终百分比加成
    Speed               =    6,//速度
    SpeedPercent        =    7,//速度百分比加成
    SpeedFinalPercent   =    8,//速度力最终百分比加成
    Life                =    9,//生命
    LifePercent         =   10,//生命百分比
    LifeFinalPercent    =   11,//生命最终加成
 
    //玩家的额外基础属性
    SumAttack           =   50,//总攻击力 
    SumDefense          =   51,//总防御力
    SumHPLimit          =   52,//最大生命值
    SumSpeed            =   53,//总速度
    SumFinalHP          =   54,//角色当前生命值
    Final               ,//最大
};
 


//属性关联映射(意味着当某一个属性值发生变动时，玩家对应属性映射属性需要重新计算)
export let AttrMappingMap:Map<eAttrType,Array<eAttrType>> = new Map<eAttrType,Array<eAttrType>>();
AttrMappingMap.set(eAttrType.Attack,                [eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.AttackPercent,         [eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.AttackFinalPercent,    [eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.Defense,               [eAttrType.SumDefense]);
AttrMappingMap.set(eAttrType.DefensePercent,        [eAttrType.SumDefense]);
AttrMappingMap.set(eAttrType.DefenseFinalPercent,   [eAttrType.SumDefense]);
AttrMappingMap.set(eAttrType.Speed,                 [eAttrType.SumSpeed,eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.SpeedPercent,          [eAttrType.SumSpeed,eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.SpeedFinalPercent,     [eAttrType.SumSpeed,eAttrType.SumAttack]);
AttrMappingMap.set(eAttrType.Life,                  [eAttrType.SumHPLimit,eAttrType.SumFinalHP]);
AttrMappingMap.set(eAttrType.LifePercent,           [eAttrType.SumHPLimit,eAttrType.SumFinalHP]);
AttrMappingMap.set(eAttrType.LifeFinalPercent,      [eAttrType.SumHPLimit,eAttrType.SumFinalHP]);