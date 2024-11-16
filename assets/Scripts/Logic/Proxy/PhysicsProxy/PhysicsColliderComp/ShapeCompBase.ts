// //0x0001 代表游戏中的障碍物
// //0x0002 代表游戏中的触发器 
// //0x0004 代表游戏中的范围检测器
// //0x0008 代表游戏中的角色 
// //0x0010 代表游戏中的技能碰撞器
// //0x0020 代表游戏中的敌人碰撞器 

// import {Physics}  from "../../../../../mainSrc/Physics";
// import { ColliderBase } from "../Physics/ColliderBase";
// import { RigidBodies } from "../Physics/RigidBodies";
// import { PhysicsCompBase } from "./PhysicsCompBase";

// export class ShapeCompBase extends PhysicsCompBase{  
//     //当前玩家碰撞到的碰撞器信息  
//     public OnStart(){ 
//         super.OnStart();
//         this.SetColliderActiveEvent(false,false);
//         this.SetCollidersGroup(0x00000000);
//     }  
      
//     //获取到所有接触的节点信息
//     public GetAllContainCollider():Array<PhysicsCompBase>{
//         let content:cc.Vec2 = this.mCollider.ContentSize;//首先获取到节点的大小
//         let shape:Physics.Shape = this.mCollider.Shape == Physics.ShapeType.Ball ? new Physics.Ball(content.x + 0.01) : new Physics.Cuboid(this.mCollider.ContentSize.x + 0.01,this.mCollider.ContentSize.y + 0.01);
//         let colliders:Array<PhysicsCompBase> = new Array<PhysicsCompBase>();
//         this.Player.World.World.intersectionsWithShape(this.Position,0,shape,(collider:Physics.Collider)=>{
//             let rigidBodies:RigidBodies = ((collider.parent().userData) as RigidBodies);//获取到碰撞到的刚体对象
//             let colliderBase:ColliderBase = rigidBodies.GetCollider(collider.handle);
//             colliders.push((colliderBase.RelevanceObj as PhysicsCompBase));
//             return true;
//         },undefined,this.GetCollidersGroup(),undefined,this.Colider.Collider.parent());
//         return colliders;  
//     }  
// }   