import { IOnlyTheBravePhysicsColliderStruct } from "../../../../../Config/Cfg_OnlyTheBravePhysicsCollider";
import { PhysicsCompBase } from "../PhysicsCompBase";
import { PlayerBase } from "../PlayerBase";

export abstract class AbstratorCompFactory{
    public abstract GenerateColliderComp(playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct ):PhysicsCompBase
}      