import { GameObjectData } from "./GameObjectData";
import { GameObjectPool } from "./GameObjectPool";

export class GameRefObject<T extends GameObjectData>{ 
    private mGameObjectPool:GameObjectPool<T>;//获取到游戏对象池元素
    private mReferenceCount:number = 0;//引用计数为的话，将会立刻被清理
    private mIndex:number;//对象在对象池中的下标，用以立即查找 
    private mData:T; 
    public constructor(data:T){
        this.mData = data;
    }

    public Init():void{
        this.Data.Reset();//进行重置
    }

    public get Ref():number{ return this.mReferenceCount; }
    public set Ref(retCount:number){ this.mReferenceCount = retCount; }

    public RefAdd(){
        this.mGameObjectPool.Use(this);
    }

    public RefDec(){
        this.mGameObjectPool.UnUse(this);
    }

    public get Index(){ return this.mIndex; }
    public set Index(index:number){ this.mIndex = index; }

    //获取到指定下标的对象信息
    public get Data():T{
        return this.mData;
    }

    
};