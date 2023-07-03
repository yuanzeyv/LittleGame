import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, UITransform, math, Prefab, instantiate, Layers, Widget } from 'cc';
import { BaseLayer } from '../Frame/BaseLayer/BaseLayer';
import { INotification } from '../Frame/PureMVC';
import { _Facade } from '../Global';
import { NotificationEnum } from '../NotificationTable';
import { CopyWidget, SetFullWidget } from '../Util/Util';
const { ccclass, property,type} = _decorator;
@ccclass('WindowInterface')
export class WindowInterface extends Component {
    //全屏用
    private m_BlockInputCom:BlockInputEvents;//全屏的触摸遮罩
    private m_MaskSpriteNode:Sprite; //遮罩图片
    //窗口用
    private m_WindowNode:Node;//窗口的节点
    private m_WindowBlockInputCom:BlockInputEvents;//窗口的触摸遮罩

    private m_LayerCompoment:BaseLayer;
    //可以保存消息队列，供窗口使用
    private m_ExecuteList:Array<INotification> = new Array<INotification>();
    public InitWindowData(){ 
        this.InitNode();
        this.InitOrder();
    }
    private InitNode(){
        this.m_MaskSpriteNode = this.node.getChildByName("TouchMask").getComponent(Sprite);
        this.m_BlockInputCom = this.node.getComponent(BlockInputEvents);
        this.m_WindowBlockInputCom = this.node.getChildByPath("Window").getComponent(BlockInputEvents);
        this.m_WindowNode = this.node.getChildByPath("Window");
    }  
    
    private InitOrder(){   
        this.node.walk((node) => { node.layer = Layers.Enum.UI_2D; });
    }

    CreateWindow(prefab:Prefab,data:any):boolean{//创建一个窗口对象
        if(prefab == undefined) return false;
        let layerCell:Node = instantiate(prefab);
        let prefabWidget:Widget = layerCell.getComponent(Widget);//判断其是否拥有Widget组件
        if(prefabWidget != undefined){ //如果当前非窗口类型的组件 并且拥有widget时
            let windowWidget:Widget = this.m_WindowNode.getComponent(Widget);
            if(windowWidget == undefined)
                windowWidget = this.m_WindowNode.addComponent(Widget);
            CopyWidget(prefabWidget,windowWidget);
            SetFullWidget(prefabWidget);
        }
        this.m_WindowNode.getComponent(UITransform).setContentSize(layerCell.getComponent(UITransform).contentSize);//设置窗口组件的
        this.m_LayerCompoment  = layerCell.getComponent(BaseLayer);
        layerCell.setPosition(0,0,0);
        try{
            this.m_LayerCompoment.InitBaseLayer(data);
            layerCell.setParent(this.m_WindowNode);
        }catch(error){
            console.error(error);
            return false;
        }
        this.DelayExecuteNotify();//延时 将积累的所有通知全部执行
        //layerCell.setScale(1,1,1);
        return true;
    }

    DelayExecuteNotify(){
        let notify:INotification;
        while((notify = this.m_ExecuteList.pop()) != undefined){
            this.ExcuteNotify(notify);
        }
    }

    DestoryWindow(){
        this.m_LayerCompoment.CloseLayer();
        this.m_WindowNode.destroyAllChildren();//删除当前的所有子节点
    }
      
    ExcuteNotify(notification:INotification) {
        if(this.m_WindowNode == undefined){
            this.m_ExecuteList.push(notification);
            return;
        }
        this.m_LayerCompoment.NotificationExecute(notification);
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


