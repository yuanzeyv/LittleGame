export interface ISkillColliderStruct{
   /*
   key名:SkillID
   描述:技能ID
   */
   'SkillID': number;
   /*
   key名:Name
   描述:技能名称
   */
   'Name': string;
   /*
   key名:Desc
   描述:技能描述
   */
   'Desc': string;
   /*
   key名:Type
   描述:攻击类型:
      *:0:瞬发类型（攻击时间到达后，立即造成伤害）
      *:1:子弹类型 (攻击时间到达后，生成一个子弹，对第一个碰撞到的敌人造成伤害)
      *:2:多段外扩瞬发类型:(攻击时间到达后，从圆心处向外扩散，)
      *:3:多段内缩瞬发类型:(攻击事件到达后，从轮廓向圆心回缩)
      *:
   */
   'Type': number;
   /*
   key名:ColliderShape
   描述:范围形状
   */
   'ColliderShape': number;
   /*
   key名:BulletSpeed
   描述:子弹移速(米/秒)
   */
   'BulletSpeed': number;
   /*
   key名:AttactSpeedRatio
   描述:技能攻速倍率
      *:攻击速度/秒*攻击缩放倍率=实际攻速
   */
   'AttactSpeedRatio': number;
   /*
   key名:PhysicsAttackRatio
   描述:物理伤害比例
   */
   'PhysicsAttackRatio': number;
   /*
   key名:MagicAttackRatio
   描述:魔法伤害比例
   */
   'MagicAttackRatio': number;
};
class SkillCollider{
   private mConfigObject:{[key:number]:ISkillColliderStruct}  = {};
   private mConfigArray:ISkillColliderStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"SkillID":1,"Name":"普通攻击","Desc":"对范围内的所有英雄造成伤害","Type":0,"ColliderShape":9,"BulletSpeed":2,"AttactSpeedRatio":1,"PhysicsAttackRatio":1,"MagicAttackRatio":1};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): ISkillColliderStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<ISkillColliderStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_SkillCollider:SkillCollider = new SkillCollider();