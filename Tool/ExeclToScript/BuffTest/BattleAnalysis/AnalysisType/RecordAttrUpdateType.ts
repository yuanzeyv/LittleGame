import { AttrDescConfig } from "../../../Work/OutputScript/AttrDesc";
import { RecordAttrUpdate } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordAttrUpdateType extends RecordTypeBase{
    public ToString(recordBase:RecordAttrUpdate){   
        console.log(`阵营:${recordBase.Camp} 属性:《${AttrDescConfig.GetData(recordBase.AttrKey)?.Name || "未知"}》更新至:${ recordBase.AttrValue}`) ;  
    }    
}