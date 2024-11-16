import { Vec2 } from "cc";
import { PhysicsWrold } from "../../../../../Util/Physics/World";
import { Object } from "../Object";
export class GroupObject extends Object{ 
    public constructor(physicsWorld:PhysicsWrold,groupName:string,position?:Vec2,rotate?:number,param?:string){
        super(physicsWorld,groupName,0,[],position,rotate,param); 
    } 
}
