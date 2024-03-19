export enum eBaseAttr{//用于计算属性的基础信息
    Attack              =    0,//攻击
    AttackPercent       =    1,//攻击百分比加成
    AttackFinalPercent  =    2,//攻击力最终百分比加成
    Defense             =    3,//防御
    DefensePercent      =    4,//防御百分比加成
    DefenseFinalPercent =    5,//防御力最终百分比加成
    Speed               =    6,//速度
    SpeedPercent        =    7,//速度百分比加成
    SpeedFinalPercent   =    8,//速度力最终百分比加成
    Life                =    9,//速度
    LifePercent         =   10,//速度百分比加成
    LifeFinalPercent    =   11,//速度力最终百分比加成
    Final               =   12,//最大
};

export enum eAttrType{//玩家的属性
    Attack  = 0,//总攻击力 
    Defense = 1,//总防御力
    HPLimit = 2,//最大生命值
    Speed   = 3,//总速度
    FinalHP = 4,//角色当前生命值
    Final      ,
}

//阵营信息
export enum eCampType{
    Initiative,//主动进攻的一方 
    Passivity, //被动防守的一方
}



//属性关联映射(意味着当某一个属性值发生变动时，玩家对应属性映射属性需要重新计算)
export let AttrMappingMap:Map<eBaseAttr,Array<eAttrType>> = new Map<eBaseAttr,Array<eAttrType>>();
AttrMappingMap.set(eBaseAttr.Attack,                [eAttrType.Attack]);
AttrMappingMap.set(eBaseAttr.AttackPercent,         [eAttrType.Attack]);
AttrMappingMap.set(eBaseAttr.AttackFinalPercent,    [eAttrType.Attack]);
AttrMappingMap.set(eBaseAttr.Defense,               [eAttrType.Defense]);
AttrMappingMap.set(eBaseAttr.DefensePercent,        [eAttrType.Defense]);
AttrMappingMap.set(eBaseAttr.DefenseFinalPercent,   [eAttrType.Defense]);
AttrMappingMap.set(eBaseAttr.Speed,                 [eAttrType.Speed,eAttrType.Attack]);
AttrMappingMap.set(eBaseAttr.SpeedPercent,          [eAttrType.Speed,eAttrType.Attack]);
AttrMappingMap.set(eBaseAttr.SpeedFinalPercent,     [eAttrType.Speed,eAttrType.Attack]);
AttrMappingMap.set(eBaseAttr.Life,                  [eAttrType.HPLimit,eAttrType.FinalHP]);
AttrMappingMap.set(eBaseAttr.LifePercent,           [eAttrType.HPLimit,eAttrType.FinalHP]);
AttrMappingMap.set(eBaseAttr.LifeFinalPercent,      [eAttrType.HPLimit,eAttrType.FinalHP]);