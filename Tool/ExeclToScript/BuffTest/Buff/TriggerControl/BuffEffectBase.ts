import { eTriggerType } from "../Define/Define";  
import { BuffBase } from "../BuffBase/BuffBase";   
import { ExecuteTypeBase } from "./ExecuteTypeBase/ExecuteTypeBase";
import { eExecuteType } from "./ExecuteTypeBase/ExecuteTypeDefine";
import { ExecuteAttrChange } from "./ExecuteTypeBase/ExecuteAttrChange";
export class BuffEffectBase{
    private mBuffBase:BuffBase;//当前的Buff信息
    private mTriggerSet:Set<number> = new Set<number>(); 
    private mEndTriggerSet:Set<number> = new Set<number>(); 
    private mTriggerInfo: {Tri:number[];Con:number[];Do:{t:number;e:number;}[];};//当前的Buff信息
    private mExecuteTypeArray:Array<ExecuteTypeBase> = new Array<ExecuteTypeBase>();//执行对象

    constructor(buffBase:BuffBase,triggerInfo: {Tri:number[];Con:number[];Do:{t:number;e:number;}[];}){
        this.mBuffBase = buffBase;
        this.mTriggerInfo = triggerInfo;
        this.InitTriggerSet();
        this.InitEndTriggerSet();
        this.InitExecuteType();
    }
    
    //初始化触发条件
    public InitTriggerSet():void{
        this.mTriggerSet.clear(); 
        for(let triggerType of this.mTriggerInfo.Tri)
            this.mTriggerSet.add(triggerType);
    }

    public InitEndTriggerSet():void{
        this.mEndTriggerSet.clear(); 
        for(let triggerType of this.mBuffBase.Config.EndCondition)
            this.mEndTriggerSet.add(triggerType);
    }
     

    public InitExecuteType():void{ 
        this.mExecuteTypeArray = new Array<ExecuteTypeBase>();//执行对象
        for(let cell of this.mTriggerInfo.Do){
            if(cell.t == eExecuteType.AttrChange)//属性变动类型的话
                this.mExecuteTypeArray.push(new ExecuteAttrChange(this.mBuffBase,cell.e));
            else if(cell.t == eExecuteType.AddBuff)//属性变动类型的话
                this.mExecuteTypeArray.push(new ExecuteAttrChange(this.mBuffBase,cell.e));
        }
    }

    //判断Buff是否是指定的触发类型
    public IsAppointTriggerType(type:eTriggerType):boolean{
        return this.mTriggerSet.has(type);
    }
 
    public GetTriggerSet():Readonly<Set<eTriggerType>>{
        let retSet:Set<eTriggerType> = new Set<eTriggerType>();
        for(let triggerType of this.mTriggerSet)
            retSet.add(triggerType);
        return retSet;
    }
 
    public GetEndSet():Set<eTriggerType>{
        let retSet:Set<eTriggerType> = new Set<eTriggerType>();
        for(let triggerType of this.mBuffBase.Config.EndCondition)
            retSet.add(triggerType);
        return retSet;
    }
    
    //准备执行对应的Buff
    public ExecuteTriggerEvent(type:eTriggerType,buffBase:BuffBase,param?:any){
        if(this.mExecuteTypeArray.length == 0)//不做任何事情的话
            return;
        for(let triggerType of this.mTriggerInfo.Con){
        }
        //开始添加对应的属性类型 
        for(let executeType of this.mExecuteTypeArray)
            executeType.OnEnter(type);//对Buff进行更新
    } 
    
    //准备执行对应的Buff
    public ExecuteEndEvent(type:eTriggerType,buffBase:BuffBase,param?:any){
        if(!this.mEndTriggerSet.has(type))
            return;
        this.mBuffBase.DecBuffLife();//更新一下自己的生命值
    } 
};  
