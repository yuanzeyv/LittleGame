import {Color, Node,Tween,sp} from "cc";
import { NodeCellControl } from "../../../PoolProxy/NodeCellControl";
import { GetTextMeshComp } from "../../../../../Util/Util";
export class FightNodeLabel extends NodeCellControl{ 
    protected InitNode(node:Node):void{//获取到对象池中的一个对象
    } 
    protected Use(node: Node,fontSize:number,text:string): void {
        GetTextMeshComp(node).string = text;
        GetTextMeshComp(node).fontSize = fontSize;
    }
    protected UnUse(node: Node): void { 
        Tween.stopAllByTarget(GetTextMeshComp(node));
        Tween.stopAllByTarget(node);
        GetTextMeshComp(node).string = ""; 
        GetTextMeshComp(node).lateUpdate(0);
        GetTextMeshComp(node).color = new Color(255,255,255,255);
        GetTextMeshComp(node).fontSize = 20; 
    }
};   