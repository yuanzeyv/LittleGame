import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { _decorator, EventTouch, find , Node } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer'; 
import { SpineMediator } from '../../Proxy/SkeletonProxy/Const/SpineMediator';  
import { FightAttrScrollView } from './FightAttrScrollView';
import { eCampType } from '../../Proxy/FightProxy/Define/CampDefine';
import { BattleCamp } from './BattleCamp';
import { RecordAttack, RecordAttackMoveTo, RecordBuffInsert, RecordInitData, RecordRoundChange } from '../../Proxy/FightProxy/Define/RecordDefine';
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
        executeMap.set(eNotice.BattleRoundChange,this.BattleRoundChangeHandle);
        executeMap.set(eNotice.InsertCampBuff,this.InsertCampBuffHandle); 
        executeMap.set(eNotice.PlayerMoveTo,this.PlayerMoveToHandle);
        executeMap.set(eNotice.PlayerAttack,this.PlayerAttackHandle);
    } 
    
    InitNode() {  
        this.mDynaicBG = find("DynamicBackGround",this.node);
        this.mFightPanelNode = find("CenterNode/FightPanel",this.node);
        this.mSelfAttrsCheckBtn = find("CenterNode/NameGroup/NameLabel_0/CheckAttrBtn",this.node);
        this.mEnemyAttrsCheckBtn = find("CenterNode/NameGroup/NameLabel_1/CheckAttrBtn",this.node);
        this.mRoundLabel = find("CenterNode/RoundLabel").getComponent(TextMeshLabel);
    } 
    
    
    InitData(data:any) {    
        //this.mFightConfigArray.set(eCampType.Initiative,BuffConfig.GetData(1)); 
        //this.mFightConfigArray.set(eCampType.Passivity,BuffConfig.GetData(2));

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
        //_Facade.FindProxy(SkeletonProxy).RecycleSpineEffect(this.mheroSpineMediator);
    }

    private CloseLayerHandle(){
        _Facade.Send(eNotice.CloseFightLayer);
    }

    //属性初始化函数
    private FightAttrInitHandle(recordInitData:RecordInitData){
        let camp:BattleCamp = new BattleCamp(
            recordInitData.Camp,
            this.mFightPanelNode,
            this.GetCampAttrsScrollView(recordInitData.Camp)
        )
        this.mBattleCampMap.set(recordInitData.Camp,camp);//设置阵营信息
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }   
    //战斗回合数改变时
    private BattleRoundChangeHandle(recordBase:RecordRoundChange){
        this.mRoundLabel.string = `${recordBase.Round}/15`
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }
    //插入一个阵营Buff时
    private InsertCampBuffHandle(recordBase:RecordBuffInsert){
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }
    //玩家进行移动时
    private PlayerMoveToHandle(recordBase:RecordAttackMoveTo){
        this.mBattleCampMap.get(recordBase.Camp)//设置阵营玩家进行移动，移动完成后将发起通知
        _Facade.Send(eNotice.FightEventExecuteFinish);//发送一个处理完毕消息
    }
    private PlayerAttackHandle(recordBase:RecordAttack){
    }

}       
 