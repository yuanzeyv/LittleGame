import { PhysicsSystem2D, Rect, Node } from "cc";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { ChaetodonMinimus } from "./ChaetodonMinimus/ChaetodonMinimus";
import { BundleProxy, LoadStruct } from "../BundleProxy/BundleProxy";
import { Prefab } from "cc";
import { instantiate } from "cc";
import { ChaetodonMinimusScripts } from "../../Layer/FishMainGameLayer/ChaetodonMinimus/ChaetodonMinimusScripts";
import { UITransform } from "cc";
import { Size } from "cc";
import { FishMainProxy } from "./FishMainProxy";
import { Vec2 } from "cc";
//技能信息
//技能基础信息
class SkillBase{
}

//用以描述一局游戏中的所有状态信息
//可购买道具列表
//鱼苗  小鱼妈妈


//食物
//数量

//高级物品或道具
    //高级鱼苗 （食人鱼 吞噬小鱼生产钻石） 
    //高级鱼苗 （钻石章鱼  捡拾星星生产钻石）
    //星星药水  (将大鱼苗进化为 星星大鱼苗）
    //怪物鱼    (吃小鱼可以吐虫子)
    //珍珠青蛙  (通过吞噬怪物鱼的虫子 从而生产珍珠）
    //魔鬼鱼 通过吞吃高级鱼苗 生产宝箱
//未知 
//武器

//精灵蛋

//当前金币

//宠物
//蜗牛     (以缓慢的速度拾取掉落物)
//贝壳     (固定时间生产钻石)
//金枪鱼   (可以辅助玩家攻击怪物)
//鱼妈妈   (固定时间生产一条固定小白鱼）
//小海马  （固定间隔吞吐中级食物）
//小章鱼   （可以收集空中的一些金币）
//骨头鱼   （可以生产金币道具）
//螃蟹手   （在地图底部，对敌人造成巨量伤害）
//美人鱼   （让身边所有的鱼儿都高兴起来）
//小乌龟   （所有道具的掉落 与 消失速度减慢）
//炸弹鱼    （投递战斗，可能会炸死蝴蝶鱼，但是点击炸弹的话可以获得金币）
//灯笼鱼    （引诱小鱼原理敌人）
//小海豚     (对解饿的小鱼 加标签，更好的繁育 。 也可以检测外星人出生点及剩余血量) 
//寄居蟹     (用钳子驱赶小鱼离开海底) 
//悬浮鱼     (反弹一切道具）
//电鳗       （电死你浴缸的所有鱼，把他变成钻石  处罚时机不详）
//靓仔鲨     （会攻击敌人，但是会是不是吃你一条小鱼）
//神仙鱼     （复活死去的鱼）
//小蝌蚪      （变成任何宠物）
//大象        （可以生产星星）
//鼻子怪
//长颈鹿 

//地图掉落
//食物


//怪物
//海狮
//怪兽
//吃货怪物
//导弹机器
//回血章鱼
//海洋粘土怪物 

//怪物属性描述
class BiologyAttr{
    private mHP:number = 0;//血量
    private mMp:number = 0;//蓝量
    private mLevel:number = 0;//等级
    private mExp:number = 0;//经验

    private mMiss:number = 0;//闪避率   百分比
    private mAttack:number = 0;//攻击力
    private mMoveSpeed:number = 0;//移动速度
    private mHungerValue:number = 0;//饥饿值
    private mCritical:number = 0;//暴击率
};
//本类用来描述一个生命
export class Biology{
    protected mName:string;//生物名称

    protected mBaseAttr:BiologyAttr = new BiologyAttr();//基础属性
    protected mCalcAttr:BiologyAttr = new BiologyAttr();//计算后的属性
    //是否是新生鱼
    protected mIsNewFish:boolean = true;

    //小鱼方向状态 
    protected mActorDir:Vec2 = new Vec2(0,0);//当前小鱼的朝向

    //小鱼移动状态
    protected mIsOwnerEndPoint:boolean = false;//小鱼是否拥有移动目标点
    protected mEndPoint:Vec2 = new Vec2(0,0);//小鱼的移动点位
    protected mIsAccelerateMove:boolean = false;//小鱼是否加速移动

