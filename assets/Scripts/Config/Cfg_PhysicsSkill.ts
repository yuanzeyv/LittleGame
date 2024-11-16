export interface IPhysicsSkillStruct{
   /*
   key名:Key
   描述:怪物的唯一ID
   */
   'Key': number;
   /*
   key名:Name
   描述:名称
   */
   'Name': string;
   /*
   key名:SkillType
   描述:技能类型
   */
   'SkillType': number;
   /*
   key名:Level
   描述:技能等级
   */
   'Level': number;
   /*
   key名:CDTime
   描述:冷却时间
      *:0:的话就是根据玩家的攻击速度
   */
   'CDTime': number;
   /*
   key名:Desc
   描述:怪物描述
   */
   'Desc': string;
   /*
   key名:InjuryRation
   描述:伤害比例
   */
   'InjuryRation': {Physics:number;Magic:number;};
   /*
   key名:PhysicsID
   描述:碰撞器ID
   */
   'PhysicsID': number;
   /*
   key名:GainExperience
   描述:每次击中目标，给攻击者增加多少经验
   */
   'GainExperience': number;
   /*
   key名:ChartletImg
   描述:攻击贴图
   */
   'ChartletImg': string;
};
class PhysicsSkill{
   private mConfigObject:{[key:number]:IPhysicsSkillStruct}  = {};
   private mConfigArray:IPhysicsSkillStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"梦魇.普通攻击","SkillType":1,"Level":1,"CDTime":0,"Desc":"用掌拍向敌人，对敌人造成一定的伤害","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":31,"GainExperience":5,"ChartletImg":"Attack"};
       this.mConfigObject[2] = {"Key":2,"Name":"炮塔.普攻_LV1","SkillType":2,"Level":1,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_1"};
       this.mConfigObject[3] = {"Key":3,"Name":"炮塔.普攻_LV2","SkillType":2,"Level":2,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_2"};
       this.mConfigObject[4] = {"Key":4,"Name":"炮塔.普攻_LV3","SkillType":2,"Level":3,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_3"};
       this.mConfigObject[5] = {"Key":5,"Name":"炮塔.普攻_LV4","SkillType":2,"Level":4,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_4"};
       this.mConfigObject[6] = {"Key":6,"Name":"炮塔.普攻_LV5","SkillType":2,"Level":5,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_5"};
       this.mConfigObject[7] = {"Key":7,"Name":"炮塔.普攻_LV6","SkillType":2,"Level":6,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_6"};
       this.mConfigObject[8] = {"Key":8,"Name":"炮塔.普攻_LV7","SkillType":2,"Level":7,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_7"};
       this.mConfigObject[9] = {"Key":9,"Name":"炮塔.普攻_LV8","SkillType":2,"Level":8,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_8"};
       this.mConfigObject[10] = {"Key":10,"Name":"炮塔.普攻_LV9","SkillType":2,"Level":9,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_9"};
       this.mConfigObject[11] = {"Key":11,"Name":"炮塔.普攻_LV10","SkillType":2,"Level":10,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_10"};
       this.mConfigObject[12] = {"Key":12,"Name":"炮塔.普攻_LV11","SkillType":2,"Level":11,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_10"};
       this.mConfigObject[13] = {"Key":13,"Name":"炮塔.普攻_LV12","SkillType":2,"Level":12,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_10"};
       this.mConfigObject[14] = {"Key":14,"Name":"炮塔.普攻_LV13","SkillType":2,"Level":13,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_10"};
       this.mConfigObject[15] = {"Key":15,"Name":"炮塔.普攻_LV14","SkillType":2,"Level":14,"CDTime":0,"Desc":"炮塔的普通攻击","InjuryRation":{"Physics":1,"Magic":0},"PhysicsID":30,"GainExperience":0,"ChartletImg":"BroadSword_10"};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IPhysicsSkillStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IPhysicsSkillStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_PhysicsSkill:PhysicsSkill = new PhysicsSkill();