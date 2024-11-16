export interface IMiniGameChooseStruct{
   /*
   key名:Key
   描述:怪物的唯一ID
   */
   'Key': number;
   /*
   key名:IsOpen
   描述:是否开启
   */
   'IsOpen': boolean;
   /*
   key名:TipsMsg
   描述:提示消息
   */
   'TipsMsg': string;
   /*
   key名:Name
   描述:小游戏名称
   */
   'Name': string;
   /*
   key名:TitleImage
   描述:对应的图片信息
   */
   'TitleImage': string;
};
class MiniGameChoose{
   private mConfigObject:{[key:number]:IMiniGameChooseStruct}  = {};
   private mConfigArray:IMiniGameChooseStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"IsOpen":true,"TipsMsg":"NULL","Name":"梦魇惊魂","TitleImage":"Cell_1"};
       this.mConfigObject[2] = {"Key":2,"IsOpen":true,"TipsMsg":"NULL","Name":"仙途传说","TitleImage":"Cell_2"};
       this.mConfigObject[3] = {"Key":3,"IsOpen":false,"TipsMsg":"敬请期待","Name":"未知的小游戏","TitleImage":"ComingSoon"};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IMiniGameChooseStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IMiniGameChooseStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_MiniGameChoose:MiniGameChoose = new MiniGameChoose();