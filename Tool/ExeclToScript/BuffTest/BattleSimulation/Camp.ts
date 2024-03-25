import { eAttrType } from "../AttrControl/Define/AttrDefine";
import { AttrCell } from "../AttrControl/AttrCell"; 
import { BattleSimulation } from "./BattleSimulation";
import { eCampType } from "./Define/BattleDefine";
import { Player } from "./Player";
import { BuffControl } from "../Buff/BuffControl";
import { BattleCommunicantProxy } from "../Communicant/BattleCommunicant";
import { eNotifyType } from "../Communicant/Define/Define";
import { eTriggerType } from "../Buff/Define/Define";
import { RecordAttack, RecordEndBattle, eRecordType } from "./Define/RecordDefine";
//玩家阵营
export class Camp{ 
    private mBattleCommunicantID:number;//战斗通知模块
    private mBattleSimulation:BattleSimulation;
    private mCampType:eCampType;
    private mMainPlayer:Player;//阵营主角
    private mPlayerArray:Array<Player> = new Array<Player>();//阵营玩家 
    private mBuffControl:BuffControl;//每个阵营维护一个Buff

    private mAttrCell:AttrCell;//阵营属性信息 

    public constructor(communicantID:number,battleSimulation:BattleSimulation,campType:eCampType,name:string){
        this.mBattleCommunicantID = communicantID;
        this.mBattleSimulation = battleSimulation;
        this.mCampType = campType;
        this.mAttrCell = new AttrCell(this.mCampType,this.mBattleCommunicantID);
        this.mBuffControl = new BuffControl(campType,this.mAttrCell,this.mBattleCommunicantID);
        this.InsertPlayer(name); 
        this.InitEventNotify();
    }

    public get CampType():eCampType{
        return this.mCampType;
    }
 
    public InsertPlayer(name:string):void{
        this.mMainPlayer = new Player(this,name);
        this.mPlayerArray.push(this.mMainPlayer)
    }
    

    public get MainPlayer():Player{
        return this.mMainPlayer;
    }
 
    public GetPlayerArray():Array<Player>{
        return this.mPlayerArray;
    }

    public GetAttrByType(type:eAttrType){
        return this.mAttrCell.GetAttr(type);
    }
    
    public SetAttrByType(type:eAttrType,value:number){
        return this.mAttrCell.SetAttr(type,value);
    } 
    //获取到敌对阵营
    public get EnemyCamp():Camp{ 
        return this.mBattleSimulation.GetPlayerCampInfo(this.mCampType == eCampType.Initiative?eCampType.Passivity:eCampType.Initiative);
    } 
    //获取到阵营关联的Buff控制器
    public get BuffControl():BuffControl{
        return this.mBuffControl;
    }
    //获取到玩家所关联的属性对象
    public get AttrObj():AttrCell{
        return this.mAttrCell;
    }

    //设置通讯ID
    public set BattleCommunicantID(id:number){
        this.mBattleCommunicantID = id;
    } 

    /*
    *初始化事件函数
    */
    private InitEventNotify():void{   
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BattleStart ,this,this.BattleStartHandle);  
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BattleOver ,this,this.BattleOverHandle);  

        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackFront ,this,this.AttackFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackFront ,this,this.BeAttackFrontHandle); 

        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackAfter ,this,this.AttackAfterHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackAfter ,this,this.BeAttackAfterHandle);  

        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.RoundStart ,this,this.RoundStartHandle);  
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.RoundEnd ,this,this.RoundEndHandle);  

        
    }
    //战斗开始时，初始化当前的Buff数据对象
    private BattleStartHandle(){
        this.BuffControl.Trigger(eTriggerType.BattleStart);//向自己的Buff控制器发送一个战斗开始消息
    }
    
    private BattleOverHandle(winCamp:Camp|undefined){
        let attackRecord:RecordEndBattle = {RecordType:eRecordType.EndBattle,Camp:this.CampType,Result:(winCamp != undefined ? (winCamp.mCampType == this.mCampType ? 1 : -1) :0)};
        BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,attackRecord); 
    }
    
    //玩家进行攻击前的行为
    private AttackFrontHandle(attackCamp:Camp,beAttackCamp:Camp,harm:number){
        if(this.mCampType != attackCamp.mCampType)//发起攻击者的话
            return;
        this.BuffControl.Trigger(eTriggerType.AttackFront);//向自己的Buff控制器发送一个战斗开始消息
    }
    
    //玩家进行攻击前的行为
    private BeAttackFrontHandle(attackCamp:Camp,beAttackCamp:Camp,harm:number){
        if(this.mCampType != beAttackCamp.mCampType)//仅处理被攻击前的情况
            return;
        this.BuffControl.Trigger(eTriggerType.BeAttackFront);//向自己的Buff控制器发送一个战斗开始消息
    }
    
    //玩家进行攻击后的行为
    private AttackAfterHandle(attackCamp:Camp,beAttackCamp:Camp,finalHarm:number){
        if(this.mCampType != attackCamp.mCampType)//发起攻击者的话
            return;
        this.BuffControl.Trigger(eTriggerType.AttackAfter);//向自己的Buff控制器发送一个战斗开始消息

        beAttackCamp.SetAttrByType( eAttrType.SumFinalHP , beAttackCamp.GetAttrByType(eAttrType.SumFinalHP) - (finalHarm <= 0 ? 0 : finalHarm));//进行玩家属性的变动
        let attackRecord:RecordAttack = {AttackCamp: attackCamp.CampType,BeAttackCamp:beAttackCamp.CampType,Attrs:{[eAttrType.SumFinalHP]:finalHarm},ResidueHP:beAttackCamp.GetAttrByType(eAttrType.SumFinalHP),RecordType:eRecordType.Attack};
        BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,attackRecord); 
    }
    
    //玩家进行攻击后的行为
    private BeAttackAfterHandle(attackCamp:Camp,beAttackCamp:Camp,harm:number){
        if(this.mCampType != beAttackCamp.mCampType)//仅处理被攻击前的情况
            return;
        this.BuffControl.Trigger(eTriggerType.BeAttackAfter);//向自己的Buff控制器发送一个战斗开始消息
    }
    
    //回合开始时的行为
    private RoundStartHandle(){
    }
    
    //回合开始后的行为
    private RoundEndHandle(){
    }
};