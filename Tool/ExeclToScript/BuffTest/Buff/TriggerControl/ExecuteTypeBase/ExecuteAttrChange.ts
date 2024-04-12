import { RecordBuffTrigger, eRecordType } from "../../../BattleSimulation/Define/RecordDefine";
import { BattleCommunicantProxy } from "../../../Communicant/BattleCommunicant";
import { eNotifyType } from "../../../Communicant/Define/Define";
import { ExecuteTypeBase } from "./ExecuteTypeBase";
import { GetKV } from "../../../Util";

//当一个Buff满足条件并可以正常执行时，
export class ExecuteAttrChange extends ExecuteTypeBase{
    private mAttrKey:number = -1;
    private mAttrValue:number = 0;
    private RemoveAttrs():void{
        if(this.mAttrKey == -1)
            return;
        let nowValue:number = this.mBuffBase.Control.AttrObj.GetAttr(this.mAttrKey);//获取到当前的属性
        this.mBuffBase.Control.AttrObj.SetAttr(this.mAttrKey,nowValue -this.mAttrValue,false)//对属性进行改动
        this.mAttrKey = -1;
        this.mAttrValue = 0;
    }

    public OnEnter(){ 
        let kvObj:{k:number,v:number} = GetKV(this.mDosomesing);
        if(kvObj.k == this.mAttrKey && kvObj.v == this.mAttrValue)//属性无变化的情况
            return;
        if(kvObj.k != -1)
            this.RemoveAttrs();
        this.mAttrKey = kvObj.k;
        this.mAttrValue = kvObj.v;
        let nowValue:number = this.mBuffBase.Control.AttrObj.GetAttr( this.mAttrKey );//获取到当前的属性
        this.mBuffBase.Control.AttrObj.SetAttr( this.mAttrKey,nowValue + this.mAttrValue )//对属性进行改动
 
        let recordBuffTrigger:RecordBuffTrigger=
        {RecordType: eRecordType.BuffTrigger,BuffKey: this.mBuffBase.Config.Key,Camp: this.mBuffBase.Control.GetCampType(),BuffID: this.mBuffBase.ID,Attrs:{[`${this.mAttrKey}`]:this.mAttrValue}};
        BattleCommunicantProxy.Ins.Notify(this.mBuffBase.Control.BattleCommunicantID,eNotifyType.BattleReport,recordBuffTrigger) 
    }
    
    //当特效退出执行的时候，要做的事情
    public OnExit(){
        this.RemoveAttrs();//直接进行属性一处
    }
}