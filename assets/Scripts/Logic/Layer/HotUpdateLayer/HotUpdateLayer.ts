import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { NetProxy } from '../../Proxy/NetProxy/NetProxy';
import { HotUpdateStateMachine } from './HotUpdateStateMachine/HotUpdateStateMachine';
import { eHotUpdateStatus } from './HotUpdateStatus';
import { NATIVE } from 'cc/env';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { IdleStatusMachine } from './HotUpdateStateMachine/IdleStatusMachine';
import { ExecuteCheckVersionStateMachine } from './HotUpdateStateMachine/ExecuteCheckVersionStateMachine'; 
import { CheckVersionFinishStateMachine } from './HotUpdateStateMachine/CheckVersionFinishStateMachine';
import { HotUpdateProgressStateMachine } from './HotUpdateStateMachine/HotUpdateProgressStateMachine';
import { HotUpdateFailStateMachine } from './HotUpdateStateMachine/HotUpdateFailStateMachine';
import { HotUpdateFinishStateMachine } from './HotUpdateStateMachine/HotUpdateFinishStateMachine';
import { SkipHotUpdateStateMachine } from './HotUpdateStateMachine/SkipHotUpdateStateMachine';
const {ccclass, property, type} = _decorator;  
@ccclass('HotUpdateLayer')
export class HotUpdateLayer extends BaseLayer { 
    private mLoginButton:Node;//登录按钮
    private mHotButton:Node;//热更按钮
    private mCheckVector:Node;//点击服务器按钮
    private mTestbutton:Node;//测试按钮

    private mTotalBar:ProgressBar;//总进度滑动条
    private mTotalLabel:Label;//总进度文本

    private mFileBar:ProgressBar;//文件进度滑动条
    private mFileLabel:Label;//文件进度文本

