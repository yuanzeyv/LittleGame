export interface IAutoBuildStruct{
   /*
   key名:Key
   描述:怪物的唯一ID
   */
   'Key': number;
   /*
   key名:StartTime
   描述:开启的时间
   */
   'StartTime': number;
   /*
   key名:EndTime
   描述:最终的时间
   */
   'EndTime': number;
   /*
   key名:ActionArray
   描述:对应的行为数组
   */
   'ActionArray': {Weight:number;Action:number[];}[];
};
class AutoBuild{
   private mConfigObject:{[key:number]:IAutoBuildStruct}  = {};
   private mConfigArray:IAutoBuildStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"StartTime":0,"EndTime":30,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[2] = {"Key":2,"StartTime":30,"EndTime":60,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[3] = {"Key":3,"StartTime":60,"EndTime":90,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":90,"EndTime":120,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":120,"EndTime":150,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":150,"EndTime":180,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":180,"EndTime":210,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":210,"EndTime":240,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":270,"EndTime":300,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":300,"EndTime":330,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":330,"EndTime":360,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
       this.mConfigObject[4] = {"Key":4,"StartTime":360,"EndTime":99999999,"ActionArray":[{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]},{"Weight":10,"Action":[5,6,1,2,3,4]}]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IAutoBuildStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IAutoBuildStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_AutoBuild:AutoBuild = new AutoBuild();