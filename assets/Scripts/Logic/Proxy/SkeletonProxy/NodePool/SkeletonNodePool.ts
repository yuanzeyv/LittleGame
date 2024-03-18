import { WindowInterface } from "../../../../Compoment/WindowInterface";
import { NodeCellControl } from "../../PoolProxy/NodeCellControl";
import {Node,sp} from "cc";
export class SkeletonNodePool extends NodeCellControl{ 
    protected InitNode(node:Node):void{//获取到对象池中的一个对象
    } 
    protected Use(node: Node, ...args: any[]): void {
        node.addComponent(sp.Skeleton);
    }
    protected UnUse(node: Node): void {
        node.getComponent(sp.Skeleton).destroy();
    }
};  