import { Vec2 } from "cc"; 
import { ColliderBase } from "../../../../Util/Physics/ColliderBase";
import { IRelevanceRigidBodyOBJ, IRelevanceColliderOBJ, eRigidType } from "../../../../Util/Physics/PhysicsDefine";
import { RigidBodies } from "../../../../Util/Physics/RigidBodies";
import { PhysicsWrold } from "../../../../Util/Physics/World";
import { eColliderCompType, eColliderDetectionBody } from "../../../Proxy/PhysicsProxy/Define/ColliderConst";
import Physics from "@dimforge/rapier2d-compat"; 
import { PhysicsCompBase } from "./PhysicsCompBase";
import { ShapeCompBaseFactory } from "./PhysicsColliderComp/ShapeCompBaseFactory"; 
import { _Facade } from "../../../../Global"; 
import { ePlayerType, eVisualFieldDetectionType } from "./ColliderTypeDefine";
import { AttrObj } from "../Attr/AttrObj";
import { Object } from "../PlayerObject/Object";
import { AttrObjectFacade } from "../Attr/AttrObjectFacade";
import { GameRefObject } from "../GameObjectPool/GameRefObject"; 
export class PlayerBase implements IRelevanceRigidBodyOBJ{   
    protected mAttrRefObj:GameRefObject<AttrObjectFacade>;
    public get AttrRefObj():GameRefObject<AttrObjectFacade>{ return this.mAttrRefObj; }
    public set AttrRefObj(gameRefObj:GameRefObject<AttrObjectFacade>){ this.mAttrRefObj = gameRefObj; }
    //记录玩家对应的物理世界
    private mPhysicsWorld:PhysicsWrold;//抽象物理世界
    public get World():PhysicsWrold{ return this.mPhysicsWorld; }   
    /*物理刚体z
    */
    private mRigidBody:RigidBodies;//物理刚体
    public get RigidBody():RigidBodies{ return this.mRigidBody; }
    public get ID():number{ return this.mRigidBody.ID; } 
    /*
    *如果玩家没有继承PlayerBase，那么PlayerBase将抛出更多的方法来满足以组件的形式调用
    */
    private mUpdateHandle:(dt:number)=>void|undefined;
    private mDetectionPlayerBaseEnterHandle:(playerBase:PlayerBase,detectionType:eVisualFieldDetectionType)=>void|undefined;
    private mDetectionPlayerBaseLeaveHandle:(playerBase:PlayerBase,detectionType:eVisualFieldDetectionType)=>void|undefined;
    public SetUpdateHandle(handle:(dt:number)=>void){
        this.mUpdateHandle = handle;
    }
    public SetDetectionPlayerBaseEnterHandle(handle:(playerBase:PlayerBase,detectionType:eVisualFieldDetectionType)=>void){
        this.mDetectionPlayerBaseEnterHandle = handle;
    }
    public SetDetectionPlayerBaseLeaveHandle(handle:(playerBase:PlayerBase,detectionType:eVisualFieldDetectionType)=>void){
        this.mDetectionPlayerBaseLeaveHandle = handle;
    }
    /*身体碰撞器
    */
    protected mBodyCollider:PhysicsCompBase;//身体碰撞器，每个对象都应该拥有一个，用以与不同的单位进行交互 
    public get BodyCollider():PhysicsCompBase{ return this.mBodyCollider; }   
    public constructor(physicsWorld:PhysicsWrold,rigidType:eRigidType,bodyID:number = -1,detectCollider:Array<number> = new Array<number>()){
        this.mPhysicsWorld = physicsWorld;//游戏中的物理世界
        this.mRigidBody = this.mPhysicsWorld.CreateRigidBody(rigidType,this);//游戏刚体 
        if(bodyID != 0)
            this.mBodyCollider = ShapeCompBaseFactory.Inst.GenerateShapeCompBase(bodyID,this);//获取身体碰撞器
        for(let colliderID of detectCollider)
            ShapeCompBaseFactory.Inst.GenerateShapeCompBase(colliderID,this);
        this.OnCreate();
    }  

