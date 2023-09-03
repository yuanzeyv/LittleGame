import { _decorator, Component } from 'cc';
import { BehaviorStatus } from '../../../../../../extensions/oreo-behavior-creator/runtime/main';
import { ChaetodonMinimusScripts } from '../../../Layer/FishMainGameLayer/ChaetodonMinimus/ChaetodonMinimusScripts';
import { Vec2 } from 'cc';
import { _Facade } from '../../../../Global';
import { FishMainProxy } from '../FishMainProxy';
import { Size } from 'cc';
import { Biology, GameInning } from '../FishGame';
const { ccclass, property } = _decorator;
//本类用于给小鱼的行为树脚本赋值
@ccclass('ChaetodonMinimus')
export class ChaetodonMinimus extends Component { 
    private mFishMainProxy:FishMainProxy;//小鱼总代理
    private mGameInning:GameInning;//游戏局部场景
    private mChaetodonScripts:ChaetodonMinimusScripts;//小鱼的执行脚本
    private mFishID:number;
    private mFishBiology:Biology;
    protected onLoad(): void {
        this.mChaetodonScripts = this.node.getComponent(ChaetodonMinimusScripts); 
        this.mFishMainProxy = _Facade.FindProxy(FishMainProxy);
        this.mGameInning = this.mFishMainProxy.GetGameInning();
        this.mFishID = this.mChaetodonScripts.FishID;
        this.mFishBiology = this.mGameInning.GetFish(this.mFishID);

    } 

    /*
    其他判断
    */
    public AlwaysSuccess():BehaviorStatus{
        return BehaviorStatus.Success;        
    } 
    public AlwaysFailure():BehaviorStatus{ 
        return BehaviorStatus.Failure;        
    }
    /*
    角色状态判断
    */
    //当前小鱼是否是新生鱼
    public IsNewFish():BehaviorStatus{
        return this.mFishBiology.IsNewFish ? BehaviorStatus.Success:BehaviorStatus.Failure; 
    }
    //角色是否拥有移动状态
    public IsOwnerMoveStatus():BehaviorStatus{
        return this.mFishBiology.IsOwnerMoveStatus ? BehaviorStatus.Success :BehaviorStatus.Failure ;
    }  
    //角色是否死亡
    public IsDie():BehaviorStatus{ 
        return BehaviorStatus.Failure;
    }    
    //是否是濒死状态
    public IsNearDeath():BehaviorStatus{
        return BehaviorStatus.Failure;
    } 
    //是否饥饿状态
    public IsHunger():BehaviorStatus{
        return BehaviorStatus.Failure;
    } 
 
    /*
    场景道具相关
    */
    public IsExistFood():BehaviorStatus{
        return BehaviorStatus.Failure;
    }
      


    //设置移动目的地(随机)
    public SetMovePosition():BehaviorStatus{
        let size:Size = this.mFishMainProxy.GetGameContentSize();//获取到当前游戏的窗口大小
        this.mFishBiology.SetMovePosition(new Vec2(Math.random() * size.x ,Math.random() * size.y),true);
        return BehaviorStatus.Success;
    }
 
    //角色移动函数 
    public FishMove():BehaviorStatus{
        let fishPos:Vec2 = this.mFishBiology.GetPosition();//获取到小鱼的坐标
        let movePos:Vec2 = this.mFishBiology.GetMovePosition();//获取到小鱼的移动方向
        let mass:number = this.mChaetodonScripts.RigidBody.getMass();//获取到小鱼的重量
        let isAccelearteStatus:boolean =this.mFishBiology.IsAccelerateMoveStatus;//获取到小鱼的速度
        movePos.subtract(fishPos ).normalize();//获取到小鱼移动的方向
        let speed:number = isAccelearteStatus? this.mFishMainProxy.GetFishSpeedUp():this.mFishMainProxy.GetFishSpeed();
        movePos.multiplyScalar(speed);//移动向量赋予速度
        movePos.subtract(this.mChaetodonScripts.RigidBody.linearVelocity);//减去方向向量
        movePos.multiplyScalar(mass);
        this.mChaetodonScripts.RigidBody.applyLinearImpulseToCenter(movePos ,true); 
        return BehaviorStatus.Success;
    } 

    //角色距离目标位置非常接近了
    public IsArrive():BehaviorStatus{
        let isArrive:boolean = this.mFishBiology.GetResidueDistance() <= 20;//方圆20像素的话，算是到达了终点
        return isArrive ? BehaviorStatus.Success:BehaviorStatus.Failure;
    }

