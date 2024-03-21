import { IBuffStruct, BuffConfig } from "../../../Work/OutputScript/Buff";
import { BuffControl } from "../BuffControl";
import { eTriggerType } from "../Define/Define"; 
import { TriggerControl } from "../TriggerControl/TriggerControl";

export class BuffBase{
    private mID:number;//当前Buff的唯一ID 
    private mBuffControl:BuffControl;//当前的Buff控制器
    protected mBuffCfg:IBuffStruct;//当前Buff的配置表
    protected mLifeCount:number;//生命次数 每次触发对应的扣除逻辑后，就会进行-1,当LifeCount为0时，删除本Buff 
    protected mBuffTriggerControl:TriggerControl;//触发控制器
    public constructor(buffControl:BuffControl,buffID:number){
        this.mBuffControl = buffControl;
        this.mBuffCfg = BuffConfig.GetData(buffID)!;
        this.mBuffTriggerControl = new TriggerControl(this);
        this.ResetLifeCount();//重置当前的Buff生命
    } 
    //获取到当前Buff的触发控制器
    public get BuffTriggerControl():TriggerControl{ return this.mBuffTriggerControl; }
    //当前Buff被分配到的唯一ID
    public get ID():number{ return this.mID }
    //设置当前Buff的唯一ID
    public set ID(id:number){ this.mID = id; }
    //当前Buff对应的配置信息
    public get Config():IBuffStruct{ return this.mBuffCfg; }
    //当前Buff对应的生命剩余次数
    public get LifeCount():number{ return this.mLifeCount; }
    //获取到当前Buff的控制器
    public get Control():BuffControl{ return this.mBuffControl;}
    //重置当前Buff的生命剩余次数
    public ResetLifeCount():void{
        this.mLifeCount = this.mBuffCfg.Continue;
    }
    //触发一下当前Buff的对应事件
    public TriggerEvent(triggerType:eTriggerType,param?:any):void{
        this.mBuffTriggerControl.TriggerEvent(triggerType,param);
    } 
}