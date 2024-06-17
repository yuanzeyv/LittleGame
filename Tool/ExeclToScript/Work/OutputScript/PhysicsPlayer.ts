export interface IPhysicsPlayerStruct{
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
   key名:RigidType
   描述:刚体类型
      *:0:动态刚体
      *:1:静态刚体
   */
   'RigidType': number;
   /*
   key名:Desc
   描述:怪物描述
   */
   'Desc': string;
   /*
   key名:Body
   描述:角色的身体属性(对应碰撞器的信息)
   */
   'Body': number;
   /*
   key名:Attrs
   描述:角色的基本游戏属性
   */
   'Attrs': {k:number;v:number;}[];
};
class PhysicsPlayer{
   private mConfigObject:{[key:number]:IPhysicsPlayerStruct}  = {};
   private mConfigArray:IPhysicsPlayerStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"墙体.横","RigidType":1,"Desc":"用以将敌人现在在指定的范围内","Body":1,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[2] = {"Key":2,"Name":"墙体.竖","RigidType":1,"Desc":"用以将战斗人员限制在一定范围内","Body":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[3] = {"Key":3,"Name":"城墙","RigidType":1,"Desc":"老旧破落的城墙，却守护者城内百姓的安宁","Body":0,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[4] = {"Key":4,"Name":"勇士","RigidType":0,"Desc":"只会一些基本功，但是却已经有着守护一方宁静的普通人","Body":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[5] = {"Key":5,"Name":"小杂兵","RigidType":0,"Desc":"爱做小破坏的一帮坏小子，很是令人讨厌","Body":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[6] = {"Key":6,"Name":"叠罗汉_8","RigidType":0,"Desc":"怕见人的捣蛋鬼，他们将自己隐藏在床单下，露出个眼睛把坏事干","Body":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[7] = {"Key":7,"Name":"叠罗汉_4","RigidType":0,"Desc":"怕见人的捣蛋鬼，他们将自己隐藏在床单下，露出个眼睛把坏事干","Body":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[8] = {"Key":8,"Name":"叠罗汉_2","RigidType":0,"Desc":"怕见人的捣蛋鬼，他们将自己隐藏在床单下，露出个眼睛把坏事干","Body":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[9] = {"Key":9,"Name":"小屁孩","RigidType":0,"Desc":"小小年纪不学好，该打","Body":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IPhysicsPlayerStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IPhysicsPlayerStruct>>{
       return this.mConfigArray;
   }
}
export let PhysicsPlayerConfig:PhysicsPlayer = new PhysicsPlayer();