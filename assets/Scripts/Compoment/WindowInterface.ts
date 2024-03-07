import { _decorator, Component, Node, BlockInputEvents, Color,Animation, Sprite, UITransform, Widget, find, Button, Vec3, tween } from 'cc';
import { BaseLayer } from '../Frame/BaseLayer/BaseLayer';
import { INotification } from '../Frame/PureMVC';
import { _Facade } from '../Global';
import { CopyWidget, SetFullWidget } from '../Util/Util'; 
import { LoadStruct } from '../Logic/Proxy/BundleProxy/BundleProxy'; 
import { WindowParam } from '../Frame/BaseMediator/WindowBaseMediator';
const { ccclass} = _decorator;
export class WindowInterface extends Component {   
    private mLayerCompoment:BaseLayer;//界面用组件 
    private mWindowData:WindowParam;
    private mWindowNode:Node;
    public InitLayer(){
        find("TouchMask",this.node).on("click",this.OnCloseHandle,this); 
        this.mWindowNode = find("Window",this.node);
    } 
    
    public OnCloseHandle(button:Button){
        if(this.mWindowData.closeNotice == undefined) //触摸是否关闭
            return; 
        _Facade.Send(this.mWindowData.closeNotice);
    } 

    public SetWindowBaseData(data:WindowParam):void{
        this.mWindowData = data;
    }
    //创建一个窗口
    CreateWindow(layer:Node,windowData:any):boolean{//创建一个窗口对象    
        this.mWindowNode.active = true;//关闭窗口的显示 
        this.mWindowNode.getComponent(BlockInputEvents).enabled = this.mWindowData.windowBlock;//设置窗口节点是否可以向下穿透
        let prefabWidget:Widget = layer.getComponent(Widget);//获取到当前Layer的窗口信息
        this.mWindowNode.getComponent(UITransform).setContentSize(layer.getComponent(UITransform).contentSize);
        if(prefabWidget != undefined){ //如果当前非窗口类型的组件 并且拥有widget时 
            let windowWidget:Widget = this.mWindowNode.getComponent(Widget) || this.mWindowNode.addComponent(Widget);
            CopyWidget(prefabWidget,windowWidget);//window的widget变更为与窗口一致的widget
            SetFullWidget(prefabWidget);//设置窗口的widget为全屏widget
        }
        try{
            this.mLayerCompoment = layer.getComponent(BaseLayer);//加入组件
            this.mLayerCompoment.InitBaseLayer(windowData);//初始化组件数据信息
            this.mWindowNode.addChild(layer);
        }catch(error){
            console.error(error);
            return false;
        }
        return true;
    }

    CloseLayer(){
        if(this.mLayerCompoment)
            this.mLayerCompoment.CloseLayer();
        this.mWindowNode.destroyAllChildren();//销毁 
        this.mWindowNode.removeAllChildren();//删除 
    }
    
    //设置背景板颜色 与 屏幕遮罩试能 
    public SetTouchMask(canTouch:boolean,touchColor:Color =new Color(0,0,0,0)){ 
        find("TouchMask",this.node).active = canTouch;
        find("TouchMask",this.node).getComponent(BlockInputEvents).enabled = canTouch;//全屏触摸遮罩
        find("TouchMask",this.node).getComponent(Sprite).color = new Color(touchColor);//全屏触摸遮罩
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
        if(!this.mWindowData.showLoading)
            return;
        let sumCount:number = loadInfo.GetLoadSumCount();//获取到当前的加载个数
        this.UpdateRollProgress(loadInfo.GetSuccessCount() / sumCount,(loadInfo.GetFailCount() / sumCount));//更新当前的滚动进度
    }
    
 
    public UpdateRollProgress(successProgress:number,failProgress:number):void{  
        let successPos:Vec3 = find("LoadProgress/SuccessMask/SumNode",this.node).getPosition(); 
        let failPos:Vec3 = find("LoadProgress/FailMask/SumNode",this.node).getPosition(); 
        find("LoadProgress/FailMask/SumNode",this.node).setPosition(successPos.x,-114 + (failProgress + successProgress)  * 117);
        find("LoadProgress/SuccessMask/SumNode",this.node).setPosition(failPos.x,-114 + (successProgress * 117));
    }
    

    public CompleteLoadingLayer(loadInfo:LoadStruct,overCall:()=>void):void{   
        if(loadInfo.IsAllComplete()){ //如果加载全部成功的话 
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
        this.mWindowNode.active = false;//关闭窗口的显示
        this.SetTouchMask(true);//设置触摸遮罩
        this.StopWaterRoll();//优先停止
        if(this.mWindowData.showLoading){
            this.StartWaterRoll();//准备开始加载游戏资源
            this.UpdateRollProgress(0,0);//更新节点进度
        }
    }
}