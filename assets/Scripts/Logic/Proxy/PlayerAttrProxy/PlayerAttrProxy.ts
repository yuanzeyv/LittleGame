import { AttrCalcRelevanceConfig, IAttrCalcRelevanceStruct } from "../../../Config/Cfg_AttrCalcRelevance";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global"; 
import { eNetProtocol } from "../../../NetNotification"; 
import { eNotice } from "../../../NotificationTable";
import { ItemBaseType, ItemCell } from "../BagProxy/ItemDefine/ItemDefine";
import { NetWorkProxy } from "../NetWorkProxy/NetWorkProxy";
import { AttrBase, PlayerAttrNetType } from "./AttrDefine/AttrDefine";

//游戏中的背包代理
export class PlayerAttrProxy extends BaseProxy{ 
    static  get ProxyName():string { return "PlayerAttrProxy" }; 
    private mAttrCellMap:Map<number,AttrBase> = new Map<number,AttrBase>(); 
    public onLoad():void {
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_AttrInit,this.AttrInitHandle.bind(this));
    } 
    private AttrInitHandle(data:{AttrArray:Array<PlayerAttrNetType>,err:number}):void{
        if(data.err != 0) {
            console.error("属性初始化失败");
            return; 
        }
        for(let cell of data.AttrArray)
            this.mAttrCellMap.set(cell.key,new AttrBase(cell));
        _Facade.Send(eNotice.RefreshAttr);
    } 

    public GetAttrValue(attrID:number):number{
        let attrInfo:AttrBase|undefined = this.mAttrCellMap.get(attrID);
        if(attrInfo == undefined)
            return 0;
        return attrInfo.GetAttrValue();
    }

    public GetAttrSumValue(attrType:number):number{
        let relevanceInfo:IAttrCalcRelevanceStruct = AttrCalcRelevanceConfig.GetData(attrType);//读表
        let fixedValue:number = this.GetAttrValue(relevanceInfo.fixed);
        let fixedPercentValue:number = this.GetAttrValue(relevanceInfo.fixedPercent) / 100;
        let sumPercentValue:number = this.GetAttrValue(relevanceInfo.sumPercent) / 100;
        return (fixedValue * (1 + fixedPercentValue))*( 1 + sumPercentValue ) ;
    }
}   