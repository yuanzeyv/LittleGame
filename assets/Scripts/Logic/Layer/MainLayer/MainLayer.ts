import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset, Skeleton, sp} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { Facade } from '../../../Frame/PureMVC';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
const {ccclass, property, type} = _decorator;

export class MainLayer extends BaseLayer {  
    private mSpineBGSpine:sp.Skeleton;//Spine背景节点
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
    } 
    
    InitNode() {  
        this.mSpineBGSpine = find("BackGround",this.node).getComponent(sp.Skeleton);
    } 
    
    InitData() {   
        let source:sp.SkeletonData = _Facade.FindProxy(BundleProxy).UseAsset("resources","Spine/spine_eff/beijing",sp.SkeletonData);
        this.mSpineBGSpine.skeletonData = source;
        this.mSpineBGSpine.premultipliedAlpha = false;
        this.mSpineBGSpine.setAnimation(0,"animation",true);
         
    }  
 
    InitLayer() {  
    }   
}   