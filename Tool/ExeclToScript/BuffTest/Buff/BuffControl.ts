import { IBuffStruct, BuffConfig } from "../../Work/OutputScript/Buff";
import { AttrCell } from "../AttrControl/AttrCell";
import { eCampType } from "../BattleSimulation/Define/BattleDefine";
import { BuffBase } from "./BuffBase/BuffBase";
import { LevelBuff } from "./BuffBase/LevelBuff";
import { NormalBuff } from "./BuffBase/NormalBuff";
import { StackBuff } from "./BuffBase/StackBuff";
import { TerritoryBuff } from "./BuffBase/TerritoryBuff";
import { TBuffType, TBuffID, eTriggerType, eBuffType } from "./Define/Define"; 
import { RecordBuffInsert, eRecordType } from "../BattleSimulation/Define/RecordDefine";
import { BattleCommunicantProxy } from "../Communicant/BattleCommunicant";
import { eNotifyType } from "../Communicant/Define/Define";
export class BuffControl{
    private mBattleCommunicantID:number;//战斗通知模块
    private mBuffGenID:number = 0;//用以对新添加的Buff赋ID
    private mCampType:eCampType;//需要一个类型，知道当前控制器的拥有者事谁
    private mBuffMap:Map<number,BuffBase> = new Map<number,BuffBase>();//通过Buff唯一ID，快速索引到指定的角色Buff
    private mTypeBuffMap:Map<TBuffType,Map<TBuffID,Array<BuffBase>>> = new Map<TBuffType,Map<TBuffID,Array<BuffBase>>>();
    private mTriggerBuffmap:Array<Set<BuffBase>> = new Array<Set<BuffBase>>();//通过Buff的触发类型来确定当前Buff的附加属性是否应该被执行 
    private mAttrObj:AttrCell;//用于Buff直接修改玩家属性。
    constructor(campType:eCampType,attrObj:AttrCell,battleCommunicantID:number){
        this.mBattleCommunicantID = battleCommunicantID;
        this.mCampType = campType;
        this.mAttrObj = attrObj;
        this.InitTriggerMap();
    } 
    
    private InitTriggerMap():void{
        for(let index = 0 ; index < eTriggerType.FINAL ; index++) 
            this.mTriggerBuffmap[index] = new Set<BuffBase>(); 
    }

    //获取到通知对象
    public get BattleCommunicantID():number{
        return this.mBattleCommunicantID;
    }

    //获取到属性对象
    public get AttrObj():AttrCell{ 
        return this.mAttrObj; 
    } 
    
    //获取到玩家的阵营信息
    public GetCampType():eCampType{
        return this.mCampType; 
    }

    public Trigger(triggerType:eTriggerType,param?:any):void{
        if(this.mTriggerBuffmap[triggerType] == undefined)
            return;
        for(let buffBase of this.mTriggerBuffmap[triggerType])
            buffBase.TriggerEvent(triggerType,param);
    }

    private GetBuffCountByKey(buffKey:number):number{
        let buffConfig:IBuffStruct|undefined = BuffConfig.GetData(buffKey);
        if(buffConfig == undefined)//没有找到对应的Buff时
            return 0;
        let typeMap:Map<TBuffID,Array<BuffBase>> | undefined = this.mTypeBuffMap.get(buffConfig.BuffType);
        if(typeMap == undefined)
            return 0;
        let buffArray:Array<BuffBase>|undefined = typeMap.get(buffConfig.BuffID);
        if(buffArray == undefined)
            return 0;
        return buffArray.length;
    }
    
    private GetBuffArrayByKey(buffKey:number):Array<BuffBase>|undefined{
        let buffConfig:IBuffStruct|undefined = BuffConfig.GetData(buffKey);//获取到当前是否存在对应BuffID的配置表
        if(buffConfig == undefined)//没有找到对应的Buff时
            return undefined;
        let typeMap:Map<number,Array<BuffBase>> | undefined = this.mTypeBuffMap.get(buffConfig.BuffType);
        if(typeMap == undefined)
            return undefined;
        let buffArray:Array<BuffBase>|undefined = typeMap.get(buffConfig.BuffID);
        if(buffArray == undefined)
            return undefined;
        return buffArray;
    }

