import { BuffBase } from "../../BuffBase/BuffBase";
import { ExecuteTypeBase } from "./ExecuteTypeBase";
abstract class a{
    constructor(){
        this.onInit();
    } 
    public abstract onInit():void;
}
class b extends a{
    public b:number = 0;
    constructor(){
        super();
    }
    public onInit():void{
        this.b = 111;
    }
}
//只要触发了，便会对玩家添加一个Buff
export class ExecuteAddBuff extends ExecuteTypeBase{
    protected mAddBuffID:number = 0; 
    constructor(buffBase:BuffBase,doSome:number,id:number,...param:any[]){
        super(buffBase,doSome,id,param);
        this.OnInit(param);
        console.log(new b().b);
    }
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