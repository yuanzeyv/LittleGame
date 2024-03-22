import { AttrNameMap } from "../../AttrControl/Define/AttrDefine";
import { RecordAttack, RecordAttrUpdate } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordAttrUpdateType extends RecordTypeBase{
    public ToString(recordBase:RecordAttrUpdate){   
        console.log(`阵营:${recordBase.Camp} 属性:${ AttrNameMap.get(recordBase.AttrKey)}变动 ${ recordBase.AttrValue}`) ;  
    }    
}
 