import { IMonsterStruct, MonsterConfig } from "../Work/OutputScript/Monster";
import { AttrCell } from "./Battle/AttrCell";
import { eCampType, eAttrType } from "./Battle/BattleDefine";
import { BuffProxy } from "./BuffProxy";
import { eTriggerType, IBuffObj } from "./Define";
let buffProxy:BuffProxy = new BuffProxy(); 
export enum eRecordType{
    InitAttrs,//初始化数据用
    InitBuffs,//初始化数据用
    Attack,//玩家进行基础攻击用 
    BuffInsert,//插入一个Buff 
    BuffTrigger,//触发一个Buff 
    EndBattle,//战斗记录，战斗结束
};

export interface RecordBase{
    RecordType:eRecordType;//记录类型
}
 
//游戏内的各项数值主要被记录在玩家的属性中，所以此处会从玩家属性中拉取到战斗必要的数值内容
export interface RecordInitData extends RecordBase{
    Camp:eCampType;//玩家阵营类型
    BaseAttrs:{[key:number]:number};//需要获取到玩家的基础属性
    AdditionAttrs:{[key:number]:number};//需要获取到玩家的附加属性
    FinalAttrs:{[key:number]:number};//需要获取到玩家的所有最终属性值
};
 
//游戏内Buff被插入时的日志记录
export interface RecordBuffInsert extends RecordBase{
    Camp:eCampType;//玩家阵营类型
    BuffID:number;//插入Buff的唯一ID
    BuffKey:number;//插入Buff的Key
};

//当Buff被触发时，我希望Buff所关联的所有数据信息，能够一览无余
export interface RecordBuffTrigger extends RecordBase{
    TriggerType:eTriggerType;//Buff的触发类型
    Camp:eCampType;//玩家阵营类型
    BuffID:number;//造成属性变动的BuffID
    TriggerIndex:number;//触发的Buff对应的增益索引
    Attrs:Array<{k:number,v:number}>;//需要获取到的最终属性值
};

//玩家攻击时，也会进行判定，但是因为攻击仅会影响到玩家的生命值
interface RecordAttack extends RecordBase{
    AttackCamp:eCampType;//攻击者玩家阵营
    BeAttackCamp:eCampType;//被攻击者玩家阵营
    Attrs:{[key:number]:number};//需要获取到的最终属性值（攻击相当于削弱玩家的HP属性，所以也是直接改变了玩家的属性）
}

//玩家攻击时，也会进行判定，但是因为攻击仅会影响到玩家的生命值
interface RecordEndBattle extends RecordBase{
    Result:number;//胜利的玩家阵营类型
}   
 
class AttackType{
    public Round:number;     //第几回合
    public AttackName:string;// 攻击者
    public AttackType:number;//攻击类型  
    public AttackID:number;  //攻击ID
    public BeAttackName:string;//被攻击者
    public Harm:number;     //  攻击伤害。
    public ResdiueHP:number;     //  剩余血量
    constructor(round:number,attackName:string,beAttackName:string,attackType:number,harm:number,resdiueHP:number){
        this.Round = round;
        this.AttackName = attackName;
        this.AttackType = attackType;
        this.BeAttackName = beAttackName;
        this.Harm = harm;
        this.ResdiueHP = resdiueHP;
    }
}
 
class Player{
    private mName:string;//玩家名称
    private mCamp:PlayerCamp;//玩家所属阵营
    private mIsMainPlayer:boolean = true;//阵营首领
    public constructor(camp:PlayerCamp,name:string){
        this.mName = name;
        this.mCamp = camp;
    }
    //当前玩家的阵营信息
    public get Camp():PlayerCamp{ return this.mCamp; }

    //当前玩家的属性信息
    public GetAttr(type:eAttrType):number{ return this.Camp.GetAttrByType(type); }
    
    //获取到玩家的敌人信息
    public get Enemy():Player{ return this.Camp.Enemy; }

    //是否是主要阵营玩家
    public get IsMainPlayer():boolean{ return this.mIsMainPlayer; }
    
    //获取玩家名称
    public get Name():string{ return this.mName; }

    public UpdateHP(harm:number){
        this.mCamp.SetAttrByType(eAttrType.FinalHP,harm);
    }
}

//玩家阵营
class PlayerCamp{ 
    private mCampType:eCampType;
    private mMainPlayer:Player;//阵营主角
    private mPlayerArray:Array<Player> = new Array<Player>();//阵营玩家 
    private mBuffControlID:number;//每个阵营维护一个Buff

    private mAttrCell:AttrCell = new AttrCell();//阵营属性信息
    private mEnemyCamp:PlayerCamp;//敌人阵营

    public constructor(campType:eCampType,name:string){
        this.mCampType = campType;
        this.mBuffControlID = buffProxy.GenBuffControl(campType,this.mAttrCell);
        this.InsertPlayer(name); 
    }

    public get CampType():eCampType{
        return this.mCampType;
    }

    public InsertPlayer(name:string):void{
        this.mMainPlayer = new Player(this,name);
        this.mPlayerArray.push(this.mMainPlayer)
    }
 
    public GetPlayerArray():Array<Player>{
        return this.mPlayerArray;
    }

