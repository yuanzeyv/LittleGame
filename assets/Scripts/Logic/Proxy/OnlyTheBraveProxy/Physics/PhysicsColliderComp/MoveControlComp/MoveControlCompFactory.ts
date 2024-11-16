import { IOnlyTheBravePhysicsColliderStruct } from "../../../../../../Config/Cfg_OnlyTheBravePhysicsCollider";
import { eMoveControlType } from "../../ColliderTypeDefine";
import { PhysicsCompBase } from "../../PhysicsCompBase";
import { PlayerBase } from "../../PlayerBase";
import { AbstratorCompFactory } from "../AbstratorCompFactory";
import { LinearVelocityControl } from "./LinearVelocityControl";

export class MoveControlCompFactory extends AbstratorCompFactory{
    private mBarrierBaseMap:Map<eMoveControlType,new (playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct) => PhysicsCompBase> = new Map<eMoveControlType,new (playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct) => PhysicsCompBase>();;
    constructor(){
        super();  
        this.InitPlayerBaseMap();
    } 
   
    protected InitPlayerBaseMap(){ 
        this.mBarrierBaseMap.set(eMoveControlType.Normal,LinearVelocityControl); 
    }   
    
    public GenerateColliderComp(playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct):PhysicsCompBase{
        return new (this.mBarrierBaseMap.get(colliderCon.SubType))!(playerBase,colliderCon);//生成对象
    }
}        