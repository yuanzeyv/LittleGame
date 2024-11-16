// import { PlayerBase } from "../PhysicsRigidBody/PlayerBase"; 
// import { PhysicsProxy } from "../PhysicsProxy";   
// import { XianTuDataMgr } from "../../../DataMgrReg";
// import cfg_NightmarePhysicsPlayerCfgData from "../../../../cfg/data/cfg_NightmarePhysicsPlayerCfgData";
// import { cfg } from "../../../../cfg/ConfigBaseCfgInfo";
// import cfg_NightmarePhysicsSkillCfgData from "../../../../cfg/data/cfg_NightmarePhysicsSkillCfgData";
// export class SkillInfo{
//     private mSkillConfig:cfg.NightmarePhysicsSkillCfgInfo;//当前技能对应的表信息 
//     private mPlayerBase:PlayerBase;//技能信息所拥有的数据对象 
//     private mCDResidue:number;//剩余的CD时长
//     public get SkillConfig():cfg.NightmarePhysicsSkillCfgInfo{ return this.mSkillConfig; }
//     public constructor(playerBase:PlayerBase ,skillID:number){
//         this.mSkillConfig = cfg_NightmarePhysicsSkillCfgData.getInfo(skillID);
//         this.mPlayerBase = playerBase;
//     }
//     //释放出一个技能，攻击对象 
//     public UseSkill(playerBase:PlayerBase):boolean{  
//         //判断技能是否正在CD中,不可以进行释放
//         if(this.IsCD())
//             return false;  
//         let position:cc.Vec2 = this.mPlayerBase.RigidBody.Position;
//         let physicsProxy:PhysicsProxy = XianTuDataMgr.PhysicsProxy;
//         physicsProxy.CreatePlayerBase(cfg_NightmarePhysicsPlayerCfgData.getInfo(this.SkillConfig.physicsID),{x:position.x,y:position.y},physicsProxy.WorldBase,{skillInfo:this,target:playerBase}); 
//     } 
    
//     //当前技能是否正在CD状态 
//     public IsCD():boolean{ 
//         return this.mCDResidue > 0;
//     } 

//     //当前技能是否正在CD状态 
//     public get PlayerBase():PlayerBase{ 
//         return this.mPlayerBase;
//     } 

//     //尝试升级技能
//     public UpgradeSkill():void{
//         //let nextSkillConfig:IPhysicsSkillStruct = XianTuDataMgr.PhysicsProxy.GetNightmareSkillConfig(this.mSkillConfig.SkillType,this.mSkillConfig.Level + 1);
//         //if(nextSkillConfig == undefined)
//         //    return;
//         //this.mSkillConfig = nextSkillConfig;//直接对技能表进行一次替换
//     }
// };