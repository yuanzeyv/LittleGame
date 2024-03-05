import { _decorator, Component, Node, BlockInputEvents, Color,Animation, Sprite, UITransform, math, Prefab, instantiate, Layers, Widget, find, Button, Vec3, tween } from 'cc';
import { BaseLayer } from '../Frame/BaseLayer/BaseLayer';
import { INotification } from '../Frame/PureMVC';
import { _Facade } from '../Global';
import { CopyWidget, SetFullWidget } from '../Util/Util'; 
import { LoadStruct } from '../Logic/Proxy/BundleProxy/BundleProxy'; 
import { WindowParam } from '../Frame/BaseMediator/WindowBaseMediator';
const { ccclass, property,type} = _decorator;
@ccclass('WindowInterface')
export class WindowInterface extends Component {   
    private mLayerCompoment:BaseLayer;//界面用组件 
    private mMediatorName:string;
    private mWindowData:WindowParam;

    public InitLayer(){ 
        this.Find("TouchMask").on("click",this.OnCloseHandle,this); 
    } 

    public Find(path:string):Node{ return find(path,this.node); }

    public SetWindowBaseData(mediatorName:string,data:WindowParam):void{
        this.mMediatorName = mediatorName;
        this.mWindowData = data;
    }
    
    public OnCloseHandle(button:Button){
        if(!this.mWindowData.canTouchClose || this.mWindowData.closeNotice == undefined) //触摸是否关闭
            return; 
        _Facade.Send(this.mWindowData.closeNotice,this.mMediatorName);
    } 
 
    CreateWindow(layer:Node,windowData:any):boolean{//创建一个窗口对象    
        this.WindowNode.active = true;//关闭窗口的显示
        this.WindowNode.getComponent(BlockInputEvents).enabled = this.mWindowData.windowBlock;

        let prefabWidget:Widget = layer.getComponent(Widget);//获取到当前Layer的窗口信息
        if(prefabWidget != undefined){ //如果当前非窗口类型的组件 并且拥有widget时 
            let windowWidget:Widget = this.WindowNode.getComponent(Widget);
            if(windowWidget == undefined)
                windowWidget = this.Find("Window").addComponent(Widget);
            CopyWidget(prefabWidget,windowWidget);//window的widget变更为与窗口一致的widget
            SetFullWidget(prefabWidget);//设置窗口的widget为全屏widget
        }
        this.Find("Window").getComponent(UITransform).setContentSize(layer.getComponent(UITransform).contentSize);
        try{
            this.mLayerCompoment  = layer.getComponent(BaseLayer);//加入组件
            this.mLayerCompoment.InitBaseLayer(windowData);//初始化组件数据信息
            layer.setParent(this.WindowNode);
        }catch(error){ 
            console.error(error);
            return false;
        } 
        return true;
    } 

    CloseLayer(){
        this.Find("TouchMask").off("click",this.OnCloseHandle,this); 
        this.mLayerCompoment.CloseLayer();
        this.WindowNode.destroyAllChildren();//销毁 
        this.WindowNode.removeAllChildren();//删除 
    }
    /*
    通知用函数
    */
    public ExcuteNotify(notification:INotification) {
        if(this.mLayerCompoment == undefined)
            return;
        this.mLayerCompoment.NotificationExecute(notification);
    }   
    
    public UpdateLoadingLayer(loadInfo:LoadStruct):void{ 
        let sumCount:number = loadInfo.GetLoadSumCount(); 
        this.UpdateRollProgress(loadInfo.GetSuccessCount() / sumCount,(loadInfo.GetFailCount() / sumCount) ); 
    }

    public CompleteLoadingLayer(loadInfo:LoadStruct,overCall:()=>void):void{   
        //判断如果加载成功的话，直接创建窗口界面
        if(loadInfo.IsAllComplete()){ 
            let sumCount:number = loadInfo.GetLoadSumCount(); 
            let successProgress:number = loadInfo.GetSuccessCount() / sumCount;  
            tween(find("LoadProgress/SuccessMask/SumNode",this.node))
            .to(0.1,{position:new Vec3(find("LoadProgress/SuccessMask/SumNode",this.node).position.x,-114)})
            .call(()=>{ find("LoadProgress/LoadSuccessImage",this.node).active = true;  }) 
            .call(()=> {
                this.StopWaterRoll();//停止水流滚动  
                this.SetTouchMask(this.mWindowData.fullScreenBlock,this.mWindowData.bgColor);//开启触摸遮罩 
                overCall()
            })
            .start();   
        }else{
            find("LoadProgress/LoadFailImage",this.node).active = true; 
        }
    }
    //设置背景板颜色 与 屏幕遮罩试能 
    public SetTouchMask(canTouch:boolean,touchColor:Color =new Color(0,0,0)){ 
        find("TouchMask",this.node).active = canTouch;
        find("TouchMask",this.node).getComponent(BlockInputEvents).enabled = canTouch;//全屏触摸遮罩
        find("TouchMask",this.node).getComponent(Sprite).color = new Color(touchColor);//全屏触摸遮罩
    }
 
    public UpdateRollProgress(successProgress:number,failProgress:number):void{ 
        let successPos:Vec3 = find("LoadProgress/SuccessMask/SumNode",this.node).getPosition(); 
        let failPos:Vec3 = find("LoadProgress/FailMask/SumNode",this.node).getPosition(); 
        find("LoadProgress/FailMask/SumNode",this.node).setPosition(successPos.x,-114 + (failProgress + successProgress)  * 117);
        find("LoadProgress/SuccessMask/SumNode",this.node).setPosition(failPos.x,-114 + (successProgress * 117));
    }
    
    
    //水流流动
    public StartWaterRoll(){
        find("LoadProgress/SuccessMask/SumNode",this.node).getComponent(Animation).start();
        find("LoadProgress/FailMask/SumNode",this.node).getComponent(Animation).start(); 
        find("LoadProgress",this.node).active = true;
    }

    public StopWaterRoll(){
        find("LoadProgress/SuccessMask/SumNode",this.node).getComponent(Animation).stop();
        find("LoadProgress/FailMask/SumNode",this.node).getComponent(Animation).stop(); 
        find("LoadProgress",this.node).active = false;
    }
 
    //进入加载资源的模式
    public EnterLoadModel(){ 
        this.WindowNode.active = false;//关闭窗口的显示
        this.SetTouchMask(true);//设置触摸遮罩
        this.StartWaterRoll();//准备开始加载游戏资源
        this.UpdateRollProgress(0,0);//更新节点进度
    }

    /*窗口节点控制*/
    public get WindowNode():Node{
        return this.Find("Window");
    } 
}