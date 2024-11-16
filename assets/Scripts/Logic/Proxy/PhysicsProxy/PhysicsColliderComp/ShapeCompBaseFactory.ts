// import { AbstratorCompFactory } from "./AbstratorCompFactory";
// import { BarrierBodyCompFactory } from "./BarrierBodyComp/BarrierBodyCompFactory"; 
// import { ShapeCompBase } from "./ShapeCompBase";   
// import { HeroBodyCompFactory } from "./HeroBodyComp/HeroBodyCompFactory";
// import { NightmareCompFactory } from "./NightmareComp/NightmareCompFactory";
// import { RoomBodyCompFactory } from "./RoomBodyComp/RoomBodyCompFactory";
// import { RecoverBodyCompFactory } from "./AttrRecoverComp/RecoverBodyCompFactory";
// import { DetectionBodyCompFactory } from "./DetectionBodyComp/DetectionBodyCompFactory";
// import { BuildingBodyCompFactory } from "./BuildingBodyComp/BuildingBodyCompFactory";
// import { SkillBaseCompFactory } from "./SkillBaseComp/SkillBaseCompFactory";
// import { PlayerBase } from "../PhysicsRigidBody/PlayerBase";
// import { MoveBodyCompFactory } from "./MoveComp/MoveBodyCompFactory"; 
// import { eColliderCompType } from "../Define/ColliderConst";
// import { WorldBodyCompFactory } from "./WorldBodyComp/WorldBodyCompFactory"; 
// import { Cfg_PhysicsPlayer, IPhysicsPlayerStruct } from "../../../../Config/Cfg_PhysicsPlayer";
// export class ShapeCompBaseFactory{
//     private static mSignal:ShapeCompBaseFactory;
//     private mColliderCompAbstratorFactory:Array<AbstratorCompFactory> = new Array<AbstratorCompFactory>();
//     public static get Inst():ShapeCompBaseFactory{
//         if(ShapeCompBaseFactory.mSignal == undefined)
//             ShapeCompBaseFactory.mSignal = new ShapeCompBaseFactory();  
//         return ShapeCompBaseFactory.mSignal;
//     } 

//     constructor(){
//         this.mColliderCompAbstratorFactory[eColliderCompType.PlayerBody] = new HeroBodyCompFactory();//基础英雄碰撞器类型
//         this.mColliderCompAbstratorFactory[eColliderCompType.Nightmare] = new NightmareCompFactory();//基础英雄碰撞器类型
//         this.mColliderCompAbstratorFactory[eColliderCompType.Barrier] = new BarrierBodyCompFactory();//基础障碍物类型
//         this.mColliderCompAbstratorFactory[eColliderCompType.RecoverComp] = new RecoverBodyCompFactory();//回复类型用
//         this.mColliderCompAbstratorFactory[eColliderCompType.Room] = new RoomBodyCompFactory();//房间抽象工厂
//         this.mColliderCompAbstratorFactory[eColliderCompType.Detection] = new DetectionBodyCompFactory();//房间抽象工厂
//         this.mColliderCompAbstratorFactory[eColliderCompType.Building] = new BuildingBodyCompFactory();//房间抽象工厂
//         this.mColliderCompAbstratorFactory[eColliderCompType.Skill] = new SkillBaseCompFactory();//房间抽象工厂
//         this.mColliderCompAbstratorFactory[eColliderCompType.Move] = new MoveBodyCompFactory();//房间抽象工厂
//         this.mColliderCompAbstratorFactory[eColliderCompType.World] = new WorldBodyCompFactory();//房间抽象工厂
//     }    

//     public GenerateShapeCompBase(bodyID:number,playerBase:PlayerBase):ShapeCompBase{
//         let colliderConfig:IPhysicsPlayerStruct  = Cfg_PhysicsPlayer.GetData(bodyID);   
//         //存在抽象工厂时
//         if(this.mColliderCompAbstratorFactory[colliderConfig.Type]){
//             let shapeCompBase:ShapeCompBase = this.mColliderCompAbstratorFactory[colliderConfig.Type].GenerateColliderComp(playerBase,colliderConfig);
//             shapeCompBase.OnInit();
//             shapeCompBase.OnStart();
//             return shapeCompBase;
//         }
//         return undefined;
//     } 
// }     