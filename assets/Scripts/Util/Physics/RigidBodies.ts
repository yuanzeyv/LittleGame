import { Vec2 } from 'cc';
import { ColliderBase } from './ColliderBase';
import { PhysicsWrold } from './World';
import Physics from "@dimforge/rapier2d-compat";
import { IRelevanceRigidBodyOBJ, IRelevanceColliderOBJ } from './PhysicsDefine';

export class RigidBodies{ 
    protected mWorld:PhysicsWrold;
    protected mRigidBody:Physics.RigidBody;//关联的刚体信息
    protected mRelevanceObj:IRelevanceRigidBodyOBJ;//关联刚体对象
    protected mColliderMap:Map<number,ColliderBase> = new Map<number,ColliderBase>();//关联的所有的碰撞器
    public constructor(world:PhysicsWrold,rigidBody:Physics.RigidBody,relevanceObj:IRelevanceRigidBodyOBJ){
        this.mWorld = world;//赋值物理世界
        this.mRigidBody = rigidBody;//赋值物理刚体
        this.mRelevanceObj = relevanceObj;//赋值关联对象
        rigidBody.userData = this;//赋值用户数据，方便查找
    }
    //刚体唯一ID
    public get ID():number{ return this.mRigidBody.handle; } 
    //获取到物理刚体对象
    public get PhysicsRigidBodies():Physics.RigidBody { return this.mRigidBody; }
    //关联对象
    public get RelevanceObj():IRelevanceRigidBodyOBJ { return this.mRelevanceObj; }  
    //设置刚体类型
    public get RigidBodyType():Physics.RigidBodyType{ return this.mRigidBody.bodyType(); }
    //设置刚体的类型
    public SetRigidBodyType(type:Physics.RigidBodyType,wakeUp:boolean = true){
        this.mRigidBody.setBodyType(type,wakeUp);//进行设置刚体类型
    }
    //获取与设置刚体的位置信息 
    public GetPosition():Vec2{
        let pos:Physics.Vector2 = this.mRigidBody.translation();
        return new Vec2(pos.x,pos.y)
    } 
    public SetPosition(pos:Vec2,wakeUp:boolean = true):void{ 
        this.mRigidBody.setTranslation({x:pos.x,y:pos.y},wakeUp);
    }
    public get PositionX():number{ return this.mRigidBody.translation().x; } 
    public get PositionY():number{  return this.mRigidBody.translation().y; }
    //获取到旋转弧度 与 角度
    public get RotateRadian():number{  return this.mRigidBody.rotation();  }
    public get RotateDegree():number{  return this.RotateRadian * 180 / Math.PI; }

    public SetRotate(degree:number,wakeUp:boolean = true):void{ 
        this.mRigidBody.setRotation(degree / 180 * Math.PI,wakeUp);
    }
    
    //获取与设置线性速度
    public GetLinVel():Vec2{
        let pos:Physics.Vector2 = this.mRigidBody.linvel();
        return new Vec2(pos.x,pos.y);
    }  
    public SetLinVel(vel:Vec2,wakeUp:boolean = true):void{ 
        this.mRigidBody.setLinvel({x:vel.x,y:vel.y},wakeUp); 
    }
    
    //获取与设置角速度  
    public GetAngvel():number{ 
        return this.mRigidBody.angvel(); 
    }
    //设置角速度
    public SetAngvel(vel:number,wakeUp:boolean = true):void{ 
        this.mRigidBody.setAngvel(vel,wakeUp); 
    }
    
    //获取与设置重力缩放比例
    public GetGravityScale():number{  return this.mRigidBody.gravityScale();  } 
    public SetGravityScale(scale:number,wakeUp:boolean = true):void{ this.mRigidBody.setGravityScale(scale,wakeUp); } 
    
    //获取与设置当前是否CCD使能
    public GetCCDEnable():boolean{ 
        return this,this.mRigidBody.isCcdEnabled(); 
    }
    public SetCCDEnable(enableCCD:boolean){  
        this.mRigidBody.enableCcd(enableCCD); 
    }

    /*
    *给物体施加一个力
    */
    public AddForces(vel:Vec2,wakeUp:boolean = true):void{ 
        this.mRigidBody.addForce({x:vel.x,y:vel.y},wakeUp); 
    }
    public ApplyImpulse(vel:Vec2,wakeUp:boolean = true):void{ 
        this.mRigidBody.applyImpulse(vel,wakeUp); 
    }
    //清理物体的力
    public ClearForces(wakeUp:boolean = true):void{ 
        this.mRigidBody.resetForces(wakeUp); 
    }
    
