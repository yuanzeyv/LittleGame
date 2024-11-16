// import { eColliderCompType } from '../../Define/ColliderConst';
// import { ColliderBase } from '../../Physics/ColliderBase';
// import { PlayerBase } from '../../PhysicsRigidBody/PlayerBase';
// import { DetectionBodyCompBase } from './DetectionBodyCompBase';
// export class DetectionHeroBodyComp extends DetectionBodyCompBase{     
//     //当前玩家碰撞到的碰撞器信息
//     public OnStart(){    
//         //这里获取的是半高，所以乘2  
//         this.SetColliderActiveEvent(true,false);    
//         this.Colider.Sensor = true; 
//         /*
//         *刚体类型为8
//         *碰撞监听组为1
//         *英雄:1
//         */
//         this.SetCollidersGroup(
//             (1 << eColliderCompType.Detection) << 16 | 
//             (1 << eColliderCompType.PlayerBody));
//     } 
      
//     //开始碰撞回调   
//     public OnStartConcatCollider(playerBase:ColliderBase):void{    
//         this.mViewRigdibody.set(playerBase.Parent.ID,playerBase.Parent.RelevanceObj as PlayerBase); 
//         //发送检测到检查者进入的消息
//         this.Player.DetectionPlayerBaseEnter((playerBase.Parent.RelevanceObj as PlayerBase),this.Config.subType);
//     }  
//     //结束碰撞回调  
//     public OnLeaveConcatCollider(playerBase:ColliderBase):void{ 
//         this.mViewRigdibody.delete(playerBase.Parent.ID);
//         //发送检测到检查者离开的消息
//         this.Player.DetectionPlayerBaseLeave((playerBase.Parent.RelevanceObj as PlayerBase),this.Config.subType);
//     } 
    
// }         