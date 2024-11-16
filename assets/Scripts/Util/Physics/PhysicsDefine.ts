import { ColliderBase } from "./ColliderBase";

//刚体类型的定义
export enum eRigidType{
    Dynamic = 0,//动态刚体类型
    Static = 1,//静态刚体类型
    Kinematic = 2,//线性运动学  吧刚体
};
//物理世界刚体  与   数据刚体关联结构体
export interface IRelevanceRigidBodyOBJ{ 
    OnCreate():void;//物理世界的自己被创建成功之后
    ForceLeaveCollider():void;//异常流程离开刚体回调 
    DestorySelf():void;//删除自己
    Update(dt:number):void;//每帧更新函数
}; 

//物理世界刚体  与   数据刚体关联结构体
export interface IRelevanceColliderOBJ{
    OnStartConcatCollider(colliderObj:ColliderBase):void;
    OnLeaveConcatCollider(colliderObj:ColliderBase):void;
    DestorySelf():void;
    Update(dt:number):void;//每帧更新函数
};