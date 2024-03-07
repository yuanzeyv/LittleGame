import { BaseMVCRegister, CommandConstructor, MediatorConstructor, ProxyConstructor } from "./Frame/MVCRegister/BaseMVCRegister";
import { AuthSuccessCommand } from "./Logic/Control/AuthSuccessCommand";
import { EnterGameCommand } from "./Logic/Control/EnterGameCommand";
import { InitGameDataCommand } from "./Logic/Control/InitGameDataCommand";  
import { AnnouncementMediator } from "./Logic/Mediator/AnnouncementMediator/AnnouncementMediator";
import { BannerAdvertisingMediator } from "./Logic/Mediator/BannerAdvertisingMediator/BannerAdvertisingMediator";  
import { HotUpdateMediator } from "./Logic/Mediator/HotUpdateMediator/HotUpdateMediator";
import { InterstitialAdvertisingMediator } from "./Logic/Mediator/InterstitialAdvertisingMediator/InterstitialAdvertisingMediator";
import { LoginMediator } from "./Logic/Mediator/LoginMediator/LoginMediator";
import { MusicControlMediator } from "./Logic/Mediator/MusicControlMediator/MusicControlMediator";
import { RewardedVideoAdvertisingMediator } from "./Logic/Mediator/RewardedVideoAdvertisingMediator/RewardedVideoAdvertisingMediator";
import { TipsMediator } from "./Logic/Mediator/TipsMediator/TipsMediator"; 
import { WindowMediator } from "./Logic/Mediator/WindowMediator/WindowMediator";
import { BannerAdvertisingProxy } from "./Logic/Proxy/BannerAdvertisingProxy/BannerAdvertisingProxy"; 
import { BundleProxy } from "./Logic/Proxy/BundleProxy/BundleProxy";
import { InterstitialAdvertisingProxy } from "./Logic/Proxy/InterstitialAdvertisingProxy/InterstitialAdvertisingProxy";
import { LoginProxy } from "./Logic/Proxy/LoginProxy/LoginProxy";
import { MusicProxy } from "./Logic/Proxy/MusicProxy/MusicProxy";
import { NetDispatchProxy } from "./Logic/Proxy/NetDispatchProxy/NetDispatchProxy"; 
import { NetProxy } from "./Logic/Proxy/NetProxy/NetProxy";
import { NetWorkProxy } from "./Logic/Proxy/NetWorkProxy/NetWorkProxy";
import { PoolProxy } from "./Logic/Proxy/PoolProxy/PoolProxy";
import { RewardedVideoAdvertisingProxy } from "./Logic/Proxy/RewardedVideoAdvertisingProxy/RewardedVideoAdvertisingProxy";
import { WindowProxy } from "./Logic/Proxy/WindowProxy/WindowProxy";
import { eNotice } from "./NotificationTable";
import { MainMediator } from "./Logic/Mediator/MainMediator/MainMediator";
import { ResouceProxy } from "./Logic/Proxy/ResourceProxy/ResouceProxy";
import { MainTopMediator } from "./Logic/Mediator/MainTopMediator/MainTopMediator";
import { BottomMenuMediator } from "./Logic/Mediator/BottomMenuMediator/BottomMenuMediator";
import { BagMediator } from "./Logic/Mediator/BagMediator/BagMediator";
import { MultWindowMediator } from "./Logic/Mediator/MultWindowMediator/MultWindowMediator";
import { MultWindowProxy } from "./Logic/Proxy/MultWindowProxy/MultWindowProxy";
import { BagMultMediator } from "./Logic/Mediator/BagMediator/BagMultMediator";
import { BagProxy } from "./Logic/Proxy/BagProxy/BagProxy";
import { PlayerAttrProxy } from "./Logic/Proxy/PlayerAttrProxy/PlayerAttrProxy";

export class GameMVCRegister extends BaseMVCRegister {
    protected AllocCommand(commandMap: Map<eNotice, CommandConstructor>): void {
        commandMap
        .set(eNotice.NetAuthSuccess, AuthSuccessCommand)
        .set(eNotice.InitGameData, InitGameDataCommand)
        .set(eNotice.EnterGame, EnterGameCommand); 
    }  
    protected AllocMediator(mediatorMap: Map<MediatorConstructor, string>): void {
        mediatorMap
            .set(WindowMediator,"WindowMediator")//主窗口的mediator
            .set(TipsMediator,"TipsMediator")//主窗口的mediator 
            .set(AnnouncementMediator,"AnnouncementMediator") //公告用  
            .set(BannerAdvertisingMediator,"BannerAdvertisingMediator") 
            .set(RewardedVideoAdvertisingMediator,"RewardedVideoAdvertisingMediator")
            .set(InterstitialAdvertisingMediator,"InterstitialAdvertisingMediator")   
            .set(MusicControlMediator,"MusicControlMediator")     
            .set(LoginMediator,"LoginMediator")  //战斗用Mediator 
            .set(HotUpdateMediator,"HotUpdateMediator")  //战斗用Mediator 
            .set(MainMediator,"MainMediator")  //主界面Mediator 
            .set(MainTopMediator,"MainTopMediator")  //主界面Mediator 
            .set(BottomMenuMediator,"BottomMenuMediator")  //主界面Mediator 
            .set(BagMediator,"BagMediator")  //背包界面Mediator 
            .set(BagMultMediator,"BagMultMediator")  //背包界面Mediator 
            .set(MultWindowMediator,"MultWindowMediator")  //背包界面Mediator  
    }  
    
    protected AllocProxy(proxyMap: Set<ProxyConstructor>): void { 
        proxyMap
            .add(NetProxy) 
            .add(NetDispatchProxy) 
            .add(PoolProxy) 
            .add(WindowProxy) 
            .add(BundleProxy) 
            .add(BannerAdvertisingProxy)
            .add(RewardedVideoAdvertisingProxy)  
            .add(InterstitialAdvertisingProxy)
            .add(MusicProxy) 
            .add(NetWorkProxy)  
            .add(LoginProxy)//登录代理 
            .add(ResouceProxy)//登录代理  
            .add(MultWindowProxy) 
            .add(BagProxy) 
            .add(PlayerAttrProxy) 
    }
}  
 