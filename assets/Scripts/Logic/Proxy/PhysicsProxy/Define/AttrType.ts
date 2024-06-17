//游戏中的基础游戏属性
import Decimal from "decimal.js";

//B=Base   P=Percent F=FinalPercent
export enum eBaseAttrType{
    B_PhysicalAttack            = 0,//物理攻击力加成
    P_PhysicalAttack            = 1,
    F_PhysicalAttack            = 2,
    B_MagicAttack               = 3,//魔法攻击加成
    P_MagicAttack               = 4,
    F_MagicAttack               = 5,
    B_PhysicalDefence           = 6, //物理防御力
    P_PhysicalDefence           = 7,
    F_PhysicalDefence           = 8,
    B_MagicDefence              = 9,//魔法防御力
    P_MagicDefence              =10,
    F_MagicDefence              =11,
    B_DefencePenetrate          =12,//护甲穿透
    P_DefencePenetrate          =13,
    F_DefencePenetrate          =14,
    B_MagicDefencePenetrate     =15,//魔抗穿透
    P_MagicDefencePenetrate     =16,
    F_MagicDefencePenetrate     =17,
    B_DamageReduction           =18,//减伤属性
    P_DamageReduction           =19,
    F_DamageReduction           =20,
    B_DamageBoost               =21,//增伤属性
    P_DamageBoost               =22,
    F_DamageBoost               =23,
    B_CriticalResistDamage      =24,//爆伤加成
    P_CriticalResistDamage      =25,
    F_CriticalResistDamage      =26,
    B_CriticalAddtionDamage     =27,//爆伤抵抗
    P_CriticalAddtionDamage     =28,
    F_CriticalAddtionDamage     =29,
    B_BodySize                  =30,//玩家的体型大小
    P_BodySize                  =31,
    F_BodySize                  =32,
    B_MoveSpeed                 =33,//玩家的移动速度
    P_MoveSpeed                 =34,
    F_MoveSpeed                 =35,
    B_AttackSpeed               =36,//玩家的攻击速度
    P_AttackSpeed               =37,
    F_AttackSpeed               =38,
    B_CriticalRate              =39, //玩家的暴击几率
    P_CriticalRate              =40,
    F_CriticalRate              =41,
    B_ResistCirticalRate        =42,//玩家的抗暴击几率
    P_ResistCirticalRate        =43,
    F_ResistCirticalRate        =44,
    B_HitRate                   =45,//玩家的命中几率
    P_HitRate                   =46,
    F_HitRate                   =47,
    B_MissRate                  =48,//玩家的闪避几率
    P_MissRate                  =49,
    F_MissRate                  =50,
    B_ShieldReply               =51,//玩家的护盾回复
    P_ShieldReply               =52,
    F_ShieldReply               =53,
    B_HPReply                   =54,//玩家的血量回复
    P_HPReply                   =55,
    F_HPReply                   =56,
    B_MaxShield                 =57,//玩家的最大护盾
    P_MaxShield                 =58,
    F_MaxShield                 =59,
    B_MaxHP                     =60,//玩家的最大血量
    P_MaxHP                     =61,
    F_MaxHP                     =62,
};
//游戏中的最终属性
export enum eFinalAttrType{
    PhysicalAttack       = 0,//玩家的物理攻击力
    MagicAttack          = 1,//玩家的魔法攻击力 
    PhysicalDefence      = 2,//玩家的物理防御力
    MagicDefence         = 3,//玩家的魔法防御力
    DefencePenetrate     = 4,//护甲穿透
    MagicDefencePenetrate= 5,//魔抗穿透
    DamageReduction      = 6,//减伤属性
    DamageBoost          = 7,//增伤属性
    CriticalResistDamage = 8,//爆伤抵抗
    CriticalAddtionDamage= 9,//爆伤加成
    BodySize             =10,//玩家的体型大小
    MoveSpeed            =11,//玩家的移动速度
    AttackSpeed          =12,//玩家的射击速度
    CriticalRate         =13,//玩家的暴击几率
    ResistCirticalRate   =14,//玩家的抗暴击几率
    HitRate              =15,//玩家的命中几率
    MissRate             =16,//玩家的闪避几率
    ShieldReply          =17,//玩家的护盾回复
    HPReply              =18,//玩家的血量回复
    MaxShield            =19,//玩家的最大护盾
    MaxHP                =20,//玩家的最大血量
    HP                   =21,//玩家的血量
    Shield               =22,//玩家的护盾
};

//基础此接口后，才可以使用这里的属性
export interface AttrObj{
    //基础的属性信息
    mBaseAttrInfo:Array<Decimal>;
    //经过计算后的最终属性信息
    mFinalAttrInfo:Array<Decimal>;
};

