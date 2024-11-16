// import { eColliderCompType } from '../../Define/ColliderConst';
// import { DetectionBodyCompBase } from './DetectionBodyCompBase';
// export class DetectionRoomBodyComp extends DetectionBodyCompBase{     
//     //当前玩家碰撞到的碰撞器信息
//     public OnStart(){    
//         //这里获取的是半高，所以乘2  
//         this.SetColliderActiveEvent(true,false);    
//         this.Colider.Sensor = true; 
//         /*
//         *刚体类型为8
//         *碰撞监听组为80
//         *房间:128
//         */
//         this.SetCollidersGroup(
//             (1 << eColliderCompType.Detection) << 16 | 
//             (1 << eColliderCompType.Room));
//     }
      
// }          