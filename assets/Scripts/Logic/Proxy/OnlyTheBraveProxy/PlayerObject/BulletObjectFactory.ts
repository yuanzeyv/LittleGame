import { Vec2 } from "cc";
import { PhysicsWrold } from "../../../../Util/Physics/World";
import { BulletPhysicsObject } from "./BulletPhysicsObject/BulletPhysicsObject";
import { PhysicsObejct } from "./PhysicsType/PhysicsObejct";
import { _Facade } from "../../../../Global";
import { OnlyTheBraveProxy } from "../OnlyTheBraveProxy";

export enum eBulletType{
    MachineGunCartridge = 1,//机枪子弹，也是普通子弹
};
export class BulletObjectFactory{
    private static mIns:BulletObjectFactory|undefined = undefined;
    public static get Ins():BulletObjectFactory { 
        return !this.mIns ? (this.mIns = new BulletObjectFactory()) : this.mIns;}

    private mPhysicsObjectObjectMap:Map<number,new (physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos?:Vec2,rotate?:number,param?:any,attrs?:Array<{K:number,V:number}>,parent?:PhysicsObejct)=>PhysicsObejct> = new Map<number,new (physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos?:Vec2,rotate?:number,param?:any,attrs?:Array<{K:number,V:number}>,parent?:PhysicsObejct)=>PhysicsObejct>();

    constructor(){
        this.mPhysicsObjectObjectMap.set(eBulletType.MachineGunCartridge,BulletPhysicsObject);   
    }
    
    public GenPhysicsObject(physicsWorld:PhysicsWrold,type:number,name:string,bodyID:number,functionBodys?:Array<number>,pos?:Vec2,rotate?:number,param?:string,attrs?:string,parent?:PhysicsObejct):PhysicsObejct|undefined{
        let constr:new (physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos?:Vec2,rotate?:number,param?:string,attrs?:Array<{K:number,V:number}>,parent?:PhysicsObejct)=>PhysicsObejct = this.mPhysicsObjectObjectMap.get(type);
        if(constr == undefined)
            return;
        return new constr(physicsWorld,name,bodyID,functionBodys,pos,rotate,param,_Facade.FindProxy(OnlyTheBraveProxy).GetAttrArrayByName(attrs),parent);
    }
} 
