import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, find, EditBox, SpriteFrame, instantiate, Label, Toggle, UIOpacity, tween } from 'cc'; 
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { GameMenuMediator } from '../../Mediator/GameMenuMediator/GameMenuMediator';
import { MainGameMediator } from '../../Mediator/MainGameMediator/MainGameMediator';
import { TipsPassWinMediator } from '../../Mediator/TipsPassWinMediator/TipsPassWinMediator';
import { TipsWindowMediator } from '../../Mediator/TipsWindowMediator/TipsWindowMediator';
import { AudioProxy } from '../../Proxy/AudioProxy/AudioProxy';
import { GameSettingProxy, GameSetting } from '../../Proxy/GameSettingProxy/GameSettingProxy';
const { ccclass, property,type} = _decorator;
export class GameMenuLayer extends BaseLayer {
    private mPassLabel:Label;
    private mPauseButton:Node;
    private mHomeButton:Node;
    private mMusicsButton:Node;
    private mEffectButton:Node;

    private mPassLevel:number;
    protected RegisterExecuteHandle(executeMap:Map<string,LayerExecute> ){
        executeMap
        .set(NotificationEnum.SetMusicVolume,this.UpdateMusicButton.bind(this))
        .set(NotificationEnum.SetEffectVolume,this.UpdateEffectButton.bind(this))
    }

    InitNode() {
        this.mPassLabel = find("TipsBackGround/PassLabel",this.node).getComponent(Label);
        this.mHomeButton = find("TipsBackGround/HomeButton",this.node);
        this.mPauseButton = find("TipsBackGround/PlayButton",this.node);
        this.mMusicsButton = find("TipsBackGround/MusicButton",this.node);
        this.mEffectButton = find("TipsBackGround/EffectButton",this.node);
    }
    InitData(level:number) { 
        this.mPassLevel = level;

        this.node.on("click",this.CloseWindowHandle.bind(this));
        this.mPauseButton.on("click",this.CloseWindowHandle.bind(this));
        this.mHomeButton.on("click",this.AbortPassHandle.bind(this));
        this.mMusicsButton.on("click",this.MusicButtonHandle.bind(this));
        this.mEffectButton.on("click",this.EffectButtonHandle.bind(this));
    }   
    InitLayer() {
        this.mPassLabel.string = `关卡 ${this.mPassLevel }`;
        this.UpdateEffectButton();
        this.UpdateMusicButton();
    } 
    //更新音乐按钮的状态
    private UpdateMusicButton(){
        let audioProxy: AudioProxy = _Facade.FindProxy(AudioProxy);
        let status:boolean = audioProxy.GetMusicStatus();
        this.mMusicsButton.getComponent(Sprite).grayscale = !status;
    }   
    private UpdateEffectButton(){
        let audioProxy: AudioProxy = _Facade.FindProxy(AudioProxy);
        let status:boolean = audioProxy.GetEffectStatuc();
        this.mEffectButton.getComponent(Sprite).grayscale = !status;
    }
    //更新特效按钮的状态
    private CloseWindowHandle(){
        _Facade.Send(NotificationEnum.CloseWindow,GameMenuMediator.MediatorName);
    }
    private AbortPassHandle(){
        _Facade.Send(NotificationEnum.CloseWindow,GameMenuMediator.MediatorName);
        _Facade.Send(NotificationEnum.CloseWindow,MainGameMediator.MediatorName);
    }

    private MusicButtonHandle(){
        let gameSettingProxy: GameSettingProxy = _Facade.FindProxy(GameSettingProxy);
        let audioProxy: AudioProxy = _Facade.FindProxy(AudioProxy);
        let status:boolean = audioProxy.GetMusicStatus(); 
        gameSettingProxy.SetSetting(GameSetting.MUSIC, status?0:1);
        _Facade.Send(NotificationEnum.SetMusicVolume,!status);
    }
    private EffectButtonHandle(){
        let gameSettingProxy: GameSettingProxy = _Facade.FindProxy(GameSettingProxy);
        let audioProxy: AudioProxy = _Facade.FindProxy(AudioProxy);
        let status:boolean = audioProxy.GetEffectStatuc(); 
        gameSettingProxy.SetSetting(GameSetting.SOUND_EFFECT, status?0:1);
        _Facade.Send(NotificationEnum.SetEffectVolume,!status);
    }
}