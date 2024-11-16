export const GPhysicsScalingFactor:number = 96; 
//所有碰撞器的类型
export enum eColliderCompType{ 
    PlayerBody = 1,//平民碰撞器类型  
    Nightmare = 2,//梦魇碰撞器类型
    Barrier = 3,//障碍物类型   
    Detection = 4,//范围探测器类型  
    RecoverComp = 7,//回复类型碰撞器 
    Room = 8,//房间碰撞器类型  
    Building = 9,//建筑类型 
    Skill = 10, //技能类型 
    Move = 11, //移动类型
    World = 12, //世界类型
    NightmareBuild = 13, //梦魇阵营建筑
};  
export enum eColliderBuildingBody{
    ImmCalcBarrier = 1,//立即计算障碍的  
    NoCalcBarrier = 2,//传感器类型，不会计算障碍的
    DynamicBarrier = 3,//动态计算障碍的
};
export enum eColliderHeroBody{
    Player = 1,//通用玩家类型 
};
export enum eColliderNightmareBody{ 
    Nightmare = 1,//通用玩家类型 
};

export enum eColliderBarrierBody{
    NormalBarrier = 1,//通用障碍物类型 
}; 

export enum eColliderDetectionBody{
    HeroDetection = 1,//平民检测器类型
    NightmareDetection = 2,//梦魇检测器
    VisibleDetection = 3,//视野检测器
    RoomDetection = 4,//房间检测器
    HeroCampDetection = 5,//英雄阵营探测器
}; 

export enum eColliderRecoverBody{
    HPRecover = 1,//回复生命用
    ShieldRecover = 2,//回复护盾用
    GoalRecover = 3,//回复金钱用
    TomatoRecover = 4,//回复练气丹用 
    HPPercentRecover = 5//HP百分比回复 
}; 
export enum eColliderRoomBody{
    Room = 1,//通用房间用
}; 

export enum eColliderSkillBody{
    Skill = 1,//通用技能类型
}; 
export enum eCollderDirBody{
    Dir =  1,//方向移动控制
    Path = 2,//路径移动控制
};  
 
export enum eColliderWorldBody{
    Normal = 1,//通用技能类型
}; 
export enum eCollideMarenightBuildBody{
    Normal = 1,//通用技能类型
}; 