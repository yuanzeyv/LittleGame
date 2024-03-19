import { AttrCell } from "./Battle/AttrCell";
import { BuffBase } from "./BuffBase/BuffBase";
import { LevelBuff } from "./BuffBase/LevelBuff";
import { NormalBuff } from "./BuffBase/NormalBuff";
import { StackBuff } from "./BuffBase/StackBuff";
import { TerritoryBuff } from "./BuffBase/TerritoryBuff";
import { IBuffStruct, BuffConfig } from "./Config/Buff";
import { TBuffType, TBuffID, eTriggerType, eBuffType } from "./Define";

//Buff控制器,可能同时存在N场战斗
export class BuffControl{
    private mControlID:number = 0;//当前buff控制器的唯一ID
    private mBuffGenID:number;//用以对新添加的Buff赋ID
    //通过Buff的触发类型，快速定位到
    //通过Buff唯一ID，快速索引到指定的角色Buff
    private mBuffMap:Map<number,BuffBase> = new Map<number,BuffBase>();//当前所有存活的Buff 
    //通过Buff类型来获取到对应的Buff组，方便快速索引
    private mTypeBuffMap:Map<TBuffType,Map<TBuffID,Array<BuffBase>>> = new Map<TBuffType,Map<TBuffID,Array<BuffBase>>>();//领域类型的Buff
    //通过Buff的触发类型来确定当前Buff的附加属性是否应该被执行 
    private mTriggerBuffmap:Array<Set<BuffBase>> = new Array<Set<BuffBase>>();
    //属性对象地址 Buff 与 玩家之间的桥梁
    private mAttrObj:AttrCell;

    constructor(controlID:number,attrObj:AttrCell){
        this.mControlID = controlID;//当前的控制ID 
        this.InitTriggerMap();
        this.mAttrObj = attrObj;
    }

    private InitTriggerMap():void{
        for(let index = 0 ; index < eTriggerType.FINAL ; index++) 
            this.mTriggerBuffmap[index] = new Set<BuffBase>(); 
    }

    public Trigger(triggerType:eTriggerType,param?:any):boolean{
        if(this.mTriggerBuffmap[triggerType] == undefined)
            return false;
        for(let buffBase of this.mTriggerBuffmap[triggerType])
            buffBase.TriggerEvent(triggerType,param)
        return true;
    }

    private GetBuffCountByKey(buffKey:number):number{
        let buffConfig:IBuffStruct = BuffConfig.GetData(buffKey)!;//获取到当前是否存在对应BuffID的配置表
        let typeMap:Map<number,Array<BuffBase>> | undefined = this.mTypeBuffMap.get(buffConfig.BuffType);
        if(typeMap == undefined)
            return 0;
        let buffArray:Array<BuffBase>|undefined = typeMap.get(buffConfig.BuffID);
        if(buffArray == undefined)
            return 0;
        return buffArray.length;
    }
    
    private GetBuffArrayByKey(buffKey:number):Array<BuffBase>|undefined{
        let buffConfig:IBuffStruct = BuffConfig.GetData(buffKey)!;//获取到当前是否存在对应BuffID的配置表
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

        //获取到Buff的触发类型，进行设置
        for(let type of buffBase.BuffTriggerControl.GetTriggerTypeSet())
            this.mTriggerBuffmap[type].add(buffBase);
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
        let buffBase:BuffBase = new TerritoryBuff(buffKey);
        this.InsertBaseBuff(buffBase);
        return true;
    }
 
    //插入一个固定等级的Buff
    public InsertNormalBuff(buffKey:number):boolean{
        let typeArray:BuffBase[]|undefined  = this.GetBuffArrayByKey(buffKey);//判断当前是否没有次数
        let buffBase:BuffBase|undefined;
        if(typeArray == undefined || typeArray.length == 0){
            buffBase = new LevelBuff(buffKey);
            this.InsertBaseBuff(buffBase);
        } else 
            buffBase = typeArray![0];
        typeArray = undefined;//之后请不要再使用，因为 typeArray 在下面有可能被释放
        let buffConfig:IBuffStruct = BuffConfig.GetData(buffKey)!;//获取到当前是否存在对应BuffID的配置表
        if( buffBase.Config.Level < buffConfig.Level ){  
            this.DeleteBaseBuff(buffBase);//删除老的Buff
            buffBase = new NormalBuff(buffKey);
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
            buffBase = new LevelBuff(buffKey);
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
            this.InsertBaseBuff(new StackBuff(buffKey));
        console.log(`当前的数据信息 ${nowStack}`);
        return true;
    } 
}