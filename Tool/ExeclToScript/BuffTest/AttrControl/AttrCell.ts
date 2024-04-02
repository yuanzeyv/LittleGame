import { eCampType } from "../BattleSimulation/Define/BattleDefine";
import { RecordAttrUpdate, eRecordType } from "../BattleSimulation/Define/RecordDefine";
import { BattleCommunicantProxy } from "../Communicant/BattleCommunicant";
import { eNotifyType } from "../Communicant/Define/Define";
import { eAttrType, AttrMappingMap } from "./Define/AttrDefine";
export class AttrCell{
    private mBattleCommunicantID:number;//战斗通知模块
    //当前的阵营数据信息 
    private mCampType:eCampType;
    //计算属性用数组
    private mAttrsCalcObj:{[key:number]:()=>void} = {}
    //玩家的所有属性计算信息
    private mAttrArray:Array<number> = new Array<number>();//玩家本身的基础属性

    public constructor(campType:eCampType,commID:number){
        this.mBattleCommunicantID = commID;
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
        this.mAttrArray[eAttrType.SumFinalHP] = this.mAttrArray[eAttrType.SumHPLimit];
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
            let changeFront:number = this.GetAttr(cell);
            this.mAttrsCalcObj[cell]!.bind(this)();//运行计算方法
            let changeAfter:number = this.GetAttr(cell);
            //存在变动时
            if(changeFront != changeAfter){
                let recordAttrUpdate:RecordAttrUpdate = {Camp: this.mCampType,AttrKey:cell,AttrValue:changeAfter,RecordType: eRecordType.AttrUpdate,AttrChangeValue:changeAfter - changeFront};
                BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,recordAttrUpdate);
            }
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
        this.mAttrsCalcObj[eAttrType.SumMiss  ] = this.MissCalcHandle;//总闪避  
        this.mAttrsCalcObj[eAttrType.SumResistanceMiss  ] = this.ResistanceMissCalcHandle;//总抗闪避  
        this.mAttrsCalcObj[eAttrType.SumAttackContinue  ] = this.AttackContinueCalcHandle;//总连击  
        this.mAttrsCalcObj[eAttrType.SumResistanceAttackContinue  ] = this.ResistanceAttackContinueCalcHandle;//总抗连击
        this.mAttrsCalcObj[eAttrType.SumCircle  ] = this.CirclePercentHandle;//总暴击  
        this.mAttrsCalcObj[eAttrType.SumResistancCircle  ] = this.ResistancCirclePercentHandle;//总抗暴击
        this.mAttrsCalcObj[eAttrType.SumAttackBack  ] = this.AttackBackCalcHandle;//总暴击  
        this.mAttrsCalcObj[eAttrType.SumResistanceAttackBack  ] = this.ResistancAttackBackCalcHandle;//总抗暴击
        this.mAttrsCalcObj[eAttrType.SumCircleDamage  ] = this.CircleDamageHandle;//爆伤加成
        this.mAttrsCalcObj[eAttrType.SumResistanceCircleDamage  ] = this.ResistancCircleDamageHandle;//抗爆伤加成
        this.mAttrsCalcObj[eAttrType.SumSuckBlood  ] = this.SuckBloodCalcHandle;//吸血
        this.mAttrsCalcObj[eAttrType.SumResistanceSuckBlood  ] = this.ResistanceSuckBloodCalcHandle;//抗吸血加成
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

    private MissCalcHandle(){ 
        //真实速度的计算方法为  (基础速度 *(1 + 基础速度额外加成)) * （1 + (最终速度加成 ) ）
        this.mAttrArray[eAttrType.SumMiss] = (this.GetAttr(eAttrType.Miss) *( 1 + this.GetAttr(eAttrType.MissPercent,true))) * ( 1 + this.GetAttr(eAttrType.MissFinalPercent,true));
    } 

    private ResistanceMissCalcHandle(){ 
        //真实速度的计算方法为  (基础速度 *(1 + 基础速度额外加成)) * （1 + (最终速度加成 ) ）
        this.mAttrArray[eAttrType.SumSpeed] = (this.GetAttr(eAttrType.Speed) *( 1 + this.GetAttr(eAttrType.SpeedPercent,true))) * ( 1 + this.GetAttr(eAttrType.SpeedFinalPercent,true));
    } 

