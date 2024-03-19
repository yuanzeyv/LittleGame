import { AttrMappingMap, eAttrType, eBaseAttr } from "./BattleDefine";

export class AttrCell{
    //计算属性用数组
    private mAttrsCalcArray:Array<(()=>void)|undefined> = new Array<(()=>void)|undefined>();
    //玩家基础属性 与 增益属性数组
    private mOriginAttrArray:Array<number> = new Array<number>();//玩家本身的基础属性
    private mAddtionAttrArray:Array<number> = new Array<number>();//玩家通过各种增益效果获取到的Buff效果
    //玩家最终属性数组
    private mRealAttrArray:Array<number> = new Array<number>();//玩家的实际基础属性

    public constructor(){
        this.InitAttrCalcArray();//初始化属性计算数组
        this.ResetAttrs();
    }
    
    private InitAttrCalcArray(){ 
        this.mAttrsCalcArray[eAttrType.Attack ] = this.AttackCalcHandle ;//总攻击力 
        this.mAttrsCalcArray[eAttrType.Defense] = this.DefenseCalcHandle;//总防御力
        this.mAttrsCalcArray[eAttrType.HPLimit] = this.MaxHPCalcHandle  ;//最大生命值
        this.mAttrsCalcArray[eAttrType.Speed  ] = this.SpeedCalcHandle;//总速度
        this.mAttrsCalcArray[eAttrType.FinalHP] = this.NowLifeCalcHandle;//角色当前生命值
        this.mAttrsCalcArray[eAttrType.Final  ] = undefined;
    }

    public ResetAttrs():void{
        for(let i = 0 ; i < eBaseAttr.Final ; i++){
            this.mOriginAttrArray[i] = 0;
            this.mAddtionAttrArray[i] = 0;
        }   
    }
    
    public InitAttr(attrs:Array<{k:number,v:number}>){
        for(let cell of attrs)//将玩家的原始属性出入到数组
            this.mOriginAttrArray[cell.k] = cell.v; 
            
        for(let i = 0 ; i < eAttrType.Final ; i++ ){
            if(!this.mAttrsCalcArray[i])
                continue;
            this.mAttrsCalcArray[i]!.bind(this)();//运行计算方法
        }
        this.SetFinalAttr(eAttrType.FinalHP,this.GetFinalAttr(eAttrType.HPLimit));
    }

    public SetAddiAttr(attrType:eBaseAttr,value:number){
        this.mAddtionAttrArray[attrType] += value; 
        this.ReCalcAttrByType(attrType);
    }
    /*
    *玩家最终属性区域
    */
    public GetFinalAttr(attrType:eAttrType){
        return this.mRealAttrArray[attrType];
    }
    public SetFinalAttr(attrType:eAttrType,value:number){
        this.mRealAttrArray[attrType] = value;
    }
    /*
    *玩家基础属性区域
    */
    //获取到基础玩家属性
    public GetOriginAttr(attrType:eBaseAttr){
        return this.mOriginAttrArray[attrType];
    }
    //获取到附加玩家属性
    public GetAddiAttr(attrType:eBaseAttr){
        return this.mAddtionAttrArray[attrType];
    }
    //获取到附加玩家属性
    public GetSumAttr(attrType:eBaseAttr,isPercent:boolean = false){
        if(isPercent)
            return (this.mOriginAttrArray[attrType] + this.mAddtionAttrArray[attrType]) / 10000;
        return this.mOriginAttrArray[attrType] + this.mAddtionAttrArray[attrType];
    }
    /*
    *重新计算当前对应类型的属性数据
    */
    private ReCalcAttrByType(attrType:eBaseAttr):void{
        let triggerArr:eAttrType[] | undefined = AttrMappingMap.get(attrType);
        if(!triggerArr)
            return; 
        for(let cell of triggerArr){
            if(this.mAttrsCalcArray[cell] == undefined)
                return;
            this.mAttrsCalcArray[cell]!.bind(this)();//运行计算方法
        }
    } 
    /*
    *基础属性的计算函数区域
    */
    private AttackCalcHandle(){
        //真实攻击力的计算方法为  (基础攻击力 *(1 + 基础攻击力额外加成 )) * （1 + (最终伤害加成 ) ）
        this.mRealAttrArray[eAttrType.Attack] = (this.GetSumAttr(eBaseAttr.Attack) *( 1 + this.GetSumAttr(eBaseAttr.AttackPercent,true))) * ( 1 + this.GetSumAttr(eBaseAttr.AttackFinalPercent,true));
    } 
    private DefenseCalcHandle(){
        //真实防御力的计算方法为  (基础防御力 *(1 + 基础防御力额外加成)) * （1 + (最终防御加成 ) ）
        this.mRealAttrArray[eAttrType.Defense] = (this.GetSumAttr(eBaseAttr.Defense) *( 1 + this.GetSumAttr(eBaseAttr.DefensePercent,true))) * ( 1 + this.GetSumAttr(eBaseAttr.DefenseFinalPercent,true));
    }
    private MaxHPCalcHandle(){
        //真实最大生命值的计算方法为  (基础生命 *(1 + 基础生命额外加成)) * （1 + (最终生命加成 ) ）
        this.mRealAttrArray[eAttrType.HPLimit] = (this.GetSumAttr(eBaseAttr.Life) *( 1 + this.GetSumAttr(eBaseAttr.LifePercent,true))) * ( 1 + this.GetSumAttr(eBaseAttr.LifeFinalPercent,true));
        //设置当前血量重新刷新
    }
    private SpeedCalcHandle(){ 
        //真实速度的计算方法为  (基础速度 *(1 + 基础速度额外加成)) * （1 + (最终速度加成 ) ）
        this.mRealAttrArray[eAttrType.Speed] = (this.GetSumAttr(eBaseAttr.Speed) *( 1 + this.GetSumAttr(eBaseAttr.SpeedPercent,true))) * ( 1 + this.GetSumAttr(eBaseAttr.SpeedFinalPercent,true));
    }
    private NowLifeCalcHandle(){
    }
};  