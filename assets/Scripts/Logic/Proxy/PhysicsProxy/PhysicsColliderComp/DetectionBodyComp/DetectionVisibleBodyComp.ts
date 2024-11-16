// import { eColliderCompType } from '../../Define/ColliderConst';
// import { ColliderBase } from '../../Physics/ColliderBase';
// import { PlayerBase } from '../../PhysicsRigidBody/PlayerBase';
// import { PhysicsCompBase } from '../PhysicsCompBase';
// import { ShapeCompBase } from '../ShapeCompBase';
// import { DetectionBodyCompBase } from './DetectionBodyCompBase';
// export class DetectionVisibleBodyComp extends DetectionBodyCompBase{     
//     //当前玩家碰撞到的碰撞器信息
//     public OnStart(){      
//         this.SetColliderActiveEvent(true,false);    
//         this.Colider.Sensor = true; 
//         this.SetCollidersGroup(
//             ((1 << eColliderCompType.Detection) << 16) | 
//             (1 << eColliderCompType.Barrier)| (1 << eColliderCompType.PlayerBody)| 
//             (1 << eColliderCompType.Nightmare)| (1 << eColliderCompType.Building)|
//             (1 << eColliderCompType.Skill) | (1 << eColliderCompType.World)| (1 << eColliderCompType.Room)
//         ); 
//     } 
      
//     //开始碰撞回调   
//     public OnStartConcatCollider(playerBase:ColliderBase):void{    
//         if( this.mViewRigdibody.has(playerBase.Parent.ID))
//             console.log(`${(playerBase.RelevanceObj as PhysicsCompBase).Name} 玩家:${(playerBase.Parent.RelevanceObj as PlayerBase).Name} 再一次尝试进入${this.mPlayer.Name}视野`);
//         this.mViewRigdibody.set(playerBase.Parent.ID,playerBase.Parent.RelevanceObj as PlayerBase); 
//         this.Player.DetectionPlayerBaseEnter((playerBase.Parent.RelevanceObj as PlayerBase),this.Config.subType);
//     }  
//     //结束碰撞回调   
//     public OnLeaveConcatCollider(playerBase:ColliderBase):void{ 
//         if( !this.mViewRigdibody.has(playerBase.Parent.ID))
//             console.log(`玩家:${(playerBase.Parent.RelevanceObj as PlayerBase).Name} 没有进入${this.Player.Config.name}视野，却被告知尝试离开其中`); 
//         this.mViewRigdibody.delete(playerBase.Parent.ID);
//         this.Player.DetectionPlayerBaseLeave((playerBase.Parent.RelevanceObj as PlayerBase),this.Config.subType);
//     }
// }                    