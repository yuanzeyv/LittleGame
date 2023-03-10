import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, Label, find } from 'cc'; 
import { BaseLayer } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { UserProxy } from '../../Proxy/UserProxy/UserProxy';
const { ccclass, property,type} = _decorator;
@ccclass('UserBaseLayer')
export class UserBaseLayer extends BaseLayer {  
    public mNameLabel:Label;
    InitNode() { 
        this.mNameLabel = find("NameLabel",this.node).getComponent(Label);
    }
    InitData() {
    }
    InitLayer(){ 
        this.mNameLabel.string = _Facade.FindProxy(UserProxy).Name;
    }
}


