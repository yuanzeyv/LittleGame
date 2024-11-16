export const GPhysicsScalingFactor:number = 96;  

export enum eOperationType{
    OpenDoor  = 0,//开门
    CloseDoor = 1,//关门
    ToSleep   = 2,//睡觉
};   


export enum ePrefabType{
    Cube,//方形
    Ball,//圆形
    Player,//玩家类型
}; 

export interface IOpertiaonType{
    OperationType:eOperationType;//操作的类型信息
    OperableID:number;//可操作的对象
    TriggerID:number;
}

export enum ePhysicsGoodsType{ 
    Hero = 1,//英雄类型
    Nightmare = 2,//梦魇类型
    Room = 3,//房间类型
    World = 4,//世界类型
    Barrier = 5,//障碍物类型
    Build = 6,//建筑物类型
    BuildVector = 7,//建筑容器类型
    Skill       = 8,//技能类型 

    RangeDetection = 100,//范围探测器 
};  

export enum eRigidHeroType{
    RobotHero = 1,//通用英雄类型
    Hero = 2,//英雄
};

export enum eRigidNightwareType{
    RobotNightmare = 1,//机器人梦魇类型
};

export enum eRigidRoomType{
    Normal = 1,//通用房间类型
};

export enum eRigidWorldType{
    Normal = 1,//通用世界类型
};

export enum eRigidBarrierType{
    Normal = 1,//通用障碍物类型
};

export enum eRigidBuildType{
    Battery     = 1,//炮台类型
    Bed         = 2,//床体类型
    Door        = 3,//房门类型
    GoldTower   = 4,//金币塔类型
    EnergyTower = 5,//能量塔类型
    NightmareHPPool = 6,//梦魇血池
};  
export enum eRigidBuildVectorType{
    Normal = 1,//通用障碍物类型
};

export enum eRigidSkillType{
    Imm_FireOnEnemy = 1,//向敌人方向开火
    Imm_ApoointTarge = 2,//指定对象造成伤害
    Imm_TraceFireOnEnemy = 3//跟踪敌人的子弹
};

export enum eRigidRangeDetectionType{
    DoorSensor = 1,//房门传感器
    BedSensor = 2,//床传感器
    Camera = 3//摄像机
};