import { math, sys } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { eAttrBaseType, eAttrType } from "../PlayerAttrProxy/AttrDefine/AttrDefine";
import { Random } from 'random'
import seedrandom from 'seedrandom'  
import { BuffConfig, IBuffStruct } from "../../../Config/Cfg_Buff";

//const rng = new Random()
//const rng2 = new Random()
//rng2.use(seedrandom('tinykittens'));
//console.log(rng.(0, 100)) // 72  
//console.log(rng2.(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72  
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//console.log(rng2.int(0, 100)) // 72 
//一场战斗所需要的所有的数据信息
//玩家的所有基础属性
export class FightInfo{
    public mFightAttrArr:Array<number> = new Array<number>();//计算用战斗属性
    public mCalcAttrArr:Array<number> = new Array<number>();//所有的战斗属性
};

//玩家的所有基础属性
export class FightRecorde{

};
//用于将战斗进行拆分
export class FightObj{
}

export class FightProxy extends BaseProxy{
    static get ProxyName():string { return "FightProxy" };
    public onLoad(): void {
    }

    //round回合数
    public SimulateBattle(round:number,selfFightInfo:FightInfo,enemyFightInfo:FightInfo):void{
        //闪避 抗闪避  攻击 防御  生命 暴击率 
        //抗爆击率  最终增伤  最终减伤  爆伤加成  抵抗爆伤 
        //击晕  抗击晕 连击 抗连击 吸血 抗吸血 

        //速度 反击  抗反击
        //战斗播报
        let fightRecorder:FightRecorde = new FightRecorde();
        let isWin:boolean = false;
        for(let i = 0 ; i < round ; i++){
            let harm:number = 0;
            let missPercent:number = Math.max(0,selfFightInfo.mCalcAttrArr[eAttrBaseType.RESIST_MISS] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.MISS]);//当前是否被闪避
            if( Math.ceil(Math.random() * 100) <= missPercent ){//命中时
                //自己攻击
                harm = Math.max(0,selfFightInfo.mCalcAttrArr[eAttrBaseType.ATT] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.DEF]);//获取到应当造成的伤害
                let criticalPercent:number = Math.min(100,selfFightInfo.mCalcAttrArr[eAttrBaseType.CRITICAL] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.RESIST_CRITICAL]);//暴击概率
                let isCritical:boolean = Math.ceil(Math.random() * 100) <= criticalPercent;
                if(isCritical){
                    let criticalHurmPercent:number = Math.max(0,selfFightInfo.mCalcAttrArr[eAttrBaseType.DEADLY_ADD] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.RESIST_DEADLY]);//爆伤加成
                    harm = harm * (1 + (criticalHurmPercent / 100));
                }
                //判断是否进行击晕判定
                let stunPercent:number = Math.max(0,selfFightInfo.mCalcAttrArr[eAttrBaseType.STUN] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.RESIST_STUN]);//当前是否被击晕
                if( Math.ceil(Math.random() * 100) <= stunPercent ){
                    //给地方添加一个击晕Buff，确保敌方在下一回合不会进行攻击
                }
            }
            let finalIncreaseDamage:number = (selfFightInfo.mCalcAttrArr[eAttrBaseType.FINAL_ATT] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.FINAL_DEC_ATT]) / 100;//获取到当前的最终增伤 
            harm = harm * ( 1 + finalIncreaseDamage); 
            if( harm > enemyFightInfo.mCalcAttrArr[eAttrBaseType.HP])
                harm = enemyFightInfo.mCalcAttrArr[eAttrBaseType.HP];
            enemyFightInfo.mCalcAttrArr[eAttrBaseType.HP] -= harm;//进行伤害扣除
            //进行吸血判定
            let suckPercent:number = Math.max(0,(selfFightInfo.mCalcAttrArr[eAttrBaseType.SUCK] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.RESIST_SUCK]) / 100);//获取到当前的最终增伤 
            if(suckPercent){
                let suckValue:number = harm * suckPercent;
                selfFightInfo.mCalcAttrArr[eAttrBaseType.HP] += suckValue; 
                if( selfFightInfo.mCalcAttrArr[eAttrBaseType.HP] > selfFightInfo.mFightAttrArr[eAttrBaseType.HP]){
                    suckValue = selfFightInfo.mFightAttrArr[eAttrBaseType.HP] - selfFightInfo.mCalcAttrArr[eAttrBaseType.HP];
                    selfFightInfo.mCalcAttrArr[eAttrBaseType.HP] = selfFightInfo.mFightAttrArr [eAttrBaseType.HP]
                }
            }
            if( enemyFightInfo.mCalcAttrArr[eAttrBaseType.HP] == 0)  { 
                isWin = true;
                break;//战斗结束
            }
            //敌人尝试进行反击（反击的攻击，无法使自己进入连击状态）
            let backPercent:number = Math.max(0,selfFightInfo.mCalcAttrArr[eAttrBaseType.RESIST_BACK_ATT ] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.BACK_ATT]);//当前是否被击晕
            if( Math.ceil(Math.random() * 100) <= backPercent ){
                continue;//再次进行一次反击判定
            }

            //进行连击判定
            let continuePercent:number = Math.max(0,selfFightInfo.mCalcAttrArr[eAttrBaseType.CONTI_ATT] - enemyFightInfo.mCalcAttrArr[eAttrBaseType.RESIST_CONTI_ATT]);//当前是否被击晕
            if( Math.ceil(Math.random() * 100) <= continuePercent ){
                continue;//再次进行一次攻击判定
            }
        }


        //进行一回合的战斗
    }
}

//buff的类型分为 
//唯一Buff （同一时间内，只可以添加一次，且不会叠加，次数也不会进行增加）
//唯一Buff （同一时间内，只可以添加一次，但是次数会在每次重新触发时进行刷新）
//叠加Buff，不叠加回合数  (同一时间内，可以添加指定的次数，但是叠加次数不会改变，由最大叠加次数进行限制)
//叠加Buff刷新次数        (同一时间内，可以添加指定次数的buff，且每次添加后，都会重置剩余时间)

//模拟情形，有一个技能的功能为
//战斗开始时，向敌方施加一次持续5回合的诅咒，之后每次受到暴击伤害时，敌方玩家的 防御力 攻击力 会降低 1000点，可叠加10次。 
//诅咒消失后，叠加Debuff立即消失，


//一个Buff有父子级关系 
enum eBuffTriggerType{
    EntryBattle = 0,//开局战斗Buff
    BattleRoundStart = 1,//战斗回合开始的Buff
    BattleRoundEnd = 2,//战斗回合结束时的Buff
    AttackFront = 3,//攻击结束时的Buff
    AttackAfter = 4,//攻击结束时的Buff
};


enum eBuffLiftType{
    Round,//回合
    Attack,//攻击
    Defense,//防御
    Miss,//闪避
};
