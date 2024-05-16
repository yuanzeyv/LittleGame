
import {_Facade, _G} from '../../../Global';
import { Button, Prefab, Size, UITransform, _decorator, find ,Node} from 'cc';
import { ScrollAdapter, Holder, IElement, View, WrapMode } from '../../../Util/adapter'; 
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { GetTextMeshComp } from '../../../Util/Util';
import { IServerInfoItem, LoginProxy } from '../../Proxy/LoginProxy/LoginProxy';
import { SelectServerLayer } from './SelectServerLayer';
import { eNotice } from '../../../NotificationTable';
import { MultWindowProxy } from '../../Proxy/MultWindowProxy/MultWindowProxy';
const { ccclass, property,type} = _decorator;
interface IFixedModel {
    index:number;
    serverLayer:SelectServerLayer;
    pageMap:Array<IServerInfoItem>;
} 
@ccclass('ServerSelectScrollView')
export class ServerSelectScrollView extends ScrollAdapter<IFixedModel> { 
    public mSelectIndex:number = 0;  
    public getPrefab(data: IFixedModel): Node | Prefab { 
        return _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/ServerChooseLayer/Comp/ChooseServerBtn",Prefab); 
    }
    
    public getView(): View<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyView(this)  } 
    public getHolder(node: Node, code: string): Holder<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyHolder(node, code, this) }
    public initElement(element: IElement, data: IFixedModel): void {
        element.wrapBeforeMode = WrapMode.Auto
    }  

    public UpdateView(serverLayer:SelectServerLayer,pageMap:Array<IServerInfoItem>){
        let list:IFixedModel[] = []; 
        this.modelManager.clear();//立即进行数据更新
        for(let index = 0;index < pageMap.length ;index++)
            list.push({index:index,pageMap:pageMap,serverLayer:serverLayer});
        this.modelManager.insert(list);
        //this.modelManager.update();//立即进行数据更新
    } 
}
  
class MyView extends View<IFixedModel> {  
    protected onVisible(): void {}
    protected onDisable(): void {}
}
 
class MyHolder extends Holder<IFixedModel>{ 
    protected onCreated(): void {
    }
    protected onVisible(): void {    
        let serveInfo:IServerInfoItem = this.data.pageMap[this.data.index];
        GetTextMeshComp(find("ServerName",this.node)).string = serveInfo.serverName; 
        GetTextMeshComp(find("ServerPlayerCountLayer",this.node)).string = `在线人数:${serveInfo.onLineNum}`; 

        this.data.serverLayer.RegisterButtonEvent(this.node,this.OnTouchHandle,this)
    }    
 
    protected OnTouchHandle():void  {
        let serveInfo:IServerInfoItem = this.data.pageMap[this.data.index];
        _Facade.FindProxy(LoginProxy).SetSelectServer(serveInfo);
        
        _Facade.Send(eNotice.MultPanleClose,this.data.serverLayer.WindowID);
    }

    protected onDisable(): void {   
        this.data.serverLayer.UnregisterButtonClick(this.node,this.OnTouchHandle);
    }  
}  