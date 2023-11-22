import { BaseMVCRegister, CommandConstructor, MediatorConstructor, ProxyConstructor } from "./Frame/MVCRegister/BaseMVCRegister";
import { AuthSuccessCommand } from "./Logic/Control/AuthSuccessCommand";
import { EnterGameCommand } from "./Logic/Control/EnterGameCommand";
import { InitGameDataCommand } from "./Logic/Control/InitGameDataCommand";
import { AnnouncementMediator } from "./Logic/Mediator/AnnouncementMediator/AnnouncementMediator";
import { BannerAdvertisingMediator } from "./Logic/Mediator/BannerAdvertisingMediator/BannerAdvertisingMediator";
import { CheckFishPetLayerMediator } from "./Logic/Mediator/CheckFishPetLayerMediator/CheckFishPetLayerMediator";
import { FightMediator } from "./Logic/Mediator/FightMediator/FightMediator";
import { FishCommonPopWindowMediator } from "./Logic/Mediator/FishCommonPopWindowMediator/FishCommonPopWindowMediator";
import { FishLoadingMediator } from "./Logic/Mediator/FishLoadingMediator/FishLoadingMediator";
import { FishMainGameMediator } from "./Logic/Mediator/FishMainGameMediator/FishMainGameMediator";
import { FishMenuMediator } from "./Logic/Mediator/FishMenuMediator/FishMenuMediator";
import { FishSettingMediator } from "./Logic/Mediator/FishSettingMediator/FishSettingMediator";
import { HelpWindowMediator } from "./Logic/Mediator/HelpWindowMediator/HelpWindowMediator";
import { InterstitialAdvertisingMediator } from "./Logic/Mediator/InterstitialAdvertisingMediator/InterstitialAdvertisingMediator";
import { MusicControlMediator } from "./Logic/Mediator/MusicControlMediator/MusicControlMediator";
import { RewardedVideoAdvertisingMediator } from "./Logic/Mediator/RewardedVideoAdvertisingMediator/RewardedVideoAdvertisingMediator";
import { TipsMediator } from "./Logic/Mediator/TipsMediator/TipsMediator";
import { TipsWindowMediator } from "./Logic/Mediator/TipsWindowMediator/TipsWindowMediator"; 
import { WindowMediator } from "./Logic/Mediator/WindowMediator/WindowMediator";
import { BannerAdvertisingProxy } from "./Logic/Proxy/BannerAdvertisingProxy/BannerAdvertisingProxy";
import { BiologyAttrProxy } from "./Logic/Proxy/BiologyAttrProxy/BiologyAttrProxy";
import { BiologySatietyProxy } from "./Logic/Proxy/BiologySatietyProxy/BiologySatietyProxy";
import { BuffProxy } from "./Logic/Proxy/BuffProxy/BuffProxy";
import { BundleProxy } from "./Logic/Proxy/BundleProxy/BundleProxy";
import { FishMainProxy } from "./Logic/Proxy/FishMainProxy/FishMainProxy";
import { InterstitialAdvertisingProxy } from "./Logic/Proxy/InterstitialAdvertisingProxy/InterstitialAdvertisingProxy";
import { MusicProxy } from "./Logic/Proxy/MusicProxy/MusicProxy";
import { NetDispatchProxy } from "./Logic/Proxy/NetDispatchProxy/NetDispatchProxy";
import { NetProxy } from "./Logic/Proxy/NetProxy/NetProxy"; 
import { NetWorkProxy } from "./Logic/Proxy/NetWorkProxy/NetWorkProxy";
import { RewardedVideoAdvertisingProxy } from "./Logic/Proxy/RewardedVideoAdvertisingProxy/RewardedVideoAdvertisingProxy";
import { WindowProxy } from "./Logic/Proxy/WindowProxy/WindowProxy";
import { eNotificationEnum } from "./NotificationTable";

export class GameMVCRegister extends BaseMVCRegister {
    protected AllocCommand(commandMap: Map<eNotificationEnum, CommandConstructor>): void {
        commandMap
        .set(eNotificationEnum.NetAuthSuccess, AuthSuccessCommand)
        .set(eNotificationEnum.InitGameData, InitGameDataCommand)
        .set(eNotificationEnum.EnterGame, EnterGameCommand);
    }  
    protected AllocMediator(mediatorMap: Map<MediatorConstructor, string>): void {
        mediatorMap
            .set(WindowMediator,"WindowMediator")//主窗口的mediator
            .set(TipsMediator,"TipsMediator")//主窗口的mediator 
            .set(AnnouncementMediator,"AnnouncementMediator") //公告用 
            .set(TipsWindowMediator,"TipsWindowMediator")
            .set(HelpWindowMediator,"HelpWindowMediator") 
            .set(BannerAdvertisingMediator,"BannerAdvertisingMediator")
            .set(RewardedVideoAdvertisingMediator,"RewardedVideoAdvertisingMediator")
            .set(InterstitialAdvertisingMediator,"InterstitialAdvertisingMediator")
            .set(FishLoadingMediator,"FishLoadingMediator")
            .set(FishMenuMediator,"FishMenuMediator")
            .set(FishSettingMediator,"FishSettingMediator") 
            .set(FishCommonPopWindowMediator,"FishCommonPopWindowMediator")
            .set(FishMainGameMediator,"FishMainGameMediator")    
            .set(CheckFishPetLayerMediator,"CheckFishPetLayerMediator")   
            .set(MusicControlMediator,"MusicControlMediator")   
            .set(FightMediator,"FightMediator")  //战斗用Mediator 
    } 
    protected AllocProxy(proxyMap: Set<ProxyConstructor>): void {
        proxyMap
            .add(NetProxy)
            .add(NetDispatchProxy)
            .add(WindowProxy)
            //ResouceProxy.add(ResouceProxy)
            .add(BundleProxy)
            .add(BannerAdvertisingProxy)
            .add(RewardedVideoAdvertisingProxy)  
            .add(InterstitialAdvertisingProxy)
            .add(FishMainProxy) 
            .add(MusicProxy) 
            .add(BuffProxy) 
            .add(BiologyAttrProxy) 
            .add(BiologySatietyProxy) 
            .add(NetWorkProxy) 
            
    }
}  
 