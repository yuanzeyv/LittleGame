import { MonsterConfig } from "../../Work/OutputScript/Monster";
import { AttrCell } from "../AttrControl/AttrCell";
import { eCampType } from "./Define/BattleDefine";   
import { eAttrType } from "../AttrControl/Define/AttrDefine";
import { BattleSimulation } from "./BattleSimulation";
import { RecordAttackMoveTo, RecordBase, RecordInitData, RecordRoundChange, eRecordType } from "./Define/RecordDefine";
import { Player } from "./Player";
import { Camp } from "./Camp"; 
import { BattleCommunicantProxy } from "../Communicant/BattleCommunicant";
import { eAttackType, eNotifyType } from "../Communicant/Define/Define";
import { RecordInitAttrsType } from "../BattleAnalysis/AnalysisType/RecordInitAttrsType";
//本类是对战斗模拟类的一个外观封装，以达到更好的操作战斗模拟类的效果
export class BattleSimulationFacade{
    private mBattleSimulation:BattleSimulation; //战斗模拟模块
    private mBattleCommunicantID:number;//战斗通知模块
    private mAttrInfo:{attrs:{k:number,v:number}[],buffs:number[]}[] = [];
    public mRecordArray:Array<RecordBase> = new Array<RecordBase>();
    constructor(battleSimulationObj:BattleSimulation){
        this.mBattleCommunicantID = BattleCommunicantProxy.Ins.GenObj();
        this.mBattleSimulation = battleSimulationObj; 
        this.mBattleSimulation.BattleCommunicantID = this.mBattleCommunicantID;
        this.InitEventNotify();
    }
    //初始化事件函数
    private InitEventNotify():void{  
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BattleInit   ,this,this.BattleInitHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BattleReport ,this,this.BattleReportHandle);
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.RoundStart ,this,this.RoundStartHandle);
    }

    //战斗初始化函数
    private BattleInitHandle():void{
        this.InitCampAttr(eCampType.Initiative);//开局之前首先初始化玩家的所有基础属性信息
        this.InitCampAttr(eCampType.Passivity); 
        this.InitCampBuffs(eCampType.Initiative);//随后初始化阵营属性的Buff，并返回属性变动的差值
        this.InitCampBuffs(eCampType.Passivity);  
    } 
    //进行一次战报记录
    private BattleReportHandle(record:RecordBase):void{ 
        this.mRecordArray.push(record);
    } 
    
    //记录一次回合数变动消息
    private RoundStartHandle(round:number):void{ 
        let roundRecord:RecordRoundChange = {RecordType:eRecordType.RoundChange,Round:round};
        this.Notify(eNotifyType.BattleReport,roundRecord); 
    } 
    
    /*
    *初始化指定阵营的属性信息，并返回属性记录
    */
    public InitCampAttr(campType:eCampType):void{
        let playerCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(campType);//获取到指定阵营
        playerCamp.AttrObj.InitAttr(this.mAttrInfo[campType].attrs);//进行属性的初始化
        let attrObj:AttrCell = playerCamp.AttrObj;//获取到玩家的属性对象
        let sendInitType:RecordInitData = {RecordType:eRecordType.InitAttrs,Camp:campType,Attrs:attrObj.GetAttrTable(),Name:playerCamp.MainPlayer.Name};
        this.Notify(eNotifyType.BattleReport,sendInitType); 
    }
    /*
    *初始化阵营属性的Buff，并返回插入Buff的记录
    */
    public InitCampBuffs(campType:eCampType):void{
        let playerCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(campType); 
        for(let cell of this.mAttrInfo[campType].buffs)
            playerCamp.BuffControl.AddBuff(cell);   
    }
    /*
    round:战斗最大回合数
    initiativeConfig:主动攻击者的战斗数据信息
    passivityConfig:被动攻击者的战斗数据信息
    */
    public SetBattleInfo(round:number,initiativeConfig:number,passivityConfig:number):void{
        this.mBattleSimulation.MaxRound = round;
        this.mAttrInfo[eCampType.Initiative] = {attrs:MonsterConfig.GetData(initiativeConfig)?.Attrs!,buffs:MonsterConfig.GetData(initiativeConfig)?.Buffs!,}
        this.mAttrInfo[eCampType.Passivity] = {attrs:MonsterConfig.GetData(passivityConfig)?.Attrs!,buffs:MonsterConfig.GetData(passivityConfig)?.Buffs!,}
        this.mBattleSimulation.InitCampInfo(eCampType.Passivity,MonsterConfig.GetData(initiativeConfig)?.Name!);
        this.mBattleSimulation.InitCampInfo(eCampType.Initiative,MonsterConfig.GetData(passivityConfig)?.Name!);
    }   
     
 
    public Notify(event:eNotifyType,...param):void{
        BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,event,...param);
    }

    public Random():number{
        return Math.min(Math.floor(Math.random() * 10000),10000);
    }
    //获取到指定阵营的当前血量    
    private GetCampHP(camp:Camp):number{
        return camp.GetAttrByType(eAttrType.SumFinalHP);
    }
    
    private GetMissAttrPrecent(attackCamp:Camp,beAttackCamp:Camp):number{
        return Math.min(attackCamp.GetAttrByType(eAttrType.SumMiss) - beAttackCamp.GetAttrByType(eAttrType.SumResistanceMiss),10000);
    }

    private GetCircleAttrPrecent(attackCamp:Camp,beAttackCamp:Camp):number{
        return Math.min(attackCamp.GetAttrByType(eAttrType.SumCircle) - beAttackCamp.GetAttrByType(eAttrType.SumResistancCircle),10000);
    }

    private GetAttackBackAttrPrecent(attackCamp:Camp,beAttackCamp:Camp):number{
        return Math.min(attackCamp.GetAttrByType(eAttrType.SumCircle) - beAttackCamp.GetAttrByType(eAttrType.SumResistancCircle),10000);
    }

    private GetAttacContinueAttrPrecent(attackCamp:Camp,beAttackCamp:Camp):number{
        return Math.min(attackCamp.GetAttrByType(eAttrType.SumAttackContinue) - beAttackCamp.GetAttrByType(eAttrType.SumResistanceAttackContinue),10000);
    }
 
    private GetAttackHarm(attackCamp:Camp,beAttackCamp:Camp,isCircle:boolean):number{
        //暴击是两倍伤害
        let circleHarmPercent:number = isCircle ?Math.min(1, 2 + (this.GetCircleHarmPercent(attackCamp,beAttackCamp) / 10000)):1;
        return (attackCamp.GetAttrByType(eAttrType.SumAttack) - beAttackCamp.GetAttrByType(eAttrType.SumDefense)) * circleHarmPercent;
    }
    
    private GetCircleHarmPercent(attackCamp:Camp,beAttackCamp:Camp):number{
        return attackCamp.GetAttrByType(eAttrType.SumCircleDamage) - beAttackCamp.GetAttrByType(eAttrType.SumResistanceCircleDamage);//总暴击伤害加成 - 总暴击抵抗加成
    }
 
    //真代表持续战斗中
    //假代表当前已经停止了战斗
    public AttackPlayer(attackCamp:Camp,beAttackCamp:Camp,attackType:eAttackType):boolean{
        //获取到受击阵营的血量是否满足战斗要求
        if( this.GetCampHP(beAttackCamp) <= 0 )
            return false;
        //当前的攻击类型
        let attackFrontType:eNotifyType = (attackType == eAttackType.ContinueAttack) ? eNotifyType.AttackContinueFront : (attackType == eAttackType.AttackBack) ? eNotifyType.AttackBackFront :eNotifyType.AttackFront;
        let beAttackFrontType:eNotifyType = (attackType == eAttackType.ContinueAttack) ? eNotifyType.BeAttackContinueFront : (attackType == eAttackType.AttackBack) ? eNotifyType.BeAttackBackFront :eNotifyType.BeAttackFront;
        let attackAfterType:eNotifyType = (attackType == eAttackType.ContinueAttack) ? eNotifyType.AttackContinueAfter : (attackType == eAttackType.AttackBack) ? eNotifyType.AttackBackAfter :eNotifyType.AttackAfter;
        let beAttackAfterType:eNotifyType = (attackType == eAttackType.ContinueAttack) ? eNotifyType.BeAttackContinueAfter : (attackType == eAttackType.AttackBack) ? eNotifyType.BeAttackBackAfter :eNotifyType.BeAttackAfter;
        //当前的暴击 与 闪避 属性状态
        let isCircle:boolean = this.Random() <= this.GetCircleAttrPrecent(attackCamp,beAttackCamp);//判断当前是否能够进行暴击
        let isBeMiss:boolean = !isCircle &&  this.Random() <= this.GetMissAttrPrecent(attackCamp,beAttackCamp);//当前没有进行暴击，并且当前触发了闪避
        let baseHarm:number = this.GetAttackHarm(attackCamp,beAttackCamp,isCircle) ;//获取到玩家的攻击伤害 
        if(attackType == eAttackType.Normal){
            let attackMoveRecord:RecordAttackMoveTo = {RecordType:eRecordType.AttackMoveTo,Camp:attackCamp.CampType,PosX:350};
            BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,attackMoveRecord); //发送攻击前移动
        } 
        //连击攻击
        this.Notify(attackFrontType,attackCamp,beAttackCamp,attackType,baseHarm,isCircle,isBeMiss);//玩家发起攻击前
        this.Notify(beAttackFrontType,attackCamp,beAttackCamp,attackType,baseHarm,isCircle,isBeMiss);//玩家被攻击前 
        let finalHarm = this.GetAttackHarm(attackCamp,beAttackCamp,isCircle);//对敌人造成最终的伤害
        this.Notify(attackAfterType,attackCamp,beAttackCamp,attackType,finalHarm,isCircle,isBeMiss);//玩家进行攻击后，进行的操作
        this.Notify(beAttackAfterType,attackCamp,beAttackCamp,attackType,finalHarm,isCircle,isBeMiss);//玩家进行攻击后，进行的操作 
        if(attackType == eAttackType.Normal){
            let attackMoveRecord:RecordAttackMoveTo = {RecordType:eRecordType.AttackMoveTo,Camp:attackCamp.CampType,PosX:-350};
            BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,attackMoveRecord); //发送攻击前移动
        } 
        //计算完毕之后，由于各个Buff 或者 技能的影响，可能会照成攻击者血量为0，所以这里进行一次判断逻辑，以免执行了多余逻辑
        if( this.GetCampHP(attackCamp) <= 0 )//在此处判断当前玩家的血量是否见底
            return false;
        //计算玩家反击 
        let isAttackBack:boolean = this.Random() <= this.GetAttackBackAttrPrecent(attackCamp,beAttackCamp);
        if( isAttackBack )//玩家应该被反击 
            return this.AttackPlayer(beAttackCamp,attackCamp,eAttackType.AttackBack); 
        else if(this.Random() <= this.GetAttacContinueAttrPrecent(attackCamp,beAttackCamp))//计算玩家是否可以连击
            return this.AttackPlayer(attackCamp ,beAttackCamp,eAttackType.ContinueAttack); 
        return this.GetCampHP(beAttackCamp) >= 0 ; 
    }

    public StartSimulationBattle(){   
        this.Notify(eNotifyType.BattleInit);//通知战斗初始化
        this.Notify(eNotifyType.BattleStart);//通知战斗开始
        //准备开始游戏回合
        let winCamp:Camp|undefined;
        for(let round = 1 ; round <= this.mBattleSimulation.MaxRound &&  !winCamp ; round++){
            this.Notify(eNotifyType.RoundStart,round); 
            let playerArray:Array<Player> = this.mBattleSimulation.GetAllPlayer();
            while(playerArray.length != 0){ 
                //对出手顺序进行排序
                playerArray.sort((playerA:Player,playerB:Player)=> playerA.Camp.GetAttrByType(eAttrType.Speed) - playerB.Camp.GetAttrByType(eAttrType.Speed));
                //弹出速度最快的玩家
                let attackPlayer:Player = playerArray.pop()!; 
                let attackCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Camp.CampType);//获取到当前攻击者的阵营
                let beAttackCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Enemy.Camp.CampType);//获取到当前敌对攻击者阵营
                let isSurvival:boolean = this.AttackPlayer(attackCamp,beAttackCamp,eAttackType.Normal);//判断是否依然存活
                if(!isSurvival){//起码有一个人生命为0的时候
                    winCamp = attackCamp;
                    break;
                } 
            } 
            this.Notify(eNotifyType.RoundEnd); 
        } 
        //通知战斗结束，传入胜利阵营
        this.Notify(eNotifyType.BattleOver,winCamp); 
    }  
}
/*
1:战斗开始，初始化玩家基础属性
2:初始化玩家Buff
3:回合开始 进入第一回合
4:找寻本回合未攻击的所有玩家
5:

*/