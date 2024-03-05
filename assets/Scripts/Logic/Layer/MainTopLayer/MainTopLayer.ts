import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity, find, ProgressBar, Label, native, Asset, Skeleton, sp} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { Facade } from '../../../Frame/PureMVC';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { ResouceProxy } from '../../Proxy/ResourceProxy/ResouceProxy';
import { PlayerHead } from '../../../Compoment/PlayerHeadComp';
import { ListenClick } from '../../../Util/Util';
const {ccclass, property, type} = _decorator;

export class MainTopLayer extends BaseLayer {   
    private mPlayerHead:PlayerHead;//玩家头像 
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) {} 
    
    InitNode() {   
        this.mPlayerHead = find("PlayerHead",this.node).getComponent(PlayerHead);
    } 
    
    InitData() {    
        this.mPlayerHead.SetHeadID(5);
        ListenClick(find("PlayerHead",this.node),this,()=>{
            _Facade.Send(eNotice.TipsShow,"HAHAHHAHAHAHAHHAA");
        })
    }  
 
    InitLayer() {  
    }   
}   