    //小鱼组件
    protected mChaetodonMinimus:ChaetodonMinimusScripts;//存在一个节点

    public constructor(script:ChaetodonMinimusScripts){
        this.mChaetodonMinimus = script;
    }
    
    protected Eat(){
    }
    protected BeEat(){
    }
    protected Attack(){
    }
    protected BeAttack(){
    }
    protected Die(){
    }
    protected SetSpeed(movePos:Vec2){//设置方向
    }

    protected SetEndPoint(toPos:Vec2){
        this.mEndPoint.set(toPos.x,toPos.y);
    }

    //小鱼移动目标点
    public get IsOwnerMoveStatus():boolean{
        return this.mIsOwnerEndPoint;
    }
    public set IsOwnerMoveStatus(status:boolean){
        this.mIsOwnerEndPoint = status;
    }
    //小鱼是否加速移动
    public get IsAccelerateMoveStatus():boolean{
        return this.mIsAccelerateMove;
    }
    public set IsAccelerateMoveStatus(status:boolean){
        this.mIsAccelerateMove = status;
    }
    //是否是新生鱼
    public get IsNewFish():boolean{
        return this.mIsNewFish;
    } 
    public set IsNewFish(status:boolean){
        this.mIsNewFish = status;
    } 
    //获取小鱼位置
    public GetPosition():Vec2{
        return this.mChaetodonMinimus.GetPosition();
    }
    //获取到小鱼的对象位置
    public GetMovePosition():Vec2{
        return new Vec2(this.mEndPoint);
    }
    //设置小鱼位置
    public SetMovePosition(toPos:Vec2,isAccelerate:boolean):void{
        this.mEndPoint.set(toPos);//设置移动终点
        this.IsAccelerateMoveStatus = isAccelerate;
        this.IsOwnerMoveStatus = true;
    }
    
    //设置小鱼位置
    public SetPosition(pos:Vec2){
        this.mChaetodonMinimus.SetPosition(pos);
    }
    
    //获取到小鱼距离终点的距离
    public GetResidueDistance():number{
        let nowPos:Vec2 = this.GetPosition();
        nowPos.subtract(this.mEndPoint);
        return nowPos.length();
    }
}; 

export class Fish extends Biology{
    constructor(script:ChaetodonMinimusScripts){
        super(script);
        this.mIsNewFish = true;
    }
    
    //获取小鱼的方向
    public GetFishDir():Vec2{
        return this.mActorDir.clone();
    }


    //设置小鱼出生状态
    public ChangeSpwanStatus(status:boolean):void{
        this.mChaetodonMinimus.FirstEnter = status;
    }
}

class PetFish extends Biology{
}

class BaseWeapon{
    private mAttack:number;//武器的攻击力
};

//本类用来描述一个道具
class GoodsData{
    private mID:number;//道具ID
    private mName:string;//道具名称
}

export class GameInning{
    private mAllocID:number = 0;
    private mSceneNode:Node;

    private mGoalCoin:number;//局内金币
    private mGoalDropSpeed:number;//货币掉落速度      cm/s
    private mGoalDestoryTime:number;//货币消失速度      ms

    //封装小鱼的数组，记录场上所有的小鱼
    private mFishMap:Map<number,Fish> = new Map<number,Fish>();
    //记录当前场上的所有宠物
    private mPetFishArray:Array<PetFish> = new Array<PetFish>();
    //记录场上的道具信息
    private mGoodsMap:Map<number,GoodsData> = new Map<number,GoodsData>();
    //初始化关卡数据
    public InitInningData(){
        this.mGoalCoin = 200;
        this.mGoalDropSpeed = 20;//金币下落速度
        this.mGoalDestoryTime = 200;//贝壳下落速度
    }
    //开始一场游戏
    public StartGame(mapNode:Node){
        this.mSceneNode = mapNode;
        this.GenerateFish();
    }

    public get GoalCoin():number{
        return this.mGoalCoin;
    }
    public get DropSpeed():number{
        return this.mGoalDropSpeed;
    }
    public get GoalDestoryTime():number{
        return this.mGoalDropSpeed;
    }

