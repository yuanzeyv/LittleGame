export interface IPhysicsPlayerStruct{
   /*
   key名:Key
   描述:怪物的唯一ID
   */
   'Key': number;
   /*
   key名:Name
   描述:名称
   */
   'Name': string;
   /*
   key名:Desc
   描述:怪物描述
   */
   'Desc': string;
   /*
   key名:Type
   描述:砖块类型
      *://以下是拥有实体碰撞器的
      *:1:勇士类型
      *:2:梦魇类型
      *:3:房间类型
      *:4:世界类型 
      *:5:障碍物类型
      *:6:建筑物类型
      *:7:建筑物容器类型
      *:8:技能容器
      *://以下是拥有检测碰撞器的
      *:100:范围检测器 
      *:
      *:
   */
   'Type': number;
   /*
   key名:SubType
   描述:Type(1):
      *:1:机器人勇士类型
      *:2:玩家勇士类型
      *:Type(2):
      *:1:机器人梦魇类型
      *:Type(3):
      *:1:通用房间类型
      *:Type(4):
      *:1:通用世界类型
      *:Type(5):
      *:1:通用障碍物类型
      *:Type(6):
      *:1:炮塔建筑物类型
      *:2:床体类型
      *:3:纵向房门建筑物类型 
      *:4:练气塔建筑类型
      *:Type(7):
      *:1:建筑物容器类型
      *:Type(8): 
      *:1:立即攻击范围内的敌人，并造成伤害。
      *:2:立即攻击指定的敌人，并造成伤害。
      *:3:向指定方向移动，当触碰到敌人时，造成伤害，当离开世界时销毁自己。
      *:4:向正前方放置一个形状，之后每秒钟对敌人造成指定伤害。
      *:
      *:Type(101):
      *:1:房门触发器
      *:2:床体触发器
      *:3:摄像头触发器
   */
   'SubType': number;
   /*
   key名:ExtParam
   描述:外部参数:给与玩家一些额外的游戏参数
      *:
      *:24-3:(房门类型，用以标识房门移动方向)
      *:1:纵向移动的房门
      *:2:横向移动的房门
   */
   'ExtParam': number;
   /*
   key名:RigidType
   描述:刚体类型
      *:0:动态刚体
      *:1:静态刚体
      *:2:运动学刚体
   */
   'RigidType': number;
   /*
   key名:IsVector
   描述:是否是容器
   */
   'IsVector': boolean;
   /*
   key名:Body
   描述:角色的身体属性(对应碰撞器的信息)
   */
   'Body': number;
   /*
   key名:Skill
   描述:角色身上自带的技能类型
   */
   'Skill': number[];
   /*
   key名:AttackCollider
   描述:角色身上的攻击碰撞器技能
   */
   'AttackCollider': number[];
   /*
   key名:Attrs
   描述:角色的基本游戏属性
   */
   'Attrs': {k:number;v:number;}[];
   /*
   key名:IsShowHpBar
   描述:是否显示玩家的血条
   */
   'IsShowHpBar': boolean;
};
class PhysicsPlayer{
   private mConfigObject:{[key:number]:IPhysicsPlayerStruct}  = {};
   private mConfigArray:IPhysicsPlayerStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[33] = {"Key":33,"Name":"世界","Desc":"50*50的游戏世界，用于装载游戏玩家","Type":4,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":1,"Skill":[70],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[16] = {"Key":16,"Name":"地砖.左竖","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":15,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[17] = {"Key":17,"Name":"地砖.右竖","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":16,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[2] = {"Key":2,"Name":"地砖.上横","Desc":"测试地砖","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":13,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[15] = {"Key":15,"Name":"地砖.下横","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":14,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[11] = {"Key":11,"Name":"地砖.左上","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":9,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[12] = {"Key":12,"Name":"地砖.左下","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":10,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[13] = {"Key":13,"Name":"地砖.右上","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":11,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[14] = {"Key":14,"Name":"地砖.右下","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":12,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[35] = {"Key":35,"Name":"房间9*9","Desc":"9*9房间描述","Type":3,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":45,"Skill":[46],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[34] = {"Key":34,"Name":"房间5*7","Desc":"5*7房间描述","Type":3,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":2,"Skill":[44],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[1] = {"Key":1,"Name":"勇士","Desc":"只会一些基本功，但是却已经有着守护一方宁静的普通人","Type":1,"SubType":1,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":33,"Skill":[27,41],"AttackCollider":[],"Attrs":[{"k":60,"v":1},{"k":33,"v":3.5}],"IsShowHpBar":false};
       this.mConfigObject[3] = {"Key":3,"Name":"世界","Desc":"用于游戏的世界","Type":4,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":3,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[4] = {"Key":4,"Name":"房间","Desc":"用于玩家的房间创建","Type":3,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":4,"Skill":[6],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[9] = {"Key":9,"Name":"建筑物容器","Desc":"用于房间判定是否可放置","Type":7,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":5,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[24] = {"Key":24,"Name":"梦魇","Desc":"梦魇会在梦中悄无声息的杀死你","Type":2,"SubType":1,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":29,"Skill":[41,43],"AttackCollider":[1],"Attrs":[{"k":60,"v":3000}],"IsShowHpBar":true};
       this.mConfigObject[25] = {"Key":25,"Name":"技能容器，装载技能信息用","Desc":"用于承载技能数据信息用","Type":8,"SubType":1,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":30,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[26] = {"Key":26,"Name":"建筑.炮台","Desc":"用于观测范围内敌人，并向其发起攻击","Type":6,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":19,"Skill":[35],"AttackCollider":[4],"Attrs":[{"k":0,"v":20},{"k":60,"v":10},{"k":36,"v":1},{"k":69,"v":30}],"IsShowHpBar":true};
       this.mConfigObject[29] = {"Key":29,"Name":"梦魇.强力炮弹","Desc":"梦魇的普通攻击，会向着敌人方向发射一颗非常快速的子弹","Type":8,"SubType":1,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":38,"Skill":[39],"AttackCollider":[],"Attrs":[{"k":33,"v":20}],"IsShowHpBar":false};
       this.mConfigObject[30] = {"Key":30,"Name":"玩家炮台.强力炮弹","Desc":"梦魇的普通攻击，会向着敌人方向发射一颗非常快速的子弹","Type":8,"SubType":1,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":68,"Skill":[40],"AttackCollider":[],"Attrs":[{"k":33,"v":20}],"IsShowHpBar":false};
       this.mConfigObject[31] = {"Key":31,"Name":"梦魇.劈天神掌","Desc":"向前方挥掌，并造成伤害","Type":8,"SubType":1,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":38,"Skill":[43],"AttackCollider":[],"Attrs":[{"k":33,"v":20}],"IsShowHpBar":false};
       this.mConfigObject[32] = {"Key":32,"Name":"勇士.自己","Desc":"游戏中自己的英雄","Type":1,"SubType":2,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":33,"Skill":[27,42],"AttackCollider":[],"Attrs":[{"k":60,"v":1},{"k":33,"v":2.5},{"k":72,"v":150}],"IsShowHpBar":false};
       this.mConfigObject[36] = {"Key":36,"Name":"内地砖.左上","Desc":"墙体内的砖块，用于更好的描述砖块","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":49,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[37] = {"Key":37,"Name":"内地砖.左下","Desc":"墙体内的砖块，用于更好的描述砖块","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":50,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[38] = {"Key":38,"Name":"内地砖.右上","Desc":"墙体内的砖块，用于更好的描述砖块","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":51,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[39] = {"Key":39,"Name":"内地砖.右下","Desc":"墙体内的砖块，用于更好的描述砖块","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":52,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[40] = {"Key":40,"Name":"房间7*7","Desc":"7*7房间描述","Type":3,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":53,"Skill":[54],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[41] = {"Key":41,"Name":"房间7*9","Desc":"7*9房间描述","Type":3,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":55,"Skill":[56],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[42] = {"Key":42,"Name":"房间11*3","Desc":"11*3房间描述","Type":3,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":57,"Skill":[58],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[43] = {"Key":43,"Name":"房间9*7","Desc":"9*7房间描述","Type":3,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":59,"Skill":[60],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[44] = {"Key":44,"Name":"房门纵移->左边","Desc":"左边的房门","Type":6,"SubType":3,"ExtParam":2,"RigidType":2,"IsVector":true,"Body":61,"Skill":[],"AttackCollider":[],"Attrs":[{"k":60,"v":300}],"IsShowHpBar":true};
       this.mConfigObject[45] = {"Key":45,"Name":"房门纵移->右边","Desc":"右边的房门","Type":6,"SubType":3,"ExtParam":2,"RigidType":2,"IsVector":true,"Body":62,"Skill":[],"AttackCollider":[],"Attrs":[{"k":60,"v":300}],"IsShowHpBar":true};
       this.mConfigObject[46] = {"Key":46,"Name":"房门横移->上边","Desc":"上边的房门","Type":6,"SubType":3,"ExtParam":1,"RigidType":2,"IsVector":true,"Body":63,"Skill":[],"AttackCollider":[],"Attrs":[{"k":60,"v":300}],"IsShowHpBar":true};
       this.mConfigObject[47] = {"Key":47,"Name":"房门横移->下边","Desc":"下边的房门","Type":6,"SubType":3,"ExtParam":1,"RigidType":2,"IsVector":true,"Body":64,"Skill":[],"AttackCollider":[],"Attrs":[{"k":60,"v":300}],"IsShowHpBar":true};
       this.mConfigObject[48] = {"Key":48,"Name":"房门触发器","Desc":"房门触发器，可用于房门的开启与关闭","Type":100,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":65,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[49] = {"Key":49,"Name":"床","Desc":"用于玩家休息的床","Type":6,"SubType":2,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":66,"Skill":[],"AttackCollider":[],"Attrs":[{"k":60,"v":1}],"IsShowHpBar":false};
       this.mConfigObject[51] = {"Key":51,"Name":"床体触发器","Desc":"用于玩家休息的床","Type":100,"SubType":2,"ExtParam":0,"RigidType":1,"IsVector":true,"Body":67,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[52] = {"Key":52,"Name":"练气塔","Desc":"用于生成建造建筑所必须的游戏资源","Type":6,"SubType":4,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":19,"Skill":[],"AttackCollider":[],"Attrs":[{"k":60,"v":1}],"IsShowHpBar":false};
       this.mConfigObject[53] = {"Key":53,"Name":"镜头窗口观察器","Desc":"用于观察可是范围内的视野对象","Type":100,"SubType":3,"ExtParam":0,"RigidType":0,"IsVector":false,"Body":69,"Skill":[42],"AttackCollider":[],"Attrs":[{"k":33,"v":20}],"IsShowHpBar":false};
       this.mConfigObject[54] = {"Key":54,"Name":"世界地图上边","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":71,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[55] = {"Key":55,"Name":"世界地图下边","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":72,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[56] = {"Key":56,"Name":"地砖地图左边","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":73,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[57] = {"Key":57,"Name":"地砖地图右边","Desc":"墙体","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":74,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[75] = {"Key":75,"Name":"地砖.上横(5*1)","Desc":"地砖.上横(5*1)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":75,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[76] = {"Key":76,"Name":"地砖.下横(3*1)","Desc":"地砖.下横(3*1)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":76,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[77] = {"Key":77,"Name":"地砖.左竖(1*5)","Desc":"地砖.左竖(1*5)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":77,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[78] = {"Key":78,"Name":"地砖.右竖(1*7)","Desc":"地砖.右竖(1*7)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":78,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[79] = {"Key":79,"Name":"地砖.右竖(1*3)","Desc":"地砖.右竖(1*3)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":79,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[80] = {"Key":80,"Name":"地砖.左竖(1*3)","Desc":"地砖.左竖(1*3)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":80,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[81] = {"Key":81,"Name":"地砖.左竖(1*7)","Desc":"地砖.左竖(1*7)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":81,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[82] = {"Key":82,"Name":"地砖.下横(5*1)","Desc":"地砖.下横(5*1)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":82,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[83] = {"Key":83,"Name":"地砖.下横(9*1)","Desc":"地砖.下横(9*1)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":83,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
       this.mConfigObject[84] = {"Key":84,"Name":"地砖.下横(7*1)","Desc":"地砖.下横(7*1)","Type":5,"SubType":1,"ExtParam":0,"RigidType":1,"IsVector":false,"Body":84,"Skill":[],"AttackCollider":[],"Attrs":[],"IsShowHpBar":false};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IPhysicsPlayerStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IPhysicsPlayerStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_PhysicsPlayer:PhysicsPlayer = new PhysicsPlayer();