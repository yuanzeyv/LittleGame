import { AttrNameMap } from "../../AttrControl/Define/AttrDefine";
import { RecordAttack, RecordSuckBlood } from "../../BattleSimulation/Define/RecordDefine";
import { eAttackType } from "../../Communicant/Define/Define";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordSuckBloodType extends RecordTypeBase{
    public ToString(recordBase:RecordSuckBlood){  
        let playerAttrStr:string = "";
        for(let key in recordBase.Attrs){
            let name:string = AttrNameMap.get(Number(key)) || "未知属性";
            let value:number = recordBase.Attrs[key];
            playerAttrStr += `   ${name}:${value}`;
        } 
        console.log(`${recordBase.AttackName} 吸血 了属性:${playerAttrStr}  剩余血量:${recordBase.ResidueHP}`) ;  
    }    
}

 