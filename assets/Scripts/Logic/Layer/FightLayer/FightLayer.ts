import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { _decorator, EventTouch, find , Node, NodePool, Widget } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer'; 
import { FightAttrScrollView } from './FightAttrScrollView';
import { eCampType } from '../../Proxy/FightProxy/Define/CampDefine';
import { BattleCamp } from './BattleCamp';
import { RecordAttack, RecordAttackMoveTo, RecordAttrUpdate, RecordBuffInsert, RecordInitData, RecordRoundChange, RecordSuckBlood } from '../../Proxy/FightProxy/Define/RecordDefine';
import { TextMeshLabel } from '../../../../../extensions/TextMesh Pro/assets/TextMesh/label/TextMeshLabel';
import { GetTextMeshComp } from '../../../Util/Util';
import { PoolProxy } from '../../Proxy/PoolProxy/PoolProxy';
import { ePoolDefine } from '../../Proxy/PoolProxy/PoolDefine';
import { eAttrType } from '../../Proxy/FightProxy/Define/AttrDefine';
export class FightLayer extends BaseLayer { 
    private mDynaicBG:Node;
    private mFightPanelNode:Node;//角色战斗层级节点
    private mSelfAttrsCheckBtn:Node;//获取到自己属性界面的显示按钮
    private mEnemyAttrsCheckBtn:Node;//获取到敌人属性界面的显示按钮
    private mRoundLabel:TextMeshLabel//战斗回合数节点

    private mBattleCampMap:Map<eCampType,BattleCamp> = new Map<eCampType,BattleCamp>(); 
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.FightAttrInit,this.FightAttrInitHandle.bind(this));
        //executeMap.set(eNotice.UpdateCampAttrs,this.UpdateCampAttrsHandle.bind(this));
        executeMap.set(eNotice.BattleRoundChange,this.BattleRoundChangeHandle.bind(this));
        executeMap.set(eNotice.InsertCampBuff,this.InsertCampBuffHandle.bind(this)); 
        executeMap.set(eNotice.PlayerMoveTo,this.PlayerMoveToHandle.bind(this));
        executeMap.set(eNotice.PlayerAttack,this.PlayerAttackHandle.bind(this));
        executeMap.set(eNotice.PlayerBuffTrigger,this.PlayerBuffTriggerHandle.bind(this));
        executeMap.set(eNotice.BattleAttrUpdate,this.BattleAttrUpdateHandle.bind(this));
        executeMap.set(eNotice.PlayerAttackSuckBlood,this.PlayerAttackSuckBloodHandle.bind(this));
        
    } 
    
    InitNode() {  
        this.mDynaicBG = find("DynamicBackGround",this.node);
        this.mFightPanelNode = find("CenterNode/FightPanel",this.node);
        this.mSelfAttrsCheckBtn = find("CenterNode/NameGroup/NameLabel_0/CheckAttrBtn",this.node);
        this.mEnemyAttrsCheckBtn = find("CenterNode/NameGroup/NameLabel_1/CheckAttrBtn",this.node);
        this.mRoundLabel = GetTextMeshComp(find("CenterNode/RoundLabel",this.node));
    } 
    
    
    InitData(data:any) {     
        //获取到信息
        this.RegisterButtonEvent(this.mDynaicBG,this.CloseLayerHandle,this); 
        this.RegisterButtonEvent(this.mSelfAttrsCheckBtn,this.CheckAttrPanel,this,eCampType.Initiative); 
        this.RegisterButtonEvent(this.mEnemyAttrsCheckBtn,this.CheckAttrPanel,this,eCampType.Passivity); 
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }     
    
    private CheckAttrPanel(event: EventTouch,camp:eCampType){ 
        this.GetCampAttrsScrollView(camp).node.active = !this.GetCampAttrsScrollView(camp).node.active;
    } 
    
    //获取到阵营的属性检查面板
    private GetCampAttrsScrollView(campType:eCampType):FightAttrScrollView{ 
        let node:Node = find(`CenterNode/AttrCheckPanel/AttrListView_${campType}`,this.node);
        return node.getComponent(FightAttrScrollView);
    } 

    
    InitLayer() {  
    }            
       
    onClose():void{      
        for(let cell of this.mBattleCampMap) 
            cell[1].Destory();
    }

    private CloseLayerHandle(){
        _Facade.Send(eNotice.CloseFightLayer);
    }

    //属性初始化函数
    private FightAttrInitHandle(recordInitData:RecordInitData){
        //生成一个玩家阵营
        let camp:BattleCamp = new BattleCamp( recordInitData.Camp );
        this.mBattleCampMap.set(recordInitData.Camp,camp);//设置阵营信息
        //设置玩家阵营所需要的节点信息
        camp.SetFightNode(this.mFightPanelNode); 
        camp.SetPlayerAttrView(this.GetCampAttrsScrollView(recordInitData.Camp))
        camp.SetNameLabel(GetTextMeshComp(find(`CenterNode/NameGroup/NameLabel_${recordInitData.Camp}`,this.node)));
        //设置阵营的数据信息
        camp.SetCampName(recordInitData.Name);

        //插入玩家
        camp.InsertPlayer("1001"); 
        //事件执行完成消息通知 
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }   
    
    //战斗回合数改变时
    private BattleRoundChangeHandle(recordBase:RecordRoundChange){
        this.mRoundLabel.string = `${recordBase.Round}/15`
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }
    //插入一个阵营Buff时
    private InsertCampBuffHandle(recordBase:RecordBuffInsert){
        find(`CenterNode/BuffCheckPanel/BuffView_${recordBase.Camp}`,this.node).addChild(_Facade.FindProxy(PoolProxy).Get(ePoolDefine.BuffMiniCell));
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }
    //玩家进行移动时
    private PlayerMoveToHandle(recordBase:RecordAttackMoveTo){
        this.mBattleCampMap.get(recordBase.Camp).MovePlayer(recordBase.PosX,()=>{
            _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
        });//设置阵营玩家进行移动，移动完成后将发起通知
    }
    private PlayerAttackHandle(recordBase:RecordAttack){
        this.mBattleCampMap.get(recordBase.AttackCamp).PlayerAttack(recordBase.AttackType,recordBase.IsCircle,recordBase.IsMiss,recordBase.Harm,this.mBattleCampMap.get(recordBase.BeAttackCamp),()=>{
            _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
        }); 
    }

    private PlayerBuffTriggerHandle(recordBase:RecordAttack){
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }

    private BattleAttrUpdateHandle(recordBase:RecordAttrUpdate){
        let camp:BattleCamp  = this.mBattleCampMap.get(recordBase.Camp);
        camp.UpdateListViewAttr(recordBase.AttrKey);
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息 
    } 

    private PlayerAttackSuckBloodHandle(recordBase:RecordSuckBlood){
        this.mBattleCampMap.get(recordBase.AttackCamp).PlayerAttackSuckBlood(recordBase.Attrs[eAttrType.SumFinalHP] || 0,()=>{
            _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息 
        });
    }

}        