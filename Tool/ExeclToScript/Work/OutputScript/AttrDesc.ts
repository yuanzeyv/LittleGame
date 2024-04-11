export interface IAttrDescStruct{
   /*
   key名:Key
   描述:属性的Key
   */
   'Key': number;
   /*
   key名:Name
   描述:属性名称
   */
   'Name': string;
   /*
   key名:Desc
   描述:属性的描述
   */
   'Desc': string;
};
class AttrDesc{
   private mConfigObject:{[key:number]:IAttrDescStruct}  = {};
   private mConfigArray:IAttrDescStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[0] = {"Key":0,"Name":"伤害","Desc":"无"};
       this.mConfigObject[1] = {"Key":1,"Name":"伤害加成","Desc":"无"};
       this.mConfigObject[2] = {"Key":2,"Name":"伤害加成.终","Desc":"无"};
       this.mConfigObject[3] = {"Key":3,"Name":"护甲","Desc":"无"};
       this.mConfigObject[4] = {"Key":4,"Name":"护甲加成","Desc":"无"};
       this.mConfigObject[5] = {"Key":5,"Name":"护甲加成.终","Desc":"无"};
       this.mConfigObject[6] = {"Key":6,"Name":"反应","Desc":"无"};
       this.mConfigObject[7] = {"Key":7,"Name":"反应加成","Desc":"无"};
       this.mConfigObject[8] = {"Key":8,"Name":"反应加成.终","Desc":"无"};
       this.mConfigObject[9] = {"Key":9,"Name":"生命","Desc":"无"};
       this.mConfigObject[10] = {"Key":10,"Name":"生命加成","Desc":"无"};
       this.mConfigObject[11] = {"Key":11,"Name":"生命加成.终","Desc":"无"};
       this.mConfigObject[12] = {"Key":12,"Name":"闪避","Desc":"无"};
       this.mConfigObject[13] = {"Key":13,"Name":"闪避加成","Desc":"无"};
       this.mConfigObject[14] = {"Key":14,"Name":"闪避加成.终","Desc":"无"};
       this.mConfigObject[15] = {"Key":15,"Name":"命中","Desc":"无"};
       this.mConfigObject[16] = {"Key":16,"Name":"命中加成","Desc":"无"};
       this.mConfigObject[17] = {"Key":17,"Name":"命中加成.终","Desc":"无"};
       this.mConfigObject[18] = {"Key":18,"Name":"暴击","Desc":"无"};
       this.mConfigObject[19] = {"Key":19,"Name":"暴击加成","Desc":"无"};
       this.mConfigObject[20] = {"Key":20,"Name":"暴击加成.终","Desc":"无"};
       this.mConfigObject[21] = {"Key":21,"Name":"抗暴","Desc":"无"};
       this.mConfigObject[22] = {"Key":22,"Name":"抗暴加成","Desc":"无"};
       this.mConfigObject[23] = {"Key":23,"Name":"抗暴加成.终","Desc":"无"};
       this.mConfigObject[24] = {"Key":24,"Name":"反击","Desc":"无"};
       this.mConfigObject[25] = {"Key":25,"Name":"反击加成","Desc":"无"};
       this.mConfigObject[26] = {"Key":26,"Name":"反击加成.终","Desc":"无"};
       this.mConfigObject[27] = {"Key":27,"Name":"抗反","Desc":"无"};
       this.mConfigObject[28] = {"Key":28,"Name":"抗反加成","Desc":"无"};
       this.mConfigObject[29] = {"Key":29,"Name":"抗反加成.终","Desc":"无"};
       this.mConfigObject[30] = {"Key":30,"Name":"爆伤","Desc":"无"};
       this.mConfigObject[31] = {"Key":31,"Name":"爆伤加成","Desc":"无"};
       this.mConfigObject[32] = {"Key":32,"Name":"爆伤加成.终","Desc":"无"};
       this.mConfigObject[33] = {"Key":33,"Name":"抗爆伤","Desc":"无"};
       this.mConfigObject[34] = {"Key":34,"Name":"抗爆伤加成","Desc":"无"};
       this.mConfigObject[35] = {"Key":35,"Name":"抗暴伤加成.终","Desc":"无"};
       this.mConfigObject[36] = {"Key":36,"Name":"连击","Desc":"无"};
       this.mConfigObject[37] = {"Key":37,"Name":"连击加成","Desc":"无"};
       this.mConfigObject[38] = {"Key":38,"Name":"连击加成.终","Desc":"无"};
       this.mConfigObject[39] = {"Key":39,"Name":"抗连","Desc":"无"};
       this.mConfigObject[40] = {"Key":40,"Name":"抗连加成","Desc":"无"};
       this.mConfigObject[41] = {"Key":41,"Name":"抗连加成.终","Desc":"无"};
       this.mConfigObject[42] = {"Key":42,"Name":"吸血","Desc":"无"};
       this.mConfigObject[43] = {"Key":43,"Name":"吸血加成","Desc":"无"};
       this.mConfigObject[44] = {"Key":44,"Name":"吸血加成.终","Desc":"无"};
       this.mConfigObject[45] = {"Key":45,"Name":"抗吸","Desc":"无"};
       this.mConfigObject[46] = {"Key":46,"Name":"抗吸加成","Desc":"无"};
       this.mConfigObject[47] = {"Key":47,"Name":"抗吸加成.终","Desc":"无"};
       this.mConfigObject[100] = {"Key":100,"Name":"攻击力","Desc":"无"};
       this.mConfigObject[101] = {"Key":101,"Name":"防御力","Desc":"无"};
       this.mConfigObject[102] = {"Key":102,"Name":"血量上限","Desc":"无"};
       this.mConfigObject[103] = {"Key":103,"Name":"速度","Desc":"无"};
       this.mConfigObject[104] = {"Key":104,"Name":"血量","Desc":"无"};
       this.mConfigObject[106] = {"Key":106,"Name":"闪避率","Desc":"无"};
       this.mConfigObject[107] = {"Key":107,"Name":"命中率","Desc":"无"};
       this.mConfigObject[108] = {"Key":108,"Name":"暴击率","Desc":"无"};
       this.mConfigObject[109] = {"Key":109,"Name":"抗爆剂率","Desc":"无"};
       this.mConfigObject[110] = {"Key":110,"Name":"反击率","Desc":"无"};
       this.mConfigObject[111] = {"Key":111,"Name":"抗反及率","Desc":"无"};
       this.mConfigObject[112] = {"Key":112,"Name":"爆伤率","Desc":"无"};
       this.mConfigObject[113] = {"Key":113,"Name":"抗爆伤率","Desc":"无"};
       this.mConfigObject[114] = {"Key":114,"Name":"连击率","Desc":"无"};
       this.mConfigObject[115] = {"Key":115,"Name":"抗连击率","Desc":"无"};
       this.mConfigObject[116] = {"Key":116,"Name":"攻击吸血率","Desc":"无"};
       this.mConfigObject[117] = {"Key":117,"Name":"抗攻击吸血率","Desc":"无"};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IAttrDescStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IAttrDescStruct>>{
       return this.mConfigArray;
   }
}
export let AttrDescConfig:AttrDesc = new AttrDesc();