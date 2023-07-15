import {
    BaseMVCRegister,
    CommandConstructor,
    MediatorConstructor,
    ProxyConstructor
} from "../Frame/MVCRegister/BaseMVCRegister";
import {AuthSuccessCommand} from "../Logic/Control/AuthSuccessCommand";
import {AnnouncementMediator} from "../Logic/Mediator/AnnouncementMediator/AnnouncementMediator";

import {GameBoxMediator} from "../Logic/Mediator/GameBoxMediator/GameBoxMediator";
import {GameMainMediator} from "../Logic/Mediator/GameMainMediator/GameMainMediator";
import {LogInMeidator} from "../Logic/Mediator/LogInMediator/LogInMeidator";
import {SelectPassMediator} from "../Logic/Mediator/SelectPassMediator/SelectPassMediator";
import {TestMediator} from "../Logic/Mediator/TestMediator/TestMediator";
import {TipsMediator} from "../Logic/Mediator/TipsMediator/TipsMediator";
import {UserBaseMediator} from "../Logic/Mediator/UserBaseMediator/UserBaseMediator";
import {WindowMediator} from "../Logic/Mediator/WindowMediator/WindowMediator";
import {AudioProxy} from "../Logic/Proxy/AudioProxy/AudioProxy";
import {GameSettingProxy} from "../Logic/Proxy/GameSettingProxy/GameSettingProxy";
import {NetDispatchProxy} from "../Logic/Proxy/NetDispatchProxy/NetDispatchProxy";
import {NetProxy} from "../Logic/Proxy/NetProxy/NetProxy";
import {PagePassProxy} from "../Logic/Proxy/PagePassProxy/PagePassProxy";
import {ImageResProxy} from "../Logic/Proxy/ResourceProxy/ImageResProxy";
import {ResouceProxy1} from "../Logic/Proxy/ResourceProxy/ResouceProxy";
import {TestProxy} from "../Logic/Proxy/TestProxy/TestProxy";
import {WindowProxy} from "../Logic/Proxy/WindowProxy/WindowProxy";
import {NotificationEnum} from "../NotificationTable";
import {AudioMediator} from "../Logic/Mediator/AudioMediator/AudioMediator";
import { ResouceProxy } from "../Logic/Proxy/BundleProxy/ResouceProxy";
import { BundleProxy } from "../Logic/Proxy/BundleProxy/BundleProxy";
import { TipsWindowMediator } from "../Logic/Mediator/TipsWindowMediator/TipsWindowMediator";
import { MainGameMediator } from "../Logic/Mediator/MainGameMediator/MainGameMediator";
import { HelpWindowMediator } from "../Logic/Mediator/HelpWindowMediator/HelpWindowMediator";
import { TipsPassFailMediator } from "../Logic/Mediator/TipsPassFailMediator/TipsPassFailMediator";
import { TipsPassWinMediator } from "../Logic/Mediator/TipsPassWinMediator/TipsPassWinMediator";
import { GameMenuMediator } from "../Logic/Mediator/GameMenuMediator/GameMenuMediator";
import { InitGameDataCommand } from "../Logic/Control/InitGameDataCommand";
import { BannerAdvertisingMediator } from "../Logic/Mediator/BannerAdvertisingMediator/BannerAdvertisingMediator";
import { BannerAdvertisingProxy } from "../Logic/Proxy/BannerAdvertisingProxy/BannerAdvertisingProxy";
import { RewardedVideoAdvertisingProxy } from "../Logic/Proxy/RewardedVideoAdvertisingProxy/RewardedVideoAdvertisingProxy";
import { RewardedVideoAdvertisingMediator } from "../Logic/Mediator/RewardedVideoAdvertisingMediator/RewardedVideoAdvertisingMediator";
import { InterstitialAdvertisingMediator } from "../Logic/Mediator/InterstitialAdvertisingMediator/InterstitialAdvertisingMediator";
import { InterstitialAdvertisingProxy } from "../Logic/Proxy/InterstitialAdvertisingProxy/InterstitialAdvertisingProxy";
import { UserDataProxy } from "../Logic/Proxy/UserDataProxy/UserDataProxy";

export class GameMVCRegister extends BaseMVCRegister {
    protected AllocCommand(commandMap: Map<NotificationEnum, CommandConstructor>): void {
        commandMap
        .set(NotificationEnum.NetAuthSuccess, AuthSuccessCommand)
        .set(NotificationEnum.InitGameData, InitGameDataCommand);
    }

    protected AllocMediator(mediatorMap: Set<MediatorConstructor>): void {
        mediatorMap
            .add(TestMediator) //测试用界面
            .add(WindowMediator)//主窗口的mediator
            .add(GameBoxMediator)//主窗口的mediator
            .add(LogInMeidator)//登录界面的mediator
            .add(TipsMediator)//主窗口的mediator
            .add(AudioMediator)//音效用
            .add(AnnouncementMediator) //公告用
            .add(UserBaseMediator) //主界面信息
            .add(SelectPassMediator) //关卡界面用
            //.add(GameMainMediator) //主关卡界面
            .add(TipsWindowMediator)
            .add(MainGameMediator)
            .add(HelpWindowMediator)
            .add(TipsPassFailMediator)
            .add(TipsPassWinMediator)
            .add(GameMenuMediator)
            .add(BannerAdvertisingMediator)
            .add(RewardedVideoAdvertisingMediator)
            .add(InterstitialAdvertisingMediator)
    }
    
    protected AllocProxy(proxyMap: Set<ProxyConstructor>): void {
        proxyMap
            .add(TestProxy)
            .add(NetProxy)
            .add(NetDispatchProxy)
            .add(WindowProxy)
            .add(AudioProxy)
            .add(GameSettingProxy)
            .add(ImageResProxy)
            .add(PagePassProxy)
            .add(TestProxy)
            .add(ResouceProxy)
            .add(BundleProxy)
            .add(BannerAdvertisingProxy)
            .add(RewardedVideoAdvertisingProxy)
            .add(InterstitialAdvertisingProxy)
            .add(UserDataProxy)
    }
}
