import { Vec2 } from "cc";
import { PhysicsCompBase } from "../../PhysicsCompBase";
import { _Facade } from "../../../../../../Global";
import { OnlyTheBraveProxy } from "../../../OnlyTheBraveProxy";
import { eFinalAttrType } from "../../../Attr/AttrType";
import { PhysicsObejct } from "../../../PlayerObject/PhysicsType/PhysicsObejct";
import { AttrObj } from "../../../Attr/AttrObj";
import { AttrObjectFacade } from "../../../Attr/AttrObjectFacade";

//线速度控制模块，使用此模块后 ，玩家的行进将会由线速度控制
export class LinearVelocityControl extends PhysicsCompBase{  
    private mIsReachEnd:boolean = true;//判断是否到达了终点 
    private mMoveToPoint:Vec2 = new Vec2(0,0); //设置玩家的移动方向  
    private mSpeedScale:number = 1; //设置玩家的移动方向  
    //当前玩家碰撞到的碰撞器信息  
    public OnInit(){ 
        this.SetColliderActiveEvent(false,false); 
        this.SetCollidersGroup(0);
        this.mMoveToPoint = this.Player.RigidBody.GetPosition();//獲取到移動角色
    }  
    //设置玩家要移动到的终点位置
    public SetEndPoint(pos:Vec2,forceScale:number){ 
        this.mIsReachEnd = false;//设置角色开始寻路
        this.mMoveToPoint = pos;//设置移动终点位置
        this.mSpeedScale = forceScale;//设置力的缩放
        this.Move();//设置线速度
    }  

    private Move(){
        if(this.mIsReachEnd)//已经
            return;
        let moveDir:Vec2 = new Vec2(this.mMoveToPoint.x - this.Position.x,this.mMoveToPoint.y - this.Position.y);//直接判断玩家移动到目的地需要多久
        let moveLengthSqr:number = moveDir.lengthSqr();//获取到移动距离
        if(moveLengthSqr <= 0.001){//无限接近终点时
            this.mIsReachEnd = true;//停止接下来的动作
            this.Player.RigidBody.SetLinVel(new Vec2(0,0));   
            return;  
        }
        let moveLength:number = Math.sqrt(moveLengthSqr);//开方，来确定当前的剩余距离
        let normalVec:Vec2 = moveDir.divide2f(moveLength,moveLength);//取得方向向量
        let moveSpeed:number = this.Player.AttrRefObj.Data.GetFinalAttr(eFinalAttrType.MoveSpeed);//当前的移速是一秒 5 米
        let frameSpeed = _Facade.FindProxy(OnlyTheBraveProxy).FrameTime * moveSpeed * this.mSpeedScale; //获取到玩家每帧可以移动的距离
        //如果当前已经非常的接近终点了
        if( frameSpeed > moveLength)
            moveSpeed = moveLength / _Facade.FindProxy(OnlyTheBraveProxy).FrameTime;//设置新的移动速度,以让下一帧一定到达终点
        this.Player.RigidBody.SetLinVel(normalVec.multiplyScalar(moveSpeed));  
    }
    
    public Update(dt: number): void {  
        this.Move(); 
    }  
} 