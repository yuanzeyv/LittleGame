import { AttrObj, eBaseAttrType, eFinalAttrType } from "../Define/AttrType";
import Decimal from "decimal.js"
import { AttrCalcBase } from "./AttrCalcBase";
export class AttrCalc implements AttrObj{
    public mBaseAttrInfo: Decimal[] = new Array<Decimal>();//玩家的基础属性
    public mFinalAttrInfo: Decimal[] = new Array<Decimal>();//玩家的最终属性
    public mAttrCalcBase:AttrCalcBase;//玩家的属性对象信息
    constructor(){
        this.ResetAttrArray();
        this.mAttrCalcBase = new AttrCalcBase();
    }

    public ResetAttrArray(){
        for(let cell in eBaseAttrType){
            let key:number = Number(cell);
            if(isNaN(key))
                continue;
            this.mBaseAttrInfo[key] = new Decimal(0);
        }
        for(let cell in eFinalAttrType){
            let key:number = Number(cell);
            if(isNaN(key))
                continue;
            this.mFinalAttrInfo[key] = new Decimal(0);
        }
    }  
    //尝试修改角色的基础属性信息
    //所有的修改都是增量更新
    public AlterBaseAttr(attrType:eBaseAttrType,value:number):boolean{
        if(value == 0)
            return false;
        this.mBaseAttrInfo[attrType] = this.mBaseAttrInfo[attrType].add(value);
        this.mAttrCalcBase.AttrCalc(this,attrType);//开始属性不需要采集到变动结果
    }

    //获取到某一个基础的属性值
    public GetBaseAttr(attrType:eBaseAttrType):Decimal{
        return this.mBaseAttrInfo[attrType];  
    }
 
    //获取某一个属性的最终属性
    public GetFinalAttr(attrType:eFinalAttrType):Decimal{
        return this.mFinalAttrInfo[attrType];
    }

    //获取某一个属性的最终属性
    public SetFinalAttr(attrType:eFinalAttrType,value:Decimal):void{
        this.mFinalAttrInfo[attrType] = new Decimal(value);
    }
}  