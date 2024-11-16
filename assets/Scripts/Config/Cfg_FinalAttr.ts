export interface IFinalAttrStruct{
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
   key名:RecoverColliderID
   描述:是否属于回复类型
   */
   'RecoverColliderID': number;
};
class FinalAttr{
   private mConfigObject:{[key:number]:IFinalAttrStruct}  = {};
   private mConfigArray:IFinalAttrStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[0] = {"Key":0,"Name":"玩家的物理攻击力","RecoverColliderID":0};
       this.mConfigObject[1] = {"Key":1,"Name":"玩家的魔法攻击力","RecoverColliderID":0};
       this.mConfigObject[2] = {"Key":2,"Name":"玩家的物理防御力","RecoverColliderID":0};
       this.mConfigObject[3] = {"Key":3,"Name":"玩家的魔法防御力","RecoverColliderID":0};
       this.mConfigObject[4] = {"Key":4,"Name":"护甲穿透","RecoverColliderID":0};
       this.mConfigObject[5] = {"Key":5,"Name":"魔抗穿透","RecoverColliderID":0};
       this.mConfigObject[6] = {"Key":6,"Name":"减伤属性","RecoverColliderID":0};
       this.mConfigObject[7] = {"Key":7,"Name":"增伤属性","RecoverColliderID":0};
       this.mConfigObject[8] = {"Key":8,"Name":"爆伤抵抗","RecoverColliderID":0};
       this.mConfigObject[9] = {"Key":9,"Name":"爆伤加成","RecoverColliderID":0};
       this.mConfigObject[10] = {"Key":10,"Name":"玩家的体型大小","RecoverColliderID":0};
       this.mConfigObject[11] = {"Key":11,"Name":"玩家的移动速度","RecoverColliderID":0};
       this.mConfigObject[12] = {"Key":12,"Name":"玩家的射击速度","RecoverColliderID":0};
       this.mConfigObject[13] = {"Key":13,"Name":"玩家的暴击几率","RecoverColliderID":0};
       this.mConfigObject[14] = {"Key":14,"Name":"玩家的抗暴击几率","RecoverColliderID":0};
       this.mConfigObject[15] = {"Key":15,"Name":"玩家的命中几率","RecoverColliderID":0};
       this.mConfigObject[16] = {"Key":16,"Name":"玩家的闪避几率","RecoverColliderID":0};
       this.mConfigObject[17] = {"Key":17,"Name":"玩家的护盾回复","RecoverColliderID":1};
       this.mConfigObject[18] = {"Key":18,"Name":"玩家的血量回复","RecoverColliderID":1};
       this.mConfigObject[19] = {"Key":19,"Name":"玩家的最大护盾","RecoverColliderID":0};
       this.mConfigObject[20] = {"Key":20,"Name":"玩家的最大血量","RecoverColliderID":0};
       this.mConfigObject[21] = {"Key":21,"Name":"玩家的血量","RecoverColliderID":0};
       this.mConfigObject[22] = {"Key":22,"Name":"玩家的护盾","RecoverColliderID":0};
       this.mConfigObject[23] = {"Key":23,"Name":"玩家的子弹速度","RecoverColliderID":0};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IFinalAttrStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IFinalAttrStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_FinalAttr:FinalAttr = new FinalAttr();