import { Asset, assetManager, AssetManager } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { BundleAssest } from "./BundleAsset";
import { ParaseUrl } from "../../../Util/Util"; 
import { NotificationEnum } from "../../../NotificationTable";
export type ResourceListen = (data:LoadStruct)=>void;
export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type ProgressHandle  = (finished: number, total: number, item: AssetManager.RequestItem) => void;
export type CompleteHandle<T extends Asset>  = (err: Error | null, data:T) => void;
export type BundleName = string;
export class LoadStruct{//加载结构体
    private mLoadHandle:ResourceListen;//加载回调
    private mAssetLoadStatusMap:Map<string,Map<ResouoceType<Asset>,Asset|undefined>> = new Map<string,Map<ResouoceType<Asset>,Asset|undefined>>();//待加载的资源数目
    private mSumLoadCount:number = 0;//待加载的总数
    private mLoadStatusObj:{succ:number,fail:number} = {succ:0,fail:0};
    private mOperationAsset:{path:string,type:ResouoceType<Asset>}|undefined;

    public get SumLoad():number { return this.mSumLoadCount; }//加载总数
    public get NowLoad():number { return this.mLoadStatusObj.succ + this.mLoadStatusObj.fail; }//当前加载数目
    public get SuccessNum():number{ return this.mLoadStatusObj.succ;} //返回成功加载的数目
    public get FailNum():number{ return this.mLoadStatusObj.fail;} //返回当前失败个数
    public get Residue():number { return this.SumLoad - this.NowLoad;}//剩余多少个待加载
    public get IsFinish():boolean { return this.Residue == 0;}//是否加载完成
    //加载操作资源
    public get OperationAsset():Asset|undefined  {  return this.GetAsset(this.mOperationAsset.path,this.mOperationAsset.type);}  
    public get OperationAssetName():string { return this.mOperationAsset.path;}//当前正在操作的资源名称
    public get OperationAssetType():ResouoceType<Asset> { return this.mOperationAsset.type;}//是否加载完成
    //加载一个资源
    public GetAsset(path:string,type:ResouoceType<Asset>):Asset|undefined{
        let typeAssetMap:Map<ResouoceType<Asset>,Asset> = this.mAssetLoadStatusMap.get(path)!;
        return typeAssetMap.get(type);
    }
    
