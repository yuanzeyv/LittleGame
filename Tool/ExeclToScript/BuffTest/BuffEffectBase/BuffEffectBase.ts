import { eTriggerType, TKV } from "../Define";
import { GetKV } from "../Util";

export class BuffEffectBase{
    private mTriggerSet:Set<eTriggerType> = new Set<eTriggerType>();//Buff的触发时机
    private mRunConditionArray:Array<TKV> = new Array<TKV>();//Buff的执行条件
    private mDoSomeingArray:Array<TKV> = new Array<TKV>();//Buff的执行效果
    private mIsActive:boolean = false;//Buff当前是否生效
    constructor(data:{Tri:number[];Con:number[];Do:number[];}){
        for(let tri of data.Tri)
            this.mTriggerSet.add(tri);
        for(let con of data.Con)
            this.mRunConditionArray.push(GetKV(con));
        for(let todo of data.Do)
            this.mDoSomeingArray.push(GetKV(todo));
    }
    //判断Buff是否是指定的触发类型
    public IsAppointTriggerType(type:eTriggerType):boolean{
        return this.mTriggerSet.has(type);
    }

    //准备执行对应的Buff
    public ExecuteTriggerEvent(type:eTriggerType,param?:any):Array<{k:number,v:number}>|undefined{
        let isCompare:boolean = true;
        for(let cell of this.mRunConditionArray);//进行判断，只要有一个不满足，那么就不执行
        if(!((isCompare && !this.mIsActive) || (!isCompare && this.mIsActive)) || this.mDoSomeingArray.length == 0)//如果匹配并且未激活的话
            return undefined;
        this.mIsActive = !this.mIsActive; 
        console.log(`执行了${type}事件`);
        return [...this.mDoSomeingArray];
    } 

    public GetTriggerSet():Set<eTriggerType>{
        return this.mTriggerSet;
    }
};