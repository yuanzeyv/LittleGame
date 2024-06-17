export interface ICheatPkerStruct{
   /*
   key名:Key
   描述:选项框ID
   */
   'Key': number;
   /*
   key名:Name
   描述:名称
   */
   'Name': string;
   /*
   key名:Type
   描述:1:选项框
      *:2:输入框
      *:3:多选框
      *:4:单选框
   */
   'Type': string;
   /*
   key名:Desc
   描述:描述
   */
   'Desc': string;
   /*
   key名:MultBoxFrameArray
   描述:多选框内容
   */
   'MultBoxFrameArray': {Str:string;ID:number;}[];
   /*
   key名:JudgeDefaultStatus
   描述:开关默认值
   */
   'JudgeDefaultStatus': boolean;
   /*
   key名:DefaultCheck
   描述:默认选项框选择ID
   */
   'DefaultCheck': number[];
   /*
   key名:DisableCheckBox
   描述:禁用的选项框，与强行触摸弹出的提示
   */
   'DisableCheckBox': {ID:number;Tips:string;}[];
};
class CheatPker{
   private mConfigObject:{[key:number]:ICheatPkerStruct}  = {};
   private mConfigArray:ICheatPkerStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"总开关","Type":"1","Desc":"在总开关被关闭时，程序无法跳转到微信","MultBoxFrameArray":[],"JudgeDefaultStatus":true,"DefaultCheck":[],"DisableCheckBox":[]};
       this.mConfigObject[2] = {"Key":2,"Name":"防封开关","Type":"1","Desc":"用于打开游戏的防封功能","MultBoxFrameArray":[],"JudgeDefaultStatus":true,"DefaultCheck":[],"DisableCheckBox":[]};
       this.mConfigObject[3] = {"Key":3,"Name":"浮窗开关","Type":"1","Desc":"浮窗开关","MultBoxFrameArray":[],"JudgeDefaultStatus":true,"DefaultCheck":[],"DisableCheckBox":[]};
       this.mConfigObject[4] = {"Key":4,"Name":"指定群名","Type":"2","Desc":"输入指定的群名称","MultBoxFrameArray":[],"JudgeDefaultStatus":false,"DefaultCheck":[],"DisableCheckBox":[]};
       this.mConfigObject[5] = {"Key":5,"Name":"指定金额","Type":"2","Desc":"输入指定的人数金额","MultBoxFrameArray":[],"JudgeDefaultStatus":false,"DefaultCheck":[],"DisableCheckBox":[]};
       this.mConfigObject[6] = {"Key":6,"Name":"指定人数","Type":"2","Desc":"输入指定的人数","MultBoxFrameArray":[],"JudgeDefaultStatus":false,"DefaultCheck":[],"DisableCheckBox":[]};
       this.mConfigObject[7] = {"Key":7,"Name":"玩法设置","Type":"3","Desc":"本次针对的游戏玩法","MultBoxFrameArray":[{"Str":"\"牛一\"","ID":0},{"Str":"\"牛二\"","ID":1},{"Str":"\"牛三\"","ID":2},{"Str":"\"牛四\"","ID":3},{"Str":"\"牛五\"","ID":4},{"Str":"\"牛六\"","ID":5},{"Str":"\"牛七\"","ID":6},{"Str":"\"牛八\"","ID":7},{"Str":"\"牛九\"","ID":8},{"Str":"\"牛牛\"","ID":9}],"JudgeDefaultStatus":false,"DefaultCheck":[0],"DisableCheckBox":[]};
       this.mConfigObject[8] = {"Key":8,"Name":"尾数设置","Type":"3","Desc":"显示几位","MultBoxFrameArray":[{"Str":"\"一位\"","ID":0},{"Str":"\"二位\"","ID":1},{"Str":"\"三位\"","ID":2}],"JudgeDefaultStatus":false,"DefaultCheck":[1],"DisableCheckBox":[{"ID":0,"Tips":"\"该功能(一位)暂未开发\""},{"ID":0,"Tips":"\"该功能(二位)暂未开发\""}]};
       this.mConfigObject[9] = {"Key":9,"Name":"增强设置","Type":"3","Desc":"增强模式","MultBoxFrameArray":[{"Str":"\"豹子\"","ID":0},{"Str":"\"顺子\"","ID":1},{"Str":"\"对子\"","ID":2}],"JudgeDefaultStatus":false,"DefaultCheck":[0],"DisableCheckBox":[]};
       this.mConfigObject[10] = {"Key":10,"Name":"抢包模式","Type":"3","Desc":"抢包模式","MultBoxFrameArray":[{"Str":"\"选择发包\"","ID":0},{"Str":"\"选择抢包\"","ID":1},{"Str":"\"自动提示\"","ID":2}],"JudgeDefaultStatus":false,"DefaultCheck":[0],"DisableCheckBox":[{"ID":1,"Tips":"\"该功能(选择抢包)暂未开发\""},{"ID":2,"Tips":"\"该功能(自动提示)暂未开发\""}]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): ICheatPkerStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<ICheatPkerStruct>>{
       return this.mConfigArray;
   }
}
export let CheatPkerConfig:CheatPker = new CheatPker();