    public constructor(loadArray:Array<{path:string,type:new (...args:any[])=>Asset}>,loadHandle:ResourceListen){
        this.mSumLoadCount = loadArray.length;
        for(let cell of loadArray){
            let typeMap:Map<ResouoceType<Asset>,Asset>|undefined= this.mAssetLoadStatusMap.get(cell.path);
            if(typeMap == undefined){
                typeMap = new Map<ResouoceType<Asset>,Asset>();
                this.mAssetLoadStatusMap.set(cell.path,typeMap) ;
            }
            typeMap.set(cell.type,undefined);
        }
        this.mLoadHandle = loadHandle;
    }
    public LoadFinish(path:string,type:ResouoceType<Asset>,asset:Asset|undefined):void{
        this.mOperationAsset = {path:path,type:type};
        if(asset == undefined){
            this.mLoadStatusObj.fail++;
        }else{
            this.mLoadStatusObj.succ++;
            asset.addRef();//对资源添加引用计数，确保资源可控
        }
        let typeMap:Map<ResouoceType<Asset>,Asset>= this.mAssetLoadStatusMap.get(path)!;
        typeMap.set(type,asset);
        this.mLoadHandle(this);
    } 
    public LoadOver(){
        for(let typeCell of this.mAssetLoadStatusMap.values()){
            for(let assetCell of typeCell.values()){
                assetCell?.decRef();
            }
        }
    }
};
export class BundleProxy extends BaseProxy{  
    static get ProxyName():string { return "BundleProxy" };
    private static sLoadID:number = 1;//可以通过注册监听 或者轮询查询
    private mBundleAssetMap:Map<BundleName,BundleAssest> = new Map<BundleName,BundleAssest>();//bundleMap，用来存储所有已经加载的bundle
    private mLoadStructMap:Map<number,LoadStruct> = new Map<number,LoadStruct>();//加载信息
    private mLoadAssetMap:Map<string,Map<ResouoceType<Asset>,Set<number>>> = new Map<string,Map<ResouoceType<Asset>,Set<number>>>();//加载数组信息
    //加载一个bundle
    public LoadBundle(bundleName:string):void{
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);//加载一个Bundle 
        if(bundleAsset != undefined) return;//资源已经被加载过了
        assetManager.loadBundle(bundleName,undefined,this._LoadBundleHandle.bind(this,bundleName));//准备加载Bundle
    }
    //加载回调
    private _LoadBundleHandle(bundleName:string,err: Error | null, bundle: AssetManager.Bundle):void{
        if(err == undefined) this.mBundleAssetMap.set(bundleName,new BundleAssest(this,bundle));
        _Facade.Send(NotificationEnum.BundleLoadResult,{bundleName:bundleName,isSuccess:err == undefined})
    }
    
    //生成一个解析
    private GenerationAnalysis(loadDatas:Array<{path:string,type:ResouoceType<Asset>}>,loadHandle:ResourceListen):number{
        let loadStruct:LoadStruct|undefined = new LoadStruct(loadDatas,loadHandle);//新建一个结构数组
        let loadID = BundleProxy.sLoadID++;//创建加载ID
        for(let cell of loadDatas){//生成资源Map
            if(!this.mLoadAssetMap.has(cell.path))
                this.mLoadAssetMap.set(cell.path, new Map<ResouoceType<Asset>,Set<number>>());
            let listenMap:Map<ResouoceType<Asset>,Set<number>> = this.mLoadAssetMap.get(cell.path);
            if(!listenMap.has(cell.type))
                listenMap.set(cell.type, new Set<number>());
            listenMap.get(cell.type).add(loadID);
        }
        this.mLoadStructMap.set(loadID,loadStruct);//设置
        return loadID;
    }
    //加载一个资源
    public Load(path:string,type:ResouoceType<Asset>,loadStructHandle:(loadStruct:LoadStruct)=>void):void{
        this.LoadArr([{path:path,type:type}],loadStructHandle);
    }
    //加载一组资源 
    public LoadArr(loadDatas:{path:string,type:ResouoceType<Asset>}[],loadStructHandle:(loadStruct:LoadStruct)=>void):void{//解析一组资源
        this.GenerationAnalysis(loadDatas,loadStructHandle);
        for(let loadData of loadDatas){
            let url:{bundleName:string,url:string} | undefined = ParaseUrl(loadData.path)//获取到Url 
            if(!url){//资源加载失败时
                this.AssetLoadFinish(loadData.path,loadData.type);
                return;
            } 
            let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
            if(bundleAsset == undefined){
                this.AssetLoadFinish(loadData.path,loadData.type);
                console.log(`Budnle:${url.bundleName}未被正确加载`);
                return;
            }
            bundleAsset.Load(url.url,loadData.type);//加载资源
        }
    }
    
    //当一个资源被加载完毕时
    public AssetLoadFinish(path:string,type:ResouoceType<Asset>,asset?:Asset){
        let listenMap:Map<ResouoceType<Asset>,Set<number>>|undefined = this.mLoadAssetMap.get(path);//获取到所有监听本资源的数据对象
        if(listenMap == undefined){//此路径并没有资源正在被监听
            console.warn(`资源:${path},没有被加入监听队列`);
            return;
        }
        let typeSet:Set<number>|undefined = listenMap.get(type);
        if(typeSet == undefined){//此路径并没有资源正在被监听
            console.warn(`类型:${type.name} 资源:${path},类型没有被加入监听队列`);
            return;
        }
        //资源在加载完成后，会立即添加一次引用
        for(let loadID of typeSet){
            let loadStruct:LoadStruct|undefined = this.mLoadStructMap.get(loadID);//获取到加载对象
            loadStruct.LoadFinish(path,type,asset);
            if(loadStruct.IsFinish)
                loadStruct.LoadOver();
        }
        typeSet.clear();//清理
        listenMap.delete(type);
        if(listenMap.size == 0)
            this.mLoadAssetMap.delete(path);//清理
    } 
    //使用这个资源，并郑家引用计数 
    public UseAsset<T extends Asset>(path:string,type:ResouoceType<T>):T{//不可能返回空资源
        let url:{bundleName:string,url:string} | undefined = ParaseUrl(path)//获取到Url
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
        return bundleAsset.UseAsset(url.url,type) as T;
    }
    //取消使用这个资源
    public UnUseAsset<T extends Asset>(path:string,type:ResouoceType<T>):void{//不可能返回空资源
        let url:{bundleName:string,url:string} | undefined = ParaseUrl(path)//获取到Url
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(url.bundleName);//获取到是否拥有bundle
        bundleAsset.DecRef(url.url,type);
    } 
}