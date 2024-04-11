import { RecordAttack } from "../../BattleSimulation/Define/RecordDefine";
import { eAttackType } from "../../Communicant/Define/Define";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordAttackType extends RecordTypeBase{
    public ToString(recordBase:RecordAttack){   
        let attackType:string = `${recordBase.AttackType == eAttackType.Normal ? "攻击" : recordBase.AttackType == eAttackType.ContinueAttack ? "连击":"反击" }`
        console.log(`${recordBase.AttackName} 对 ${recordBase.BeAttackName}发起${attackType}  暴击状态:${recordBase.IsCircle}  闪避状态:${recordBase.IsMiss} 造成了:${recordBase.Harm}点伤害`) ;  
    }    
}

  