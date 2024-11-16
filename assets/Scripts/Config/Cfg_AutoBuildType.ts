export interface IAutoBuildTypeStruct{
   /*
   key名:Key
   描述:ID
   */
   'Key': number;
   /*
   key名:Type
   描述:自动类型
   */
   'Type': number;
   /*
   key名:Desc
   描述:描述
   */
   'Desc': string;
   /*
   key名:Param
   描述:Type(1)：建筑建筑物
      *:Param的值为建筑物商品购买ID
      *:Type(2):
      *:Param的值为升级建筑物的类型
   */
   'Param': number;
};
class AutoBuildType{
   private mConfigObject:{[key:number]:IAutoBuildTypeStruct}  = {};
   private mConfigArray:IAutoBuildTypeStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Type":1,"Desc":"建造一个一级炮台","Param":1};
       this.mConfigObject[2] = {"Key":2,"Type":1,"Desc":"建造一个二级炮台","Param":1};
       this.mConfigObject[3] = {"Key":3,"Type":1,"Desc":"建造一个三级炮台","Param":1};
       this.mConfigObject[4] = {"Key":4,"Type":1,"Desc":"建造一个四级炮台","Param":1};
       this.mConfigObject[5] = {"Key":5,"Type":2,"Desc":"升级一个炮台","Param":1};
       this.mConfigObject[6] = {"Key":6,"Type":2,"Desc":"升级一个房门","Param":3};
       this.mConfigObject[7] = {"Key":7,"Type":2,"Desc":"升级一个床","Param":2};
       this.mConfigObject[8] = {"Key":8,"Type":2,"Desc":"升级一个练气塔","Param":4};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IAutoBuildTypeStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IAutoBuildTypeStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_AutoBuildType:AutoBuildType = new AutoBuildType();