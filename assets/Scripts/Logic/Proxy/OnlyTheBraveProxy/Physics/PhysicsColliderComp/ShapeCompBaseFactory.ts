import { IOnlyTheBravePhysicsColliderStruct, Cfg_OnlyTheBravePhysicsCollider } from "../../../../../Config/Cfg_OnlyTheBravePhysicsCollider";
import { ePlayerType } from "../ColliderTypeDefine";
import { PhysicsCompBase } from "../PhysicsCompBase";
import { PlayerBase } from "../PlayerBase";
import { AbstratorCompFactory } from "./AbstratorCompFactory";
import { BarrierBodyCompFactory } from "./BarrierBodyComp/BarrierBodyCompFactory";
import { MoveControlCompFactory } from "./MoveControlComp/MoveControlCompFactory";
import { VisualFieldDetectionCompFactory } from "./VisualFieldDetectionComp/VisualFieldDetectionCompFactory";

export class ShapeCompBaseFactory{
    private static mSignal:ShapeCompBaseFactory;
    private mColliderCompAbstratorFactory:Array<AbstratorCompFactory> = new Array<AbstratorCompFactory>();
    public static get Inst():ShapeCompBaseFactory{
        if(ShapeCompBaseFactory.mSignal == undefined)
            ShapeCompBaseFactory.mSignal = new ShapeCompBaseFactory();  
        return ShapeCompBaseFactory.mSignal;
    } 

    constructor(){
        this.mColliderCompAbstratorFactory[ePlayerType.Barrier] = new BarrierBodyCompFactory();//基础英雄碰撞器类型
        this.mColliderCompAbstratorFactory[ePlayerType.Move] = new MoveControlCompFactory();//基础英雄碰撞器类型
        this.mColliderCompAbstratorFactory[ePlayerType.Detection] = new VisualFieldDetectionCompFactory();//基础英雄碰撞器类型
    }

    public GenerateShapeCompBase(bodyID:number,playerBase:PlayerBase):PhysicsCompBase{
        let colliderConfig:IOnlyTheBravePhysicsColliderStruct  = Cfg_OnlyTheBravePhysicsCollider.GetData(bodyID);   
        //存在抽象工厂时
        if(this.mColliderCompAbstratorFactory[colliderConfig.Type]){ 
            let shapeCompBase:PhysicsCompBase = this.mColliderCompAbstratorFactory[colliderConfig.Type].GenerateColliderComp(playerBase,colliderConfig);
            shapeCompBase.OnInit();
            return shapeCompBase;
        }
        return undefined;
    } 
}     