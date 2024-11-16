// import { eColliderCompType } from '../../Define/ColliderConst';
// import { ePhysicsGoodsType } from '../../Define/PhysicsConst'; 
// import { ColliderBase } from '../../Physics/ColliderBase';
// import { PlayerBase } from '../../PhysicsRigidBody/PlayerBase';
// import { DetectionBodyCompBase } from './DetectionBodyCompBase';
// export class DetectionHeroCampBodyComp extends DetectionBodyCompBase{     
//     //当前玩家碰撞到的碰撞器信息
//     public OnStart(){    
//         //这里获取的是半高，所以乘2  
//         this.SetColliderActiveEvent(true,false);    
//         this.Colider.Sensor = true; 
//         /*
//         *刚体类型为8
//         *碰撞监听组为187
//         *玩家:1 
//         *梦魇:2
//         *障碍物:4
//         *房间:128
//         *建筑物:256 
//         *子弹:1024
//         */
//         this.SetCollidersGroup(
//             (1 << eColliderCompType.Detection) << 16 | 
//             (1 << eColliderCompType.PlayerBody) | (1 << eColliderCompType.Building)
//         );
//     } 
      
//     //开始碰撞回调   
//     public OnStartConcatCollider(playerBase:ColliderBase):void{   
//         //建筑物容器，不应该进入到英雄阵营
//         if((playerBase.Parent.RelevanceObj as PlayerBase).Type == ePhysicsGoodsType.BuildVector)
//             return;
//         super.OnStartConcatCollider(playerBase);
//     } 
//     //结束碰撞回调   
//     public OnLeaveConcatCollider(playerBase:ColliderBase):void{ 
//         if((playerBase.Parent.RelevanceObj as PlayerBase).Type == ePhysicsGoodsType.BuildVector)
//             return;
//         super.OnLeaveConcatCollider(playerBase);
//     }  
// }           