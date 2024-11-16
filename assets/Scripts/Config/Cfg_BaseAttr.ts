export interface IBaseAttrStruct{
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
};
class BaseAttr{
   private mConfigObject:{[key:number]:IBaseAttrStruct}  = {};
   private mConfigArray:IBaseAttrStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[0] = {"Key":0,"Name":"物理攻击力"};
       this.mConfigObject[1] = {"Key":1,"Name":"物理攻击力百分比"};
       this.mConfigObject[2] = {"Key":2,"Name":"物理攻击力最终百分比"};
       this.mConfigObject[3] = {"Key":3,"Name":"魔法攻击力"};
       this.mConfigObject[4] = {"Key":4,"Name":"魔法攻击力百分比"};
       this.mConfigObject[5] = {"Key":5,"Name":"魔法攻击力最终百分比"};
       this.mConfigObject[6] = {"Key":6,"Name":"物理防御力"};
       this.mConfigObject[7] = {"Key":7,"Name":"物理防御力百分比加成"};
       this.mConfigObject[8] = {"Key":8,"Name":"物理防御力百分比最终加成"};
       this.mConfigObject[9] = {"Key":9,"Name":"魔法防御力"};
       this.mConfigObject[10] = {"Key":10,"Name":"魔法防御力百分比加成"};
       this.mConfigObject[11] = {"Key":11,"Name":"魔法防御力百分比最终加成"};
       this.mConfigObject[12] = {"Key":12,"Name":"护甲穿透"};
       this.mConfigObject[13] = {"Key":13,"Name":"护甲穿透百分比加成"};
       this.mConfigObject[14] = {"Key":14,"Name":"护甲穿透百分比最终加成"};
       this.mConfigObject[15] = {"Key":15,"Name":"魔法穿透"};
       this.mConfigObject[16] = {"Key":16,"Name":"魔法穿透百分比加成"};
       this.mConfigObject[17] = {"Key":17,"Name":"魔法穿透最终百分比加成"};
       this.mConfigObject[18] = {"Key":18,"Name":"最终减伤"};
       this.mConfigObject[19] = {"Key":19,"Name":"最终减伤百分比加成"};
       this.mConfigObject[20] = {"Key":20,"Name":"最终减伤百分比最终加成"};
       this.mConfigObject[21] = {"Key":21,"Name":"最终增伤"};
       this.mConfigObject[22] = {"Key":22,"Name":"最终增伤百分比加成"};
       this.mConfigObject[23] = {"Key":23,"Name":"最终增上百分比最终加成"};
       this.mConfigObject[24] = {"Key":24,"Name":"爆伤加成"};
       this.mConfigObject[25] = {"Key":25,"Name":"最终爆伤百分比加成"};
       this.mConfigObject[26] = {"Key":26,"Name":"最终爆伤百分比最终加成"};
       this.mConfigObject[27] = {"Key":27,"Name":"爆伤抵抗"};
       this.mConfigObject[28] = {"Key":28,"Name":"爆伤抵抗百分比加成"};
       this.mConfigObject[29] = {"Key":29,"Name":"爆伤抵抗百分比最终加成"};
       this.mConfigObject[30] = {"Key":30,"Name":"移动速度"};
       this.mConfigObject[31] = {"Key":31,"Name":"移动速度百分比加成"};
       this.mConfigObject[32] = {"Key":32,"Name":"移动速度最终加成"};
       this.mConfigObject[33] = {"Key":33,"Name":"攻击速度"};
       this.mConfigObject[34] = {"Key":34,"Name":"攻击速度百分比加成"};
       this.mConfigObject[35] = {"Key":35,"Name":"攻击速度百分比最终加成"};
       this.mConfigObject[36] = {"Key":36,"Name":"暴击几率"};
       this.mConfigObject[37] = {"Key":37,"Name":"暴击几率百分比加成"};
       this.mConfigObject[38] = {"Key":38,"Name":"暴击几率百分比最终加成"};
       this.mConfigObject[39] = {"Key":39,"Name":"抗暴击几率"};
       this.mConfigObject[40] = {"Key":40,"Name":"抗暴击几率百分比加成"};
       this.mConfigObject[41] = {"Key":41,"Name":"抗暴击几率最终百分比加成"};
       this.mConfigObject[42] = {"Key":42,"Name":"命中几率"};
       this.mConfigObject[43] = {"Key":43,"Name":"命中几率百分比加成"};
       this.mConfigObject[44] = {"Key":44,"Name":"命中几率最终百分比加成"};
       this.mConfigObject[45] = {"Key":45,"Name":"闪避几率"};
       this.mConfigObject[46] = {"Key":46,"Name":"闪避几率百分比加成"};
       this.mConfigObject[47] = {"Key":47,"Name":"闪避几率百分比最终加成"};
       this.mConfigObject[48] = {"Key":48,"Name":"玩家最大血量"};
       this.mConfigObject[49] = {"Key":49,"Name":"玩家最大血量百分比加成"};
       this.mConfigObject[50] = {"Key":50,"Name":"玩家最大血量百分比最终加成"};
       this.mConfigObject[51] = {"Key":51,"Name":"玩家子弹移速"};
       this.mConfigObject[52] = {"Key":52,"Name":"玩家百分比子弹移速"};
       this.mConfigObject[53] = {"Key":53,"Name":"玩家百分比子弹移速"};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IBaseAttrStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IBaseAttrStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_BaseAttr:BaseAttr = new BaseAttr();