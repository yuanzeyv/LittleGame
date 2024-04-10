import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global"; 
import { eNotice } from "../../../NotificationTable"; 
import { ePoolDefine } from "../PoolProxy/PoolDefine";
import { PoolProxy } from "../PoolProxy/PoolProxy";
import { SkeletonNodePool } from "../SkeletonProxy/NodePool/SkeletonNodePool";
import { PlayerCamp } from "./PlayerCamp";  
import { eAttrType } from "./Define/AttrDefine";
import { eCampType } from "./Define/CampDefine";
import { RecordBase, eRecordType, RecordInitData, RecordBuffInsert, RecordRoundChange, RecordAttackMoveTo, RecordAttack, RecordBuffTrigger, RecordAttrUpdate, RecordSuckBlood } from "./Define/RecordDefine";
import { BuffIconNodePool } from "./NodePool/BuffIconNodePool/BuffIconNodePool";
import { FightNodeLabel } from "./NodePool/BuffIconNodePool/FightNodeLabel";
export class FightProxy extends BaseProxy{
    static get ProxyName():string { return "FightProxy" };
    private mRecordQueue:Array<RecordBase>|undefined;
    private mCampMap:Map<eCampType,PlayerCamp> = new Map<eCampType,PlayerCamp>();
    private mBattleLimitRound:number = 0;
    private mBattleRound:number = 0;
    private mRunIndex:number = 0;
    public onLoad(): void {
    }  

