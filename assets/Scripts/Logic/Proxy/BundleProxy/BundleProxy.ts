import { Asset, assetManager, AssetManager, sp } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { BundleAssest } from "./BundleAsset"; 
import { SyncMicroTask } from "../../../Util/Util"; 
let GLoadID:number = 1;//可以通过注册监听 或者轮询查询 

type BundleName = string;
export let QQQQ:number = 0;
export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type LoadID = number;
export type UUID = string;
export type TAssetLoadType = {bundleName:string,dirName:string,isFile?:boolean,type?:ResouoceType<Asset>};
export class LoadStruct{//加载结构体 
    private mAssetLoadStatusMap:Map<UUID,{bundleName:BundleName,path:string,ctor:ResouoceType<Asset>,asset?:Asset|undefined}> = new Map<UUID,{bundleName:BundleName,path:string,ctor:ResouoceType<Asset>,asset?:Asset|undefined}>();//使用者只需要知道加载完，或没加载完即可，不需要过分干涉内部实现
    private mSumCount:number = 0;//待加载的总数
    private mSumFailCount:number = 0;//加载成功的数目 
    private mSumSuccessCount:number = 0;//失败的数目
    //已知的必定失败的情况
    public FailInc(){ this.mSumFailCount++; }
    //当前是否加载完毕
    public IsFinish():boolean{ return (this.mSumFailCount + this.mSumSuccessCount) == this.mSumCount; }
    //是否全部资源都加载完毕了
    public IsAllComplete():boolean{ return this.mSumSuccessCount == this.mSumCount; }
    //添加一个UUID映射  
    public AddUUIDMapping(uuid:string,bundleName:BundleName,path:string,ctor:ResouoceType<Asset>):boolean{
        if(this.mAssetLoadStatusMap.has(uuid))//已经添加了
            return false;
        this.mAssetLoadStatusMap.set(uuid,{path:path,ctor:ctor,bundleName:bundleName});
        return true;
    }
    //当前加载成功的个数
    public GetSuccessCount():number{
        return this.mSumSuccessCount;
    }
    //当前加载失败的个数
    public GetFailCount():number{
        return this.mSumFailCount;
    }
    //当前加载失败的个数
    public GetLoadSumCount():number{
        return this.mSumCount;
    }
    public SetLoadSumCount(count:number):void{
        this.mSumCount = count;
    }
    //当前加载的总个数
    //资源加载成功时，进行值设置
    public AssetLoadFinish(uuid:string,asset:Asset|undefined){
        if(asset == undefined ){
            this.mSumFailCount++; 
            return;
        }
        this.mSumSuccessCount++;
        this.mAssetLoadStatusMap.get(uuid)!.asset = asset;
    }
    //获取到所有已经加载成功的数据信息
    public GetFinishAssetSet():Map<UUID,{bundleName:BundleName,path:string,ctor:ResouoceType<Asset>,asset?:Asset|undefined}>{
        let tempMap:Map<UUID,{bundleName:BundleName,path:string,ctor:ResouoceType<Asset>,asset?:Asset|undefined}> = new Map<UUID,{bundleName:BundleName,path:string,ctor:ResouoceType<Asset>,asset?:Asset|undefined}>();
        for(let cell of this.mAssetLoadStatusMap){
            if(cell[1].asset == undefined)
                continue;
            tempMap.set(cell[0],cell[1]);
        }
        return tempMap;
    }
    //通过UUID获取到对应的原始信息
    public GetLoadDataByUUID(uuid:UUID):{bundleName:BundleName,path:string,ctor:ResouoceType<Asset>,asset?:Asset|undefined}{
        return this.mAssetLoadStatusMap.get(uuid);
    }
};

export class ListenObj{
    private mLoadID:LoadID;
    private mFinishHandle:(loadStruct:LoadStruct)=>void;
    private mProgressHandle:(loadStruct:LoadStruct)=>void;
    constructor(loadID:LoadID,finishHandle:(loadStruct:LoadStruct)=>void,progressHandle?:(loadStruct:LoadStruct)=>void){
        this.mFinishHandle = finishHandle;
        this.mProgressHandle = progressHandle; 
        this.mLoadID = loadID;
    }
    public LoadID():LoadID{
        return this.mLoadID;
    }
    public Progress(loadStruct:LoadStruct){
        if(this.mProgressHandle)
            this.mProgressHandle(loadStruct);
    }
    public Finish(loadStruct:LoadStruct){
        if(this.mFinishHandle)
            this.mFinishHandle(loadStruct);
    }
}

