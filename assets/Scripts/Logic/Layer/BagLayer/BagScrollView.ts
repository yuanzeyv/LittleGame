
import {_Facade, _G} from '../../../Global';
import { Button, Prefab, Size, UITransform, _decorator, find ,Node} from 'cc';
import { ScrollAdapter, Holder, IElement, AlwaysScroll, View, WrapMode } from '../../../Util/adapter'; 
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy'; 
import { MultWindowLayer } from '../MultWindowLayer/MultWindowLayer';
const { ccclass, property,type} = _decorator;
interface IFixedModel {index:number;} 
@ccclass('BagScrollView')
export class BagScrollView extends ScrollAdapter<IFixedModel> { 
    public mLayer:MultWindowLayer; 
    private mPanelBtnMap:Map<number,number> = new Map<number,number>(); 
    public getPrefab(data: IFixedModel): Node | Prefab { 
        return _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/BagLayer/Prefab/ItemPrefab",Prefab); 
    }
    public getView(): View<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyView(this)  } 
    public getHolder(node: Node, code: string): Holder<IFixedModel, ScrollAdapter<IFixedModel>> { return new MyHolder(node, code, this) }
    public initElement(element: IElement, data: IFixedModel): void {
        element.wrapBeforeMode = WrapMode.Auto
    }  
    public GetIndex(panelID:number):number{ return this.mPanelBtnMap.get(panelID); }
 
    public SetWindowLayer(windowLayer:MultWindowLayer){
        this.mLayer = windowLayer;
    }
    public start(){
        this.mPanelBtnMap.clear(); 
        let list:IFixedModel[] = []; 
        for(let index = 0;index < 50 ;index++)
            list.push({index:index});   
        //this.modelManager.update();
        this.modelManager.insert(list);//可以打开面板了 
    }
}
 
class MyView extends View<IFixedModel> {  
    protected onVisible(): void {}
    protected onDisable(): void {}
}
 
class MyHolder extends Holder<IFixedModel>{ 
    protected onCreated(): void {}
    protected onVisible(): void {}    
    protected onDisable(): void {}  

    
    private _holder: Holder<IFixedModel> = null
  

    show(holder: Holder<IFixedModel>) {
        this._holder = holder
    }
    
    updateWrap() {
        this._holder.element.wrapBeforeMode = WrapMode.Wrap
        // this._holder.element.wrapAfterMode = WrapMode.Wrap
        this._holder.element.update() 
    }
}  