// import { cfg } from "../../../../../cfg/ConfigBaseCfgInfo"; 
// import { eCollderDirBody } from "../../Define/ColliderConst";
// import { PlayerBase } from "../../PhysicsRigidBody/PlayerBase";
// import { AbstratorCompFactory } from "../AbstratorCompFactory"; 
// import { ShapeCompBase } from "../ShapeCompBase";
// import { LinearVelocityControl } from "./LinearVelocityControl";
// import { PathArrayControl } from "./PathArrayControl";

// //回复类型的回复碰撞器功能仅仅只是用于更方便的更新用。不会参与实际的碰撞
// export class MoveBodyCompFactory extends AbstratorCompFactory{
//     private mBarrierBaseMap:Map<eCollderDirBody,new (playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo) => ShapeCompBase> = new Map<eCollderDirBody,new (playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo) => ShapeCompBase>();;
//     constructor(){
//         super(); 
//         this.InitPlayerBaseMap();
//     } 
   
//     protected InitPlayerBaseMap(){ 
//         this.mBarrierBaseMap.set(eCollderDirBody.Dir,LinearVelocityControl);  
//         this.mBarrierBaseMap.set(eCollderDirBody.Path,PathArrayControl);  
//     }    
    
//     public GenerateColliderComp(playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo):ShapeCompBase{
//         return new (this.mBarrierBaseMap.get(colliderCon.subType))!(playerBase,colliderCon);//生成对象
//     }
// }         