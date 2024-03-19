import { BuffBase } from "../BuffBase/BuffBase";
import { BuffEffectBase } from "../BuffEffectBase/BuffEffectBase";
import { eTriggerType } from "../Define";

//每个基础的Buff拥有一个触发控制器，用以管理Buff触发时的各种状态
export class TriggerControl{
    private mBuffBase:BuffBase;
    private mBuffEffectCellArray:Array<BuffEffectBase> = new Array<BuffEffectBase>();
    //记录Buff所监听的所有的触发信息
    constructor(buffBase:BuffBase){
        this.mBuffBase = buffBase;
        this.InitEffectCellArray();        
    }

    private InitEffectCellArray():void{
        for(let cell of this.mBuffBase.Config.Trigger)
            this.mBuffEffectCellArray.push(new BuffEffectBase(cell));
    }
    
    public TriggerEvent(triggerType:eTriggerType,param?:any){
        //循环遍历当前角色身上的所有Buff,符合条件的话，立即执行对应的操作
        for(let index in this.mBuffEffectCellArray){
            let cell:BuffEffectBase = this.mBuffEffectCellArray[index];
            if(!cell.IsAppointTriggerType(triggerType))
                continue;
                cell.ExecuteTriggerEvent(triggerType,param);
        }
    }
    
    //获取到所有的触发信息
    public GetTriggerTypeSet():Set<eTriggerType>{
        let ret:Set<eTriggerType> = new Set<eTriggerType>();
        for(let cell of this.mBuffEffectCellArray){
            for(let type of cell.GetTriggerSet())
                ret.add(type);
        }
        return ret;
    }
}