    public set GoalCoin(count:number){
        this.mGoalCoin = count;
    }
    public set DropSpeed(speed:number){
        this.mGoalDropSpeed = speed;
    }
    public set GoalDestoryTime(destroyTime:number){ 
        this.mGoalDropSpeed = destroyTime;
    }
    public get MapSize():Size{
        return this.mSceneNode.getComponent(UITransform).contentSize;
    }

    //生成一个小鱼
    public GenerateFish():void{ 
        _Facade.FindProxy(BundleProxy).Load("resources/Biology/Fish/ChaetodonMinimus",(loadStruct: LoadStruct)=>{
            let prefab:Prefab = _Facade.FindProxy(BundleProxy).UseAsset(loadStruct.OperationAssetName) as Prefab;
            if(prefab == undefined) 
                return;        
            let fishID:number = this.mAllocID++;
            let fish:Node = instantiate(prefab);
            fish.name = `Fish_${fishID}`;
            
            let  chaetodonMinimusScripts:ChaetodonMinimusScripts= fish.getComponent(ChaetodonMinimusScripts);
            chaetodonMinimusScripts.InitData(fishID);
            this.mFishMap.set(fishID,new Fish(chaetodonMinimusScripts));
            _Facade.FindProxy(FishMainProxy).SetFishEnterMap(fishID);//初始化小鱼坐标
            this.mSceneNode.addChild(fish);
        });
    }
    //获取到一条小鱼
    public GetFish(fishID:number):Fish{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        return fish;
    }

    //获取到小鱼的当前坐标
    public GetPosition(fishID:number):Vec2{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)//不应该为空，为空的话直接报错
            return;
        return fish.GetPosition();
    }

    //获取到小鱼的当前坐标
    public GetMovePosition(fishID:number):Vec2{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)//不应该为空，为空的话直接报错
            return;
        return fish.GetMovePosition();
    }
    
    //小鱼是否是加速状态
    public GetFisAccelearteStatus(fishID:number):boolean{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)//不应该为空，为空的话直接报错
            return;
        return fish.IsAccelerateMoveStatus;
    }
    //角色是否拥有移动状态
    public GetOwnerMoveStatus(fishID:number):boolean{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)//不应该为空，为空的话直接报错
            return;
        return fish.IsOwnerMoveStatus;
    }
    public SetOwnerMoveStatus(fishID:number,status:boolean):void{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)//不应该为空，为空的话直接报错
            return;
        fish.IsOwnerMoveStatus = status;
    }
    
    //设置小鱼的坐标
    public SetPosition(fishID:number,spwanPos:Vec2):void{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)
            return;
        fish.SetPosition(spwanPos);
    }
    
    //设置小鱼的初始位置
    public SetMovePos(fishID:number,movePos:Vec2,isAccelerate:boolean):void{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)
            return;
        fish.SetMovePosition(movePos,isAccelerate);
    } 
    //设置小鱼的初始位置
    public IsSetEndPoint(fishID:number):boolean{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)
            return;
        return fish.GetFishDir().length() != 0;
    }

    //设置小鱼的初始位置
    public IsCalcMovePos(fishID:number):boolean{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)
            return;
        return fish.IsOwnerMoveStatus;
    }

    //获取小鱼移动方向
    public GetFishToEndPointDir(fishID:number):Vec2{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)
            return;
        return fish.GetFishDir();
    }
    
    //获取小鱼移动方向
    public GetFishResidueDIstance(fishID:number):number{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)
            return;
        return fish.GetResidueDistance();
    }

    //改变小鱼出生状态
    public ChangeDropStatus(fishID:number,status:boolean):void{
        let fish:Fish|undefined = this.mFishMap.get(fishID);
        if(fish == undefined)
            return;
        fish.ChangeSpwanStatus(status);
    }
 
    //小鱼是否拥有移动目标点
    public IsNewFish(fishID:number):boolean{
        let fish:Fish|undefined = this.mFishMap.get(fishID);//通过小鱼ID获取到小鱼具体信息
        if(fish == undefined)//不可能没找到小鱼
            return false;
        return fish.IsNewFish;
    }
}
