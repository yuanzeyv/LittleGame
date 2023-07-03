import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, find, EditBox, SpriteFrame, instantiate, Label, Toggle, UIOpacity, tween } from 'cc'; 
import { BaseLayer } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { GameMenuMediator } from '../../Mediator/GameMenuMediator/GameMenuMediator';
import { MainGameMediator } from '../../Mediator/MainGameMediator/MainGameMediator';
import { TipsPassFailMediator } from '../../Mediator/TipsPassFailMediator/TipsPassFailMediator';
import { TipsPassWinMediator } from '../../Mediator/TipsPassWinMediator/TipsPassWinMediator';
import { TipsWindowMediator } from '../../Mediator/TipsWindowMediator/TipsWindowMediator';
import { PagePassProxy, PAGE_COUNT, PassData } from '../../Proxy/PagePassProxy/PagePassProxy';
import { PassDataStruct } from '../../Proxy/PagePassProxy/PassDataStruct';
const { ccclass, property,type} = _decorator;
@ccclass('TipsPassWinLayer')
export class TipsPassWinLayer extends BaseLayer {
    private mNextButton:Node; //获取到下一关的按钮
    private mNextGrayButton:Node;//获取到下一关禁用的按钮
    private mMenuButton:Node;//获取到主界面按钮

    private mPassLevel:number;
    InitNode() {
        this.mNextButton = find("TipsBackGround/NextButton",this.node);
        this.mNextGrayButton = find("TipsBackGround/NextGrayButton",this.node);
        this.mMenuButton = find("TipsBackGround/BackHomeButton",this.node);
    }

    InitData(data?:any) { 
        this.mPassLevel = data;
        this.mNextButton.on("click",this.mNextButtonHandle.bind(this));
        this.mNextGrayButton.on("click",this.NextGrayButtonHandle.bind(this));
        this.mMenuButton.on("click",this.mMenuButtonHandle.bind(this));
    }   

    InitLayer() { 
        this.RefreshButtonShowStatus();
    } 
    private RefreshButtonShowStatus(){
        let nextLevel:number = this.mPassLevel + 1;
        let pagePassProxy: PagePassProxy = _Facade.FindProxy(PagePassProxy); 
        let passData:PassData|undefined = pagePassProxy.GetPassData(nextLevel);
        if(passData == undefined)//无数据的情况
            pagePassProxy.RequestPassData(Math.floor(nextLevel % PAGE_COUNT));
        this.mNextButton.active = passData != undefined;
        this.mNextGrayButton.active = passData == undefined;
        this.mMenuButton.active = passData == undefined;
    }
    private mNextButtonHandle(){
        let nextLevel:number = this.mPassLevel + 1;
        let pagePassProxy: PagePassProxy = _Facade.FindProxy(PagePassProxy); 
        let passData:PassData|undefined = pagePassProxy.GetPassData(nextLevel);
        if(passData == undefined){//无数据的情况
            _Facade.Send(NotificationEnum.TipsWindowLayerOpen,"关卡数据读取错误，无法进入关卡");
            return; 
        } 
        //如果当前的等级 大于了，通关进度加1
        if(!pagePassProxy.GetLevelCanGame(nextLevel)){
            _Facade.Send(NotificationEnum.TipsWindowLayerOpen,"通关数据异常，无法重试!");
            return;
        } 
        let gameStruct:PassDataStruct|undefined = pagePassProxy.GenerateGameData(nextLevel);
        if(gameStruct == undefined){
            _Facade.Send(NotificationEnum.M_TipsShow,"关卡数据生成失败，无法进入游戏");
            return; 
        }
        //组装一下游戏数据
        _Facade.Send(NotificationEnum.RefreshGamePass,gameStruct);
        _Facade.Send(NotificationEnum.CloseWindow,TipsPassWinMediator.MediatorName);
    }
    private mMenuButtonHandle(){
        _Facade.Send(NotificationEnum.CloseWindow,TipsPassWinMediator.MediatorName);
        _Facade.Send(NotificationEnum.CloseWindow,MainGameMediator.MediatorName);
    }
    private NextGrayButtonHandle(){
        _Facade.Send(NotificationEnum.M_TipsShow,"无法读取到下一关卡的数据");
    }
}