    //给物体施加扭力一个扭力
    public AddTorque(vel:number,wakeUp:boolean = true):void{ 
        this.mRigidBody.addTorque(vel,wakeUp); 
    } 

    public ApplyTorque(vel:number,wakeUp:boolean = true):void{ 
        this.mRigidBody.applyTorqueImpulse(vel,wakeUp); 
    }

    public ClearTorque(wakeUp:boolean = true):void{ 
        this.mRigidBody.resetTorques(wakeUp); 
    }
    
    //锁定位置
    public LockTranslations(isLock:boolean,wakeUp:boolean = true){ 
        this.mRigidBody.lockTranslations(isLock,wakeUp); 
    }
    //锁定旋转
    public LockRotation(isLock:boolean,wakeUp:boolean = true){ 
        this.mRigidBody.lockRotations(isLock,wakeUp); 
    }

    //获取与设置当前的摩擦系数
    public GetLinearDamping():number{ 
        return this.mRigidBody.linearDamping(); 
    }
    //设置当前的摩擦系数
    public SetLinearDamping(damping:number){ 
        this.mRigidBody.setLinearDamping(damping); }

    //获取当前的摩擦系数
    public GetAngularDamping():number{  
        return this.mRigidBody.linearDamping(); 
    }
    //设置当前的角摩擦系数
    public SetAngularDamping(damping:number){ 
        this.mRigidBody.setLinearDamping(damping);  
    }

    //当前是否正在休眠
    public IsSleep():boolean{ 
        return this.mRigidBody.isSleeping(); 
    }
    //设置为休眠装填
    public ToSleep():void{ 
        this.mRigidBody.sleep(); 
    }
    //设置为休眠装填
    public WakeUp():void{ 
        this.mRigidBody.wakeUp(); 
    }


    /*
    *创建一系列的Collider
    */
    public CreateBallCollider(redius:number,relevanceColliderOBJ: IRelevanceColliderOBJ):ColliderBase{
        return this.CreateCollider(Physics.ColliderDesc.ball(redius),relevanceColliderOBJ);
    } 
    public CreateCubuCollider(width:number,height:number,relevanceColliderOBJ: IRelevanceColliderOBJ):ColliderBase{
        return this.CreateCollider(Physics.ColliderDesc.cuboid(width,height) ,relevanceColliderOBJ);
    }
    private CreateCollider(ColliderDesc:Physics.ColliderDesc ,relevanceColliderOBJ: IRelevanceColliderOBJ):ColliderBase{
        let collider:Physics.Collider = this.mWorld.World.createCollider(ColliderDesc,this.mRigidBody);//利用物理世界创建一个物理碰撞器
        let colliderBase:ColliderBase = new ColliderBase(collider,relevanceColliderOBJ);//创建一个碰撞器对象
        this.mColliderMap.set(collider.handle,colliderBase);//创建完成后，将其插入到ColliderMap之中
        return colliderBase; 
    }
    public RemoveCollider(colliderID:number){
        this.GetCollider(colliderID).DestorySelf();//尝试销毁自己
        this.mWorld.RemoveColliderByID(colliderID); //尝试在世界中校徽征集
        this.mColliderMap.delete(colliderID);
    }

    public GetCollider(colliderID:number):ColliderBase{ 
        return this.mColliderMap.get(colliderID); 
    }
    
    public GetColliders():Map<number,ColliderBase>{ 
        return this.mColliderMap;
    }

    /* 
    *自定义回调区域    
    */ 
    //更新回调（每帧一定可以调用到）
    public Update(dt:number):void{
        for(let cell of this.mColliderMap)
                cell[1].Update(dt);
        this.mRelevanceObj!.Update(dt);//每帧调用一下更新函数
    } 

    public ForceLeaveCollider():void{
        this.mRelevanceObj!.ForceLeaveCollider();//强制离开碰撞器
    }

    public DestorySelf():void{
        //通知所有的碰撞器删除自己
        for(let cell of this.mColliderMap.values()){
            cell.DestorySelf();
            this.mWorld.RemoveColliderByID(cell.GetColliderID()); 
        } 
        this.mColliderMap.clear();
        this.mRelevanceObj!.DestorySelf();
    }
    
} 