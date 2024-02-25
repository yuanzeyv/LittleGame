export enum eNotice {
    TestOpen = "TestOpen",
    INVALID = "",

    //Tips用
    TipsLayerOpen = "TipsOpen",
    TipsLayerClose = "TipsLayerClose",
    TipsShow = "TipsShow",

    
    //Bundle加载成功结束消息
    EnterGame = "EnterGame", 

    LoadScene = "LoadScene",
    //Window 窗口管理 
    UpdateWindow = "UpdateWindow",
    CloseWindow = "CloseWindow",

    InitGameData = "InitGameData",
    //音效界面用
    EffectPlayFinish = "EffectPlayFinish",

    //登录界面
    LongInOpen = "LongInOpen",
    LoginInClose = "LoginInClose",
    //游戏主界面
    MainLayerOpen = "MainLayerOpen",
    MainLayerClose = "MainLayerClose",
    //热更新界面用
    HotUpdateOpen = "HotUpdateOpen",
    HotUpdateClose = "HotUpdateClose",

    //登录服务器界面
    SelectLoginServerLayerOpen = "SelectLoginServerLayerOpen",

    //关卡界面
    PassSelectOpen = "PassSelectOpen",
    UpdatePageCount = "UpdatePageCount",
    //刷新关卡数据
    RefreshRoundData= "RefreshRoundData",
    //主盒子界面用
    MainBoxLayerOpen = "MainBoxLayerOpen",

    //主盒子界面用
    MainGameLayerOpen = "MainGameLayerOpen",

    

    
    //公告用
    AnnouncementOpen = "AnnouncementOpen",
    AnnouncementShow = "AnnouncementShow",

    //公告用
    FightLayerOpen = "FightLayerOpen", 

    //播放音效用
    MusicControlLayerOpem = "MusicControlLayerOpem",
    
    PlayAudioEffect = "PlayAudioEffect",
    PlayMusic = "PlayMusic",
    StopMusic = "StopMusic",
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
    FishLoadingLayerClose = "FishLoadingLayerClose",
    FishMenuLayerOpen = "FishMenuLayerOpen",
    FishSettingLayerOpen = "FishSettingLayerOpen",//设置界面
    FishSettingLayerClose = "FishSettingLayerClose",//设置界面关闭
    FishCommonLayerOpen = "FishCommonLayerOpen",//通用界面
    FishCommonLayerClose  = "FishCommonLayerClose",//通用界面
    //小鱼游戏主界面
    FishMainGameLayerOpen = "FishMainLayerOpen",//通用界面
    GenerateFish = "GenerateFish",//生产一条小鱼
    
    //页签用
    UpdatePageCell = "UpdatePageCell",

    //提示窗口
    TipsWindowLayerOpen = "TipsWindowLayerOpen",
    TipsWindowLayerClose = "TipsWindowLayerClose",
    HelpWindowLayerOpen = "HelpWindowLayerOpen",
    HelpWindowLayerClose = "HelpWindowLayerClose",
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

    //选择宠物面板
    FishChoosePetsLayerOpen = "FishChoosePetsLayerOpen",//宠物选择面板打开
    FishChoosePetsLayerClose = "FishChoosePetsLayerClose",//宠物选择面板关闭

    //多面板管理
    OpenMultLayer = "OpenMultLayer",//打开多面板界面

    //添加 删除 一个节点到WindowProxy 
    AddWindowNode = "AddWindowNode",
    DelWindowNode = "DelWindowNode",
    //打开 与 关闭 一个界面时
    OpenLayer = "OpenLayer",
    CloseLayer = "CloseLayer",

    //协议多面板打开命令
    ProtocolMultPanelOpen = "ProtocolMultPanelOpen",
    ProtocolMultPanelClose = "ProtocolMultPanelClose",

    //连接游戏服务器成功，准备进行登录验证
    ConnectGameServerSuccess = "ConnectGameServerSuccess",
}
