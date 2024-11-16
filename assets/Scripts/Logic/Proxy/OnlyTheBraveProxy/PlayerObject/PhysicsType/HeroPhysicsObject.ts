import { Vec2 } from "cc";
import { _Facade } from "../../../../../Global";
import { eRigidType } from "../../../../../Util/Physics/PhysicsDefine";
import { PhysicsWrold } from "../../../../../Util/Physics/World";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";
import { PhysicsObejct } from "./PhysicsObejct";
import { eFinalAttrType } from "../../Attr/AttrType";
import { PhysicsObjectFactory } from "../PhysicsObjectFactory";
import { BulletObjectFactory } from "../BulletObjectFactory";

//英雄是可以移动的
export class HeroPhysicsObject extends PhysicsObejct{ 
    protected mAttackInterval:number;  
    protected mAttackCountDown:number;//英雄每秒会攻击以此
     
    constructor(physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos:Vec2 = new Vec2(0,0),rotate:number = 0,param?:string,attrs?:Array<{K:number,V:number}>){
        super(physicsWorld,name,bodyID,functionBodys,pos,rotate,param,attrs);
        this.PlayerBase.SetUpdateHandle(this.Update.bind(this));//绑定进入视野的函数
        this.mAttackCountDown = this.mAttackInterval = 0.05;
    }

    protected RigidType(): eRigidType {
        return eRigidType.Dynamic;
    } 

    protected Update(dt:number){
        let count:number = 0;  
        while( (dt - this.mAttackInterval) >= 0){
            dt -= this.mAttackInterval; 
            count++;
        }
        if((this.mAttackCountDown -= dt) <= 0){
            count++; 
            this.mAttackCountDown = this.mAttackInterval + this.mAttackCountDown;
        } 
        for(let i = 0 ; i < count ; i++){
            let bullet:PhysicsObejct = BulletObjectFactory.Ins.GenPhysicsObject(_Facade.FindProxy(OnlyTheBraveProxy).PhysicsWorld,5,"Bullet",7,[9],this.PlayerBase.GetPosition().add2f(0,1),0,"","Normal",this);
            _Facade.FindProxy(OnlyTheBraveProxy).AddChildToMainRoot(bullet);
        } 
    }    
};  
 