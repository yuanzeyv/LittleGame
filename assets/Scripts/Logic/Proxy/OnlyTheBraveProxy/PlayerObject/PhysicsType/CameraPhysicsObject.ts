import { Vec2 } from "cc";
import { _Facade } from "../../../../../Global";
import { eRigidType } from "../../../../../Util/Physics/PhysicsDefine";
import { PhysicsWrold } from "../../../../../Util/Physics/World";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";
import { PhysicsObejct } from "./PhysicsObejct";
import { eNotice } from "../../../../../NotificationTable";
import { PlayerBase } from "../../Physics/PlayerBase";
import { Object } from "../Object";


//一个摄像机对象
export class CameraPhysicsObject extends PhysicsObejct{ 
    protected mFollowObject:Object;
    protected mViewPlayerIDSet:Set<number> = new Set<number>();//当前视野内的玩家对象

    constructor(physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos:Vec2 = new Vec2(0,0),rotate:number = 0,param?:string,attrs?:Array<{K:number,V:number}>){
        super(physicsWorld,name,bodyID,functionBodys,pos,rotate,param,attrs);
        this.PlayerBase.SetUpdateHandle(this.Update.bind(this));//绑定进入视野的函数
        this.PlayerBase.SetDetectionPlayerBaseEnterHandle(this.PlayerEnterView.bind(this));//绑定进入视野的函数
        this.PlayerBase.SetDetectionPlayerBaseLeaveHandle(this.PlayerLeaveView.bind(this));//绑定离开视野的函数
    } 
    
    protected RigidType(): eRigidType {
        return eRigidType.Kinematic;
    } 
    //一个玩家进入了视野 
    protected PlayerEnterView(playerBase: PlayerBase, detectionType: number){
        _Facade.Send(eNotice.OnlyTheBravePhysicsRigidBodyEnterView,playerBase.ID);
    }
    //一个玩家离开了视野
    protected PlayerLeaveView(playerBase: PlayerBase, detectionType: number){
        _Facade.Send(eNotice.OnlyTheBravePhysicsRigidBodyLeaveView,playerBase.ID);
    }

    //一个玩家离开了视野 
    protected Update(dt:number){
        //首先获取到当前的节点的坐标信息
        let pos:Vec2 = this.mFollowObject ? this.mFollowObject.PlayerBase.GetPosition() : this.PlayerBase.GetPosition(); 
        _Facade.FindProxy(OnlyTheBraveProxy).PlayerMoveToPos(this,pos,1);
    }

    public SetFollowObject(object:Object){
        this.mFollowObject = object;
    }
};    
