import { AttrDescConfig } from "../../../Work/OutputScript/AttrDesc";
import { RecordBase, RecordInitData } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordInitAttrsType extends RecordTypeBase{
    public ToString(recordBase:RecordInitData){ 
        let playerAttrStr:string = "";
        for(let key in recordBase.Attrs){
            let name:string = AttrDescConfig.GetData(Number(key))?.Name || "未知属性";
            let value:number = recordBase.Attrs[key];
            playerAttrStr += `${name}:${value} `; 
        }  
        console.log(`玩家:${recordBase.Name} 数据初始化 阵营:${recordBase.Camp}  属性:${playerAttrStr} `  ) ;
    }    
}
 