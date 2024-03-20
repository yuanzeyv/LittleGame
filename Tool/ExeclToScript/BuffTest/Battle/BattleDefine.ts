export enum eBaseAttr{//用于计算属性的基础信息
    //玩家的基础属性
    BaseAttack              =    0,//攻击
    BaseAttackPercent       =    1,//攻击百分比加成
    BaseAttackFinalPercent  =    2,//攻击力最终百分比加成
    BaseDefense             =    3,//防御
    BaseDefensePercent      =    4,//防御百分比加成
    BaseDefenseFinalPercent =    5,//防御力最终百分比加成
    BaseSpeed               =    6,//速度
    BaseSpeedPercent        =    7,//速度百分比加成
    BaseSpeedFinalPercent   =    8,//速度力最终百分比加成
    BaseLife                =    9,//生命
    BaseLifePercent         =   10,//生命百分比
    BaseLifeFinalPercent    =   11,//生命最终加成
 
    //玩家的额外基础属性
    SumAttack           =   100,//总攻击力 
    SumDefense          =   101,//总防御力
    SumHPLimit          =   102,//最大生命值
    SumSpeed            =   103,//总速度
    SumFinalHP          =   104,//角色当前生命值
    Final               ,//最大
};
 

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