import { WindowInterface } from "../../../../Compoment/WindowInterface";
import {Node} from "cc";
import { NodeCellControl } from "../../../Proxy/PoolProxy/NodeCellControl";
export class BottomMenuCellPool extends NodeCellControl{ 
    protected InitNode(node:Node):void{//获取到对象池中的一个对象 
    }
    protected Use(node: Node, ...args: any[]): void {
        
    }
    protected UnUse(node: Node): void {
        
    }
}; 