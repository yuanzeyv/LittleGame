import { sp } from "cc";
import { BuffTableConfig, IBuffTableStruct } from "../../../Config/Cfg_BuffTable";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy"; 
//所有属性类
export enum eAttrAddtionType{
    Attack = 0,//增加攻击力
    AttackPrecent = 1,//增加基础攻击力百分比
    SumAttackPrecent = 2,//总攻击力加成
    Defence = 3,//基础防御力
    DefencePrecent = 4,//基础防御力加成
    SumDefencePrecent = 5,//总防御力加成
    HPLimit = 6,//基础生命上限
    HPLimitPrecent = 7,//基础生命上限加成
    SumHPLimitPrecent = 8,//总生命上限加成
    LifeRecovery = 9,//基础生命回复
    ListRecoveryPrecent = 10,//基础生命回复加成
    SumLiefRecoveryPrecent = 11,//总生命回复加成 
    Speed= 12,//基础移速加成
    SpeedPrecent = 13,//基础移速加成
    SumSpeedPrecent = 14,//总移速加成
    CriticalChance = 15,//基础暴击率
    CriticalChancePrecent = 16,//基础暴击率百分比加成
    SumCriticalChancePrecent = 17,//总暴击率百分比加成
    CriticalValue = 18,//基础爆伤加成
    CriticalValuePrecent = 19,//基础爆伤百分比加成
    SumCriticalValuePrecent = 20,//总爆伤加成
    EnergyCost = 21,//基础能量消耗
    EnergyCostPrecent = 22,//基础能量消耗加成
    SumEnergyCostPrecent = 23,//总能量消耗加成
    EnergyEfficiency = 24,//进食效率
    EnergyEfficiencyPrecent = 25,//基础进食效率加成
    SumEnergyEfficiencyPrecent = 26,//总进食效率加成
    Final,//最大属性
};
export enum eAttrType{
    Attack = 0,//角色攻击力
    Defence = 1,//角色防御力
    HP = 2,//角色生命值
    HPRecovery= 3,//生命恢复
    HPLimit = 4,//角色最大生命值
    Speed = 5,//角色移动速度
    CriticalPrecent = 6 ,//角色暴击率
    CriticalValue = 7,//暴击伤害加成
    EnergyCost  = 8,//能量消耗
    EnergyEfficiency = 9,//进食效率
    Satiety = 10,//饱食度
    Final,//最大属性
}
const AttrMapping:Array<Array<eAttrAddtionType>> = new Array<Array<eAttrAddtionType>>();
AttrMapping[eAttrType.Attack] = new Array<eAttrAddtionType>(eAttrAddtionType.Attack,eAttrAddtionType.AttackPrecent,eAttrAddtionType.SumAttackPrecent) ;   //角色攻击力
AttrMapping[eAttrType.Defence] = new Array<eAttrAddtionType>(eAttrAddtionType.Defence,eAttrAddtionType.DefencePrecent,eAttrAddtionType.SumDefencePrecent) ;   //角色防御力
AttrMapping[eAttrType.HPRecovery] = new Array<eAttrAddtionType>(eAttrAddtionType.LifeRecovery,eAttrAddtionType.ListRecoveryPrecent,eAttrAddtionType.SumLiefRecoveryPrecent) ;   //命恢复
AttrMapping[eAttrType.HPLimit] = new Array<eAttrAddtionType>(eAttrAddtionType.HPLimit,eAttrAddtionType.HPLimitPrecent,eAttrAddtionType.SumHPLimitPrecent) ;   //角色最大生命值
AttrMapping[eAttrType.Speed] = new Array<eAttrAddtionType>(eAttrAddtionType.Speed,eAttrAddtionType.SpeedPrecent,eAttrAddtionType.SumSpeedPrecent) ;   //角色移动速度
AttrMapping[eAttrType.CriticalPrecent] = new Array<eAttrAddtionType>(eAttrAddtionType.CriticalChance,eAttrAddtionType.CriticalChancePrecent,eAttrAddtionType.SumCriticalChancePrecent) ;   ///角色暴击率
AttrMapping[eAttrType.CriticalValue] = new Array<eAttrAddtionType>(eAttrAddtionType.CriticalValue,eAttrAddtionType.CriticalValuePrecent,eAttrAddtionType.SumCriticalValuePrecent) ;   //暴击伤害加成
AttrMapping[eAttrType.EnergyCost] = new Array<eAttrAddtionType>(eAttrAddtionType.EnergyCost,eAttrAddtionType.EnergyCostPrecent,eAttrAddtionType.SumEnergyCostPrecent) ;   ///能量消耗
AttrMapping[eAttrType.EnergyEfficiency] = new Array<eAttrAddtionType>(eAttrAddtionType.EnergyEfficiency,eAttrAddtionType.EnergyEfficiencyPrecent,eAttrAddtionType.SumEnergyEfficiencyPrecent) ;   //进食效率

