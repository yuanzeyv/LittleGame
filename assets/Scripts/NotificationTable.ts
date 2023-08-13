export enum NotificationEnum {
    TestOpen = "TestOpen",

    INVALID = "",

    LoadScene = "LoadScene",
    //Window 窗口管理 
    UpdateWindow = "UpdateWindow",
    CloseWindow = "CloseWindow", 

    InitGameData = "InitGameData",

    //登录界面
    LongInOpen = "LongInOpen",

    //关卡界面
    PassSelectOpen = "PassSelectOpen",
    UpdatePageCount = "UpdatePageCount",
    //刷新关卡数据
    RefreshRoundData= "RefreshRoundData",
    //主盒子界面用
    MainBoxLayerOpen = "MainBoxLayerOpen",

    //主盒子界面用
    MainGameLayerOpen = "MainGameLayerOpen",

    //Tips用
    M_TipsOpen = "TipsOpen",
    M_TipsShow = "TipsShow",

    //公告用
    AnnouncementOpen = "AnnouncementOpen",
    AnnouncementShow = "AnnouncementShow",

    //播放音效用
    PlayAudioEffect = "PlayAudioEffect",
    PlayMusic = "PlayMusic",
    SetMusicVolume = "SetMusicVolume", 
    SetEffectVolume = "SetEffectVolume", 
    
    //网络相关的消息
    NetStartConnect = "NetStartConnect",
    NetConnectSuccess = "NetConnectSuccess",
    NetConnectFail = "NetConnectFail",
    M_NetDisConnect = "NetDisConnect",
    NetAuthSuccess = "NetAuthSuccess",
    NetAuthFail = "NetAuthFail",
    NetStartAuth = "NetStartAuth",
    NetAuthTimeOut = "NetAuthTimeOut",
    M_NetReconnectSuccess = "NetReconnectSuccess",
    M_NetReconnectFail = "NetReconnectFail",
    //玩家主界面信息界面打开
    UserBaseOpen = "UserBaseOpen",

    //游戏加载用
    FishLoadingLayerOpen = "FishLoadingLayerOpen",
    FishMenuLayerOpen = "FishMenuLayerOpen",
    FishSettingLayerOpen = "FishSettingLayerOpen",//设置界面
    FishCommonLayerOpen = "FishCommonLayerOpen",//通用界面

    //小鱼游戏主界面
    FishMainGameLayerOpen = "FishMainLayerOpen",//通用界面
    GenerateFish = "GenerateFish",//生产一条小鱼
    
    //页签用
    UpdatePageCell = "UpdatePageCell",

    //提示窗口
    TipsWindowLayerOpen = "TipsWindowLayerOpen",
    HelpWindowLayerOpen = "HelpWindowLayerOpen",
    //打开游戏
    MainGameOpen ="MainGameOpen",
    RefreshGamePass = "RefreshGamePass",//刷新当前关卡
    TipsPassFailLayerOpen = "TipsPassFailLayerOpen",
    TipsPassWinLayerOpen = "TipsPassWinLayerOpen",
    GameMenuLayerOpen = "GameMenuLayerOpen",

    //Banner广告
    BannerAdvertisingShow = "BannerAdvertisingShow",//Banner广告显示 
    BannerAdvertisingHide = "BannerAdvertisingHide",//Banner广告隐藏

    //激励视频相关
    RewardedVideoAdvertisingShow = "RewardedVideoAdvertisingShow",//显示激励广告

    //显示插屏广告
    InterstitialAdvertisingShow = "InterstitialAdvertisingShow",//显示插屏广告
}
