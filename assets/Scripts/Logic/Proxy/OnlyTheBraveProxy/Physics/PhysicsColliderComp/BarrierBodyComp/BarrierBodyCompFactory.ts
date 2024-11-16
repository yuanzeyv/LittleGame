import { IOnlyTheBravePhysicsColliderStruct } from "../../../../../../Config/Cfg_OnlyTheBravePhysicsCollider";
import { AbstratorCompFactory } from "../AbstratorCompFactory";
import { PlayerBase } from "../../PlayerBase";
import { BarrierBodyComp } from "./BarrierBodyComp";
import { PhysicsCompBase } from "../../PhysicsCompBase";
import { eCommonBodyDescType } from "../../ColliderTypeDefine";
import { EnemyBodyComp } from "./EnemyBodyComp";
import { EnemyButtleBodyComp } from "./EnemyButtleBodyComp";
import { HeroBodyComp } from "./HeroBodyComp";
import { HeroButtleBodyComp } from "./HeroButtleBodyComp";
export class BarrierBodyCompFactory extends AbstratorCompFactory{
    private mBarrierBaseMap:Map<eCommonBodyDescType,new (playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct) => PhysicsCompBase> = new Map<eCommonBodyDescType,new (playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct) => PhysicsCompBase>();;
    constructor(){
        super();  
        this.InitPlayerBaseMap();
    } 
   
    protected InitPlayerBaseMap(){  
        this.mBarrierBaseMap.set(eCommonBodyDescType.Barrier     ,BarrierBodyComp); 
        this.mBarrierBaseMap.set(eCommonBodyDescType.Hero        ,HeroBodyComp ); 
        this.mBarrierBaseMap.set(eCommonBodyDescType.HeroBullet  ,HeroButtleBodyComp); 
        this.mBarrierBaseMap.set(eCommonBodyDescType.Enemy       ,EnemyBodyComp ); 
        this.mBarrierBaseMap.set(eCommonBodyDescType.EnemyBullet ,EnemyButtleBodyComp); 
    }   
    
    public GenerateColliderComp(playerBase:PlayerBase,colliderCon:IOnlyTheBravePhysicsColliderStruct):PhysicsCompBase{
        return new (this.mBarrierBaseMap.get(colliderCon.SubType))!(playerBase,colliderCon);//生成对象
    }
}        