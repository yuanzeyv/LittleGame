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

export let AttrNameMap:Map<eAttrType,string> = new Map<eAttrType,string>();
AttrNameMap.set(eAttrType.Attack             ,"基础攻");
AttrNameMap.set(eAttrType.AttackPercent      ,"基础攻加成");
AttrNameMap.set(eAttrType.AttackFinalPercent ,"最终攻加成");
AttrNameMap.set(eAttrType.Defense            ,"基础防");
AttrNameMap.set(eAttrType.DefensePercent     ,"基础防加成");
AttrNameMap.set(eAttrType.DefenseFinalPercent,"最终防加成");
AttrNameMap.set(eAttrType.Speed              ,"基础速");
AttrNameMap.set(eAttrType.SpeedPercent       ,"基础速加成");
AttrNameMap.set(eAttrType.SpeedFinalPercent  ,"最终速加成");
AttrNameMap.set(eAttrType.Life               ,"基础血");
AttrNameMap.set(eAttrType.LifePercent        ,"基础血加成");
AttrNameMap.set(eAttrType.LifeFinalPercent   ,"最终血加成");
AttrNameMap.set(eAttrType.SumAttack          ,"攻击力");
AttrNameMap.set(eAttrType.SumDefense         ,"防御力");
AttrNameMap.set(eAttrType.SumSpeed           ,"速度");
AttrNameMap.set(eAttrType.SumFinalHP         ,"生命"); 
AttrNameMap.set(eAttrType.SumHPLimit         ,"最大生命");
