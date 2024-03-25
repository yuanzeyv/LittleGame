import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { _decorator, EventTouch, find , Node } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer'; 
import { SpineMediator } from '../../Proxy/SkeletonProxy/Const/SpineMediator';
import { BuffConfig, IBuffStruct } from '../../../Config/Cfg_Buff';
import { Camp, eCampType } from './Camp';
import { RecordInitData } from './Define/RecordDefine';
export class FightLayer extends BaseLayer {  
    private mIsReverse:boolean = false;
    private mDynaicBG:Node;
    private mFightPanelNode:Node;//角色战斗层级节点
    private mSelfAttrsCheckBtn:Node;//获取到自己属性界面的显示按钮
    private mEnemyAttrsCheckBtn:Node;//获取到敌人属性界面的显示按钮

    
    private mFightConfigMap:Map<eCampType,Camp> = new Map<eCampType,Camp>()

    private mheroSpineMediator:SpineMediator;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.FightAttrInit,this.FightAttrInitHandle);
    } 
    
    InitNode() {  
        this.mDynaicBG = find("DynamicBackGround",this.node);
        this.mFightPanelNode = find("CenterNode/FightPanel",this.node);
        this.mSelfAttrsCheckBtn = find("CenterNode/NameGroup/MyName/CheckAttrBtn",this.node);
        this.mEnemyAttrsCheckBtn = find("CenterNode/NameGroup/EnemyName/CheckAttrBtn",this.node);
    } 
    
    InitData(data:any) {    
        //this.mFightConfigArray.set(eCampType.Initiative,BuffConfig.GetData(1)); 
        //this.mFightConfigArray.set(eCampType.Passivity,BuffConfig.GetData(2));

        //获取到信息
        this.RegisterButtonEvent(this.mDynaicBG,this.CloseLayerHandle,this); 
        this.RegisterButtonEvent(this.mSelfAttrsCheckBtn,this.CheckAttrPanel,this,false); 
        this.RegisterButtonEvent(this.mEnemyAttrsCheckBtn,this.CheckAttrPanel,this,true); 
    }     
    
    private CheckAttrPanel(event: EventTouch,isEnemy:boolean){ 
        let name:string = isEnemy?"EnemyAttrListView":"SelfAttrListView";
        let node:Node = find(`CenterNode/AttrCheckPanel/${name}`,this.node);
        node.active = !node.active;
    } 

    
    InitLayer() { 
        //解析游戏信息   
        new Camp(eCampType.Initiative,this.mFightPanelNode).InsertPlayer("1001",true);
        new Camp(eCampType.Passivity,this.mFightPanelNode).InsertPlayer("Daoshi",true); 
    }            
       
    onClose():void{      
        //_Facade.FindProxy(SkeletonProxy).RecycleSpineEffect(this.mheroSpineMediator);
    }

    private CloseLayerHandle(){
        _Facade.Send(eNotice.CloseFightLayer);
    }

    //属性初始化函数
    private FightAttrInitHandle(recordInitData:RecordInitData){
        this.mFightConfigMap.set(recordInitData.Camp,new Camp(recordInitData.Camp,this.mFightPanelNode));
    }
}       