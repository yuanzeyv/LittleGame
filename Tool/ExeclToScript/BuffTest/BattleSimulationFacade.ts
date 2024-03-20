import { IMonsterStruct, MonsterConfig } from "../Work/OutputScript/Monster";
import { AttrCell } from "./Battle/AttrCell";
import { eCampType, eAttrType } from "./Battle/BattleDefine";
import { BuffProxy } from "./BuffProxy";
import { eTriggerType, IBuffObj } from "./Define";
let buffProxy:BuffProxy = new BuffProxy();

enum eRecordType{
    InitData,//初始化数据用
    Attack,//玩家进行基础攻击用 
    BuffTrigger,//触发一个Buff 
    EndBattle,//战斗记录，战斗结束
};

interface RecordBase{
    RecordType:eRecordType;//记录类型
}

//希望有一场数据齐全的战斗，必须记录到战斗中的每一个数值变动。
//游戏内的各项数值主要被记录在玩家的属性中，所以此处会从玩家属性中拉取到战斗必要的数值内容
interface RecordInitData extends RecordBase{
    Camp:eCampType;//玩家阵营类型
    BaseAttrs:{[key:number]:number};//需要获取到玩家的基础属性
    AdditionAttrs:{[key:number]:number};//需要获取到玩家的附加属性
    FinalAttrs:{[key:number]:number};//需要获取到玩家的所有最终属性值
};

//当Buff被触发时，我希望Buff所关联的所有数据信息，能够一览无余
interface RecordBuffTrigger extends RecordBase{
    TriggerType:eTriggerType;//Buff的触发类型
    Camp:eCampType;//玩家阵营类型
    BuffID:number;//造成属性变动的BuffID
    TriggerIndex:number;//触发的Buff对应的增益索引
    Attrs:Array<{k:number,v:number}>;//需要获取到的最终属性值
};

//玩家攻击时，也会进行判定，但是因为攻击仅会影响到玩家的生命值
interface RecordAttack extends RecordBase{
    Attrs:{[key:number]:number};//需要获取到的最终属性值（攻击相当于削弱玩家的HP属性，所以也是直接改变了玩家的属性）
}

//玩家攻击时，也会进行判定，但是因为攻击仅会影响到玩家的生命值
interface RecordEndBattle extends RecordBase{
    WinCamp:eCampType;//胜利的玩家阵营类型
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

