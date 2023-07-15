import { Asset, Component, Sprite,Node } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BundleProxy, LoadStruct } from "./BundleProxy";
import { ResourceComp } from "./ResourceComp";

export type UUID = string;
export type UseKey = string;
export type Path = string;

export type KeyPartial<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T];
export type KeyPartialArr<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T][];

export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type CompleteHandle<T extends Asset>  = (data:T | undefined) => void;
export class ResouceProxy extends BaseProxy{  
    static  get ProxyName():string { return "ResouceProxy" };
    private mBundleProxy:BundleProxy;
    private mLoadInfoMap:Map<UUID,Map<UseKey,Path>> = new Map<UUID,Map<UseKey,Path>>();
    public get BundleProxy():BundleProxy{
        if(this.mBundleProxy == undefined)
            this.mBundleProxy = _Facade.FindProxy(BundleProxy);
        return this.mBundleProxy;
    }

    private SetLoadInfo(uuid:UUID,key:string,path:Path):void{
        let loadInfo:Map<UseKey,Path>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined){
            loadInfo = new Map<UseKey,Path>();
            this.mLoadInfoMap.set(uuid,loadInfo);
        }
        loadInfo.set(key,path);
    }
    private DelLoadInfo(uuid:UUID,key:string):void{
        let loadInfo:Map<UseKey,Path>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined)
            return;
        loadInfo.delete(key);
        if(loadInfo.size == 0)
            this.mLoadInfoMap.delete(uuid);
    }
    private HasLoadInfo(uuid:UUID,key:string):string|undefined{
        let loadInfo:Map<UseKey,Path>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined)
            return undefined;
        return loadInfo.get(key);
    }
    public 
    //对具体组件加载一个资源
    public Load<T extends Component>(comp:T, path: string,key:KeyPartial<T>):void{
        if(comp == undefined || !comp.isValid){//判断资源是否有效
            console.warn("尝试对一个无效加载资源.");
            return;
        }
        let resComp:ResourceComp|undefined = comp.node.getComponent(ResourceComp) || comp.node.addComponent(ResourceComp);//查询是否拥有组件
        let loadHandle:(loadStruct:LoadStruct)=>void = (LoadStruct:LoadStruct)=>{//加载回调
            if(resComp.isValid == false){
                console.warn("组件已经无效，无法对其加载资源");
                return 
            }
            let frontLoad:string|undefined = this.HasLoadInfo(comp.uuid,key as string);//判断之前有没有加载
            if(frontLoad != undefined){
                resComp.ReleaseRes(comp.uuid,key as string);
                this.mBundleProxy.UnUseAsset(path);//反引用这个资源
                this.DelLoadInfo(comp.uuid,key as string);//毫无意义的删除
            }
            let asset:Asset|undefined = LoadStruct.OperationAsset;//获取到本轮正确的资源 
            if(asset == undefined) 
                console.warn(`资源:${LoadStruct.OperationAssetName} 加载失败` );
            else{
                this.mBundleProxy.UseAsset(path);//资源引用计数+1 
                resComp.LoadRes(comp.uuid,key as string);//引用资源
                this.SetLoadInfo(comp.uuid,key as string,path);
            }
            comp[key as string] = asset;//设置资源信息
        }
        this.mBundleProxy.Load(path,loadHandle);//开始监听资源
    } 

    //由RescourceCom调用，不可主动调用
    public Release(uuid:string,key:string){
        let loadMap:Map<UseKey,Path>|undefined =  this.mLoadInfoMap.get(uuid);
        if(loadMap == undefined)//没有找到加载的资源
            return;
        let path:Path|undefined = loadMap.get(key);
        if(path == undefined)//没有对这个字段进行操作
            return;
        this.mBundleProxy.UnUseAsset(path);//反引用这个资源
        loadMap.delete(key);
        if(loadMap.size == 0)
            this.mLoadInfoMap.get(uuid)
    }
}