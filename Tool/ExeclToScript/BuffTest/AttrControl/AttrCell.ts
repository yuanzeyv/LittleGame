import { eCampType } from "../BattleSimulation/Define/BattleDefine";
import { RecordAttrUpdate, RecordBase, eRecordType } from "../BattleSimulation/Define/RecordDefine";
import { battleSimulation } from "../Main";
import { eAttrType, AttrMappingMap } from "./Define/AttrDefine";
export class AttrCell{
    //当前的阵营数据信息
    private mCampType:eCampType;
    //计算属性用数组
    private mAttrsCalcObj:{[key:number]:()=>void} = {}
    //玩家的所有属性计算信息
    private mAttrArray:Array<number> = new Array<number>();//玩家本身的基础属性

    public constructor(campType:eCampType){
        this.mCampType = campType;
        this.InitAttrCalcArray();//初始化属性计算数组
        this.ResetAttrs();
    } 
    public ResetAttrs():void{
        for(let key in eAttrType){
            if(undefined == Number(key))
                continue;
            this.mAttrArray[key] = 0;
        }
    }
    
    public InitAttr(attrs:Array<{k:number,v:number}>):void{
        for(let cell of attrs)//将玩家的原始属性出入到数组
            this.mAttrArray[cell.k] = cell.v;  
        for(let key in this.mAttrsCalcObj)
            this.mAttrsCalcObj[key].bind(this)();  
        this.mAttrsCalcObj[eAttrType.SumFinalHP] = this.mAttrsCalcObj[eAttrType.SumHPLimit];
    } 
    /*
    *获取到玩家的完整属性KV表
    */
    public GetAttrTable():{[key:number]:number}{
        let ret:{[key:number]:number} = {};
        for(let index in this.mAttrArray){
            if( !this.mAttrArray[index] )
                continue;
            ret[index] = this.mAttrArray[index];
        }
        return ret;
    } 
    /*
    *玩家属性信息
    */
    public GetAttr(attrType:eAttrType,isPercent:boolean = false){
        return this.mAttrArray[attrType] / (isPercent ? 10000: 1);
    } 

    public SetAttr(attrType:eAttrType,value:number){
        this.mAttrArray[attrType] = value; 
        battleSimulation.PushBattleRecord<RecordAttrUpdate>({Camp: this.mCampType,AttrKey: attrType,AttrValue:this.GetAttr(attrType),RecordType: eRecordType.AttrUpdate,});
        this.ReCalcAttrByType(attrType);
    }  

    /*
    *重新计算当前对应类型的属性数据
    */
    private ReCalcAttrByType(attrType:eAttrType):void{
        let triggerArr:eAttrType[] | undefined = AttrMappingMap.get(attrType);
        if(!triggerArr)
            return; 
        for(let cell of triggerArr){
            if(this.mAttrsCalcObj[cell] == undefined)
                return;
            this.mAttrsCalcObj[cell]!.bind(this)();//运行计算方法
            battleSimulation.PushBattleRecord<RecordAttrUpdate>({Camp: this.mCampType,AttrKey: attrType,AttrValue:this.GetAttr(cell),RecordType: eRecordType.AttrUpdate,});
        }
    } 
    /*
    *基础属性的计算函数区域
    */
    private InitAttrCalcArray(){  
        this.mAttrsCalcObj[eAttrType.SumAttack ] = this.AttackCalcHandle ;//总攻击力 
        this.mAttrsCalcObj[eAttrType.SumDefense] = this.DefenseCalcHandle;//总防御力
        this.mAttrsCalcObj[eAttrType.SumHPLimit] = this.MaxHPCalcHandle  ;//最大生命值
        this.mAttrsCalcObj[eAttrType.SumSpeed  ] = this.SpeedCalcHandle;//总速度  
    }

    private AttackCalcHandle(){
        //真实攻击力的计算方法为  (基础攻击力 *(1 + 基础攻击力额外加成 )) * （1 + (最终伤害加成 ) ） 
        this.mAttrArray[eAttrType.SumAttack] = (this.GetAttr(eAttrType.Attack) *( 1 + this.GetAttr(eAttrType.AttackPercent,true))) * ( 1 + this.GetAttr(eAttrType.AttackFinalPercent,true));
    } 

    private DefenseCalcHandle(){
        //真实防御力的计算方法为  (基础防御力 *(1 + 基础防御力额外加成)) * （1 + (最终防御加成 ) ）
        this.mAttrArray[eAttrType.SumDefense] = (this.GetAttr(eAttrType.Defense) *( 1 + this.GetAttr(eAttrType.DefensePercent,true))) * ( 1 + this.GetAttr(eAttrType.DefenseFinalPercent,true));
    }
    
    private MaxHPCalcHandle(){
        //真实最大生命值的计算方法为  (基础生命 *(1 + 基础生命额外加成)) * （1 + (最终生命加成 ) ）  
        this.mAttrArray[eAttrType.SumHPLimit] = (this.GetAttr(eAttrType.Life) *( 1 + this.GetAttr(eAttrType.LifePercent,true))) * ( 1 + this.GetAttr(eAttrType.LifeFinalPercent,true)); 
    }

    private SpeedCalcHandle(){ 
        //真实速度的计算方法为  (基础速度 *(1 + 基础速度额外加成)) * （1 + (最终速度加成 ) ）
        this.mAttrArray[eAttrType.SumSpeed] = (this.GetAttr(eAttrType.Speed) *( 1 + this.GetAttr(eAttrType.SpeedPercent,true))) * ( 1 + this.GetAttr(eAttrType.SpeedFinalPercent,true));
    } 
};  