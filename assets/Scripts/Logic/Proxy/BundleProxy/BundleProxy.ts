//使用bundle.loaddir 回调不会返回详细路径，所以暂时不能使用loadDir,只能使用Load
import { Asset, assetManager, AssetManager } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { BundleAssest, LoadResouceResult } from "./BundleBase/BundleAsset";
export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type ProgressHandle  = (finished: number, total: number, item: AssetManager.RequestItem) => void;
export type CompleteHandle<T extends Asset>  = (err: Error | null, data:T) => void;
export type BundleName = string;
export class BundleProxy extends BaseProxy{  
    static get ProxyName():string { return "BundleProxy" };
    private m_BundleAssetMap:Map<BundleName,BundleAssest> = new Map<BundleName,BundleAssest>();
    private m_LoadFinishMap:Map<string,Asset|undefined> = new Map<string,Asset | undefined>();
    //加载函数
    public Load(paths:string,version:string=""): void {
        let pathArr:Array<string> = paths.split("/"); //首先解析当前的路径
        if(pathArr.length <= 1)
            return;
        let bundleName:string = pathArr[0];//当前的bundle名称
        pathArr.splice(0,1);//删除Bundle信息
        let bundleAsset:BundleAssest|undefined = this.m_BundleAssetMap.get(bundleName);//获取到是否拥有bundle
        if(bundleAsset == undefined){
            bundleAsset = new BundleAssest(bundleName,this);//新建一个
            this.m_BundleAssetMap.set(bundleName,bundleAsset);//添加bundle管理
            assetManager.loadBundle(bundleName,{version:version},this.LoadBundle.bind(this,bundleName));//准备加载Bundle
        }
        bundleAsset.Load(pathArr.join("/"));//让这个Bundle加载一个资源 
    } 
    public ReleaseAsset(paths:string){
        let pathArr:Array<string> = paths.split("/"); //首先解析当前的路径
        if(pathArr.length <= 1)
            return;
        let bundleName:string = pathArr[0];//当前的bundle名称
        let bundleAsset:BundleAssest|undefined = this.m_BundleAssetMap.get(bundleName);//获取到是否拥有bundle
        if(bundleAsset == undefined)
            return;
        bundleAsset.ReleaseAsset(pathArr.join("/"));//让这个Bundle加载一个资源 
    }
    //加载回调
    private LoadBundle(bundleName:string,err: Error | null, bundle: AssetManager.Bundle){
        let bundleAsset:BundleAssest|undefined = this.m_BundleAssetMap.get(bundleName);
        if(bundleAsset == undefined || err != undefined){
            console.log(`加载${bundleName}资源库出现了错误,Bundle加载失败了`);
            this.m_BundleAssetMap.get(bundleName).BundleLoadFail();
            this.m_BundleAssetMap.delete(bundleName);//反注册
            return;
        }
        bundleAsset.InitBundle(bundle);//准备初始化Bundle
    }
    public SetFinishAssest(path:string,asset:Asset|undefined){
        if(this.m_LoadFinishMap.has(path))
            return ;
        this.m_LoadFinishMap.set(path,asset);
    }
    public Update(){//每帧更新一次
        this.m_LoadFinishMap.forEach((asset:Asset|undefined,path:string)=>{
            if(asset == undefined)
                _Facade.Send(NotificationEnum.AssetLoadFail,new LoadResouceResult(path,asset)); 
            else
                _Facade.Send(NotificationEnum.AssetLoadSuccess,new LoadResouceResult(path,asset)); 
        });
        this.m_LoadFinishMap.clear();
    }
}