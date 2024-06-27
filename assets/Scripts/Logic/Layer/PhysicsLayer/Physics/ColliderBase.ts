import  Physics from '@dimforge/rapier2d-compat';
import { Vec2 } from 'cc';
export interface IRelevanceOBJ{
    OnStartConcatCollider(colliderObj:ColliderBase):void;
    OnLeaveConcatCollider(colliderObj:ColliderBase):void;
};
export class ColliderBase{
    protected mCollider:Physics.Collider|undefined;
    protected mRelevanceObj:IRelevanceOBJ;
    public constructor(collider:Physics.Collider){
        this.mCollider = collider;
    }

    //当前碰撞器的唯一ID
    public get ID():number{
        return this.mCollider.handle;
    }

    public get RelevanceObj():IRelevanceOBJ{
        return this.mRelevanceObj;
    }

    public set RelevanceObj(relevanceObj:IRelevanceOBJ){
        this.mRelevanceObj = relevanceObj;
    }

    //获取碰撞器的位置
    public GetPosition():Vec2{
        let pos:Physics.Vector2 = this.mCollider.translation();//获取到碰撞器的位置信息
        return new Vec2(pos.x,pos.y);
    }

    //设置碰撞器的位置
    public SetPosition(x:number,y:number){
        this.mCollider.setTranslation({x:x,y:y});
    }

    //获取碰撞器的旋转角度
    public GetRotation():number{
        return this.mCollider.rotation();
    }
    
    //设置碰撞器的选装
    public SetRotation(rotation:number){
        this.mCollider.setRotation(rotation);
    }

    //设置碰撞器的重量
    public SetDensity(density:number){
        this.mCollider.setDensity(density);
    }

    //获取碰撞器的重量
    public GetDensity():number{
        return this.mCollider.density();
    }

    //是否为接触器
    public IsSensor():boolean{
        return this.mCollider.isSensor();
    }
    
    //是否为传感器
    public SetSensor(sensor:boolean){
        this.mCollider.setSensor(sensor);
    }

    //设置摩檫力（取值允许大于1）
    public SetFriction(friction:number){
        this.mCollider.setFriction(friction);
    }
    //获取摩檫力
    public GetFriction():number{
        return this.mCollider.friction();
    }

    //设置摩檫力规则
    public SetFrictionRole(rule: Physics.CoefficientCombineRule){
        this.mCollider.setFrictionCombineRule(rule);
        Physics.ActiveHooks.FILTER_CONTACT_PAIRS
    }

    //设置弹性系数
    public SetRestitution(friction:number){
        this.mCollider.setFriction(friction);
    }
    //获取弹性系数
    public GetRestitution():number{
        return this.mCollider.friction();
    }

    //设置弹性系数规则
    public SetRestitutionRole(rule: Physics.CoefficientCombineRule){
        this.mCollider.setFrictionCombineRule(rule);
    }

    //设置碰撞器的半径
    public SetContent(x:number,y:number = 0){
        switch(this.mCollider.shape.type){
            case Physics.ShapeType.Ball:
                this.mCollider.setRadius(x);
            case Physics.ShapeType.Cuboid: 
                this.mCollider.setHalfExtents({x:x,y:y});
        } 
    }

    public get ContentSize():{x:number,y:number}{   
        return this.mCollider.halfExtents();
    }

    public get Radius():number{   
        return this.mCollider.radius();
    }

    public SetColliderActiveEvent(openCollision:boolean,openConcat:boolean):void{ 
        this.mCollider.setActiveEvents( (openCollision?Physics.ActiveEvents.COLLISION_EVENTS:Physics.ActiveEvents.NONE) |  (openConcat?Physics.ActiveEvents.CONTACT_FORCE_EVENTS:Physics.ActiveEvents.NONE));
    }
 
    public SetCollidersGroup(bits:number):void{  
        this.mCollider.setCollisionGroups(bits);
    }  
    public SetSolverGroups(bits:number):void{   
        this.mCollider.setSolverGroups(bits);
    }  
    //开始碰撞回调
    public OnStartConcatCollider(colliderObj:ColliderBase):void{
        this.mRelevanceObj?.OnStartConcatCollider(colliderObj);
    }

    public OnLeaveConcatCollider(colliderObj:ColliderBase):void{
       this.mRelevanceObj?.OnLeaveConcatCollider(colliderObj);
    }

    //获取到当前的碰撞器的形状
    public get Shape(){
        return this.mCollider.shape.type;
    }
};  