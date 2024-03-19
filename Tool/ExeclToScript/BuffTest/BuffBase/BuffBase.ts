import { IBuffStruct, BuffConfig } from "../Config/Buff";
import { eTriggerType } from "../Define";
import { TriggerControl } from "../TriggerControl/TriggerControl";
export class BuffBase{
    private mID:number;//当前Buff的唯一ID 
    protected mBuffCfg:IBuffStruct;//当前Buff的配置表
    protected mLifeCount:number;//生命次数 每次触发对应的扣除逻辑后，就会进行-1,当LifeCount为0时，删除本Buff 
    protected mBuffTriggerControl:TriggerControl;
    public constructor(buffID:number){
        this.mBuffCfg = BuffConfig.GetData(buffID)!;
        this.ResetLifeCount();
        this.mBuffTriggerControl = new TriggerControl(this);
    } 

    public get Config():IBuffStruct{
        return this.mBuffCfg;
    }

    public get ID():number{
        return this.mID;
    }
    public set ID(id:number){
        this.mID = id;
    }

    public get LifeCount():number{
        return this.mLifeCount;
    }
    public ResetLifeCount():void{
        this.mLifeCount = this.mBuffCfg.Continue;
    }

    public TriggerEvent(triggerType:eTriggerType,param?:any){
        this.mBuffTriggerControl.TriggerEvent(triggerType,param);
    }

    public get BuffTriggerControl():TriggerControl{
        return this.mBuffTriggerControl;
    }
}