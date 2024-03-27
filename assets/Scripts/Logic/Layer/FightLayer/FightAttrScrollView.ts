import { _decorator, Node, Prefab, find, UITransform, Size } from 'cc';  
import { IMultPanleStruct, MultPanleConfig } from '../../../Config/Cfg_MultPanle';  
import { _Facade, _G } from '../../../Global';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy'; 
import { ScrollAdapter, Holder, IElement, View } from '../../../Util/adapter';
import { TextMeshLabel } from '../../../../../extensions/TextMesh Pro/assets/TextMesh/label/TextMeshLabel';
import { AttrNameMap, eAttrType } from '../../Proxy/FightProxy/Define/AttrDefine';
const { ccclass } = _decorator;
interface IFixedModel {attrType:eAttrType;} 
@ccclass('FightAttrScrollView')
export class FightAttrScrollView extends ScrollAdapter<IFixedModel> { 
    private mAttrNodeMap:Map<eAttrType,Node> = new Map<eAttrType,Node>(); 
    public getPrefab(data: IFixedModel): Node | Prefab { 
        return _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/FightLayer/Comp/AttrCell",Prefab); 
    }
    public getView(): View<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyView(this); } 
    public getHolder(node: Node, code: string): Holder<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyHolder(node, code, this) }
    public initElement(element: IElement, data: IFixedModel): void {}   

    protected onLoad(): void {
        this.SetTableViewData();
    }

    public SetTableViewData():void{
        this.mAttrNodeMap.clear(); 
        let list:IFixedModel[] = []; 
        for(let cell of AttrNameMap)
            list.push({attrType:cell[0]});
        this.modelManager.insert(list);//可以打开面板了  
    }     

    public SetAttrNode(type:eAttrType,node:Node|undefined = undefined):void{
        if(node == undefined)
            this.mAttrNodeMap.delete(type);
        else 
            this.mAttrNodeMap.set(type,node);
    }

    public RefreshScrollView(){
        this.modelManager.update();
    }
}
 
class MyView extends View<IFixedModel> {  
    protected onVisible(): void {}
    protected onDisable(): void {}
}
 
class MyHolder extends Holder<IFixedModel>{ 
    private mFightAttrScrollView:FightAttrScrollView;
    protected onCreated(): void {
        this.mFightAttrScrollView = this.adapter.getComponent(FightAttrScrollView);
    }
    protected onVisible(): void {    
        this.mFightAttrScrollView.SetAttrNode(this.data.attrType,this.node);
        let name:string = AttrNameMap.get(this.data.attrType)!; 
        find("AttrName",this.node).getComponent(TextMeshLabel).string = name; 
        find("AttrValue",this.node).getComponent(TextMeshLabel).string = "99999";
    }    
    protected onDisable(): void {  
        this.mFightAttrScrollView.SetAttrNode(this.data.attrType);
    }  
}  