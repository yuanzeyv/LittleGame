import { net } from "electron";

export enum eAttrType{
    HP = 1,	//生命
    HP_PERCENT   = 2,	//生命万分比
    HP_SUM_PERCENT = 3,	//生命总万分比
    ATT = 4,	//攻击力
    ATT_PERCENT = 5,	//攻击万分比
    ATT_SUM_PERCENT = 6,	//攻击总万分比
    DEF = 7,	//防御
    DEF_PERCENT = 8,	//防御万分比
    DEF_SUM_PERCENT = 9,	//防御总万分比
    SPE = 10,	//速度
    SPE_PERCENT = 11,	//速度万分比
    SPE_SUM_PERCENT = 12,	//速度总万分比
    SUCK = 13,	//吸血
    SUCK_PERCENT = 14,	//吸血万分比
    SUCK_SUM_PERCENT = 15,	//吸血总万分比
    BACK_ATT = 16,	//反击
    BACK_ATT_PERCENT = 17,	//反击万分比
    BACK_ATT_SUM_PERCENT = 18,	//反击总万分比
    CONTI_ATT = 19,	//连接
    CONTI_ATT_PERCENT = 20,	//连接万分比
    CONTI_ATT_SUM_PERCENT = 21,	//连接总万分比
    DEADLY_ADD = 22,	//爆伤
    DEADLY_ADD_PERCENT = 23,	//爆伤万分比
    DEADLY_ADD_SUM_PERCENT = 24,	//爆伤总万分比
    MISS = 25,	//闪避
    MISS_PERCENT = 26,	//闪避万分比
    MISS_SUM_PERCENT = 27,	//闪避总万分比
    CRITICAL = 28,	//暴击
    CRITICAL_PERCENT = 29,	//暴击万分比
    CRITICAL_SUM_PERCENT = 30,	//暴击总万分比
    STUN = 31,	//击晕
    STUN_PERCENT = 32,	//击晕万分比
    STUN_SUM_PERCENT = 33,	//击晕总万分比
    FINAL_ATT = 34,	//最终伤害
    FINAL_ATT_PERCENT = 35,	//最终伤害万分比
    FINAL_ATT_SUM_PERCENT = 36,	//最终伤害总万分比
    RESIST_SUCK = 37,	//抗吸血
    RESIST_SUCK_PERCENT = 38,	//抗吸血万分比
    RESIST_SUCK_SUM_PERCENT = 39,	//抗吸血总万分比
    RESIST_BACK_ATT = 40,	//抗反击
    RESIST_BACK_ATT_PERCENT = 41,	//抗反击万分比
    RESIST_BACK_ATT_SUM_PERCENT = 42,	//抗反击总万分比
    RESIST_CONTI_ATT = 43,	//抗连击
    RESIST_CONTI_ATT_PERCENT = 44,	//抗连击万分比
    RESIST_CONTI_ATT_SUM_PERCENT = 45,	//抗连击总万分比
    RESIST_DEADLY = 46,	//抗爆伤
    RESIST_DEADLY_PERCENT = 47,	//抗爆伤万分比
    RESIST_DEADLY_SUM_PERCENT = 48,	//抗爆伤总万分比
    RESIST_MISS = 49,	//抗闪避
    RESIST_MISS_PERCENT = 50,	//抗闪避万分比
    RESIST_MISS_SUM_PERCENT = 51,	//抗闪避总万分比
    RESIST_CRITICAL = 52,	//抗暴击
    RESIST_CRITICAL_PERCENT = 53,	//抗暴击万分比
    RESIST_CRITICAL_SUM_PERCENT = 54,	//抗暴击总万分比
    RESIST_STUN = 55,	//抗击晕
    RESIST_STUN_PERCENT = 56,	//抗击晕万分比
    RESIST_STUN_SUM_PERCENT = 57,	//抗击晕总万分比
    FINAL_DEC_ATT = 58,	//减伤
    FINAL_DEC_ATT_PERCENT = 59,	//减伤万分比
    FINAL_DEC_ATT_SUM_PERCENT = 60,	//减伤总万分比
};
export enum eAttrBaseType{
    HP = 1,	//生命
    ATT = 3,	//攻击力
    DEF = 4,	//防御
    SPE = 2,	//速度
    SUCK = 5,	//吸血
    BACK_ATT = 6,	//反击
    CONTI_ATT = 7,	//连接
    DEADLY_ADD = 8,	//爆伤
    MISS = 9,	//闪避
    CRITICAL = 10,	//暴击
    STUN = 11,	//击晕
    FINAL_ATT = 12,	//最终伤害
    RESIST_SUCK = 13,	//抗吸血
    RESIST_BACK_ATT = 14,	//抗反击
    RESIST_CONTI_ATT = 15,	//抗连击
    RESIST_DEADLY = 16,	//抗爆伤
    RESIST_MISS = 17,	//抗闪避
    RESIST_CRITICAL = 18,	//抗暴击
    RESIST_STUN = 19,	//抗击晕
    FINAL_DEC_ATT = 20,	//减伤
};

export type PlayerAttrNetType = {key:number,value:{low:number,height:number}};

export class AttrBase {
    private mAttrData:PlayerAttrNetType;
    constructor(netData:PlayerAttrNetType){
        this.mAttrData = netData;
    }
    //获取到原始的属性数据（大小端）
    public GetOriginAttr():{low:number,height:number}{
        return this.mAttrData.value;
    }

    //获取到实际的属性
    public GetAttrValue():number{
        return (this.mAttrData.value.height * 4294967296 +  this.mAttrData.value.low);
    }
}; 