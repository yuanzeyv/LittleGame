import { type } from "os";
import { RecordBuffTrigger, eRecordType } from "../../../BattleSimulation/Define/RecordDefine";
import { BattleCommunicantProxy } from "../../../Communicant/BattleCommunicant";
import { eNotifyType } from "../../../Communicant/Define/Define";
import { eExecuteType } from "./ExecuteTypeDefine";
import { BuffBase } from "../../BuffBase/BuffBase";

//当一个Buff满足条件并可以正常执行时，
export class ExecuteTypeBase{
    protected mBuffBase:BuffBase;//原始的Buff信息
    protected mExecuteType:eExecuteType;
    protected mDosomesing:number;
    
    public constructor(buffBase:BuffBase,doSome:number){
        this.mBuffBase = buffBase;
        this.mDosomesing = doSome;
    }
    //当特效进行执行的时候，要做的事情
    public OnEnter(){
    }
    
    //当特效进行执行的时候，要做的事情
    public OnUpdate(){
    }
    //当特效退出执行的时候，要做的事情
    public OnExit(){
    }
}