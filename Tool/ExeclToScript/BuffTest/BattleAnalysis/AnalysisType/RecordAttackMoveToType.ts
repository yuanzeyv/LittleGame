import { RecordAttackMoveTo } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordAttackMoveToType extends RecordTypeBase{
    public ToString(recordBase:RecordAttackMoveTo){   
        console.log(`阵营:${recordBase.Camp} 移动 ${recordBase.PosX} 像素`) ;  
    }    
}