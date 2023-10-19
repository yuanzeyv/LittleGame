import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar, Label, Collider2D, Contact2DType, BoxCollider2D, IPhysics2DContact } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { NotificationEnum } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { FishLoadingMediator } from '../../Mediator/FishLoadingMediator/FishLoadingMediator';
import { FishMainProxy } from '../../Proxy/FishMainProxy/FishMainProxy';
import { EventHandle } from 'cc';
import { EventHandler } from 'cc';
import { Vec2 } from 'cc';
const { ccclass, property,type} = _decorator; 
@ccclass('FishMainGameLayer') 
export class FishMainGameLayer extends BaseLayer {  
    private mFishMainProxy:FishMainProxy;
    private mMapBGNode:Node;
    private mCurrencyLabel:Label;//游戏内货币的数量标签
    public InitNode(): void { 
        this.mCurrencyLabel = find("CurrencyNode/ConGoalLabel",this.node).getComponent(Label);
        this.mMapBGNode = find("MapBG",this.node);
    }
    
    public InitLayer() {
        this.mFishMainProxy = _Facade.FindProxy(FishMainProxy)
        this.RegisterButtonEvent<FishMainGameLayer>(find("MapBG/TouchNode",this.node),"ClickBG");  
        _Facade.FindProxy(FishMainProxy).StartGame(this.mMapBGNode);//开始游戏  
        this.mCurrencyLabel.string = `$${this.mFishMainProxy.GetGameInningCount()}`;  
    } 
     
    public ClickBG(event:EventTouch){
        let touchPos:Vec2 = event.getLocation();
        _Facade.FindProxy(FishMainProxy).GenerateFood(touchPos); 
    }
}