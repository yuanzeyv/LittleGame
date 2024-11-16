import { Vec2, Vec3 } from "cc";
import { ColliderBase } from "../../../../Util/Physics/ColliderBase";
import { IRelevanceColliderOBJ } from "../../../../Util/Physics/PhysicsDefine";
import { RigidBodies } from "../../../../Util/Physics/RigidBodies";
import { ePrefabType } from "../../../Proxy/PhysicsProxy/Define/PhysicsConst";
import { PlayerBase } from "./PlayerBase";
import { IOnlyTheBravePhysicsColliderStruct } from "../../../../Config/Cfg_OnlyTheBravePhysicsCollider";
import Physics from "@dimforge/rapier2d-compat"; 
export class  PhysicsCompBase implements IRelevanceColliderOBJ{ 
    /*
    *形状关联的刚体信息
    */
    protected mPlayer:PlayerBase;
    public get Player():PlayerBase{ return this.mPlayer; }
    /*
    *当前的碰撞器信息
    */
    protected mCollider:ColliderBase;//每一个形状对应一个碰撞器
    public get Colider():ColliderBase{ return this.mCollider; }//获取到组件的唯一ID
    public get ID():number{ return this.mCollider.GetColliderID(); }//获取到组件的唯一ID   
    public get Position():Vec2 { return this.mCollider.Position; }    
    public get PositionV3():Vec3 { return this.mCollider.PositionV3; }    
    public get Rotation():number { return this.mCollider.Rotation; }    
    /*
    *当前的表信息    
    */
    protected mColliderConfig:IOnlyTheBravePhysicsColliderStruct;//当前碰撞器对应的配置表信息
    public get Config():IOnlyTheBravePhysicsColliderStruct{ return this.mColliderConfig; }
    public get Name():string { return this.mColliderConfig.Name;}
    public get Shape():ePrefabType{ return this.mColliderConfig.Shape; } 
    public get Width():number{ return this.mColliderConfig.Size.Width; }
    public get Height():number{ return this.mColliderConfig.Size.Height; }
    public get Redius():number{ return this.Config.Redius; } 

    public constructor(playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct){ 
        this.mPlayer = playerBase; 
        this.mColliderConfig = colliderCon;
        /*创建一个碰撞器*/
        this.mCollider = this.InitPhysicsCollider();//立即生成一个碰撞器 
        this.InitColliderContentSize();//初始化碰撞器的大小 
        this.InitColliderPosition();//初始化碰撞器的位置
        this.InitColliderRotate();//初始化碰撞器的旋转 
    } 

    //生成一个碰撞器
    protected InitPhysicsCollider():ColliderBase{ 
        if(this.Shape == ePrefabType.Ball) 
            return this.mPlayer.GenerateBallCollider(this.Redius,this);
        else if(this.Shape == ePrefabType.Cube)
            return this.mPlayer.GenerateCubuCollider(this.Width,this.Height,this);
    }

    protected InitColliderContentSize():void{   
        //this.SetContentSize(width,height);   
    }

    protected InitColliderPosition():void{   
    }

    protected InitColliderRotate():void{      
        //this.SetRoate(( 0  * Math.PI / 180));
    }

    //设置刚体的尺寸 单位为 米  
    public SetContentSize(width:number,height:number):void {
        this.mCollider.SetContent(width,height); 
    }     
     
    public SetRoate(radian:number):void { 
        this.mCollider.Rotation = radian; 
    }      
    
    //设置节点信息
    public SetPosition(x:number,y:number):void { 
        this.mCollider.Position = new Vec2(x,y); 
    }    

    //启用组件时，调用本方法 
    public OnInit(){
    } 
    
    //停用组件时，调用本方法
    public OnRemove(){}
    
    //同步时间信息
    public Update(dt:number):void{
    }

    //设置监听碰撞事件
    public SetColliderActiveEvent(openCollision:boolean,openConcat:boolean):void{ 
        this.mCollider.SetColliderActiveEvent( openCollision,openConcat);
    }
 
    //设置碰撞组
    public SetCollidersGroup(bits:number):void{  
        this.mCollider.SetCollidersGroup(bits);
    } 
    public GetCollidersGroup():number{  
        return this.mCollider.GetCollidersGroup();
    }  
     
    //获取到所有接触的节点信息
    public GetAllContainCollider():Array<PhysicsCompBase>{
        let content:Vec2 = this.mCollider.ContentSize;//首先获取到节点的大小
        let shape:Physics.Shape = this.mCollider.Shape == Physics.ShapeType.Ball ? new Physics.Ball(content.x + 0.01) : new Physics.Cuboid(this.mCollider.ContentSize.x + 0.01,this.mCollider.ContentSize.y + 0.01);
        let colliders:Array<PhysicsCompBase> = new Array<PhysicsCompBase>();
        this.Player.World.World.intersectionsWithShape(this.Position,0,shape,(collider:Physics.Collider)=>{
            let rigidBodies:RigidBodies = ((collider.parent().userData) as RigidBodies);//获取到碰撞到的刚体对象
            let colliderBase:ColliderBase = rigidBodies.GetCollider(collider.handle);
            colliders.push((colliderBase.GetRelevanceObj() as PhysicsCompBase));
            return true;
        },undefined,this.GetCollidersGroup(),undefined,this.Colider.GetPhysicsCollider().parent());
        return colliders;  
    }  
    /*
    *碰撞器函数
    */
    //开始碰撞回调   
    public OnStartConcatCollider(playerBase:ColliderBase):void{
        //this.Player.DetectionPlayerBaseEnter(playerBase.Parent.RelevanceObj as PlayerBase,undefined);
    } 
    
    //结束碰撞回调   
    public OnLeaveConcatCollider(playerBase:ColliderBase):void{
        //this.Player.DetectionPlayerBaseLeave(playerBase.Parent.RelevanceObj as PlayerBase,undefined);
    }  

    //销毁自己 
    public DestorySelf():void{
        this.OnRemove();  
        //发送删除刚体的事件信息
    }
}      