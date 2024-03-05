import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { eNotice } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { FishLoadingMediator } from '../../Mediator/FishLoadingMediator/FishLoadingMediator';
import { parseStyle } from '../../../Util/StyleParse/StyleParse';
const { ccclass, property,type} = _decorator;
@ccclass('FishLoadingLayer')
export class FishLoadingLayer extends BaseLayer { 
    private mTouchID:number = -1;//触摸ID用，确保只存在一个触摸节点
    private mPlayGameButton:Node;//玩家游戏按钮

    
    private mLoadingImageBar:ProgressBar;//加载中的进度条
    private mLoadingTextBar:ProgressBar;//加载字体的进度条
    private mSnailNode:Node;//蜗牛动画节点

    private mUpdateSolt:SoltCell;
    InitNode() {
        this.mPlayGameButton = find("PlayGameButton",this.node);
        this.mLoadingImageBar = find("ImageProgressBar",this.node).getComponent(ProgressBar);
        this.mLoadingTextBar = find("TextProgressBar",this.node).getComponent(ProgressBar);
        
        this.mSnailNode = find("SnailNode",this.node);
    } 
    
    public InitLayer(): void {
        this.mLoadingImageBar.node.active = true;
        this.mLoadingTextBar.node.active = true;
        this.mPlayGameButton.active = false; 
 
        //此处添加一个监听是为了让按钮能够同时放大以及做位置偏移
        this.mPlayGameButton.on("click",this.PlayGameButtonHandle.bind(this)); 
        this.mPlayGameButton.on(Input.EventType.TOUCH_START,this.TouchStartHandle.bind(this));
        this.mPlayGameButton.on(Input.EventType.TOUCH_END,this.TouchEndHandle.bind(this));
        this.mPlayGameButton.on(Input.EventType.TOUCH_CANCEL,this.TouchCancelHandle.bind(this));

        this.LoadingHandle(0); 
        find("RichText",this.node).getComponent(RichText).string = parseStyle("<id=1>1AA<id=11>A<id=2>2BB</id>B</id><id=2>3CCC4</id>DD</id><id=2>E</id><id=10>6FFFF</id>")
    }   
    private LoadingHandle(index:number = 0){
        let distance:number = 500;
        if(index >= distance){
            this.mLoadingImageBar.node.active = false;
            this.mLoadingTextBar.node.active = false;
            this.mPlayGameButton.active = true; 
            this.SnailMoveHandle();//开始请求移动
            return;
        }
        this.mLoadingImageBar.progress = (index / distance);
        if(index > (0.27 * distance) && index < (0.74 *distance)){
            let length:number = (0.74 * distance) - (0.27 * distance); 
            this.mLoadingTextBar.progress = (index - (0.27 * distance)) / length; 
        }
        let movePos:number = index; 
        this.mSnailNode.setPosition(-287 + movePos,-312); 
        this.mUpdateSolt = _G.TimeWheel.Set(0.03,this.LoadingHandle.bind(this,index + 2));//准备加载资源组
    }

    private SnailMoveHandle(){
        if(this.mSnailNode.getPosition().x >= 460)
            return ;
        this.mSnailNode.setPosition(this.mSnailNode.getPosition().x + 5,this.mSnailNode.getPosition().y)
        this.mUpdateSolt = _G.TimeWheel.Set(0.03,this.SnailMoveHandle.bind(this));//准备加载资源组
    }

    private TouchStartHandle(event: EventTouch){
        if(this.mTouchID != -1)     
            return;
        this.mTouchID = event.getID();
        let pos:Vec3 = this.mPlayGameButton.getPosition();
        this.mPlayGameButton.setPosition(pos.x + 1,pos.y - 1); 
        
        let size:math.Size = this.mPlayGameButton.getComponent(UITransform).contentSize;
        this.mPlayGameButton.getComponent(UITransform).contentSize = new math.Size(size.width,size.height - 3);
    }
    private TouchEndHandle(event: EventTouch){
        if(this.mTouchID !=  event.getID() )     
            return;
        this.mTouchID  = -1;
        let pos:Vec3 = this.mPlayGameButton.getPosition();
        this.mPlayGameButton.setPosition(pos.x - 1, pos.y + 1);

        let size:math.Size = this.mPlayGameButton.getComponent(UITransform).contentSize;
        this.mPlayGameButton.getComponent(UITransform).contentSize = new math.Size(size.width,size.height + 3);

    }
    private TouchCancelHandle(event: EventTouch){
        if(this.mTouchID !=  event.getID() )     
            return;
        this.mTouchID  = -1;
        let pos:Vec3 = this.mPlayGameButton.getPosition();
        this.mPlayGameButton.setPosition(pos.x - 1,pos.y + 1);
        
        let size:math.Size = this.mPlayGameButton.getComponent(UITransform).contentSize;
        this.mPlayGameButton.getComponent(UITransform).contentSize = new math.Size(size.width,size.height + 3);
    }

    private PlayGameButtonHandle(){ 
        _Facade.Send(eNotice.FishChoosePetsLayerClose);
        _Facade.Send(eNotice.FishMenuLayerOpen);
    }
    
    public CloseLayer(){
        this.mUpdateSolt.Stop();//停止播放动画
        this.mUpdateSolt = undefined;
    }
}


