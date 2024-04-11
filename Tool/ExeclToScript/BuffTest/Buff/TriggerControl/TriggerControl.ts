import { BuffBase } from "../BuffBase/BuffBase"; 
import { eExecuteType } from "../Define/BuffExecDefine";
import { eTriggerType } from "../Define/Define";   
import { ExecuteAddBuff } from "./ExecuteTypeBase/ExecuteAddBuff";
import { ExecuteAttrChange } from "./ExecuteTypeBase/ExecuteAttrChange";
import { ExecuteTypeBase } from "./ExecuteTypeBase/ExecuteTypeBase";
let qqq = 1;
export class TriggerControl{
    private mBuffBase:BuffBase;//基础Buff信息
    private mTriggerSet:Set<number> = new Set<number>(); //触发Set
    private mEndTriggerSet:Set<number> = new Set<number>();//结束条件触发Set
    private mExecuteTypeArray:Array<ExecuteTypeBase> = new Array<ExecuteTypeBase>();//执行对象
    //记录Buff所监听的所有的触发信息
    constructor(buffBase:BuffBase){
        this.mBuffBase = buffBase; 
        this.InitTriggerSet();
        this.InitEndTriggerSet();
        this.InitExecuteType();
    }
    /******************
    *触发条件区域
    *******************/
    //初始化区域
    public InitTriggerSet():void{
        this.mTriggerSet.clear();
        this.mBuffBase.Config.Trigger.Tri.forEach((key:number)=> this.mTriggerSet.add(key));
    }
    public InitEndTriggerSet():void{
        this.mEndTriggerSet.clear();
        this.mBuffBase.Config.EndCondition.forEach((key:number)=> this.mEndTriggerSet.add(key));
    }
    //获取到当前Buff监听的触发事件
    public get TriggerSet():Readonly<Set<eTriggerType>>{ return this.mTriggerSet; }
    //获取到当前Buff结束所监听的事件
    public get TriggerEndTypeSet():Readonly<Set<eTriggerType>>{ return this.mEndTriggerSet } 
    
    //根据要做的事情，
    public InitExecuteType():void{ 
        let executeConsArray:Array<new (buffBase:BuffBase,doSome:number,...param:any[])=>ExecuteTypeBase> = new Array<new (buffBase:BuffBase,doSome:number,...param:any[])=>ExecuteTypeBase>();
        executeConsArray[eExecuteType.AttrChange] = ExecuteAttrChange;
        executeConsArray[eExecuteType.AddBuff] = ExecuteAddBuff;
        this.mExecuteTypeArray = new Array<ExecuteTypeBase>();//执行对象
        for(let cell of this.mBuffBase.Config.Trigger.Do){
            let executeBase:new (buffBase:BuffBase,doSome:number,...param:any[])=>ExecuteTypeBase = executeConsArray[cell.t];
            if(executeBase == undefined)
                continue;
            let insertExecute:ExecuteTypeBase =new executeBase(this.mBuffBase,cell.e,qqq++);
            this.mExecuteTypeArray.push(insertExecute);
            insertExecute.OnEnter();
        }
    }
    
    public TriggerEvent(triggerType:eTriggerType,param?:any):void{ 
        this.ExecuteTriggerEvent(triggerType,this.mBuffBase,param);   
        this.ExecuteEndEvent(triggerType,this.mBuffBase,param);  
    }
    //准备执行对应的Buff
    public ExecuteTriggerEvent(type:eTriggerType,buffBase:BuffBase,param?:any){
        if(!this.mTriggerSet.has(type))
            return; 
        if(this.mExecuteTypeArray.length == 0)//不做任何事情的话
            return;
        for(let triggerType of this.mBuffBase.Config.Trigger.Con){
        }
        //开始添加对应的属性类型 
        for(let executeType of this.mExecuteTypeArray)
            executeType.OnEnter();//对Buff进行更新
    } 
    
    //准备执行对应的Buff
    public ExecuteEndEvent(type:eTriggerType,buffBase:BuffBase,param?:any){
        if(!this.mEndTriggerSet.has(type))
            return;
        if(this.mBuffBase.LifeCount == 0)//无限生命
            return;
        this.mBuffBase.DecBuffLife();//更新一下自己的生命值
    } 
}