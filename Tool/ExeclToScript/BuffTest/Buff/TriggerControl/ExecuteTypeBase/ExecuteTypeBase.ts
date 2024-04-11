import { BuffBase } from "../../BuffBase/BuffBase";
import { eExecuteType } from "../../Define/BuffExecDefine";
import { eTriggerType } from "../../Define/Define";

//当一个Buff满足条件并可以正常执行时，
export class ExecuteTypeBase{
    protected mID:number;
    protected mBuffBase:BuffBase;//原始的Buff信息
    protected mExecuteType:eExecuteType;
    protected mDosomesing:number;
    
    public constructor(buffBase:BuffBase,doSome:number,id:number,...param:any[]){
        this.mID = id;
        this.mBuffBase = buffBase;
        this.mDosomesing = doSome;
        this.mExecuteType = eExecuteType.AddBuff; 
    }
    //当特效进行执行的时候，要做的事情
    public OnInit(...param:any[]):void{
    }

    //当特效进行执行的时候，要做的事情
    public OnEnter(){
    }
     
    //当特效退出执行的时候，要做的事情
    public OnExit(){
    }
}