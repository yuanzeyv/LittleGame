import {_decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, Label, find, tween, sys} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global';
import {NotificationEnum} from '../../../NotificationTable';
import {wechatLogin} from '../../../api/WechatAPI';
import {GameSetting, GameSettingProxy} from '../../Proxy/GameSettingProxy/GameSettingProxy';
import { ResouceProxy } from '../../Proxy/BundleProxy/ResouceProxy';

const {ccclass, property, type} = _decorator;

export class LoginLayer extends BaseLayer {
    private m_StartButton: Node;//开始按钮
    private m_MusicButton: Node;//音乐按钮
    private m_SoundEffectButton: Node;//音效按钮
    private m_ShareButton: Node;//分享按钮
    private m_RankButton: Node;//排行榜按钮

    protected RegisterExecuteHandle(executeMap:Map<string,LayerExecute> ){
        executeMap
        .set(NotificationEnum.SetMusicVolume,this.UpdateMusicButtonSprite.bind(this))
        .set(NotificationEnum.SetEffectVolume,this.UpdateSoundEffectButtonSprite.bind(this))
    }

    InitNode(): void {
        this.m_StartButton = find("BackGround/StartButton", this.node);
        this.m_MusicButton = find("BackGround/MusicButton", this.node);
        this.m_SoundEffectButton = find("BackGround/SoundEffectButton", this.node);
        this.m_ShareButton = find("BackGround/ShareButton", this.node);
        this.m_RankButton = find("BackGround/RankButton", this.node);
    }

    InitData(): void {
        this.m_StartButton.on("click", this.StartButtonHandle.bind(this));
        this.m_MusicButton.on("click", this.MusicButtonHandle.bind(this));
        this.m_SoundEffectButton.on("click", this.SoundEffectButtonHandle.bind(this));
        this.m_ShareButton.on("click", this.ShareButtonHandle.bind(this));
        this.m_RankButton.on("click", this.RankButtonHandle.bind(this));
        _Facade.Send(NotificationEnum.PlayMusic, "resources/Sound/2");
    }

    InitLayer() {
        this.UpdateMusicButtonSprite();
        this.UpdateSoundEffectButtonSprite();
    }

    StartButtonHandle() {
        let rounds = (_G.userInfo && _G.userInfo.rounds) || [] 
        _Facade.Send(NotificationEnum.PassSelectOpen);
        //_Facade.Send(NotificationEnum.CloseWindow, LogInMeidator.MediatorName);
    }

    UpdateMusicButtonSprite() { 
        let gameSettingProxy: GameSettingProxy = _Facade.FindProxy(GameSettingProxy);
        let nowStatus = gameSettingProxy.GetSetting(GameSetting.MUSIC);
        let button: Button = this.m_MusicButton.getComponent(Button);
        if (nowStatus == 1)
            _Facade.FindProxy(ResouceProxy).Load(button,"resources/Images/Private/main/OpenVideo/spriteFrame","normalSprite");
        else
            _Facade.FindProxy(ResouceProxy).Load(button,"resources/Images/Private/TipsPassFailLayer/FailBackGround/spriteFrame", "normalSprite");
    }

    UpdateSoundEffectButtonSprite() {
        let gameSettingProxy: GameSettingProxy = _Facade.FindProxy(GameSettingProxy);
        let button: Button = this.m_SoundEffectButton.getComponent(Button);
        let newStatus = gameSettingProxy.GetSetting(GameSetting.SOUND_EFFECT);
        if (newStatus == 1)
            _Facade.FindProxy(ResouceProxy).Load(button,"resources/Images/Private/main/OpenEffect/spriteFrame","normalSprite");
        else
            _Facade.FindProxy(ResouceProxy).Load(button,"resources/Images/Private/TipsPassFailLayer/FailBackGround/spriteFrame", "normalSprite");
    }

    MusicButtonHandle() {
        let gameSettingProxy: GameSettingProxy = _Facade.FindProxy(GameSettingProxy);
        //首先获取到当前的音乐开关状态
        let newStatus = gameSettingProxy.GetSetting(GameSetting.MUSIC) == 1 ? 0 : 1;
        gameSettingProxy.SetSetting(GameSetting.MUSIC, newStatus);
        _Facade.Send(NotificationEnum.SetMusicVolume,newStatus == 1);
    }

    SoundEffectButtonHandle() {
        let gameSettingProxy: GameSettingProxy = _Facade.FindProxy(GameSettingProxy);
        //首先获取到当前的音乐图片状态
        let newStatus = gameSettingProxy.GetSetting(GameSetting.SOUND_EFFECT) == 1 ? 0 : 1;
        gameSettingProxy.SetSetting(GameSetting.SOUND_EFFECT, newStatus);
        _Facade.Send(NotificationEnum.SetEffectVolume,newStatus == 1);
    }

    ShareButtonHandle() {
        console.log("ShareButtonHandle");
    }

    RankButtonHandle() {
        _Facade.Send(NotificationEnum.TestOpen);
    }

    AfterLoad() {
        //this.initLoginButton();
    }

    async initLoginButton() {
        const _this = this;
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            //如果是微信平台
            window['wx'].login({
                //登录游戏
                success: function (res) {
                    if (res.code) {
                        console.log('登陆成功', res);
                    }
                    //创建一个全屏的授权按钮
                    let button = window['wx'].createUserInfoButton({
                        //创建一个获取用户信息的按钮
                        type: 'text',
                        text: '',
                        lang: 'zh_CN',
                        style: {
                            height: window['wx'].getSystemInfoSync().screenHeight,//获取屏幕的宽高
                            width: window['wx'].getSystemInfoSync().screenWidth,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#FF0000',
                            textAlign: 'center',
                        }
                    })
                    button.show()    //把按钮显示出来
                    button.onTap(async (res) => {
                        //监听按钮的点击
                        console.log('授权返回结果：', res);
                        if (res.errMsg === 'getUserInfo:ok') {
                            button.destroy()
                            await wechatLogin(res.userInfo, _this.StartButtonHandle)
                        } else {
                            console.log('授权失败');
                            _Facade.Send(NotificationEnum.M_TipsShow, res.errMsg);
                        }
                    })
                }
            }) 
        }
    }

}


