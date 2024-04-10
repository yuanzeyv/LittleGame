import { BuffBase } from "../BuffBase/BuffBase"; 
import { eTriggerType } from "../Define/Define"; 
import { BuffEffectBase } from "./BuffEffectBase";
export class TriggerControl{
    private mBuffBase:BuffBase;
    private mBuffEffectCell:BuffEffectBase;
    //记录Buff所监听的所有的触发信息
    constructor(buffBase:BuffBase){
        this.mBuffBase = buffBase;
        this.InitEffectCellArray();        
    }
    //根据当前Buff的触发效果，初始化Buff特效数据信息配置
    private InitEffectCellArray():void{
        this.mBuffEffectCell = (new BuffEffectBase(this.mBuffBase,this.mBuffBase.Config.Trigger));
    }
    
    public TriggerEvent(triggerType:eTriggerType,param?:any):void{
        if(this.mBuffEffectCell.IsAppointTriggerType(triggerType))
            this.mBuffEffectCell.ExecuteTriggerEvent(triggerType,this.mBuffBase,param);  
    }
    
    //获取到当前Buff监听的触发事件
    public GetTriggerTypeSet():Set<eTriggerType>{
        return this.mBuffEffectCell.GetTriggerSet();
    }

    //获取到当前Buff结束所监听的事件
    public GetEndTypeSet():Set<eTriggerType>{
        return this.mBuffEffectCell.GetEndSet();
    }
}