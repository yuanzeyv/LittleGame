import {Node,sp} from "cc";
import { NodeCellControl } from "../../../PoolProxy/NodeCellControl";
export class BuffIconNodePool extends NodeCellControl{ 
    protected InitNode(node:Node):void{//获取到对象池中的一个对象
    } 
    protected Use(node: Node, ...args: any[]): void {
        node.addComponent(sp.Skeleton);
    }
    protected UnUse(node: Node): void {
        node.getComponent(sp.Skeleton).destroy();
    }
};  