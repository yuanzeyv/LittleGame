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
    //游戏主界面
    MainTopLayerOpen = "MainTopLayerOpen",
    MainTopLayerClose = "MainTopLayerClose",
    //热更新界面用
    HotUpdateOpen = "HotUpdateOpen",
    HotUpdateClose = "HotUpdateClose",
    //游戏的服务器选择界面
    RefreshServerList = "RefreshServerList",

    //登录服务器界面
    SelectLoginServerLayerOpen = "SelectLoginServerLayerOpen",
    RefreshSelectServer = "RefreshSelectServer",

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
    MusicControlLayerOpen = "MusicControlLayerOpen",
    
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

    //打开底部功能菜单
    OpenBottomMenuLayer = "OpenBottomMenuLayer",
    CloseBottomMenuLayer = "CloseBottomMenuLayer",

    //打开背包界面
    OpenBagLayer = "OpenBagLayer",
    CloseBagLayer = "CloseBagLayer",
    OpenMultBagLayer = "OpenMultBagLayer",
    ClosMultBagLayer = "ClosMulteBagLayer",
    AddMultBagLayer = "AddMultBagLayer",

    //多面板界面打开函数
    MultPanleOpen = "MultPanleOpen",
    MultPanleClose = "MultPanleClose",
    MultPanleAdd = "MultPanleAdd",//添加一个面板到多面板
    
    //背包多面板节点
    BagPanelAdd = "BagPanelAdd",//背包多面板添加

    //刷新玩家属性信息
    RefreshAttr = "RefreshAttr",

    OpenFightLayer = "OpenFightLayer",//打开战斗界面
    CloseFightLayer = "CloseFightLayer",//关闭战斗界面

    /*
    *战斗相关的逻辑
    */
   FightEventExecuteFinish = "FightEventExecuteFinish",//单个战斗事件处理完毕
   FightAttrInit = "FightAttrInit",//战斗属性初始化通知
   InsertCampBuff = "InsertCampBuff",//插入了一个战斗Buff
   BattleRoundChange = "BattleRoundChange",//战斗回合数发生变动
   PlayerMoveTo = "PlayerMoveTo",//玩家移动通知
   PlayerAttack = "PlayerAttack",//玩家攻击通知
   PlayerAttackSuckBlood = "PlayerAttackSuckBlood",//玩家进行吸血
   PlayerBuffTrigger = "PlayerBuffTrigger",//玩家Buff触发通知
   BattleAttrUpdate = "BattleAttrUpdate",//玩家属性更新
    

   FightStart = "FightStart",//战斗开始
   FIghtRoundStart = "FIghtRoundStart",//战斗回合开始
   FightRoundEnd = "FightRoundEnd",//战斗回合结束
   FightAttrChange = "FightAttrChange",//玩家属性变动
   FightEnd = "FightEnd",//战斗结束

   UpdateCampAttrs = "UpdateCampAttrs",//更新阵营血量

   /*
   *打开服务器选择列表
   */ 
    OpenMultChooseServerLayer = "OpenMultChooseServerLayer",
    ClosMultChooseServerLayer = "ClosMultChooseServerLayer",
    AddMultMultChooseServerLayer = "AddMultMultChooseServerLayer",

    OpenChooseServerLayer = "OpenChooseServerLayer",
    ClosChooseServerLayer = "ClosChooseServerLayer",

    //登录界面
    PhysicsLayerOpen = "PhysicsLayerOpen",
    PhysicsLayerClose = "PhysicsLayerClose",
 
    //作弊器界面
    CheatPokerLayerOpen = "CheatPokerLayerOpen" ,
    CheatPokerLayerClose = "CheatPokerLayerClose"  ,

    //物理小游戏用
    RefreshOperationInfo = "RefreshOperationInfo",//刷新角色的操作信息
    RefreshCurrencyInfo = "RefreshCurrencyInfo",//刷新角色货币信息
    RoomEnterWorld = "RoomEnterWorld",//添加一个房间信息 
    ActorEnterWorld = "ActorEnterWorld",//添加一个角色信息
    NightmareEnterWorld = "NightmareEnterWorld",//添加一个梦魇进场信息
    PlayerBaseBeAttack = "PlayerBaseBeAttack",//对一个角色造成了伤害时
    
    AddOperationInfo = "AddOperationInfo",//添加了一个操作变动的功能
    DelOperationInfo = "DelOperationInfo",//删除了一个操作变动的功能

    AddPhysicsCollider = "AddPhysicsCollider",//添加一个物理世界碰撞器
    DelPhysicsCollider = "DelPhysicsCollider",//添加一个物理世界碰撞器

    AddPhysicsRigidBody = "AddPhysicsRigidBody",//添加了一个物理世界刚体
    DelPhysicsRigidBody = "DelPhysicsRigidBody",//删除了一个物理世界刚体
    
    PlayerBaseAttrChange = "PlayerBaseAttrChange",//玩家属性变动  
   /* 
   *打开建筑选择列表  
   */ 
   OpenMultBuildingChooseLayer = "OpenMultBuildingChooseLayer",
   CloseMultBuildingChooseLayer = "CloseMultBuildingChooseLayer",
   AddMultBuildingChooseLayer = "AddMultBuildingChooseLayer",

   OpenBuildingChooseLayer = "OpenBuildingChooseLayer",
   CloseBuildingChooseLayer = "CloseBuildingChooseLayer",
   
   OpenBuildingInfoLayer = "OpenBuildingInfoLayer",
   CloseBuildingInfoLayer = "CloseBuildingInfoLayer",

   /*小游戏选择界面*/
    MiniGameMenuLayerOpen = "MiniGameMenuLayerOpen",
    MiniGameMenuLayerClose = "MiniGameMenuLayerClose0",


    /*
    *勇往直前小游戏消息通知
    */
    OnlyTheBraveOpen = "OnlyTheBraveOpen",//界面打开用
    OnlyTheBraveClose = "OnlyTheBraveClose",//界面关闭用

    OnlyTheBravePhysicsRigidBodyEnterView = "OnlyTheBravePhysicsRigidBodyEnterView",//一个物理对象 进入了游戏视野时
    OnlyTheBravePhysicsRigidBodyLeaveView = "OnlyTheBravePhysicsRigidBodyLeaveView",//一个物理对象 离开了游戏视野时

    JoystickTouchChange = "JoystickTouchChange",//手柄触摸进度改变
}