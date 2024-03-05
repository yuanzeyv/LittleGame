import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset, Skeleton, sp, EventTouch, UITransform, Vec2, Camera} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { Facade } from '../../../Frame/PureMVC';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { ResouceProxy } from '../../Proxy/ResourceProxy/ResouceProxy';
import { PlayerHead } from '../../../Compoment/PlayerHeadComp';
import { ListenClick } from '../../../Util/Util';
const {ccclass, property, type} = _decorator;

export class MainLayer extends BaseLayer {  
    private mSpineBGSpine:sp.Skeleton;//Spine背景节点 
    private mBottomFunctionButtonArray:Array<Node> = new Array<Node>();
    
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
    } 
    
    InitNode() {  
        this.mSpineBGSpine = find("BackGround/BGSpine",this.node).getComponent(sp.Skeleton); 
        for(let index = 1;index <=4 ;index++)
            this.mBottomFunctionButtonArray.push(find(`BottomNode/BottomFunctionBtn_${index}`,this.node));
    } 
    
    InitData() {    
        _Facade.FindProxy(ResouceProxy).Load(this.mSpineBGSpine,"skeletonData","resources","Spine/spine_eff/beijing",sp.SkeletonData,()=>{
            this.mSpineBGSpine.premultipliedAlpha = false;
            this.mSpineBGSpine.setAnimation(0,"animation",true);
        });  
    }  
 
    InitLayer() {  
        this.RegisterButtonEvent(this.mBottomFunctionButtonArray[1],this.OpenBottomMenu,this,1);
        this.RegisterButtonEvent(this.mBottomFunctionButtonArray[2],this.OpenBottomMenu,this,2);
    } 
    
    private OpenBottomMenu(touchEvent:EventTouch,type:number){  
        let worldPos = find("Canvas/Camera").getComponent(Camera).screenToWorld(new Vec3(touchEvent.getLocationX(),touchEvent.getLocationY(),0));
        _Facade.Send(eNotice.OpenBottomMenuLayer,{worldPos:worldPos,type:type});
    }  
}          