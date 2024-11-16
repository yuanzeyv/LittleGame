// import { cfg } from "../../../../cfg/ConfigBaseCfgInfo";
// import { GlobalMgr } from "../../../../controller/GlobalMgr";
// import { EventNotify } from "../../../../event/EventNotify"; 
// import { ePrefabType } from "../Define/PhysicsConst";
// import { IRelevanceColliderOBJ, ColliderBase } from "../Physics/ColliderBase";
// import { PlayerBase } from "../PhysicsRigidBody/PlayerBase";
// export class  PhysicsCompBase implements IRelevanceColliderOBJ{ 
//     protected mColliderConfig:cfg.NightmarePhysicsColliderCfgInfo//当前的物理组件，所指向的玩家的信息

//     protected mPlayer:PlayerBase//玩家数据信息 
    
//     protected mCollider:ColliderBase;//每一个形状对应一个碰撞器
//     public get Player():PlayerBase{ return this.mPlayer; }
//     public get Config():cfg.NightmarePhysicsColliderCfgInfo{ return this.mColliderConfig; }
//     public get ID():number{ return this.mCollider.ID; }//获取到组件的唯一ID   
//     public get Position():cc.Vec2 { return this.mCollider.Position; }    
//     public get Rotation():number { return this.mCollider.Rotation; }    
//     public get Colider():ColliderBase{ return this.mCollider; }//获取到组件的唯一ID
//     public get Name():string { return this.Config.name;}
//     public constructor(playerBase:PlayerBase,colliderCon:cfg.NightmarePhysicsColliderCfgInfo){ 
//         this.mPlayer = playerBase; 
//         this.mColliderConfig = colliderCon;
//     } 

//     //第一次进入时，调用进行数据的 
//     public OnInit(){ 
//         this.mCollider = this.GenerateCollider();//生成一个Collider 
//         this.InitColliderContentSize();//初始化碰撞器的大小 
//         this.InitColliderPosition();//初始化碰撞器的位置
//         this.InitColliderRotate();//初始化碰撞器的旋转 
//     } 
//     public get Shape():ePrefabType{
//         return this.Config.shape;
//     } 
//     public get Width():ePrefabType{
//         return GlobalMgr.ParseArray(this.Config.size,"_")[0];
//     }
//     public get Redius():number{
//         return Number(this.Config.redius);
//     } 
//     public get Height():ePrefabType{
//         return GlobalMgr.ParseArray(this.Config.size,"_")[1];
//     }
//     //生成一个碰撞器
//     protected GenerateCollider():ColliderBase{ 
//         if(this.Shape == ePrefabType.Ball) 
//             return this.mPlayer.GenerateBallCollider(0,this);
//         else if(this.Shape == ePrefabType.Cube)
//             return this.mPlayer.GenerateCubuCollider(0,0,this);
//     } 

//     protected InitColliderContentSize():void{   
//         let width:number = this.Shape == ePrefabType.Ball ? this.Redius:this.Width;
//         let height:number = this.Shape == ePrefabType.Ball ? this.Redius:this.Height;
//         this.SetContentSize(width,height);  
//     }

//     protected InitColliderPosition():void{   
//         //this.SetRotationWrtParent();
//     }

    
    
//     protected InitColliderRotate():void{      
//         this.SetRoate(( 0  * Math.PI / 180));//设置旋转默认为0度 
//     }

//     //设置刚体的尺寸 单位为 米  
//     public SetContentSize(width:number,height:number):void {
//         this.mCollider.SetContent(width,height); 
//     }     
     
//     public SetRoate(radian:number):void { 
//         this.mCollider.Rotation = radian; 
//     }      
    
    
//     //设置节点信息
//     public SetPosition(x:number,y:number):void { 
//         this.mCollider.Position = new cc.Vec2(x,y); 
//     }    

//     //启用组件时，调用本方法 
//     public OnStart(){} 
    
//     //停用组件时，调用本方法
//     public OnDisable(){}
    
//     //同步时间信息
//     public Update(dt:number):void{}

//     //设置监听碰撞事件
//     public SetColliderActiveEvent(openCollision:boolean,openConcat:boolean):void{ 
//         this.mCollider.SetColliderActiveEvent( openCollision,openConcat);
//     }
 
//     //设置碰撞组
//     public SetCollidersGroup(bits:number):void{  
//         this.mCollider.SetCollidersGroup(bits);
//     } 
//     public GetCollidersGroup():number{  
//         return this.mCollider.GetCollidersGroup();
//     }  
     
//     /*
//     *碰撞器函数
//     */
//     //开始碰撞回调   
//     public OnStartConcatCollider(playerBase:ColliderBase):void{} 
//     //结束碰撞回调  
//     public OnLeaveConcatCollider(playerBase:ColliderBase):void{}  
//     //销毁自己
//     public DestorySelf():void{
//         this.OnDisable(); 
//         TitanCCC.EventMgr.trigger(EventNotify.DelPhysicsCollider,this); 
//     }
// }      