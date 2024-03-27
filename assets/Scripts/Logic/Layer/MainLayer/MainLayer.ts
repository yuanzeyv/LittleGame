import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset, Skeleton, sp, EventTouch, UITransform, Vec2, Camera} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { Facade } from '../../../Frame/PureMVC';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { ResouceProxy } from '../../Proxy/ResourceProxy/ResouceProxy';
import { eAttrBaseType } from '../../Proxy/PlayerAttrProxy/AttrDefine/AttrDefine';
import { AttrCalcRelevanceConfig } from '../../../Config/Cfg_AttrCalcRelevance';
import { PlayerAttrProxy } from '../../Proxy/PlayerAttrProxy/PlayerAttrProxy';
import { TextMeshLabel } from '../../../../../extensions/TextMesh Pro/assets/TextMesh/label/TextMeshLabel';
import { SkeletonProxy } from '../../Proxy/SkeletonProxy/SkeletonProxy';
import { FightProxy } from '../../Proxy/FightProxy/FightProxy';
const {ccclass, property, type} = _decorator; 
@ccclass('MainLayer')
export class MainLayer extends BaseLayer {  
    private mViewDetailsStatus:boolean = false;
    private mSpineBGSpine:sp.Skeleton;//Spine背景节点 
    private mBottomFunctionButtonArray:Array<Node> = new Array<Node>();
    private mNodeRelevanceAttr:Map<eAttrBaseType,Node> = new Map<eAttrBaseType,Node>();
    
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.RefreshAttr,this.RefreshPlayerAttr.bind(this));
    } 
    
    InitNode() {  
        this.mSpineBGSpine = find("BackGround/BGSpine",this.node).getComponent(sp.Skeleton); 
        for(let index = 1;index <=4 ;index++)
            this.mBottomFunctionButtonArray.push(find(`BottomNode/BottomFunctionBtn_${index}`,this.node));
        this.InitNodeRelevanceAttr(); 
    } 
    
    InitData() {    
        _Facade.FindProxy(SkeletonProxy).CreateSpineEffect(find("BackGround/BGSpine",this.node),"spine_eff/beijing").SetAction("animation");
        
        this.RegisterButtonEvent(this.mBottomFunctionButtonArray[1],this.OpenBottomMenu,this,1); 
        this.RegisterButtonEvent(this.mBottomFunctionButtonArray[2],this.OpenBottomMenu,this,2);
        this.RegisterButtonEvent(this.mBottomFunctionButtonArray[3],this.OpenFightLayer,this,2);
        this.RegisterButtonEvent(find("BottomNode/img_sxk/ViewDetailsBtn",this.node),this.AttrViewDetailsBtnHandle,this);
    }  
  
    InitLayer() {  
        this.RefreshPlayerAttr(undefined);
        this.RefreshAttrViewDetails(); 
    } 
    
    private OpenBottomMenu(touchEvent:EventTouch,type:number){  
        let worldPos = find("Canvas/Camera").getComponent(Camera).screenToWorld(new Vec3(touchEvent.getLocationX(),touchEvent.getLocationY(),0));
        _Facade.Send(eNotice.OpenBottomMenuLayer,{worldPos:worldPos,type:type});
    }  

    private OpenFightLayer(touchEvent:EventTouch,type:number){  
        _Facade.FindProxy(FightProxy).StartBattle();
    }  
    
    private RefreshPlayerAttr(refreshArray:Array<eAttrBaseType>|undefined){
        let refreshIndexArray:Array<eAttrBaseType> = new Array<eAttrBaseType>();
        if(refreshArray == undefined){
            this.mNodeRelevanceAttr.forEach((node:Node,key:eAttrBaseType)=>{
                refreshIndexArray.push(key);
            });
        }else{
            for(let cell of refreshArray)
                refreshIndexArray.push(cell);
        }
        for(let cell of refreshIndexArray){
            let node:Node = this.mNodeRelevanceAttr.get(cell);
            let name:string = AttrCalcRelevanceConfig.GetData(cell)!.name;//获取到当前的名称
            let value:number = _Facade.FindProxy(PlayerAttrProxy).GetAttrSumValue(cell);
            let isPercent:boolean = AttrCalcRelevanceConfig.GetData(cell)!.isPercent;
            find("Name",node).getComponent(TextMeshLabel).string = name;
            find("Value",node).getComponent(TextMeshLabel).string = `${isPercent?value/10000:value}${isPercent?"%":""}`;
        }
    }

    private InitNodeRelevanceAttr(){
        let baseAttrPath:string = "BottomNode/img_sxk/AttrLayout/AttrCell_"; 
        let extreAttrPath:string = "BottomNode/img_sxk/Extra_AttrLayout/ExtreAttrCell_";
        this.mNodeRelevanceAttr.set(eAttrBaseType.HP,find(`${baseAttrPath}1`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.ATT,find(`${baseAttrPath}2`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.DEF,find(`${baseAttrPath}3`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.SPE,find(`${baseAttrPath}4`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.SUCK,find(`${extreAttrPath}1/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.BACK_ATT,find(`${extreAttrPath}2/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.CONTI_ATT,find(`${extreAttrPath}3/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.DEADLY_ADD,find(`${extreAttrPath}4/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.MISS,find(`${extreAttrPath}5/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.CRITICAL,find(`${extreAttrPath}6/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.STUN,find(`${extreAttrPath}7/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.FINAL_ATT,find(`${extreAttrPath}8/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.RESIST_SUCK,find(`${extreAttrPath}9/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.RESIST_BACK_ATT,find(`${extreAttrPath}10/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.RESIST_CONTI_ATT,find(`${extreAttrPath}11/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.RESIST_DEADLY,find(`${extreAttrPath}12/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.RESIST_MISS,find(`${extreAttrPath}13/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.RESIST_CRITICAL,find(`${extreAttrPath}14/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.RESIST_STUN,find(`${extreAttrPath}15/LayoutNode`,this.node));
        this.mNodeRelevanceAttr.set(eAttrBaseType.FINAL_DEC_ATT,find(`${extreAttrPath}16/LayoutNode`,this.node));
    }

    private RefreshAttrViewDetails(){
        find("BottomNode/img_sxk/ViewDetailsBtn",this.node).setScale(1,this.mViewDetailsStatus?-1:1);
        find("BottomNode/img_sxk/Extra_AttrLayout",this.node).active = this.mViewDetailsStatus;
    }
    private AttrViewDetailsBtnHandle(){
        this.mViewDetailsStatus = !this.mViewDetailsStatus;
        this.RefreshAttrViewDetails();
    }
}           