import Decimal from "decimal.js";
import { Cfg_PhysicsCollider } from "../../../../../Config/Cfg_PhysicsCollider";
import { ISkillColliderStruct } from "../../../../../Config/Cfg_SkillCollider";
import { PlayerBase } from "../../Player/PlayerBase";
import { PhysicsCompBase } from "../PhysicsCompBase";
import { eFinalAttrType } from "../../../../Proxy/PhysicsProxy/Define/AttrType";
import { Random } from "random";
import seedrandom from "seedrandom"
import { math } from "cc";
import { _Facade } from "../../../../../Global";
import { eNotice } from "../../../../../NotificationTable";
export class RangeInjurySkillComp extends PhysicsCompBase { 
    //private mSkillConfig:ISkillColliderStruct; 
    //private mEnemyPlayer:PlayerBase|undefined;
    //private mAttackInterval:Decimal = new Decimal(0);
    //constructor(playerBase:PlayerBase,skillConfig:ISkillColliderStruct){
    //    super(playerBase,Cfg_PhysicsCollider.GetData(skillConfig.ColliderShape));
    //    this.mSkillConfig = skillConfig;
    //}
    //public OnStart(){
    //    this.SetColliderActiveEvent(true,false);
    //    this.SetCollidersGroup(0x00020001);//技能只会与角色发生碰撞关系
    //    this.mCollider.setSensor(true);
    //} 
    ////开始碰撞回调
    //public OnStartCollider(physicsCompBase:PhysicsCompBase,playerBase:PlayerBase):void{  
    //    if(this.mEnemyPlayer != undefined)//已经拥有了合适的攻击对象了
    //        return;
    //    this.mEnemyPlayer = playerBase;
    //}
    ////结束碰撞回调 
    //public OnLeaveCollider(physicsCompBase:PhysicsCompBase,playerBase:PlayerBase):void{
    //    if(this.mEnemyPlayer != playerBase)
    //        return; 
    //    this.mEnemyPlayer = undefined;
    //}
    //public Update(dt: Decimal): void {
    //    if(this.mEnemyPlayer == undefined) //没有攻击对象的话，本单元是不会做任何处理的
    //        return;
    //    let interval:Decimal = Decimal.div("1",this.mPlayer.GetFinalAttr(eFinalAttrType.AttackSpeed));//计算当前角色每秒的攻击间隔
    //    this.mAttackInterval = this.mAttackInterval.add(dt);
    //    if(!this.mAttackInterval.sub(interval).greaterThan("0"))
    //        return;
    //    this.mAttackInterval = new Decimal(0);
    //    //执行当前玩家对碰撞的玩家进行攻击
    //    this.Attack([this.mEnemyPlayer]);
    //}

