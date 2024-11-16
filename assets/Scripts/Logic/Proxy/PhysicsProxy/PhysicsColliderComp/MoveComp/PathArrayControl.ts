// import { XianTuDataMgr } from "../../../../DataMgrReg";
// import { eFinalAttrType } from "../../Define/AttrType"; ``
// import { PhysicsProxy } from "../../PhysicsProxy";
// import { GetPosByGridPos } from "../../Tool/Util";   
// import { MoveCompBase } from "./MoveCompBase";

// //线速度控制模块，使用此模块后 ，玩家的行进将会由线速度控制
//  export class PathArrayControl extends MoveCompBase{   
//     private mMoveToPoint:cc.Vec2 = new cc.Vec2(0,0); //设置玩家的移动方向 
//     private mIsReachEnd:boolean = false;//判断是否到达了终点 

//     private mPathArray:Array<cc.Vec2> = new Array<cc.Vec2> ();//路径信息
//     private mMoveDir:cc.Vec2 = new cc.Vec2(0,0); //玩家移动前的点位 
    
//     //当前玩家碰撞到的碰撞器信息  
//     public OnStart(){ 
//         super.OnStart();
//         this.mMoveToPoint.set(this.Player.RigidBody.Position);
//     }   

//     public SetPathStack(array:number[][]){
//         this.mIsReachEnd = false;
//         this.mPathArray.splice(0);//弹出第一个，第一个是自己当前的位置，不需要进行移动 
//         let physicsProxy:PhysicsProxy = XianTuDataMgr.PhysicsProxy;
//         for(let i = array.length - 1 ; i >= 0 ; i--)//压入所有的目标点位信息
//             this.mPathArray.push(GetPosByGridPos(array[i][0],array[i][1],physicsProxy.PFGridWidth,physicsProxy.PFGridHeight)); 
//         this.mPathArray.pop();
//         this.TakeOutEndPoint();
//     }
    
//     private TakeOutEndPoint():void{
//         this.mMoveToPoint = this.mPathArray.pop(); 
//         this.mMoveDir = this.mMoveToPoint.sub(this.mPlayer.RigidBody.GetPosition()) ; 
//     }

//     //嘗試獲取到當前角色的朝向
//     public GetMoveDir():cc.Vec2{  
//         return this.mMoveDir; 
//     }

//     public Update(dt: number): void {    
//         let moveDir:cc.Vec2 = new cc.Vec2(this.mMoveToPoint.x - this.Position.x,this.mMoveToPoint.y - this.Position.y);//直接判断玩家移动到目的地需要多久
//         let moveLengthSqr:number = moveDir.lengthSqr();//判断移动距离信息
//         if(moveLengthSqr <= 0.01 &&  this.mPathArray.length != 0){
//             this.TakeOutEndPoint(); 
//             moveDir.x = this.mMoveToPoint.x - this.Position.x; 
//             moveDir.y = this.mMoveToPoint.y - this.Position.y;//直接判断玩家移动到目的地需要多久
//             moveLengthSqr = moveDir.lengthSqr();
//         } else if(  moveLengthSqr <= 0.01 && this.mPathArray.length == 0 ){
//             if(!this.mIsReachEnd){
//                 this.mIsReachEnd =true;
//                 this.Player.RigidBody.SetLinVel(new cc.Vec2(0,0));  
//                 this.Player.ListenPlayerMoveToTargetPoint();//执行监听到达目的地的回调函数
//             }
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

//     //判断是否到达了终点 
//     public IsReachEnd():boolean{
//         return this.mIsReachEnd; 
//     }
// }        