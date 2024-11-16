import { Cfg_PhysicsBuff, IPhysicsBuffStruct } from "../../../../Config/Cfg_PhysicsBuff";
import { _Facade } from "../../../../Global";
import { Buff } from "../../FightProxy/Buff";
import { OnlyTheBraveProxy } from "../OnlyTheBraveProxy";
import { PhysicsObejct } from "../PlayerObject/PhysicsType/PhysicsObejct"; 
import { BuffCell } from "./BuffCell";
import { eTriggerType } from "./BuffDefine";

//一个Buff管理类型
export class BuffManager{
    private sGenerateID:number = 0;
    private mPhysicsObject:PhysicsObejct;//关联的物理对象
    private mBuffCellMap:Map<number,BuffCell> = new Map<number,BuffCell>();//Buff单元所管理的单个Buff
    private mTriggerCellArray:Array<Set<number>> = new Array<Set<number>>();//通过类型来保存触发Buff，提高遍历性能

    public constructor(physicsObejct:PhysicsObejct){
        this.mPhysicsObject = physicsObejct;//设置物理对象信息
        this.InitTriggerCellArray();
    }

    private InitTriggerCellArray(){
        for(let i = 0 ; i < eTriggerType.finally ; i++)
            this.mTriggerCellArray[i] = new Set<number>();
    }

    public AddBuff(buffID:number):boolean{
        let physicsBuffcfg :IPhysicsBuffStruct  = Cfg_PhysicsBuff.GetData(buffID);
        if(physicsBuffcfg == undefined)
            return false;
        let buffCell = new BuffCell(this,this.sGenerateID++,physicsBuffcfg);
        this.mBuffCellMap.set(buffCell.ID,buffCell);
        this.AddTriggerData(buffCell);

        this.TriggerEvent(eTriggerType.InsertBuff);
        return;
    }
    
    public RemoveBuff(buffCell:BuffCell){ 
        this.TriggerEvent(eTriggerType.RemoveBuff);

        this.mBuffCellMap.delete(buffCell.ID);
        this.RemoveTriggerData(buffCell);
    }

    public RemoveBuffByBuffID(id:number):void{
        let buffCell:BuffCell = this.mBuffCellMap.get(id);
        if( buffCell == undefined )
            return;
        this.RemoveBuff(buffCell);
    }

    private AddTriggerData(buff:BuffCell){
        for(let cell of _Facade.FindProxy(OnlyTheBraveProxy).GetBuffTriggers(buff.BuffCfg.BuffID)){
            if(this.mTriggerCellArray[cell] == undefined)
                continue;
            this.mTriggerCellArray[cell].add(buff.ID);
        }
    }
    private RemoveTriggerData(buff:BuffCell){
        for(let cell of _Facade.FindProxy(OnlyTheBraveProxy).GetBuffTriggers(buff.BuffCfg.BuffID)){
            if(this.mTriggerCellArray[cell] == undefined)
                continue;
            this.mTriggerCellArray[cell].delete(buff.ID);
        }
    }

    public Update(dt:number){
        for(let cell of this.mBuffCellMap)
            cell[1].Update(dt);
    }

    //发送攻击前
    public TriggerEvent(triggerType:eTriggerType,param:{OperObj?:number,BeAtker?:number,Hurm?:number} = {}){
        for(let cell of this.mTriggerCellArray[triggerType])
            this.TriggerEventByBuff(triggerType,cell[1],{OperObj:param.OperObj,BeAtker:param.OperObj,Hurm:param.Hurm});
    }  

    //触发事件 通过BuffID 
    public TriggerEventByBuffID(triggerType:eTriggerType,buffID:number,param:{ OperObj?:number,BeAtker?:number,Hurm?:number}){
        let buffCell:BuffCell = this.mBuffCellMap.get(buffID);
        if(buffCell == undefined)
            return;
        this.TriggerEventByBuff(triggerType,buffCell,param);
    }  

    public TriggerEventByBuff(triggerType:eTriggerType,buffObj:BuffCell,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
        if(!this.mTriggerCellArray[triggerType].has(buffObj.ID))
            return;
        for(let cell of _Facade.FindProxy(OnlyTheBraveProxy).GetBuffExecInfo(buffObj.BuffCfg.BuffID,triggerType))
            buffObj.TriggerEvent(cell.Exec,this.mPhysicsObject,cell[1].Param,param);
    }

    public Destory(){
        for(let cell of this.mBuffCellMap)
            this.RemoveBuff(cell[1]); 
    }
};