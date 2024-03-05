import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset, Skeleton, sp, EventTouch} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { PlayerHead } from '../../../Compoment/PlayerHeadComp';
const {ccclass, property, type} = _decorator;

export class MainTopLayer extends BaseLayer {   
    private mPlayerHead:PlayerHead;//玩家头像 
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) {} 
    
    InitNode() {   
        this.mPlayerHead = find("PlayerHead",this.node).getComponent(PlayerHead);
    } 
    
    InitData() {    
        this.mPlayerHead.SetHeadID(5);
        this.RegisterButtonEvent(find("PlayerHead",this.node),this.ButtonClickHandle,this);
    }  
 
    InitLayer() {  
    }   

    private PlayerHeadClickHandle(eventTouch:EventTouch){
    }
}   