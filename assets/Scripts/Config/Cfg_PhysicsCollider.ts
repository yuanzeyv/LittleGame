export interface IPhysicsColliderStruct{
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
   key名:TempType
   描述:砖块类型
      *:0:无类型，仅仅作为必选项填入
      *:1:勇士碰撞器
      *:2:梦魇类型碰撞器
      *:3:障碍物类型
      *:4:范围探测类型
      *:7:回复类型碰撞器
      *:8:房间类型碰撞器
      *:9:建筑物类型
      *:11:移动类型
      *:12:世界类型
   */
   'TempType': number;
   /*
   key名:SubType
   描述:TempType(1):
      *:1:基础勇士碰撞器类型。
      *:TempType(2):
      *:1:通用梦魇碰撞器类型。
      *:TempType(3):
      *:1:基础障碍物。
      *:TempType(4):
      *:1:平民检测器
      *:2:梦魇检测器
      *:3:视野检测器
      *:4:房间检测器
      *:5:英雄阵营探测器
      *:TempType(7 ):
      *:1:回复生命用    
      *:2:回复护盾用
      *:3:回复金钱用
      *:4:回复练气丹用
      *:TempType(8):
      *:1:通用房间碰撞器
      *:TempType(9):
      *:1:立即计算障碍的
      *:2:传感器类型，不会计算障碍的
      *:3:动态计算障碍的
      *:TempType(10):
      *:1:对应游戏中的子弹对象
      *:TempType(11):
      *:1:线速度移动器
      *:2:寻路移动器
      *:TempType(12):
      *:1:通用世界类型
   */
   'SubType': number;
   /*
   key名:Shape
   描述:物体形状
      *:0:方形
      *:1:圆形
   */
   'Shape': number;
   /*
   key名:Redius
   描述:物体半径
   */
   'Redius': number;
   /*
   key名:Size
   描述:墙体尺寸
   */
   'Size': {Width:number;Height:number;};
   /*
   key名:OwnerChartlet
   描述:是否拥有贴图
   */
   'OwnerChartlet': boolean;
   /*
   key名:ChartletAngle
   描述:贴图的旋转角度
   */
   'ChartletAngle': number;
   /*
   key名:ChartletImg
   描述:贴图图片
   */
   'ChartletImg': string;
   /*
   key名:OwnerSpine
   描述:是否拥有Spine小精灵
   */
   'OwnerSpine': boolean;
   /*
   key名:SpinePath
   描述:Spine路径
   */
   'SpinePath': string;
   /*
   key名:Animation
   描述:动画名称
   */
   'Animation': string;
   /*
   key名:SpineScale
   描述:Spine缩放
   */
   'SpineScale': number;
};
class PhysicsCollider{
   private mConfigObject:{[key:number]:IPhysicsColliderStruct}  = {};
   private mConfigArray:IPhysicsColliderStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"37*37世界碰撞器","Desc":"世界碰撞器，用于检测有物体离开世界场景，以达到销毁物体的目的","TempType":12,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":18.5,"Height":18.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Floor_1","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[2] = {"Key":2,"Name":"5*7房间区域碰撞器","Desc":"5*7房间类型碰撞器","TempType":8,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":2.5,"Height":3.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[44] = {"Key":44,"Name":"5*7房间视野检测器","Desc":"5*7房间视野检测器","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":2.5,"Height":3.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[3] = {"Key":3,"Name":"世界碰撞器","Desc":"世界碰撞器，用于检测有物体离开世界场景，以达到销毁物体的目的","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":50.5,"Height":50.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Floor_1","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[4] = {"Key":4,"Name":"房间碰撞器","Desc":"房间碰撞器，用于对房间所接触的物体，施加Buff","TempType":8,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":5.5,"Height":5.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[6] = {"Key":6,"Name":"房间视野检测器","Desc":"房间的视野检测器","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":5.5,"Height":5.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[5] = {"Key":5,"Name":"建筑物容器","Desc":"用于容纳建筑物","TempType":9,"SubType":2,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"IdleImg","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[9] = {"Key":9,"Name":"地砖.左上","Desc":"左上角的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":270,"ChartletImg":"WallAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[10] = {"Key":10,"Name":"地砖.左下","Desc":"左下角的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":180,"ChartletImg":"WallAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[11] = {"Key":11,"Name":"地砖.右上","Desc":"右上角的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[12] = {"Key":12,"Name":"地砖.右下","Desc":"右下角的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":90,"ChartletImg":"WallAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[13] = {"Key":13,"Name":"地砖.上横","Desc":"纹路为横的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Top","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[14] = {"Key":14,"Name":"地砖.下横","Desc":"纹路为横的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Bottom","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[15] = {"Key":15,"Name":"地砖.左竖","Desc":"纹路为横的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Left","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[16] = {"Key":16,"Name":"地砖.右竖","Desc":"纹路为横的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Right","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[26] = {"Key":26,"Name":"地砖.左上","Desc":"左上角的地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":90,"ChartletImg":"WallAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[19] = {"Key":19,"Name":"炮台炮身","Desc":"炮台炮身碰撞器","TempType":9,"SubType":1,"Shape":1,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Pedesta_1","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[20] = {"Key":20,"Name":"范围检测器","Desc":"范围检测用，向刚体动态报告敌人的数据信息","TempType":4,"SubType":2,"Shape":1,"Redius":20,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[21] = {"Key":21,"Name":"血量回复检测器","Desc":"血量回复检测用，可以每秒钟回复角色数据信息","TempType":7,"SubType":1,"Shape":1,"Redius":0,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[22] = {"Key":22,"Name":"护盾回复检测器","Desc":"护盾回复检测用，可以每秒钟回复角色数据信息","TempType":7,"SubType":2,"Shape":1,"Redius":0,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[23] = {"Key":23,"Name":"金币回复检测器","Desc":"金币回复检测用，可以每秒钟回复角色数据信息","TempType":7,"SubType":3,"Shape":1,"Redius":0,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[24] = {"Key":24,"Name":"练气丹回复检测器","Desc":"练气丹回复检测用，可以每秒钟回复角色数据信息","TempType":7,"SubType":4,"Shape":1,"Redius":0,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[25] = {"Key":25,"Name":"移动方向控制器","Desc":"移动方向控制器","TempType":-1,"SubType":1,"Shape":1,"Redius":0,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[27] = {"Key":27,"Name":"视野触发器","Desc":"视野触发器，用于监听视野内的","TempType":4,"SubType":3,"Shape":1,"Redius":5,"Size":{"Width":5,"Height":5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[29] = {"Key":29,"Name":"梦魇.碰撞器","Desc":"梦魇碰撞器","TempType":2,"SubType":1,"Shape":1,"Redius":0.3,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"Door_1","OwnerSpine":true,"SpinePath":"jiangshi3","Animation":"walk","SpineScale":0.6};
       this.mConfigObject[30] = {"Key":30,"Name":"技能通用范围碰撞器","Desc":"通用技能碰撞器","TempType":4,"SubType":1,"Shape":1,"Redius":0.8,"Size":{"Width":0,"Height":0},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Attack","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[31] = {"Key":31,"Name":"技能通用范围碰撞器","Desc":"通用技能碰撞器","TempType":4,"SubType":1,"Shape":1,"Redius":0.3,"Size":{"Width":0,"Height":0},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Attack","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[33] = {"Key":33,"Name":"勇士.碰撞器_2","Desc":"勇士类型玩家形象2","TempType":1,"SubType":1,"Shape":1,"Redius":0.3,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"Door_1","OwnerSpine":true,"SpinePath":"daoshi1","Animation":"walk","SpineScale":0.6};
       this.mConfigObject[34] = {"Key":34,"Name":"勇士范围探测器","Desc":"探测指定区域的勇士信息","TempType":4,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":10,"Height":5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[35] = {"Key":35,"Name":"梦魇范围探测器","Desc":"探测指定区域的梦魇信息","TempType":4,"SubType":2,"Shape":1,"Redius":5,"Size":{"Width":5,"Height":5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[36] = {"Key":36,"Name":"视野范围探测器","Desc":"探测指定区域的视野信息","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":10,"Height":5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[37] = {"Key":37,"Name":"房间范围探测器","Desc":"探测指定区域的房间信息","TempType":4,"SubType":4,"Shape":0,"Redius":0,"Size":{"Width":10,"Height":5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[38] = {"Key":38,"Name":"梦魇的小子弹","Desc":"子弹的身体","TempType":10,"SubType":1,"Shape":1,"Redius":0.3,"Size":{"Width":0,"Height":0},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Attack","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[39] = {"Key":39,"Name":"梦魇的小子弹.英雄检测器","Desc":"梦魇的子弹会对触碰到的敌人造成根据梦魇属性的伤害","TempType":4,"SubType":1,"Shape":1,"Redius":0.3,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[41] = {"Key":41,"Name":"路径移动器","Desc":"当一个人物拥有他后，可以随机行走的能力","TempType":11,"SubType":2,"Shape":1,"Redius":0,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[42] = {"Key":42,"Name":"方向移动器","Desc":"可操作一个玩家","TempType":11,"SubType":1,"Shape":1,"Redius":0,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[40] = {"Key":40,"Name":"炮塔的梦魇检测器","Desc":"碰撞到梦魇后，对梦魇造成伤害","TempType":4,"SubType":2,"Shape":1,"Redius":0.3,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[43] = {"Key":43,"Name":"英雄阵营检测器","Desc":"检测地方阵营信息","TempType":4,"SubType":5,"Shape":1,"Redius":0.4,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULLL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[45] = {"Key":45,"Name":"9*9房间区域碰撞器","Desc":"9*9房间类型碰撞器","TempType":8,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":4.5,"Height":4.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[46] = {"Key":46,"Name":"9*9房间视野检测器","Desc":"9*9房间视野检测器","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":4.5,"Height":4.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[49] = {"Key":49,"Name":"内地砖.左上","Desc":"内角砖块，用于更好的描述和体现地图","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":90,"ChartletImg":"WallBottomAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[50] = {"Key":50,"Name":"内地砖.左下","Desc":"内角砖块，用于更好的描述和体现地图","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallBottomAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[51] = {"Key":51,"Name":"内地砖.右上","Desc":"内角砖块，用于更好的描述和体现地图","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":180,"ChartletImg":"WallBottomAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[52] = {"Key":52,"Name":"内地砖.右下","Desc":"内角砖块，用于更好的描述和体现地图","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":270,"ChartletImg":"WallBottomAngle","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[53] = {"Key":53,"Name":"7*7房间区域碰撞器","Desc":"7*7房间类型碰撞器","TempType":8,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":3.5,"Height":3.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[54] = {"Key":54,"Name":"7*7房间区域碰撞器","Desc":"7*7房间视野检测器","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":3.5,"Height":3.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[55] = {"Key":55,"Name":"7*9房间区域碰撞器","Desc":"7*9房间类型碰撞器","TempType":8,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":3.5,"Height":4.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[56] = {"Key":56,"Name":"7*9房间区域碰撞器","Desc":"7*9房间视野检测器","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":3.5,"Height":4.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[57] = {"Key":57,"Name":"11*3房间区域碰撞器","Desc":"11*3房间类型碰撞器","TempType":8,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":5.5,"Height":1.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[58] = {"Key":58,"Name":"11*3房间区域碰撞器","Desc":"11*3房间视野检测器","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":5.5,"Height":1.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[59] = {"Key":59,"Name":"9*7房间区域碰撞器","Desc":"9*7房间类型碰撞器","TempType":8,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":4.5,"Height":3.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[60] = {"Key":60,"Name":"9*7房间区域碰撞器","Desc":"9*7房间视野检测器","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":4.5,"Height":3.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"NULL","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[61] = {"Key":61,"Name":"房门纵移->左边","Desc":"纵向开门的房门，图片开口向左","TempType":9,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":90,"ChartletImg":"Door_5","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[62] = {"Key":62,"Name":"房门纵移->右边","Desc":"纵向开门的房门，图片开口向右","TempType":9,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":270,"ChartletImg":"Door_5","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[63] = {"Key":63,"Name":"房门横移->上边","Desc":"纵向开门的房门，图片开口向上","TempType":9,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":180,"ChartletImg":"Door_5","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[64] = {"Key":64,"Name":"房门横移->下边","Desc":"纵向开门的房门，图片开口向下","TempType":9,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Door_5","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[65] = {"Key":65,"Name":"房门触发器","Desc":"房门用于控制房门启停","TempType":4,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"Attack","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[66] = {"Key":66,"Name":"床","Desc":"床体碰撞器","TempType":9,"SubType":2,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Bed_1","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[67] = {"Key":67,"Name":"床体触发器","Desc":"床体触发器","TempType":4,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.75,"Height":0.75},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"Attack","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[68] = {"Key":68,"Name":"炮塔的子弹","Desc":"炮塔的子弹","TempType":10,"SubType":1,"Shape":1,"Redius":0.2,"Size":{"Width":0,"Height":0},"OwnerChartlet":false,"ChartletAngle":0,"ChartletImg":"Attack","OwnerSpine":true,"SpinePath":"zidan","Animation":"zidan","SpineScale":0.3};
       this.mConfigObject[69] = {"Key":69,"Name":"视窗范围探测器","Desc":"用于屏幕单位的绘制工作（不再一次性绘制过多的节点单元）","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":4,"Height":9},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Attack","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[70] = {"Key":70,"Name":"37*37世界碰撞器","Desc":"世界范围检测器，用于检测世界范围下的所有角色信息","TempType":4,"SubType":3,"Shape":0,"Redius":0,"Size":{"Width":18.5,"Height":18.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"Floor_1","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[71] = {"Key":71,"Name":"地砖.上横","Desc":"地图边界上地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":17.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Top","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[72] = {"Key":72,"Name":"地砖.下横","Desc":"地图边界下地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":17.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Bottom","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[73] = {"Key":73,"Name":"地砖.左竖","Desc":"地图边界左地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":17.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Left","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[74] = {"Key":74,"Name":"地砖.右竖","Desc":"地图边界右地砖","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":17.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Right","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[75] = {"Key":75,"Name":"地砖.上横(5*1)","Desc":"地砖.上横(5*1)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":2.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Top","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[76] = {"Key":76,"Name":"地砖.下横(3*1)","Desc":"地砖.下横(3*1)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":1.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Bottom","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[77] = {"Key":77,"Name":"地砖.左竖(1*5)","Desc":"地砖.左竖(1*5)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":2.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Left","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[78] = {"Key":78,"Name":"地砖.右竖(1*7)","Desc":"地砖.右竖(1*7)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":3.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Right","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[79] = {"Key":79,"Name":"地砖.右竖(1*3)","Desc":"地砖.右竖(1*3)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":1.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Right","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[80] = {"Key":80,"Name":"地砖.左竖(1*3)","Desc":"地砖.左竖(1*3)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":1.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Left","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[81] = {"Key":81,"Name":"地砖.左竖(1*7)","Desc":"地砖.左竖(1*7)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":0.5,"Height":3.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Left","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[82] = {"Key":82,"Name":"地砖.下横(5*1)","Desc":"地砖.下横(5*1)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":2.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Bottom","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[83] = {"Key":83,"Name":"地砖.下横(9*1)","Desc":"地砖.下横(9*1)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":4.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Bottom","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
       this.mConfigObject[84] = {"Key":84,"Name":"地砖.下横(7*1)","Desc":"地砖.下横(7*1)","TempType":3,"SubType":1,"Shape":0,"Redius":0.5,"Size":{"Width":3.5,"Height":0.5},"OwnerChartlet":true,"ChartletAngle":0,"ChartletImg":"WallLine_Bottom","OwnerSpine":false,"SpinePath":"NULL","Animation":"NULL","SpineScale":1};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IPhysicsColliderStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IPhysicsColliderStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_PhysicsCollider:PhysicsCollider = new PhysicsCollider();