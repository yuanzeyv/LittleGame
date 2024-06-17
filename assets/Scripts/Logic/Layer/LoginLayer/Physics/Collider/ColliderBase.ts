import  Physics from '@dimforge/rapier2d-compat';
import { Vec2 } from 'cc';
export class ColliderBase{
    protected mWorld:Physics.World;
    protected mCollider:Physics.Collider|undefined;
    public constructor(world:Physics.World){
        this.mWorld = world;
    }

    //获取碰撞器的位置
    public GetPosition():Vec2{
        let pos:Physics.Vector2 = this.mCollider.translation();//获取到碰撞器的位置信息
        return new Vec2(pos.x,pos.y);
    }

    //设置碰撞器的位置
    public SetPosition(pos:Vec2){
        this.mCollider.setTranslation({x:pos.x,y:pos.y});
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
        
        //this.mCollider.onCollisionEnter
        return this.mCollider.friction();
    }

    //设置弹性系数规则
    public SetRestitutionRole(rule: Physics.CoefficientCombineRule){
        this.mCollider.setFrictionCombineRule(rule);
    }
};

 