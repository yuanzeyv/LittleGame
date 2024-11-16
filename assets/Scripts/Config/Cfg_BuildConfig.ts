export interface IBuildConfigStruct{
   /*
   key名:Key
   描述:ID
   */
   'Key': number;
   /*
   key名:RigidID
   描述:怪物刚体属性
   */
   'RigidID': number;
   /*
   key名:Level
   描述:建筑等级
   */
   'Level': number;
   /*
   key名:Name
   描述:建筑物名称
   */
   'Name': string;
   /*
   key名:Desc
   描述:建筑物描述
   */
   'Desc': string;
   /*
   key名:UpLevelCondition
   描述:升级条件
   */
   'UpLevelCondition': number[];
   /*
   key名:UpLevelCost
   描述:消耗
   */
   'UpLevelCost': {ID:number;Num:number;}[];
   /*
   key名:GenBuilding
   描述:生成的建筑物ID
   */
   'GenBuilding': number;
   /*
   key名:AddtionAttr
   描述:增加的属性信息
   */
   'AddtionAttr': {k:number;v:number;}[];
   /*
   key名:CanDestory
   描述:是否可以销毁
   */
   'CanDestory': boolean;
   /*
   key名:DestoryAward
   描述:销毁奖励
   */
   'DestoryAward': {ID:number;Num:number;}[];
   /*
   key名:ChartletImg
   描述:建筑物在游戏内的贴图
   */
   'ChartletImg': string;
   /*
   key名:TopChartletImg
   描述:建筑物在游戏内的上层贴图
   */
   'TopChartletImg': string;
};
class BuildConfig{
   private mConfigObject:{[key:number]:IBuildConfigStruct}  = {};
   private mConfigArray:IBuildConfigStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"RigidID":1,"Level":1,"Name":"炮台-LV1","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":8}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":5}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":8}],"ChartletImg":"Pedesta_1","TopChartletImg":"BroadSword_1"};
       this.mConfigObject[2] = {"Key":2,"RigidID":1,"Level":2,"Name":"炮台-LV2","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":16}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":7}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"Pedesta_2","TopChartletImg":"BroadSword_2"};
       this.mConfigObject[3] = {"Key":3,"RigidID":1,"Level":3,"Name":"炮台-LV3","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":32}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":10}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"Pedesta_3","TopChartletImg":"BroadSword_3"};
       this.mConfigObject[4] = {"Key":4,"RigidID":1,"Level":4,"Name":"炮台-LV4","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":64}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":15}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":32}],"ChartletImg":"Pedesta_4","TopChartletImg":"BroadSword_4"};
       this.mConfigObject[5] = {"Key":5,"RigidID":1,"Level":5,"Name":"炮台-LV5","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":128}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":20}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":64}],"ChartletImg":"Pedesta_5","TopChartletImg":"BroadSword_5"};
       this.mConfigObject[6] = {"Key":6,"RigidID":1,"Level":6,"Name":"炮台-LV6","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":256}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":25}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":128}],"ChartletImg":"Pedesta_6","TopChartletImg":"BroadSword_6"};
       this.mConfigObject[7] = {"Key":7,"RigidID":1,"Level":7,"Name":"炮台-LV7","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":512}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":30}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":256}],"ChartletImg":"Pedesta_7","TopChartletImg":"BroadSword_7"};
       this.mConfigObject[8] = {"Key":8,"RigidID":1,"Level":8,"Name":"炮台-LV8","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":1024}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":35}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":512}],"ChartletImg":"Pedesta_8","TopChartletImg":"BroadSword_8"};
       this.mConfigObject[9] = {"Key":9,"RigidID":1,"Level":9,"Name":"炮台-LV9","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":2048}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":40}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":1024}],"ChartletImg":"Pedesta_9","TopChartletImg":"BroadSword_9"};
       this.mConfigObject[10] = {"Key":10,"RigidID":1,"Level":10,"Name":"炮台-LV10","Desc":"可以发射子弹，攻击敌人","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":4096}],"GenBuilding":26,"AddtionAttr":[{"k":0,"v":45}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":2048}],"ChartletImg":"Pedesta_10","TopChartletImg":"BroadSword_10"};
       this.mConfigObject[16] = {"Key":16,"RigidID":2,"Level":1,"Name":"房门-LV1","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":8}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":100}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":65536}],"ChartletImg":"Door_1","TopChartletImg":"Door_1"};
       this.mConfigObject[17] = {"Key":17,"RigidID":2,"Level":2,"Name":"房门-LV2","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":16}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":200}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":8}],"ChartletImg":"Door_2","TopChartletImg":"Door_2"};
       this.mConfigObject[18] = {"Key":18,"RigidID":2,"Level":3,"Name":"房门-LV3","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":32}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":300}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"Door_3","TopChartletImg":"Door_3"};
       this.mConfigObject[19] = {"Key":19,"RigidID":2,"Level":4,"Name":"房门-LV4","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":64}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":400}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"Door_4","TopChartletImg":"Door_4"};
       this.mConfigObject[20] = {"Key":20,"RigidID":2,"Level":5,"Name":"房门-LV5","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":128}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":500}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":32}],"ChartletImg":"Door_5","TopChartletImg":"Door_5"};
       this.mConfigObject[21] = {"Key":21,"RigidID":2,"Level":6,"Name":"房门-LV6","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":256}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":600}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":64}],"ChartletImg":"Door_6","TopChartletImg":"Door_6"};
       this.mConfigObject[22] = {"Key":22,"RigidID":2,"Level":7,"Name":"房门-LV7","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":512}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":700}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":128}],"ChartletImg":"Door_7","TopChartletImg":"Door_7"};
       this.mConfigObject[23] = {"Key":23,"RigidID":2,"Level":8,"Name":"房门-LV8","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":1024}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":1000}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":256}],"ChartletImg":"Door_8","TopChartletImg":"Door_8"};
       this.mConfigObject[24] = {"Key":24,"RigidID":2,"Level":9,"Name":"房门-LV9","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":2048}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":1500}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":512}],"ChartletImg":"Door_9","TopChartletImg":"Door_9"};
       this.mConfigObject[25] = {"Key":25,"RigidID":2,"Level":10,"Name":"房门-LV10","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":4096}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":1600}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":1024}],"ChartletImg":"Door_10","TopChartletImg":"Door_10"};
       this.mConfigObject[26] = {"Key":26,"RigidID":2,"Level":11,"Name":"房门-LV11","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":8192}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":1700}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":2048}],"ChartletImg":"Door_11","TopChartletImg":"Door_11"};
       this.mConfigObject[27] = {"Key":27,"RigidID":2,"Level":12,"Name":"房门-LV12","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":16384}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":1800}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":4096}],"ChartletImg":"Door_12","TopChartletImg":"Door_12"};
       this.mConfigObject[28] = {"Key":28,"RigidID":2,"Level":13,"Name":"房门-LV13","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":16384}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":1900}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":8192}],"ChartletImg":"Door_13","TopChartletImg":"Door_13"};
       this.mConfigObject[29] = {"Key":29,"RigidID":2,"Level":14,"Name":"房门-LV14","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":65536}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":2000}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":16384}],"ChartletImg":"Door_14","TopChartletImg":"Door_14"};
       this.mConfigObject[30] = {"Key":30,"RigidID":2,"Level":15,"Name":"房门-LV15","Desc":"阻挡敌人前进的脚步","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":65536}],"GenBuilding":26,"AddtionAttr":[{"k":60,"v":2100}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":32768}],"ChartletImg":"Door_15","TopChartletImg":"Door_15"};
       this.mConfigObject[31] = {"Key":31,"RigidID":3,"Level":1,"Name":"床-LV1","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":8}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":8}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":65536}],"ChartletImg":"Bed_1","TopChartletImg":"Bed_1"};
       this.mConfigObject[32] = {"Key":32,"RigidID":3,"Level":2,"Name":"床-LV2","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":16}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":16}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":65536}],"ChartletImg":"Bed_2","TopChartletImg":"Bed_2"};
       this.mConfigObject[33] = {"Key":33,"RigidID":3,"Level":3,"Name":"床-LV3","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":32}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":32}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":8}],"ChartletImg":"Bed_3","TopChartletImg":"Bed_3"};
       this.mConfigObject[34] = {"Key":34,"RigidID":3,"Level":4,"Name":"床-LV4","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":64}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":64}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"Bed_4","TopChartletImg":"Bed_4"};
       this.mConfigObject[35] = {"Key":35,"RigidID":3,"Level":5,"Name":"床-LV5","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":128}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":128}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"Bed_5","TopChartletImg":"Bed_5"};
       this.mConfigObject[36] = {"Key":36,"RigidID":3,"Level":6,"Name":"床-LV6","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":256}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":256}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":32}],"ChartletImg":"Bed_6","TopChartletImg":"Bed_6"};
       this.mConfigObject[37] = {"Key":37,"RigidID":3,"Level":7,"Name":"床-LV7","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":512}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":512}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":64}],"ChartletImg":"Bed_7","TopChartletImg":"Bed_7"};
       this.mConfigObject[38] = {"Key":38,"RigidID":3,"Level":8,"Name":"床-LV8","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":1024}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":1024}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":128}],"ChartletImg":"Bed_8","TopChartletImg":"Bed_8"};
       this.mConfigObject[39] = {"Key":39,"RigidID":3,"Level":9,"Name":"床-LV9","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":2048}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":1536}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":256}],"ChartletImg":"Bed_9","TopChartletImg":"Bed_9"};
       this.mConfigObject[40] = {"Key":40,"RigidID":3,"Level":10,"Name":"床-LV10","Desc":"增加玩家金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":4096}],"GenBuilding":26,"AddtionAttr":[{"k":63,"v":2048}],"CanDestory":false,"DestoryAward":[{"ID":1,"Num":512}],"ChartletImg":"Bed_10","TopChartletImg":"Bed_10"};
       this.mConfigObject[41] = {"Key":41,"RigidID":4,"Level":1,"Name":"练气塔-LV1","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":8}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":8}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":65536}],"ChartletImg":"CondenserPod_1","TopChartletImg":"CondenserPod_1"};
       this.mConfigObject[42] = {"Key":42,"RigidID":4,"Level":2,"Name":"练气塔-LV2","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":16}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":16}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":65536}],"ChartletImg":"CondenserPod_2","TopChartletImg":"CondenserPod_2"};
       this.mConfigObject[43] = {"Key":43,"RigidID":4,"Level":3,"Name":"练气塔-LV3","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":32}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":32}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":8}],"ChartletImg":"CondenserPod_3","TopChartletImg":"CondenserPod_3"};
       this.mConfigObject[44] = {"Key":44,"RigidID":4,"Level":4,"Name":"练气塔-LV4","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":64}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":64}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"CondenserPod_4","TopChartletImg":"CondenserPod_4"};
       this.mConfigObject[45] = {"Key":45,"RigidID":4,"Level":5,"Name":"练气塔-LV5","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":128}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":128}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":16}],"ChartletImg":"CondenserPod_5","TopChartletImg":"CondenserPod_5"};
       this.mConfigObject[46] = {"Key":46,"RigidID":4,"Level":6,"Name":"练气塔-LV6","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":256}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":256}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":32}],"ChartletImg":"CondenserPod_6","TopChartletImg":"CondenserPod_6"};
       this.mConfigObject[47] = {"Key":47,"RigidID":4,"Level":7,"Name":"练气塔-LV7","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":512}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":512}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":64}],"ChartletImg":"CondenserPod_7","TopChartletImg":"CondenserPod_7"};
       this.mConfigObject[48] = {"Key":48,"RigidID":4,"Level":8,"Name":"练气塔-LV8","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":1024}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":1024}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":128}],"ChartletImg":"CondenserPod_8","TopChartletImg":"CondenserPod_8"};
       this.mConfigObject[49] = {"Key":49,"RigidID":4,"Level":9,"Name":"练气塔-LV9","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":2048}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":1536}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":256}],"ChartletImg":"CondenserPod_9","TopChartletImg":"CondenserPod_9"};
       this.mConfigObject[50] = {"Key":50,"RigidID":4,"Level":10,"Name":"练气塔-LV10","Desc":"快速增加玩家的金币收益","UpLevelCondition":[],"UpLevelCost":[{"ID":1,"Num":4096}],"GenBuilding":52,"AddtionAttr":[{"k":63,"v":2048}],"CanDestory":true,"DestoryAward":[{"ID":1,"Num":512}],"ChartletImg":"CondenserPod_10","TopChartletImg":"CondenserPod_10"};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IBuildConfigStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IBuildConfigStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_BuildConfig:BuildConfig = new BuildConfig();