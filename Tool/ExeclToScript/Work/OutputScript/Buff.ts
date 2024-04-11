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
       this.mConfigObject[1] = {"Key":1,"BuffID":1,"Name":"越战越勇","Level":1,"Desc":"战斗开始时增加10%基础生命。并获得 《越战越勇-横冲直撞》的Buff。","BuffType":1,"Continue":0,"MaxStack":0,"Trigger":{"Tri":[3,4],"Con":[],"Do":[{"t":1,"e":100009},{"t":2,"e":2}]},"EndCondition":[]};
       this.mConfigObject[2] = {"Key":2,"BuffID":2,"Name":"越战越勇-横冲直撞","Level":1,"Desc":"每次攻击后，增加玩家10%基础攻击力","BuffType":4,"Continue":5,"MaxStack":10,"Trigger":{"Tri":[3],"Con":[],"Do":[{"t":1,"e":100001}]},"EndCondition":[2]};
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