    private mHotStatusLabel:Label;
    private mHotByteSizeLabel:Label;
    //热更区域
    private mAssetsManager:native.AssetsManager = null!;         
    private mHotUpdateStateMachine:HotUpdateStateMachine;//当前的热更状态机
    private mHotUpdateStateMachineMap:Map<eHotUpdateStatus,HotUpdateStateMachine> = new Map<eHotUpdateStatus,HotUpdateStateMachine>();

    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
    } 
    
    InitNode() {
        this.mLoginButton = find("StartButton",this.node);
        this.mHotButton = find("HotButton",this.node);
        this.mCheckVector = find("ServerVector",this.node);  
        this.mTestbutton = find("Testbutton",this.node);  

        this.mTotalBar = find("TotalProgressBar",this.node).getComponent(ProgressBar);  
        this.mFileBar = find("FileProgressBar",this.node).getComponent(ProgressBar);  

        this.mTotalLabel = find("TotalProgressBar/Label",this.node).getComponent(Label);  
        this.mFileLabel = find("FileProgressBar/Label",this.node).getComponent(Label);  

        this.mHotByteSizeLabel = find("HotByteSizeLabel",this.node).getComponent(Label);  
        this.mHotStatusLabel = find("HotStatusLabel",this.node).getComponent(Label);
    }
    
    InitData() {  
        this.RegisterButtonEvent(this.mLoginButton,this.LoginHandle,this);
        this.RegisterButtonEvent(this.mHotButton,this.HotHandle,this); 
        this.RegisterButtonEvent(this.mTestbutton,this.TestHandle,this);   
        this.InitHotUpdateMachine();//初始化热更状态机
    } 


    InitLayer() { 
        _Facade.FindProxy(NetProxy).Connect();//连接Gate服务器
    } 
  
    private TestHandle(){     
        this.mHotUpdateStateMachine.RetryHotUpdate(this)
    }
    private LoginHandle(){   
        let asset:Asset = _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/HotUpdateLayer/HotUpdate/project",Asset); //加载资源
        if(asset == undefined){ 
            console.log("热更=>未找到热更新资源 热更将被终止"); 
            return; 
        } 
        _Facade.FindProxy(BundleProxy).UnUseAsset("resources","LayerSource/HotUpdateLayer/HotUpdate/project",Asset); //取到我需要的路径后，卸载资源。   
        this.mHotUpdateStateMachine.CheckHotUpdate(this,asset.nativeUrl)  
    }
    private HotHandle(){  
        this.mHotUpdateStateMachine.ExecHotUpdate(this) 
    } 

    //清理资源管理
    private InitHotUpdateMachine() {  
        this.mHotUpdateStateMachineMap.set(eHotUpdateStatus.Idle,new IdleStatusMachine("Idle"));
        this.mHotUpdateStateMachineMap.set(eHotUpdateStatus.ExecuteCheckVersion,new ExecuteCheckVersionStateMachine("ExecuteCheckVersion"));
        this.mHotUpdateStateMachineMap.set(eHotUpdateStatus.CheckVersionFinish,new CheckVersionFinishStateMachine("CheckVersionFinish"));
        this.mHotUpdateStateMachineMap.set(eHotUpdateStatus.HotUpdateProgress,new HotUpdateProgressStateMachine("HotUpdateProgress"));
        this.mHotUpdateStateMachineMap.set(eHotUpdateStatus.HotUpdateFail,new HotUpdateFailStateMachine("HotUpdateFail"));
        this.mHotUpdateStateMachineMap.set(eHotUpdateStatus.HotUpdateFinish,new HotUpdateFinishStateMachine("HotUpdateFinish"));
        this.mHotUpdateStateMachineMap.set(eHotUpdateStatus.SkipHotUpdate,new SkipHotUpdateStateMachine("SkipHotUpdate"));
        this.ChangeHotUpdateMachine(eHotUpdateStatus.Idle);//初始化热更状态
    } 
    public get AssetManager():native.AssetsManager{
        return this.mAssetsManager;
    } 

    public ClearAssetManager():void{
        this.mAssetsManager?.setVersionCompareHandle(undefined);
        this.mAssetsManager?.setVerifyCallback(undefined);
        this.mAssetsManager?.setEventCallback(undefined);
        this.mAssetsManager = undefined;
    }  
    public InitAssetManager():void{
        if (!NATIVE)//热更新仅在原生版本中才能够使用
            return;
        let storagePath = ((native.fileUtils ? native.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset'); 
        console.log('Storage path for remote asset : ' + storagePath); 
        this.mAssetsManager = new native.AssetsManager('', storagePath, this.VersionCompareHandle); 
        this.mAssetsManager.setVerifyCallback(this.VerifyHandle.bind(this)); 
        this.mAssetsManager.setEventCallback(this.CheckHandle.bind(this));//设置事件获取函数
    }
    
    private VersionCompareHandle(Localversion:string,remoteVersion:string){
        console.log("热更=> JS Custom Version Compare: version A is " + Localversion + ', version B is ' + remoteVersion);
        var vA = Localversion.split('.');
        var vB = remoteVersion.split('.');
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || '0');
            if (a === b)  
                continue;  
            return a - b;
        }
        if (vB.length > vA.length)
            return -1;
        return 0;
    }
    
    private VerifyHandle(path: string, asset: any){
        console.log(`热更=> 检查版本，永真 ${path}`);  
        var compressed = asset.compressed; // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
        var expectedMD5 = asset.md5;// Retrieve the correct md5 value.
        var relativePath = asset.path;// asset.path is relative path and path is absolute.
        var size = asset.size;  // The size of asset file, but this value could be absent.
        if (compressed)
            return true; //panel.info.string = "Verification passed : " + relativePath;
        return true;
    }
    public ChangeHotUpdateMachine(hotUpdateStatus:eHotUpdateStatus) {  
        this.mHotUpdateStateMachine?.OnExit(this);
        this.mHotUpdateStateMachine = this.mHotUpdateStateMachineMap.get(hotUpdateStatus)!; 
        this.mHotUpdateStateMachine!.OnEnter(this);
    } 
    private CheckHandle(event:native.EventAssetsManager) {  
        this.mHotUpdateStateMachine.HotEventHandle(this,event.getEventCode(),event);
    }
}  