    //刷新对象坐标
    public RefreshTargetPos():BehaviorStatus{
        if(this.mFishMainProxy.IsSetEndPoint(this.mChaetodonScripts.FishID))
            return BehaviorStatus.Success; 
        return BehaviorStatus.Success;
    }
    
    //刷新对象坐标
    public RefreshTargetDropPos():BehaviorStatus{
        if(this.mFishMainProxy.IsSetEndPoint(this.mChaetodonScripts.FishID))
            return BehaviorStatus.Success; 
        return BehaviorStatus.Success;
    }

    //设置角色不是第一次进入地图
    public DropStatusChange():BehaviorStatus{  
        this.mFishMainProxy.ChangeDropStatus(this.mChaetodonScripts.FishID,false);
        return BehaviorStatus.Success; 
    } 

    //移动到指定位置
    public SpwanForce(){
        let isArrive:boolean = this.mFishMainProxy.GetFishResidueDistance(this.mFishID) <= 20;//距离相聚仅剩5像素时 代表到达了终点
        let retStatus:BehaviorStatus = isArrive ? BehaviorStatus.Success:BehaviorStatus.Running;
        let mass:number = this.mChaetodonScripts.RigidBody.getMass();
        //获取小鱼移动方向
        let endVel:Vec2 = new Vec2(0,0);
        if(!isArrive){ 
            endVel.set(this.mFishMainProxy.GetFishMoveDir(this.mFishID));
            endVel.multiplyScalar(this.mFishMainProxy.GetFishSpeed());//移动向量赋予速度
        }
        endVel.subtract(this.mChaetodonScripts.RigidBody.linearVelocity);//减去方向向量
        endVel.multiplyScalar(mass);
        this.mChaetodonScripts.RigidBody.applyLinearImpulseToCenter(endVel ,true);
        return retStatus ; 
    } 
    /*
    移动位置计算区域
    */
    //设置新生鱼出生地（随机）
    public SetNewFishMovePosition():BehaviorStatus{
        let size:Size = this.mFishMainProxy.GetGameContentSize();//获取到当前游戏的窗口大小 
        this.mFishBiology.SetMovePosition(new Vec2(this.mFishMainProxy.GetFishPosition(this.mChaetodonScripts.FishID).x,(Math.random() * 80 )+ (size.y - 120)),true);
        return BehaviorStatus.Success;
    } 
    //死亡落点计算区域
    public SetDieDropPosition():BehaviorStatus{
        let size:Size = this.mFishMainProxy.GetGameContentSize();//获取到当前游戏的窗口大小 
        this.mFishBiology.SetMovePosition(new Vec2(this.mFishMainProxy.GetFishPosition(this.mChaetodonScripts.FishID).x,(Math.random() * 80 )+ (size.y - 120)),true);
        return BehaviorStatus.Success;
    } 
    //设置最近食物坐标
    public SetNearFoodPositon():BehaviorStatus{
        let size:Size = this.mFishMainProxy.GetGameContentSize();//获取到当前游戏的窗口大小 
        this.mFishBiology.SetMovePosition(new Vec2(this.mFishMainProxy.GetFishPosition(this.mChaetodonScripts.FishID).x,(Math.random() * 80 )+ (size.y - 120)),true);
        return BehaviorStatus.Success;
    } 
    //随机移动坐标点
    public SetRandomWalk():BehaviorStatus{
        let size:Size = this.mFishMainProxy.GetGameContentSize();//获取到当前游戏的窗口大小 
        this.mFishBiology.SetMovePosition(new Vec2(size.x * Math.random(),size.y * Math.random()),false);
        return BehaviorStatus.Success;
    } 
    
    //角色停止移动函数
    public FishStop():BehaviorStatus{ 
        let mass:number = this.mChaetodonScripts.RigidBody.getMass();//获取到小鱼的重量
        let endVel:Vec2 = new Vec2(0,0); 
        endVel.subtract(this.mChaetodonScripts.RigidBody.linearVelocity);//减去方向向量
        endVel.multiplyScalar(mass);
        this.mChaetodonScripts.RigidBody.applyLinearImpulseToCenter(endVel ,true); 
        this.mFishBiology.IsAccelerateMoveStatus = false;
        this.mFishBiology.IsOwnerMoveStatus = false;//清理移动状态
        this.mFishBiology.IsNewFish = false;//不再是一条新生鱼了
        return BehaviorStatus.Success;
    }
}