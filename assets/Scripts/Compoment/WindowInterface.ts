import { _decorator, Component, Node, BlockInputEvents, Color,Animation, Sprite, UITransform, math, Prefab, instantiate, Layers, Widget, find, Button, Vec3, tween } from 'cc';
import { BaseLayer } from '../Frame/BaseLayer/BaseLayer';
import { INotification } from '../Frame/PureMVC';
import { _Facade } from '../Global';
import { CopyWidget, ListenClick, SetFullWidget } from '../Util/Util';
import { WindowBaseMediator } from '../Frame/BaseMediator/WindowBaseMediator';
import { WindowCreateRequest } from '../Logic/Proxy/WindowProxy/Class';
import { BundleProxy, LoadStruct } from '../Logic/Proxy/BundleProxy/BundleProxy';
import { eNotificationEnum } from '../NotificationTable';
const { ccclass, property,type} = _decorator;
@ccclass('WindowInterface')
export class WindowInterface extends Component {
    //自己的Mediator 
    private mListenMediator:WindowBaseMediator;
    //全屏用
    private mMaskSpriteNode:Sprite;//遮罩图片
    private mFullScreenBlockInputCom:BlockInputEvents;//全屏的触摸遮罩
    //进度条根结点
    private mProgressNode:Node;
    //窗口用
    private mWindowNode:Node;//要添加的窗口节点
    private mLayerCompoment:BaseLayer;//界面用组件

    private mWindowRequest:WindowCreateRequest;//Window请求信息
    //加载窗口进度节点
    public InitWindowNode(){ 
        this.mFullScreenBlockInputCom = find("TouchMask",this.node).getComponent(BlockInputEvents);//全屏触摸遮罩
        this.mMaskSpriteNode = find("TouchMask",this.node).getComponent(Sprite);
        this.mWindowNode = this.node.getChildByPath("Window");//获取到窗口的节点信息
        this.mProgressNode =find("LoadProgress",this.node);//获取到窗口的节点信息
    }

    public InitLayer(){
        //停止水流滚动
        find("LoadProgress/SuccessMask/SumNode",this.node).getComponent(Animation).start();
        find("LoadProgress/FailMask/SumNode",this.node).getComponent(Animation).start(); 
        ListenClick(this.mFullScreenBlockInputCom.node,this,this.OnCloseHandle);
    }
    
    public OnCloseHandle(button:Button){
        if(!this.mWindowRequest.IsOpenTouchCloseSwitch)  
            return; 
        _Facade.Send(eNotificationEnum.CloseWindow,this.mWindowRequest.Mediator.mediatorName);
    }
    public SetRequest(winRequest:WindowCreateRequest){
        this.mWindowRequest = winRequest; 
    }
    public SetMediator(windowBaseMediator:WindowBaseMediator){
        this.mListenMediator = windowBaseMediator;
    } 
 
    CreateWindow():boolean{//创建一个窗口对象  
        let path:{path:string,bundle:string} = this.mWindowRequest.Mediator.GetPrefabPath();
        let windowPrefab:Prefab|undefined = _Facade.FindProxy(BundleProxy).UseAsset(path.bundle,path.path,Prefab);
        if(windowPrefab == undefined)
            return false;
        let layerCell:Node = instantiate(windowPrefab);
        let prefabWidget:Widget = layerCell.getComponent(Widget);//获取到当前Layer的窗口信息
        if(prefabWidget != undefined){ //如果当前非窗口类型的组件 并且拥有widget时 
            let windowWidget:Widget = this.mWindowNode.getComponent(Widget);
            if(windowWidget == undefined)
                windowWidget = this.mWindowNode.addComponent(Widget);
            CopyWidget(prefabWidget,windowWidget);//window的widget变更为与窗口一致的widget
            SetFullWidget(prefabWidget);//设置窗口的widget未全屏widget
        }
        this.mWindowNode.getComponent(UITransform).setContentSize(layerCell.getComponent(UITransform).contentSize);
        //设置窗口是否屏蔽遮挡
        find("Window",this.node).getComponent(BlockInputEvents).enabled = this.mWindowRequest.IsWindowTouchBlock;
        //是否设置点击背景关闭界面  
        find("TouchMask",this.node).active = this.mWindowRequest.IsOpenFullScreen;
        find("TouchMask",this.node).getComponent(BlockInputEvents).enabled = this.mWindowRequest.IsOpenFullScreen;
        find("TouchMask",this.node).getComponent(Sprite).enabled = this.mWindowRequest.IsOpenFullScreenBG;
        find("TouchMask",this.node).getComponent(Sprite).color = this.mWindowRequest.FullBGColor;


        try{
            this.mLayerCompoment  = layerCell.addComponent(this.mWindowRequest.Mediator.GetPrefabComponent());//加入组件
            this.mLayerCompoment.InitBaseLayer(this.mWindowRequest.Data);//初始化组件数据信息
            layerCell.setParent(this.mWindowNode);
        }catch(error){
            console.error(error);
            return false;
        } 
        return true;
    } 