    public StartBattle(){
        this.mRecordQueue = JSON.parse(`[{"RecordType":0,"Camp":0,"Attrs":{"0":800,"3":20,"6":300,"9":5000,"12":5000,"18":5000,"36":5000,"42":5000,"100":800,"101":20,"102":5000,"103":300,"104":5000,"106":5000,"108":5000,"114":5000,"116":5000},"Name":"杨佳欣"},{"RecordType":0,"Camp":1,"Attrs":{"0":600,"3":300,"6":300,"9":5000,"12":5000,"18":5000,"24":5000,"100":600,"101":300,"102":5000,"103":300,"104":5000,"106":5000,"108":5000,"110":5000},"Name":"袁泽宇"},{"RecordType":4,"Camp":0,"BuffID":0,"BuffKey":1,"Life":0},{"RecordType":4,"Camp":0,"BuffID":1,"BuffKey":17,"Life":0},{"RecordType":4,"Camp":1,"BuffID":0,"BuffKey":3,"Life":0},{"RecordType":5,"BuffKey":1,"TriggerType":0,"Camp":0,"BuffID":0,"TriggerIndex":0,"Attrs":{"1":10000}},{"Camp":0,"AttrKey":100,"AttrValue":1600,"RecordType":6},{"RecordType":3,"Round":1},{"RecordType":1,"Camp":1,"PosX":350},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":true,"BeAttackCamp":0,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"RecordType":5,"BuffKey":17,"TriggerType":4,"Camp":0,"BuffID":1,"TriggerIndex":0,"Attrs":{"1":10000}},{"Camp":0,"AttrKey":100,"AttrValue":2400,"RecordType":6},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":true,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":0},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":2},{"RecordType":1,"Camp":1,"PosX":350},{"Camp":0,"AttrKey":104,"AttrValue":4420,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":true,"BeAttackCamp":1,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":3},{"RecordType":1,"Camp":1,"PosX":350},{"Camp":0,"AttrKey":104,"AttrValue":3840,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":true,"BeAttackCamp":1,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":4},{"RecordType":1,"Camp":1,"PosX":350},{"Camp":0,"AttrKey":104,"AttrValue":3260,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":true,"BeAttackCamp":1,"Harm":0,"RecordType":2,"AttackType":0},{"Camp":0,"AttrKey":104,"AttrValue":2680,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":3},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":5},{"RecordType":1,"Camp":1,"PosX":350},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":true,"BeAttackCamp":0,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":true,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":0},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":true,"BeAttackCamp":1,"Harm":0,"RecordType":2,"AttackType":2},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":6},{"RecordType":1,"Camp":1,"PosX":350},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":true,"BeAttackCamp":0,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":true,"BeAttackCamp":1,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":7},{"RecordType":1,"Camp":1,"PosX":350},{"Camp":0,"AttrKey":104,"AttrValue":2100,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":0},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":true,"BeAttackCamp":0,"Harm":0,"RecordType":2,"AttackType":3},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":8},{"RecordType":1,"Camp":1,"PosX":350},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":true,"BeAttackCamp":0,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":true,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":0},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":9},{"RecordType":1,"Camp":1,"PosX":350},{"Camp":0,"AttrKey":104,"AttrValue":1520,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":true,"BeAttackCamp":1,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":10},{"RecordType":1,"Camp":1,"PosX":350},{"Camp":0,"AttrKey":104,"AttrValue":940,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":0},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":true,"BeAttackCamp":0,"Harm":0,"RecordType":2,"AttackType":3},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":11},{"RecordType":1,"Camp":1,"PosX":350},{"Camp":0,"AttrKey":104,"AttrValue":360,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":true,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":0},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":2},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":3,"Round":12},{"RecordType":1,"Camp":1,"PosX":350},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":true,"BeAttackCamp":0,"Harm":0,"RecordType":2,"AttackType":0},{"RecordType":1,"Camp":1,"PosX":-350},{"RecordType":1,"Camp":0,"PosX":350},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳欣","BeAttackName":"袁泽宇","IsCircle":false,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":0},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"Camp":1,"AttrKey":104,"AttrValue":2900,"RecordType":6},{"AttackCamp":0,"AttackName":"杨佳 欣","BeAttackName":"袁泽宇","IsCircle":true,"IsMiss":false,"BeAttackCamp":1,"Harm":2100,"RecordType":2,"AttackType":2},{"Camp":1,"AttrKey":104,"AttrValue":5000,"RecordType":6},{"RecordType":8,"AttackCamp":0,"AttackName":"杨佳欣","Attrs":{"104":2100},"ResidueHP":5000},{"Camp":0,"AttrKey":104,"AttrValue":-220,"RecordType":6},{"AttackCamp":1,"AttackName":"袁泽宇","BeAttackName":"杨佳欣","IsCircle":false,"IsMiss":false,"BeAttackCamp":0,"Harm":580,"RecordType":2,"AttackType":3},{"RecordType":1,"Camp":0,"PosX":-350},{"RecordType":7,"Camp":0,"Result":1},{"RecordType":7,"Camp":1,"Result":-1}]`);
        this.mRunIndex = 0;
        _Facade.Send(eNotice.OpenFightLayer);//发送一个打开战斗界面的消息通知
        //之后战斗界面会不停的取战报数据进行界面下的播报
        //本系统也会对当前战斗的数据进行存储，并配合战斗界面进行界面的效果展示
    }
    //游戲運行流程
    /*
    //初始化事件
    1:初始化玩家的屬性（InitAttrs） 
        1-1：初始化玩家阵营
        1-2：初始化玩家属性
        1-3: 初始化玩家姓名
    2:执行Buff插入事件，向玩家插入初始化时携带的Buff数据信息（BuffInsert）

    //回合攻击消息
    1:收到回合变动消息，进行回合数的界面刷新消息。（RoundChange）
    2:收到玩家移动消息，通知玩家向指定位置进行移动。（AttackMoveTo）
    3:移动结束后，收到攻击消息，由玩家发起攻击(Attack)
        3-1:获取到打击技能，并进行技能的施法播放
        3-2:获取到敌对阵营信息，准备对敌对阵营头目进行打击
        3-3:获取到打击阵营信息，确定发起攻击玩家的详细信息
        3-4:判断此次攻击是否触发了暴击
        3-5:判断此次攻击是否触发了闪避
        3-6:获取到当前阵营的攻击类型，确定应该使用什么来播放当前的攻击特效 


        
    */
    public NoticeEventFinish(){
        let recordBase:RecordBase|undefined = this.mRecordQueue[this.mRunIndex++];//获取到当前待执行的队列数据
        if(recordBase == undefined)
            return
        if(recordBase.RecordType == eRecordType.InitAttrs){
            let initAttrsRecordBase:RecordInitData = recordBase as RecordInitData;
            this.mCampMap.set(initAttrsRecordBase.Camp,new PlayerCamp(initAttrsRecordBase.Camp,initAttrsRecordBase.Attrs,initAttrsRecordBase.Name));
            //向外部发送阵营初始化成功的消息，此时，玩家可以获取到对应的阵营属性信息
            _Facade.Send(eNotice.FightAttrInit,recordBase);
        } else if( recordBase.RecordType == eRecordType.BuffInsert){
            let buffInsertRecordBase:RecordBuffInsert = recordBase as RecordBuffInsert;
            this.mCampMap.get(buffInsertRecordBase.Camp).InsertBuff(buffInsertRecordBase.BuffID,buffInsertRecordBase.BuffKey,buffInsertRecordBase.Life);
            _Facade.Send(eNotice.InsertCampBuff,recordBase);//插入一个阵营Buff
        } else if(recordBase.RecordType == eRecordType.RoundChange ){//通知玩家回合数变动
            let recordRoundChange:RecordRoundChange = recordBase as RecordRoundChange;
            this.mBattleRound = recordRoundChange.Round;
            _Facade.Send(eNotice.BattleRoundChange,recordRoundChange);
        } else if ( recordBase.RecordType == eRecordType.AttackMoveTo ) {//通知阵营玩家进行移动
            let recordAttackMoveTo:RecordAttackMoveTo = recordBase as RecordAttackMoveTo;
            _Facade.Send(eNotice.PlayerMoveTo,recordAttackMoveTo);
        } else if ( recordBase.RecordType == eRecordType.Attack ){//通知玩家进行攻击
            let recordAttack:RecordAttack = recordBase as RecordAttack;
            _Facade.Send(eNotice.PlayerAttack,recordAttack);
        } else if ( recordBase.RecordType == eRecordType.SuckBlood ){//通知玩家进行攻击
            let RecordSuckBlood:RecordSuckBlood = recordBase as RecordSuckBlood;
            _Facade.Send(eNotice.PlayerAttackSuckBlood,RecordSuckBlood);
        } else if ( recordBase.RecordType == eRecordType.BuffTrigger ){//通知玩家触发了一个Buff
            let recordBuffTrigger:RecordBuffTrigger = recordBase as RecordBuffTrigger;
            _Facade.Send(eNotice.PlayerBuffTrigger,recordBuffTrigger);
        } else if ( recordBase.RecordType == eRecordType.AttrUpdate ){//通知玩家触发了一个Buff
            let recordAttrUpdate:RecordAttrUpdate = recordBase as RecordAttrUpdate;
            this.mCampMap.get(recordAttrUpdate.Camp).UpdateAttr(recordAttrUpdate.AttrKey,recordAttrUpdate.AttrValue);
            _Facade.Send(eNotice.BattleAttrUpdate,recordAttrUpdate);
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
        let camp:PlayerCamp|undefined = this.mCampMap.get(campType);
        return camp != undefined ?camp.GetAttr(attrType):0; 
    }

     
    public InitNodePool():void{ 
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.BuffMiniCell,new BuffIconNodePool("LayerSource/FightLayer/Comp/BuffCell/BuffCell"));
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.FightBlueLabel      ,new FightNodeLabel("LayerSource/Basics/Prefab/EffectFont/BlueLabel"));
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.FightGreenLabel     ,new FightNodeLabel("LayerSource/Basics/Prefab/EffectFont/GreenLabel"));
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.FightGreenGrassLabel,new FightNodeLabel("LayerSource/Basics/Prefab/EffectFont/GreenGrassLabel"));
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.FightOrangeLabel    ,new FightNodeLabel("LayerSource/Basics/Prefab/EffectFont/OrangeLabel"));
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.FightRedLabel       ,new FightNodeLabel("LayerSource/Basics/Prefab/EffectFont/RedLabel")); 
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.FightYellowLabel    ,new FightNodeLabel("LayerSource/Basics/Prefab/EffectFont/YellowLabel"));
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.FightWhiteLabel     ,new FightNodeLabel("LayerSource/Basics/Prefab/EffectFont/WhiteLabel"));
    } 
}    