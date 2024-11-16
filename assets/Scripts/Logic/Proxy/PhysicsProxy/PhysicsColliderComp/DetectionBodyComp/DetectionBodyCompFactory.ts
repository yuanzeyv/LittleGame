// import { cfg } from "../../../../../cfg/ConfigBaseCfgInfo"; 
// import { eColliderDetectionBody } from "../../Define/ColliderConst";
// import { PlayerBase } from "../../PhysicsRigidBody/PlayerBase";
// import { AbstratorCompFactory } from "../AbstratorCompFactory";
// import { ShapeCompBase } from "../ShapeCompBase"; 
// import { DetectionHeroBodyComp } from "./DetectionHeroBodyComp";
// import { DetectionHeroCampBodyComp } from "./DetectionHeroCampBodyComp";
// import { DetectionNightmareBodyComp } from "./DetectionNightmareBodyComp";
// import { DetectionRoomBodyComp } from "./DetectionRoomBodyComp";
// import { DetectionVisibleBodyComp } from "./DetectionVisibleBodyComp";
// export class DetectionBodyCompFactory extends AbstratorCompFactory{
//     private mPlayerBaseMap:Map<eColliderDetectionBody,new (playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo) => ShapeCompBase> = new Map<eColliderDetectionBody,new (playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo) => ShapeCompBase>();;
//     constructor(){
//         super();
//         this.InitPlayerBaseMap(); 
//     }  

//     protected InitPlayerBaseMap(){ 
//         this.mPlayerBaseMap.set(eColliderDetectionBody.HeroDetection,DetectionHeroBodyComp);  
//         this.mPlayerBaseMap.set(eColliderDetectionBody.NightmareDetection,DetectionNightmareBodyComp);  
//         this.mPlayerBaseMap.set(eColliderDetectionBody.RoomDetection,DetectionRoomBodyComp);  
//         this.mPlayerBaseMap.set(eColliderDetectionBody.VisibleDetection,DetectionVisibleBodyComp);  
//         this.mPlayerBaseMap.set(eColliderDetectionBody.HeroCampDetection,DetectionHeroCampBodyComp);  
//     }   
    
//     public GenerateColliderComp(playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo):ShapeCompBase{
//         return new (this.mPlayerBaseMap.get(colliderCon.subType))!(playerBase,colliderCon);//生成对象
//     }
// }         