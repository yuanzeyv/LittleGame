import { BuffConfig } from "../../../Work/OutputScript/Buff"; 
import { RecordBase, RecordBuffInsert, RecordInitData, RecordRoundChange } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordRoundChangeType extends RecordTypeBase{
    public ToString(recordBase:RecordRoundChange){  
        console.log(`游戏进入了 ${recordBase.Round} 回合`) ;
    } 
} 