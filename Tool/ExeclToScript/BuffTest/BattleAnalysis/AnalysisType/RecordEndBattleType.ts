import { RecordEndBattle } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordEndBattleType extends RecordTypeBase{
    public ToString(recordBase:RecordEndBattle){  
        console.log(`战斗结束 阵营${recordBase.Camp}  ${recordBase.Result == 0 ? "平局" : recordBase.Result > 0 ? "胜利":"失败"}`) ;
    }  
}
