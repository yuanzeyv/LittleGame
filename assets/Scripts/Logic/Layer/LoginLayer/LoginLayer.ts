import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, Label } from 'cc'; 
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { NetProxy } from '../../Proxy/NetProxy/NetProxy';
const { ccclass, property,type} = _decorator;
enum ConnectFlag{
    NotConnect,
    Connect,
    ConnectSuccess,
    ConnectFail,
    ConnectTimeOut,
    AuthSuccess,
    AutFail,
    StartAuth,
}
@ccclass('LoginLayer')
export class LoginLayer extends BaseLayer {
    @property({type:Button,displayName:"开始按钮"})
    private m_StartButton:Button;
    @property({type:Label,displayName:"验证Label"})
    private m_AuthLabel:Label;
    private m_ConnectFlag:ConnectFlag = ConnectFlag.NotConnect;//默认为未连接
    private m_ConnectWaitTime:number = 0;
    private m_ConnectLabelArray:Array<string> = new Array<string>("正在连接","正在连接.","正在连接..","正在连接...","正在连接....");
    private m_AuthLabelArray:Array<string> = new Array<string>("正在验证","正在验证.","正在验证..","正在验证...","正在验证....");

    InitData() {
        this.m_StartButton.node.on("click",this.StartButtonTouchHandle.bind(this));
    } 
    protected RegisterExecuteHandle(executeMap:Map<string,LayerExecute> ){
        executeMap
        .set(NotificationEnum.NetStartConnect,this.NetStartConnectHandle.bind(this))//网络开始连接时的返回
        .set(NotificationEnum.NetConnectSuccess,this.NetConnectSuccessHandle.bind(this))//网络连接成功时的返回
        .set(NotificationEnum.NetConnectFail,this.NetConnectFailHandle.bind(this))//网络连接失败时的返回
        .set(NotificationEnum.NetAuthSuccess,this.NetAuthSuccessHandle.bind(this))//验证成功时的返回
        .set(NotificationEnum.NetAuthFail,this.NetAuthFailHandle.bind(this))//验证失败时的返回
        .set(NotificationEnum.NetStartAuth,this.NetStartAuthHandle.bind(this))//网络开始验证
        
    }
    SetConnectStatus(flag:ConnectFlag){//设置连接状态
        this.m_ConnectFlag = flag;
        this.m_ConnectWaitTime = 0;//每次设置都会清零
        this.RefreshStatusLabel(0);//立即刷新，期望能用极短的时间进行显示一下
    }
    RefreshStatusLabel(dt:number){
        let index:number = 0;
        switch(this.m_ConnectFlag){
            case ConnectFlag.NotConnect:
                this.m_AuthLabel.string = "";
                break;
            case ConnectFlag.Connect:
                this.m_ConnectWaitTime += dt;
                index = Math.floor(this.m_ConnectWaitTime / 0.1) % this.m_ConnectLabelArray.length;
                this.m_AuthLabel.string = this.m_ConnectLabelArray[index];
                break;
            case ConnectFlag.ConnectSuccess:
                this.m_AuthLabel.string = "网络连接成功";
                break;
            case ConnectFlag.ConnectFail:
                this.m_AuthLabel.string = "网络连接失败";
                break;
            case ConnectFlag.ConnectTimeOut:
                this.m_AuthLabel.string = "网络连接超时";
                break;
            case ConnectFlag.AutFail:
                this.m_AuthLabel.string = "登录信息验证失败";
                break; 
            case ConnectFlag.AuthSuccess:
                this.m_AuthLabel.string = "登录信息验证成功";
                break;
            case ConnectFlag.StartAuth:
                this.m_ConnectWaitTime += dt;
                index = Math.floor(this.m_ConnectWaitTime / 0.1)  % this.m_AuthLabelArray.length;
                this.m_AuthLabel.string = this.m_AuthLabelArray[index];
                break;
        }
    }
    NetStartConnectHandle(data:any){
        this.SetConnectStatus(ConnectFlag.Connect);
    }

    NetConnectFailHandle(data:any){
        this.SetConnectStatus(ConnectFlag.ConnectFail);
    }

    NetConnectSuccessHandle(data:any){
        this.SetConnectStatus(ConnectFlag.ConnectSuccess);
    }

    NetStartAuthHandle(data:any){
        this.SetConnectStatus(ConnectFlag.StartAuth);
    }

    NetConnectTimeOutHandle(data:any){
        this.SetConnectStatus(ConnectFlag.ConnectTimeOut);
    }
 
    NetAuthSuccessHandle(data:any){
        this.SetConnectStatus(ConnectFlag.AuthSuccess);
    }

    NetAuthFailHandle(data:any){
        this.SetConnectStatus(ConnectFlag.AutFail);
    }

    StartButtonTouchHandle(){   
        //准备连接网络，并进行验证
       let netProxy:NetProxy = _Facade.FindProxy( NetProxy);
       netProxy.SetUserAccount("Ze");//设置用户账号
       netProxy.SetPassWord("123456");//设置用户密码
       netProxy.Connect();//开始连接游戏 
    }

    update(dt:number){
        this.RefreshStatusLabel(dt);
    }

    
}


