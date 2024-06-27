import  Physics from '@dimforge/rapier2d-compat';
import { PhysicsCompBase } from "../PhysicsCompBase";
import { _Facade } from '../../../../../Global';
import { PlayerBase } from '../../Player/PlayerBase';
import { eFinalAttrType } from '../../../../Proxy/PhysicsProxy/Define/AttrType';
import { ColliderBase, IRelevanceOBJ } from '../../Physics/ColliderBase';
export class ShapeCompBase extends PhysicsCompBase{ 
    public OnStart(){ 
       this.SetColliderActiveEvent(true,false);
       this.SetCollidersGroup(0x0001FFFF);//角色形状 可以与任何物体发生碰撞，唯独不会与自己产生碰撞
    }  
     
    //开始碰撞回调  
    public OnStartConcatCollider(playerBase:ColliderBase):void{  
        console.log(`开始碰撞: ${this.mPlayer.Name} -> ${this.mPlayer.Name} 造成了 ${this.mPlayer.GetFinalAttr(eFinalAttrType.PhysicalAttack)}`);
    }
    //结束碰撞回调 
    public OnLeaveConcatCollider(playerBase:ColliderBase):void{
        console.log(`终止碰撞: ${this.mPlayer.Name} -> ${this.mPlayer.Name}`);
    } 
}              