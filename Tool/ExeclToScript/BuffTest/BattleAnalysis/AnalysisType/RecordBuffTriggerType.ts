import { AttrDescConfig } from "../../../Work/OutputScript/AttrDesc";
import { BuffConfig } from "../../../Work/OutputScript/Buff"; 
import {  RecordBuffTrigger } from "../../BattleSimulation/Define/RecordDefine";
import { RecordTypeBase } from "./RecordTypeBase";

export class RecordBuffTriggerType extends RecordTypeBase{
    public ToString(recordBase:RecordBuffTrigger){  
        let playerAttrStr:string = "";
        for(let key in recordBase.Attrs){
            let name:string = AttrDescConfig.GetData(Number(key))?.Name || "未知属性";
            let value:number = recordBase.Attrs[key];
            playerAttrStr += `${name}:${value}`;
        } 
        console.log(`阵营:${recordBase.Camp} 触发了Buff:${BuffConfig.GetData(recordBase.BuffKey)?.Name} 属性:${playerAttrStr}`) ;
    }  
} 