//所有的加载规则统一。全部加延时
import { Asset, assetManager, AssetManager } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { BundleAssest } from "./BundleAsset";
import { ParaseUrl } from "../../../Util/Util"; 
export class LoadStruct{//加载结构体
    private mLoadHandle:ResourceListen;//加载回调
    private mAssetLoadStatusMap:Map<string,Asset> = new Map<string,Asset>();//待加载的资源数目
    private mNowLoad:number = 0;
    private mSucessLoad:number = 0;
    private mOperationAsset:string;

    public get NowLoad():number { return this.mNowLoad; }//当前加载数目
    public get SumLoad():number { return this.mAssetLoadStatusMap.size; }//加载总数
    public get SuccessNum():number{ return this.mSucessLoad;} //返回成功加载的数目
    public get FailNum():number{ return this.mNowLoad - this.mSucessLoad;} //返回当前失败个数
    public get Residue():number { return this.SumLoad - this.mNowLoad;}//剩余多少个待加载
    public get IsFinish():boolean { return this.NowLoad == this.SumLoad;}//是否加载完成
    public get OperationAssetName():string { return this.mOperationAsset;}//当前正在操作的资源名称
    public get OperationAsset():Asset|undefined { return this.mAssetLoadStatusMap.get(this.mOperationAsset);}//是否加载完成
    public get LoadMap():Map<string,Asset>  { return this.mAssetLoadStatusMap;}//是否加载完成
    
    public constructor(loadArray:Array<string>,loadHandle:ResourceListen){
        loadArray.every(path=> this.mAssetLoadStatusMap.set(path,undefined));
        this.mLoadHandle = loadHandle;
    }
    public LoadSuccess(path:string,asset:Asset):void{
        this.mOperationAsset = path;
        this.mAssetLoadStatusMap.set(path,asset);
        this.mNowLoad++;
        this.mSucessLoad++;
        this.mLoadHandle(this);
    }
    public LoadFail(path:string):void{
        this.mOperationAsset = path;
        this.mNowLoad++;
        this.mLoadHandle(this); 
    } 
};
export type ResourceListen = (data:LoadStruct)=>void;
export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type ProgressHandle  = (finished: number, total: number, item: AssetManager.RequestItem) => void;
export type CompleteHandle<T extends Asset>  = (err: Error | null, data:T) => void;
export type BundleName = string;

export class BundleProxy extends BaseProxy{  
    static get ProxyName():string { return "BundleProxy" };
    private static sLoadID:number = 1;//可以通过注册监听 或者轮询查询
    private mBundleAssetMap:Map<BundleName,BundleAssest> = new Map<BundleName,BundleAssest>();//bundleMap，用来存储所有已经加载的bundle

    private mLoadStructMap:Map<number,LoadStruct> = new Map<number,LoadStruct>();//加载信息
    
