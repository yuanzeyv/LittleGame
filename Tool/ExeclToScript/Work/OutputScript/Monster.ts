export interface IMonsterStruct{
   /*
   key名:Key
   描述:怪物的唯一ID
   */
   'Key': number;
   /*
   key名:Name
   描述:角色的名称
   */
   'Name': string;
   /*
   key名:Equip
   描述:玩家穿戴的可视装备
   */
   'Equip': {k:number;v:number;}[];
   /*
   key名:Attrs
   描述:玩家进入战斗的属性
   */
   'Attrs': {k:number;v:number;}[];
   /*
   key名:Buffs
   描述:开局携带的Buff
   */
   'Buffs': number[];
};
class Monster{
   private mConfigObject:{[key:number]:IMonsterStruct}  = {};
   private mConfigArray:IMonsterStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"杨佳欣","Equip":[],"Attrs":[{"k":0,"v":800},{"k":3,"v":20},{"k":6,"v":300},{"k":9,"v":5000},{"k":12,"v":5000},{"k":18,"v":5000},{"k":36,"v":5000},{"k":42,"v":5000}],"Buffs":[1,17]};
       this.mConfigObject[2] = {"Key":2,"Name":"袁泽宇","Equip":[],"Attrs":[{"k":0,"v":600},{"k":3,"v":300},{"k":6,"v":300},{"k":9,"v":5000},{"k":12,"v":5000},{"k":18,"v":5000},{"k":24,"v":5000}],"Buffs":[3]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IMonsterStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IMonsterStruct>>{
       return this.mConfigArray;
   }
}
export let MonsterConfig:Monster = new Monster();