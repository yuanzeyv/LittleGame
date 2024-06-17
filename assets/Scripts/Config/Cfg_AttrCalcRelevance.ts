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
       this.mConfigObject[1] = {"key":1,"name":"生命","fixed":1,"fixedPercent":2,"sumPercent":3,"isPercent":false};
       this.mConfigObject[2] = {"key":2,"name":"速度","fixed":4,"fixedPercent":5,"sumPercent":6,"isPercent":false};
       this.mConfigObject[3] = {"key":3,"name":"攻击","fixed":7,"fixedPercent":8,"sumPercent":9,"isPercent":false};
       this.mConfigObject[4] = {"key":4,"name":"防御","fixed":10,"fixedPercent":11,"sumPercent":12,"isPercent":false};
       this.mConfigObject[5] = {"key":5,"name":"吸血","fixed":13,"fixedPercent":14,"sumPercent":15,"isPercent":true};
       this.mConfigObject[6] = {"key":6,"name":"反击","fixed":16,"fixedPercent":17,"sumPercent":18,"isPercent":true};
       this.mConfigObject[7] = {"key":7,"name":"连击","fixed":19,"fixedPercent":20,"sumPercent":21,"isPercent":true};
       this.mConfigObject[8] = {"key":8,"name":"爆伤","fixed":22,"fixedPercent":23,"sumPercent":24,"isPercent":true};
       this.mConfigObject[9] = {"key":9,"name":"闪避","fixed":25,"fixedPercent":26,"sumPercent":27,"isPercent":true};
       this.mConfigObject[10] = {"key":10,"name":"暴击","fixed":28,"fixedPercent":29,"sumPercent":30,"isPercent":true};
       this.mConfigObject[11] = {"key":11,"name":"击晕","fixed":31,"fixedPercent":32,"sumPercent":33,"isPercent":true};
       this.mConfigObject[12] = {"key":12,"name":"最终伤害","fixed":34,"fixedPercent":35,"sumPercent":36,"isPercent":true};
       this.mConfigObject[13] = {"key":13,"name":"抗吸血","fixed":37,"fixedPercent":38,"sumPercent":39,"isPercent":true};
       this.mConfigObject[14] = {"key":14,"name":"抗反击","fixed":40,"fixedPercent":41,"sumPercent":42,"isPercent":true};
       this.mConfigObject[15] = {"key":15,"name":"抗连击","fixed":43,"fixedPercent":44,"sumPercent":45,"isPercent":true};
       this.mConfigObject[16] = {"key":16,"name":"抗爆伤","fixed":46,"fixedPercent":47,"sumPercent":48,"isPercent":true};
       this.mConfigObject[17] = {"key":17,"name":"抗闪避","fixed":49,"fixedPercent":50,"sumPercent":51,"isPercent":true};
       this.mConfigObject[18] = {"key":18,"name":"抗暴击","fixed":52,"fixedPercent":53,"sumPercent":54,"isPercent":true};
       this.mConfigObject[19] = {"key":19,"name":"抗击晕","fixed":55,"fixedPercent":56,"sumPercent":57,"isPercent":true};
       this.mConfigObject[20] = {"key":20,"name":"最终减伤","fixed":58,"fixedPercent":59,"sumPercent":60,"isPercent":true};
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