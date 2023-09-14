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
    private mLoadInfoMap:Map<UUID,Map<UseKey,{path:string,type:ResouoceType<Asset>}>> = new Map<UUID,Map<UseKey,{path:string,type:ResouoceType<Asset>}>>();
    public get BundleProxy():BundleProxy{
        if(this.mBundleProxy == undefined)
            this.mBundleProxy = _Facade.FindProxy(BundleProxy);
        return this.mBundleProxy;
    }

    private SetLoadInfo(uuid:UUID,key:string,path:Path,type:ResouoceType<Asset>):void{
        let loadInfo:Map<UseKey,{path:string,type:ResouoceType<Asset>}>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined){
            loadInfo = new Map<UseKey,{path:string,type:ResouoceType<Asset>}>();
            this.mLoadInfoMap.set(uuid,loadInfo);
        }
        loadInfo.set(key,{path:path,type:type});
    }
    private DelLoadInfo(uuid:UUID,key:string):void{
        let loadInfo:Map<UseKey,{path:string,type:ResouoceType<Asset>}>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined)
            return;
        loadInfo.delete(key);
        if(loadInfo.size == 0)
            this.mLoadInfoMap.delete(uuid);
    }
    private HasLoadInfo(uuid:UUID,key:string):{path:string,type:ResouoceType<Asset>}|undefined{
        let loadInfo:Map<UseKey,{path:string,type:ResouoceType<Asset>}>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined)
            return undefined;
        return loadInfo.get(key);
    } 
    //对具体组件加载一个资源
    public Load<T extends Component,>(comp:T, path: string,key:KeyPartial<T>,type:ResouoceType<Asset>,successHandle?:(comp:T)=>void):void{
        if(comp == undefined || !comp.isValid){//判断资源是否有效
            return;
        }
        let resComp:ResourceComp|undefined = comp.node.getComponent(ResourceComp) || comp.node.addComponent(ResourceComp);//查询是否拥有组件
        let loadHandle:(loadStruct:LoadStruct)=>void = (LoadStruct:LoadStruct)=>{//加载回调
            if(resComp.isValid == false)
                return 
            let frontLoad:{path:string,type:ResouoceType<Asset>}|undefined = this.HasLoadInfo(comp.uuid,key as string);//判断之前有没有加载
            if(frontLoad != undefined){
                resComp.ReleaseRes(comp.uuid,key as string);
                this.BundleProxy.UnUseAsset(frontLoad.path,frontLoad.type);//反引用这个资源
                this.DelLoadInfo(comp.uuid,key as string);//毫无意义的删除
            }
            let asset:Asset|undefined = LoadStruct.OperationAsset;//获取到本轮正确的资源 
            comp[key as string] = asset;//设置资源信息
            if(asset == undefined) 
                console.warn(`资源:${LoadStruct.OperationAssetName} 加载失败` );
            else{
                this.BundleProxy.UseAsset(path,type);//资源引用计数+1  
                resComp.LoadRes(comp.uuid,key as string);//引用资源
                this.SetLoadInfo(comp.uuid,key as string,path,type);
                if(successHandle) 
                    successHandle(comp);
            }
        }
        this.BundleProxy.Load(path,type,loadHandle);//开始监听资源
    } 

    //由RescourceCom调用，不可主动调用
    public Release(uuid:string,key:string){
        let loadMap:Map<UseKey,{path:string,type:ResouoceType<Asset>}>|undefined =  this.mLoadInfoMap.get(uuid);
        if(loadMap == undefined)//没有找到加载的资源
            return;
        let assetData:{path:string,type:ResouoceType<Asset>}|undefined = loadMap.get(key);
        if(assetData == undefined)//没有对这个字段进行操作
            return;
        this.BundleProxy.UnUseAsset(assetData.path,assetData.type);//反引用这个资源
        loadMap.delete(key);
        if(loadMap.size == 0)
            this.mLoadInfoMap.get(uuid)
    }
}