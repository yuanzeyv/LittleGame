import { RigidBodies } from './RigidBodies';
import { ColliderBase } from './ColliderBase';
import Physics from "@dimforge/rapier2d-compat"; 
import { Vec2 } from 'cc';
import { eRigidType, IRelevanceRigidBodyOBJ } from './PhysicsDefine';
export class PhysicsWrold {
    /*
    *物理世界 与 事件执行
    */
    private mPhysicsWorld:Physics.World;//一个基础的物理世界
    public get World():Physics.World {return this.mPhysicsWorld;}

    private mEventQueue:Physics.EventQueue = new Physics.EventQueue(true);//物理世界事件监听对象
    //设置时间步长
    public get TimeStep():number{  return this.mPhysicsWorld.timestep; }
    public set TimeStep(timeStep:number){ this.mPhysicsWorld.timestep = timeStep; } 
    /*
    *游戏内所有的刚体对象，都会被包含在此Map之中
    */
    private mRigidBodyMap:Map<number,RigidBodies> = new Map<number,RigidBodies>();//所有的RigidBody对象封装 
    /*
    *世界计算时间戳
    */
    private mStepTime:number = 0;//让游戏运行效率强行同步至至指定帧率 
    private mIsStepCalc:boolean;//是否正在执行运算步骤中
    /*
    *待销毁刚体
    */
    private mDestoryRigidEvent:Set<number> = new Set<number>();//每帧都会执行一次销毁事件
    /*
    *游戏的重力环境
    */
    constructor(gravity:Vec2 = new Vec2(0,0),stepTime:number = 1/ 60){
        this.mPhysicsWorld = new Physics.World({x:gravity.x,y:gravity.y});//设置游戏重力环境 
        this.TimeStep = stepTime; 
    }
    
    //判断一个刚体是否存在于
    public IsExistRigidBody(handleID:number):boolean{ 
        return this.World.getRigidBody(handleID) == undefined;
    }
    //直接获取到一个刚体组件
    public GetRigidBody(handleID:number):RigidBodies|undefined{ 
        return this.mRigidBodyMap.get(handleID); 
    }
    
    //获取到世界的所有刚体对象
    public GetRigidBodyMap():Map<number,RigidBodies>{
        return this.mRigidBodyMap;
    }
    
    /*
    *创建一个物理刚体
    */
   public CreateRigidBody(type:eRigidType,relevanceObj: IRelevanceRigidBodyOBJ):RigidBodies{
        let rigidBodyDesc:Physics.RigidBodyDesc = type == eRigidType.Dynamic ?Physics.RigidBodyDesc.dynamic(): type == eRigidType.Static ? Physics.RigidBodyDesc.fixed():Physics.RigidBodyDesc.kinematicVelocityBased() ; 
        let rigidBodies:RigidBodies = new RigidBodies(this,this.mPhysicsWorld.createRigidBody(rigidBodyDesc),relevanceObj);//创建一个刚体数据对象
        this.mRigidBodyMap.set(rigidBodies.ID,rigidBodies);//存储
        return rigidBodies;
    } 
     
    //销毁一个刚体
    public RemoveRigidBody(handleID:number):void{
        if(this.mIsStepCalc){//如果当前正在执行运算过程，将暂缓删除物理对象
            this.mDestoryRigidEvent.add(handleID);
            return;
        }
        let rigidBodies:RigidBodies = this.GetRigidBody(handleID);
        if(rigidBodies == undefined)
            return;
        rigidBodies.DestorySelf();
        this.mPhysicsWorld.removeRigidBody(rigidBodies.PhysicsRigidBodies);//尝试删除这个刚体
        this.mRigidBodyMap.delete(rigidBodies.ID);//删除这个rigid
    }
 
    //销毁一个刚体 
    public RemoveColliderByID(handle:number):void{
        let collider:Physics.Collider = this.mPhysicsWorld.getCollider(handle);  
        if(collider == undefined)
            return; 
        this.mPhysicsWorld.removeCollider(collider,false);  
    }   

    public ExecuteDestoryByRigidID(id:number){
        this.GetRigidBody(id).ForceLeaveCollider();//调用异常离开刚体的事件信息
        this.RemoveRigidBody(id);//删除这个刚体 
    }
 
    //执行所有待三处的事件
    public ExecuteDestoryEvent(){ 
        for(let id of this.mDestoryRigidEvent)
            this.ExecuteDestoryByRigidID(id);
        this.mDestoryRigidEvent.clear();
    }

    //单步运行一次物理世界
    public Update(dt:number):void{  
        this.mStepTime += dt;//步长增加
        let enterCount:number = 0;//为了防止卡顿，需要做一个限制，以免在一帧最多执行几次运算
        while(this.mStepTime >= this.mPhysicsWorld.timestep && enterCount++ < 3){
            this.mStepTime -= this.mPhysicsWorld.timestep;//减去一帧运行时间  
            this.mIsStepCalc = true;//锁定：处于计算状态中
            this.mPhysicsWorld.step(this.mEventQueue);
            //处理本帧事件
            this.mEventQueue.drainCollisionEvents((collider1:number,collider2:number,started:boolean)=>{ 
                let physicsCollider1:Physics.Collider = this.mPhysicsWorld.getCollider(collider1);//获取到碰撞器1的信息
                let physicsCollider2:Physics.Collider = this.mPhysicsWorld.getCollider(collider2);//获取到碰撞器2的信息
                if(physicsCollider1 == undefined || physicsCollider2 == undefined)//存在任何一个碰撞器不存在的情况，立即返回(不会出现，在此期间不应该有碰撞器被删除)
                    return; 
                let rigidBodieA:RigidBodies = (physicsCollider1.parent().userData as RigidBodies); 
                let rigidBodieB:RigidBodies = (physicsCollider2.parent().userData as RigidBodies);  
                let colliderA:ColliderBase = rigidBodieA.GetCollider(collider1);  
                let colliderB:ColliderBase = rigidBodieB.GetCollider(collider2);
                //两者对撞
                started ? colliderA.OnStartConcatCollider(colliderB) : colliderA.OnLeaveConcatCollider(colliderB);
                started ? colliderB.OnStartConcatCollider(colliderA) : colliderB.OnLeaveConcatCollider(colliderA); 
            });   
            for(let cell of this.mRigidBodyMap.values()) 
                cell.Update(this.mPhysicsWorld.timestep);//帧率是设定过的，所以这里的dt全部随时间走
            this.mIsStepCalc = false;//计算锁
            this.ExecuteDestoryEvent();//执行上一帧未处理完成的事件
        }   
    }
}  