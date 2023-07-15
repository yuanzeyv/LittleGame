export enum NotificationEnum {
    TestOpen = "TestOpen",

    INVALID = "",

    LoadScene = "LoadScene",
    //Window 窗口管理
    CreateWindow = "CreateWindow",
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
