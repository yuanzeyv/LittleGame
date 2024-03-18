import { NodePool, Prefab,Node, instantiate } from "cc";
import { _Facade } from "../../../Global";
import { BundleProxy } from "../BundleProxy/BundleProxy";

export class NodeCellControl{ 
    private mNodePool:NodePool;
    private mContrelPrefab:Prefab;//管理的预制体
    private mSumCount:number = 0;//对象池总对象个数
    private mUsingCount:number = 0;//使用中的对象个数

    public constructor(prefabPath:string){
        this.mContrelPrefab = _Facade.FindProxy(BundleProxy).UseAsset("resources",prefabPath,Prefab);//对象池管理的预制体
        this.mNodePool = new NodePool();
    }

    protected Use(node:Node,...args):void{//使用时会做一个初始化
        //....do something
    }
     
    protected UnUse(node:Node):void{//放回时也会做一个初始化
        //....do something
    } 

    public Get(...args):Node{//获取到对象池中的一个对象
        let node:Node|undefined = this.mNodePool.get();
        if(node == undefined){
            node = instantiate(this.mContrelPrefab);//实例化这个节点对象
            this.InitNode(node);
            this.mSumCount++;
        }
        this.mUsingCount++; 
        this.Use(node,args);
        return node;
    }
    protected InitNode(node:Node):void{
    }

    public Put(node:Node):void{//放回一个节点到对象池中
        this.UnUse(node);
        this.mNodePool.put(node);
        this.mUsingCount--;
    }
    
    public Clear():void{//清理对象池
        this.mSumCount = this.mSumCount - this.mNodePool.size();
        this.mNodePool.clear();
    }


    public SumSize():number{//获取到当前对象次 总存活个数
        return this.mSumCount;
    }
    
    public UseSize():number{//获取到对象池使用中的个数
        return this.mUsingCount;
    }
    public IdleSize(){//获取到对象池空闲的个数
        return this.mSumCount - this.mUsingCount;
    }
};