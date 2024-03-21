import { BuffBase } from "../BuffBase/BuffBase";
import { BuffEffectBase } from "./BuffEffectBase/BuffEffectBase";
import { eTriggerType } from "../Define/Define"; 
//每个基础的Buff拥有一个触发控制器，用以管理Buff触发时的各种状态
export class TriggerControl{
    private mBuffBase:BuffBase;
    private mBuffEffectCellArray:Array<BuffEffectBase> = new Array<BuffEffectBase>();
    //记录Buff所监听的所有的触发信息
    constructor(buffBase:BuffBase){
        this.mBuffBase = buffBase;
        this.InitEffectCellArray();        
    }
    //根据当前Buff的触发效果，初始化Buff特效数据信息配置
    private InitEffectCellArray():void{
        for(let index in this.mBuffBase.Config.Trigger)
            this.mBuffEffectCellArray.push(new BuffEffectBase(this.mBuffBase,Number(index)));
    }
    
    public TriggerEvent(triggerType:eTriggerType,param?:any):void{
        for(let index in this.mBuffEffectCellArray){
            let cell:BuffEffectBase = this.mBuffEffectCellArray[index];
            if(cell.IsAppointTriggerType(triggerType))
                cell.ExecuteTriggerEvent(triggerType,this.mBuffBase,param);  
        }
    }
    
    //获取到当前Buff监听的触发事件
    public GetTriggerTypeSet():Set<eTriggerType>{
        let ret:Set<eTriggerType> = new Set<eTriggerType>();
        for(let cell of this.mBuffEffectCellArray){
            for(let type of cell.GetTriggerSet())
                ret.add(type);
        }
        return ret;
    }
}
