export interface IPassConfigStruct{
   /*
   key名:PassID
   描述:怪物的唯一ID
   */
   'PassID': number;
   /*
   key名:Name
   描述:名称
   */
   'Name': string;
   /*
   key名:Desc
   描述:关卡描述
   */
   'Desc': string;
   /*
   key名:MonsterArray
   描述:关卡怪物总数据
   */
   'MonsterArray': {ID:number;Pos:{X:number;Y:number;};}[];
};
class PassConfig{
   private mConfigObject:{[key:number]:IPassConfigStruct}  = {};
   private mConfigArray:IPassConfigStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"PassID":1,"Name":"第一关","Desc":"无压力","MonsterArray":[{"ID":1,"Pos":{"X":0,"Y":-5}},{"ID":1,"Pos":{"X":0,"Y":5}},{"ID":2,"Pos":{"X":-2.5,"Y":0}},{"ID":2,"Pos":{"X":2.5,"Y":0}}]};
       this.mConfigObject[2] = {"PassID":2,"Name":"第二关","Desc":"无压力","MonsterArray":[{"ID":1,"Pos":{"X":0,"Y":0}},{"ID":2,"Pos":{"X":0,"Y":0}},{"ID":1,"Pos":{"X":0,"Y":0}},{"ID":2,"Pos":{"X":0,"Y":0}}]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IPassConfigStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IPassConfigStruct>>{
       return this.mConfigArray;
   }
}
export let PassConfigConfig:PassConfig = new PassConfig();