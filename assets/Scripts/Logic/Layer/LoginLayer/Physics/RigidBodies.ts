import  Physics, { RigidBodyDesc } from '@dimforge/rapier2d-compat';
import { Vec2 } from 'cc';

export class RigidBodies{
    protected mWorld:Physics.World;
    protected mRigidBody:Physics.RigidBody|undefined;
    public constructor(world:Physics.World){
        this.mWorld = world;
        this.mRigidBody = this.mWorld.createRigidBody(new RigidBodyDesc(0));
    }
    //设置刚体类型
    public SetRigidBodyType(type:Physics.RigidBodyType,wakeUp:boolean = true){
        if(type == this.mRigidBody.bodyType())//查看是否同属于一种刚体类型
            return;
        this.mRigidBody.setBodyType(type,wakeUp);
    }
    //获取到刚体类型
    public GetRigidBodyType():Physics.RigidBodyType{
        return this.mRigidBody.bodyType();
    }
    //获取到刚体的位置信息
    public GetPosition():Vec2{
        let pos:Physics.Vector2 = this.mRigidBody.translation();//获取到碰撞器的位置信息
        return new Vec2(pos.x,pos.y);
    }
    //设置刚体的位置信息
    public SetPosition(pos:Vec2,wakeUp:boolean = true):void{
        this.mRigidBody.setTranslation({x:pos.x,y:pos.y},wakeUp);
    }
    //设置线性速度
    public SetLinVel(vel:Vec2,wakeUp:boolean = true):void{
        this.mRigidBody.setLinvel({x:vel.x,y:vel.y},wakeUp);//获取到碰撞器的位置信息
    }
    //获取线性速度
    public GetLinVel():Vec2{
        let pos:Physics.Vector2 = this.mRigidBody.linvel();//获取到碰撞器的位置信息
        return new Vec2(pos.x,pos.y);
    }

    //设置角速度
    public SetAngvel(vel:number,wakeUp:boolean = true):void{
        this.mRigidBody.setAngvel(vel,wakeUp);//获取到碰撞器的位置信息
    }
    //获取角速度  
    public GetAngvel():number{
        return this.mRigidBody.angvel();//获取到碰撞器的位置信息
    }

    //设置重力缩放比例 
    public SetGravityScale(scale:number,wakeUp:boolean = true):void{
        this.mRigidBody.setGravityScale(scale,wakeUp);//获取到碰撞器的位置信息
    } 
    //获取重力缩放比例
    public GetGravityScale():number{
        return this.mRigidBody.gravityScale();//获取到碰撞器的位置信息
    }

    //设置CCD使能
    public SetCCDEnable(enableCCD:boolean):void{
        return this,this.mRigidBody.enableCcd(enableCCD);
    }
    //获取当前是否是CCD使能状态
    public GetCCDEnable():boolean{
        return this,this.mRigidBody.isCcdEnabled();
    }

    //设置物体的力
    public SetForces(vel:Vec2,wakeUp:boolean = true):void{
        this.mRigidBody.addForce({x:vel.x,y:vel.y},wakeUp);//获取到碰撞器的位置信息
    }
    //清理物体的力
    public ClearForces(wakeUp:boolean = true):void{
        this.mRigidBody.resetForces(wakeUp);//获取到碰撞器的位置信息
    }
    
    //设置物体的力
    public SetTorque(vel:number,wakeUp:boolean = true):void{
        this.mRigidBody.addTorque(vel,wakeUp);//获取到碰撞器的位置信息
    }
    //清理物体的力
    public ClearTorque(wakeUp:boolean = true):void{
        this.mRigidBody.resetTorques(wakeUp);//获取到碰撞器的位置信息
    }
    
    //应用冲量
    public ApplyImpulse(vel:Vec2,wakeUp:boolean = true):void{
        this.mRigidBody.applyImpulse(vel,wakeUp);//获取到碰撞器的位置信息
    }
    //应用角冲量
    public ApplyTorque(vel:number,wakeUp:boolean = true):void{
        this.mRigidBody.applyTorqueImpulse(vel,wakeUp);//获取到碰撞器的位置信息
    }

    //锁定位置
    public LockTranslations(isLock:boolean,wakeUp:boolean = true){
        this.mRigidBody.lockTranslations(isLock,wakeUp);
    }

    //锁定旋转
    public LocakRotation(isLock:boolean,wakeUp:boolean = true){
        this.mRigidBody.lockRotations(isLock,wakeUp);
    }

    //设置当前的摩擦系数
    public SetLinearDamping(damping:number){
        this.mRigidBody.setLinearDamping(damping);
    }
    //获取当前的摩擦系数
    public GetLinearDamping():number{
        return this.mRigidBody.linearDamping();
    }

    //设置当前的角摩擦系数
    public SetAngularDamping(damping:number){
        this.mRigidBody.setLinearDamping(damping); 
    }
    //获取当前的摩擦系数
    public GetAngularDamping():number{ 
        return this.mRigidBody.linearDamping();
    }
    //当前是否正在休眠
    public IsSleep():boolean{
        return this.mRigidBody.isSleeping();
    }
    //设置为休眠装填
    public SetSleep():void{
        this.mRigidBody.sleep();
    }
}