import { Asset, AssetManager, path, Prefab, resources } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BundleProxy } from "./BundleProxy";
export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type CompleteHandle<T extends Asset>  = (data:T | undefined) => void;
export class ResouceProxy extends BaseProxy{  
    static  get ProxyName():string { return "ResouceProxy" };
    private m_BundleProxy:BundleProxy;
    private m_LoadMap:Map<string,Set<CompleteHandle<Asset>>> = new Map<string,Set<CompleteHandle<Asset>>>();
    public get BundleProxy():BundleProxy{
        if(this.m_BundleProxy == undefined)
            this.m_BundleProxy = _Facade.FindProxy(BundleProxy);
        return this.m_BundleProxy;
    }
    //加载一个文件
    public Load(paths: string,completeHandle:CompleteHandle<Asset>): void{
        let handleSet:Set<CompleteHandle<Asset>> = this.m_LoadMap.get(paths);
        if(handleSet == undefined){
            handleSet = new Set<CompleteHandle<Asset>>();
            this.m_LoadMap.set(paths,handleSet);
        }
        handleSet.add(completeHandle);//添加到回调中去
        this.BundleProxy.Load(paths);
    } 

    public ReleaseAsset(paths:string){
        this.BundleProxy.ReleaseAsset(paths);
    }
    
    public LoadAssetSuccess(fullPath:string,asset:Asset){
        let noticeSet:Set<CompleteHandle<Asset>> = this.m_LoadMap.get(fullPath);
        if(noticeSet == undefined)
            return;
        noticeSet.forEach((handle:CompleteHandle<Asset>)=>{ 
            try{
                handle(asset);
            }catch(error){
                console.error(error);
            }
        });
        this.m_LoadMap.delete(fullPath);
    }

    public LoadAssetFail(fullPath:string){
        let noticeSet:Set<CompleteHandle<Asset>> = this.m_LoadMap.get(fullPath);
        if(noticeSet == undefined)
            return;
        noticeSet.forEach((handle:CompleteHandle<Asset>)=>{handle(undefined);});
        this.m_LoadMap.delete(fullPath);
    }
}