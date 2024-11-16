import { _G } from "../../../../Global";
import { SoltCell } from "../../../../Util/Time/TimeWheel";
import { RBNode, RBTree } from "../../../../Util/Tree/RBTree"; 
import { GameObjectData } from "./GameObjectData";
import { GameRefObject } from "./GameRefObject";
export class GameObjectPool<T extends GameObjectData>{
    private mGenrateConsHandle:new ()=>T;//用以生成的构造函数、

    private mClearTime:number = 20000;//清理间隔
    private mTimeColt:SoltCell = undefined;//定时器

    //空间换时间的策略 
    private mRefObjArr:Array<GameRefObject<T>> = new Array<GameRefObject<T>>();//正在使用的属性列表
    //这个池子中的元素，是绝对没人引用的 
    private mGameRefPool:Array<GameRefObject<T>> = new Array<GameRefObject<T>>();

    //设置使用 与 未使用的列表
    private mUseingAttrMap:RBTree<number,number> = new RBTree<number,number>();//记录已使用的下标，这里会保存顺序
    private mUnUseingAttrMap:RBTree<number,number> = new RBTree<number,number>();//记录未使用的下标，这里会保存顺序

    constructor(handle:new ()=>T){
        this.mGenrateConsHandle = handle;
        this.mTimeColt = _G.TimeWheel.Set(this.mClearTime,this.ClearHandle.bind(this));//之后的每一秒都进行一次
    }

    //生成一个游戏对象(生成时会自动的将生命 + 1，不用时，需要自行释放)
    public GenerateGameObject():GameRefObject<T>{
        let gameRefObj:GameRefObject<T> = this.mGameRefPool.pop();//弹出一个可用的游戏引用对象
        if( gameRefObj == undefined){
            gameRefObj = new GameRefObject<T>(new this.mGenrateConsHandle());
            gameRefObj.Data.Init(gameRefObj);
        }
        gameRefObj.Index = this.mRefObjArr.length;//确认插入下标
        if(this.mUnUseingAttrMap.Count != 0){//如果未使用的属性Map不等于0的话，优先往前面插入
            let min:RBNode<number,number> = this.mUnUseingAttrMap.GetMin();
            this.mUnUseingAttrMap.Del(min.Key);
            gameRefObj.Index = min.Key;
        }
        this.Use(gameRefObj);//生成后，立即加入到引用计数
        this.mRefObjArr[gameRefObj.Index] = gameRefObj;
        this.mUseingAttrMap.Set(gameRefObj.Index);
        this.mUnUseingAttrMap.Del(gameRefObj.Index);
        gameRefObj.Init();//进行初始化
        return gameRefObj;
    }

    //尝试将对象此对象放回去
    public Use(gameObj:GameRefObject<T>):void{
        gameObj.Ref++;//自加
    }
    
    //尝试将对象此对象放回去
    public UnUse(gameObj:GameRefObject<T>):void{
        gameObj.Ref--;//自减
        if(gameObj.Ref > 0)//引用次数大于0，直接返回
            return;
        this.mGameRefPool.push(this.mRefObjArr[gameObj.Index]);//归还
        this.mRefObjArr[gameObj.Index] = undefined;
        this.mUseingAttrMap.Del(gameObj.Index);
        this.mUnUseingAttrMap.Set(gameObj.Index);
    }

    private ClearHandle(){
        let useLenth:number = this.mRefObjArr.length;//使用中的对象长度
        while(!0){
            let minNode:RBNode<number,number> = this.mUnUseingAttrMap.GetMin(); //获取到未使用的最小的值
            let maxNode:RBNode<number,number> = this.mUseingAttrMap.GetMax();//获取到使用中的最大的值
            if( minNode == undefined || maxNode == undefined || maxNode.Key < minNode.Key){
                if( maxNode == undefined )//美欧使用中的节点
                    useLenth != 0 && (useLenth = 0);
                else
                    useLenth = maxNode.Key + 1;
                break; 
            } 
            this.mRefObjArr[maxNode.Key].Index = minNode.Key;
            this.mRefObjArr[minNode.Key] = this.mRefObjArr[maxNode.Key];
            this.mRefObjArr[maxNode.Key] = undefined;
            //获取到使用中的下标
            this.mUseingAttrMap.Set(minNode.Key); 
            this.mUseingAttrMap.Del(maxNode.Key);
            this.mUnUseingAttrMap.Set(maxNode.Key); 
            this.mUnUseingAttrMap.Del(minNode.Key);
        }
        this.mRefObjArr.length = useLenth;//重新赋值数组长度
        this.mGameRefPool.length = this.mGameRefPool.length - Math.ceil(this.mGameRefPool.length / 4);
        //首先遍历所有正在使用中的属性对象信息
        this.mTimeColt = _G.TimeWheel.Set(this.mClearTime,this.ClearHandle.bind(this));
    }

    //尝试销毁这个对象池
    public Destory():void{
        //清理时，将会判断使用中的数组是否已经为0了，不管是否为0，都会进行直接暴力清除，但是如果不为0，会进行一次打印警告
        if(this.mRefObjArr.length != 0 )
            console.warn(`尝试删除一个对象池,但对象池仍有${this.mRefObjArr.length}个对象正在被使用`);
        this.mRefObjArr.length = 0;
        this.mGameRefPool.length = 0;
        this.mUseingAttrMap.Clear();//清理使用红黑树
        this.mUnUseingAttrMap.Clear();//清理未使用红黑树
        this.mTimeColt.Stop();//立即停止执行定时回调
        this.mTimeColt = undefined;
    }
} 