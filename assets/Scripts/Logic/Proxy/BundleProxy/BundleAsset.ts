import { Asset, AssetManager, assetManager } from "cc";
import { _Facade } from "../../../Global";
import { BundleProxy } from "./BundleProxy";
export class LoadResouceResult{
    public m_FullPath:string;
    public m_Asset:Asset;
    constructor(fullPath:string,asset?:Asset){
        this.m_Asset = asset;
        this.m_FullPath = fullPath; 
    }
}

export class BundleAssest{ 
    private readonly mBundleProxy:BundleProxy;
    private readonly mBundle:AssetManager.Bundle;//Bundle对象
    
    public constructor(bundleProxy:BundleProxy,bundle:AssetManager.Bundle){ 
        this.mBundleProxy = bundleProxy;
        this.mBundle = bundle;
    }

    public GetFullPath(path:string):string{
        return `${this.mBundle.name}/${path}`;
    } 

    public Load(assetPath:string){
        let isExist:any = this.mBundle.getInfoWithPath(assetPath);//获取到
        let fullPath:string = this.GetFullPath(assetPath);
        if(isExist == undefined){
            console.warn(`${this.mBundle.name} Bundle正在尝试加载一个不存在的文件 ${assetPath}`);
            this.mBundleProxy.AssetLoadFinish(fullPath); 
            return;
        }
        let asset:Asset|undefined= this.mBundle.get(assetPath);
        if(asset != undefined){
            this.mBundleProxy.AssetLoadFinish(fullPath,asset);//成功找到的话
            return;
        }  
        this.mBundle.load(assetPath,this.BundleLoadHandle.bind(this,fullPath));
    }

    public UseAsset(assetPath:string):Asset{
        let isExist:any = this.mBundle.getInfoWithPath(assetPath);//获取到
        if(isExist == undefined){
            console.warn(`${this.mBundle.name} Bundle正在尝试对一个不存在的资源增加引用计数 ${assetPath}`);
            return;
        }
        let asset:Asset|undefined= this.mBundle.get(assetPath);
        if(asset == undefined){//待因
            console.warn(`${this.mBundle.name} Bundle正在尝试对一个未加载的资源增加引用计数 ${assetPath}`);
            return;
        }  
        asset.addRef();
        return asset;
    }
    public DecRef(assetPath:string){
        let isExist:any = this.mBundle.getInfoWithPath(assetPath);//获取到
        if(isExist == undefined){
            console.warn(`${this.mBundle.name} Bundle正在尝试对一个不存在的资源减少引用计数 ${assetPath}`);
            return;
        }
        let asset:Asset|undefined= this.mBundle.get(assetPath);
        if(asset == undefined){//待因
            console.warn(`${this.mBundle.name} Bundle正在尝试对一个未加载的资源减少引用计数 ${assetPath}`);
            return;
        }  
        asset.decRef();
    }
 
    private BundleLoadHandle(fullPath:string,err:Error | undefined,data:Asset|undefined){
        if(err != undefined)
            console.warn(err);
        this.mBundleProxy.AssetLoadFinish(fullPath,data); 
    } 
} 