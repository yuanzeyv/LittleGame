export interface IOnlyTheBravePhysicsColliderStruct{
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
      *:1:障碍物类型
      *:2:移动控制器
      *:3:视野观察期
   */
   'Type': number;
   /*
   key名:SubType
   描述:SubType(1):
      *:1:障碍物类型
      *:2:英雄类型
      *:3:英雄子弹类型
      *:4:敌人类型
      *:5:敌人子弹类型
      *:SubType(2)
      *:1:通用线速度移动控制器
      *:SubType(3)
      *:Hero = 1,//探测英雄
      *:Enemy = 2,//探测敌人
      *:Neutrality = 3,//探测中立元素
      *:HeroAndEnemy = 4,//探测英雄 与 敌人
      *:HeroAndNeutrality = 5,//探测英雄与中立
      *:EnemyAndNeutrality = 6,//敌人与中立
      *:ALL = 7,//所有人
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
};
class OnlyTheBravePhysicsCollider{
   private mConfigObject:{[key:number]:IOnlyTheBravePhysicsColliderStruct}  = {};
   private mConfigArray:IOnlyTheBravePhysicsColliderStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"1*500米墙体","Desc":"阻挡前进的步伐","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":250}};
       this.mConfigObject[4] = {"Key":4,"Name":"2*2的英雄刚体","Desc":"英雄基础刚体大小","Type":1,"SubType":2,"Shape":1,"Redius":1,"Size":{"Width":0.5,"Height":2.5}};
       this.mConfigObject[5] = {"Key":5,"Name":"线速度移动控制器","Desc":"线速度移动控制器，用于控制敌人的移动放i选哪个","Type":2,"SubType":1,"Shape":1,"Redius":0,"Size":{"Width":0.5,"Height":2.5}};
       this.mConfigObject[6] = {"Key":6,"Name":"游戏玩家视野","Desc":"视野观察器","Type":3,"SubType":7,"Shape":1,"Redius":100,"Size":{"Width":0.5,"Height":2.5}};
       this.mConfigObject[7] = {"Key":7,"Name":"游戏子弹","Desc":"1*1子弹对象","Type":1,"SubType":3,"Shape":1,"Redius":0.5,"Size":{"Width":0.5,"Height":2.5}};
       this.mConfigObject[8] = {"Key":8,"Name":"2*2敌人刚体","Desc":"敌人基础刚体大小","Type":1,"SubType":4,"Shape":1,"Redius":1,"Size":{"Width":0.5,"Height":2.5}};
       this.mConfigObject[9] = {"Key":9,"Name":"1*1敌人检测","Desc":"1*1敌人检测","Type":3,"SubType":2,"Shape":1,"Redius":0.5,"Size":{"Width":0.5,"Height":2.5}};
       this.mConfigObject[1001] = {"Key":1001,"Name":"1*1米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":0.5}};
       this.mConfigObject[1002] = {"Key":1002,"Name":"1*2米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":1}};
       this.mConfigObject[1003] = {"Key":1003,"Name":"1*3米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":1.5}};
       this.mConfigObject[1004] = {"Key":1004,"Name":"1*4米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":2}};
       this.mConfigObject[1005] = {"Key":1005,"Name":"1*5米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":2.5}};
       this.mConfigObject[1006] = {"Key":1006,"Name":"1*6米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":3}};
       this.mConfigObject[1007] = {"Key":1007,"Name":"1*7米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":3.5}};
       this.mConfigObject[1008] = {"Key":1008,"Name":"1*8米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":4}};
       this.mConfigObject[1009] = {"Key":1009,"Name":"1*9米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":4.5}};
       this.mConfigObject[1010] = {"Key":1010,"Name":"1*10米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":5}};
       this.mConfigObject[1011] = {"Key":1011,"Name":"1*11米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":5.5}};
       this.mConfigObject[1012] = {"Key":1012,"Name":"1*12米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":6}};
       this.mConfigObject[1013] = {"Key":1013,"Name":"1*13米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":6.5}};
       this.mConfigObject[1014] = {"Key":1014,"Name":"1*14米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":7}};
       this.mConfigObject[1015] = {"Key":1015,"Name":"1*15米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":7.5}};
       this.mConfigObject[1016] = {"Key":1016,"Name":"1*16米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":8}};
       this.mConfigObject[1017] = {"Key":1017,"Name":"1*17米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":8.5}};
       this.mConfigObject[1018] = {"Key":1018,"Name":"1*18米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":9}};
       this.mConfigObject[1019] = {"Key":1019,"Name":"1*19米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":9.5}};
       this.mConfigObject[1020] = {"Key":1020,"Name":"1*20米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":0.5,"Height":10}};
       this.mConfigObject[2001] = {"Key":2001,"Name":"2*1米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":0.5}};
       this.mConfigObject[2002] = {"Key":2002,"Name":"2*2米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":1}};
       this.mConfigObject[2003] = {"Key":2003,"Name":"2*3米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":1.5}};
       this.mConfigObject[2004] = {"Key":2004,"Name":"2*4米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":2}};
       this.mConfigObject[2005] = {"Key":2005,"Name":"2*5米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":2.5}};
       this.mConfigObject[2006] = {"Key":2006,"Name":"2*6米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":3}};
       this.mConfigObject[2007] = {"Key":2007,"Name":"2*7米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":3.5}};
       this.mConfigObject[2008] = {"Key":2008,"Name":"2*8米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":4}};
       this.mConfigObject[2009] = {"Key":2009,"Name":"2*9米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":4.5}};
       this.mConfigObject[2010] = {"Key":2010,"Name":"2*10米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":5}};
       this.mConfigObject[2011] = {"Key":2011,"Name":"2*11米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":5.5}};
       this.mConfigObject[2012] = {"Key":2012,"Name":"2*12米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":6}};
       this.mConfigObject[2013] = {"Key":2013,"Name":"2*13米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":6.5}};
       this.mConfigObject[2014] = {"Key":2014,"Name":"2*14米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":7}};
       this.mConfigObject[2015] = {"Key":2015,"Name":"2*15米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":7.5}};
       this.mConfigObject[2016] = {"Key":2016,"Name":"2*16米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":8}};
       this.mConfigObject[2017] = {"Key":2017,"Name":"2*17米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":8.5}};
       this.mConfigObject[2018] = {"Key":2018,"Name":"2*18米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":9}};
       this.mConfigObject[2019] = {"Key":2019,"Name":"2*19米通用物体","Desc":"通用二米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":9.5}};
       this.mConfigObject[2020] = {"Key":2020,"Name":"2*20米通用物体","Desc":"通用一米宽碰撞器","Type":1,"SubType":1,"Shape":0,"Redius":0,"Size":{"Width":1,"Height":10}};
       this.mConfigObject[100001] = {"Key":100001,"Name":"1米半径圆形物体","Desc":"1米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":0.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100002] = {"Key":100002,"Name":"2米半径圆形物体","Desc":"2米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":1,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100003] = {"Key":100003,"Name":"3米半径圆形物体","Desc":"3米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":1.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100004] = {"Key":100004,"Name":"4米半径圆形物体","Desc":"4米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":2,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100005] = {"Key":100005,"Name":"5米半径圆形物体","Desc":"5米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":2.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100006] = {"Key":100006,"Name":"6米半径圆形物体","Desc":"6米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":3,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100007] = {"Key":100007,"Name":"7米半径圆形物体","Desc":"7米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":3.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100008] = {"Key":100008,"Name":"8米半径圆形物体","Desc":"8米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":4,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100009] = {"Key":100009,"Name":"9米半径圆形物体","Desc":"9米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":4.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100010] = {"Key":100010,"Name":"10米半径圆形物体","Desc":"10米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100011] = {"Key":100011,"Name":"11米半径圆形物体","Desc":"11米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":5.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100012] = {"Key":100012,"Name":"12米半径圆形物体","Desc":"12米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":6,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100013] = {"Key":100013,"Name":"13米半径圆形物体","Desc":"13米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":6.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100014] = {"Key":100014,"Name":"14米半径圆形物体","Desc":"14米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":7,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100015] = {"Key":100015,"Name":"15米半径圆形物体","Desc":"15米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":7.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100016] = {"Key":100016,"Name":"16米半径圆形物体","Desc":"16米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":8,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100017] = {"Key":100017,"Name":"17米半径圆形物体","Desc":"17米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":8.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100018] = {"Key":100018,"Name":"18米半径圆形物体","Desc":"18米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":9,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100019] = {"Key":100019,"Name":"19米半径圆形物体","Desc":"19米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":9.5,"Size":{"Width":0,"Height":0}};
       this.mConfigObject[100020] = {"Key":100020,"Name":"20米半径圆形物体","Desc":"20米半径圆形物体","Type":1,"SubType":1,"Shape":1,"Redius":10,"Size":{"Width":0,"Height":0}};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IOnlyTheBravePhysicsColliderStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IOnlyTheBravePhysicsColliderStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_OnlyTheBravePhysicsCollider:OnlyTheBravePhysicsCollider = new OnlyTheBravePhysicsCollider();