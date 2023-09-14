import {
    BaseMVCRegister,
    CommandConstructor,
    MediatorConstructor,
    ProxyConstructor
} from "../Frame/MVCRegister/BaseMVCRegister";
import {AuthSuccessCommand} from "../Logic/Control/AuthSuccessCommand";
import {AnnouncementMediator} from "../Logic/Mediator/AnnouncementMediator/AnnouncementMediator";

import {LogInMeidator} from "../Logic/Mediator/LogInMediator/LogInMeidator";
import {SelectPassMediator} from "../Logic/Mediator/SelectPassMediator/SelectPassMediator";
import {TipsMediator} from "../Logic/Mediator/TipsMediator/TipsMediator";
import {UserBaseMediator} from "../Logic/Mediator/UserBaseMediator/UserBaseMediator";
import {WindowMediator} from "../Logic/Mediator/WindowMediator/WindowMediator";
import {AudioProxy} from "../Logic/Proxy/AudioProxy/AudioProxy";
import {GameSettingProxy} from "../Logic/Proxy/GameSettingProxy/GameSettingProxy";
import {NetDispatchProxy} from "../Logic/Proxy/NetDispatchProxy/NetDispatchProxy";
import {NetProxy} from "../Logic/Proxy/NetProxy/NetProxy";
import {PagePassProxy} from "../Logic/Proxy/PagePassProxy/PagePassProxy";
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
import { FishLoadingMediator } from "../Logic/Mediator/FishLoadingMediator/FishLoadingMediator";
import { FishMenuMediator } from "../Logic/Mediator/FishMenuMediator/FishMenuMediator";
import { FishSettingMediator } from "../Logic/Mediator/FishSettingMediator/FishSettingMediator";
import { FishCommonPopWindowMediator } from "../Logic/Mediator/FishCommonPopWindowMediator/FishCommonPopWindowMediator";
import { FishMainProxy } from "../Logic/Proxy/FishMainProxy/FishMainProxy";
import { FishMainGameMediator } from "../Logic/Mediator/FishMainGameMediator/FishMainGameMediator";
import { CheckFishPetLayerMediator } from "../Logic/Mediator/CheckFishPetLayerMediator/CheckFishPetLayerMediator";
import { BundleLoadResultCommand } from "../Logic/Control/BundleLoadResultCommand";
import { MusicProxy } from "../Logic/Proxy/MusicProxy/MusicProxy";
import { MusicControlMediator } from "../Logic/Mediator/MusicControlMediator/MusicControlMediator";

export class GameMVCRegister extends BaseMVCRegister {
    protected AllocCommand(commandMap: Map<NotificationEnum, CommandConstructor>): void {
        commandMap
        .set(NotificationEnum.NetAuthSuccess, AuthSuccessCommand)
        .set(NotificationEnum.InitGameData, InitGameDataCommand)
        .set(NotificationEnum.BundleLoadResult, BundleLoadResultCommand);
    }  

    protected AllocMediator(mediatorMap: Set<MediatorConstructor>): void {
        mediatorMap
            .add(WindowMediator)//主窗口的mediator
            .add(LogInMeidator)//登录界面的mediator
            .add(TipsMediator)//主窗口的mediator
            .add(AudioMediator)//音效用
            .add(AnnouncementMediator) //公告用
            .add(UserBaseMediator) //主界面信息
            .add(SelectPassMediator) //关卡界面用
            .add(TipsWindowMediator)
            .add(MainGameMediator)
            .add(HelpWindowMediator)
            .add(TipsPassFailMediator)
            .add(TipsPassWinMediator)
            .add(GameMenuMediator)
            .add(BannerAdvertisingMediator)
            .add(RewardedVideoAdvertisingMediator)
            .add(InterstitialAdvertisingMediator)
            .add(FishLoadingMediator)
            .add(FishMenuMediator)
            .add(FishSettingMediator) 
            .add(FishCommonPopWindowMediator)
            .add(FishMainGameMediator)    
            .add(CheckFishPetLayerMediator)   
            .add(MusicControlMediator)   
    }
    
    protected AllocProxy(proxyMap: Set<ProxyConstructor>): void {
        proxyMap
            .add(NetProxy)
            .add(NetDispatchProxy)
            .add(WindowProxy)
            .add(AudioProxy)
            .add(GameSettingProxy)
            .add(PagePassProxy)
            .add(ResouceProxy)
            .add(BundleProxy)
            .add(BannerAdvertisingProxy)
            .add(RewardedVideoAdvertisingProxy) 
            .add(InterstitialAdvertisingProxy)
            .add(UserDataProxy) 
            .add(FishMainProxy) 
            .add(MusicProxy) 
    }
} 
