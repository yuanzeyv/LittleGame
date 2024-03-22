import { eTriggerType, TKV } from "../../Define/Define";
import { battleSimulation } from "../../../Main";
import { GetKV } from "../../../Util";
import { RecordBuffTrigger, eRecordType } from "../../../BattleSimulation/Define/RecordDefine";
import { BuffBase } from "../../BuffBase/BuffBase";
import { BuffConfig } from "../../../../Work/OutputScript/Buff";

export class BuffEffectBase{
    private mBuffBase:BuffBase;//当前的Buff信息
    private mIndex:number;//当前的Buff下标
    
    private mIsActive:boolean = false;//Buff当前是否生效
    private mActiveAttrs:Array<{k:number,v:number}> = new Array<{k:number,v:number}>();//当前已经生效的属性加成
    
    constructor(buffBase:BuffBase,index:number){
        this.mBuffBase = buffBase;
        this.mIndex = index;
    }
    //判断Buff是否是指定的触发类型
    public IsAppointTriggerType(type:eTriggerType):boolean{
        for(let triggerType of this.mBuffBase.Config.Trigger[this.mIndex].Tri){
            if(type == triggerType)
                return true;
        }
        return false;
    }
 
    public GetTriggerSet():Set<eTriggerType>{
        let retSet:Set<eTriggerType> = new Set<eTriggerType>();
        for(let triggerType of this.mBuffBase.Config.Trigger[this.mIndex].Tri)
            retSet.add(triggerType);
        return retSet;
    }
    
    //准备执行对应的Buff
    public ExecuteTriggerEvent(type:eTriggerType,buffBase:BuffBase,param?:any){
        let isCompare:boolean = true;
        let buffTriggerCon:{Tri: number[];Con: number[];Do:{t:number;e:number;}[];} = this.mBuffBase.Config.Trigger[this.mIndex];
        if(buffTriggerCon.Do.length == 0)
            return;
        for(let triggerType of buffTriggerCon.Con){//匹配执行条件
        } 
        if(!((isCompare && !this.mIsActive) || (!isCompare && this.mIsActive)))//如果匹配并且未激活的话
            return;
        this.mIsActive = isCompare && !this.mIsActive;
        let changeAttrs:{[k:number]:number} = {};
        //开始添加对应的属性类型 
        for(let info of buffTriggerCon.Do){
            let kvObj:{k:number,v:number} = GetKV(info.e);
            changeAttrs[kvObj.k] = kvObj.v * (this.mIsActive ? 1 : -1);
        }  
        battleSimulation.PushBattleRecord<RecordBuffTrigger>({RecordType: eRecordType.BuffTrigger,BuffKey:buffBase.Config.Key,TriggerType: type,Camp: buffBase.Control.GetCampInfo(),BuffID: buffBase.ID,TriggerIndex: this.mIndex,Attrs:changeAttrs});
        for(let cell in changeAttrs){
            let key:number = Number(cell);
            let nowValue:number = buffBase.Control.AttrObj.GetAttr(key);//获取到当前的属性
            buffBase.Control.AttrObj.SetAttr(key,nowValue + changeAttrs[key])//对属性进行改动
        }
    } 
};  