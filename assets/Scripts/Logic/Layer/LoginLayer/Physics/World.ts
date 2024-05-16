import  Physics from '@dimforge/rapier2d-compat';
import { Vec2 } from 'cc';
export class PhysicsWrold {
    private mWorld:Physics.World|undefined;
    constructor(gravity:Vec2 = new Vec2(0,0)){
        this.mWorld = new Physics.World({x:gravity.x,y:gravity.y});
    }

    //单步运行一次物理世界
    public Step():void{
        this.mWorld.step();
    }

}