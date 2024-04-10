import { eExecuteType } from "./ExecuteTypeDefine";
import { BuffBase } from "../../BuffBase/BuffBase";
import { eTriggerType } from "../../Define/Define";

//当一个Buff满足条件并可以正常执行时，
export class ExecuteTypeBase{
    protected mBuffBase:BuffBase;//原始的Buff信息
    protected mExecuteType:eExecuteType;
    protected mDosomesing:number;
    
    public constructor(buffBase:BuffBase,doSome:number,...param){
        this.mBuffBase = buffBase;
        this.mDosomesing = doSome;
        this.OnInit(param);//初始化时
    }
    //当特效进行执行的时候，要做的事情
    public OnInit(...param):void{
    }

    //当特效进行执行的时候，要做的事情
    public OnEnter(triggerType:eTriggerType){
    }
     
    //当特效退出执行的时候，要做的事情
    public OnExit(){
    }
}