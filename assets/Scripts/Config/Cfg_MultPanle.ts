export interface IMultPanleStruct{
   /*
   key名:key
   描述:唯一键
   */
   'key': number;
   /*
   key名:desc
   描述:面板描述
   */
   'desc': string;
   /*
   key名:title
   描述:窗口Title
   */
   'title': string;
   /*
   key名:btnName
   描述:按钮名称
   */
   'btnName': string;
   /*
   key名:type
   描述:面板类型(1:多面板类型 2:一级面板类型 3:二级面板类型)
   */
   'type': number;
   /*
   key名:childWindow
   描述:面板包含的子集
   */
   'childWindow': number[];
};
class MultPanle{
   private mConfigObject:{[key:number]:IMultPanleStruct}  = {};
   private mConfigArray:IMultPanleStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"key":1,"desc":"登录窗口用多面板界面","title":"多窗口测试面板","btnName":"AAAAA","type":1,"childWindow":[2,3,4,5]};
       this.mConfigObject[2] = {"key":2,"desc":"隐私协议面板","title":"隐私协议","btnName":"隐私协议","type":2,"childWindow":[]};
       this.mConfigObject[3] = {"key":3,"desc":"年龄面板","title":"适龄协议","btnName":"适龄协议","type":2,"childWindow":[]};
       this.mConfigObject[4] = {"key":4,"desc":"游戏公告面板","title":"游戏公告","btnName":"游戏公告","type":2,"childWindow":[6,7]};
       this.mConfigObject[5] = {"key":5,"desc":"游戏协议面板","title":"游玩协议","btnName":"游玩协议","type":2,"childWindow":[]};
       this.mConfigObject[6] = {"key":6,"desc":"游戏公告","title":"游戏时报","btnName":"游戏时报","type":3,"childWindow":[]};
       this.mConfigObject[7] = {"key":7,"desc":"防沉迷公告","title":"防沉迷公告","btnName":"防沉迷公告","type":3,"childWindow":[]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IMultPanleStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IMultPanleStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_MultPanle:MultPanle = new MultPanle();