import { RecordBuffTrigger, eRecordType } from "../../../BattleSimulation/Define/RecordDefine";
import { BattleCommunicantProxy } from "../../../Communicant/BattleCommunicant";
import { eNotifyType } from "../../../Communicant/Define/Define";
import { ExecuteTypeBase } from "./ExecuteTypeBase"; 
import { eTriggerType } from "../../Define/Define";
import { GetKV } from "../../../Util";

//当一个Buff满足条件并可以正常执行时，
export class ExecuteAttrChange extends ExecuteTypeBase{ 
    private mActiveAttrs:{[k:number]:number} = {};  
    private RemoveAttrs():void{
        //首先删除之前的属性加成
        for(let cell in this.mActiveAttrs){
            let attrKey:number = Number(cell); 
            let nowValue:number = this.mBuffBase.Control.AttrObj.GetAttr(attrKey);//获取到当前的属性
            this.mBuffBase.Control.AttrObj.SetAttr(attrKey,nowValue + -this.mActiveAttrs[attrKey])//对属性进行改动
        }
        this.mActiveAttrs = {};//清空处理
    }

    public OnEnter(type:eTriggerType){ 
        this.RemoveAttrs();//进行属移除
        //计算最新的加成
        let kvObj:{k:number,v:number} = GetKV(this.mDosomesing);
        this.mActiveAttrs[kvObj.k] = kvObj.v;
        for(let cell in this.mActiveAttrs){
            let attrKey:number = Number(cell); 
            let nowValue:number = this.mBuffBase.Control.AttrObj.GetAttr(attrKey);//获取到当前的属性
            this.mBuffBase.Control.AttrObj.SetAttr(attrKey,nowValue + this.mActiveAttrs[attrKey])//对属性进行改动
        } 
        let recordBuffTrigger:RecordBuffTrigger={
            RecordType: eRecordType.BuffTrigger,
            BuffKey: this.mBuffBase.Config.Key,
            TriggerType: type,
            Camp: this.mBuffBase.Control.GetCampType(),
            BuffID: this.mBuffBase.ID,
            Attrs: this.mActiveAttrs
        };
        BattleCommunicantProxy.Ins.Notify(this.mBuffBase.Control.BattleCommunicantID,eNotifyType.BattleReport,recordBuffTrigger) 
    }
    
    //当特效退出执行的时候，要做的事情
    public OnExit(){
        this.RemoveAttrs();//直接进行属性一处
    }
} 