    public GetAttrByType(type:eAttrType){
        return this.mAttrCell.GetFinalAttr(type);
    }
    
    public SetAttrByType(type:eAttrType,value:number){
        return this.mAttrCell.SetFinalAttr(type,value);
    } 

    public get Enemy():Player{ 
        return this.mEnemyCamp.mMainPlayer;
    }
    public SetEnemyCamp(camp:PlayerCamp){
        this.mEnemyCamp = camp;
    }
    public get BuffControlID():number{
        return this.mBuffControlID;
    }

    public get AttrObj():AttrCell{
        return this.mAttrCell;
    }
};

//一个战斗模拟对象
export class BattleSimulation{ 
    private mMaxRound:number = 0;//最大回合数
    private mPlayerCampArray:Array<PlayerCamp> = new Array<PlayerCamp>();//当前的所有玩家阵营 
    public set MaxRound(round:number){
        this.mMaxRound = round;
    }

    public get MaxRound():number{
        return this.mMaxRound;
    } 

    //通过属性设置战斗角色的属性
    public InitCampInfo(type:eCampType,name:string):void{
        this.mPlayerCampArray[type] = new PlayerCamp(type,name);
    }
    
    //获取到玩家的阵营信息
    public GetPlayerCampInfo(type:eCampType):PlayerCamp{
        return this.mPlayerCampArray[type];
    }
    
    //获取到玩家的攻击顺序
    public GetAllPlayer():Array<Player>{
        let playerArray:Array<Player> = new Array<Player>();
        for(let camp of this.mPlayerCampArray){//首先生成当前的攻击顺序
            for(let player of camp.GetPlayerArray())
                playerArray.push(player)
        }
        return playerArray;
    } 

    public InitEnemyCamp(){
        this.mPlayerCampArray[eCampType.Initiative].SetEnemyCamp(this.mPlayerCampArray[eCampType.Passivity]);
        this.mPlayerCampArray[eCampType.Passivity].SetEnemyCamp(this.mPlayerCampArray[eCampType.Initiative]);
    } 
};
 
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
        this.mBattleSimulation.InitEnemyCamp();
    }  
    /*
    *初始化指定阵营的属性信息，并返回属性记录
    */
    public InitCampAttr(campType:eCampType):void{
        let playerCamp:PlayerCamp = this.mBattleSimulation.GetPlayerCampInfo(campType);
        playerCamp.AttrObj.InitAttr(this.mAttrInfo[campType].attrs);//进行属性的初始化
        let attrObj:AttrCell = playerCamp.AttrObj;//获取到玩家的属性对象
        this.PushBattleRecord<RecordInitData>({
            Camp: campType,
            BaseAttrs: attrObj.GetOriginAttrTable(),
            AdditionAttrs: attrObj.GetAddtionAttrTable(),
            FinalAttrs: attrObj.GetFinalAttrTable(), RecordType: eRecordType.InitAttrs 
        }); 
    }
    /*
    *初始化阵营属性的Buff，并返回插入Buff的记录
    */
    public InitCampBuffs(campType:eCampType):void{
        let playerCamp:PlayerCamp = this.mBattleSimulation.GetPlayerCampInfo(campType);
        for(let cell of this.mAttrInfo[campType].buffs)
            buffProxy.AddBuff(playerCamp.BuffControlID,cell);
    }
    /*
    *触发并设置玩家开局Buff
    */
    TriggerBuff(campType:eCampType,triggerType:eTriggerType):void {
        let trrigerArr:Array<IBuffObj> = new Array<IBuffObj>();
        buffProxy.TriggerEvent(this.mBattleSimulation.GetPlayerCampInfo(campType).BuffControlID,triggerType,undefined,trrigerArr);//对主动攻击的一方添加一个Buff
    }  

    /*
    *玩家攻击消息通知
    */
    AttackRecord(attackCamp:eCampType,beAttackCamp:eCampType,harm:number):void{
        this.PushBattleRecord<RecordAttack>({
            RecordType:eRecordType.Attack,//记录类型
            AttackCamp:attackCamp,//攻击者玩家阵营
            BeAttackCamp:beAttackCamp,//被攻击者玩家阵营
            Attrs: {[eAttrType.FinalHP]:harm}//需要获取到的最终属性值（攻击相当于削弱玩家的HP属性，所以也是直接改变了玩家的属性）
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
                let attackCamp:PlayerCamp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Camp.CampType);
                let beAttackCamp:PlayerCamp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Enemy.Camp.CampType); 

                //准备攻击前，进行一次Buff的触发操作
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.AttackFront);
                let harm:number = attackCamp.GetAttrByType(eAttrType.Attack) - beAttackCamp.GetAttrByType(eAttrType.Defense);  
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.HPChangeFront);  
                beAttackCamp.SetAttrByType( eAttrType.FinalHP,beAttackCamp.GetAttrByType(eAttrType.FinalHP) - (harm <= 0 ? 0 : harm));//修改玩家的血量 
                this.AttackRecord(attackCamp.CampType,beAttackCamp.CampType,(harm <= 0 ? 0 : harm));
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.HPChangeAfter); 
                this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.AttackAfter);   
                if(beAttackCamp.GetAttrByType(eAttrType.FinalHP) <= 0){
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