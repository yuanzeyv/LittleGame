import { RecordBase } from "../../BattleSimulation/Define/RecordDefine";

export enum eRecordType{
    InitAttrs,//初始化数据用
    InitBuffs,//初始化数据用
    Attack,//玩家进行基础攻击用 
    BuffInsert,//插入一个Buff 
    BuffTrigger,//触发一个Buff 
    AttrUpdate,//属性变动时，更新单项属性
    EndBattle,//战斗记录，战斗结束
};

export class RecordTypeBase{
    public ToString(recordBase:RecordBase){
        console.log("回合战报出现错误");
    }    
}