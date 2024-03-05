import { _decorator, Component, Node, Prefab, director, Label, find, Button, Vec3, math, UITransform, Widget, Size } from 'cc'; 
import { IMultPanleStruct, MultPanleConfig } from '../../../Config/Cfg_MultPanle'; 
import { _Facade, _G } from '../../../Global';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy'; 
import { MultWindowLayer } from '../MultWindowLayer/MultWindowLayer';
import { ScrollAdapter, Holder, IElement, AlwaysScroll, View } from '../../../Util/adapter';
import { TextMeshLabel } from '../../../../../extensions/TextMesh Pro/assets/TextMesh/label/TextMeshLabel';
import { MultWindowParamMap } from '../../Proxy/MultWindowProxy/MultWindowTypeDefine';
const { ccclass, property } = _decorator;
export interface IFixedModel {index:number; panelID:number,} 
export class MultWindowPanel extends ScrollAdapter<IFixedModel> { 
    public mLayer:MultWindowLayer;
    public mSelectWindowID:number = 0; //默认选中2面板  
    private mPanelBtnMap:Map<number,number> = new Map<number,number>(); 
    public getPrefab(data: IFixedModel): Node | Prefab { 
        return _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/MultWindowLayer/Prefab/MultWindowCell",Prefab); 
    }
    public getView(): View<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyView(this)  } 
    public getHolder(node: Node, code: string): Holder<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyHolder(node, code, this) }
    public initElement(element: IElement, data: IFixedModel): void {}  
    public GetIndex(panelID:number):number{ return this.mPanelBtnMap.get(panelID); }
 
    public SetWindowLayer(windowLayer:MultWindowLayer){
        this.mLayer = windowLayer;
    }

    public SetTableViewData(viewData:Array<number>):void{
        this.mPanelBtnMap.clear(); 
        let list:IFixedModel[] = []; 
        for(let index = 0;index < viewData.length;index++){
            this.mPanelBtnMap.set(viewData[index],index); 
            list.push({index:index,panelID:viewData[index]});  
        }
        this.modelManager.insert(list);//可以打开面板了 
        this.SetSelectWindow(viewData[0]);
    }   

    public SetSelectWindow(windowID:number){
        let index:number|undefined = this.mPanelBtnMap.get(windowID);
        if(index == undefined)//如果没有设置的话，将会直接返回
            return;
        let config:IMultPanleStruct = MultPanleConfig.GetData(windowID)!;
        this.mSelectWindowID = windowID;
        this.scrollManager.scrollToGroupIndex(0,index + 1);  
        this.mLayer.SetWindowTitle(config.btnName); 

        _Facade.Send(MultWindowParamMap[windowID].openNotice,windowID);
    } 
}
 
class MyView extends View<IFixedModel> {  
    protected onVisible(): void {}
    protected onDisable(): void {}
}
 
class MyHolder extends Holder<IFixedModel>{ 
    private mFixedComp:MultWindowPanel;//当前的this组件 
    protected onCreated(): void {
        this.mFixedComp = this.adapter.getComponent(MultWindowPanel);
    }
    protected onVisible(): void {    
        this.mFixedComp.mLayer.RegisterButtonEvent(this.node,this.ClickHandle,this); 
 
        let config:IMultPanleStruct = MultPanleConfig.GetData(this.data.panelID)!; 
        find("CellName",this.node).getComponent(TextMeshLabel).string = config.btnName;
        this.node.getComponent(Button).interactable = config.key != this.mFixedComp.mSelectWindowID; 
        
        let size:Size = find("CellName",this.node).getComponent(UITransform).contentSize;
        this.node.getComponent(UITransform).setContentSize(new Size(size.x + 50,70)) ;
        this.transform.setContentSize(new Size(size.x + 50,70));  
    }    
    protected onDisable(): void { 
        this.mFixedComp.mLayer.UnregisterButtonClick(this.node,this.ClickHandle);  
    }  
 
    private ClickHandle(){
        let config:IMultPanleStruct = MultPanleConfig.GetData( this.data.panelID)!;//
        if(this.mFixedComp.mSelectWindowID == config.key)//已经被选中了
            return; 
        this.mFixedComp.mLayer.SetWindowTitle(config.title);//设置当前的窗口名称
        let index:number = this.mFixedComp.GetIndex(this.data.panelID);//获取到当前选中的index
        this.adapter.scrollManager.scrollToGroupIndex(0.1,index + 1,AlwaysScroll.Footer);//移动到指定index
        
        let chooseIndex:number = this.mFixedComp.GetIndex(this.mFixedComp.mSelectWindowID);
        let visibleIndex:number = this.mFixedComp.viewManager.getVisibleIndexByGroupIndex(chooseIndex) ;
        this.mFixedComp.mSelectWindowID = this.data.panelID;//设置当前选中的面板ID
        this.node.getComponent(Button).interactable = false;   
        if(visibleIndex == -1)  
            return;  
        let view = this.mFixedComp.viewManager.getVisibleView(visibleIndex); 
        (view.holderList[0] as MyHolder).node.getComponent(Button).interactable = true;
    }
} 