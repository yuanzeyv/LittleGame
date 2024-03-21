import { MonsterConfig } from "../../Work/OutputScript/Monster";
import { AttrCell } from "../AttrControl/AttrCell";
import { eCampType } from "./Define/BattleDefine";  
import { eTriggerType } from "../Buff/Define/Define";
import { eAttrType } from "../AttrControl/Define/AttrDefine";
import { BattleSimulation } from "./BattleSimulation";
import { RecordAttack, RecordBase, RecordEndBattle, RecordInitData, eRecordType } from "./Define/RecordDefine";
import { Player } from "./Player";
import { Camp } from "./Camp";
import { BuffProxy } from "../Buff/BuffProxy";
//本类是对战斗模拟类的一个外观封装，以达到更好的操作战斗模拟类的效果
export class BattleSimulationFacade{
    private mBattleSimulation:BattleSimulation;
    public mRecordArray:Array<RecordBase> = new Array<RecordBase>();
    private mAttrInfo:{attrs:{k:number,v:number}[],buffs:number[]}[] = [];
    constructor(battleSimulationObj:BattleSimulation){
        this.mBattleSimulation = battleSimulationObj;
    }

    //压入一个日志记录
    public PushBattleRecord<T extends RecordBase>(record:T){
        this.mRecordArray.push(record);
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
    /*
    *初始化指定阵营的属性信息，并返回属性记录
    */
    public InitCampAttr(campType:eCampType):void{
        let playerCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(campType);
        playerCamp.AttrObj.InitAttr(this.mAttrInfo[campType].attrs);//进行属性的初始化
        let attrObj:AttrCell = playerCamp.AttrObj;//获取到玩家的属性对象
        this.PushBattleRecord<RecordInitData>({
            RecordType: eRecordType.InitAttrs ,
            Camp: campType,
            Attrs: attrObj.GetAttrTable(),
        }); 
    }
    /*
    *初始化阵营属性的Buff，并返回插入Buff的记录
    */
    public InitCampBuffs(campType:eCampType):void{
        let playerCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(campType);
        for(let cell of this.mAttrInfo[campType].buffs)
            BuffProxy.Ins.AddBuff(playerCamp.BuffControlID,cell);
    }
    /*
    *触发并设置玩家开局Buff
    */
    TriggerBuff(campType:eCampType,triggerType:eTriggerType):void { 
        BuffProxy.Ins.TriggerEvent(this.mBattleSimulation.GetPlayerCampInfo(campType).BuffControlID,triggerType,undefined);//对主动攻击的一方添加一个Buff
    }  

    /*
    *玩家攻击消息通知
    */
    AttackRecord(attackCamp:eCampType,beAttackCamp:eCampType,harm:number):void{
        this.PushBattleRecord<RecordAttack>({
            RecordType:eRecordType.Attack,//记录类型
            AttackCamp:attackCamp,//攻击者玩家阵营
            BeAttackCamp:beAttackCamp,//被攻击者玩家阵营
            Attrs: {[eAttrType.SumFinalHP]:harm}//需要获取到的最终属性值（攻击相当于削弱玩家的HP属性，所以也是直接改变了玩家的属性）
        });
    }

    EndBattleRecord(winCamp:number):void{
        this.PushBattleRecord<RecordEndBattle>({
            RecordType:eRecordType.EndBattle,//记录类型 
            Result:winCamp
        }); 
    }

    public StartSimulationBattle(){  
        //开局之前首先初始化玩家的所有基础属性信息
        this.InitCampAttr(eCampType.Initiative);
        this.InitCampAttr(eCampType.Passivity);  
        //随后初始化阵营属性的Buff，并返回属性变动的差值
        this.InitCampBuffs(eCampType.Initiative);
        this.InitCampBuffs(eCampType.Passivity);
 
        //开始启用游戏的开局Buff
        this.TriggerBuff(eCampType.Initiative,eTriggerType.BattleStart);//触发战斗开始类型的
        this.TriggerBuff(eCampType.Passivity,eTriggerType.BattleStart);//触发战斗开始类型的
        //准备开始游戏回合
        let battleSimulationOver:number = 0;
        for(let round = 1 ; round <= this.mBattleSimulation.MaxRound &&  !battleSimulationOver ; round++){
            //回合开始时，需要优先触发一次回合开启时的Buff
            this.TriggerBuff(eCampType.Initiative,eTriggerType.RoundStart);//触发战斗开始类型的
            this.TriggerBuff(eCampType.Passivity,eTriggerType.RoundStart);//触发战斗开始类型的
            //获取到回合出手玩家列表
            let playerArray:Array<Player> = this.mBattleSimulation.GetAllPlayer();
            while(playerArray.length != 0){
                //对玩家速度进行排序
                playerArray.sort((playerA:Player,playerB:Player)=> playerA.Camp.GetAttrByType(eAttrType.Speed) - playerB.Camp.GetAttrByType(eAttrType.Speed));
                let attackPlayer:Player = playerArray.pop()!; 
                let attackCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Camp.CampType);
                let beAttackCamp:Camp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Enemy.Camp.CampType); 

                //准备攻击前，进行一次Buff的触发操作
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.AttackFront);
                let harm:number = attackCamp.GetAttrByType(eAttrType.Attack) - beAttackCamp.GetAttrByType(eAttrType.Defense);  
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.HPChangeFront);  
                beAttackCamp.SetAttrByType( eAttrType.SumFinalHP,beAttackCamp.GetAttrByType(eAttrType.SumFinalHP) - (harm <= 0 ? 0 : harm));//修改玩家的血量 
                this.AttackRecord(attackCamp.CampType,beAttackCamp.CampType,(harm <= 0 ? 0 : harm));
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.HPChangeAfter); 
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.AttackAfter);   
                if(beAttackCamp.GetAttrByType(eAttrType.SumFinalHP) <= 0){
                    battleSimulationOver = beAttackCamp.CampType == eCampType.Initiative ? 1 : 2;
                    break;
                }
            } 
            this.TriggerBuff(eCampType.Initiative,eTriggerType.BattleStart);//触发战斗开始类型的
            this.TriggerBuff(eCampType.Passivity,eTriggerType.BattleStart);//触发战斗开始类型的
        } 
        this.EndBattleRecord(battleSimulationOver);
    }  
} 