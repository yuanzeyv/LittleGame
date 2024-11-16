import { Vec2 } from "cc";
import { _Facade } from "../../../../../Global";
import { eRigidType } from "../../../../../Util/Physics/PhysicsDefine";
import { PhysicsWrold } from "../../../../../Util/Physics/World";
import { eColliderDetectionBody } from "../../../PhysicsProxy/Define/ColliderConst";
import { eTriggerType } from "../../Buff/BuffDefine";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";
import { PlayerBase } from "../../Physics/PlayerBase";
import { PhysicsObejct } from "../PhysicsType/PhysicsObejct";

//游戏中的子弹对象
/*
*子弹对象的有一个玩家对象
*子弹会关联玩家属性，但也仅是关联玩家属性
*/
export class BulletPhysicsObject extends PhysicsObejct{ 
    private mPlayerPhysicsObject:PhysicsObejct;//释放者

    private mBulletLife:number = 1;//子弹生命周期
    constructor(physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos:Vec2 = new Vec2(0,0),rotate:number = 0,param?:string,attrs?:Array<{K:number,V:number}>,parent?:PhysicsObejct){
        super(physicsWorld,name,bodyID,functionBodys,pos,rotate,param,attrs);
        
        this.PlayerBase.RigidBody.SetCCDEnable(true);
        this.PlayerBase.SetDetectionPlayerBaseEnterHandle(this.DetectionPlayerBaseEnterHandle.bind(this));
        this.PlayerBase.SetDetectionPlayerBaseLeaveHandle(this.DetectionPlayerBaseLeaveHandle.bind(this));
        this.PlayerBase.SetUpdateHandle(this.Update.bind(this));//绑定进入视野的函数
        this.mAttrObj.Data.SetParent(parent.AttrObj);//设置属性关联
        this.PlayerBase.RigidBody.SetLinVel(new Vec2(0,150));//以150码的速度前进
    }
    
    protected RigidType(): eRigidType {
        return eRigidType.Dynamic;
    } 

    protected Update(dt:number){ 
        this.mBulletLife -= dt;
        if( this.mBulletLife > 0 )
            return;
        _Facade.FindProxy(OnlyTheBraveProxy).RemoveObject(this.ID); 
    }  

    private DetectionPlayerBaseEnterHandle(playerBase:PlayerBase,detectionType:eColliderDetectionBody){ 
        this.mPlayerPhysicsObject.BuffControl.TriggerEvent(eTriggerType.AttackFront,{OperObj:this.ID,BeAtker:playerBase.ID,Hurm:500});
        let isLife:boolean  = _Facade.FindProxy(OnlyTheBraveProxy).ObjectAttack(this.ID,playerBase.ID,0);
        this.mPlayerPhysicsObject.BuffControl.TriggerEvent(eTriggerType.AttackAfter,{OperObj:this.ID,BeAtker:playerBase.ID,Hurm:500});
        if( isLife ){
            this.mPlayerPhysicsObject.BuffControl.TriggerEvent(eTriggerType.KillEnemyFront,{OperObj:this.ID,BeAtker:playerBase.ID,Hurm:500});
            _Facade.FindProxy(OnlyTheBraveProxy).RemoveObject(playerBase.ID);
            this.mPlayerPhysicsObject.BuffControl.TriggerEvent(eTriggerType.KillEnemyAfter,{OperObj:this.ID,BeAtker:playerBase.ID,Hurm:500});
            
            this.mPlayerPhysicsObject.BuffControl.TriggerEvent(eTriggerType.CompDie,{OperObj:this.ID});
            this.RemoveObject();
        }
    }

    private DetectionPlayerBaseLeaveHandle(playerBase:PlayerBase,detectionType:eColliderDetectionBody){
    }
};    
 