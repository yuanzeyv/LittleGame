import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global"; 
import { eNotice } from "../../../NotificationTable"; 
import { Camp } from "./Camp";  
import { eAttrType } from "./Define/AttrDefine";
import { eCampType } from "./Define/CampDefine";
import { RecordBase, eRecordType, RecordInitData, RecordBuffInsert, RecordRoundChange, RecordAttackMoveTo, RecordAttack } from "./Define/RecordDefine";
export class FightProxy extends BaseProxy{
    static get ProxyName():string { return "FightProxy" };
    private mRecordQueue:Array<RecordBase>|undefined;
    private mCampMap:Map<eCampType,Camp> = new Map<eCampType,Camp>();
    private mBattleLimitRound:number = 0;
    private mBattleRound:number = 0;
    private mRunIndex:number = 0;
    public onLoad(): void {
    }  

    public StartBattle(){
        this.mRecordQueue = JSON.parse(`[{"RecordType":0,"Camp":0,"Attrs":{"0":800,"3":20,"6":300,"9":5000,"50":800,"51":20,"52":5000,"53":300,"54":5000}},{"RecordType":0,"Camp":1,"Attrs":{"0":600,"3":300,"6":300,"9":5000,"50":600,"51":300,"52":5000,"53":300,"54":5000}},{"RecordType":4,"Camp":0,"BuffID":0,"BuffKey":1,"Life":0},{"RecordType":4,"Camp":0,"BuffID":1,"BuffKey":17,"Life":0},{"RecordType":4,"Camp":1,"BuffID":0,"BuffKey":3,"Life":0},{"RecordType":5,"BuffKey":1,"TriggerType":0,"Camp":0,"BuffID":0,"TriggerIndex":0,"Attrs":{"1":10000}},{"Camp":0,"AttrKey":50,"AttrValue":1600,"RecordType":6,"AttrChangeValue":800},{"RecordType":3,"Round":1},{"RecordType":1,"Camp":1,"PosX":350},{"RecordType":5,"BuffKey":17,"TriggerType":4,"Camp":0,"BuffID":1,"TriggerIndex":0,"Attrs":{"1":10000}},{"Camp":0,"AttrKey":50,"AttrValue":2400,"RecordType":6,"AttrChangeValue":800},{"AttackCamp":1,"BeAttackCamp":0,"Attrs":{"54":580},"ResidueHP":4420,"RecordType":2},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"BeAttackCamp":1,"Attrs":{"54":2100},"ResidueHP":2900,"RecordType":2},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":2},{"RecordType":1,"Camp":1,"PosX":350},{"AttackCamp":1,"BeAttackCamp":0,"Attrs":{"54":580},"ResidueHP":3840,"RecordType":2},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"BeAttackCamp":1,"Attrs":{"54":2100},"ResidueHP":800,"RecordType":2},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":3},{"RecordType":1,"Camp":1,"PosX":350},{"AttackCamp":1,"BeAttackCamp":0,"Attrs":{"54":580},"ResidueHP":3260,"RecordType":2},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"BeAttackCamp":1,"Attrs":{"54":2100},"ResidueHP":-1300,"RecordType":2},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":7,"Camp":1,"Result":-1},{"RecordType":7,"Camp":0,"Result":1}]`);
        _Facade.Send(eNotice.OpenFightLayer);//发送一个打开战斗界面的消息通知
        //之后战斗界面会不停的取战报数据进行界面下的播报
        //本系统也会对当前战斗的数据进行存储，并配合战斗界面进行界面的效果展示
    }
 
    public NoticeEventFinish(){
        let recordBase:RecordBase = this.mRecordQueue[this.mRunIndex++];//获取到当前待执行的队列数据
        if(recordBase.RecordType == eRecordType.InitAttrs){
            let initAttrsRecordBase:RecordInitData = recordBase as RecordInitData;
            this.mCampMap.set(initAttrsRecordBase.Camp,new Camp(initAttrsRecordBase.Camp,initAttrsRecordBase.Attrs));
            //向外部发送阵营初始化成功的消息，此时，玩家可以获取到对应的阵营属性信息
            _Facade.Send(eNotice.FightAttrInit,recordBase);
        } else if( recordBase.RecordType == eRecordType.BuffInsert){
            let buffInsertRecordBase:RecordBuffInsert = recordBase as RecordBuffInsert;
            this.mCampMap.get(buffInsertRecordBase.Camp).InsertBuff(buffInsertRecordBase.BuffID,buffInsertRecordBase.BuffKey,buffInsertRecordBase.Life);
            _Facade.Send(eNotice.InsertCampBuff,recordBase);//插入一个阵营Buff
        } else if(recordBase.RecordType == eRecordType.RoundChange ){//通知玩家回合数变动
            let recordRoundChange:RecordRoundChange = recordBase as RecordRoundChange;
            this.mBattleRound = recordRoundChange.Round;
            _Facade.Send(eNotice.BattleRoundChange);
        } else if ( recordBase.RecordType == eRecordType.AttackMoveTo ) {//通知阵营玩家进行移动
            let recordAttackMoveTo:RecordAttackMoveTo = recordBase as RecordAttackMoveTo;
            _Facade.Send(eNotice.PlayerMoveTo,recordAttackMoveTo);
        } else if ( recordBase.RecordType == eRecordType.Attack ){//通知玩家进行攻击
            let recordAttack:RecordAttack = recordBase as RecordAttack;
            _Facade.Send(eNotice.PlayerAttack,recordAttack);
        }
    }
    //获取到战斗回合数
    public GetFightRound():number{
        return this.mBattleRound;
    }
    
    //获取到战斗最大回合数
    public GetFightLimitRound():number{
        return this.mBattleLimitRound;
    }

    //将攻击分为3个阶段，开始攻击， 
    public GetCampAttr(campType:eCampType,attrType:eAttrType):number{
        let camp:Camp|undefined = this.mCampMap.get(campType);
        return camp != undefined ?camp.GetAttr(attrType):0; 
    }
}