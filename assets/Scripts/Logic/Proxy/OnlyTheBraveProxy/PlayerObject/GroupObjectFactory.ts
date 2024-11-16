import { Vec2 } from "cc";
import { PhysicsWrold } from "../../../../Util/Physics/World";
import { GroupObject } from "./GroupType/GroupObject"; 
import { AndObjectGroup } from "./GroupType/AndObjectGroup";
import { OrObjectGroup } from "./GroupType/OrObjectGroup";
import { SelectObjectGroup } from "./GroupType/SelectObjectGroup";

export enum eGroupType{
    OrGroup = 1,
    AndGroup = 2,
    JudgeGroup = 3,
    ClearGroup = 4,
};
export class GroupObjectFactory{
    private static mIns:GroupObjectFactory|undefined = undefined;
    public static get Ins():GroupObjectFactory { 
        return !this.mIns ? (this.mIns = new GroupObjectFactory()) : this.mIns;}

    private mGroupObjectObjectMap:Map<number,new (physicsWorld:PhysicsWrold,groupName:string,position?:Vec2,rotate?:number,param?:string)=>GroupObject> = new Map<number,new (physicsWorld:PhysicsWrold,groupName:string,position?:Vec2,rotate?:number,param?:string)=>GroupObject>();

    constructor(){
        this.mGroupObjectObjectMap.set(1,OrObjectGroup);   
        this.mGroupObjectObjectMap.set(2,AndObjectGroup);   
        this.mGroupObjectObjectMap.set(3,SelectObjectGroup);  
    }

    public GenGroupObject(physicsWorld:PhysicsWrold,type:number,name:string,pos?:Vec2,rotate?:number,param?:string):GroupObject|undefined{
        let constr:new (physicsWorld:PhysicsWrold,groupName:string,position?:Vec2,rotate?:number,param?:string)=>GroupObject = this.mGroupObjectObjectMap.get(type);
        if(constr == undefined)
            return;
        return new constr(physicsWorld,name,pos,rotate,param);
    }
}
