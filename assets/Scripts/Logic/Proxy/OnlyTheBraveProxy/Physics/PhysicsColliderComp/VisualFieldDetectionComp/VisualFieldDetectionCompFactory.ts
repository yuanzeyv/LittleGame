import { IOnlyTheBravePhysicsColliderStruct } from "../../../../../../Config/Cfg_OnlyTheBravePhysicsCollider";
import { eMoveControlType, eVisualFieldDetectionType } from "../../ColliderTypeDefine";
import { PhysicsCompBase } from "../../PhysicsCompBase";
import { PlayerBase } from "../../PlayerBase";
import { AbstratorCompFactory } from "../AbstratorCompFactory";
import { AllDetectionComp } from "./AllDetectionComp";
import { EnemyAndNeutralityDetectionComp } from "./EnemyAndNeutralityDetectionComp";
import { EnemyDetectionComp } from "./EnemyDetectionComp";
import { HeroAndEnemyDetectionComp } from "./HeroAndEnemyDetectionComp";
import { HeroAndNeutralityDetectionComp } from "./HeroAndNeutralityDetectionComp"; 
import { HeroDetectionComp } from "./HeroDetectionComp";
import { NeutralityDetectionComp } from "./NeutralityDetectionComp";

export class VisualFieldDetectionCompFactory extends AbstratorCompFactory{
    private mBarrierBaseMap:Map<eVisualFieldDetectionType,new (playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct) => PhysicsCompBase> = new Map<eVisualFieldDetectionType,new (playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct) => PhysicsCompBase>();;
    constructor(){
        super();  
        this.InitPlayerBaseMap();
    }  

    protected InitPlayerBaseMap(){ 
        this.mBarrierBaseMap.set(eVisualFieldDetectionType.Hero,HeroDetectionComp); 
        this.mBarrierBaseMap.set(eVisualFieldDetectionType.Enemy,EnemyDetectionComp); 
        this.mBarrierBaseMap.set(eVisualFieldDetectionType.Neutrality,NeutralityDetectionComp); 
        this.mBarrierBaseMap.set(eVisualFieldDetectionType.HeroAndEnemy,HeroAndEnemyDetectionComp); 
        this.mBarrierBaseMap.set(eVisualFieldDetectionType.HeroAndNeutrality,HeroAndNeutralityDetectionComp); 
        this.mBarrierBaseMap.set(eVisualFieldDetectionType.EnemyAndNeutrality,EnemyAndNeutralityDetectionComp); 
        this.mBarrierBaseMap.set(eVisualFieldDetectionType.ALL,AllDetectionComp); 
    }   
    
    public GenerateColliderComp(playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct):PhysicsCompBase{
        return new (this.mBarrierBaseMap.get(colliderCon.SubType))!(playerBase,colliderCon);//生成对象
    }
}        