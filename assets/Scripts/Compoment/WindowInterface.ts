import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, UITransform, math, Prefab, instantiate, Layers, Widget } from 'cc';
import { BaseLayer } from '../Frame/BaseLayer/BaseLayer';
import { INotification } from '../Frame/PureMVC';
import { _Facade } from '../Global';
import { NotificationEnum } from '../NotificationTable';
import { CopyWidget, SetFullWidget } from '../Util/Util';
import { WindowBaseMediator } from '../Frame/BaseMediator/WindowBaseMediator';
const { ccclass, property,type} = _decorator;
@ccclass('WindowInterface')
export class WindowInterface extends Component {
    //自己的Mediator
    private mListenMediator:WindowBaseMediator;
    //全屏用
    private m_BlockInputCom:BlockInputEvents;//全屏的触摸遮罩
    private m_MaskSpriteNode:Sprite; //遮罩图片
    //窗口用
    private mWindowNode:Node;//窗口的节点
    private m_WindowBlockInputCom:BlockInputEvents;//窗口的触摸遮罩
    private mLayerCompoment:BaseLayer; 
    public InitWindowData(){ 
        this.InitNode();
        this.InitOrder();
    }

    private InitNode(){
        this.m_MaskSpriteNode = this.node.getChildByName("TouchMask").getComponent(Sprite);
        this.m_BlockInputCom = this.node.getComponent(BlockInputEvents);
        this.m_WindowBlockInputCom = this.node.getChildByPath("Window").getComponent(BlockInputEvents);
        this.mWindowNode = this.node.getChildByPath("Window");
    }  
    
    private InitOrder(){   
        this.node.walk((node) => { node.layer = Layers.Enum.UI_2D; });
    }

    public SetMediator(windowBaseMediator:WindowBaseMediator){
        this.mListenMediator = windowBaseMediator;
    }

    CreateWindow(layerCell:Node,componentCons:new ()=>BaseLayer,data:any):boolean{//创建一个窗口对象 
        let prefabWidget:Widget = layerCell.getComponent(Widget);//判断其是否拥有Widget组件
        if(prefabWidget != undefined){ //如果当前非窗口类型的组件 并且拥有widget时
            let windowWidget:Widget = this.mWindowNode.getComponent(Widget);
            if(windowWidget == undefined)
                windowWidget = this.mWindowNode.addComponent(Widget);
            CopyWidget(prefabWidget,windowWidget);
            SetFullWidget(prefabWidget)
        }
        this.mWindowNode.getComponent(UITransform).setContentSize(layerCell.getComponent(UITransform).contentSize);//设置窗口组件的
        try{
            this.mLayerCompoment  = layerCell.addComponent(componentCons);//加入组件
            this.mLayerCompoment.InitBaseLayer(data);
            layerCell.setParent(this.mWindowNode);
        }catch(error){
            console.error(error);
            return false;
        } 
        return true;
    } 

    DestoryWindow(){
        this.mLayerCompoment.CloseLayer();
        this.mWindowNode.destroyAllChildren();//删除当前的所有子节点
        this.mListenMediator.DestoryWindow();//取消监听窗口节点
    }
      
    ExcuteNotify(notification:INotification) {
        if(this.mWindowNode == undefined)
            return;
        this.mLayerCompoment.NotificationExecute(notification);
    }   

    
    //设置是否打开全屏mask
    SetFullScreenMask(touchEnable:boolean = false,maskBGEnable:boolean = false,color:Color = new Color(0,0,0,64)){
        this.m_MaskSpriteNode.node.active = touchEnable;
        this.m_MaskSpriteNode.enabled = maskBGEnable;
        this.m_MaskSpriteNode.color = color;
        this.m_BlockInputCom.enabled = touchEnable;
    }

    //Window Table Mask
    SetWindowTouchMask(touchEnable:boolean = false){
        this.m_WindowBlockInputCom.enabled = touchEnable;
    } 
}