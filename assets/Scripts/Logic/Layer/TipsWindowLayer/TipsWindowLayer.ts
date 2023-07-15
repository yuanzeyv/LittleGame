import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, find, EditBox, SpriteFrame, instantiate, Label, Toggle, RichText, UITransform } from 'cc'; 
import { BaseLayer } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { TipsWindowMediator } from '../../Mediator/TipsWindowMediator/TipsWindowMediator';
const { ccclass, property,type} = _decorator;
@ccclass('TipsWindowLayer')
export class TipsWindowLayer extends BaseLayer {
    private mCloseButton:Node;//获取到返回按钮
    private mBackground:Node;//获取到背景板
    private mTipsRichText:RichText;//获取到富文本

    private mDescStr:string;//当前的要显示文本
    public InitNode() {
        this.mBackground = find("TipsBackGround",this.node);
        this.mCloseButton = find("TipsBackGround/CloseButton",this.node);
        this.mTipsRichText = find("TipsBackGround/TipsRichText",this.node).getComponent(RichText);
    }

    public InitData(str:string = "") {
        this.mDescStr = str;
    }

    public InitLayer() {
        this.mTipsRichText.string = this.mDescStr;
        this.UpdateContentSize()
        this.mCloseButton.on("click",this.CloseButtonHandle.bind(this));
        this.node.on("click",this.CloseButtonHandle.bind(this));
    }

    public UpdateContentSize(){
        let richTextTrans:UITransform = this.mTipsRichText.getComponent(UITransform);//获取到富文本的大小
        let mutex:number = richTextTrans.contentSize.y - 205;
        if(mutex < 0)
            return;
        let backTrans:UITransform = this.mBackground.getComponent(UITransform);//获取到富文本的大小
        backTrans.setContentSize(backTrans.contentSize.x,backTrans.contentSize.y + mutex );
    }

    public CloseButtonHandle() {
        _Facade.Send(NotificationEnum.CloseWindow,TipsWindowMediator.MediatorName);
    }
}