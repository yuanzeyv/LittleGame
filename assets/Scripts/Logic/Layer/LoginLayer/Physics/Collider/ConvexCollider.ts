import  Physics from '@dimforge/rapier2d-compat';
import { ColliderBase } from "./ColliderBase";
//这个文件是用于创建一个网格形状
export class CuboidCollider extends ColliderBase{
    public constructor(world:Physics.World,width:number,height:number){
        super(world);
        let colliderDesc:Physics.ColliderDesc = Physics.ColliderDesc.cuboid(width,height);
        this.mCollider = this.mWorld.createCollider(colliderDesc);
    }

    
};