    public AddBuff(buffKey:number):boolean{ 
        let buffConfig:IBuffStruct|undefined = BuffConfig.GetData(buffKey);//获取到当前是否存在对应BuffID的配置表
        if(buffConfig == undefined)
            return false;
        if( buffConfig.BuffType == eBuffType.Territory )//领域类型的Buff的话
            return this.InsertTerritoryBuff(buffKey);
        else if( buffConfig.BuffType == eBuffType.Normal )//固定等级Buff
            return this.InsertNormalBuff(buffKey); 
        else if( buffConfig.BuffType == eBuffType.StackLevel )//叠加等级Buff 
            return this.InsertStackLevelBuff(buffKey);
        else if( buffConfig.BuffType == eBuffType.Stack )//叠加类型Buff
            return this.InsertStackBuff(buffKey);
        return false;
    }
    //插入一个Buff到对应的Type
    private InsertBaseBuff(buffBase:BuffBase):void{
        let buffConfig:IBuffStruct = buffBase.Config;//获取到当前是否存在对应BuffID的配置表
        let typeMap:Map<number,Array<BuffBase>> | undefined = this.mTypeBuffMap.get(buffConfig.BuffType);
        if(typeMap == undefined){
            typeMap = new Map<number,Array<BuffBase>>();
            this.mTypeBuffMap.set(buffConfig.BuffType,typeMap)
        }  
        let buffArray:Array<BuffBase>|undefined = typeMap.get(buffConfig.BuffID);
        if(buffArray == undefined){
            buffArray = new Array<BuffBase>();
            typeMap.set(buffConfig.BuffID,buffArray);
        }
        buffBase.ID = this.mBuffGenID++
        buffArray.push(buffBase);

        this.mBuffMap.set(buffBase.ID,buffBase);

        //设置Buff触发条件
        for(let type of buffBase.BuffTriggerControl.GetTriggerTypeSet())
            this.mTriggerBuffmap[type].add(buffBase);
        //设置结束条件
        for(let type of buffBase.BuffTriggerControl.GetTriggerTypeSet())
            this.mTriggerBuffmap[type].add(buffBase);
        let record:RecordBuffInsert = {RecordType:eRecordType.BuffInsert,Camp:this.mCampType,BuffID:buffBase.ID,BuffKey:buffConfig.Key,Life:buffBase.LifeCount};
        BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,record);
        buffBase.TriggerEvent(eTriggerType.BuffInsert);//发送一个Buff插入事件
    }

    //删除当前的Buff控制器
    public Destory():void{
    }

    //删除一个Buff到对应的Type
    private DeleteBaseBuff(buffBase:BuffBase):void{
        let buffConfig:IBuffStruct = buffBase.Config;//获取到当前是否存在对应BuffID的配置表
        /*
        *删除类型索引
        */
        let typeMap:Map<number,Array<BuffBase>> | undefined = this.mTypeBuffMap.get(buffConfig.BuffType);
        if(typeMap == undefined)
            return;
        let buffArray:Array<BuffBase>|undefined = typeMap.get(buffConfig.BuffID);
        if(buffArray == undefined)
            return;
        let findIndex:number = buffArray.findIndex((value: BuffBase, index: number, obj: BuffBase[])=> value.ID == buffBase.ID);
        if(findIndex == -1)
            return;
        buffArray.splice(findIndex);
        if(buffArray.length == 0) {
            typeMap.delete(buffConfig.BuffID);
            buffArray = undefined;//赋予空，虽然不会再被用到
        }
        if(typeMap.size == 0){
            this.mTypeBuffMap.delete(buffConfig.BuffType);
            buffArray == undefined;
        }
        //删除唯一ID索引
        this.mBuffMap.delete(buffBase.ID); 
        //获取到Buff的触发类型，进行设置
        for(let type of buffBase.BuffTriggerControl.GetTriggerTypeSet())
            this.mTriggerBuffmap[type].delete(buffBase);
    }
    //插入一个领域Buff
    public InsertTerritoryBuff(buffKey:number):boolean{
        let ownerCount:number = this.GetBuffCountByKey(buffKey);//判断当前是否没有次数
        if(ownerCount != 0)
            return false;
        let buffBase:BuffBase = new TerritoryBuff(this,buffKey);
        this.InsertBaseBuff(buffBase);
        return true;
    }
    
    //插入一个固定等级的Buff
    public InsertNormalBuff(buffKey:number):boolean{
        let typeArray:BuffBase[]|undefined  = this.GetBuffArrayByKey(buffKey);//判断当前是否没有次数
        let buffBase:BuffBase|undefined;
        if(typeArray == undefined || typeArray.length == 0){
            buffBase = new LevelBuff(this,buffKey);
            this.InsertBaseBuff(buffBase);
        } else 
            buffBase = typeArray![0];
        typeArray = undefined;//之后请不要再使用，因为 typeArray 在下面有可能被释放
        let buffConfig:IBuffStruct = BuffConfig.GetData(buffKey)!;//获取到当前是否存在对应BuffID的配置表
        if( buffBase.Config.Level < buffConfig.Level ){  
            this.DeleteBaseBuff(buffBase);//删除老的Buff
            buffBase = new NormalBuff(this,buffKey);
            this.InsertBaseBuff(buffBase); 
        }
        buffBase.ResetLifeCount();
        return true;
    }
    
    //插入一个固定等级的Buff
    public InsertStackLevelBuff(buffKey:number):boolean{
        let buffConfig:IBuffStruct|undefined = BuffConfig.GetData(buffKey);//获取到当前是否存在对应BuffID的配置表
        if( buffConfig == undefined || buffConfig.Level != 0 )
            return false; 
        let typeArray:BuffBase[]|undefined  = this.GetBuffArrayByKey(buffKey);//判断当前是否没有次数 
        let buffBase:BuffBase|undefined = undefined;
        if(typeArray == undefined || typeArray.length == 0){
            buffBase = new LevelBuff(this,buffKey);
            this.InsertBaseBuff(buffBase);
        }else   
            buffBase = typeArray[0];
        (buffBase as LevelBuff).SetLevel(buffBase.Config.Level + 1);
        buffBase.ResetLifeCount();
        return true;
    }

    //插入可叠加Buff
    public InsertStackBuff(buffKey:number):boolean{
        let buffConfig:IBuffStruct = BuffConfig.GetData(buffKey)!;//获取到当前是否存在对应BuffID的配置表
        if( buffConfig == undefined )
            return false;
        let maxStack:number = buffConfig.MaxStack;
        let nowStack:number  = this.GetBuffCountByKey(buffKey);//判断当前是否没有次数
        if(nowStack < maxStack)
            this.InsertBaseBuff(new StackBuff(this,buffKey));
        console.log(`当前的数据信息 ${nowStack}`);
        return true;
    }  
}