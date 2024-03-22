import { AttrNameMap } from "../../AttrControl/Define/AttrDefine";
import { RecordAttrUpdate } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordAttrUpdateType extends RecordTypeBase{
    public ToString(recordBase:RecordAttrUpdate){   
        console.log(`阵营:${recordBase.Camp} 当前${AttrNameMap.get(recordBase.AttrKey)}:${ recordBase.AttrValue}  变动属性:${recordBase.AttrChangeValue}`) ;  
    }    
}
 