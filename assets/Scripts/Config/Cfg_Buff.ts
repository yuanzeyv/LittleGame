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
      *:1:获得后无法再次获得 与 叠加。
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
       this.mConfigObject[1] = {"Key":1,"BuffID":1,"Name":"越战越勇(领域)","Level":1,"Desc":"战斗开始时增加10%基础生命。并获得 《越战越勇-横冲直撞》的Buff。","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100009},{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[2] = {"Key":2,"BuffID":2,"Name":"越战越勇-横冲直撞(领域)","Level":1,"Desc":"每次攻击后，为玩家添加一个《越战越勇-横冲直撞》的Buff","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[5],"Con":[],"Do":[{"t":2,"e":3}]},"EndCondition":[]};
       this.mConfigObject[3] = {"Key":3,"BuffID":3,"Name":"越战越勇-横冲直撞","Level":1,"Desc":"每次攻击后，增加玩家10%基础攻击力","BuffType":4,"Continue":5,"MaxStack":5,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100009}]},"EndCondition":[2]};
       this.mConfigObject[4] = {"Key":4,"BuffID":4,"Name":"命中疲劳(领域)","Level":1,"Desc":"单回合内每次命中敌人时，攻击者将会掉以轻心，闪避概率将会降低10%","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[10],"Con":[],"Do":[{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[5] = {"Key":5,"BuffID":5,"Name":"命中疲劳-狂妄自大","Level":1,"Desc":"总闪避概率将会降低10%。我知道这是不对的，但是我没办法改变","BuffType":4,"Continue":1,"MaxStack":5,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100009}]},"EndCondition":[2]};
       this.mConfigObject[6] = {"Key":6,"BuffID":6,"Name":"闪避疲劳(领域)","Level":1,"Desc":"当己方闪避了敌方的攻击时，己方闪避率降低10%","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[10],"Con":[],"Do":[{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[7] = {"Key":7,"BuffID":7,"Name":"闪避疲劳-行动僵直","Level":1,"Desc":"虽然进行了灵活的闪避，但是颇为费力，本回合闪避概率降低10%","BuffType":4,"Continue":1,"MaxStack":5,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100009}]},"EndCondition":[2]};
       this.mConfigObject[8] = {"Key":8,"BuffID":8,"Name":"连击疲劳(领域)","Level":1,"Desc":"触发连击时，消耗了大量气力，获得可叠加《连击疲劳-酸软发力》","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[10],"Con":[],"Do":[{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[9] = {"Key":9,"BuffID":9,"Name":"连击疲劳-酸软发力","Level":1,"Desc":"消耗了大量气力，降低10%连击概率","BuffType":4,"Continue":0,"MaxStack":10,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100009}]},"EndCondition":[2]};
       this.mConfigObject[10] = {"Key":10,"BuffID":10,"Name":"抗连击疲劳(领域)","Level":1,"Desc":"在抵抗连击时，消耗了心神，获得可叠加《抗连及疲劳-无力招架》","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[10],"Con":[],"Do":[{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[11] = {"Key":11,"BuffID":11,"Name":"抗连击疲劳-无力招架","Level":1,"Desc":"消耗了大量心神，降低10%抗连击概率","BuffType":4,"Continue":1,"MaxStack":5,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100009}]},"EndCondition":[2]};
       this.mConfigObject[12] = {"Key":12,"BuffID":12,"Name":" 反击疲劳(领域)","Level":1,"Desc":"玩家成功反击了敌方攻击，消耗大量的体力，获得可叠加 ","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[10],"Con":[],"Do":[{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[13] = {"Key":13,"BuffID":13,"Name":"反击疲劳-渐渐力竭","Level":1,"Desc":"玩家由于连续的反击，已经筋疲力尽了，获得10%的反击衰减","BuffType":4,"Continue":1,"MaxStack":10,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100009}]},"EndCondition":[2]};
       this.mConfigObject[14] = {"Key":14,"BuffID":14,"Name":"抗反击疲劳(领域)","Level":1,"Desc":"玩家成功反击了敌方攻击，消耗大量的体力，获得可叠加 ","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[10],"Con":[],"Do":[{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[15] = {"Key":15,"BuffID":15,"Name":"抗反击疲劳-虎口震咧","Level":1,"Desc":"未能阻止敌方的反击，获得10%的抗反击衰减","BuffType":4,"Continue":1,"MaxStack":10,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":4001}]},"EndCondition":[]};
       this.mConfigObject[16] = {"Key":16,"BuffID":16,"Name":"回马荡刀","Level":1,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成40%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":4501}]},"EndCondition":[]};
       this.mConfigObject[17] = {"Key":17,"BuffID":16,"Name":"回马荡刀","Level":2,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成45%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":5001}]},"EndCondition":[]};
       this.mConfigObject[18] = {"Key":18,"BuffID":16,"Name":"回马荡刀","Level":3,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成50%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":6001}]},"EndCondition":[]};
       this.mConfigObject[19] = {"Key":19,"BuffID":16,"Name":"回马荡刀","Level":4,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成60%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":6501}]},"EndCondition":[]};
       this.mConfigObject[20] = {"Key":20,"BuffID":16,"Name":"回马荡刀","Level":5,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成65%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":7001}]},"EndCondition":[]};
       this.mConfigObject[21] = {"Key":21,"BuffID":16,"Name":"回马荡刀","Level":6,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成70%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":8001}]},"EndCondition":[]};
       this.mConfigObject[22] = {"Key":22,"BuffID":16,"Name":"回马荡刀","Level":7,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成80%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":9001}]},"EndCondition":[]};
       this.mConfigObject[23] = {"Key":23,"BuffID":16,"Name":"回马荡刀","Level":8,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成90%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":10001}]},"EndCondition":[]};
       this.mConfigObject[24] = {"Key":24,"BuffID":16,"Name":"回马荡刀","Level":9,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成100%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":10001}]},"EndCondition":[]};
       this.mConfigObject[25] = {"Key":25,"BuffID":16,"Name":"回马荡刀","Level":10,"Desc":"使用刀进行抵抗闪避，并荡开敌方的攻击，对敌方造成110%攻击力的伤害","BuffType":2,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[11],"Con":[],"Do":[{"t":3,"e":11001}]},"EndCondition":[]};
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
export let Cfg_Buff:Buff = new Buff();