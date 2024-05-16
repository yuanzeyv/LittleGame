export enum eNetProtocol {
    GateConnect = "GateConnect",//路由连接
    ConnectorConnect = "ConnectorConnect",//Connector连接
    DisConnect = "DisConnect",//关闭Socket连接
    Close = "Close",//关闭Socket连接
    Kick = "Kick",//被T下线
 
    GateInit = "gate.gateHandler.InitGate",//Connector连接
    QuaryServerList = "gate.gateHandler.QuaryServerList",//Connector连接

    CS_Login = "connector.entryHandler.Login",//登入Connector服务器
    SC_Login = "connector.entryHandler.Login",//登入Connector服务器

    SC_LoginSuccess = "connector.entryHandler.LoginSuccess",//玩家彻底的登入了服务区中时

    CS_Test = "game.gameHandler.Check",//登入Connector服务器
    SC_Test = "game.gameHandler.Check",//登入Connector服务器
    
    SC_UserInfoInit = "game.gameHandler.UserInfo",//游戏中初始化玩家属性的消息 
    SC_BagInit = "game.gameHandler.BagInfo",//游戏中背包状态初始化消息
    SC_AttrInit = "game.gameHandler.AttrInfo",//游戏中属性状态初始化消息 

    CS_GateLogin = "gate.gateHandler.Login",//网关服务器登陆，只有登陆上了网关服务器，才可以进行服务器的登陆
    SC_GateLogin = "gate.gateHandler.Login",//网关服务器登陆，只有登陆上了网关服务器，才可以进行服务器的登陆

    //道具系统，获得一个道具
    CS_CreateItem = "game.ItemHandle.CreateGoods",//类似GM系统，发送后，给予一个指定的
} 