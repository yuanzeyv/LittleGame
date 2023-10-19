import { Vec2 ,Node} from "cc";
import { Vec3 } from "cc";
import { sp } from "cc";
import { Skeleton } from "cc";
import { find } from "cc";
import { BoxCollider2D } from "cc";
import { RigidBody2D } from "cc";
import { _Facade } from "../../../../Global";
import { FishMainProxy } from "../FishMainProxy";
import { eAttrType, BiologyAttrProxy, eAttrAddtionType } from "../../BiologyAttrProxy/BiologyAttrProxy";
import { eSatietyStatus } from "../../BiologySatietyProxy/BiologySatietyProxy";
import { ActionStateMatchine, eBiologyState } from "./ActionStateMatchine";
import { AnimationStateMatchine, eBiologyAction } from "./AnimationStateMatchine";
export enum eBiologyDir{
    LEFT,
    RIGHT,
    FINAL,//用于随即计算
};
//本类用来描述一个生命
export abstract class Biology{
    protected mName:string;//生物名称
    protected mFishUID:number;//小鱼的游戏ID
    protected mFishNode:Node;//小鱼节点信息
    protected mFishSpine:sp.Skeleton;//小鱼节点信息
    private mAinimalStateMatching:AnimationStateMatchine | undefined;//生物的动画状态
    protected mActionStateMatching:ActionStateMatchine | undefined;//生物的行为状态
 
    protected mFaceDir:eBiologyDir = eBiologyDir.LEFT;//小鱼的朝向
    protected mMoveVector:Vec2 = new Vec2(0,0);//小鱼的移动方向方向状态 
   
    //小鱼移动状态
    protected mEndPoint:Vec2 = new Vec2(0,0);//小鱼的移动点位
  
    public constructor(fishID:number,fishNode:Node){
        this.mFishUID = fishID;
        this.mFishNode = fishNode;
        this.mFishSpine = find("Spine",fishNode).getComponent(sp.Skeleton); 
    }
    
    //设置UUID
    public set UUID(uuid:number) { this.mFishUID = uuid; }
    public get UUID():number { return this.mFishUID; }
    //获取到结束坐标
    public set EndPoint(point:Vec2) { this.mEndPoint.set(point)}
    public get EndPoint():Vec2 { return this.mEndPoint.clone(); }
    //获取到结束坐标 
    public get Rigebody():RigidBody2D { return this.mFishNode.getComponent(RigidBody2D); }
    //获取到一个对应的动作状态机
    protected abstract ObtainAinimationState(biologyAction:eBiologyAction):AnimationStateMatchine;
    //获取到一个对应的生物状态状态机
    protected abstract ObtainActionState(biologyState:eBiologyState):ActionStateMatchine;
    //设置生物的动画状态机
    public ChangeAinimalStateMatching(biologyAction:eBiologyAction){ 
        this.mAinimalStateMatching?.OnExit(this);//播放退出动画
        this.mAinimalStateMatching = this.ObtainAinimationState(biologyAction);
        this.mAinimalStateMatching?.OnEnter(this);//播放退出动画
    }
    //设置生物的动画状态机
    public ChangeStateStateMatching(biologyState:eBiologyState){
        this.mActionStateMatching?.OnExit(this);//播放退出动画
        this.mActionStateMatching = this.ObtainActionState(biologyState);//获取到对应的状态
        this.mActionStateMatching?.OnEnter(this);//播放退出动画
    }
    //小鱼饥饿状态改变
    public HungerStatusChange(status:eSatietyStatus){
        this.mActionStateMatching.ChangeHungerStatus(this,status);
    }

    //设置生物坐标 
    public GetPosition():Readonly<Vec2>{
        let pos:Vec3 = this.mFishNode.getPosition();
        return new Vec2(pos.x,pos.y);
    }
    public SetPosition(x:number,y:number):void{
        this.mFishNode.setPosition(x,y,0);
    }
    //设置角色朝向
    public GetFaceDir():eBiologyDir{
        return this.mFaceDir;
    }
    public SetFaceDir(dir:eBiologyDir):void{
        this.mFaceDir = dir;
    }

    //设置移动总店
    public SetEndPoint(x:number,y:number):void{
        this.mEndPoint.set(x,y);
    }
    public GetEndPoint():Readonly<Vec2>{
        return this.mEndPoint;
    }
    
    //小鱼更新函数
    public Update(dt:number):void{
        this.mActionStateMatching.Update(this);
    } 
    
    //获取到角色的spine动画
    public GetSpine():sp.Skeleton{
        return this.mFishSpine; 
    }

    //获取到小鱼距离终点的距离
    public GetResidueDistance():number{
        let nowPos:Vec2 = this.GetPosition();
        nowPos.subtract(this.mEndPoint);
        return nowPos.length();
    } 
}; 