export class BundleProxy extends BaseProxy{  
    static get ProxyName():string { return "BundleProxy" };
    private mBundleAssetMap:Map<BundleName,BundleAssest> = new Map<BundleName,BundleAssest>();//用来加载具体的Bundle实例
    private mListenMap:Map<LoadID,Set<ListenObj>> = new Map<LoadID,Set<ListenObj>>();
    private mLoadStructMap:Map<LoadID,LoadStruct> = new Map<LoadID,LoadStruct>();//加载信息
    private mLoadAssetMap:Map<UUID,Set<LoadID>> = new Map<UUID,Set<LoadID>>();//对应UUID 被某个LoadID加载的情况
    /*
    *加载一个Bundle
    */
    public LoadBundle(bundleName:string,completeHandle:(bundleName:string,isComplete:boolean)=>void):boolean{
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);
        if(bundleAsset != undefined){//资源已经被加载过了
            console.warn(`Bundle:${bundleName} 已成功加载，请勿重复加载`);//Bundle已经被成功加载了
            return false;
        }
        assetManager.loadBundle(bundleName,undefined,this.LoadBundleHandle.bind(this,bundleName,completeHandle));
        return true;
    }
    private LoadBundleHandle(bundleName:string,completeHandle:(bundleName:string,isComplete:boolean)=>void | undefined,err: Error | null, bundle: AssetManager.Bundle):void{
        if(err != undefined){
            console.warn(`Bundle:${bundleName} 加载失败了，错误原因:${err}`)
            return ;
        }
        if(this.mBundleAssetMap.has(bundleName)){//已经加载过了，请勿重复加载
            console.warn(`Bundle:${bundleName} 已成功加载，请勿重复加载`);
            return;
        }
        this.mBundleAssetMap.set(bundleName,new BundleAssest(this,bundle));
        completeHandle(bundleName,err == undefined);//不可为空
    } 
    //注册一个加载监听对象
    public RegisterListen(listenObj:ListenObj):void{
        let loadID:LoadID = listenObj.LoadID();
        if(this.mLoadStructMap.has(loadID) == false)
            return;
        let listenSet:Set<ListenObj> = this.mListenMap.get(loadID);
        if(listenSet == undefined){
            listenSet = new Set<ListenObj>(); 
            this.mListenMap.set(loadID,listenSet);
        } 
        listenSet.add(listenObj);
    } 
    /*
    *资源加载成功回调
    */
    private NotifyLoadProgress(loadID:number,loadStruct:LoadStruct,uuid:UUID,asset:Asset){
        loadStruct.AssetLoadFinish(uuid,asset);
        let listenSet:Set<ListenObj> = this.mListenMap.get(loadID);
        if(listenSet != undefined){
            for(let cell of listenSet)
                cell.Progress(loadStruct);
        }
        //强制要求加载完成必须异步，所以此处异步调用
        if(loadStruct.IsFinish())
            SyncMicroTask(()=> this.NotifyCompleteHandle(loadID,loadStruct))
    }
    
    private NotifyCompleteHandle(loadID:number,loadStruct:LoadStruct,){
        //所有的资源在被加载的时候，就会被添加一次引用。
        //如果到资源加载结束后，没有被监听，便会被自动释放，否则必须手动释放资源数据信息
        let listenSet:Set<ListenObj> = this.mListenMap.get(loadID);
        if(listenSet != undefined){
            this.mListenMap.delete(loadID); 
            for(let cell of listenSet)
                cell.Finish(loadStruct);
        } else//自动释放
            this.DestoryLoadID(loadID); //如果到加载完成依旧没人监听的话,立即释放本id下的所有资源
    }
    
    /*
    *资源加载主入口
    */
    public LoadArr(loadDatas:{bundle:string,path:string,type:ResouoceType<Asset>}[]):LoadID{//解析一组资源
        let loadID = GLoadID++;
        let sumCount:number = 0;
        let loadStruct:LoadStruct = new LoadStruct();//新建一个结构数组
        //去除存在的重复资源，不存在的不会并入资源计算
        let removeDuplicatesLoadDatas:Map<BundleAssest,Map<ResouoceType<Asset>,Map<string,UUID>>> = new Map<BundleAssest,Map<ResouoceType<Asset>,Map<string,UUID>>>();
        for(let cell of loadDatas){//生成资源Map
            sumCount++;
            let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(cell.bundle);//查询Bundle是否存在
            if(bundleAsset == undefined){//无效的资源，不会进行提醒
                loadStruct.FailInc();
                console.warn(`尝试在未加载的Bundle:${cell.bundle}中请求资源${cell.path} `);
                continue;
            }
            let fileUUID:string|undefined = bundleAsset.GetUUID(cell.path,cell.type);//尝试通过路径获取到对应的资源UUID
            if(fileUUID == undefined){//没有在bundle中找到对应的文件 
                loadStruct.FailInc();
                console.warn(`Bundle:${cell.bundle}中不存在资源:${cell.path} `);
                continue
            }
            if(loadStruct.AddUUIDMapping(fileUUID,cell.bundle,cell.path,cell.type) == false){//添加UUID映射，等待被正式加载
                sumCount--;
                console.warn(`Bundle:${cell.bundle},资源重复加载:${cell.path} `);
                continue
            } 
            //添加加载资源
            let loadAsset:Set<number>|undefined = this.mLoadAssetMap.get(fileUUID);
            if(loadAsset == undefined){
                loadAsset = new Set<LoadID>();
                this.mLoadAssetMap.set(fileUUID,loadAsset);
            }
            loadAsset.add(loadID);

            let resourceMap:Map<ResouoceType<Asset>,Map<string,UUID>>|undefined = removeDuplicatesLoadDatas.get(bundleAsset);
            if(resourceMap == undefined){
                resourceMap = new Map<ResouoceType<Asset>,Map<string,UUID>>();
                removeDuplicatesLoadDatas.set(bundleAsset,resourceMap);
            }
            let typeArray:Map<string,UUID>|undefined = resourceMap.get(cell.type);
            if(typeArray == undefined){
                typeArray = new Map<string,UUID>();
                resourceMap.set(cell.type,typeArray);
            }
            typeArray.set(cell.path,fileUUID);
        } 
        loadStruct.SetLoadSumCount(sumCount);//设置数量
        this.mLoadStructMap.set(loadID,loadStruct);//设置  
        //遍历去重的资源信息  
        for(let cell of removeDuplicatesLoadDatas) {
            for(let pathArr of cell[1]){
                cell[0].Load(pathArr[1],pathArr[0]);
                //cell.bundleAsset!.Load(cell.path,cell.type);//立即加载资源
            }
        }
        if(loadStruct.IsFinish())
            SyncMicroTask(()=> this.NotifyCompleteHandle(loadID,loadStruct))
        return loadID;
    } 
    
    //加载资源被设置为强行异步。不会同步进行资源加载
    public Load(bundleName:string,path:string,type:ResouoceType<Asset>):number{
        return this.LoadArr([{bundle:bundleName,path:path,type:type}]);
    }
    //加载一个文件夹
    public LoadDir(bundleName:string,dirName:string):number{//加载一个目录 
        let loadArray:Array<{bundle:string,path:string,type:ResouoceType<Asset>}> = new Array<{bundle:string,path:string,type:ResouoceType<Asset>}>();
        let bundle:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);
        if(bundle == undefined)//存在bundle
            return this.LoadArr(loadArray);;
        for(let cell of bundle.GetDirFiles(dirName))//获取到目录下所有资源信息
            loadArray.push({bundle:bundleName,path:cell.path,type:cell.ctor});
        return this.LoadArr(loadArray);//加载本组内容
    } 
    //加载一组文件夹
    //isFull的含义为，资源管理系统会将图片SpriteFrame归为一个文件夹,此时如果按照加载路径的方式加载一个Spine的资源，最终会找到SPriteFrame文件夹下的图片，而不会找到所需的Spine资源，所以这儿做了这么一个限制
    public LoadDirs(dirs:TAssetLoadType[]):number{
        let loadArray:Array<{bundle:string,path:string,type:ResouoceType<Asset>}> = new Array<{bundle:string,path:string,type:ResouoceType<Asset>}>();
        for(let cell of dirs){
            let bundle:BundleAssest|undefined = this.mBundleAssetMap.get(cell.bundleName);
            if(bundle == undefined)//存在bundle
                continue;
            if(cell.isFile){
                loadArray.push({bundle:cell.bundleName,path:cell.dirName,type:cell.type});
            } else {
                for(let data of bundle.GetDirFiles(cell.dirName))//获取到目录下所有资源信息
                    loadArray.push({bundle:cell.bundleName,path:data.path,type:data.ctor});
            } 
        } 
        return this.LoadArr(loadArray);//加载本组内容
    }
 
    //取消加载一个指定的ID
    public DestoryLoadID(loadID:number):void{
        let loadStruct:LoadStruct|undefined = this.mLoadStructMap.get(loadID);
        if(loadStruct == undefined)
            return;
        let loadFinishMap:Map<string, {bundleName:string,path: string; ctor: ResouoceType<Asset>; asset?: Asset; }> = loadStruct.GetFinishAssetSet();
        loadFinishMap.forEach((cell)=>{
            if(cell.asset == undefined)
                return;
            this.UnUseAsset(cell.bundleName,cell.path,cell.ctor);
        }); 
        this.mLoadStructMap.delete(loadID);
    }

    //一个指定的LoadID是否已经加载完了所有的资源
    public ResourceLoadFinishByLoadID(loadID:number):boolean{
        let loadStruct:LoadStruct|undefined = this.mLoadStructMap.get(loadID);
        if(loadStruct == undefined)
            return false;
        return loadStruct.IsAllComplete();
    }
     
    //当一个资源被加载完毕时
    public AssetLoadFinish(bundleName:string,uuid:string,asset?:Asset){
        if(uuid == "a495b109-08a4-4361-8843-b5813e68fc1c"){
            console.log("进入了");
        }
        let typeSet:Set<number>|undefined = uuid && this.mLoadAssetMap.get(uuid);//获取到所有监听本资源的数据对象
        if(typeSet == undefined){//程序不会进入此回调
            console.error(`资源:${uuid},没有被加入监听队列,请检查游戏逻辑`);
            return;
        }    
        //资源在加载完成后，会立即添加一次引用
        for(let loadID of typeSet){
            let loadStruct:LoadStruct|undefined = this.mLoadStructMap.get(loadID);//获取到加载对象
            this.NotifyLoadProgress(loadID,loadStruct,uuid,asset);
            if(asset != undefined)
                this.UseAssetByUUID(bundleName,uuid);
        }
        typeSet.clear();//清理 
        this.mLoadAssetMap.delete(uuid);//清理
    } 

    //使用这个资源，并增加引用计数 
    public UseAsset<T extends Asset>(bundleName:string,path:string,type:ResouoceType<T>):T{//不可能返回空资源
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);//获取到是否拥有bundle
        return bundleAsset.UseAsset(path,type) as T; 
    }
    //取消使用这个资源
    public UnUseAsset<T extends Asset>(bundleName:string,path:string,type:ResouoceType<T>):void{//不可能返回空资源
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);//获取到是否拥有bundle
        bundleAsset.DecRef(path,type);
    } 
    public UnUseAssetByUUID(bundleName:string,uuid:UUID):void{//不可能返回空资源
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);//获取到是否拥有bundle
        bundleAsset.DecRefByUUID(uuid);
    } 
    public UseAssetByUUID(bundleName:string,uuid:UUID){//不可能返回空资源
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);//获取到是否拥有bundle
        return bundleAsset.RefByUUID(uuid);
    } 
    //获取到一个资源的UUID 
    public GetAssetUUID<T extends Asset>(bundleName:string,path:string,type:ResouoceType<T>):UUID|undefined{
        let bundleAsset:BundleAssest|undefined = this.mBundleAssetMap.get(bundleName);//获取到是否拥有bundle
        if(bundleAsset == undefined)    
            return undefined;
        return bundleAsset.GetUUID(path,type);
    }
}