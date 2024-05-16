import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _decorator, find } from 'cc'; 
import { ServerSelectScrollView } from './ServerSelectScrollView';
import { eNetProtocol } from '../../../NetNotification';
import { NetProxy } from '../../Proxy/NetProxy/NetProxy';
import { IServerInfoItem, LoginProxy } from '../../Proxy/LoginProxy/LoginProxy';
const { ccclass} = _decorator;
@ccclass('SelectServerLayer') 
export class SelectServerLayer extends BaseLayer {
    private mWindowID:number = -1;
    private mServerChooseScrollView:ServerSelectScrollView//当前的选择服务器列表

    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.RefreshServerList,this.RefreshChooseListView.bind(this));
    } 
    
    InitNode() {
        this.mServerChooseScrollView = find("ServerChooseScrollView",this.node).getComponent(ServerSelectScrollView); //获取到选择服务器列表 
    } 
      
    InitData(windowID:number) {    
        this.mWindowID = windowID;
        _Facade.FindProxy(NetProxy).Send(eNetProtocol.QuaryServerList,{}); //发送一条查询服务器列表的消息
    }     
    
    public RefreshChooseListView():void{
        let pageMap:Array<IServerInfoItem> = _Facade.FindProxy(LoginProxy).GetServerInfos();//获取到所有的服务器列表
        this.mServerChooseScrollView.UpdateView(this,pageMap);
    }
    
    InitLayer() {     
        this.RefreshChooseListView();//刷新界面 
    }           
     
    onClose():void{      
    } 

    public get WindowID(){
        return this.mWindowID;
    }
}