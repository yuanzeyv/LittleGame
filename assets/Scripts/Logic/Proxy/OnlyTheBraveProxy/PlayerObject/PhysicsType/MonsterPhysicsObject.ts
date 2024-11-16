import { Vec2 } from "cc";
import { _Facade } from "../../../../../Global";
import { eRigidType } from "../../../../../Util/Physics/PhysicsDefine";
import { PhysicsWrold } from "../../../../../Util/Physics/World";
import { PhysicsObejct } from "./PhysicsObejct";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";

export class MonsterPhysicsObject extends PhysicsObejct{ 
    private mDetectTime:number = 0.3;//怪物每 500 毫秒都会重新向敌人方向前进
    
    constructor(physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos:Vec2 = new Vec2(0,0),rotate:number = 0,param?:string,attrs?:Array<{K:number,V:number}>){
        super(physicsWorld,name,bodyID,functionBodys,pos,rotate,param,attrs);
        this.PlayerBase.SetUpdateHandle(this.Update.bind(this));//绑定进入视野的函数
    }

    protected RigidType(): eRigidType {
        return eRigidType.Dynamic; 
    }

    protected Update(dt:number){  
        if( ( this.mDetectTime -= dt ) <= 0 ){
            this.mDetectTime = 0.3; 
            let onlyTheBraveProxy:OnlyTheBraveProxy = _Facade.FindProxy(OnlyTheBraveProxy);
            onlyTheBraveProxy.PlayerMoveToPos(this,onlyTheBraveProxy.GetPlayerObject().Position,1);
        }

    } 
};    
  