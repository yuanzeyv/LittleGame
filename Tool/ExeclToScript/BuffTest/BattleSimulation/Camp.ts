import { eAttrType } from "../AttrControl/Define/AttrDefine";
import { AttrCell } from "../AttrControl/AttrCell"; 
import { BattleSimulation } from "./BattleSimulation";
import { eCampType } from "./Define/BattleDefine";
import { Player } from "./Player";
import { BuffControl } from "../Buff/BuffControl";
import { BattleCommunicantProxy } from "../Communicant/BattleCommunicant";
import { eAttackType, eNotifyType } from "../Communicant/Define/Define";
import { eTriggerType } from "../Buff/Define/Define";
import { RecordAttack, RecordAttackMoveTo, RecordEndBattle, RecordSuckBlood, eRecordType } from "./Define/RecordDefine";
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
        //普通攻击阶段
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackFront ,this,this.AttackFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackFront ,this,this.BeAttackFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackAfter ,this,this.AttackAfterHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackAfter ,this,this.BeAttackAfterHandle);  
        //连击攻击阶段
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackContinueFront ,this,this.AttackFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackContinueFront ,this,this.BeAttackFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackContinueAfter ,this,this.AttackAfterHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackContinueAfter ,this,this.BeAttackAfterHandle);  
        //反击攻击阶段
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackBackFront ,this,this.AttackFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackBackFront ,this,this.BeAttackFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackBackAfter ,this,this.AttackAfterHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackBackAfter ,this,this.BeAttackAfterHandle);  
        //暴击消息通知
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackCircleFront ,this,this.AttackCircleFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackCircleFront ,this,this.BeAttackCircleFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.AttackCircleAfter ,this,this.AttackCircleAfterHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.BeAttackCircleAfter ,this,this.BeAttackCircleAfterHandle);  
        //吸血消息通知
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.SuckBloodFront ,this,this.SuckBloodFrontHandle); 
        BattleCommunicantProxy.Ins.RegisterNotify(this.mBattleCommunicantID,eNotifyType.SuckBloodAfter ,this,this.SuckBloodAfterHandle); 

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
    
    //回合开始时的行为
    private RoundStartHandle(){
    }
    
    //回合开始后的行为
    private RoundEndHandle(){
    }

    /****************
    *攻击消息区域
    *****************/
    private AttackFrontHandle(attackCamp:Camp,beAttackCamp:Camp,attackType:eAttackType, harm:number,isCircle:boolean,isMiss:boolean){
        if(this.mCampType != attackCamp.mCampType)//阵营不相等的情况下  
            return;
        this.BuffControl.Trigger(eTriggerType.AttackFront,harm);//向自己的Buff控制器发送一个战斗开始消息 
    }
    
    private BeAttackFrontHandle(attackCamp:Camp,beAttackCamp:Camp,attackType:eAttackType,harm:number,isCircle:boolean,isMiss:boolean){
        if(this.mCampType != attackCamp.mCampType) return;//发起攻击者的话  
        this.BuffControl.Trigger(eTriggerType.BeAttackFront,harm);//向自己的Buff控制器发送一个战斗开始消息
    }
    
    private AttackAfterHandle(attackCamp:Camp,beAttackCamp:Camp,attackType:eAttackType,finalHarm:number,isCircle:boolean,isMiss:boolean){
        if(this.mCampType != attackCamp.mCampType) return;//发起攻击者的话  
        if(!isMiss)
            beAttackCamp.SetAttrByType( eAttrType.SumFinalHP , beAttackCamp.GetAttrByType(eAttrType.SumFinalHP) - (finalHarm <= 0 ? 0 : finalHarm));
        let attackRecord:RecordAttack = {
            AttackCamp: attackCamp.CampType,
            AttackName:attackCamp.MainPlayer.Name,
            BeAttackName:beAttackCamp.MainPlayer.Name,
            IsCircle: isCircle,
            IsMiss: isMiss,
            BeAttackCamp: beAttackCamp.CampType,
            Attrs: { [eAttrType.SumFinalHP]: isMiss?0:finalHarm },
            ResidueHP: beAttackCamp.GetAttrByType(eAttrType.SumFinalHP),
            RecordType: eRecordType.Attack,//
            AttackType:attackType,//普通攻击
        }; 
        BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,attackRecord);  
        if(!isMiss)//玩家进行了闪避时
            this.BuffControl.Trigger(eTriggerType.HitTarget);//向自己的Buff控制器发送一个战斗开始消息
        this.BuffControl.Trigger(eTriggerType.AttackAfter);//向自己的Buff控制器发送一个攻击后的消息通知
    }
    
    private BeAttackAfterHandle(attackCamp:Camp,beAttackCamp:Camp,attackType:eAttackType,harm:number,isCircle:boolean,isMiss:boolean){
        if(this.mCampType != beAttackCamp.mCampType)  
            return;
        if(isMiss == true)//玩家进行了闪避时
            this.BuffControl.Trigger(eTriggerType.MissAttack);//向自己的Buff控制器发送一个战斗开始消息
        this.BuffControl.Trigger(eTriggerType.BeAttackAfter);//向自己的Buff控制器发送一个战斗开始消息
    }
    /****************
    *暴击消息区域
    *****************/
    private AttackCircleFrontHandle(attackCamp:Camp,beAttackCamp:Camp,harm:number){
        if(this.mCampType != attackCamp.mCampType)//发起攻击者的话
            return;
    }
    
    //玩家进行攻击前的行为
    private BeAttackCircleFrontHandle(attackCamp:Camp,beAttackCamp:Camp,harm:number){
        if(this.mCampType != beAttackCamp.mCampType)//仅处理被攻击前的情况
            return;
    }
    
    //玩家进行攻击后的行为
    private AttackCircleAfterHandle(attackCamp:Camp,beAttackCamp:Camp,finalHarm:number){
        if(this.mCampType != attackCamp.mCampType)//发起攻击者的话
            return;
    }
    
    //玩家进行攻击后的行为
    private BeAttackCircleAfterHandle(attackCamp:Camp,beAttackCamp:Camp,harm:number){
        if(this.mCampType != beAttackCamp.mCampType)//仅处理被攻击前的情况 
            return;
    }
    
    /****************
    *暴击消息区域
    *****************/
    private SuckBloodFrontHandle(attackCamp:Camp,beAttackCamp:Camp,suckBlood:number){
        if(this.mCampType != attackCamp.mCampType)//发起攻击者的话
            return;
        //向Buff区域发送吸血前事件
    }
    
    //玩家进行攻击前的行为
    private SuckBloodAfterHandle(attackCamp:Camp,beAttackCamp:Camp,suckBlood:number){
        if(this.mCampType != attackCamp.mCampType || suckBlood <= 0)//仅处理被攻击前的情况
            return; 
        let maxReply:number = beAttackCamp.GetAttrByType(eAttrType.SumHPLimit) - beAttackCamp.GetAttrByType(eAttrType.SumFinalHP);
        suckBlood = Math.min(suckBlood,maxReply);
        beAttackCamp.SetAttrByType( eAttrType.SumFinalHP ,beAttackCamp.GetAttrByType(eAttrType.SumFinalHP) + suckBlood);
        let suckBloodRecord:RecordSuckBlood = {
            RecordType: eRecordType.SuckBlood,
            AttackCamp: attackCamp.CampType,
            AttackName: attackCamp.MainPlayer.Name,
            Attrs: { [eAttrType.SumFinalHP]: suckBlood },
            ResidueHP: beAttackCamp.GetAttrByType(eAttrType.SumFinalHP),
        }; 
        BattleCommunicantProxy.Ins.Notify(this.mBattleCommunicantID,eNotifyType.BattleReport,suckBloodRecord);  
        //向Buff区域发送吸血后事件
    } 
    
};