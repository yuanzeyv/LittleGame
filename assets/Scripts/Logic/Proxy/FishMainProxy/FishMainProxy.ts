import { Prefab } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BundleProxy, LoadStruct } from "../BundleProxy/BundleProxy";
import { GameInning } from "./FishGame";
import { Node } from "cc";
import { Size } from "cc";
import { Vec2 } from "cc";
export class FishMainProxy extends BaseProxy{ 
    static  get ProxyName():string { return "FishMainProxy" };
    private mGameInning:GameInning;//当前的一场游戏
    //开始一场游戏
    public StartGame(mapNode:Node){ 
        if( this.mGameInning != undefined){
            console.warn("当前正在开始一句游戏中");
            return;
        }
        _Facade.FindProxy(BundleProxy).LoadArr([
            {path:"resources/Biology/Fish/Chaetodon/ChaetodonMinimus",type:Prefab},
            {path:"resources/Biology/Fish/Food/PremiumFood",type:Prefab},
        ],(loadStruct: LoadStruct)=>{
            _Facade.FindProxy(BundleProxy).UseAsset(loadStruct.OperationAssetName,loadStruct.OperationAssetType);//使用这个预制体
            if(loadStruct.IsFinish)
                this.mGameInning.StartGame(mapNode);
        }); 
        //生成 GameInning 对象
        this.mGameInning = new GameInning();  
        this.mGameInning.InitInningData() 
    }
    //获取到游戏内里
    public GetGameInning():GameInning{
        return this.mGameInning;
    }

    //结束一场游戏 
    public ExitGame(){
        _Facade.FindProxy(BundleProxy).UnUseAsset("resources/Biology/Fish/Chaetodon/ChaetodonMinimus",Prefab);//使用这个预制体
        _Facade.FindProxy(BundleProxy).UnUseAsset("resources/Biology/Fish/Chaetodon/ChaetodonMinimus",Prefab);//使用这个预制体
    }

    //获取到游戏内的金币数目
    public GetGameInningCount():number{
        return this.mGameInning.GoalCoin;
    } 

    //获取到游戏内的金币数目
    public GetGameContentSize():Size{
        return this.mGameInning.MapSize;
    }

    //生成一条小鱼
    public GenerateFish(){
        this.mGameInning.GenerateFish();
    } 
    public GenerateFood(pos:Vec2){
        this.mGameInning.GenerateFood(pos);
    } 

    //更新函数
    public Update(dt:number):void{
        this.mGameInning?.Update(dt); 
    }
}  
