import { ExecuteTypeBase } from "./ExecuteTypeBase";
import { eExecuteType } from "./ExecuteTypeDefine";

//当一个Buff满足条件并可以正常执行时，
export class ExecuteAttrChange extends ExecuteTypeBase{ 
    //当特效进行执行的时候，要做的事情
    public OnEnter(){
    }
    
    //当特效进行执行的时候，要做的事情
    public OnUpdate(){
        let recordBuffTrigger:RecordBuffTrigger = {RecordType: eRecordType.BuffTrigger,BuffKey:buffBase.Config.Key,TriggerType: type,Camp: buffBase.Control.GetCampInfo(),BuffID: buffBase.ID,TriggerIndex: this.mIndex,Attrs:changeAttrs};
        BattleCommunicantProxy.Ins.Notify(this.mBuffBase.Control.BattleCommunicantID,eNotifyType.BattleReport,recordBuffTrigger)
        for(let cell in changeAttrs){
            let key:number = Number(cell);
            let nowValue:number = buffBase.Control.AttrObj.GetAttr(key);//获取到当前的属性
            buffBase.Control.AttrObj.SetAttr(key,nowValue + changeAttrs[key])//对属性进行改动
        }
    }
    //当特效退出执行的时候，要做的事情
    public OnExit(){
    }
}