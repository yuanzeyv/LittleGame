import { Node } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global"; 
import { BundleProxy } from "../BundleProxy/BundleProxy";
import { NodeCellControl } from "./NodeCellControl";
import { ePoolDefine } from "./PoolDefine";
import { eNotice } from "../../../NotificationTable";

//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class PoolProxy extends BaseProxy{
    static get ProxyName():string { return "NodePoolProxy" };
    private mNodePool:Map<ePoolDefine,NodeCellControl> = new Map<ePoolDefine,NodeCellControl>();//用于管理节点对象池
    //创建一个对象池
    public CreateNodePool(poolID:ePoolDefine,control:NodeCellControl){
        let nodeControl:NodeCellControl|undefined = this.mNodePool.get(poolID);
        if(!!nodeControl){
            console.warn("对象池已经被创建过了");
            return; 
        }
        this.mNodePool.set(poolID,control);
    }   
     
    public Get(poolID:ePoolDefine,...args):Node|undefined{//获取到对象池中的一个对象
        let nodeControl:NodeCellControl|undefined = this.mNodePool.get(poolID);
        if(!nodeControl)
            return undefined;
        return nodeControl.Get(args);
    }

    public Put(poolID:ePoolDefine,node:Node|undefined):void{//放回一个节点到对象池中
        let nodeControl:NodeCellControl|undefined = this.mNodePool.get(poolID);
        if(nodeControl == undefined || node == undefined)
            return; 
        nodeControl.Put(node);
    }
    
    public Clear(poolID:ePoolDefine):void{//清理对象池
        let nodeControl:NodeCellControl|undefined = this.mNodePool.get(poolID);
        if(nodeControl == undefined )
            return;
        nodeControl.Clear(); 
    }

    public GetControl(poolID:ePoolDefine):NodeCellControl|undefined{
        return this.mNodePool.get(poolID);
    }
}   