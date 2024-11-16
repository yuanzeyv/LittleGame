// import { cfg } from "../../../../../cfg/ConfigBaseCfgInfo";
// import { eColliderRecoverBody } from "../../Define/ColliderConst";
// import { PlayerBase } from "../../PhysicsRigidBody/PlayerBase";
// import { AbstratorCompFactory } from "../AbstratorCompFactory";
// import { ShapeCompBase } from "../ShapeCompBase";  
// import { GoalRecoverComp } from "./GoalRecoverComp"; 
// import { HPPercentRecoverComp } from "./HPPercentRecoverComp";
// import { HPRecoverComp } from "./HPRecoverComp";
// import { ShieldRecoverComp } from "./ShieldRecoverComp";
// import { TomatoRecoverComp } from "./TomatoRecoverComp";
// //回复类型的回复碰撞器功能仅仅只是用于更方便的更新用。不会参与实际的碰撞
// export class RecoverBodyCompFactory extends AbstratorCompFactory{
//     private mBarrierBaseMap:Map<eColliderRecoverBody,new (playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo) => ShapeCompBase> = new Map<eColliderRecoverBody,new (playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo) => ShapeCompBase>();;
//     constructor(){
//         super(); 
//         this.InitPlayerBaseMap();
//     } 
  
//     protected InitPlayerBaseMap(){ 
//         this.mBarrierBaseMap.set(eColliderRecoverBody.HPRecover,HPRecoverComp); 
//         this.mBarrierBaseMap.set(eColliderRecoverBody.ShieldRecover,ShieldRecoverComp); 
//         this.mBarrierBaseMap.set(eColliderRecoverBody.GoalRecover,GoalRecoverComp); 
//         this.mBarrierBaseMap.set(eColliderRecoverBody.TomatoRecover,TomatoRecoverComp); 
//         this.mBarrierBaseMap.set(eColliderRecoverBody.HPPercentRecover,HPPercentRecoverComp); 
//     }   
    
//     public GenerateColliderComp(playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo):ShapeCompBase{
//         return new (this.mBarrierBaseMap.get(colliderCon.subType))!(playerBase,colliderCon);//生成对象
//     }
// }        