    DestoryWindow(){
        this.mLayerCompoment.CloseLayer();
        this.mWindowNode.destroyAllChildren();//销毁 
        this.mWindowNode.removeAllChildren();//删除
        this.mListenMediator.WindowInterface = undefined;
    }
    /*
    通知用函数
    */
    ExcuteNotify(notification:INotification) {
        this.mLayerCompoment.NotificationExecute(notification);
    }   
    
    //加载进度条的几个函数
    public StartLoadingLayer():void{ 
        //所有界面打开都会判断是否需要显示进度条
        let isShow:boolean = this.mWindowRequest.IsShowLoadingNode;
        this.mMaskSpriteNode.node.active = isShow;//操作节点是否应该显示
        this.mMaskSpriteNode.enabled = isShow;//是否显示加载图片
        this.mMaskSpriteNode.color = new Color(255,0,0,125);//显示图片颜色 
        this.mFullScreenBlockInputCom.enabled = isShow;//是否显示加载图片 
        this.mWindowNode.active = false;//隐藏窗口节点的显示
        this.mProgressNode.active = isShow; 
        //开始水流滚动
        find("LoadProgress/SuccessMask/SumNode",this.node).getComponent(Animation).start();
        find("LoadProgress/FailMask/SumNode",this.node).getComponent(Animation).start(); 
    }
    public UpdateLoadingLayer(loadInfo:LoadStruct):void{ 
        let sumCount:number = loadInfo.GetLoadSumCount(); 
        let successProgress:number = loadInfo.GetSuccessCount() / sumCount;   
        let failProgress:number = (loadInfo.GetFailCount() / sumCount) + successProgress;
        let successPos:Vec3 = find("LoadProgress/SuccessMask/SumNode",this.node).getPosition(); 
        let failPos:Vec3 = find("LoadProgress/FailMask/SumNode",this.node).getPosition(); 
        find("LoadProgress/FailMask/SumNode",this.node).setPosition(successPos.x,-114 + successProgress * 117);
        find("LoadProgress/SuccessMask/SumNode",this.node).setPosition(failPos.x,-114 + (failProgress * 117));
    }
    public CompleteLoadingLayer(loadInfo:LoadStruct,overCall:()=>void):void{  
        find("LoadProgress/SuccessMask/SumNode",this.node).getComponent(Animation).stop();
        find("LoadProgress/FailMask/SumNode",this.node).getComponent(Animation).stop();
        //判断如果加载成功的话，直接创建窗口界面
        if(loadInfo.IsAllComplete()){ 
            let sumCount:number = loadInfo.GetLoadSumCount(); 
            let successProgress:number = loadInfo.GetSuccessCount() / sumCount;  
            tween(find("LoadProgress/SuccessMask/SumNode",this.node))
            .to(0.5 * successProgress,{position:new Vec3(find("LoadProgress/SuccessMask/SumNode",this.node).position.x,-114)})
            .call(()=>{ find("LoadProgress/LoadSuccessImage",this.node).active = true;  }) 
            .delay(0.1)
            .call(()=> {
                this.mProgressNode.active = false;
                this.mWindowNode.active = true;  
                this.mWindowNode.getComponent(BlockInputEvents).enabled = this.mWindowRequest.IsWindowTouchBlock;
                overCall()
            })
            .start();  
        }else{
            find("LoadProgress/LoadFailImage",this.node).active = true; 
        }
    }
}