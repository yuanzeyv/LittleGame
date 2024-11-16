import { Cfg_AttrCalcRelevance, IAttrCalcRelevanceStruct } from "../../../../Config/Cfg_AttrCalcRelevance";
import { eBaseAttrType, eFinalAttrType } from "./AttrType";
/*
*
*/
export class AttrObj{ 
    private static sBaseReleavanceArray:Array<number> = undefined;
    private mBaseAttrInfo:Map<eBaseAttrType,number> = new Map<eBaseAttrType,number>();//基础的属性信息
    private mFinalAttrInfo:Array<number> = new Array<number>();//经过计算后的最终属性信息
    constructor(){
        AttrObj.InitBaseRelevance();//尝试初始化一下全局变量
        this.Reset();
    } 

    Reset(): void {   
        this.mBaseAttrInfo.clear();
        Cfg_AttrCalcRelevance.GetDatas().forEach((cfg:IAttrCalcRelevanceStruct)=>this.mFinalAttrInfo[cfg.key] = 0);
    }
    
    private static InitBaseRelevance(){
        if(AttrObj.sBaseReleavanceArray != undefined)
            return;
        AttrObj.sBaseReleavanceArray = new Array<number>();
        for(let finalObj of Cfg_AttrCalcRelevance.GetDatas()){
            finalObj.fixed != -1 && (AttrObj.sBaseReleavanceArray[finalObj.fixed] = finalObj.key);
            finalObj.fixedPercent != -1 && (AttrObj.sBaseReleavanceArray[finalObj.fixedPercent] = finalObj.key);
            finalObj.sumPercent != -1 && (AttrObj.sBaseReleavanceArray[finalObj.sumPercent] = finalObj.key);
        }
    }
     
    //初始化属性
    public InitAttrs(attrs:Array<{K:number,V:number}>):void{
        for(let cell of attrs)
            this.AlterBaseAttr(cell.K,cell.V);
        this.SetFinalAttr(eFinalAttrType.HP,this.GetFinalAttr(eFinalAttrType.MaxHP));
    }

    //所有的修改都是增量更新 
    public AlterBaseAttr(attrType:eBaseAttrType,changeValue:number):boolean{
        if(changeValue == 0) 
            return false; 
        this.mBaseAttrInfo.set(attrType,this.GetBaseAttr(attrType) + changeValue); 
        return this.AttrCalc(attrType);//开始属性不需要采集到变动结果
    }

    //获取到某一个基础的属性值
    public GetBaseAttr(attrType:eBaseAttrType):number{
        return this.mBaseAttrInfo.get(attrType) || 0;//返回一个数值
    } 

    //获取到当前玩家的所有的基础属性信息
    public GetBaseAttrs():Readonly<Map<eBaseAttrType, number>>{
        return this.mBaseAttrInfo;
    }
 
    //获取某一个属性的最终属性
    public GetFinalAttr(attrType:eFinalAttrType):number{
        return this.mFinalAttrInfo[attrType];//最终属性一定有值
    }

    //直接设置某个最终属性 为固定值
    public SetFinalAttr(attrType:eFinalAttrType,value:number):void{
        this.mFinalAttrInfo[attrType] = value; 
    } 
    
    private AttrCalcHandle(bT:eBaseAttrType,pt:eBaseAttrType,fT:eBaseAttrType):number{
        let baseAttr:number = this.GetBaseAttr(bT);
        let percentAttr:number = this.GetBaseAttr(pt) / 100 + 1;// 除以基数
        let finalPercentAttr:number = this.GetBaseAttr(fT) / 100 + 1;
        return baseAttr * percentAttr * finalPercentAttr;
    }
    
    //如果属性发生了变动的话，返回为True
    public AttrCalc(baseAttrType:eBaseAttrType):boolean{ 
        let attrCalcObj:IAttrCalcRelevanceStruct |undefined = Cfg_AttrCalcRelevance.GetData(AttrObj.sBaseReleavanceArray[baseAttrType]);
        if(attrCalcObj == undefined)
            return false;
        let frontResult:number = this.mFinalAttrInfo[attrCalcObj.key];//获取到之前的值
        let afterResult:number = this.AttrCalcHandle(attrCalcObj.fixed,attrCalcObj.fixedPercent,attrCalcObj.sumPercent);//计算结果
        this.mFinalAttrInfo[attrCalcObj.key] = afterResult;//设置为最新的值
        return frontResult != afterResult;
    } 
    
    AlterHP(changeHP:number):boolean{
        this.mFinalAttrInfo[eFinalAttrType.HP] += changeHP;
        return this.mFinalAttrInfo[eFinalAttrType.HP] <= 0;//死亡了
    }
}   