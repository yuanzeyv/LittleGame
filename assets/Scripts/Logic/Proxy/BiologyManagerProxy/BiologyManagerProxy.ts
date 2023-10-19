import { Prefab, instantiate,Node } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BiologyAttrProxy, eAttrType } from "../BiologyAttrProxy/BiologyAttrProxy";
import { BiologySatietyProxy } from "../BiologySatietyProxy/BiologySatietyProxy";
import { BuffProxy } from "../BuffProxy/BuffProxy";
import { BundleProxy } from "../BundleProxy/BundleProxy";
import { Biology } from "../FishMainProxy/Biology/Biology";
import { ChaetodonMinimusBiology } from "../FishMainProxy/Biology/ChaetodonMinimusBiology/ChaetodonMinimusBiology";


enum eFishType {
    ButterflyFish //蝴蝶鱼
}

export class BiologyManagerProxy extends BaseProxy{  
    static get ProxyName():string { return "BiologyManagerProxy" }; 
    private static mBiologyAllocUUID:number = 0;
    private mBiologyMap:Map<number,Biology> = new Map<number,Biology>();//所有生物

    //鱼类型的生物
    private mFishModelMap:Map<eFishType,{prefab:string,cons:new (...args)=>Biology}> = new Map<eFishType,{prefab:string,cons:new ()=>Biology}>();//小鱼模型
    private mFishMap:Map<number,Biology> = new Map<number,Biology>();//鱼类生物

    private mFoodMap:Map<number,Biology> = new Map<number,Biology>();//食物类型
    private mCurrencyMap:Map<number,Biology> = new Map<number,Biology>();//货币类型
    private mMonsterMap:Map<number,Biology> = new Map<number,Biology>();//怪物类型

    public onLoad(): void {
        
    }   
    public InitFishModel(){
        this.mFishModelMap.set(eFishType.ButterflyFish,{prefab:"resources/Biology/Fish/Chaetodon/ChaetodonMinimus",cons:ChaetodonMinimusBiology});
    } 

    public CreateBiology(fishType:eFishType):number{ 
        let fishData:{prefab:string,cons:new ()=>Biology}|undefined = this.mFishModelMap.get(fishType);
        if(fishData == undefined)//创建失败
            return undefined;
        let uuid:number = BiologyManagerProxy.mBiologyAllocUUID++;//首先生成一个小鱼UUID
        let prefab:Prefab = _Facade.FindProxy(BundleProxy).UseAsset(fishData.prefab,Prefab);
        let fish:Node = instantiate(prefab);  
        _Facade.FindProxy(BuffProxy).AddBiology(uuid);
        _Facade.FindProxy(BiologyAttrProxy).AddBiology(uuid); 
        _Facade.FindProxy(BiologySatietyProxy).AddBiology(uuid);
        _Facade.FindProxy(BuffProxy).AddBuff(uuid,1);

        this.mBiologyMap.set(uuid,new ChaetodonMinimusBiology(uuid,fish));  
    }

    public AddBiology(biologyID:number){//添加一个角色
        //判断角色是否拥有BiologyBuffInfo信息
        let biologyBuffInfo:BiologyAttr|undefined = this.mBiologyAttrMap.get(biologyID);
        if(biologyBuffInfo != undefined)
            return;
        this.mBiologyAttrMap.set(biologyID,new BiologyAttr(biologyID));
    }
    public DelBiology(biologyID:number){//删除一个角色
        //判断角色是否拥有BiologyBuffInfo信息
        let biologyBuffInfo:BiologyAttr|undefined = this.mBiologyAttrMap.get(biologyID);
        if(biologyBuffInfo == undefined) return;
        this.mBiologyAttrMap.delete(biologyID);
    }

    //获取到一个角色属性
    public GetBiologyAttrInfo(biologyID:number):BiologyAttr|undefined{
        return this.mBiologyAttrMap.get(biologyID);
    }
    public GetBiologyAttrByType(biologyID:number,type:eAttrType):number{
        let biologyAttr:BiologyAttr|undefined = this.GetBiologyAttrInfo(biologyID);
        if(biologyAttr == undefined)
            return 0;
        return biologyAttr.GetAttrByType(type); 
    }
} 