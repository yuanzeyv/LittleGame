import { Vec2 } from "cc";
import { _Facade } from "../../../../Global";
import { PhysicsWrold } from "../../../../Util/Physics/World";
import { OnlyTheBraveProxy } from "../OnlyTheBraveProxy";
import { BarrierPhysicsObject } from "./PhysicsType/BarrierPhysicsObject";
import { CameraPhysicsObject } from "./PhysicsType/CameraPhysicsObject";
import { DynamicPhysicsObject } from "./PhysicsType/DynamicPhysicsObject";
import { HeroPhysicsObject } from "./PhysicsType/HeroPhysicsObject";
import { MonsterPhysicsObject } from "./PhysicsType/MonsterPhysicsObject";
import { PhysicsObejct } from "./PhysicsType/PhysicsObejct";
import { BulletPhysicsObject } from "./BulletPhysicsObject/BulletPhysicsObject";

export class PhysicsObjectFactory{
    private static mIns:PhysicsObjectFactory|undefined = undefined;
    public static get Ins():PhysicsObjectFactory { return !this.mIns ? (this.mIns = new PhysicsObjectFactory()) : this.mIns;}

    private mPhysicsObjectObjectMap:Map<number,new (physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos?:Vec2,rotate?:number,param?:any,attrs?:Array<{K:number,V:number}>)=>PhysicsObejct> = new Map<number,new (physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos?:Vec2,rotate?:number,param?:any,attrs?:Array<{K:number,V:number}>)=>PhysicsObejct>();

    constructor(){
        this.mPhysicsObjectObjectMap.set(1,BarrierPhysicsObject);    
        this.mPhysicsObjectObjectMap.set(2,DynamicPhysicsObject);    
        this.mPhysicsObjectObjectMap.set(3,HeroPhysicsObject);    
        this.mPhysicsObjectObjectMap.set(4,CameraPhysicsObject);
        this.mPhysicsObjectObjectMap.set(5,BulletPhysicsObject);    
        this.mPhysicsObjectObjectMap.set(6,MonsterPhysicsObject);    
    }
    
    public GenPhysicsObject(physicsWorld:PhysicsWrold,type:number,name:string,bodyID:number,functionBodys?:Array<number>,pos?:Vec2,rotate?:number,param?:string,attrs?:string):PhysicsObejct|undefined{
        let constr:new (physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos?:Vec2,rotate?:number,param?:string,attrs?:Array<{K:number,V:number}>)=>PhysicsObejct = this.mPhysicsObjectObjectMap.get(type);
        if(constr == undefined)
            return;
        return new constr(physicsWorld,name,bodyID,functionBodys,pos,rotate,param,_Facade.FindProxy(OnlyTheBraveProxy).GetAttrArrayByName(attrs));
    }
}