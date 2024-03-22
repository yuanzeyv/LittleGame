import { BuffConfig } from "../../../Work/OutputScript/Buff";
import { AttrNameMap } from "../../AttrControl/Define/AttrDefine";
import { RecordBase, RecordBuffInsert, RecordInitData } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordBuffInsertType extends RecordTypeBase{
    public ToString(recordBase:RecordBuffInsert){  
        console.log(`阵营${recordBase.Camp}  获得Buff:${BuffConfig.GetData(recordBase.BuffKey)?.Name}`) ;
    } 
} 