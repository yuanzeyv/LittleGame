import  Physics from '@dimforge/rapier2d-compat';
import Decimal from "decimal.js";
import { Vec2, find } from 'cc';
import { RigidBodies, eRigidType } from './RigidBodies';
import { ColliderBase } from './ColliderBase';
export class PhysicsWrold {
    private mPhysicsWorld:Physics.World;//游戏世界
    private mEventQueue:Physics.EventQueue = new Physics.EventQueue(true);//碰撞事件 
    private mRigidBodyMap:Map<number,RigidBodies> = new Map<number,RigidBodies>();//所有的RigidBody对象封装

    private mDeletePlayer:Array<number> = new Array<number>();
    private mEvent:Set<number> = new Set<number>();
    private mIsCalc:boolean;//是否正在执行运算步骤中
    private mSumRunningTime:number = 0;//总运行时长
    private mStepTime:number = 0;//帧率计算时长

    constructor(gravity:Vec2 = new Vec2(0,0),stepTime:number = 1/ 60){
        this.mPhysicsWorld = new Physics.World({x:gravity.x,y:gravity.y});
        this.TimeStep = stepTime; 
    }
 
    //设置时间步长
    public get TimeStep():number{
        return this.mPhysicsWorld.timestep;
    }

    public set TimeStep(timeStep:number){
        this.mPhysicsWorld.timestep = timeStep;
    }
    
    //创建一个刚体
    public CreateRigidBody(type:eRigidType):RigidBodies{
        let rigidBodyDesc:Physics.RigidBodyDesc = undefined;
        if(type ==  eRigidType.Dynamic)
            rigidBodyDesc = Physics.RigidBodyDesc.dynamic(); 
        else if( eRigidType.Kinematic == type)
            rigidBodyDesc = Physics.RigidBodyDesc.kinematicVelocityBased(); 
        else if( eRigidType.Static == type)
            rigidBodyDesc = Physics.RigidBodyDesc.fixed(); 
        let rigidBody:Physics.RigidBody = this.mPhysicsWorld.createRigidBody(rigidBodyDesc);
        let rigidBodies:RigidBodies = new RigidBodies(this.mPhysicsWorld,rigidBody);
        rigidBody.userData = rigidBodies;
        this.mRigidBodyMap.set(rigidBody.handle,rigidBodies);//生成文件
        return rigidBodies;
    }

    //获取一个刚体
    public GetRigidBody(handleID:number):RigidBodies|undefined{
        return this.mRigidBodyMap.get(handleID);
    }

    //销毁一个刚体
    public DestoryRigidBody(handleID:number):void{
        if(this.mIsCalc){
            this.mEvent.add(handleID);
            return;
        }
        let rigidBodies:RigidBodies = this.mRigidBodyMap.get(handleID);
        this.mPhysicsWorld.removeRigidBody(rigidBodies.RigidBody);
    }
    //执行所有待三处的事件
    public ExecuteEvent(){
        for(let cell of this.mEvent)
            this.DestoryRigidBody(cell);
    }

    //单步运行一次物理世界
    public Update(dt:number):void{  
        this.mSumRunningTime += dt;//获取到物理世界总运行时长
        this.mStepTime += dt;
        while(this.mStepTime >= this.mPhysicsWorld.timestep){
            this.mStepTime -= this.mPhysicsWorld.timestep;
            this.mPhysicsWorld.step(this.mEventQueue);//执行一个时间步 
            this.mEventQueue.drainCollisionEvents((collider1:number,collider2:number,started:boolean)=>{
                let phyRigidBodyA:Physics.RigidBody = this.mPhysicsWorld.getCollider(collider1).parent();
                let phyRigidBodyB:Physics.RigidBody = this.mPhysicsWorld.getCollider(collider1).parent();
                let rigidBodieA:RigidBodies = (phyRigidBodyA.userData as RigidBodies);
                let rigidBodieB:RigidBodies = (phyRigidBodyB.userData as RigidBodies);  
                let colliderA:ColliderBase = rigidBodieA.GetCollider(collider1);
                let colliderB:ColliderBase = rigidBodieB.GetCollider(collider2);
                if(started){
                    colliderA.OnStartConcatCollider(colliderB);
                    colliderB.OnStartConcatCollider(colliderA);
                } else {
                    colliderA.OnLeaveConcatCollider(colliderB);
                    colliderB.OnLeaveConcatCollider(colliderA);
                } 
            });  
            this.mIsCalc = true;//计算锁
            this.ExecuteEvent();//执行上一帧未处理完成的事件
            for(let cell of this.mRigidBodyMap){
                cell[1].Update(this.mPhysicsWorld.timestep);//帧率是设定过的，所以这里的dt全部随时间走
            }
        }  
    }

    //是否绘制物理世界的线条
    //private RenderDebufLine():void{
    //    let graphics = find("Graphics",this.node).getComponent(Graphics);
    //    let render:Physics.DebugRenderBuffers = this.mPhysicsWorld.debugRender(); 
    //    graphics.clear(); 
    //    if(!_Facade.FindProxy(PhysicsProxy).IsDebugModel())
    //        return;
    //    graphics.lineWidth = 2; 
    //    for (let i = 0; i < render.vertices.length / 4; i += 1) {
    //        graphics.strokeColor = new Color(render.colors[i * 4] * 255,render.colors[i * 4+ 1] * 255,render.colors[i * 4 + 2] * 255,render.colors[i * 4 + 3] * 255);
    //        graphics.moveTo(render.vertices[i * 4] *  this.mPhysicsWorld.lengthUnit ,render.vertices[i * 4 + 1] *  this.mPhysicsWorld.lengthUnit);
    //        graphics.lineTo(render.vertices[i * 4 + 2] *  this.mPhysicsWorld.lengthUnit,render.vertices[i * 4 + 3] *  this.mPhysicsWorld.lengthUnit);
    //    }
    //    graphics.stroke();  
    //    graphics.fill();   
    //}
}