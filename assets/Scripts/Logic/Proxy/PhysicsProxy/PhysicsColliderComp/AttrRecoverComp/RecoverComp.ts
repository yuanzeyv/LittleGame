// import { RoomVectorBase } from '../../PhysicsRigidBody/RoomPlayerBaseFactory/RoomVectorBase';
// import { ShapeCompBase } from '../ShapeCompBase';

// export class RecoverComp extends ShapeCompBase{  
//     protected mRoomVectorBase:RoomVectorBase;
//     protected mAccumulateTime:number = 0;//当前已经累计的时间
//     //当前玩家碰撞到的碰撞器信息
//     public OnStart(){  
//         this.mRoomVectorBase = (this.Player.Parent.Parent as RoomVectorBase);
//         this.SetColliderActiveEvent(false,false);
//         this.SetCollidersGroup(0x00000000);//不与任何人物发生碰撞
//     } 

//     protected RefreshRecoverInfo():void{  
//     }
  
//     public Update(dt: number): void {
//         this.mAccumulateTime += dt;
//         while(this.mAccumulateTime - 1 >= 0){
//             this.mAccumulateTime -= 1; 
//             this.RefreshRecoverInfo();
//         }
//     }
// }      