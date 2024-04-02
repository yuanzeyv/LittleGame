import { AttrNameMap } from "../../AttrControl/Define/AttrDefine";
import { RecordAttack } from "../../BattleSimulation/Define/RecordDefine";
import { eAttackType } from "../../Communicant/Define/Define";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordAttackType extends RecordTypeBase{
    public ToString(recordBase:RecordAttack){  
        let playerAttrStr:string = "";
        for(let key in recordBase.Attrs){
            let name:string = AttrNameMap.get(Number(key)) || "未知属性";
            let value:number = recordBase.Attrs[key];
            playerAttrStr += `   ${name}:${value}`;
        } 
        let attackType:string = `${recordBase.AttackType == eAttackType.Normal ? "攻击" : recordBase.AttackType == eAttackType.ContinueAttack ? "连击":"反击" }`
        console.log(`${recordBase.AttackName} 对 ${recordBase.BeAttackName}发起${attackType}  暴击状态:${recordBase.IsCircle}  闪避状态:${recordBase.IsMiss} 造成了属性:${playerAttrStr}  剩余血量:${recordBase.ResidueHP}`) ;  
    }    
}

 