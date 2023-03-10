export enum NotificationEnum {
    INVALID = "",

    C_LoadScene = "C_LoadScene",
    //Window 窗口管理
    M_CreateWindow = "M_CreateWindow",
    M_UpdateWindow = "M_UpdateWindow",
    M_CloseWindow = "M_CloseWindow",
    M_PrefabLoadSuccess = "M_PrefabLoadSuccess",
    M_PrefabLoadFail = "M_SetWindowPrefab",
    M_SetWindowPrefab = "M_SetWindowPrefab",

    //登录界面
    M_LongInOpen = "M_LongInOpen",

    //主盒子界面用
    M_MainBoxLayerOpen = "M_MainBoxLayerOpen",

    //Tips用
    M_TipsOpen = "M_TipsOpen",
    M_TipsShow = "M_TipsShow",

    //公告用
    M_AnnouncementOpen = "M_AnnouncementOpen",
    M_AnnouncementShow = "M_AnnouncementShow",

    //播放音效用
    M_PlayAudioEffect = "M_PlayAudioEffect",

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

    //主盒子界面用
    ChangeNameOpen = "ChangeNameOpen",
    //底部按钮框
    MainMenuOpen = "MainMenuOpen",

    //打开战斗界面
    FightLayerOpen = "FightLayerOpen",
    FightLayerClose = "FightLayerClose",
    //打开人物界面
    PlayerLayerOpen = "PlayerLayerOpen",
    PlayerLayerClose = "PlayerLayerClose",
    //打开背包界面
    BagLayerOpen = "BagLayerOpen",
    BagLayerClose = "BagLayerClose",
    //打开世界界面
    WorldLayerOpen = "WorldLayerOpen",
    WorldLayerClose = "WorldLayerClose",
}