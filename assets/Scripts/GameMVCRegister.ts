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
import { FightLayerMediator } from "./Logic/Mediator/FightLayerMediator/FightLayerMediator";
import { SkeletonProxy } from "./Logic/Proxy/SkeletonProxy/SkeletonProxy";
import { FightEventFinishCommand } from "./Logic/Control/FightEventFinishCommand";
import { FightProxy } from "./Logic/Proxy/FightProxy/FightProxy";
import { SelectServerMediator } from "./Logic/Mediator/SelectServerMediator/SelectServerMediator";
import { SelectServerMultMediator } from "./Logic/Mediator/SelectServerMediator/SelectServerMultMediator";
import { UserBaseProxy } from "./Logic/Proxy/UserBaseProxy/UserBaseProxy";
import { PhysicsMediator } from "./Logic/Mediator/PhysicsMediator/PhysicsMediator";
import { PhysicsProxy } from "./Logic/Proxy/PhysicsProxy/PhysicsProxy"; 

export class GameMVCRegister extends BaseMVCRegister {
    protected AllocCommand(commandMap: Map<eNotice, CommandConstructor>): void {
        commandMap
        .set(eNotice.NetAuthSuccess, AuthSuccessCommand)
        .set(eNotice.InitGameData, InitGameDataCommand)
        .set(eNotice.EnterGame, EnterGameCommand)
        .set(eNotice.FightEventExecuteFinish, FightEventFinishCommand); 
        
    }  
    protected AllocMediator(mediatorMap: Map<MediatorConstructor, string>): void {
        mediatorMap 
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
            .set(FightLayerMediator,"FightLayerMediator")  //背包界面Mediator  
            .set(SelectServerMediator,"SelectServerMediator")  //服务器选择Mediator
            .set(SelectServerMultMediator,"SelectServerMultMediator")//服务器选择多面板  
            .set(PhysicsMediator,"PhysicsMediator")//服务器选择多面板  
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
            .add(SkeletonProxy) 
            .add(FightProxy) //战斗代理
            .add(UserBaseProxy) //角色基础信息代理
            .add(PhysicsProxy) //角色基础信息代理
    }
}  