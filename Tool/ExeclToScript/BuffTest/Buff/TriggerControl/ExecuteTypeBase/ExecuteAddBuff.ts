import { ExecuteTypeBase } from "./ExecuteTypeBase";
//只要触发了，便会对玩家添加一个Buff
export class ExecuteAddBuff extends ExecuteTypeBase{
    private mAddBuffID:number;
    //初始化时
    public OnInit(...param: any[]): void {
        this.mAddBuffID = this.mDosomesing;
    }
 
    public OnEnter(){
        this.mBuffBase.Control.AddBuff(this.mAddBuffID);//添加一个Buff
    }
     
    //当特效退出执行的时候，要做的事情
    public OnExit(){
        //不做任何的操作，因为没有属性的变动
    }
}