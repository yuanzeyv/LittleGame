import { AttrObj, eBaseAttrType, eFinalAttrType } from "../Define/AttrType";
import Decimal from "decimal.js"
const CDivNum = new Decimal(10000);
type CCalcType = {base:eBaseAttrType,percent:eBaseAttrType,final:eBaseAttrType,finalType:eFinalAttrType}; 
export class AttrCalcBase{
    private mAttrCalcObjArray:Array<CCalcType> = new Array<CCalcType>();
    constructor(){
        this.InitAttrArray();
    }

    private AttrCalcHandle(attrObj:AttrObj,bT:eBaseAttrType,pt:eBaseAttrType,fT:eBaseAttrType,finalT:eFinalAttrType):Decimal{
        let baseAttr:Decimal = attrObj.mBaseAttrInfo[bT];
        let percentAttr:Decimal = attrObj.mBaseAttrInfo[pt].dividedBy(CDivNum).add("1");// 除以基数
        let finalPercentAttr:Decimal = attrObj.mBaseAttrInfo[fT].dividedBy(CDivNum).add("1");
        return baseAttr.mul(percentAttr).mul(finalPercentAttr);
    }
 
    public InitAttrArray(){
        //物理攻击力加成
        this.mAttrCalcObjArray[eBaseAttrType.B_PhysicalAttack]        = {base:eBaseAttrType.B_PhysicalAttack,percent:eBaseAttrType.P_PhysicalAttack,final:eBaseAttrType.F_PhysicalAttack,finalType:eFinalAttrType.PhysicalAttack };       
        this.mAttrCalcObjArray[eBaseAttrType.P_PhysicalAttack]        = {base:eBaseAttrType.B_PhysicalAttack,percent:eBaseAttrType.P_PhysicalAttack,final:eBaseAttrType.F_PhysicalAttack,finalType:eFinalAttrType.PhysicalAttack };       
        this.mAttrCalcObjArray[eBaseAttrType.F_PhysicalAttack]        = {base:eBaseAttrType.B_PhysicalAttack,percent:eBaseAttrType.P_PhysicalAttack,final:eBaseAttrType.F_PhysicalAttack,finalType:eFinalAttrType.PhysicalAttack };       
        //魔法攻击加成
        this.mAttrCalcObjArray[eBaseAttrType.B_MagicAttack]           = {base:eBaseAttrType.B_MagicAttack,percent:eBaseAttrType.P_MagicAttack ,final:eBaseAttrType.F_MagicAttack , finalType:eFinalAttrType.MagicAttack };          
        this.mAttrCalcObjArray[eBaseAttrType.P_MagicAttack]           = {base:eBaseAttrType.B_MagicAttack,percent:eBaseAttrType.P_MagicAttack ,final:eBaseAttrType.F_MagicAttack , finalType:eFinalAttrType.MagicAttack };          
        this.mAttrCalcObjArray[eBaseAttrType.F_MagicAttack]           = {base:eBaseAttrType.B_MagicAttack,percent:eBaseAttrType.P_MagicAttack ,final:eBaseAttrType.F_MagicAttack , finalType:eFinalAttrType.MagicAttack };  
        //物理防御力        
        this.mAttrCalcObjArray[eBaseAttrType.B_PhysicalDefence]       = {base:eBaseAttrType.B_PhysicalDefence,percent:eBaseAttrType.P_PhysicalDefence,final:eBaseAttrType.F_PhysicalDefence, finalType:eFinalAttrType.PhysicalDefence };       
        this.mAttrCalcObjArray[eBaseAttrType.P_PhysicalDefence]       = {base:eBaseAttrType.B_PhysicalDefence,percent:eBaseAttrType.P_PhysicalDefence,final:eBaseAttrType.F_PhysicalDefence, finalType:eFinalAttrType.PhysicalDefence };      
        this.mAttrCalcObjArray[eBaseAttrType.F_PhysicalDefence]       = {base:eBaseAttrType.B_PhysicalDefence,percent:eBaseAttrType.P_PhysicalDefence,final:eBaseAttrType.F_PhysicalDefence, finalType:eFinalAttrType.PhysicalDefence };  
        //魔法防御力    
        this.mAttrCalcObjArray[eBaseAttrType.B_MagicDefence]          = {base:eBaseAttrType.B_MagicDefence,percent:eBaseAttrType.P_MagicDefence,final:eBaseAttrType.F_MagicDefence, finalType:eFinalAttrType.MagicDefence };         
        this.mAttrCalcObjArray[eBaseAttrType.P_MagicDefence]          = {base:eBaseAttrType.B_MagicDefence,percent:eBaseAttrType.P_MagicDefence,final:eBaseAttrType.F_MagicDefence, finalType:eFinalAttrType.MagicDefence };         
        this.mAttrCalcObjArray[eBaseAttrType.F_MagicDefence]          = {base:eBaseAttrType.B_MagicDefence,percent:eBaseAttrType.P_MagicDefence,final:eBaseAttrType.F_MagicDefence, finalType:eFinalAttrType.MagicDefence };  
        //护甲穿透       
        this.mAttrCalcObjArray[eBaseAttrType.B_DefencePenetrate]      = {base:eBaseAttrType.B_DefencePenetrate,percent:eBaseAttrType.P_DefencePenetrate ,final:eBaseAttrType.F_DefencePenetrate  , finalType:eFinalAttrType.DefencePenetrate };     
        this.mAttrCalcObjArray[eBaseAttrType.P_DefencePenetrate]      = {base:eBaseAttrType.B_DefencePenetrate,percent:eBaseAttrType.P_DefencePenetrate ,final:eBaseAttrType.F_DefencePenetrate  , finalType:eFinalAttrType.DefencePenetrate };     
        this.mAttrCalcObjArray[eBaseAttrType.F_DefencePenetrate]      = {base:eBaseAttrType.B_DefencePenetrate,percent:eBaseAttrType.P_DefencePenetrate ,final:eBaseAttrType.F_DefencePenetrate  , finalType:eFinalAttrType.DefencePenetrate };     
        //魔抗穿透
        this.mAttrCalcObjArray[eBaseAttrType.B_MagicDefencePenetrate] = {base:eBaseAttrType.B_MagicDefencePenetrate,percent:eBaseAttrType.P_MagicDefencePenetrate,final:eBaseAttrType.F_MagicDefencePenetrate , finalType:eFinalAttrType.MagicDefencePenetrate };
        this.mAttrCalcObjArray[eBaseAttrType.P_MagicDefencePenetrate] = {base:eBaseAttrType.B_MagicDefencePenetrate,percent:eBaseAttrType.P_MagicDefencePenetrate,final:eBaseAttrType.F_MagicDefencePenetrate , finalType:eFinalAttrType.MagicDefencePenetrate };
        this.mAttrCalcObjArray[eBaseAttrType.F_MagicDefencePenetrate] = {base:eBaseAttrType.B_MagicDefencePenetrate,percent:eBaseAttrType.P_MagicDefencePenetrate,final:eBaseAttrType.F_MagicDefencePenetrate , finalType:eFinalAttrType.MagicDefencePenetrate };
         //减伤属性
        this.mAttrCalcObjArray[eBaseAttrType.B_DamageReduction]       = {base:eBaseAttrType.B_DamageReduction,percent:eBaseAttrType.P_DamageReduction,final:eBaseAttrType.F_DamageReduction , finalType:eFinalAttrType.DamageReduction };     
        this.mAttrCalcObjArray[eBaseAttrType.P_DamageReduction]       = {base:eBaseAttrType.B_DamageReduction,percent:eBaseAttrType.P_DamageReduction,final:eBaseAttrType.F_DamageReduction , finalType:eFinalAttrType.DamageReduction };      
        this.mAttrCalcObjArray[eBaseAttrType.F_DamageReduction]       = {base:eBaseAttrType.B_DamageReduction,percent:eBaseAttrType.P_DamageReduction,final:eBaseAttrType.F_DamageReduction , finalType:eFinalAttrType.DamageReduction };  
        //增伤属性    
        this.mAttrCalcObjArray[eBaseAttrType.B_DamageBoost]           = {base:eBaseAttrType.B_DamageBoost,percent:eBaseAttrType.P_DamageBoost,final:eBaseAttrType.F_DamageBoost , finalType:eFinalAttrType.DamageBoost };          
        this.mAttrCalcObjArray[eBaseAttrType.P_DamageBoost]           = {base:eBaseAttrType.B_DamageBoost,percent:eBaseAttrType.P_DamageBoost,final:eBaseAttrType.F_DamageBoost , finalType:eFinalAttrType.DamageBoost };          
        this.mAttrCalcObjArray[eBaseAttrType.F_DamageBoost]           = {base:eBaseAttrType.B_DamageBoost,percent:eBaseAttrType.P_DamageBoost,final:eBaseAttrType.F_DamageBoost , finalType:eFinalAttrType.DamageBoost };  
        //爆伤抵抗         
        this.mAttrCalcObjArray[eBaseAttrType.B_CriticalResistDamage]  = {base:eBaseAttrType.B_CriticalResistDamage,percent:eBaseAttrType.P_CriticalResistDamage,final:eBaseAttrType.F_CriticalResistDamage, finalType:eFinalAttrType.CriticalResistDamage }; 
        this.mAttrCalcObjArray[eBaseAttrType.P_CriticalResistDamage]  = {base:eBaseAttrType.B_CriticalResistDamage,percent:eBaseAttrType.P_CriticalResistDamage,final:eBaseAttrType.F_CriticalResistDamage, finalType:eFinalAttrType.CriticalResistDamage }; 
        this.mAttrCalcObjArray[eBaseAttrType.F_CriticalResistDamage]  = {base:eBaseAttrType.B_CriticalResistDamage,percent:eBaseAttrType.P_CriticalResistDamage,final:eBaseAttrType.F_CriticalResistDamage, finalType:eFinalAttrType.CriticalResistDamage }; 
        //爆伤加成
        this.mAttrCalcObjArray[eBaseAttrType.B_CriticalAddtionDamage] = {base:eBaseAttrType.B_CriticalAddtionDamage,percent:eBaseAttrType.P_CriticalAddtionDamage ,final:eBaseAttrType.F_CriticalAddtionDamage  , finalType:eFinalAttrType.CriticalAddtionDamage};
        this.mAttrCalcObjArray[eBaseAttrType.P_CriticalAddtionDamage] = {base:eBaseAttrType.B_CriticalAddtionDamage,percent:eBaseAttrType.P_CriticalAddtionDamage ,final:eBaseAttrType.F_CriticalAddtionDamage  , finalType:eFinalAttrType.CriticalAddtionDamage};
        this.mAttrCalcObjArray[eBaseAttrType.F_CriticalAddtionDamage] = {base:eBaseAttrType.B_CriticalAddtionDamage,percent:eBaseAttrType.P_CriticalAddtionDamage ,final:eBaseAttrType.F_CriticalAddtionDamage  , finalType:eFinalAttrType.CriticalAddtionDamage};
        //玩家的体型大小
        this.mAttrCalcObjArray[eBaseAttrType.B_BodySize]              = {base:eBaseAttrType.B_BodySize,percent:eBaseAttrType.P_BodySize ,final:eBaseAttrType.F_BodySize ,finalType:eFinalAttrType.BodySize };            
        this.mAttrCalcObjArray[eBaseAttrType.P_BodySize]              = {base:eBaseAttrType.B_BodySize,percent:eBaseAttrType.P_BodySize ,final:eBaseAttrType.F_BodySize ,finalType:eFinalAttrType.BodySize };             
        this.mAttrCalcObjArray[eBaseAttrType.F_BodySize]              = {base:eBaseAttrType.B_BodySize,percent:eBaseAttrType.P_BodySize ,final:eBaseAttrType.F_BodySize ,finalType:eFinalAttrType.BodySize };  
        //玩家的移动速度           
        this.mAttrCalcObjArray[eBaseAttrType.B_MoveSpeed]             = {base:eBaseAttrType.B_MoveSpeed,percent:eBaseAttrType.P_MoveSpeed,final:eBaseAttrType.F_MoveSpeed, finalType:eFinalAttrType.MoveSpeed };            
        this.mAttrCalcObjArray[eBaseAttrType.P_MoveSpeed]             = {base:eBaseAttrType.B_MoveSpeed,percent:eBaseAttrType.P_MoveSpeed,final:eBaseAttrType.F_MoveSpeed, finalType:eFinalAttrType.MoveSpeed };            
        this.mAttrCalcObjArray[eBaseAttrType.F_MoveSpeed]             = {base:eBaseAttrType.B_MoveSpeed,percent:eBaseAttrType.P_MoveSpeed,final:eBaseAttrType.F_MoveSpeed, finalType:eFinalAttrType.MoveSpeed }; 
        //玩家的攻击速度           
        this.mAttrCalcObjArray[eBaseAttrType.B_AttackSpeed]           = {base:eBaseAttrType.B_AttackSpeed,percent:eBaseAttrType.P_AttackSpeed,final:eBaseAttrType.F_AttackSpeed,finalType:eFinalAttrType.AttackSpeed };          
        this.mAttrCalcObjArray[eBaseAttrType.P_AttackSpeed]           = {base:eBaseAttrType.B_AttackSpeed,percent:eBaseAttrType.P_AttackSpeed,final:eBaseAttrType.F_AttackSpeed,finalType:eFinalAttrType.AttackSpeed };          
        this.mAttrCalcObjArray[eBaseAttrType.F_AttackSpeed]           = {base:eBaseAttrType.B_AttackSpeed,percent:eBaseAttrType.P_AttackSpeed,final:eBaseAttrType.F_AttackSpeed,finalType:eFinalAttrType.AttackSpeed };     
        //玩家的暴击几率     percent:
        this.mAttrCalcObjArray[eBaseAttrType.B_CriticalRate]          = {base:eBaseAttrType.B_CriticalRate,percent:eBaseAttrType.P_CriticalRate,final:eBaseAttrType.F_CriticalRate , finalType:eFinalAttrType.CriticalRate };          
        this.mAttrCalcObjArray[eBaseAttrType.P_CriticalRate]          = {base:eBaseAttrType.B_CriticalRate,percent:eBaseAttrType.P_CriticalRate,final:eBaseAttrType.F_CriticalRate , finalType:eFinalAttrType.CriticalRate };         
        this.mAttrCalcObjArray[eBaseAttrType.F_CriticalRate]          = {base:eBaseAttrType.B_CriticalRate,percent:eBaseAttrType.P_CriticalRate,final:eBaseAttrType.F_CriticalRate , finalType:eFinalAttrType.CriticalRate };  
         //玩家的抗暴击几率       
        this.mAttrCalcObjArray[eBaseAttrType.B_ResistCirticalRate]    = {base:eBaseAttrType.B_ResistCirticalRate,percent:eBaseAttrType.P_ResistCirticalRate ,final:eBaseAttrType.F_ResistCirticalRate , finalType:eFinalAttrType.ResistCirticalRate };  
        this.mAttrCalcObjArray[eBaseAttrType.P_ResistCirticalRate]    = {base:eBaseAttrType.B_ResistCirticalRate,percent:eBaseAttrType.P_ResistCirticalRate ,final:eBaseAttrType.F_ResistCirticalRate , finalType:eFinalAttrType.ResistCirticalRate };   
        this.mAttrCalcObjArray[eBaseAttrType.F_ResistCirticalRate]    = {base:eBaseAttrType.B_ResistCirticalRate,percent:eBaseAttrType.P_ResistCirticalRate ,final:eBaseAttrType.F_ResistCirticalRate , finalType:eFinalAttrType.ResistCirticalRate };   
        //玩家的命中几率
        this.mAttrCalcObjArray[eBaseAttrType.B_HitRate]               = {base:eBaseAttrType.B_HitRate,percent:eBaseAttrType.P_HitRate,final:eBaseAttrType.F_HitRate, finalType:eFinalAttrType.HitRate };              
        this.mAttrCalcObjArray[eBaseAttrType.P_HitRate]               = {base:eBaseAttrType.B_HitRate,percent:eBaseAttrType.P_HitRate,final:eBaseAttrType.F_HitRate, finalType:eFinalAttrType.HitRate };              
        this.mAttrCalcObjArray[eBaseAttrType.F_HitRate]               = {base:eBaseAttrType.B_HitRate,percent:eBaseAttrType.P_HitRate,final:eBaseAttrType.F_HitRate, finalType:eFinalAttrType.HitRate };  
        //玩家的闪避几率            
        this.mAttrCalcObjArray[eBaseAttrType.B_MissRate]              = {base:eBaseAttrType.B_MissRate,percent:eBaseAttrType.P_MissRate ,final:eBaseAttrType.F_MissRate  , finalType:eFinalAttrType.MissRate };             
        this.mAttrCalcObjArray[eBaseAttrType.P_MissRate]              = {base:eBaseAttrType.B_MissRate,percent:eBaseAttrType.P_MissRate ,final:eBaseAttrType.F_MissRate  , finalType:eFinalAttrType.MissRate };             
        this.mAttrCalcObjArray[eBaseAttrType.F_MissRate]              = {base:eBaseAttrType.B_MissRate,percent:eBaseAttrType.P_MissRate ,final:eBaseAttrType.F_MissRate  , finalType:eFinalAttrType.MissRate };   
        //玩家的护盾回复          
        this.mAttrCalcObjArray[eBaseAttrType.B_ShieldReply]           = {base:eBaseAttrType.B_ShieldReply,percent:eBaseAttrType.P_ShieldReply ,final:eBaseAttrType.F_ShieldReply , finalType:eFinalAttrType.ShieldReply };          
        this.mAttrCalcObjArray[eBaseAttrType.P_ShieldReply]           = {base:eBaseAttrType.B_ShieldReply,percent:eBaseAttrType.P_ShieldReply ,final:eBaseAttrType.F_ShieldReply , finalType:eFinalAttrType.ShieldReply };          
        this.mAttrCalcObjArray[eBaseAttrType.F_ShieldReply]           = {base:eBaseAttrType.B_ShieldReply,percent:eBaseAttrType.P_ShieldReply ,final:eBaseAttrType.F_ShieldReply , finalType:eFinalAttrType.ShieldReply };    
         //玩家的血量回复      
        this.mAttrCalcObjArray[eBaseAttrType.B_HPReply]               = {base:eBaseAttrType.B_HPReply,percent:eBaseAttrType.P_HPReply ,final:eBaseAttrType.F_HPReply , finalType:eFinalAttrType.HPReply};           
        this.mAttrCalcObjArray[eBaseAttrType.P_HPReply]               = {base:eBaseAttrType.B_HPReply,percent:eBaseAttrType.P_HPReply ,final:eBaseAttrType.F_HPReply , finalType:eFinalAttrType.HPReply};            
        this.mAttrCalcObjArray[eBaseAttrType.F_HPReply]               = {base:eBaseAttrType.B_HPReply,percent:eBaseAttrType.P_HPReply ,final:eBaseAttrType.F_HPReply , finalType:eFinalAttrType.HPReply};  
        //玩家的最大护盾           
        this.mAttrCalcObjArray[eBaseAttrType.B_MaxShield]             = {base:eBaseAttrType.B_MaxShield,percent:eBaseAttrType.P_MaxShield ,final:eBaseAttrType.F_MaxShield , finalType:eFinalAttrType.MaxShield};            
        this.mAttrCalcObjArray[eBaseAttrType.P_MaxShield]             = {base:eBaseAttrType.B_MaxShield,percent:eBaseAttrType.P_MaxShield ,final:eBaseAttrType.F_MaxShield , finalType:eFinalAttrType.MaxShield};            
        this.mAttrCalcObjArray[eBaseAttrType.F_MaxShield]             = {base:eBaseAttrType.B_MaxShield,percent:eBaseAttrType.P_MaxShield ,final:eBaseAttrType.F_MaxShield , finalType:eFinalAttrType.MaxShield};            
        //玩家的最大血量
        this.mAttrCalcObjArray[eBaseAttrType.B_MaxHP]                 = {base:eBaseAttrType.B_MaxHP,percent:eBaseAttrType.P_MaxHP,final:eBaseAttrType.F_MaxHP, finalType:eFinalAttrType.MaxHP };                
        this.mAttrCalcObjArray[eBaseAttrType.P_MaxHP]                 = {base:eBaseAttrType.B_MaxHP,percent:eBaseAttrType.P_MaxHP,final:eBaseAttrType.F_MaxHP, finalType:eFinalAttrType.MaxHP };                
        this.mAttrCalcObjArray[eBaseAttrType.F_MaxHP]                 = {base:eBaseAttrType.B_MaxHP,percent:eBaseAttrType.P_MaxHP,final:eBaseAttrType.F_MaxHP, finalType:eFinalAttrType.MaxHP };   
    }
 
    //如果属性发生了变动的话，返回为True
    public AttrCalc(attrObj:AttrObj,baseAttrType:eBaseAttrType):boolean{
        let attrCalcObj:CCalcType|undefined = this.mAttrCalcObjArray[baseAttrType];
        if(attrCalcObj == undefined)
            return false;
        let frontResult:Decimal = attrObj.mFinalAttrInfo[attrCalcObj.finalType];
        let afterResult:Decimal = this.AttrCalcHandle(attrObj,attrCalcObj.base,attrCalcObj.percent,attrCalcObj.final,attrCalcObj.finalType)
        attrObj.mFinalAttrInfo[attrCalcObj.finalType] = afterResult;
        return frontResult.equals(afterResult)
    }
}