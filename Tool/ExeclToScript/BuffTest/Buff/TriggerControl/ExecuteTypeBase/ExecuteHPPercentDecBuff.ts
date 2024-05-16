import { eAttrType } from "../../../AttrControl/Define/AttrDefine";
import { GetKV } from "../../../Util";
import { BuffBase } from "../../BuffBase/BuffBase";
import { ExecuteTypeBase } from "./ExecuteTypeBase";
//血量百分比削减
export class ExecuteHPPercentDecBuff extends ExecuteTypeBase{
    private mExecuteObj:{k:number,v:number}|undefined;
    constructor(buffBase:BuffBase,doSome:number,id:number,...param:any[]){
        super(buffBase,doSome,id,param);
    }
    //初始化时
    public OnInit(...param: any[]): void {
        this.mExecuteObj = GetKV(this.mDosomesing); 
    }
 
    public OnEnter(){
        let hurm:number = 0;
        if(this.mExecuteObj!.k == 1){//百分比扣血
            let attack:number = this.mBuffBase.Control.CampInfo.EnemyCamp.GetAttrByType(eAttrType.SumAttack);
            hurm = attack * (this.mExecuteObj!.v / 100)
        }else if(this.mExecuteObj!.k == 2){//固定伤害
            hurm = this.mExecuteObj!.v;
        }
        //获取到敌人的血量
        let nowHP:number = this.mBuffBase.Control.CampInfo.EnemyCamp.GetAttrByType(eAttrType.SumFinalHP);
        hurm = (nowHP - hurm) <= 0 ? nowHP - hurm : hurm;
        this.mBuffBase.Control.CampInfo.EnemyCamp.SetAttrByType(eAttrType.SumFinalHP,nowHP - hurm);
    }
     
    //当特效退出执行的时候，要做的事情
    public OnExit(){
        //不做任何的操作，因为没有属性的变动
    }
}