const AttrAddtionMapping:Array<eAttrType> = new Array<eAttrType>();
AttrMapping.forEach((lisArr:eAttrAddtionType[],attrAddtionType:number)=>{
    for(let cell of lisArr)
        AttrAddtionMapping[cell] = attrAddtionType;
})
class BiologyAttr{
    private mBiologyID:number;
    private mAttrArray:Array<number> = new Array<number>();//总属性值数组
    private mAttrAddtionArray:Array<number> = new Array<number>();//附加属性数组
    constructor(biologyID:number){  
        this.mBiologyID = biologyID; 
        for( let i = 0 ; i < eAttrType.Final ; i++)
            this.mAttrArray[i] = 0;
        for( let i = 0 ; i < eAttrAddtionType.Final ; i++)
            this.mAttrAddtionArray[i] = 0; 
    }
    //获取总属性数据
    public GetAttrArray():Readonly<Array<number>>{
        return this.mAttrArray;
    }
    //获取附加属性详细数据
    public GetAttrAddtionArray():Readonly<Array<number>>{
        return this.mAttrAddtionArray;
    }
    //获取单个总属性数据
    public GetAttrByType(type:eAttrType):number{
        return this.mAttrArray[type] || 0;
    }
    //获取单个总属性数据
    public SetAttrByType(type:eAttrType,value:number):number{
        return this.mAttrArray[type] = value;
    }
    //重计算单个总属性数据
    private CalcAttrByType(type:eAttrType):void{
        let calcEnumArray:Array<eAttrAddtionType> = AttrMapping[type];
        if(calcEnumArray == undefined)
            return;
        let baseValue:number = this.GetAttrAddtionByType(calcEnumArray[0]);
        let baseAddtionValue:number = this.GetAttrAddtionByType(calcEnumArray[1]);
        let sumAddtionValue:number = this.GetAttrAddtionByType(calcEnumArray[2]);
        this.mAttrArray[type] = (baseValue + (baseValue * baseAddtionValue)) *  (1 + sumAddtionValue); 
    }

    //获取单个附加属性数据
    private GetAttrAddtionByType(type:eAttrAddtionType):number{
        return this.mAttrAddtionArray[type] || 0;
    }
    //设置单个附加属性书
    private SetAttrAddtionByType(type:eAttrAddtionType,value:number):void{
        this.mAttrAddtionArray[type] = value;//设置数值
        this.CalcAttrByType(AttrAddtionMapping[type]);//重计算
    }
    public IncreaseAttrAddtionByType(type:eAttrAddtionType,value:number):void{
        this.SetAttrAddtionByType(type,this.GetAttrAddtionByType(type) + value)
    }
}
  
export class BiologyAttrProxy extends BaseProxy{  
    static get ProxyName():string { return "BiologyAttrProxy" }; 
    private mBiologyAttrMap:Map<number,BiologyAttr> = new Map<number,BiologyAttr>();
    public AddBiology(biologyID:number){//添加一个角色
        //判断角色是否拥有BiologyBuffInfo信息
        let biologyBuffInfo:BiologyAttr|undefined = this.mBiologyAttrMap.get(biologyID);
        if(biologyBuffInfo != undefined)
            return;
        this.mBiologyAttrMap.set(biologyID,new BiologyAttr(biologyID));
    }
    public DelBiology(biologyID:number){//删除一个角色
        //判断角色是否拥有BiologyBuffInfo信息
        let biologyBuffInfo:BiologyAttr|undefined = this.mBiologyAttrMap.get(biologyID);
        if(biologyBuffInfo == undefined) return;
        this.mBiologyAttrMap.delete(biologyID);
    }

    //获取到一个角色属性
    public GetBiologyAttrInfo(biologyID:number):BiologyAttr|undefined{
        return this.mBiologyAttrMap.get(biologyID);
    }
    public GetBiologyAttrByType(biologyID:number,type:eAttrType):number{
        let biologyAttr:BiologyAttr|undefined = this.GetBiologyAttrInfo(biologyID);
        if(biologyAttr == undefined)
            return 0;
        return biologyAttr.GetAttrByType(type); 
    }
} 