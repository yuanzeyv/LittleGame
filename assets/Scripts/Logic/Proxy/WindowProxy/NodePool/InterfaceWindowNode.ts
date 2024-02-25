import { WindowInterface } from "../../../../Compoment/WindowInterface";
import { NodeCellControl } from "../../PoolProxy/NodeCellControl";
import {Node} from "cc";
export class InterfaceWindowNode extends NodeCellControl{
    
    protected InitNode(node:Node):void{//获取到对象池中的一个对象
        node.addComponent(WindowInterface).InitLayer();
    }
    protected Use(node: Node, ...args: any[]): void {
        
    }
    protected UnUse(node: Node): void {
        
    }
}; 