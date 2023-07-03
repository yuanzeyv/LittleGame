import { Asset, AssetManager } from "cc";
import { _Facade } from "../../../../Global";
import { NotificationEnum } from "../../../../NotificationTable";
import { BundleProxy } from "../BundleProxy";
import { Directory } from "./Director";
export class LoadResouceResult{
    public m_FullPath:string;
    public m_Asset:Asset;
    constructor(fullPath:string,asset?:Asset){
        this.m_Asset = asset;
        this.m_FullPath = fullPath; 
    }
}
export class BundleAssest{ 
    private m_Director:Directory = new Directory();//程序包含一个资源目录
    private m_Bundle:AssetManager.Bundle;
    private m_WaitBundleCompleteSet:Set<string> = new Set<string>();//加载路径 与 是否是目录
    private m_BundleName:string;
    private m_BundleProxy:BundleProxy;
    public constructor(name:string,bundleProxy:BundleProxy){
        this.m_BundleName = name;
        this.m_BundleProxy = bundleProxy;
    }

    public GetFullPath(path:string):string{
        return this.m_BundleName + "/" + path;
    }
    
    public InitBundle(bundle:AssetManager.Bundle){
        this.m_Bundle = bundle;
        this.InitFullDir();//初始化全目录
        this.ReadyLoad();
    }
    
    public BundleLoadFail(){
        for(let path of this.m_WaitBundleCompleteSet.values())
            _Facade.Send(NotificationEnum.AssetLoadFail,new LoadResouceResult(this.GetFullPath(path))); 
        this.m_WaitBundleCompleteSet.clear();//清空待加载的列表
    }

    public Load(fullPath:string){
        if(this.m_Bundle == undefined){//bundle还没有加载成功的话
            this.m_WaitBundleCompleteSet.add(fullPath);
            return;
        }
        if(!this.m_Director.HasAsset(fullPath)){//bundle内不存在这个资源的情况时
            this.m_BundleProxy.SetFinishAssest(this.GetFullPath(fullPath),undefined); 
            return;
        }
        let asset:Asset|undefined= this.m_Director.GetAsset(fullPath)
        if(asset!=undefined){ 
            this.m_BundleProxy.SetFinishAssest(this.GetFullPath(fullPath),asset); 
            return;
        }
        this.m_Bundle.load(fullPath,this.BundleLoadHandle.bind(this,fullPath));
    }
    public  ReleaseAsset(fullPath:string){
        if(this.m_Bundle == undefined)//bundle还没有加载成功的话
            return;
        if(!this.m_Director.HasAsset(fullPath))//bundle内不存在这个资源的情况时
            return;
        let asset:Asset|undefined= this.m_Director.GetAsset(fullPath);
        if(asset!=undefined)
            return;
        this.m_Bundle.release(fullPath);//释放资源
    }
    private InitFullDir(){
        this.m_Bundle.config.paths.forEach((value,path:string)=>{
            this.m_Director.ForceCreateDir(path);
        });
    }
    private ReadyLoad(){
        for(let path of this.m_WaitBundleCompleteSet.values())
            this.Load(path);
        this.m_WaitBundleCompleteSet.clear();//清空待加载的列表
    }
    private BundleLoadHandle(fullPath:string,err:Error | undefined,data:Asset|undefined){
        if(err != undefined){//加载失败的情况
            this.m_BundleProxy.SetFinishAssest(this.GetFullPath(fullPath),data); 
            return;
        } 
        this.m_Director.SetAsset(fullPath,data);
        this.m_BundleProxy.SetFinishAssest(this.GetFullPath(fullPath),data); 
    } 
}