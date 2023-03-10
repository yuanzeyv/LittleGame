import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, find, EditBox, SpriteFrame } from 'cc'; 
import { BaseLayer } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { UserProxy } from '../../Proxy/UserProxy/UserProxy';
const { ccclass, property,type} = _decorator;
@ccclass('MainMenuLayer')
export class MainMenuLayer extends BaseLayer {  
    private mFightButton:Button;
    private mPlayerButton:Button;
    private mBagButton:Button;
    private mWorldButton:Button;

    private mChooseButton:Button;
    InitNode() {
        this.mFightButton = find("BackGround/MenuLayout/FightButton",this.node).getComponent(Button);
        this.mPlayerButton = find("BackGround/MenuLayout/PlayerButton",this.node).getComponent(Button);
        this.mBagButton = find("BackGround/MenuLayout/BagButton",this.node).getComponent(Button);
        this.mWorldButton = find("BackGround/MenuLayout/WorldButton",this.node).getComponent(Button);
    }
    InitData() {
        this.mFightButton.node.on("click",this.FightButtonHandle.bind(this,this.mFightButton));
        this.mPlayerButton.node.on("click",this.PlayerButtonHandle.bind(this,this.mPlayerButton));
        this.mBagButton.node.on("click",this.BagButtonHandle.bind(this,this.mBagButton));
        this.mWorldButton.node.on("click",this.WorldButtonHandle.bind(this,this.mWorldButton));
    }

    InitLayer(){ 
        this.FightButtonHandle(this.mFightButton);
    }

    private ChangeButtonImage(button:Button){//改变按钮的图片
        let tempSprite:SpriteFrame = button.normalSprite ;
        button.normalSprite = button.pressedSprite;
        button.pressedSprite = tempSprite;
    }
    private SetChooseButton(button:Button){
        if(this.mChooseButton != undefined){
            this.ChangeButtonImage(this.mChooseButton);
            this.mChooseButton.enabled = true;
        }
        this.mChooseButton = button;
        this.ChangeButtonImage(this.mChooseButton);
        this.mChooseButton.enabled = false;
    }
    
    private FightButtonHandle(button:Button){
        this.SetChooseButton(button);
 
        _Facade.Send(NotificationEnum.FightLayerOpen) //打开战斗界面
        _Facade.Send(NotificationEnum.PlayerLayerClose) //关闭背包界面 
        _Facade.Send(NotificationEnum.BagLayerClose) //关闭人物界面
        _Facade.Send(NotificationEnum.WorldLayerClose) //关闭世界界面
    }
    private PlayerButtonHandle(button:Button){
        this.SetChooseButton(button);
        _Facade.Send(NotificationEnum.BagLayerClose) //关闭人物界面
        _Facade.Send(NotificationEnum.WorldLayerClose) //关闭世界界面
        _Facade.Send(NotificationEnum.PlayerLayerOpen) //打开玩家界面
    }
    private BagButtonHandle(button:Button){
        this.SetChooseButton(button);
        _Facade.Send(NotificationEnum.PlayerLayerClose) //关闭人物界面
        _Facade.Send(NotificationEnum.WorldLayerClose) //关闭世界界面
        _Facade.Send(NotificationEnum.BagLayerOpen) //打开背包界面
    }
    private WorldButtonHandle(button:Button){
        this.SetChooseButton(button);
        _Facade.Send(NotificationEnum.PlayerLayerClose) //关闭人物界面
        _Facade.Send(NotificationEnum.BagLayerClose) //关闭世界界面
        _Facade.Send(NotificationEnum.WorldLayerOpen) ///打开世界界面
    }
}


