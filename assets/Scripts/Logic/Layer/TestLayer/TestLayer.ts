import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, Label, find, tween, PageView, Vec2, UITransform, Size, Prefab, instantiate } from 'cc'; 
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { TestMediator } from '../../Mediator/TestMediator/TestMediator';
import { TestProxy } from '../../Proxy/TestProxy/TestProxy';
const { ccclass, property,type} = _decorator; 
@ccclass('SelectPassLayer')
export class SelectPassLayer extends BaseLayer { //一个界面必须继承BaseLayer类
    @property({type:Button,displayName:"返回按钮"})
    private m_BackButton:Button;
    @property({type:Label,displayName:"数据信息"})
    private m_Label:Label;
    InitNode():void{ 
        this.m_BackButton = find("BackButton",this.node).getComponent(Button);
        this.m_Label = find("Label",this.node).getComponent(Label);
    }
     
    InitData():void{
        this.m_BackButton.node.on("click",this.BackButtonHandle.bind(this));
    } 

    InitLayer():void{ 
        let testProxy:TestProxy = _Facade.FindProxy(TestProxy);
        this.m_Label.string = testProxy.getMyData();
    }
    BackButtonHandle(){
        _Facade.Send(NotificationEnum.CloseWindow,TestMediator.MediatorName);
    } 
}


