import { Collider, Node, UITransform, Vec2, instantiate, math } from "cc";
import  Physics from '@dimforge/rapier2d-compat';
import { PlayerBase } from "../Player/PlayerBase";
import { PhysicsProxy, ePrefabType } from "../../../Proxy/PhysicsProxy/PhysicsProxy";
import { _Facade } from "../../../../Global";
import { GPhysicsScalingFactor } from "../../../Proxy/PhysicsProxy/Define/Physics";
import { Cfg_PhysicsCollider, IPhysicsColliderStruct } from "../../../../Config/Cfg_PhysicsCollider";
import Decimal from "decimal.js";
import { ColliderBase, IRelevanceOBJ } from "../Physics/ColliderBase";
 
export class PhysicsCompBase  implements IRelevanceOBJ {
    protected mPlayer:PlayerBase//包含玩家的所有数据信息 
    protected mColliderConfig:IPhysicsColliderStruct//当前的物理组件，所指向的玩家的信息
    protected mCollider:ColliderBase;//每一个形状对应一个碰撞器
    protected mNode:Node;//每一个形状对应着一个游戏节点，这个节点是需要用来展示 
    public get Player():PlayerBase{ return this.mPlayer; }
    public get Config():IPhysicsColliderStruct{ return this.mColliderConfig; }
    public get Node():Node{ return this.mNode;}
    public get ID():number{ return this.mCollider.ID; }//获取到组件的唯一ID

    public constructor(playerBase:PlayerBase,colliderCon:IPhysicsColliderStruct){ 
        this.mPlayer = playerBase;
        this.mColliderConfig = colliderCon;
    }

    //第一次进入时，调用进行数据的 
    public OnEnter(){
        this.mCollider = this.GenerateCollider();//生成一个Collider
        this.mCollider.RelevanceObj = this;  
        this.mNode = this.GenerateNode();
        this.InitColliderContentSize();//初始化碰撞器的大小
        this.InitColliderPosition();//初始化碰撞器的位置
        this.InitColliderRotate();//初始化碰撞器的旋转 
    }
    
    //启用组件时，调用本方法
    public OnStart(){
    } 

    //第一次退出时，调用进行数据的清理
    public OnExit(){
    } 
    //停用组件时，调用本方法
    public OnDisable(){
    }
    
    protected GenerateCollider():ColliderBase{
        if(this.Config.Shape == ePrefabType.Ball)
            return this.mPlayer.GenerateBallCollider(0);
        else if(this.Config.Shape == ePrefabType.Cube)
            return this.mPlayer.GenerateCubuColliderRigidBody(0,0);
    }
    
    protected GenerateNode():Node{
        return instantiate(_Facade.FindProxy(PhysicsProxy).GetPrefab(this.Config.Shape));
    }
   
    protected InitColliderContentSize():void{   
        let width:number = this.Config.Shape == ePrefabType.Ball ? this.Config.Redius:this.Config.Size.Width;
        let height:number = this.Config.Shape == ePrefabType.Ball ? this.Config.Redius:this.Config.Size.Height;
        this.SetContentSize(width,height);  
    }

    protected InitColliderPosition():void{   
        this.SetPosition(0,0);//设置位置的话，默认为0，0点
    }
    
    protected InitColliderRotate():void{     
        this.SetRoate(math.toRadian(0));//设置旋转默认为0度
    }
    
    //设置刚体的尺寸 单位为 米 
    public SetContentSize(width:number,height:number):void {
        this.mCollider.SetContent(width,height);
        this.UpdateNodeContent();//更新游戏的Content 
    }    
     

    public get ContentSize():{x:number,y:number}{   
        return this.mCollider.ContentSize;
    }

    public get Radius():number{   
        return this.mCollider.Radius;
    }

    public SetPosition(x:number,y:number):void {
        this.mCollider.SetPosition(x,y);
        this.UpdateNodePosition();//更新游戏的Content  
    }    
    public GetPosition():{x:number,y:number} {
        return this.mCollider.GetPosition();
    }    
 
    public SetRoate(radian:number):void { 
        this.mCollider.SetRotation(radian);
        this.UpdateNodeRotate();//更新游戏的Content  
    }     
 
    public SetColliderActiveEvent(openCollision:boolean,openConcat:boolean):void{ 
        this.mCollider.SetColliderActiveEvent( openCollision,openConcat);
    }
 
    public SetCollidersGroup(bits:number):void{  
        this.mCollider.SetCollidersGroup(bits);
    }  
     
    //更新Collider的位置
    public UpdateNodeContent():void{ 
        let width:number = this.Config.Shape == ePrefabType.Ball ? this.Config.Redius:this.Config.Size.Width;
        let height:number = this.Config.Shape == ePrefabType.Ball ? this.Config.Redius:this.Config.Size.Height;
        this.mNode.getComponent(UITransform).setContentSize(width * GPhysicsScalingFactor * 2,height * GPhysicsScalingFactor * 2);
    }

    //更新Collider的位置
    public UpdateNodePosition():void{   
        let translation:Vec2 = this.mCollider.GetPosition();
        this.mNode.setPosition(translation.x * GPhysicsScalingFactor,translation.y * GPhysicsScalingFactor);
    }
    
    //更新Collider的旋转
    public UpdateNodeRotate():void{  
        let rotation:number = this.mCollider.GetRotation();//获取到RigidBody的旋转
        this.mNode.setRotationFromEuler(0,0,math.toDegree(rotation)); 
    } 

    //开始碰撞回调
    public OnStartConcatCollider(playerBase:ColliderBase):void{  
    }
    //结束碰撞回调 
    public OnLeaveConcatCollider(playerBase:ColliderBase):void{
    } 
    //同步时间信息
    public Update(dt:number):void{ 
    }

    //销毁自己
    public DestorySelf():void{
    }

    //获取到自己所接触到的所有
    public GetAllContainCollider(world:Physics.World):Array<PhysicsCompBase>{
        //尝试生成一个形状
        world.intersectionsWithShape(this.GetPosition(),0,)
        return undefined;
    }
}    