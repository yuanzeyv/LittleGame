export interface IEquipCellStruct{
   /*
   key名:ItemID
   描述:道具ID
   */
   'ItemID': number;
   /*
   key名:Name
   描述:道具名称
   */
   'Name': string;
   /*
   key名:Desc
   描述:道具描述
   */
   'Desc': string;
   /*
   key名:Type
   描述:道具的类型
      *:1:主武器（剑） 
   */
   'Type': number;
};
class EquipCell{
   private mConfigObject:{[key:number]:IEquipCellStruct}  = {};
   private mConfigArray:IEquipCellStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[100001] = {"ItemID":100001,"Name":"桃木剑","Desc":"阳气极其厚重的桃木所致，穿戴者人见人敬，妖见妖惧！","Type":1};
       this.mConfigObject[100002] = {"ItemID":100002,"Name":"精铁剑","Desc":"炼制时加入了自己的精血，极易操控","Type":1};
       this.mConfigObject[100003] = {"ItemID":100003,"Name":"红绳铜钱剑","Desc":"使用市面上常见的铜钱，并用特殊的编制工艺制成!","Type":1};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IEquipCellStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IEquipCellStruct>>{
       return this.mConfigArray;
   }
}
export let EquipCellConfig:EquipCell = new EquipCell();