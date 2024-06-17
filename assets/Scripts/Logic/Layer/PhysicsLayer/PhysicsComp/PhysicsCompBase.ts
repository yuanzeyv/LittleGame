import { Node, UITransform, instantiate, math } from "cc";
import  Physics from '@dimforge/rapier2d-compat';
import { PlayerBase } from "../Player/PlayerBase";
import { PhysicsProxy, ePrefabType } from "../../../Proxy/PhysicsProxy/PhysicsProxy";
import { _Facade } from "../../../../Global";
import { GPhysicsScalingFactor } from "../../../Proxy/PhysicsProxy/Define/Physics";
import { Cfg_PhysicsCollider, IPhysicsColliderStruct } from "../../../../Config/Cfg_PhysicsCollider";
import Decimal from "decimal.js";
 
export class PhysicsCompBase{
    protected mPlayer:PlayerBase//包含玩家的所有数据信息 
    protected mColliderConfig:IPhysicsColliderStruct//当前的物理组件，所指向的玩家的信息
    protected mCollider:Physics.Collider;//每一个形状对应一个碰撞器
    protected mNode:Node;//每一个形状对应着一个游戏节点，这个节点是需要用来展示 
    public get Player():PlayerBase{ return this.mPlayer; }
    public get Config():IPhysicsColliderStruct{ return this.mColliderConfig; }
    public get Node():Node{ return this.mNode;}
    public get ID():number{ return this.mCollider.handle; }//获取到组件的唯一ID

    public constructor(playerBase:PlayerBase,colliderCon:IPhysicsColliderStruct){ 
        this.mPlayer = playerBase;
        this.mColliderConfig = colliderCon;
    }
    //第一次进入时，调用进行数据的 
    public OnEnter(){
        this.mCollider = this.GenerateCollider();//生成一个Collider
        this.mNode = this.GenerateNode();
        this.InitColliderContentSize();//初始化碰撞器的大小
        this.InitColliderPosition();//初始化碰撞器的位置
        this.InitColliderRotate();//初始化碰撞器的旋转
    }

    //第一次退出时，调用进行数据的清理
    public OnExit(){
    } 
    //启用组件时，调用本方法
    public OnStart(){
    }
    //停用组件时，调用本方法
    public OnDisable(){
    }
    
    protected GenerateCollider():Physics.Collider{
        return this.Player.World.createCollider(this.Config.Shape == ePrefabType.Ball?Physics.ColliderDesc.ball(0):Physics.ColliderDesc.cuboid(0,0),this.mPlayer.RigidBody);
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
        if(this.Config.Shape == ePrefabType.Cube)
           this.mCollider.setHalfExtents({x:width,y:height});  
        else      
            this.mCollider.setRadius(width); 
        this.UpdateNodeContent();//更新游戏的Content 
    }    

    public SetPosition(x:number,y:number):void {
        this.mCollider.setTranslation({x:x,y:y});
        this.UpdateNodePosition();//更新游戏的Content 
    }    
 
    public SetRoate(radian:number):void { 
        this.mCollider.setRotation(radian);
        this.UpdateNodeRotate();//更新游戏的Content 
    }    
 
    
    public SetColliderActiveEvent(openCollision:boolean,openConcat:boolean):void{ 
        this.mCollider.setActiveEvents( (openCollision?Physics.ActiveEvents.COLLISION_EVENTS:Physics.ActiveEvents.NONE) |  (openConcat?Physics.ActiveEvents.CONTACT_FORCE_EVENTS:Physics.ActiveEvents.NONE));
    }
 
    public SetCollidersGroup(bits:number):void{  
        this.mCollider.setCollisionGroups(bits);
    }  

    //protected SetColliderSlovesGroup(bits:number):void{ 
    //    this.mCollider.setSolverGroups(bits);
    //} 
     
    //更新Collider的位置
    public UpdateNodeContent():void{ 
        let width:number = this.Config.Shape == ePrefabType.Ball ? this.Config.Redius:this.Config.Size.Width;
        let height:number = this.Config.Shape == ePrefabType.Ball ? this.Config.Redius:this.Config.Size.Height;
        this.mNode.getComponent(UITransform).setContentSize(width * GPhysicsScalingFactor * 2,height * GPhysicsScalingFactor * 2);
    }

    //更新Collider的位置
    public UpdateNodePosition():void{  
        let translation:Physics.Vector = this.mCollider.translation();
        this.mNode.setPosition(translation.x * GPhysicsScalingFactor,translation.y * GPhysicsScalingFactor);
    }
    
    //更新Collider的旋转
    public UpdateNodeRotate():void{  
        let rotation:number = this.mCollider.rotation();//获取到RigidBody的旋转
        this.mNode.setRotationFromEuler(0,0,math.toDegree(rotation)); 
    } 

    //开始碰撞回调
    public OnStartCollider(physicsCompBase:PhysicsCompBase,playerBase:PlayerBase):void{  
        //console.log(`开始碰撞: ${this.mName} -> ${playerBase.mName} 造成了 ${this.mAttrObj.GetFinalAttr(eFinalAttrType.PhysicalAttack)}`);
    }
    //结束碰撞回调 
    public OnLeaveCollider(physicsCompBase:PhysicsCompBase,playerBase:PlayerBase):void{
        //console.log(`终止碰撞: ${this.mName} -> ${playerBase.mName}`);
    }

    
    //同步时间信息
    public Update(dt:number):void{ 
    }
}  