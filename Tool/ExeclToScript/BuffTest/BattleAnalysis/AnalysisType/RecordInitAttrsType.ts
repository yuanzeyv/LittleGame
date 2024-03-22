import { AttrNameMap } from "../../AttrControl/Define/AttrDefine";
import { RecordBase, RecordInitData } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordInitAttrsType extends RecordTypeBase{
    public ToString(recordBase:RecordInitData){ 
        let playerAttrStr:string = "";
        for(let key in recordBase.Attrs){
            let name:string = AttrNameMap.get(Number(key)) || "未知属性";
            let value:number = recordBase.Attrs[key];
            playerAttrStr += `${name}:${value} `;
        }  
        console.log(`数据初始化 阵营:${recordBase.Camp}  属性:${playerAttrStr}`) ;
    }    
}
