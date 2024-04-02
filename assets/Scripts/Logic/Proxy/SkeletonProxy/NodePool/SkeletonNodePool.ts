import { NodeCellControl } from "../../PoolProxy/NodeCellControl";
import {Node,Vec3,find,sp} from "cc";
export class SkeletonNodePool extends NodeCellControl{ 
    protected InitNode(node:Node):void{//获取到对象池中的一个对象
    } 
    protected Use(node: Node, ...args: any[]): void {
        find("Skelete",node).addComponent(sp.Skeleton);
    }
    protected UnUse(node: Node): void {
        find("Skelete",node).getComponent(sp.Skeleton).destroy();
        find("Skelete",node).setScale(new Vec3(1,1,1)); 
    } 
};   