    //当刚体被添加完成的时候
    public InitComplete(){}
  
    //初始化球体碰撞器
    public GenerateBallCollider(redius:number,relevanceColliderOBJ: IRelevanceColliderOBJ):ColliderBase{   
        return this.mRigidBody.CreateBallCollider(redius,relevanceColliderOBJ);
    }   
     
    //初始方形碰撞器
    public GenerateCubuCollider(width:number,height:number,relevanceColliderOBJ: IRelevanceColliderOBJ):ColliderBase{  
        return this.mRigidBody.CreateCubuCollider(width,height,relevanceColliderOBJ);
    }  

    //设置是否开启对象信息
    protected SetRigidBodyType(type: Physics.RigidBodyType):void{ 
        this.mRigidBody.SetRigidBodyType(type,true)
    } 

    //更新刚体位置信息 
    public SetPosition(x:number,y:number):void{
        this.mRigidBody.SetPosition(new Vec2(x,y),true);//重新设置刚体的位置  
    } 

    public GetPosition():Vec2{
        return this.mRigidBody.GetPosition();
    }

    //更新刚体位置信息 
    public SetRotate(degree:number):void{
        this.mRigidBody.SetRotate(degree,true);//重新设置刚体的位置  
    }  
    public GetRotate():number{
        return this.mRigidBody.RotateDegree;//重新设置刚体的位置  
    }  

    //获取到玩家的某个碰撞器
    public GetPlayerCollider(id:number):PhysicsCompBase{
        return this.mRigidBody.GetCollider(id).GetRelevanceObj() as PhysicsCompBase;
    }
 

    //通过主类型 子类型 查询到一个玩家身体上的刚体信息 
    public GetColliderByType(type:ePlayerType,subType:number):PhysicsCompBase{
        //循环遍历玩家身上的所有刚体
        for(let collider of this.RigidBody.GetColliders()){
            let playerComp:PhysicsCompBase = (collider[1].GetRelevanceObj() as PhysicsCompBase);
            if(!(playerComp.Config.Type == type && playerComp.Config.SubType == subType)) 
                continue;
            return playerComp; 
        } 
    }
  
    /* 
    *针对范围检测器给到的进入信息
    */
    public DetectionPlayerBaseEnter(playerBase:PlayerBase,detectionType:eVisualFieldDetectionType){
        if(this.mDetectionPlayerBaseEnterHandle != undefined)
            this.mDetectionPlayerBaseEnterHandle(playerBase,detectionType); 
    }
    public DetectionPlayerBaseLeave(playerBase:PlayerBase,detectionType:eVisualFieldDetectionType){
        if(this.mDetectionPlayerBaseLeaveHandle != undefined)
            this.mDetectionPlayerBaseLeaveHandle(playerBase,detectionType); 
    }
 
    //清理子节点
    public Clear(){  
        this.World.ExecuteDestoryByRigidID(this.ID);
    }  

    /*
    *针对物理世界抽象出来的回调方法
    */
    public Update(dt:number):void{ 
        if(this.mUpdateHandle != undefined)
            this.mUpdateHandle(dt);
    }
    public OnCreate(): void {  
    }
    //尝试销毁自己
    public DestorySelf(){  
    }   
  
    //角色因为意外的情况，无法调用正常的离开流程是，从这儿走
    public ForceLeaveCollider(){ 
        for(let cell of this.RigidBody.GetColliders()){
            let physicsCompBase:PhysicsCompBase = (cell[1].GetRelevanceObj() as PhysicsCompBase)
            if(!(physicsCompBase instanceof PhysicsCompBase))
                continue; 
            let contactArray:PhysicsCompBase[] = physicsCompBase.GetAllContainCollider();
            for( let collider of contactArray){
                collider.OnLeaveConcatCollider(cell[1]); 
                cell[1].OnLeaveConcatCollider(collider.Colider);
            } 
        }   
    }

    public Destory(){
        this.mPhysicsWorld.RemoveRigidBody(this.ID);
    }
}   