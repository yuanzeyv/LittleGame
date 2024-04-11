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
import { Camp } from "../BattleSimulation/Camp";
import { GetBattleSimulation } from "../Global";
export class BuffControl{
    private mBuffGenID:number = 0;//用以对新添加的Buff赋ID
    private mCampType:eCampType;//玩家阵营类型

    private mBattleCommunicantID:number;//通知ID
    //Buff会监听事件类型，以此来触发Buff并进行执行
    private mTriggerBuffmap:Array<Set<BuffBase>> = new Array<Set<BuffBase>>();
    //根据挂载的BuffID找到唯一Buff
    private mBuffMap:Map<number,BuffBase> = new Map<number,BuffBase>();//通过Buff唯一ID，快速索引到指定的角色Buff
    //根据Buff所属类型，找到一组Buff
    private mTypeBuffMap:Map<TBuffType,Map<TBuffID,Array<BuffBase>>> = new Map<TBuffType,Map<TBuffID,Array<BuffBase>>>();
    
    constructor(campType:eCampType,battleCommunicantID:number){
        this.mBattleCommunicantID = battleCommunicantID;
        this.mCampType = campType; 
        this.InitTriggerMap();
    } 

    private InitTriggerMap():void{
        for(let index = 0 ; index < eTriggerType.FINAL ; index++) 
            this.mTriggerBuffmap[index] = new Set<BuffBase>(); 
    } 

    //获取到关联的阵营信息
    public get CampInfo():Camp{
        return GetBattleSimulation().GetCamp(this.mCampType);
    }
    
    //获取到玩家的阵营信息
    public GetCampType():eCampType{
        return this.mCampType; 
    }

    //获取到玩家的属性信息
    public get AttrObj():AttrCell{
        return GetBattleSimulation().GetCamp(this.mCampType).AttrObj;
    } 

    //获取到通知对象
    public get BattleCommunicantID():number{
        return this.mBattleCommunicantID;
    }

    //获取到对应Bkey，所指向的Buff列表
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

    //获取到指定Buff存在的数量
    private GetBuffCountByKey(buffKey:number):number{
        let buffArray:Array<BuffBase>|undefined = this.GetBuffArrayByKey(buffKey);
        if(buffArray == undefined)
            return 0;
        return buffArray.length;//获取到Buff的数量
    }
    
    //根据BuffKey添加一个Buff
    public AddBuff(buffKey:number):boolean{ 
        let buffConfig:IBuffStruct|undefined = BuffConfig.GetData(buffKey);
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
    
    //插入一个领域Buff
    public InsertTerritoryBuff(buffKey:number):boolean{
        let ownerCount:number = this.GetBuffCountByKey(buffKey);//当前是否已经添加过此Buff
        if(ownerCount != 0)//是否已经添加过此Buff
            return false;
        let buffBase:BuffBase = new TerritoryBuff(this,buffKey);//插入一个领域Buff
        this.InsertBaseBuff(buffBase);
        return true;
    }
    
    //插入可叠加Buff
    public InsertStackBuff(buffKey:number):boolean{
        let buffConfig:IBuffStruct = BuffConfig.GetData(buffKey)!;//获取到当前是否存在对应BuffID的配置表
        if( buffConfig == undefined )
            return false;
        let maxStack:number = buffConfig.MaxStack;
        let nowStack:number  = this.GetBuffCountByKey(buffKey);//判断当前是否没有次数
        if(nowStack >= maxStack)
            return false;
        this.InsertBaseBuff(new StackBuff(this,buffKey)); 
        return true;
    }  

    //插入一个Buff到类型数组中
    private InsertBuffToTypeMap(buffBase:BuffBase):void{ 
        let typeMap:Map<number,Array<BuffBase>> | undefined = this.mTypeBuffMap.get(buffBase.Config.BuffType);//寻找对应类型数组
        if(typeMap == undefined){
            typeMap = new Map<number,Array<BuffBase>>();
            this.mTypeBuffMap.set(buffBase.Config.BuffType,typeMap)
        }  
        let buffArray:Array<BuffBase>|undefined = typeMap.get(buffBase.Config.BuffID);
        if(buffArray == undefined){
            buffArray = new Array<BuffBase>();
            typeMap.set(buffBase.Config.BuffID,buffArray);
        }
        buffArray.push(buffBase);
    }

    //插入一个Buff到对应的Type
    private InsertBaseBuff(buffBase:BuffBase):void{ 
        buffBase.ID = this.mBuffGenID++;

        this.InsertBuffToTypeMap(buffBase);
        this.mBuffMap.set(buffBase.ID,buffBase);//快速索引
        //监视触发条件与结束条件
        for(let typeSets of [buffBase.BuffTriggerControl.TriggerSet,buffBase.BuffTriggerControl.TriggerEndTypeSet])
            for(let type of typeSets)
                this.mTriggerBuffmap[type].add(buffBase);
        //插入一个Buff
        let record:RecordBuffInsert = {RecordType:eRecordType.BuffInsert,Camp:this.mCampType,BuffID:buffBase.ID,BuffKey:buffBase.Config.Key,Life:buffBase.LifeCount};
        BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,record);
        //发送BufF插入消息
        buffBase.TriggerEvent(eTriggerType.BuffInsert);//发送一个Buff插入事件
    }
    
    //删除一个Buff到对应的Type
    public DeleteBuff(buffBase:BuffBase):void{
        let typeMap:Map<number,Array<BuffBase>> | undefined = this.mTypeBuffMap.get(buffBase.Config.BuffType);
        if(typeMap == undefined)
            return;
        let buffArray:Array<BuffBase>|undefined = typeMap.get(buffBase.Config.BuffID);
        if(buffArray == undefined)
            return;
        let findIndex:number = buffArray.findIndex((value: BuffBase, index: number, obj: BuffBase[])=> value.ID == buffBase.ID);
        if(findIndex == -1)
            return;
        buffArray.splice(findIndex);
        if(buffArray.length == 0) {
            typeMap.delete(buffBase.Config.BuffID);
            buffArray = undefined;//赋予空，虽然不会再被用到
        }
        if(typeMap.size == 0){
            this.mTypeBuffMap.delete(buffBase.Config.BuffType);
            buffArray == undefined;
        }
        //删除唯一ID索引
        this.mBuffMap.delete(buffBase.ID);  
        //获取到Buff的触发类型，进行设置
        for(let typeSets of [buffBase.BuffTriggerControl.TriggerSet,buffBase.BuffTriggerControl.TriggerEndTypeSet])
            for(let type of typeSets)
                this.mTriggerBuffmap[type].delete(buffBase);
    }
 
    
    //Buff被触发了
    public Trigger(triggerType:eTriggerType,param?:any):void{
        if(this.mTriggerBuffmap[triggerType] == undefined)
            return;
        for(let buffBase of this.mTriggerBuffmap[triggerType])
            buffBase.TriggerEvent(triggerType,param);
    }
    
    //删除当前的Buff控制器
    public Destory():void{
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
            this.DeleteBuff(buffBase);//删除老的Buff
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
}