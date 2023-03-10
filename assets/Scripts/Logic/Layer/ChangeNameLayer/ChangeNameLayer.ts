import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, find, EditBox } from 'cc'; 
import { BaseLayer } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { UserProxy } from '../../Proxy/UserProxy/UserProxy';
const { ccclass, property,type} = _decorator;
@ccclass('ChangeNameLayer')
export class ChangeNameLayer extends BaseLayer {  
    public m_StartButton:Node;
    public m_NameInputBox:EditBox;

    InitNode() {
        this.m_StartButton = find("StartGameButton",this.node);
        this.m_NameInputBox = find("NameInputBox",this.node).getComponent(EditBox);
    }
    InitData() {
        this.m_StartButton.on("click",this.ChangeNameButtonHandle.bind(this));
    }

    InitLayer(){ 
    }

    ChangeNameButtonHandle(){
        _Facade.FindProxy(UserProxy).SendChangeName(this.m_NameInputBox.string);//获取到用户代理
    }
}


