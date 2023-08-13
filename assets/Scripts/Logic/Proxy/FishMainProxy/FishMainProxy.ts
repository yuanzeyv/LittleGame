import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BundleProxy } from "../BundleProxy/BundleProxy";
import { GameInning } from "./FishGame";
import { Node } from "cc";
import { Size } from "cc";
import { Vec2 } from "cc"; 
export class FishMainProxy extends BaseProxy{ 
    static  get ProxyName():string { return "FishMainProxy" };
    private mGameInning:GameInning;
    //开始一场游戏
    public StartGame(mapNode:Node){
        if( this.mGameInning != undefined){
            console.warn("当前正在开始一句游戏中");
            return;
        }
        //加载资源
        _Facade.FindProxy(BundleProxy).Load("",()=>{});//加载游戏内所需资源
        //生成 GameInning 对象
        this.mGameInning = new GameInning();
        //传入关卡 配置表  或 页签信息
        this.mGameInning.InitInningData() 
        this.mGameInning.StartGame(mapNode);
    }

    //结束一场游戏 
    public ExitGame(){
    }

    //获取到游戏内的金币数目
    public GetGameInningCount():number{
        return this.mGameInning.GoalCoin;
    }

    //获取到游戏对象
    public GetGameInning():GameInning{
        return this.mGameInning;
    }

    //获取到游戏内的金币数目
    public GetGameContentSize():Size{
        return this.mGameInning.MapSize;
    }

    //生成一条小鱼
    public GenerateFish(){
        this.mGameInning.GenerateFish();
    }

    //获取到小鱼的移动速度
    public GetFishSpeed(){
        return 3;
    } 

    //获取到小鱼的加速度
    public GetFishSpeedUp():number{
        return this.GetFishSpeed() * 2;
    }

    //为小鱼设置最初的位置
    public SetFishEnterMap(fishID:number):void{
        let size:Size = this.GetGameContentSize();//获取到当前游戏的窗口大小
        this.mGameInning.SetPosition(fishID,new Vec2(Math.random() * size.x ,size.y));
    }
 

    //判断当前是否已经存在了移动路径
    public IsSetEndPoint(fishID:number):boolean{
        return this.mGameInning.IsSetEndPoint(fishID);
    }

    //获取到小鱼的移动方向
    public GetFishMoveDir(fishID:number): Vec2{  
        return this.mGameInning.GetFishToEndPointDir(fishID);
    }

    //获取到小鱼距离终点的距离
    public GetFishResidueDistance(fishID:number):number{  
        return this.mGameInning.GetFishResidueDIstance(fishID); 
    }

    //改变小鱼的出生状态
    public ChangeDropStatus(fishID:number,status:boolean):void{
        return this.mGameInning.ChangeDropStatus(fishID,status);
    }

    //判断是否已经计算了移动坐标
    public IsCalcMovePos(fishID:number):boolean{
        return this.mGameInning.IsCalcMovePos(fishID);
    }

    //是否是新生鱼
    public IsNewFish(fishID:number):boolean{
        return this.mGameInning.IsNewFish(fishID);
    }
    
    //设置小鱼移动方向
    public SetFishMovePos(fishID:number,pos:Vec2,isAccelerate:boolean = false):void{
        this.mGameInning.SetMovePos(fishID,pos,isAccelerate);
    }
    //获取到小鱼坐标
    public GetFishPosition(fishID:number):Vec2{
        return this.mGameInning.GetPosition(fishID);
    }
    //获取到小鱼移动坐标
    public GetFisMovePos(fishID:number):Vec2{
        return this.mGameInning.GetMovePosition(fishID);
    }
    //小鱼是否是加速状态
    public GetFisAccelearteStatus(fishID:number):boolean{
        return this.mGameInning.GetFisAccelearteStatus(fishID);
    }
    //小鱼是否处于移动状态
    public IsOwnerMoveStatus(fishID:number):boolean{
        return this.mGameInning.GetOwnerMoveStatus(fishID);
    }
    public SetFishMoveStatus(fishID:number,status:boolean):void{
        this.mGameInning.SetOwnerMoveStatus(fishID,status);
    }
}  
