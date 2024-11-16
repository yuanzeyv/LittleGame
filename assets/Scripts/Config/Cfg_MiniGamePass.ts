export interface IMiniGamePassStruct{
   /*
   key名:Key
   描述:关卡唯一ID
   */
   'Key': number;
   /*
   key名:ChapterID
   描述:关卡ID
   */
   'ChapterID': number;
   /*
   key名:ChapterCellID
   描述:关卡子ID
   */
   'ChapterCellID': number;
   /*
   key名:ChapterName
   描述:章节名称
   */
   'ChapterName': string;
   /*
   key名:ConditionLevel
   描述:开启等级
   */
   'ConditionLevel': number;
   /*
   key名:ConditionLevelDesc
   描述:未通关描述
   */
   'ConditionLevelDesc': string;
   /*
   key名:AddItem
   描述:通关奖励
   */
   'AddItem': {k:number;v:number;}[];
   /*
   key名:ChapterCellName
   描述:子关卡名称
   */
   'ChapterCellName': string;
   /*
   key名:NightmareInfo
   描述:梦魇数据信息
   */
   'NightmareInfo': {ID:number;X:number;Y:number;};
   /*
   key名:PlayerInfoArr
   描述:玩家初始位置信息
   */
   'PlayerInfoArr': {ID:number;X:number;Y:number;}[];
   /*
   key名:MapInfo
   描述:地图路径
   */
   'MapInfo': string;
   /*
   key名:MonsterSpine
   描述:怪物的Spine路径
   */
   'MonsterSpine': string;
   /*
   key名:SpineOffset
   描述:spine的偏移
   */
   'SpineOffset': {X:number;Y:number;};
   /*
   key名:SpineScale
   描述:spine的缩放
   */
   'SpineScale': number;
};
class MiniGamePass{
   private mConfigObject:{[key:number]:IMiniGamePassStruct}  = {};
   private mConfigArray:IMiniGamePassStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"ChapterID":1,"ChapterCellID":1,"ChapterName":"第一章","ConditionLevel":1,"ConditionLevelDesc":"达到养心境开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第一关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":1};
       this.mConfigObject[2] = {"Key":2,"ChapterID":1,"ChapterCellID":2,"ChapterName":"第一章","ConditionLevel":1,"ConditionLevelDesc":"达到养心境开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第二关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":1};
       this.mConfigObject[3] = {"Key":3,"ChapterID":1,"ChapterCellID":3,"ChapterName":"第一章","ConditionLevel":1,"ConditionLevelDesc":"达到养心境开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第三关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":2};
       this.mConfigObject[4] = {"Key":4,"ChapterID":1,"ChapterCellID":4,"ChapterName":"第一章","ConditionLevel":1,"ConditionLevelDesc":"达到养心境开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第四关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":2};
       this.mConfigObject[5] = {"Key":5,"ChapterID":2,"ChapterCellID":1,"ChapterName":"第二章","ConditionLevel":2,"ConditionLevelDesc":"达到与许敬开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第一关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":1};
       this.mConfigObject[6] = {"Key":6,"ChapterID":2,"ChapterCellID":2,"ChapterName":"第二章","ConditionLevel":2,"ConditionLevelDesc":"达到养心境开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第二关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":1};
       this.mConfigObject[7] = {"Key":7,"ChapterID":2,"ChapterCellID":3,"ChapterName":"第二章","ConditionLevel":2,"ConditionLevelDesc":"达到养心境开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第三关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":2};
       this.mConfigObject[8] = {"Key":8,"ChapterID":2,"ChapterCellID":4,"ChapterName":"第二章","ConditionLevel":2,"ConditionLevelDesc":"达到养心境开启","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第四关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":2};
       this.mConfigObject[9] = {"Key":9,"ChapterID":3,"ChapterCellID":1,"ChapterName":"第三章","ConditionLevel":100,"ConditionLevelDesc":"达到话神经卡其","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第一关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":1};
       this.mConfigObject[10] = {"Key":10,"ChapterID":3,"ChapterCellID":2,"ChapterName":"第三章","ConditionLevel":100,"ConditionLevelDesc":"达到话神经卡其","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第二关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":1};
       this.mConfigObject[11] = {"Key":11,"ChapterID":3,"ChapterCellID":3,"ChapterName":"第三章","ConditionLevel":100,"ConditionLevelDesc":"达到话神经卡其","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第三关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":2};
       this.mConfigObject[12] = {"Key":12,"ChapterID":3,"ChapterCellID":4,"ChapterName":"第三章","ConditionLevel":100,"ConditionLevelDesc":"达到话神经卡其","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第四关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":2};
       this.mConfigObject[13] = {"Key":13,"ChapterID":4,"ChapterCellID":1,"ChapterName":"第四章","ConditionLevel":200,"ConditionLevelDesc":"达到话神经卡其","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第一关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":1};
       this.mConfigObject[14] = {"Key":14,"ChapterID":4,"ChapterCellID":2,"ChapterName":"第四章","ConditionLevel":200,"ConditionLevelDesc":"达到话神经卡其","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第二关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":1};
       this.mConfigObject[15] = {"Key":15,"ChapterID":4,"ChapterCellID":3,"ChapterName":"第四章","ConditionLevel":200,"ConditionLevelDesc":"达到话神经卡其","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第三关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":50,"Y":0},"SpineScale":2};
       this.mConfigObject[16] = {"Key":16,"ChapterID":4,"ChapterCellID":4,"ChapterName":"第四章","ConditionLevel":200,"ConditionLevelDesc":"达到16级解锁","AddItem":[{"k":4,"v":8}],"ChapterCellName":"第四关","NightmareInfo":{"ID":1,"X":1,"Y":1},"PlayerInfoArr":[{"ID":1,"X":1,"Y":1}],"MapInfo":"Map_1","MonsterSpine":"lingshou017","SpineOffset":{"X":0,"Y":50},"SpineScale":2};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IMiniGamePassStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IMiniGamePassStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_MiniGamePass:MiniGamePass = new MiniGamePass();