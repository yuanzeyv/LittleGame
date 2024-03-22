/*
本文件用以定义，战斗模拟的所有所有战斗结果日志
*/
import { eCampType } from "./BattleDefine";
import { eTriggerType } from "../../Buff/Define/Define";
import { eAttrType } from "../../AttrControl/Define/AttrDefine";
export enum eRecordType{
    InitAttrs,//初始化数据用 
    Attack,//玩家进行基础攻击用 
    BuffInsert,//插入一个Buff 
    BuffTrigger,//触发一个Buff 
    AttrUpdate,//属性变动时，更新单项属性
    EndBattle,//战斗记录，战斗结束
};

export interface RecordBase{ RecordType:eRecordType; }//记录类型

 
//游戏内的各项数值主要被记录在玩家的属性中，所以此处会从玩家属性中拉取到战斗必要的数值内容
export interface RecordInitData extends RecordBase{
    Camp:eCampType;//玩家阵营类型
    Attrs:{[key:number]:number};//需要获取到玩家的基础属性
};
 
//游戏内Buff被插入时的日志记录
export interface RecordBuffInsert extends RecordBase{
    Camp:eCampType;//玩家阵营类型
    BuffID:number;//插入Buff的唯一ID
    BuffKey:number;//插入Buff的Key
};

//当Buff被触发时，我希望Buff所关联的所有数据信息，能够一览无余
export interface RecordBuffTrigger extends RecordBase{
    TriggerType:eTriggerType;//Buff的触发类型
    Camp:eCampType;//玩家阵营类型
    BuffID:number;//造成属性变动的BuffID
    TriggerIndex:number;//触发的Buff对应的增益索引 
    Attrs:{[key:number]:number};//需要获取到玩家的基础属性
};

//玩家攻击时，也会进行判定，但是因为攻击仅会影响到玩家的生命值
export interface RecordAttack extends RecordBase{
    AttackCamp:eCampType;//攻击者玩家阵营
    BeAttackCamp:eCampType;//被攻击者玩家阵营
    Attrs:{[key:number]:number};//需要获取到的最终属性值（攻击相当于削弱玩家的HP属性，所以也是直接改变了玩家的属性）
}

//玩家攻击时，也会进行判定，但是因为攻击仅会影响到玩家的生命值
export interface RecordEndBattle extends RecordBase{
    Result:number;//胜利的玩家阵营类型
}  

//记录玩家在战斗过程中的属性变动
export interface RecordAttrUpdate extends RecordBase{
    Camp:eCampType;//玩家阵营类型
    AttrKey:eAttrType;//玩家属性变动
    AttrValue:number;//玩家属性变动
}     