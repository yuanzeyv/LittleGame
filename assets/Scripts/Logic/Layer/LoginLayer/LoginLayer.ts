import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { IServerInfoItem, LoginProxy } from '../../Proxy/LoginProxy/LoginProxy';
import { GetTextMeshComp } from '../../../Util/Util';
import { TextMeshLabel } from '../../../../../extensions/TextMesh Pro/assets/TextMesh';
import { Holder, ScrollAdapter } from '../../../Util/adapter'; 
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { _decorator, find, Label, Prefab, EventTouch,Node } from 'cc';
import { Cfg_MiniGameChoose, IMiniGameChooseStruct } from '../../../Config/Cfg_MiniGameChoose';
const {ccclass, property, type} = _decorator;
class MiniGameCellHodler extends Holder{
    private mBaseLayer:BaseLayer;
    private mData:IMiniGameChooseStruct;
    constructor(node: Node, code: string, adapter: ScrollAdapter,layerBase:BaseLayer) {
        super(node,code,adapter);
        this.mBaseLayer = layerBase;
    } 
    
    protected onCreated(): void {  
        this.mBaseLayer.RegisterButtonEvent( this.node,this.ExecuteButtonHandle,this);
    }
     
    protected onVisible(): void { 
        this.mData = this.data;
        find("Label",this.node).getComponent(Label).string = `${this.mData.Name}`;
    }
    protected onDisable(): void {  
    }  

    protected onDestory(): void {  
        this.mBaseLayer.UnregisterButtonClick(  this.node,this.ExecuteButtonHandle);
    }  
    
    protected ExecuteButtonHandle(){  
        console.log(`Node:${this.mData.Name}`); 
        _Facade.Send(eNotice.OnlyTheBraveOpen); 
        this.mBaseLayer.CloseWindow();//直接关闭游戏界面
    }
}    
 
@ccclass('LoginLayer')  
export class LoginLayer extends BaseLayer {    
    private mLoginButton:Node; 
    private mCheckVector:Node; 
    private mAgeButton:Node;  
    private mPhysicsButton:Node;  
    private mSelectMeshLabel:TextMeshLabel;
    private mScrollView:ScrollAdapter;

    private mMiniGameCellPrefab:Prefab;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.RefreshSelectServer,this.RefreshSelectServerHandle.bind(this)) 
    } 

    InitNode() { 
        this.mLoginButton = find("StartButton",this.node);
        this.mCheckVector = find("ServerVector",this.node); 
        this.mAgeButton = find("ageMin",this.node);
        this.mPhysicsButton = find("PhysicsButton",this.node);
        this.mSelectMeshLabel = GetTextMeshComp(find("ServerVector/ServerNameLabel",this.node))
        this.mScrollView = find("ScrollView",this.node).getComponent("ScrollAdapter") as ScrollAdapter;
        this.mScrollView.SetHolderGenHandle( (node: Node, code: string, adapter: ScrollAdapter)=>{
            return new MiniGameCellHodler(node,code,adapter,this); 
        });
        this.mMiniGameCellPrefab = _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/LoginLayer/Prefab/Comp/MiniGameSelectCell",Prefab);
        this.mScrollView.PrefabGenHandle = (data:any)=>{
            return this.mMiniGameCellPrefab;
        }
    }  
          
    InitData() {    
        this.RegisterButtonEvent(this.mLoginButton,this.LoginButtonHandle,this);  
        this.RegisterButtonEvent(this.mCheckVector,this.CheckServerListHandle,this);  
        this.RegisterButtonEvent(this.mAgeButton,this.AgeHandle,this,1,2,3,4,5);    
        this.RegisterButtonEvent(this.mPhysicsButton,this.PhysicsLayerOpenHandle,this,1,2,3,4,5);    
    } 


    InitLayer() {  
    } 
    protected onClose(): void { 
        this.mScrollView.modelManager.releaseAll();//释放所有的游戏元素
    }
    protected OpenLayer(): void {
        this.RefreshScrollView();
    }

    protected RefreshScrollView():void{ 
        this.mScrollView.modelManager.insert(Cfg_MiniGameChoose.GetDatas());//插入本列表 
    }
   
    private CheckServerListHandle(eventTouch:EventTouch){    
        _Facade.Send(eNotice.MultPanleOpen,11);   
//        _Facade.FindProxy(NetProxy).Send(eNetProtocol.QuaryServerList,{}); 
        //_Facade.Send(eNotice.TipsShow,"准备登入服务器");
    }    
    private AgeHandle(eventTouch:EventTouch,a,b,c,d){    
        _Facade.Send(eNotice.TipsShow,`准备登入服务器 ${a} ${b} ${c}`);
        _Facade.Send(eNotice.MultPanleOpen,2);
    }    
    private PhysicsLayerOpenHandle(eventTouch:EventTouch,a,b,c,d){     
        this.mScrollView.modelManager.insert(Cfg_MiniGameChoose.GetDatas());//插入本列表 
    }     
      
    private LoginButtonHandle(eventTouch:EventTouch){ 
        _Facade.Send(eNotice.CheatPokerLayerOpen);
        //let selectServer:IServerInfoItem = _Facade.FindProxy(LoginProxy).GetSelectServer();
        //if(selectServer == undefined){
        //    _Facade.Send(eNotice.TipsShow,`未选择登陆服务器`);
        //    return;
        //} 
        //_Facade.FindProxy(LoginProxy).CS_GateVirifyLogin("123456","123456",selectServer.serverName);
        //_Facade.FindProxy(NetProxy).Connect();//准备连接  
    }  

    private RefreshSelectServerHandle(eventTouch:EventTouch){    
        let selectServer:IServerInfoItem|undefined = _Facade.FindProxy(LoginProxy).GetSelectServer();
        this.mSelectMeshLabel.string = "请选择服务器";
        if(selectServer != undefined) 
            this.mSelectMeshLabel.string = selectServer.serverName;
    }  
}   