    private mLoadAssetMap:Map<string,Set<number>> = new Map<string,Set<number>>();//加载数组信息
    //加载一个bundle
    public LoadBundle(bundleName:string):Promise<boolean>{
        return new Promise<boolean>((resolve: (value: boolean | PromiseLike<boolean>) => void)=>{
            let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);
            if(bundleAsset != undefined){
                console.log(`Bundle:${bundleName} 已经被加载了`);
                return resolve(true);//直接返回成功
            }
            assetManager.loadBundle(bundleName,undefined,this._LoadBundleHandle.bind(this,bundleName,resolve));//准备加载Bundle
        });
    }
    
    //加载回调
    private _LoadBundleHandle(bundleName:string,resolve: (value: boolean | PromiseLike<boolean>) => void,err: Error | null, bundle: AssetManager.Bundle){
        if(err != undefined){
            console.log(`加载${bundleName}资源库出现了错误,Bundle加载失败了(${err.message})`);
            return resolve(false);
        }
        let bundleAsset:BundleAssest = new BundleAssest(this,bundle);//创建Bundle
        this.mBundleAssetMap.set(bundleName,bundleAsset);
        return resolve(true);
    }

    //生成一个解析
    private GenerationAnalysis(paths:Array<string>,loadHandle:ResourceListen):number{
        let loadStruct:LoadStruct|undefined = new LoadStruct(paths,loadHandle);//准备生成加载结构体
        let loadID = BundleProxy.sLoadID++;//创建加载ID
        this.mLoadStructMap.set(loadID,loadStruct);//设置
        for(let path of paths){
            if(!this.mLoadAssetMap.has(path))
                this.mLoadAssetMap.set(path,new Set<number>());
            let listenSet:Set<number> = this.mLoadAssetMap.get(path);
            listenSet.add(loadID);
        }
        return loadID;
    }
    
    //当一个资源被加载完毕时
    public AssetLoadFinish(path:string,asset?:Asset){
        let listenSet:Set<number>|undefined = this.mLoadAssetMap.get(path);//获取到所有监听本资源的数据对象
        if(listenSet == undefined){ 
            console.warn(`无资源监听${path}`);
            return;
        }
        for(let loadID of listenSet){
            let loadStruct:LoadStruct|undefined = this.mLoadStructMap.get(loadID);//获取到加载对象
            if(asset != undefined){
                asset.addRef();//添加引用计数
                loadStruct.LoadSuccess(path,asset)
            } else {
                loadStruct.LoadFail(path)
            }
            if(loadStruct.IsFinish){
                for(let asset of loadStruct.LoadMap.values()){
                    if(asset == undefined)  
                        continue;
                    asset.decRef;
                }
            }
        }
        listenSet.clear();//清理
        this.mLoadAssetMap.delete(path);//清理
    }

    /*
    参数:
    path:加载资源路径
    */
    public Load(path:string,loadStructHandle:(loadStruct:LoadStruct)=>void):void{
        this.GenerationAnalysis([path],loadStructHandle);//解析加载 
        let url:{bundleName:string,url:string} | undefined = ParaseUrl(path)//获取到Url 
        if(url == undefined){
            this.AssetLoadFinish(path);
            return;//如果没有bundle名称的话
        } 
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
        if(bundleAsset == undefined){
            console.log(`加载文件失败:bundleAsset未被正确加载`);
            this.AssetLoadFinish(path);
            return;
        }
        bundleAsset.Load(url.url);//让这个Bundle加载一个资源 
        return;
    }

    //加载一组资源
    //paths 加载资源组  
    //isListen 是否需要被监听
    public LoadArr(paths:Array<string>,loadStructHandle:(loadStruct:LoadStruct)=>void):void{//解析一组资源
        this.GenerationAnalysis(paths,loadStructHandle);
        for(let path of paths){
            let url:{bundleName:string,url:string} | undefined = ParaseUrl(path)//获取到Url 
            if(url == undefined){
                this.AssetLoadFinish(path);
                continue;//如果没有bundle名称的话
            } 
            let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
            if(bundleAsset == undefined){
                console.log(`加载文件失败:bundleAsset未被正确加载`);
                this.AssetLoadFinish(path);
                continue;
            }
            bundleAsset.Load(url.bundleName);//让这个Bundle加载一个资源 
            return;
        }
    }

    //准备释放一个资源
    public ReleaseAsset(paths:string){
        let url:{bundleName:string,url:string} | undefined = ParaseUrl(paths)//获取到Url
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
        if(bundleAsset == undefined){
            console.log(`释放资源失败:bundleAsset未被正确加载`);
            return;
        }
        bundleAsset.DecRef(url.url);
    } 
    //使用这个资源，并郑家引用计数
    public UseAsset(path:string):Asset{//不可能返回空资源
        let url:{bundleName:string,url:string} | undefined = ParaseUrl(path)//获取到Url
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
        return bundleAsset.UseAsset(url.url);
    }
    //取消使用这个资源
    public UnUseAsset(path:string):void{//不可能返回空资源
        let url:{bundleName:string,url:string} | undefined = ParaseUrl(path)//获取到Url
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
        bundleAsset.DecRef(url.url);
    }
}