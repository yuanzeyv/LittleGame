// import { XianTuDataMgr } from "../../../../DataMgrReg";
// import { eFinalAttrType } from "../../Define/AttrType";
// import { MoveCompBase } from "./MoveCompBase";

// //通过拟人的想法，发现人移动的话，并非是按照方向移动的，而是按照目的地移动的。 

// //线速度控制模块，使用此模块后 ，玩家的行进将会由线速度控制
// export class LinearVelocityControl extends MoveCompBase{  
//     private mIsReachEnd:boolean = true;//判断是否到达了终点
//     private mMoveDir:cc.Vec2 = new cc.Vec2(0,0); //玩家移动前的点位 
//     private mMoveToPoint:cc.Vec2 = new cc.Vec2(0,0); //设置玩家的移动方向 
//     //当前玩家碰撞到的碰撞器信息  
//     public OnStart(){ 
//         super.OnStart();
//         this.SetColliderActiveEvent(false,false);
//         this.SetCollidersGroup(0x00000000);
//         this.mMoveToPoint = this.Player.RigidBody.Position;//獲取到移動角色
//     }  
//     //设置玩家要移动到的终点位置
//     public SetEndPoint(pos:cc.Vec2){
//         this.mIsReachEnd = false;
//         this.mMoveToPoint = pos;
//         if( !this.mMoveToPoint.equals(this.mPlayer.RigidBody.GetPosition()) )
//             this.mMoveDir = this.mMoveToPoint.sub(this.mPlayer.RigidBody.GetPosition()) ; 
//         this.Move();//设置线速度
//     }  

//     private Move(){
//         if(this.mIsReachEnd) 
//             return;
//         let moveDir:cc.Vec2 = new cc.Vec2(this.mMoveToPoint.x - this.Position.x,this.mMoveToPoint.y - this.Position.y);//直接判断玩家移动到目的地需要多久
//         let moveLengthSqr:number = moveDir.lengthSqr();//获取到移动距离
//         if(moveLengthSqr <= 0.001){ 
//             this.mIsReachEnd = true;
//             this.Player.RigidBody.SetLinVel(new cc.Vec2(0,0));   
//             this.Player.ListenPlayerMoveToTargetPoint();//执行监听到达目的地的回调函数
//             return;  
//         }
//         let moveLength:number = Math.sqrt(moveLengthSqr);
//         let normalVec:cc.Vec2 = moveDir.divSelf(moveLength);
//         //获取到玩家的当前速度
//         let moveSpeed:number = this.Player.GetFinalAttr(eFinalAttrType.MoveSpeed);  
//         let frameSpeed = XianTuDataMgr.PhysicsProxy.FrameTime * moveSpeed; //获取到玩家每帧可以移动的距离
//         //如果当前已经非常的接近终点了
//         if( frameSpeed> moveLength)
//             moveSpeed = moveLength / XianTuDataMgr.PhysicsProxy.FrameTime;//设置新的移动速度 
//         this.Player.RigidBody.SetLinVel(normalVec.mulSelf(moveSpeed));  
//     }
//   s
//     public Update(dt: number): void {  
//         this.Move(); 
//     } 
    
//     //嘗試獲取到當前角色的朝向
//     public GetMoveDir():cc.Vec2{
//         return this.mMoveDir;
//     }
// } 