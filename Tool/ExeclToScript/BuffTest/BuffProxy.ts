import { AttrCell } from "./Battle/AttrCell";
import { eCampType } from "./Battle/BattleDefine";
import { BuffControl } from "./BuffControl";
import { IBuffObj, eTriggerType } from "./Define";

export class BuffProxy{
    private static sControlID:number = 0;
    private mControlMap:Map<number,BuffControl> = new Map<number,BuffControl>();//当前所有存活的Buff
    //生成一个Buff控制单元
    public GenBuffControl(campType:eCampType,attrObj:AttrCell):number{
        let controlID:number = BuffProxy.sControlID++;
        this.mControlMap.set(controlID,new BuffControl(controlID,campType,attrObj));
        return controlID;
    }
    
    //给一个Buff控制器添加一个Buff
    public AddBuff(controlID:number,buffID:number):boolean{
        let controlObj:BuffControl|undefined = this.mControlMap.get(controlID);
        if(controlObj == undefined)//首先判断是否拥有这个控制ID
            return false; 
        return controlObj.AddBuff(buffID);
    }
 
    public TriggerEvent(controlID:number,triggerType:eTriggerType,data?:any,trrigerArr?:Array<IBuffObj>):void{
        let controlObj:BuffControl|undefined = this.mControlMap.get(controlID);
        if(controlObj == undefined)//首先判断是否拥有这个控制ID
            return;
        controlObj.Trigger(triggerType,data,trrigerArr);
    }  
}