import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { _decorator, find, Vec3,Node, Skeleton, sp} from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { ResouceProxy } from '../../Proxy/ResourceProxy/ResouceProxy';
import { SkeletonProxy } from '../../Proxy/SkeletonProxy/SkeletonProxy';
import { SpineMediator } from '../../Proxy/SkeletonProxy/Const/SpineMediator';

export class FightLayer extends BaseLayer {  
    private mDynaicBG:Node;

    private mHeroSpineNode:Node;
    private mheroSpineMediator:SpineMediator;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
    } 
    
    InitNode() {  
        this.mDynaicBG = find("DynamicBackGround",this.node);
        this.mHeroSpineNode = find("CenterNode/Node/Node",this.node)
    } 
    
    InitData() {    
        this.RegisterButtonEvent(this.mDynaicBG,this.CloseLayerHandle,this); 
    }     
    
    InitLayer() {   
        this.mheroSpineMediator =  _Facade.FindProxy(SkeletonProxy).CreateSpineEffect(this.mHeroSpineNode,"spine_eff/1001",['root/eff', 'root/main', 'root/main/body', 'root/main/body/hand', 'root/main/body/head', 'root/main/body/head/fair', 'root/main/shadow']);
        this.mheroSpineMediator.SetAction("attack");
    }            
      
    onClose():void{      
        _Facade.FindProxy(SkeletonProxy).RecycleSpineEffect(this.mheroSpineMediator);
    }

    private CloseLayerHandle(){
        _Facade.Send(eNotice.CloseFightLayer);
    }
}       