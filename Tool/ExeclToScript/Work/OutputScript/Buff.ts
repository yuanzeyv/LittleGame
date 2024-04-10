export interface IBuffStruct{
   /*
   key名:Key
   描述:每种Buff的唯一ID
   */
   'Key': number;
   /*
   key名:BuffID
   描述:同类型Buff的ID
   */
   'BuffID': number;
   /*
   key名:Name
   描述:Buff的名称
   */
   'Name': string;
   /*
   key名:Level
   描述:Buff的等级
   */
   'Level': number;
   /*
   key名:Desc
   描述:Buff的详细描述
   */
   'Desc': string;
   /*
   key名:BuffType
   描述:Buff的具体类型
      *:1:获得后无法再次获得，叠加。效果触发后，也不会再被触发
      *:2:携带了Buff等级字段,获得Buff后会刷新Buff持续回合数，如果新获得的Buff等级大于当前Buff等级，Buff将会变更等级。
      *:3:携带了Buff等级字段，调用Buff只能通过不停的堆叠 0 级Buff来增加Buff等级。Buff等级不会超过表中可找到的最大Buff等级。
      *:4:堆叠Buff，可以重复获得但不可被叠加。同类型最大堆叠MaxStack次
      *:
   */
   'BuffType': number;
   /*
   key名:Continue
   描述:Buff持续周期
   */
   'Continue': number;
   /*
   key名:MaxStack
   描述:最大堆叠数量
   */
   'MaxStack': number;
   /*
   key名:Trigger
   描述:触发条件(本参数传入的为触发条件)
      *:在什么时机  符合什么条件  执行什么事情
      *:{Tri:[1,2,3,4],Con:[11111,11111,11112],do:[11112,11112,11113]}
      *:
   */
   'Trigger': {Tri:number[];Con:number[];Do:{t:number;e:number;}[];};
   /*
   key名:EndCondition
   描述:结束条件，当条件不满足的时候，立即清除本Buff
   */
   'EndCondition': number[];
};
class Buff{
   private mConfigObject:{[key:number]:IBuffStruct}  = {};
   private mConfigArray:IBuffStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"BuffID":1,"Name":"护身辟邪","Level":1,"Desc":"战斗开始时增加角色10%的基础生命值加成。每次触发闪避时，对攻击者造成相当于本次攻击20%攻击的伤害","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[0],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[2] = {"Key":2,"BuffID":2,"Name":"赐福增寿","Level":1,"Desc":"战斗开始时，增加角色100%的复活概率，且复活后回复12%总血量","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[3] = {"Key":3,"BuffID":3,"Name":"鬼影重重","Level":1,"Desc":"战斗开始时，基础攻击力提升10%，每次触发连击，将偷取敌方英雄10%的基础攻击力。","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[4] = {"Key":4,"BuffID":4,"Name":"鬼影重重-汲取","Level":0,"Desc":"触发鬼影重重判定用","BuffType":3,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[5] = {"Key":5,"BuffID":4,"Name":"鬼影重重-汲取","Level":1,"Desc":"汲取敌方英雄10%基础攻击力","BuffType":3,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[6] = {"Key":6,"BuffID":4,"Name":"鬼影重重-汲取","Level":2,"Desc":"汲取敌方英雄20%基础攻击力","BuffType":3,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[7] = {"Key":7,"BuffID":4,"Name":"鬼影重重-汲取","Level":3,"Desc":"汲取敌方英雄30%基础攻击力","BuffType":3,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[8] = {"Key":8,"BuffID":4,"Name":"鬼影重重-汲取","Level":4,"Desc":"汲取敌方英雄40%基础攻击力","BuffType":3,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[9] = {"Key":9,"BuffID":4,"Name":"鬼影重重-汲取","Level":5,"Desc":"汲取敌方英雄50%基础攻击力","BuffType":3,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[10] = {"Key":10,"BuffID":5,"Name":"摄魂夺魄","Level":1,"Desc":"每次发起攻击时，都将增加自己%10的敌方英雄基础吸血","BuffType":4,"Continue":0,"MaxStack":5,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[12] = {"Key":12,"BuffID":6,"Name":"生命滋养-汲取","Level":1,"Desc":"汲取敌方英雄10%基础攻击力","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[13] = {"Key":13,"BuffID":6,"Name":"生命滋养-汲取","Level":2,"Desc":"汲取敌方英雄20%基础攻击力","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[14] = {"Key":14,"BuffID":6,"Name":"生命滋养-汲取","Level":3,"Desc":"汲取敌方英雄30%基础攻击力","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[15] = {"Key":15,"BuffID":6,"Name":"生命滋养-汲取","Level":4,"Desc":"汲取敌方英雄40%基础攻击力","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[16] = {"Key":16,"BuffID":6,"Name":"生命滋养-汲取","Level":5,"Desc":"汲取敌方英雄50%基础攻击力","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[17] = {"Key":17,"BuffID":7,"Name":"温水煮蛙","Level":1,"Desc":"每次攻击前,都会获取10%的基础攻击力加成","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[18] = {"Key":18,"BuffID":8,"Name":"强健体魄","Level":1,"Desc":"每次攻击前,都会获取10%的基础攻击力加成","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[4],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[19] = {"Key":19,"BuffID":9,"Name":"闪避疲劳","Level":1,"Desc":"单回合内，每当闪避敌方攻击时，会给自己添加一个可叠加的DeBuff","BuffType":1,"Continue":0,"MaxStack":10,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
       this.mConfigObject[20] = {"Key":20,"BuffID":10,"Name":"抗闪避疲劳","Level":1,"Desc":"单回合内，每当命中敌方时会给自己添加一个可叠加的DeBuff","BuffType":1,"Continue":0,"MaxStack":10,"Trigger":{"Tri":[10],"Con":[],"Do":[{"t":1,"e":1000001}]},"EndCondition":[5,4,3,2,1]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IBuffStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IBuffStruct>>{
       return this.mConfigArray;
   }
}
export let BuffConfig:Buff = new Buff();