import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy"; 
import { _Facade, _G } from "../../../Global";
import { SoltCell } from "../../../Util/Time/TimeWheel";
import { BiologyAttrProxy, eAttrType } from "../BiologyAttrProxy/BiologyAttrProxy";
import { FishMainProxy } from "../FishMainProxy/FishMainProxy";
export enum eSatietyStatus{
    FullStomach,
    Hunger,
    ArticuloMortis,
    None,
}
export class BiologySatietyProxy extends BaseProxy{  
    static get ProxyName():string { return "BiologySatietyProxy" }; 
    private mBiologySatieyStatusMap:Map<number,eSatietyStatus> = new Map<number,eSatietyStatus>(); 
    private mBiologySoltMap:Map<number,SoltCell> = new Map<number,SoltCell>(); 
    public AddBiology(biologyID:number){//添加一个角色
        this.mBiologySatieyStatusMap.set(biologyID,eSatietyStatus.None);
        this.SetBiologySatiey(biologyID,100);
        this.mBiologySoltMap.set(biologyID,_G.TimeWheel.Set(1000,this.SatieyCalcHandle.bind(this),biologyID));
    }
    public DelBiology(biologyID:number){//删除一个角色 
        this.mBiologySoltMap.get(biologyID)?.Stop();
        this.mBiologySoltMap.set(biologyID,undefined);
    }
    //设置小鱼的饱食度     
    public SetBiologySatiey(biologyID:number,satiety:number){
        satiety = satiety < 0? 0:satiety;
        _Facade.FindProxy(BiologyAttrProxy).GetBiologyAttrInfo(biologyID).SetAttrByType(eAttrType.Satiety,satiety);//设置当前的饱食度为100
        //判断当前饱食度对应的状态，重置小鱼的饥饿状态
        //饱腹->饥饿->濒死      
        let statusArray:Array<number> = new Array<number>(60,30,0);
        for(let i = 0;i<statusArray.length;i++){
            if(satiety >= statusArray[i] ){
                if(this.mBiologySatieyStatusMap.get(biologyID) != i){
                    this.mBiologySatieyStatusMap.set(biologyID,i);
                    _Facade.FindProxy(FishMainProxy).GetGameInning().GetFish(biologyID).HungerStatusChange(i);
                }
                return;
            }
        }
    }

    private SatieyCalcHandle(biologyID:number){
        let attrProxy:BiologyAttrProxy =  _Facade.FindProxy(BiologyAttrProxy);
        let nowValue:number = attrProxy.GetBiologyAttrInfo(biologyID).GetAttrByType(eAttrType.Satiety);//设置当前的饱食度为100
        let costValue:number = attrProxy.GetBiologyAttrInfo(biologyID).GetAttrByType(eAttrType.EnergyCost);//获取到饱食度每秒消耗
        let finalValue:number = nowValue - costValue < 0 ? 0 :  nowValue - costValue ;
        this.SetBiologySatiey(biologyID,finalValue);
        this.mBiologySoltMap.set(biologyID,_G.TimeWheel.Set(1000,this.SatieyCalcHandle.bind(this),biologyID));
    }
    //获取到小鱼的饥饿状态
    public GetBiologyStatus(biologyID:number):eSatietyStatus{
        return this.mBiologySatieyStatusMap.get(biologyID);
    }
} 