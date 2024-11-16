import { _Facade } from "../../../../../Global";
import { eRigidType } from "../../../../../Util/Physics/PhysicsDefine";
import { PhysicsObejct } from "./PhysicsObejct";


export class BarrierPhysicsObject extends PhysicsObejct{ 
    protected RigidType(): eRigidType {
        return eRigidType.Static;
    } 
};   
