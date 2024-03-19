import { IMonsterStruct, MonsterConfig } from "../Work/OutputScript/Monster";
import { AttrCell } from "./Battle/AttrCell";
import { eAttrType, eCampType } from "./Battle/BattleDefine"; 
import { BuffProxy } from "./BuffProxy";
import { IBuffObj, eBuffType, eTriggerType } from "./Define";
let buffProxy:BuffProxy = new BuffProxy();

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
    private mMainPlayer:Player;//阵营主角
    private mPlayerArray:Array<Player> = new Array<Player>();//阵营玩家 
    private mBuffControlID:number;//每个阵营维护一个Buff
    private mAttrCell:AttrCell = new AttrCell();//阵营属性信息
    private mEnemyCamp:PlayerCamp;//敌人阵营

    public constructor(attrs:Array<{k:number,v:number}>,buffs:number[],name:string){
        this.mBuffControlID = buffProxy.GenBuffControl(this.mAttrCell);
        this.mAttrCell.InitAttr(attrs); 
        this.InsertPlayer(name);
        for(let cell of buffs){
            buffProxy.AddBuff(this.mBuffControlID,cell);
        }
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
};
 
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

//一个战斗模拟对象
class BattleSimulation{ 
    private mMaxRound:number = 0;//最大回合数
    private mPlayerCampArray:Array<PlayerCamp> = new Array<PlayerCamp>();//当前的所有玩家阵营

    private mRecordArray:Array<AttackType> = new Array<AttackType>();
    public SetMaxRound(round:number):void{
        this.mMaxRound = round;
    }
    //通过配置设置战斗角色的属性
    public SetBattleConfig(type:eCampType,battleID:number):void{
        let mosnterConfig:IMonsterStruct = MonsterConfig.GetData(battleID)!;
        this.SetBattleData(type,mosnterConfig.Attrs,mosnterConfig.Buffs,mosnterConfig.Name);
    }
    //通过属性设置战斗角色的属性
    public SetBattleData(type:eCampType,attrs:Array<{k:number,v:number}>,buffs:number[],name:string):void{
        this.mPlayerCampArray[type] = new PlayerCamp(attrs,buffs,name);
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
    private TriggerBothBuffEvent(triggerType:eTriggerType):Array<IBuffObj>{
        let retInfo:Array<IBuffObj> = new Array<IBuffObj>();//触发的同时，也会记录所有触发的详细数据信息
        buffProxy.TriggerEvent(this.mPlayerCampArray[eCampType.Initiative].BuffControlID,triggerType,undefined,retInfo);
        buffProxy.TriggerEvent(this.mPlayerCampArray[eCampType.Passivity].BuffControlID,triggerType,undefined,retInfo);
        return retInfo;
    }
    //开始一回合
    private* StartRound(){//返回值代表战斗是否结束
        this.TriggerBothBuffEvent(eTriggerType.BattleStart);//触发战斗开始类型的
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
                yield new AttackType(nowRound,attackPlayer.Name,attackPlayer.Enemy.Name,1,harm,attackPlayer.Enemy.GetAttr(eAttrType.FinalHP));
                if(attackPlayer.Enemy.GetAttr(eAttrType.FinalHP) <= 0)
                    return new AttackType(nowRound,attackPlayer.Name,attackPlayer.Enemy.Name,1,harm,attackPlayer.Enemy.GetAttr(eAttrType.FinalHP));
            }
        }
    }

    public InitEnemyCamp(){
        this.mPlayerCampArray[eCampType.Initiative].SetEnemyCamp(this.mPlayerCampArray[eCampType.Passivity]);
        this.mPlayerCampArray[eCampType.Passivity].SetEnemyCamp(this.mPlayerCampArray[eCampType.Initiative]);
    }
 
    public StartSimulation():void{ 
        this.InitEnemyCamp();
        let handle:Generator<AttackType, AttackType | undefined, unknown> = this.StartRound();
        let result:IteratorResult<AttackType, AttackType | undefined>;
        do{
            result = handle.next(); 
            console.log(`第${result.value?.Round} ${result.value?.AttackName} 攻击 ${result.value?.BeAttackName} 造成 ${result.value?.Harm} 剩余血量:${result.value?.ResdiueHP}`);
        }while(!result.done);//已经结束了的话
    }
};
 
//首先创建一个战斗模拟对象
let battleSimulation:BattleSimulation = new BattleSimulation()
battleSimulation.SetMaxRound(15);
battleSimulation.SetBattleConfig(eCampType.Initiative,1);
battleSimulation.SetBattleConfig(eCampType.Passivity,2);
battleSimulation.StartSimulation();//开始进行战斗模拟