    public constructor(campType:eCampType,attrs:Array<{k:number,v:number}>,buffs:number[],name:string){
        this.mCampType = campType;
        this.mBuffControlID = buffProxy.GenBuffControl(this.mAttrCell);
        this.mAttrCell.InitAttr(attrs); 
        this.InsertPlayer(name);
        for(let cell of buffs)
            buffProxy.AddBuff(this.mBuffControlID,cell); 
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

    private mRecordArray:Array<AttackType> = new Array<AttackType>();
    public set MaxRound(round:number){
        this.mMaxRound = round;
    }

    public get MaxRound():number{
        return this.mMaxRound;
    }
    //通过配置设置战斗角色的属性
    public SetBattleConfig(type:eCampType,battleID:number):void{
        let mosnterConfig:IMonsterStruct = MonsterConfig.GetData(battleID)!;
        this.SetBattleData(type,mosnterConfig.Attrs,mosnterConfig.Buffs,mosnterConfig.Name);
    }
    //通过属性设置战斗角色的属性
    public SetBattleData(type:eCampType,attrs:Array<{k:number,v:number}>,buffs:number[],name:string):void{
        this.mPlayerCampArray[type] = new PlayerCamp(type,attrs,buffs,name);
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

    //触发一次Buff的事件
    private TriggerBuffEvent(camp:eCampType,triggerType:eTriggerType):Array<IBuffObj>{
        let retInfo:Array<IBuffObj> = new Array<IBuffObj>();//触发的同时，也会记录所有触发的详细数据信息
        buffProxy.TriggerEvent(this.mPlayerCampArray[camp].BuffControlID,triggerType);
        return retInfo;
    }
    private TriggerBothBuffEvent(triggerType:eTriggerType):Array<AttackType>{
        let retInfo:Array<IBuffObj> = new Array<IBuffObj>();//触发的同时，也会记录所有触发的详细数据信息
        buffProxy.TriggerEvent(this.mPlayerCampArray[eCampType.Initiative].BuffControlID,triggerType,undefined,retInfo);//对主动攻击的一方添加一个Buff
        buffProxy.TriggerEvent(this.mPlayerCampArray[eCampType.Passivity].BuffControlID,triggerType,undefined,retInfo);//对被动攻击的一方添加一个Buff

        let retRecord:Array<AttackType> = new Array<AttackType>();
        for(let cell of retInfo)
            retRecord.push(new AttackType(0,"未知","未知",2,cell.BuffID,0));
        return retRecord;
    }
    //开始一回合
    private* StartRound(){//返回值代表战斗是否结束
        //初始化战斗数据,并返回到主界面中去

        yield this.TriggerBothBuffEvent(eTriggerType.BattleStart);//触发战斗开始类型的
        //确保15回合
        for(let nowRound = 1; nowRound <= this.mMaxRound ;nowRound++){
            let playerArray:Array<Player> = this.GetAllPlayer();
            let attackedArray:Array<Player> = new Array<Player>();//已出手的玩家集合
            while(playerArray.length != 0){
                playerArray.sort((playerA:Player,playerB:Player)=>{ 
                    return playerA.Camp.GetAttrByType(eAttrType.Speed) - playerB.Camp.GetAttrByType(eAttrType.Speed);
                });//对玩家速度进行排序
                let attackPlayer:Player = playerArray.pop()!;
                attackedArray.push(attackPlayer);
                //首先计算执行玩家的技能信息（目前只有普通攻击）
                let harm = attackPlayer.GetAttr(eAttrType.Attack) - attackPlayer.Enemy.GetAttr(eAttrType.Defense) ; 
                harm = harm <= 0 ? 0 : harm
                attackPlayer.Enemy.UpdateHP( attackPlayer.Enemy.GetAttr(eAttrType.FinalHP) - harm);//修改玩家的血量
                yield [new AttackType(nowRound,attackPlayer.Name,attackPlayer.Enemy.Name,1,harm,attackPlayer.Enemy.GetAttr(eAttrType.FinalHP))];
                if(attackPlayer.Enemy.GetAttr(eAttrType.FinalHP) <= 0)
                    return [new AttackType(nowRound,attackPlayer.Name,attackPlayer.Enemy.Name,1,harm,attackPlayer.Enemy.GetAttr(eAttrType.FinalHP))];
            }
        }
    }

    public InitEnemyCamp(){
        this.mPlayerCampArray[eCampType.Initiative].SetEnemyCamp(this.mPlayerCampArray[eCampType.Passivity]);
        this.mPlayerCampArray[eCampType.Passivity].SetEnemyCamp(this.mPlayerCampArray[eCampType.Initiative]);
    }
 
    public StartSimulation():void{ 
        this.InitEnemyCamp();
        let handle:Generator<Array<AttackType>, Array<AttackType> | undefined, unknown> = this.StartRound();
        let result:IteratorResult<Array<AttackType>, Array<AttackType> | undefined>;
        do{
            result = handle.next(); 
            for(let cell of result.value!)
                console.log(`第${cell.Round} ${cell.AttackName} 攻击 ${cell.BeAttackName} 造成 ${cell.Harm} 剩余血量:${cell.ResdiueHP}`);
        }while(!result.done);//已经结束了的话
    }
};
 
//本类是对战斗模拟类的一个外观封装，以达到更好的操作战斗模拟类的效果
export class BattleSimulationFacade{
    private mBattleSimulation:BattleSimulation;
    constructor(battleSimulationObj:BattleSimulation){
        this.mBattleSimulation = battleSimulationObj;
    }
    
    /*
    round:战斗最大回合数
    initiativeConfig:主动攻击者的战斗数据信息
    passivityConfig:被动攻击者的战斗数据信息
    */
    public SetBattleInfo(round:number,initiativeConfig:number,passivityConfig:number):void{
        this.mBattleSimulation.MaxRound = 15;
        this.mBattleSimulation.SetBattleConfig(eCampType.Initiative,1);
        this.mBattleSimulation.SetBattleConfig(eCampType.Passivity,2);
    }
    
    /*
    *获取到玩家的详细属性记录信息，并进行返回
    */
    public GetCampAttrRecord(campType:eCampType):RecordBase{
        let playerCamp:PlayerCamp = this.mBattleSimulation.GetPlayerCampInfo(campType);
        let attrObj:AttrCell = playerCamp.AttrObj;//获取到玩家的属性对象
        let retInitData:RecordInitData = {
            Camp: campType,
            BaseAttrs: attrObj.GetOriginAttrTable(),
            AdditionAttrs: attrObj.GetAddtionAttrTable(),
            FinalAttrs: attrObj.GetFinalAttrTable(),
            RecordType: eRecordType.InitData
        };
        return retInitData;
    }
    /*
    *触发并设置玩家开局Buff
    */
    public TriggerBuff(campType:eCampType,triggerType:eTriggerType):Array<RecordBase>{
        let trrigerArr:Array<IBuffObj> = new Array<IBuffObj>();
        buffProxy.TriggerEvent(this.mBattleSimulation.GetPlayerCampInfo(campType).BuffControlID,triggerType,undefined,trrigerArr);//对主动攻击的一方添加一个Buff
        let retRecord:Array<RecordBuffTrigger> = new Array<RecordBuffTrigger>();
        for(let cell of trrigerArr)
            retRecord.push({Camp: campType,BuffID: cell.BuffID,TriggerIndex: cell.ExecIndex,Attrs:cell.Attrs,RecordType: eRecordType.BuffTrigger,TriggerType:triggerType});
        return retRecord;
    }    

    public* StartSimulationBattle(){ 
        //开局之前首先初始化玩家的所有基础属性信息
        yield this.GetCampAttrRecord(eCampType.Initiative);
        yield this.GetCampAttrRecord(eCampType.Passivity); 
        //开始启用游戏的开局Buff
        yield this.TriggerBuff(eCampType.Initiative,eTriggerType.BattleStart);//触发战斗开始类型的
        yield this.TriggerBuff(eCampType.Passivity,eTriggerType.BattleStart);//触发战斗开始类型的
        //准备开始游戏回合
        let battleSimulationOver:boolean = false;
        for(let round = 1 ; round <= this.mBattleSimulation.MaxRound &&  !battleSimulationOver ; round++){
            //回合开始时，需要优先触发一次回合开启时的Buff
            yield this.TriggerBuff(eCampType.Initiative,eTriggerType.BattleStart);//触发战斗开始类型的
            yield this.TriggerBuff(eCampType.Passivity,eTriggerType.BattleStart);//触发战斗开始类型的
            //获取到回合出手玩家列表
            let playerArray:Array<Player> = this.mBattleSimulation.GetAllPlayer();
            while(playerArray.length != 0){
                //对玩家速度进行排序
                playerArray.sort((playerA:Player,playerB:Player)=> playerA.Camp.GetAttrByType(eAttrType.Speed) - playerB.Camp.GetAttrByType(eAttrType.Speed) );
                let attackPlayer:Player = playerArray.pop()!; 
                //攻击开始前
                yield this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.AttackFront);
                let attackCamp:PlayerCamp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Camp.CampType);
                let beAttackCamp:PlayerCamp = this.mBattleSimulation.GetPlayerCampInfo(attackPlayer.Enemy.Camp.CampType); 
                let harm:number = attackCamp.GetAttrByType(eAttrType.Attack) - beAttackCamp.GetAttrByType(eAttrType.Defense);  
                yield this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.HPChangeFront);  
                harm = harm <= 0 ? 0 : harm;//伤害不可以高于剩余最大生命值
                beAttackCamp.SetAttrByType( eAttrType.FinalHP,beAttackCamp.GetAttrByType(eAttrType.FinalHP) - harm);//修改玩家的血量 
                yield this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.HPChangeAfter); 
                yield this.TriggerBuff(attackPlayer.Camp.CampType,eTriggerType.AttackAfter);   

                //计算连击
                //计算暴击


                if(attackPlayer.Enemy.GetAttr(eAttrType.FinalHP) <= 0){
                    battleSimulationOver = true;
                    break;
                }
            } 
            yield this.TriggerBuff(eCampType.Initiative,eTriggerType.BattleStart);//触发战斗开始类型的
            yield this.TriggerBuff(eCampType.Passivity,eTriggerType.BattleStart);//触发战斗开始类型的
        }
        //let handle:Generator<Array<AttackType>, Array<AttackType> | undefined, unknown> = this.StartRound();
        //let result:IteratorResult<Array<AttackType>, Array<AttackType> | undefined>;
        //do{
        //    result = handle.next(); 
        //    for(let cell of result.value!)
        //        console.log(`第${cell.Round} ${cell.AttackName} 攻击 ${cell.BeAttackName} 造成 ${cell.Harm} 剩余血量:${cell.ResdiueHP}`);
        //}while(!result.done);//已经结束了的话
    }  
}