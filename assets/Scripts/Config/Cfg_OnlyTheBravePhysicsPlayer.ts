export interface IOnlyTheBravePhysicsPlayerStruct{
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
   key名:Desc
   描述:怪物描述
   */
   'Desc': string;
   /*
   key名:Type
   描述:砖块类型
      *://以下是拥有实体碰撞器的
      *:1:障碍墙体
      *:
   */
   'Type': number;
   /*
   key名:SubType
   描述:Type(1):
      *:1:普通障碍用节点
      *:
   */
   'SubType': number;
   /*
   key名:RigidType
   描述:刚体类型
      *:0:动态刚体
      *:1:静态刚体
      *:2:运动学刚体
   */
   'RigidType': number;
   /*
   key名:Body
   描述:角色的身体属性(对应碰撞器的信息)
   */
   'Body': number;
   /*
   key名:Skill
   描述:角色身上自带的技能类型
   */
   'Skill': number[];
   /*
   key名:AttackCollider
   描述:角色身上的攻击碰撞器技能
   */
   'AttackCollider': number[];
};
class OnlyTheBravePhysicsPlayer{
   private mConfigObject:{[key:number]:IOnlyTheBravePhysicsPlayerStruct}  = {};
   private mConfigArray:IOnlyTheBravePhysicsPlayerStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"竖墙.1*500","Desc":"1米*500米障碍墙","Type":1,"SubType":1,"RigidType":0,"Body":1,"Skill":[],"AttackCollider":[]};
       this.mConfigObject[2] = {"Key":2,"Name":"横墙 1*3","Desc":"1米*3米障碍墙","Type":1,"SubType":1,"RigidType":0,"Body":1,"Skill":[],"AttackCollider":[]};
       this.mConfigObject[3] = {"Key":3,"Name":"摄像头","Desc":"用于观察可是范围内的视野对象","Type":100,"SubType":3,"RigidType":0,"Body":1,"Skill":[],"AttackCollider":[]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IOnlyTheBravePhysicsPlayerStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IOnlyTheBravePhysicsPlayerStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_OnlyTheBravePhysicsPlayer:OnlyTheBravePhysicsPlayer = new OnlyTheBravePhysicsPlayer();