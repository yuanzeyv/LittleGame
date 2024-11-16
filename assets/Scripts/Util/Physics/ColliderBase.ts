import Physics, { ActiveCollisionTypes } from "@dimforge/rapier2d-compat";
import { RigidBodies } from './RigidBodies';
import { Vec2, Vec3 } from "cc";
import { IRelevanceColliderOBJ } from "./PhysicsDefine";
export class ColliderBase{
    protected mCollider:Physics.Collider;//物理世界的刚体信息
    protected mRelevanceObj:IRelevanceColliderOBJ;//关联的一个碰撞器对象
    public constructor(collider:Physics.Collider,relevanceColliderOBJ:IRelevanceColliderOBJ){
        this.mCollider = collider;
        this.mRelevanceObj = relevanceColliderOBJ;
    }

    //当前碰撞器的唯一ID
    public GetPhysicsCollider():Physics.Collider{ 
        return this.mCollider; 
    } 

    public GetColliderID():number{ 
        return this.mCollider.handle; 
    } 
    public GetRelevanceObj():IRelevanceColliderOBJ { 
        return this.mRelevanceObj; 
    }  
    public get Parent():RigidBodies { 
        return this.mCollider.parent().userData as any as RigidBodies; 
    }  
     
    //获取碰撞器的位置
    public get Position():Vec2{
        let pos:Physics.Vector2 = this.mCollider.translation();//获取到碰撞器的位置信息
        return new Vec2(pos.x,pos.y);
    }
    public get PositionV3():Vec3{
        let pos:Physics.Vector2 = this.mCollider.translation();//获取到碰撞器的位置信息
        return new Vec3(pos.x,pos.y,0);
    }
    //设置碰撞器的位置
    public set Position(pos:Vec2){  
        this.mCollider.setTranslation({x:pos.x,y:pos.y}); 
    }

    
    //设置碰撞器相对于父节点的位置
    public SetTranslationWrtParent(pos:Vec2){  
        this.mCollider.setTranslationWrtParent({x:pos.x,y:pos.y}); 
    }
    //设置相对于父节点的旋转
    public SetRotationWrtParent(angle:number){  
        this.mCollider.setRotationWrtParent(angle); 
    }
 
    //获取碰撞器的旋转角度
    public get Rotation():number{ return this.mCollider.rotation(); }
    //设置碰撞器的旋转角度
    public set Rotation(rotation:number){ this.mCollider.setRotation(rotation); }

    //获取碰撞器的重量
    public get Density():number{ return this.mCollider.density(); }
    //设置碰撞器的重量
    public set Density(density:number){ this.mCollider.setDensity(density); }

    //是否为触发器
    public get Sensor():boolean{ return this.mCollider.isSensor(); }
    //是否为传感器
    public set Sensor(sensor:boolean){ this.mCollider.setSensor(sensor); }
    
    //获取摩檫力
    public get Friction():number{ return this.mCollider.friction(); }
    //设置摩檫力（取值允许大于1）
    public set Friction(friction:number){ this.mCollider.setFriction(friction); }

    //获取摩檫力规则
    public get FrictionRole():Physics.CoefficientCombineRule { return this.mCollider.frictionCombineRule(); }
    //设置
    public set FrictionRole(rule: Physics.CoefficientCombineRule){ this.mCollider.setFrictionCombineRule(rule); }

    //获取弹性系数
    public get Restitution():number{ return this.mCollider.friction(); }
    //设置弹性系数
    public set Restitution(friction:number){ this.mCollider.setFriction(friction); }

    //获取弹性规则系数
    public get RestitutionRole( ){ return this.mCollider.restitutionCombineRule(); }
    //设置弹性系数规则
    public set RestitutionRole(rule: Physics.CoefficientCombineRule){ this.mCollider.setRestitutionCombineRule(rule); }

    //获取到当前的碰撞器的形状
    public get Shape():Physics.ShapeType{ return this.mCollider.shape.type; }

    //设置碰撞器的半径
    public SetContent(x:number,y:number = 0){
        switch(this.Shape){
            case Physics.ShapeType.Ball:
                this.mCollider.setRadius(x);
                break;
            case Physics.ShapeType.Cuboid: 
                this.mCollider.setHalfExtents({x:x,y:y});
                break;
        } 
    }

    public get ContentSize():Vec2 { 
        let content:{x:number,y:number};//获取到程序的半高
        switch(this.Shape){
            case Physics.ShapeType.Ball:
                content = {x:this.mCollider.radius(),y:this.mCollider.radius()};
                break;
            case Physics.ShapeType.Cuboid: 
                content = this.mCollider.halfExtents();
                break;
        } 
        return new Vec2(content.x,content.y);
    }  
    
    //设置要激活的碰撞事件
    public SetActiveCollisionTypes(activeCollisionTypes: ActiveCollisionTypes):void{ 
        this.mCollider.setActiveCollisionTypes( activeCollisionTypes);
    } 
    
    //获取要激活的碰撞事件
    public GetActiveCollisionTypes():number{ 
        return this.mCollider.activeCollisionTypes();
    }
 
    //设置要激活的碰撞事件
    public SetColliderActiveEvent(openCollision:boolean,openConcat:boolean):void{ 
        this.mCollider.setActiveEvents( (openCollision?Physics.ActiveEvents.COLLISION_EVENTS:Physics.ActiveEvents.NONE) |  (openConcat?Physics.ActiveEvents.CONTACT_FORCE_EVENTS:Physics.ActiveEvents.NONE));
    }

    public SetCollidersGroup(bits:number):void{  
        this.mCollider.setCollisionGroups(bits);
    }  

    public GetCollidersGroup():number{  
        return this.mCollider.collisionGroups();
    }  

    public SetSolverGroups(bits:number):void{   
        this.mCollider.setSolverGroups(bits);
    }  

    //开始碰撞回调
    public OnStartConcatCollider(colliderObj:ColliderBase):void{
        this.mRelevanceObj!.OnStartConcatCollider(colliderObj);
    }

    public OnLeaveConcatCollider(colliderObj:ColliderBase):void{
       this.mRelevanceObj!.OnLeaveConcatCollider(colliderObj);
    }

    //销毁自己
    public DestorySelf():void{
       this.mRelevanceObj!.DestorySelf();
    }

    //更新函数
    public Update(dt:number){
        this.mRelevanceObj.Update(dt);
    }
};   