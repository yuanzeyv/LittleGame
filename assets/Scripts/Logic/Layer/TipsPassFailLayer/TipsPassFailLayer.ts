import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, find, EditBox, SpriteFrame, instantiate, Label, Toggle, UIOpacity, tween } from 'cc'; 
import { BaseLayer } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { Resource } from '../../../Util/Resource/Resource';
import { DisorganizeArray } from '../../../Util/Util'; 
import { TipsPassFailMediator } from '../../Mediator/TipsPassFailMediator/TipsPassFailMediator';
import { PagePassProxy, PassData } from '../../Proxy/PagePassProxy/PagePassProxy';
import { PassDataStruct } from '../../Proxy/PagePassProxy/PassDataStruct';
const { ccclass, property,type} = _decorator;
@ccclass('TipsPassFailLayer')
export class TipsPassFailLayer extends BaseLayer {
    private mRetryButton:Node;
    private mFullHeart:UIOpacity ;
    private mBrokenHeart:UIOpacity;
    
    private mPassLevel:number;
    InitNode() {
        this.mRetryButton = find("TipsBackGround/RetryButtn",this.node);
        this.mFullHeart = find("TipsBackGround/InnerBg/loveHeart",this.node).getComponent(UIOpacity);
        this.mBrokenHeart = find("TipsBackGround/InnerBg/heartBroken",this.node).getComponent(UIOpacity);
    }
    InitData(data?:any) {
        this.mPassLevel = data;
        this.mBrokenHeart.opacity = 0;
    }   
    InitLayer() {
        tween(this.mFullHeart).to(0.3,{opacity:0}).call(()=> {this.mFullHeart.node.active = true;}).start();
        tween(this.mBrokenHeart).to(1.2,{opacity:255},{easing: 'sineOutIn'}).start();
        this.mRetryButton.on("click",this.RetryButtonHandle.bind(this));
        this.node.on("click",this.CloseWindowHandle.bind(this));
    }
    private RetryButtonHandle(){//发送重新开始事件
        let pagePassProxy: PagePassProxy = _Facade.FindProxy(PagePassProxy); 
        let passData:PassData|undefined = pagePassProxy.GetPassData(this.mPassLevel);
        if(passData == undefined){//无数据的情况
            _Facade.Send(NotificationEnum.TipsWindowLayerOpen,"关卡数据读取错误，无法进入关卡");
            return;
        } 
        //如果当前的等级 大于了，通关进度加1
        if(!pagePassProxy.GetLevelCanGame(this.mPassLevel)){
            _Facade.Send(NotificationEnum.TipsWindowLayerOpen,"通关数据异常，无法重试!");
            return;
        } 
        let gameStruct:PassDataStruct|undefined = pagePassProxy.GenerateGameData(this.mPassLevel);
        if(gameStruct == undefined){
            _Facade.Send(NotificationEnum.M_TipsShow,"关卡数据生成失败，无法进入游戏");
            return; 
        }
        //组装一下游戏数据
        _Facade.Send(NotificationEnum.RefreshGamePass,gameStruct);
        _Facade.Send(NotificationEnum.CloseWindow,TipsPassFailMediator.MediatorName);
    }
    private CloseWindowHandle(){
        _Facade.Send(NotificationEnum.CloseWindow,TipsPassFailMediator.MediatorName);
    }
}