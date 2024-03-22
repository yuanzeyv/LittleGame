import { AttrNameMap } from "../../AttrControl/Define/AttrDefine";
import { RecordAttack } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordAttackType extends RecordTypeBase{
    public ToString(recordBase:RecordAttack){  
        let playerAttrStr:string = "";
        for(let key in recordBase.Attrs){
            let name:string = AttrNameMap.get(Number(key)) || "未知属性";
            let value:number = recordBase.Attrs[key];
            playerAttrStr += `   ${name}:${value}`;
        } 
        console.log(`阵营:${recordBase.AttackCamp} 攻击 阵营${recordBase.BeAttackCamp} 造成了属性:${playerAttrStr}  剩余血量:${recordBase.ResidueHP}`) ;  
    }    
}