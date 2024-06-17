export interface IItemCellStruct{
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
      *:1:普通类型
      *:2:随机礼包类型
   */
   'Type': number;
   /*
   key名:PackID
   描述:如果道具为消耗类型，填入字段后可以确定道具使用后获得的道具信息
   */
   'PackID': number[];
   /*
   key名:MaxCount
   描述:道具所能持有的最大数量
      *:0代表无上限
   */
   'MaxCount': number;
};
class ItemCell{
   private mConfigObject:{[key:number]:IItemCellStruct}  = {};
   private mConfigArray:IItemCellStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[11] = {"ItemID":11,"Name":"低级经验丹","Desc":"使用后，玩家立即获得100点经验值","Type":2,"PackID":[],"MaxCount":9999};
       this.mConfigObject[21] = {"ItemID":21,"Name":"中级经验丹","Desc":"使用后，玩家立即获得300点经验值","Type":2,"PackID":[],"MaxCount":9999};
       this.mConfigObject[31] = {"ItemID":31,"Name":"高级经验丹","Desc":"使用后，玩家立即获得500点经验值","Type":2,"PackID":[],"MaxCount":9999};
       this.mConfigObject[41] = {"ItemID":41,"Name":"特技经验丹","Desc":"使用后，玩家立即获得1000点经验值","Type":2,"PackID":[],"MaxCount":9999};
       this.mConfigObject[51] = {"ItemID":51,"Name":"仙币","Desc":"可以在仙币商店购买指定道具","Type":1,"PackID":[],"MaxCount":0};
       this.mConfigObject[61] = {"ItemID":61,"Name":"仙韵元宝","Desc":"可以在元宝商店购买指定道具","Type":1,"PackID":[],"MaxCount":0};
       this.mConfigObject[71] = {"ItemID":71,"Name":"仙路阅历","Desc":"修行者在需要仙途阅历累计到一定程度时，能够刷新自己的层次，开拓自己的眼界，掌握更多常人所不能掌握的能力!","Type":1,"PackID":[],"MaxCount":0};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IItemCellStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IItemCellStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_ItemCell:ItemCell = new ItemCell();