    /********
     * 连击 抗连击 区域
    ********/
    private AttackContinueCalcHandle(){ 
        this.mAttrArray[eAttrType.SumAttackContinue] = (this.GetAttr(eAttrType.AttackContinue) *( 1 + this.GetAttr(eAttrType.AttackContinuePercent,true))) * ( 1 + this.GetAttr(eAttrType.AttackContinueFinalPercent,true));
    } 

    private ResistanceAttackContinueCalcHandle(){ 
        this.mAttrArray[eAttrType.SumResistanceAttackContinue] = (this.GetAttr(eAttrType.ResistanceAttackContinue) *( 1 + this.GetAttr(eAttrType.ResistanceAttackContinuePercent,true))) * ( 1 + this.GetAttr(eAttrType.ResistanceAttackContinueFinalPercent,true));
    } 


    /********
     * 暴击 抗暴击 区域
    ********/
    private CirclePercentHandle(){ 
        this.mAttrArray[eAttrType.SumCircle] = (this.GetAttr(eAttrType.Circle) *( 1 + this.GetAttr(eAttrType.CirclePercent,true))) * ( 1 + this.GetAttr(eAttrType.CircleFinalPercent,true));
    } 

    private ResistancCirclePercentHandle(){ 
        this.mAttrArray[eAttrType.SumResistancCircle] = (this.GetAttr(eAttrType.ResistanceCircle) *( 1 + this.GetAttr(eAttrType.ResistanceCircleDamagePercent,true))) * ( 1 + this.GetAttr(eAttrType.ResistanceCircleDamageFinalPercent,true));
    } 

    /*******
     * 反击 抗反击 区域
    ********/
    private AttackBackCalcHandle(){ 
        this.mAttrArray[eAttrType.SumAttackBack] = (this.GetAttr(eAttrType.AttackBack) *( 1 + this.GetAttr(eAttrType.AttackBackPercent,true))) * ( 1 + this.GetAttr(eAttrType.AttackBackFinalPercent,true));
    } 

    private ResistancAttackBackCalcHandle(){ 
        this.mAttrArray[eAttrType.SumResistanceAttackBack] = (this.GetAttr(eAttrType.ResistanceAttackBack) *( 1 + this.GetAttr(eAttrType.ResistanceAttackBackPercent,true))) * ( 1 + this.GetAttr(eAttrType.ResistanceAttackBackFinalPercent,true));
    } 
 
    /*******
     * 暴伤 抗爆伤 区域
    ********/
    private CircleDamageHandle(){ 
        this.mAttrArray[eAttrType.SumCircleDamage] = (this.GetAttr(eAttrType.CircleDamage) *( 1 + this.GetAttr(eAttrType.CircleDamagePercent,true))) * ( 1 + this.GetAttr(eAttrType.CircleDamageFinalPercent,true));
    } 

    private ResistancCircleDamageHandle(){ 
        this.mAttrArray[eAttrType.SumResistanceCircleDamage] = (this.GetAttr(eAttrType.ResistanceCircleDamage) *( 1 + this.GetAttr(eAttrType.ResistanceCircleDamagePercent,true))) * ( 1 + this.GetAttr(eAttrType.ResistanceCircleDamageFinalPercent,true));
    } 

    /*******
     * 吸血 抗吸血 区域
    ********/
    private SuckBloodCalcHandle(){ 
        this.mAttrArray[eAttrType.SumSuckBlood] = (this.GetAttr(eAttrType.SuckBlood) *( 1 + this.GetAttr(eAttrType.SuckBloodPercent,true))) * ( 1 + this.GetAttr(eAttrType.SuckBloodFinalPercent,true));
    } 

    private ResistanceSuckBloodCalcHandle(){ 
        this.mAttrArray[eAttrType.SumResistanceSuckBlood] = (this.GetAttr(eAttrType.ResistanceSuckBlood) *( 1 + this.GetAttr(eAttrType.ResistanceSuckBloodPercent,true))) * ( 1 + this.GetAttr(eAttrType.ResistanceSuckBloodFinalPercent,true));
    } 
};    