import { AttrCell } from "../AttrControl/AttrCell";
import { eCampType } from "../BattleSimulation/Define/BattleDefine";
import { BuffControl } from "./BuffControl";
import { eTriggerType } from "./Define/Define";
export class BuffProxy{
    private static sControlID:number = 0;
    private static sInstance:BuffProxy|undefined = undefined;
    private mControlMap:Map<number,BuffControl> = new Map<number,BuffControl>();//游戏内所有的Buff控制器
    public static get Ins():BuffProxy{
        if(BuffProxy.sInstance == undefined)    
            BuffProxy.sInstance = new BuffProxy();
        return BuffProxy.sInstance;
    }

    //生成一个Buff控制单元 
    public GenBuffControl(campType:eCampType,attrObj:AttrCell):number{
        let controlID:number = BuffProxy.sControlID++;
        this.mControlMap.set(controlID,new BuffControl(controlID,campType,attrObj));
        return controlID;
    }

    //删除一个Buff控制器
    public DeleteBuffControl(controlID:number):void{
        let controlObj:BuffControl|undefined = this.mControlMap.get(controlID);
        if(controlObj == undefined)//首先判断是否拥有这个控制ID
            return;
        controlObj.Destory();
    }
    
    //给一个Buff控制器添加一个Buff
    public AddBuff(controlID:number,buffID:number):boolean{
        let controlObj:BuffControl|undefined = this.mControlMap.get(controlID);
        if(controlObj == undefined)//首先判断是否拥有这个控制ID
            return false; 
        return controlObj.AddBuff(buffID);
    }
 
    public TriggerEvent(controlID:number,triggerType:eTriggerType,data?:any):void{
        let controlObj:BuffControl|undefined = this.mControlMap.get(controlID);
        if(controlObj == undefined)//首先判断是否拥有这个控制ID
            return;
        controlObj.Trigger(triggerType,data);
    }
}