    //public Attack(attackArray:Array<PlayerBase>):void{ 
    //    let physicsHurmRatio:Decimal = new Decimal(this.mSkillConfig.PhysicsAttackRatio);//判断当前技能的物理加成
    //    let magicHurmRatio:Decimal = new Decimal(this.mSkillConfig.MagicAttackRatio);//判断当前技能的物理加成
//
    //    let selfMagicAttack:Decimal = this.Player.GetFinalAttr(eFinalAttrType.MagicAttack);//获取到自己的魔法攻击力
    //    let selfPhysicalAttack:Decimal = this.Player.GetFinalAttr(eFinalAttrType.PhysicalAttack);//获取到自己的物理攻击力
    //    let selfDefencePenetrate:Decimal = this.Player.GetFinalAttr(eFinalAttrType.DefencePenetrate);//获取到自己的护甲穿透
    //    let selfMagicDefencePenetrate:Decimal = this.Player.GetFinalAttr(eFinalAttrType.MagicDefencePenetrate);//获取到自己的魔法穿透
    //    let selfDamageBoost:Decimal = this.Player.GetFinalAttr(eFinalAttrType.DamageBoost);//获取到自己的增伤属性
    //    let selfCriticalRate:Decimal = this.Player.GetFinalAttr(eFinalAttrType.CriticalRate);//获取到自己的暴击概率
    //    let selfCriticalAddtionDamage:Decimal = this.Player.GetFinalAttr(eFinalAttrType.CriticalAddtionDamage);//获取到自己的爆伤加成
    //    let selfHitRate:Decimal = this.Player.GetFinalAttr(eFinalAttrType.HitRate);//获取到当前自己的命中几率
    //    for(let enemy of attackArray){
    //        let enemyMagicDefence:Decimal = Decimal.max(new Decimal(0), enemy.GetFinalAttr(eFinalAttrType.MagicDefence).sub(selfMagicDefencePenetrate));//获取到敌人的魔法防御力
    //        let enemyPhysicalDefence:Decimal = Decimal.max(new Decimal(0), enemy.GetFinalAttr(eFinalAttrType.PhysicalDefence).sub(selfDefencePenetrate));//获取到敌人的物理防御力  
    //        let enemyDamageReduction:Decimal = enemy.GetFinalAttr(eFinalAttrType.DamageReduction);//获取到敌人的减伤属性
    //        let enemyResistCirticalRate:Decimal = enemy.GetFinalAttr(eFinalAttrType.ResistCirticalRate);//获取到敌人的抵抗暴击概率
    //        let enemyCriticalResistDamage:Decimal = enemy.GetFinalAttr(eFinalAttrType.CriticalResistDamage);//获取到自己的爆伤抵抗
    //        let enemyMissRate:Decimal = enemy.GetFinalAttr(eFinalAttrType.MissRate);//获取到当前自己的闪避几率
    //        //计算最终的闪避值
    //        let finalHitRate:Decimal = Decimal.max(new Decimal(0),selfHitRate.sub(enemyMissRate))//最终的闪避概率
    //        if(!finalHitRate.lessThan(Math.random() * 100)){
    //            console.log("闪避了，哈哈哈哈");//发送伤害扣除消息
    //            //发送角色闪避时间
    //            continue;
    //        }
    //        //计算最终的暴击率
    //        let realCirticalRate:Decimal = Decimal.max(new Decimal(0),selfCriticalRate.sub(enemyResistCirticalRate));//获取到真实的暴击率
    //        let isCirtical:boolean = realCirticalRate.lessThan(Math.random() * 100); 
    //        let finalCriticalResistDamage:Decimal = isCirtical ? new Decimal(1):Decimal.max(new Decimal(-1),selfCriticalAddtionDamage.sub(enemyCriticalResistDamage)).add(1);//获取到最终的爆伤加成
    //        let finalEnemyDamageReduction:Decimal = Decimal.max(new Decimal(-1),selfDamageBoost.sub(enemyDamageReduction)).add(1);//获取到最终的增伤属性 
    //        if(!physicsHurmRatio.eq(0)){
    //            let finalPhysicsAttack:Decimal = Decimal.max(new Decimal(0),selfPhysicalAttack.sub(enemyPhysicalDefence)).mul(finalCriticalResistDamage).mul(finalEnemyDamageReduction).mul(physicsHurmRatio);//获取到最终的物理攻击力
    //            console.log(`造成了${finalPhysicsAttack.toFixed()}点物理伤害  `);//发送伤害扣除消息
    //            enemy.SetFinalAttr(eFinalAttrType.HP,enemy.GetFinalAttr(eFinalAttrType.HP).sub(finalPhysicsAttack));
    //        }
    //        if(!magicHurmRatio.eq(0)){
    //            let finalMagicAttack:Decimal = Decimal.max(new Decimal(0),selfMagicAttack.sub(enemyMagicDefence)).mul(finalCriticalResistDamage).mul(finalEnemyDamageReduction).mul(magicHurmRatio);//获取到最终的物理攻击力
    //            console.log(`造成了${finalMagicAttack.toFixed()}点魔法伤害 剩余血量 ${enemy.GetFinalAttr(eFinalAttrType.HP)}`);//发送伤害扣除消息
    //            enemy.SetFinalAttr(eFinalAttrType.HP,enemy.GetFinalAttr(eFinalAttrType.HP).sub(finalMagicAttack));
    //        }   
    //        if(enemy.GetFinalAttr(eFinalAttrType.HP).lessThan(0)){
    //            console.log(`玩家已经死亡了`);//发送伤害扣除消息
    //            _Facade.Send(eNotice.PlayerDie,this.mPlayer.SignalID);
    //        }
    //        this.mCollider.friction
    //    } 
    //} 
}