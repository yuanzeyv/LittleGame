import Decimal from "decimal.js";
import { AttrCalc } from "../../../Proxy/PhysicsProxy/AttrCalc/AttrCalc";
import { eBaseAttrType, eFinalAttrType } from "../../../Proxy/PhysicsProxy/Define/AttrType";
import  Physics from '@dimforge/rapier2d-compat';
import { _Facade, _G } from "../../../../Global";
import { PhysicsCompBase } from "../PhysicsComp/PhysicsCompBase";
import {     Node, math } from "cc";
import { GPhysicsScalingFactor } from "../../../Proxy/PhysicsProxy/Define/Physics";
import { ShapeCompBase } from "../PhysicsComp/BodyComp/ShapeCompBase"; 
import { Cfg_PhysicsPlayer, IPhysicsPlayerStruct } from "../../../../Config/Cfg_PhysicsPlayer";
import { RangeInjurySkillComp } from "../PhysicsComp/SkillSensorComp/RangeInjurySkillComp";
import { Cfg_PhysicsCollider } from "../../../../Config/Cfg_PhysicsCollider";
import { Cfg_SkillCollider } from "../../../../Config/Cfg_SkillCollider";
import { RigidBodies } from "../Physics/RigidBodies";
import { ColliderBase } from "../Physics/ColliderBase";
//本组件主要用以防止角色用的刚体
export class PlayerBase{ 
    protected mNode:Node;//其是一个空节点，空节点下会挂载更多的碰撞器

    protected mRigidBody:RigidBodies;//需要一个角色刚体，之后会在绝伤刚体上附加更多的碰撞器组件
    protected mComponentMap:Map<number,PhysicsCompBase> = new Map<number,PhysicsCompBase>();//碰撞器组件信息(身体  头脑 器具)
    protected mBodyCollider:ShapeCompBase;//身体碰撞器，身体碰撞器也将会被存储在ComponentMap中取
    protected mTableConfig:IPhysicsPlayerStruct;//角色配置表
 
    //protected mAttrObj:AttrCalc;//用以计算最终属性的接口
    //唯一ID获取
    public get ID():number{ 
        return this.mRigidBody.Handle; 
    }
    //配置信息获取
    public get Config():IPhysicsPlayerStruct{ 
        return this.mTableConfig; 
    } 
    //获取到物理世界的刚体信息s 
    public get RigidBody():RigidBodies{ 
        return this.mRigidBody; 
    } 
    //设置刚体的名称
    public get Node():Node{ 
        return this.mNode; 
    } 

    public constructor(table:IPhysicsPlayerStruct,rigidBody:RigidBodies){
        this.mRigidBody = rigidBody;//物理世界对象
        this.mTableConfig = table;//玩家的表格对象
        this.mNode = new Node();//节点用，用以挂载下面的节点（目前不考虑DrawCall优化）
        //this.mAttrObj = new AttrCalc();//角色的属性控制器
        //this.AddColliderComp(new ShapeCompBase(this,Cfg_PhysicsCollider.GetData(this.Config.Body)));
        //this.InitDeflautSkill();
        //this.InitBaseAttrs();//初始化属性 
    }
     
    //public GenerateBallRigidBody(redius:number):void{  
    //    this.mRigidBody = this.mRigidBody.CreateBallCollider(redius);
    //    this.mRigidBody.userData = this;//设置用户数据指向自己，减少未来的查询次数
    //}  
//
    //public GenerateCubuRigidBody():void{  
    //    this.mRigidBody = this.mRigidBody..createRigidBody(new Physics.RigidBodyDesc(this.InitRigidBodyType()));
    //    this.mRigidBody.userData = this;//设置用户数据指向自己，减少未来的查询次数
    //}  
    //
    ////添加技能表信息
    //private InitDeflautSkill(){
    //    for(let skillConfig of this.Config.Skill){
    //        this.AddColliderComp(new RangeInjurySkillComp(this,Cfg_SkillCollider.GetData(skillConfig)));
    //    }
    //}
    //
    //添加一个碰撞器组件
    private AddColliderComp(comp:PhysicsCompBase){
        comp.OnEnter();
        comp.OnStart();
        this.mNode.addChild(comp.Node);
        this.mComponentMap.set(comp.ID,comp);
    }
      
    //初始化基础属性信息
    //private InitBaseAttrs(){
    //    for(let cell of this.mTableConfig.Attrs)//获取到所有的属性信息
    //        this.mAttrObj.AlterBaseAttr(cell.k,cell.v);//修改当前的玩家属性
    //} 

    protected InitRigidBodyType():Physics.RigidBodyType{  return Physics.RigidBodyType.Dynamic; }
    
    //设置是否开启对象信息
    protected SetRigidBodyType(type: Physics.RigidBodyType):void{ 
        this.mRigidBody.SetRigidBodyType(type,true)
    } 

    //更新所有组件的位置信息
    public SetPosition(x:number,y:number):void{
        this.mRigidBody.SetPosition(x,y,true);//重新设置刚体的位置
        this.UpdateNodePosition();
    } 

    /*
    *更新节点的数据信息
    */
    public UpdateNodePosition():void{
        let pos:{x:number,y:number} = this.mRigidBody.GetPosition();//获取到RigidBody的位置
        this.mNode.setPosition(pos.x * GPhysicsScalingFactor ,pos.y * GPhysicsScalingFactor);
    }

    public UpdateNodeRotate():void{ 
        let rotation:number = this.mRigidBody.GetRotateDegree();//获取到旋转的角度
        this.mNode.setRotationFromEuler(0,0,rotation); 
    }

    public UpdateNode():void{
        this.UpdateNodePosition();
        this.UpdateNodeRotate();
    } 

     
    //所有的修改都是增量更新
    //public AlterBaseAttr(attrType:eBaseAttrType,value:number):boolean{
    //    return this.mAttrObj.AlterBaseAttr(attrType,value);
    //}

    //获取到某一个基础的属性值
    //public GetBaseAttr(attrType:eBaseAttrType):Decimal{
    //    return this.mAttrObj.GetBaseAttr(attrType);  
    //}

    //获取某一个属性的最终属性
    //public GetFinalAttr(attrType:eFinalAttrType):Decimal{
    //    return this.mAttrObj.GetFinalAttr(attrType);
    //}
    //
    //public SetFinalAttr(attrType:eFinalAttrType,value:Decimal):void{
    //    this.mAttrObj.SetFinalAttr(attrType,value);  
    //}

    //获取到玩家的某个碰撞器
    public GetPlayerCollider(id:number):PhysicsCompBase{
        return this.mComponentMap.get(id);
    }

    //同步时间信息
    public Update(dt:number):void{
        for(let comp of this.mComponentMap) 
            comp[1].Update(dt); 
    }
    
    
    public RemoveCollider(){
        //this.mRigidBody.removeRigidBody(this.mRigidBody);
        //this.mNode.destroy(); 
    }
    public RemoveCollider(){
        //this.mRigidBody.removeRigidBody(this.mRigidBody);
        //this.mNode.destroy(); 
    }
    
    public DestorySelf(){
        //this.mRigidBody.removeRigidBody(this.mRigidBody);
        //this.mNode.destroy(); 
    }
}  