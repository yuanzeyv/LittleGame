export interface IBuildingShopStruct{
   /*
   key名:Key
   描述:建筑物ID
   */
   'Key': number;
   /*
   key名:Name
   描述:建筑物名称
   */
   'Name': string;
   /*
   key名:Desc
   描述:建筑物描述
   */
   'Desc': string;
   /*
   key名:Image
   描述:建筑物头像
   */
   'Image': string;
   /*
   key名:MinorImage
   描述:子建筑物图片
   */
   'MinorImage': string;
   /*
   key名:MinorImageOffset
   描述:子建筑物相对主建筑物的偏移
   */
   'MinorImageOffset': {X:number;Y:number;};
   /*
   key名:BuildID
   描述:生成的建筑物ID
   */
   'BuildID': number;
   /*
   key名:Condition
   描述: 1//房门等级大于
      *: 2,//房门等级小于
      *: 3,//床的等级大于
      *: 4,//床的等级小于
      *: 5,//玩家的货币大于
      *: 6,//玩家的货币小于 
   */
   'Condition': number[];
   /*
   key名:Cost
   描述:消耗
   */
   'Cost': {ID:number;Num:number;}[];
};
class BuildingShop{
   private mConfigObject:{[key:number]:IBuildingShopStruct}  = {};
   private mConfigArray:IBuildingShopStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"炮台","Desc":"攻击敌人的炮台","Image":"Pedesta_1","MinorImage":"BroadSword_1","MinorImageOffset":{"X":0,"Y":0},"BuildID":1,"Condition":[],"Cost":[{"ID":1,"Num":8}]};
       this.mConfigObject[2] = {"Key":2,"Name":"练气塔","Desc":"生成一个金币生产工厂","Image":"CondenserPod_1","MinorImage":"NULL","MinorImageOffset":{"X":0,"Y":0},"BuildID":41,"Condition":[],"Cost":[{"ID":1,"Num":8}]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IBuildingShopStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IBuildingShopStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_BuildingShop:BuildingShop = new BuildingShop();