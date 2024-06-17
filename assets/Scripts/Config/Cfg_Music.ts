export interface IMusicStruct{
   /*
   key名:key
   描述:音乐ID值
   */
   'key': number;
   /*
   key名:Desc
   描述:音乐文本描述
   */
   'Desc': string;
   /*
   key名:AudioType
   描述:音乐类型 1:音乐（将会循环） 2:音效 （立即进行可控播放）
   */
   'AudioType': number;
   /*
   key名:path
   描述:音乐路径
   */
   'path': string;
};
class Music{
   private mConfigObject:{[key:number]:IMusicStruct}  = {};
   private mConfigArray:IMusicStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"key":1,"Desc":"通用点击音效","AudioType":2,"path":"crowned1"};
       this.mConfigObject[2] = {"key":2,"Desc":"BGM","AudioType":1,"path":"crowned1"};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IMusicStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IMusicStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_Music:Music = new Music();