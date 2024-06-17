export interface ILanguageStruct{
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
   key名:Shape
   描述:物体形状
      *:0:方形
      *:1:圆形
   */
   'Shape': number;
   /*
   key名:Redius
   描述:物体半径
   */
   'Redius': number;
   /*
   key名:Size
   描述:墙体尺寸
   */
   'Size': {Width:number;Height:number;};
   /*
   key名:Type
   描述:怪物类型
      *:0:代表无敌墙体
      *:1:代表游戏城墙
      *:2:代表游戏的主角
      *:3:代表游戏中的敌人
   */
   'Type': number;
   /*
   key名:Attrs
   描述:角色的基本游戏属性
   */
   'Attrs': {k:number;v:number;}[];
};
class Language{
   private mConfigObject:{[key:number]:ILanguageStruct}  = {};
   private mConfigArray:ILanguageStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"墙体.横","Desc":"用以将敌人现在在指定的范围内","Shape":0,"Redius":0,"Size":{"Width":2.5,"Height":0.02},"Type":0,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[2] = {"Key":2,"Name":"墙体.竖","Desc":"用以将战斗人员限制在一定范围内","Shape":0,"Redius":0,"Size":{"Width":0.02,"Height":5},"Type":0,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[3] = {"Key":3,"Name":"城墙","Desc":"老旧破落的城墙，却守护者城内百姓的安宁","Shape":0,"Redius":0,"Size":{"Width":5,"Height":0.02},"Type":1,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[4] = {"Key":4,"Name":"勇士","Desc":"只会一些基本功，但是却已经有着守护一方宁静的普通人","Shape":1,"Redius":0.2,"Size":{"Width":0.2,"Height":0.2},"Type":2,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[5] = {"Key":5,"Name":"小杂兵","Desc":"爱做小破坏的一帮坏小子，很是令人讨厌","Shape":1,"Redius":0.2,"Size":{"Width":0.2,"Height":0.2},"Type":3,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[6] = {"Key":6,"Name":"叠罗汉_8","Desc":"怕见人的捣蛋鬼，他们将自己隐藏在床单下，露出个眼睛把坏事干","Shape":1,"Redius":0.2,"Size":{"Width":0.4,"Height":0.4},"Type":3,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[7] = {"Key":7,"Name":"叠罗汉_4","Desc":"怕见人的捣蛋鬼，他们将自己隐藏在床单下，露出个眼睛把坏事干","Shape":1,"Redius":0.2,"Size":{"Width":0.3,"Height":0.3},"Type":3,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[8] = {"Key":8,"Name":"叠罗汉_2","Desc":"怕见人的捣蛋鬼，他们将自己隐藏在床单下，露出个眼睛把坏事干","Shape":1,"Redius":0.2,"Size":{"Width":0.2,"Height":0.2},"Type":3,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
       this.mConfigObject[9] = {"Key":9,"Name":"小屁孩","Desc":"小小年纪不学好，该打","Shape":1,"Redius":0.2,"Size":{"Width":0.1,"Height":0.1},"Type":3,"Attrs":[{"k":0,"v":20},{"k":60,"v":2000}]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): ILanguageStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<ILanguageStruct>>{
       return this.mConfigArray;
   }
}
export let LanguageConfig:Language = new Language();