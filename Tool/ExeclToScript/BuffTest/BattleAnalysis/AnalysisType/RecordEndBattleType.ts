import { RecordEndBattle } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordEndBattleType extends RecordTypeBase{
    public ToString(recordBase:RecordEndBattle){  
        console.log(`战斗结束 胜利方:${recordBase.Result == 0?"平局":recordBase.Result==1?"主动攻击者":"被动攻击者"}`) ;
    }  
}
