export interface IAttrCalcRelevanceStruct{
   /*
   key名:key
   描述:属性名称
   */
   'key': number;
   /*
   key名:name
   描述:属性名称
   */
   'name': string;
   /*
   key名:fixed
   描述:固定属性
   */
   'fixed': number;
   /*
   key名:fixedPercent
   描述:固定属性加成
   */
   'fixedPercent': number;
   /*
   key名:sumPercent
   描述:总属性加成
   */
   'sumPercent': number;
   /*
   key名:isPercent
   描述:属性是否万分比
   */
   'isPercent': boolean;
};
class AttrCalcRelevance{
   private mConfigObject:{[key:number]:IAttrCalcRelevanceStruct}  = {};
   private mConfigArray:IAttrCalcRelevanceStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[0] = {"key":0,"name":"物理攻击力","fixed":0,"fixedPercent":1,"sumPercent":2,"isPercent":false};
       this.mConfigObject[1] = {"key":1,"name":"魔法攻击力","fixed":3,"fixedPercent":4,"sumPercent":5,"isPercent":false};
       this.mConfigObject[2] = {"key":2,"name":"物理防御力","fixed":6,"fixedPercent":7,"sumPercent":8,"isPercent":false};
       this.mConfigObject[3] = {"key":3,"name":"魔法防御力","fixed":9,"fixedPercent":10,"sumPercent":11,"isPercent":false};
       this.mConfigObject[4] = {"key":4,"name":"护甲穿透","fixed":12,"fixedPercent":13,"sumPercent":14,"isPercent":false};
       this.mConfigObject[5] = {"key":5,"name":"魔法穿透","fixed":15,"fixedPercent":16,"sumPercent":17,"isPercent":false};
       this.mConfigObject[6] = {"key":6,"name":"最终减伤","fixed":18,"fixedPercent":19,"sumPercent":20,"isPercent":true};
       this.mConfigObject[7] = {"key":7,"name":"最终增伤","fixed":21,"fixedPercent":22,"sumPercent":23,"isPercent":true};
       this.mConfigObject[8] = {"key":8,"name":"爆伤加成","fixed":24,"fixedPercent":25,"sumPercent":26,"isPercent":true};
       this.mConfigObject[9] = {"key":9,"name":"爆伤抵抗","fixed":27,"fixedPercent":28,"sumPercent":29,"isPercent":true};
       this.mConfigObject[10] = {"key":10,"name":"移动速度","fixed":30,"fixedPercent":31,"sumPercent":32,"isPercent":false};
       this.mConfigObject[11] = {"key":11,"name":"攻击速度","fixed":33,"fixedPercent":34,"sumPercent":35,"isPercent":true};
       this.mConfigObject[12] = {"key":12,"name":"暴击几率","fixed":36,"fixedPercent":37,"sumPercent":38,"isPercent":true};
       this.mConfigObject[13] = {"key":13,"name":"抗暴击几率","fixed":39,"fixedPercent":40,"sumPercent":41,"isPercent":true};
       this.mConfigObject[14] = {"key":14,"name":"命中几率","fixed":42,"fixedPercent":43,"sumPercent":44,"isPercent":true};
       this.mConfigObject[15] = {"key":15,"name":"闪避几率","fixed":45,"fixedPercent":46,"sumPercent":47,"isPercent":true};
       this.mConfigObject[16] = {"key":16,"name":"最大血量","fixed":48,"fixedPercent":49,"sumPercent":50,"isPercent":false};
       this.mConfigObject[17] = {"key":17,"name":"子弹移速","fixed":51,"fixedPercent":52,"sumPercent":53,"isPercent":true};
       this.mConfigObject[18] = {"key":18,"name":"当前血量","fixed":-1,"fixedPercent":-1,"sumPercent":-1,"isPercent":false};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IAttrCalcRelevanceStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IAttrCalcRelevanceStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_AttrCalcRelevance:AttrCalcRelevance = new AttrCalcRelevance();