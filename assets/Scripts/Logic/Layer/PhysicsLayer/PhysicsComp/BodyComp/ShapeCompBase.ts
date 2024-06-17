import  Physics from '@dimforge/rapier2d-compat';
import { PhysicsCompBase } from "../PhysicsCompBase";
import { _Facade } from '../../../../../Global';
export class ShapeCompBase extends PhysicsCompBase{
    public OnStart(){
        this.SetColliderActiveEvent(true,false);
        this.SetCollidersGroup(0x0001FFFF);//角色形状 可以与任何物体发生碰撞，唯独不会与自己产生碰撞
    }
}   