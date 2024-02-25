import { _decorator, Component, Node, Prefab, director, Label, find, Button, Vec3, math, UITransform, Widget } from 'cc'; 
import { ScrollAdapter, Holder, IElement, Layer ,View} from '../../../adapter';
import { CancleClick, ListenClick } from '../../../Util/Util';
import { IMultPanleStruct, MultPanleConfig } from '../../../Config/Cfg_MultPanle';
import { LabelPlus } from '../../../../../extensions/label-plus/assets/components/label-plus';
const { ccclass, property } = _decorator;
export interface IFixedModel { 
    index:number;
    panelID:number,
}
const mChooseScale:number = 1.2;
@ccclass('fixed')
export class fixed extends ScrollAdapter<IFixedModel> { 
    public mChoosePanelID:number = 2; //默认选中2面板 
    private mPanelID:number = 1;
    private mPanelBtnMap:Map<number,number> = new Map<number,number>();
    @property(Node) normalPrefab: Node = null
    @property(Node) windowNode: Node = null
    public getPrefab(data: IFixedModel): Node | Prefab { 
        return this.normalPrefab
    }
    public get PrefabContentSize():math.Size{
        return this.normalPrefab.getComponent(UITransform).contentSize;
    }

    public getView(): View<IFixedModel, ScrollAdapter<IFixedModel>> {
        return new MyView(this)
    }

    public getHolder(node: Node, code: string): Holder<IFixedModel, ScrollAdapter<IFixedModel>> {
        return new MyHolder(node, code, this)
    }

    public initElement(element: IElement, data: IFixedModel): void {}   
    
    public GetIndex(panelID:number):number{
        return this.mPanelBtnMap.get(panelID);
    }

    start() {
        //游戏在加载成功后，立即开始读取PanelID对应的配置信息
        let config:IMultPanleStruct|undefined = MultPanleConfig.GetData( this.mPanelID );
        if(config == undefined){ 
            this.ReSetTitle("未知面板");
            return;
        } 
        if(config.type != 1){
            this.ReSetTitle("异常面板");
            console.warn(`面板ID:${config.key} 不为主窗口面板`);
            return;
        }
        this.ReSetTitle(config.title); 
        var map:Map<number ,IFixedModel> = new Map<number,IFixedModel>();
        let index:number = 0;
        for (let i = 0; i < config.childWindow.length; i++) { 
            let panelID:number = config.childWindow[i];
            let childWindowConfig:IMultPanleStruct|undefined = MultPanleConfig.GetData(panelID);//获取到窗口类型
            if(childWindowConfig == undefined){
                console.warn(`面板ID:${config.key} 子面板ID:${config.childWindow[i]} 不存在，请检查配置表`);
                continue;
            }
            if(childWindowConfig.type != 2){
                console.warn(`面板ID:${config.key} 子面板ID:${config.childWindow[i]} 不为面板类型，请检查配置表`);
                continue;
            }
            if(map.has(panelID)){
                console.warn(`面板ID:${config.key} 子面板ID:${config.childWindow[i]} 填写重复，请检查配置表`);
                continue;
            }
            map.set(panelID, {panelID:panelID,index:index++});
        }  
        let list:IFixedModel[] = [];
        for(let cell of map){ 
            this.mPanelBtnMap.set(cell[0],cell[1].index);
            list.push(cell[1]);  
        }
        this.modelManager.insert(list);//可以打开面板了
        this.scrollManager.scrollToGroupIndex(0, this.mChoosePanelID);
    }
    public ReSetTitle(title:string){
        find("BackGround/AdaptiveLabelTitle",this.windowNode).getComponent(LabelPlus).string = title;
        find("BackGround/AdaptiveLabelTitle/WindowTitle",this.windowNode).getComponent(LabelPlus).string = title;
    }
} 
 
class MyView extends View<IFixedModel> { 
    protected onVisible(): void {}
    protected onDisable(): void {}
}

class MyHolder extends Holder<IFixedModel>{
     _item: fixed_item = null
    protected onCreated(): void {
        if(this.node.getComponent(fixed_item) == undefined)
            this.node.addComponent(fixed_item);
        this._item = this.node.getComponent(fixed_item)
    }
    protected onVisible(): void {
        this._item.show(this) 
    }
    protected onDisable(): void { 
        this._item.hide() 
    } 
}
  
export class fixed_item extends Component {  1
    private mHolder: Holder<IFixedModel>
    private mData:IFixedModel;
    private mFixedComp:fixed;//当前的this组件
    show(holder: Holder) {
        this.mHolder = holder    
        this.mData =  this.mHolder.data;
        this.mFixedComp = holder.adapter.getComponent(fixed);
        ListenClick(this.node,this,this.ClickHandle); 

        let config:IMultPanleStruct = MultPanleConfig.GetData(this.mData.panelID)!; 
        let fixedComp = this.mFixedComp; 
        find("LabelPlus",this.node).getComponent(Label).string = config.btnName;
        this.getComponent(Button).interactable = config.key != this.mFixedComp.mChoosePanelID; 
        this.SetContentScale(fixedComp.mChoosePanelID == this.mData.panelID ? 1.1 : 1);//设置选中缩放
    }  
 
    hide() { 
        CancleClick(this.node,this,this.ClickHandle);
        this.mHolder = undefined;   
        this.mFixedComp = undefined;
    }
 
    private ClickHandle(){
        let config:IMultPanleStruct = MultPanleConfig.GetData( this.mData.panelID)!;//
        if(this.mFixedComp.mChoosePanelID == config.key)//已经被选中了
            return; 
        this.mFixedComp.ReSetTitle(config.title);//设置当前的窗口名称
        let index:number = this.mFixedComp.GetIndex(this.mData.panelID);//获取到当前选中的index
        this.mHolder.adapter.scrollManager.scrollToGroupIndex(0.1,index);//移动到指定index
        
        let chooseIndex:number = this.mFixedComp.GetIndex(this.mFixedComp.mChoosePanelID);
        let visibleIndex:number = this.mFixedComp.viewManager.getVisibleIndexByGroupIndex(chooseIndex) ;
        this.mFixedComp.mChoosePanelID = this.mHolder.data.panelID;//设置当前选中的面板ID
        this.SetContentScale(1.1);
        this.getComponent(Button).interactable = false;  
        if(visibleIndex == -1)  
            return; 
        let view = this.mFixedComp.viewManager.getVisibleView(visibleIndex); 
        (view.holderList[0] as MyHolder)._item.SetContentScale(1);
        (view.holderList[0] as MyHolder)._item.getComponent(Button).interactable = true;
    }
 
    
    private SetContentScale(scale:number){ 
        let baseContent:math.Size = this.mFixedComp.PrefabContentSize;
        this.mHolder.transform.setContentSize(baseContent.width * scale,baseContent.height * scale); 
    }
}