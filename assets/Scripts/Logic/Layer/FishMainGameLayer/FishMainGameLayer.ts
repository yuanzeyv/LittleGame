import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar, Label, Collider2D, Contact2DType, BoxCollider2D, IPhysics2DContact } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { NotificationEnum } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { FishLoadingMediator } from '../../Mediator/FishLoadingMediator/FishLoadingMediator';
import { FishMainProxy } from '../../Proxy/FishMainProxy/FishMainProxy';
const { ccclass, property,type} = _decorator;
export class FishMainGameLayer extends BaseLayer {  
    private mFishMainProxy:FishMainProxy;
    private mMapBGNode:Node;
    private mCurrencyLabel:Label;//游戏内货币的数量标签
    //游戏中道具列表

    public InitNode(): void { 
        this.mFishMainProxy = _Facade.FindProxy(FishMainProxy)
        this.mCurrencyLabel = find("CurrencyNode/ConGoalLabel",this.node).getComponent(Label);
        this.mMapBGNode = find("MapBG",this.node);
    }
    
    public InitLayer() {
        _Facade.FindProxy(FishMainProxy).StartGame(this.mMapBGNode);//开始游戏

        this.mCurrencyLabel.string = `$${this.mFishMainProxy.GetGameInningCount()}`;
        //let collider = find("MapBG/Node",this.node).getComponent(BoxCollider2D)  
        //if (collider) {
        //    collider.on(Contact2DType.BEGIN_CONTACT, (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)=>{
        //        console.log("BEGIN_CONTACT");
        //    });
        //    collider.on(Contact2DType.END_CONTACT, (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)=>{
        //        console.log("END_CONTACT");
        //    });
        //}
    }
}