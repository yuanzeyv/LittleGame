import { IBuffStruct } from "../../Work/OutputScript/Buff";
import { BuffControl } from "../BuffControl";
import { GetTableByTypeAndLevel } from "../Util";
import { BuffBase } from "./BuffBase";
//携带了Buff等级字段，调用Buff只能通过不停的堆叠 0 级Buff来增加Buff等级。Buff等级不会超过表中可找到的最大Buff等级。
export class LevelBuff extends BuffBase{ 
    constructor(buffcontrol:BuffControl,buffID:number){
        super(buffcontrol,buffID);
        this.SetLevel(0);
    }
    public SetLevel(level:number):boolean{
        let levelBuffConfig:IBuffStruct | undefined =  GetTableByTypeAndLevel(this.mBuffCfg.BuffID,level);
        if( levelBuffConfig == undefined)//提示设置失败 
            return false; 
        this.mBuffCfg = levelBuffConfig
        return true;
    }
};