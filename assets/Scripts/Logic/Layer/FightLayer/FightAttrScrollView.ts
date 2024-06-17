import { _decorator, Node, Prefab, find, UITransform, Size } from 'cc';  
import { _Facade, _G } from '../../../Global';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy'; 
import { ScrollAdapter, Holder, IElement, View } from '../../../Util/adapter'; 
import { AttrNameMap, eAttrType } from '../../Proxy/FightProxy/Define/AttrDefine';
import { GetTextMeshComp } from '../../../Util/Util';
import { eCampType } from '../../Proxy/FightProxy/Define/CampDefine';
import { FightProxy } from '../../Proxy/FightProxy/FightProxy';
const { ccclass } = _decorator;
interface IFixedModel {attrType:eAttrType;} 
@ccclass('FightAttrScrollView')
export class FightAttrScrollView extends ScrollAdapter<IFixedModel> { 
    private mAttrNodeMap:Map<eAttrType,MyHolder> = new Map<eAttrType,MyHolder>(); 
    private mCampType:eCampType;  
    public getPrefab(data: IFixedModel): Node | Prefab { 
        return _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/FightLayer/Comp/AttrCell/AttrCell",Prefab); 
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

    public SetAttrNode(type:eAttrType,holder:MyHolder|undefined = undefined):void{
        if(holder == undefined)
            this.mAttrNodeMap.delete(type);
        else 
            this.mAttrNodeMap.set(type,holder);
    }

    public get CampType():eCampType{
        return this.mCampType;
    }

    public set CampType(camp:eCampType){
        this.mCampType = camp;
    }

    public RefreshScrollView(){
        this.modelManager.update();
    }

    public UpdateAttrByAttrType(type:eAttrType){
        let holder:MyHolder|undefined =this.mAttrNodeMap.get(type);
        holder?.UpdateAttrCell();
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
        this.UpdateAttrCell();
    }    
    
    public UpdateAttrCell(){
        this.mFightAttrScrollView.SetAttrNode(this.data.attrType,this);//设置自己
        let name:string = AttrNameMap.get(this.data.attrType)!; 
        let value:number = _Facade.FindProxy(FightProxy).GetCampAttr(this.mFightAttrScrollView.CampType,this.data.attrType);
        GetTextMeshComp(find("AttrName",this.node)).string = name; 
        GetTextMeshComp(find("AttrValue",this.node)).string = `${value}`; 
    } 

    protected onDisable(): void {   
        this.mFightAttrScrollView.SetAttrNode(this.data.attrType);
    }  
}    