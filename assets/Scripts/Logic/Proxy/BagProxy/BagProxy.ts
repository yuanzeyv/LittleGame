import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global"; 
import { eNetProtocol } from "../../../NetNotification";
import { NetWorkProxy } from "../NetWorkProxy/NetWorkProxy";
import { EquipBaseType, ItemBaseType, ItemCell } from "./ItemDefine/ItemDefine";

//游戏中的背包代理
export class BagProxy extends BaseProxy{ 
    static  get ProxyName():string { return "BagProxy" }; 
    private mBagCellMap:Map<number,ItemCell> = new Map<number,ItemCell>(); 
    public onLoad():void {
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_BagInit,this.BagInitHandle.bind(this));
    } 
    private BagInitHandle(data:{itemArray:Array<ItemBaseType>,err:number}):void{
        if(data.err != 0) {
            console.error("背包初始化失败");
            return;
        }
        for(let cell of data.itemArray)
            this.mBagCellMap.set(cell.SingleID,new ItemCell(cell));
    }
}   