export interface IBottomListStruct{
   /*
   key名:key
   描述:唯一键
   */
   'key': number;
   /*
   key名:type
   描述:显示类型
   */
   'type': number;
   /*
   key名:sort
   描述:权重
   */
   'sort': number;
   /*
   key名:name
   描述:名称
   */
   'name': string;
   /*
   key名:desc
   描述:文本描述
   */
   'desc': string;
   /*
   key名:rightDesc
   描述:左上角描述
   */
   'rightDesc': string;
   /*
   key名:icon
   描述:图标
   */
   'icon': string;
   /*
   key名:backGround
   描述:背景
   */
   'backGround': string;
};
class BottomList{
   private mConfigObject:{[key:number]:IBottomListStruct}  = {};
   private mConfigArray:IBottomListStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"key":1,"type":1,"sort":1,"name":"道观","desc":"持续产出丰厚资源","rightDesc":"闲置蛙宝:","icon":"dogoateImage","backGround":"blueBack"};
       this.mConfigObject[2] = {"key":2,"type":1,"sort":2,"name":"百宝炉","desc":"抽取参与战斗的法宝","rightDesc":"玄铁精:","icon":"conciseImage","backGround":"yellowBack"};
       this.mConfigObject[3] = {"key":3,"type":1,"sort":3,"name":"开光","desc":"进一步提升装备的基础属性","rightDesc":"开光阶级:","icon":"openingTheLightImage","backGround":"greenBack"};
       this.mConfigObject[4] = {"key":4,"type":1,"sort":4,"name":"道友","desc":"结实道友，开启双修","rightDesc":"待处理消息:","icon":"firendImage","backGround":"RedBack"};
       this.mConfigObject[5] = {"key":5,"type":1,"sort":5,"name":"仓库","desc":"存储各类型道具","rightDesc":"0","icon":"bagImage","backGround":"blueBack"};
       this.mConfigObject[6] = {"key":6,"type":2,"sort":1,"name":"斗法","desc":"获得法相丹，灵髓","rightDesc":"挑战券:","icon":"arenaImage","backGround":"blueBack"};
       this.mConfigObject[7] = {"key":7,"type":2,"sort":2,"name":"魔君","desc":"获得大量小番茄","rightDesc":"扫荡次数:","icon":"killMonsterImage","backGround":"yellowBack"};
       this.mConfigObject[8] = {"key":8,"type":2,"sort":3,"name":"尸祖","desc":"获得唤灵符，灵将口粮","rightDesc":"挑战次数:","icon":"monsterImage","backGround":"greenBack"};
       this.mConfigObject[9] = {"key":9,"type":2,"sort":4,"name":"心魔塔","desc":"获得领悟符箓的仙辰笔","rightDesc":"关卡:","icon":"towerImage","backGround":"RedBack"};
       this.mConfigObject[10] = {"key":10,"type":2,"sort":5,"name":"天师榜","desc":"获得道术符，道数精通","rightDesc":"天师令:","icon":"TaoistMasterImage","backGround":"blueBack"};
       this.mConfigObject[11] = {"key":11,"type":2,"sort":6,"name":"大道争锋","desc":"丰厚奖励，尽在跨服对决","rightDesc":"0","icon":"octagonImage","backGround":"yellowBack"};
       this.mConfigObject[12] = {"key":12,"type":2,"sort":7,"name":"周天斗魔","desc":"抵抗魔王，争夺最强宗门","rightDesc":"0","icon":"clearMonsterImage","backGround":"yellowBack"};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IBottomListStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IBottomListStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_BottomList:BottomList = new BottomList();