import { MonsterConfig } from "../../Work/OutputScript/Monster";
import { AttrCell } from "../AttrControl/AttrCell";
import { eCampType } from "./Define/BattleDefine";   
import { eAttrType } from "../AttrControl/Define/AttrDefine";
import { BattleSimulation } from "./BattleSimulation";
import { RecordBase, eRecordType } from "./Define/RecordDefine";
import { Player } from "./Player";
import { Camp } from "./Camp"; 
import { BattleCommunicantProxy } from "../Communicant/BattleCommunicant";
import { eNotifyType } from "../Communicant/Define/Define";
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
    
    /*
    *初始化指定阵营的属性信息，并返回属性记录
    */
    public InitCampAttr(campType:eCampType):void{
        let playerCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(campType);
        playerCamp.AttrObj.InitAttr(this.mAttrInfo[campType].attrs);//进行属性的初始化
        let attrObj:AttrCell = playerCamp.AttrObj;//获取到玩家的属性对象
        this.Notify(eNotifyType.BattleReport,{RecordType:eRecordType.InitAttrs,Camp:campType,Attrs:attrObj.GetAttrTable()}); 
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

    public StartSimulationBattle(){   
        this.Notify(eNotifyType.BattleInit);//通知战斗初始化
        this.Notify(eNotifyType.BattleStart);//通知战斗开始
        //准备开始游戏回合
        let winCamp:Camp|undefined;
        for(let round = 1 ; round <= this.mBattleSimulation.MaxRound &&  !winCamp ; round++){
            this.Notify(eNotifyType.RoundStart); 
            let playerArray:Array<Player> = this.mBattleSimulation.GetAllPlayer();
            while(playerArray.length != 0){ 
                //对出手顺序进行排序
                playerArray.sort((playerA:Player,playerB:Player)=> playerA.Camp.GetAttrByType(eAttrType.Speed) - playerB.Camp.GetAttrByType(eAttrType.Speed));
                //弹出速度最快的玩家
                let attackPlayer:Player = playerArray.pop()!; 
                let attackCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Camp.CampType);//获取到当前攻击者的阵营
                let beAttackCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Enemy.Camp.CampType);//获取到当前敌对攻击者阵营

                let harm:number = attackCamp.GetAttrByType(eAttrType.SumAttack) - beAttackCamp.GetAttrByType(eAttrType.SumDefense);//计算伤害值
                this.Notify(eNotifyType.AttackFront,attackCamp,beAttackCamp,harm);//玩家发起攻击前
                this.Notify(eNotifyType.BeAttackFront,attackCamp,beAttackCamp,harm);//玩家发起攻击前
                let finalHarm = attackCamp.GetAttrByType(eAttrType.SumAttack) - beAttackCamp.GetAttrByType(eAttrType.SumDefense);//计算最终伤害值
                this.Notify(eNotifyType.AttackAfter,attackCamp,beAttackCamp,finalHarm);//玩家进行攻击后，进行的操作
                this.Notify(eNotifyType.BeAttackAfter,attackCamp,beAttackCamp,finalHarm);//玩家进行攻击后，进行的操作
                
                if(beAttackCamp.GetAttrByType(eAttrType.SumFinalHP) <= 0){
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