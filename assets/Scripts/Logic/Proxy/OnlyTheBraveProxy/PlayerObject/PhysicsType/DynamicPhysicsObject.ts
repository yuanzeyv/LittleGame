import { Vec2 } from "cc";
import { _Facade } from "../../../../../Global";
import { eRigidType } from "../../../../../Util/Physics/PhysicsDefine";
import { PhysicsWrold } from "../../../../../Util/Physics/World";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";
import { PhysicsObejct } from "./PhysicsObejct";


export class DynamicPhysicsObject extends PhysicsObejct{ 
    protected RigidType(): eRigidType {
        return eRigidType.Dynamic;
    } 
};  