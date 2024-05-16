import  Physics from '@dimforge/rapier2d-compat';
import { ColliderBase } from "./ColliderBase";
export class CuboidCollider extends ColliderBase{
    public constructor(world:Physics.World,width:number,height:number){
        super(world);
        let colliderDesc:Physics.ColliderDesc = Physics.ColliderDesc.cuboid(width,height);
        this.mCollider = this.mWorld.createCollider(colliderDesc);
    }

    
};