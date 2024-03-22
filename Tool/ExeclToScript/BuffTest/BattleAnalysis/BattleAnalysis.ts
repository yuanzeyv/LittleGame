import { RecordBase, eRecordType } from "../BattleSimulation/Define/RecordDefine";
import { RecordAttackType } from "./AnalysisType/RecordAttackType";
import { RecordAttrUpdateType } from "./AnalysisType/RecordAttrUpdateType";
import { RecordBuffInsertType } from "./AnalysisType/RecordBuffInsertType";
import { RecordBuffTriggerType } from "./AnalysisType/RecordBuffTriggerType";
import { RecordEndBattleType } from "./AnalysisType/RecordEndBattleType";
import { RecordInitAttrsType } from "./AnalysisType/RecordInitAttrsType";
import { RecordTypeBase } from "./AnalysisType/RecordTypeBase";

//收到战斗日志记录后，本类用于对战斗日志就行解析
//战斗系统的设计，我考虑使用状态同步来做，这样子流量等一些属性都会节省下来
export class BattleAnalysis{
    private static mIns:BattleAnalysis;
    private mRecordAnalysisMap:Map<eRecordType,RecordTypeBase> = new Map<eRecordType,RecordTypeBase>();
    constructor(){
        this.mRecordAnalysisMap.set(eRecordType.Attack,new RecordAttackType());
        this.mRecordAnalysisMap.set(eRecordType.AttrUpdate,new RecordAttrUpdateType());
        this.mRecordAnalysisMap.set(eRecordType.BuffInsert,new RecordBuffInsertType());
        this.mRecordAnalysisMap.set(eRecordType.BuffTrigger,new RecordBuffTriggerType());
        this.mRecordAnalysisMap.set(eRecordType.EndBattle,new RecordEndBattleType());
        this.mRecordAnalysisMap.set(eRecordType.InitAttrs,new RecordInitAttrsType()); 
    }

    public static get Ins():BattleAnalysis{
        if(BattleAnalysis.mIns == undefined)    
            BattleAnalysis.mIns = new BattleAnalysis();
        return BattleAnalysis.mIns;
    }

    public OutPutRecord(recordArr:Array<RecordBase>){
        for(let cell of recordArr){
            this.mRecordAnalysisMap.get(cell.RecordType)?.ToString(cell);
        }
    }
}
