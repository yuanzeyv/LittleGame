import { Node, find, sp } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { ePoolDefine } from "../PoolProxy/PoolDefine";
import { PoolProxy } from "../PoolProxy/PoolProxy";
import { SpineMediator } from "./Const/SpineMediator";
import { ResouceProxy } from "../ResourceProxy/ResouceProxy";
import { SkeletonNodePool } from "./NodePool/SkeletonNodePool";

//用于管理游戏中的所有Spine资源的创建
//存在一个对象池，存放所有spine源节点的
//要求就是对Spine特效多了一级封装，使Spine特效可以在
export class SkeletonProxy extends BaseProxy{ 
    static get ProxyName():string { return "SkeletonProxy" };
    public onLoad(): void {
    } 
    //获取到一个节点，并给节点添加上
    public CreateSpineEffect(parent:Node,path:string,socketArray:Array<string> = new Array<string>()):SpineMediator{
        let spineNode:Node = _Facade.FindProxy(PoolProxy).Get(ePoolDefine.SkeletonNode);
        let spineMediator:SpineMediator = new SpineMediator(spineNode,socketArray);
        _Facade.FindProxy(ResouceProxy).Load(find("Skelete",spineNode).getComponent(sp.Skeleton),"skeletonData","resources",`GameResource/Spine/${path}`,sp.SkeletonData,()=>{
            spineMediator.LoadFinishHandle(); 
        }); 
        parent.addChild(spineNode);
        return spineMediator;
    }

    //回收Spine特效
    public RecycleSpineEffect(spineMediator:SpineMediator){ 
        spineMediator.ClearSocketNode();
        _Facade.FindProxy(ResouceProxy).UnLoad(spineMediator.GetSp(),"skeletonData")
        _Facade.FindProxy(PoolProxy).Put(ePoolDefine.SkeletonNode,spineMediator.GetNode());        
    } 
      
    //实例化一个窗口预制体 
    public InitNodePool():void{ 
        _Facade.FindProxy(PoolProxy).CreateNodePool(ePoolDefine.SkeletonNode,new SkeletonNodePool("LayerSource/Basics/Prefab/SkeletonPoolNode/SkeletonPoolNode"));
    } 
}   