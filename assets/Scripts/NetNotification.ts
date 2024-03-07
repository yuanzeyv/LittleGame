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
    
    CS_Test = "game.gameHandler.Check",//登入Connector服务器
    SC_Test = "game.gameHandler.Check",//登入Connector服务器

    SC_BagInit = "game.gameHandler.BagInfo",//游戏中背包状态初始化消息
    SC_AttrInit = "game.gameHandler.AttrInfo",//游戏中属性状态初始化消息 
}