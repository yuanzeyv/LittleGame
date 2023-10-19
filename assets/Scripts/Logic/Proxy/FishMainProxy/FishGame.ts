import { Node } from "cc";
import { _Facade } from "../../../Global";
import { BundleProxy, LoadStruct } from "../BundleProxy/BundleProxy";
import { Prefab } from "cc";
import { instantiate } from "cc";
import { UITransform } from "cc";
import { Size } from "cc";
import { FishMainProxy } from "./FishMainProxy";
import { Biology } from "./Biology/Biology";
import { ChaetodonMinimusBiology } from "./Biology/ChaetodonMinimusBiology/ChaetodonMinimusBiology";
import { BuffProxy } from "../BuffProxy/BuffProxy";
import { BiologyAttrProxy } from "../BiologyAttrProxy/BiologyAttrProxy";
import { BiologySatietyProxy } from "../BiologySatietyProxy/BiologySatietyProxy";
import { FoodBiology } from "./Biology/FoodBiology/FoodBiology";
import { Vec2 } from "cc";
export class GameInning{
    private mGameNode:Node; 
    private mAllocUUID:number = 0;
    private mGoalCoin:number = 200;//局内金币 
    //场上的所有生物 
    private mBiologyMap:Map<number,Biology> = new Map<number,Biology>();   
    //初始化关卡数据
    public InitInningData(){
        this.mGoalCoin = 200; 
    }
    //开始一场游戏
    public StartGame(mapNode:Node){
        this.mGameNode = mapNode;
        this.GenerateFish();
    }

    public get GoalCoin():number{
        return this.mGoalCoin;
    }  

    public set GoalCoin(count:number){
        this.mGoalCoin = count;
    } 
    //地图大小等于节点的大小
    public get MapSize():Size{
        return this.mGameNode.getComponent(UITransform).contentSize;
    }
  
    //生成一条小鱼
    public GenerateFish():void{
        let uuid:number = this.mAllocUUID++;//首先生成一个小鱼UUID
        let prefab:Prefab = _Facade.FindProxy(BundleProxy).UseAsset("resources/Biology/Fish/Chaetodon/ChaetodonMinimus",Prefab);
        let fish:Node = instantiate(prefab); 
        fish.parent = this.mGameNode;
        this.mBiologyMap.set(uuid,new ChaetodonMinimusBiology(uuid,fish));  
        _Facade.FindProxy(BuffProxy).AddBiology(uuid);
        _Facade.FindProxy(BiologyAttrProxy).AddBiology(uuid); 
        _Facade.FindProxy(BiologySatietyProxy).AddBiology(uuid);
        _Facade.FindProxy(BuffProxy).AddBuff(uuid,1);
    }
    //生成一个食物
    public GenerateFood(pos:Vec2):void{
        let uuid:number = this.mAllocUUID++;//首先生成一个小鱼UUID
        let prefab:Prefab = _Facade.FindProxy(BundleProxy).UseAsset("resources/Biology/Fish/Food/PremiumFood",Prefab);
        let fish:Node = instantiate(prefab); 
        fish.parent = this.mGameNode;
        this.mBiologyMap.set(uuid,new FoodBiology(uuid,fish,pos));   
        _Facade.FindProxy(BuffProxy).AddBiology(uuid);
        _Facade.FindProxy(BiologyAttrProxy).AddBiology(uuid);
        _Facade.FindProxy(BiologySatietyProxy).AddBiology(uuid);
        _Facade.FindProxy(BuffProxy).AddBuff(uuid,1);
    }

    //获取到一条小鱼 
    public GetFish(fishID:number):Biology{
        let fish:Biology|undefined = this.mBiologyMap.get(fishID);
        return fish;
    }
    //更新函数
    public Update(dt:number):void{ 
        for(let cell of this.mBiologyMap)
            cell[1].Update(dt);
    }
}
