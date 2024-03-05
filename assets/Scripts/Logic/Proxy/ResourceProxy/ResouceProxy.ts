import { Asset, Component } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { BundleProxy, ListenObj, LoadID, LoadStruct } from "../BundleProxy/BundleProxy";
import { ResourceComp } from "./ResourceComp";
import { SoltCell } from "../../../Util/Time/TimeWheel";
export type UUID = string;
export type UseKey = string; 
export type KeyPartial<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T];
export type KeyPartialArr<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T][];

export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type CompleteHandle<T extends Asset>  = (data:T | undefined) => void;
export class ResouceProxy extends BaseProxy{  
    static get ProxyName():string { return "ResouceProxy" }; 
    private mBundleProxy:BundleProxy;
    private mLoadMap:Map<UUID,{loadID:LoadID,count:number,asset:Asset,timeID:SoltCell}> = new Map<UUID,{loadID:LoadID,count:number,asset:Asset,timeID:SoltCell}>();//每个被加载过的资源，被本系统引用次数

    private mLoadingMap:Map<UUID,LoadID> = new Map<UUID,LoadID>();//某个资源正在被加载中
    private mLoadingResCompMap:Map<UUID,Set<ResourceComp>> = new Map<UUID,Set<ResourceComp>>();//某个资源需要加载的资源

    public onLoad(): void {
        this.mBundleProxy = _Facade.FindProxy(BundleProxy);
    }

    public Load<T extends Component>(comp:T,key:KeyPartial<T>,bundleName:string,path: string,type:ResouoceType<Asset>,successHandle?:(comp:T)=>void):void{
        if(comp == undefined || !comp.isValid){//不存在组件 或者 组件是无效的。 代表不需要进行加载，直接返回
            console.warn(`待设置的资源不存在 path:${path}`);
            return;
        }
        let resUUID:UUID|undefined = this.mBundleProxy.GetAssetUUID(bundleName,path,type);//通过资源的具体路径及类型锁定到资源
        if(resUUID == undefined){
            console.error(`尝试加载不存在于项目中的资源 bundle:${bundleName}  path:${path}`);
            return;
        } 
        let loadInfo:{loadID:LoadID,count:number,asset:Asset,timeID:SoltCell}|undefined = this.GetLoadInfo(resUUID);//获取到UUID对应的资源加载情况
        let resComp:ResourceComp|undefined = comp.node.getComponent(ResourceComp) ||comp.node.addComponent(ResourceComp);//查询是否拥有组件
        if(loadInfo == undefined){
            resComp.LoadRes(comp,key as string,resUUID,true,successHandle);//设置资源的加载状态未待加载完成  
            let loadingComSet:Set<ResourceComp>|undefined = this.mLoadingResCompMap.get(resUUID);//获取到正在加载资源的信息
            if(loadingComSet == undefined){
                loadingComSet = new Set<ResourceComp>();
                this.mLoadingResCompMap.set(resUUID,loadingComSet);
            }
            loadingComSet.add(resComp);//也添加到resCop中
            if(this.mLoadingMap.has(resUUID))//如果当前资源正在加载中的话
                return;//立即返回
            let loadID:LoadID = this.mBundleProxy.Load(bundleName,path,type);//准备开始加载资源 
            this.mLoadingMap.set(resUUID,loadID);//设置资源为正在加载的状态
            this.mBundleProxy.RegisterListen(new ListenObj(loadID,(loadStruct:LoadStruct)=>{
                if(!loadStruct.IsFinish) return; //如果当前没有加载完成的话
                let asset:Asset|undefined = this.mBundleProxy.UseAssetByUUID(bundleName,resUUID);//使用本资源,不可以直接对资源进行引用
                if(asset == undefined)//如果资源加载失败的话
                    console.error("已成功加载的资源引用失败，请检查游戏逻辑");
                this.mLoadingMap.delete(resUUID);//删除UUID的加载状态
                this.InitResourceInfo(resUUID,loadID,asset);//对资源进行初始化
                //对等待中的资源进行加载
                let resourceCompSet:Set<ResourceComp> = this.mLoadingResCompMap.get(resUUID)!;//取到所有需要这个资源的组件
                for(let cell of resourceCompSet){
                    if(!resComp.isValid) continue;   
                    cell.LoadingResFinish(resUUID,asset != undefined);
                }
                this.mLoadingResCompMap.delete(resUUID);
                successHandle && successHandle(comp);
            }));
            return;
        }
        resComp.LoadRes(comp,key as string,resUUID);//设置资源加载
        if(successHandle) 
            successHandle(comp);
    } 
    
    private GetLoadInfo(uuid:UUID):{loadID:LoadID,count:number,asset:Asset,timeID:SoltCell} | undefined{
        return this.mLoadMap.get(uuid);
    }   

    public InitResourceInfo(resUUID:string,loadID:LoadID,asset:Asset){ 
        let timeoutDestoryCell:SoltCell = _G.TimeWheel.Set(10000,this.DecResource.bind(this),resUUID);
        this.mLoadMap.set(resUUID,{loadID:loadID,count:0,timeID:timeoutDestoryCell,asset:asset});
    }
    
    //由RescourceCom调用，不可主动调用
    private Release(resUUID:string):void{ 
        let loadInfo:{loadID:LoadID,count:number,timeID:SoltCell} | undefined = this.GetLoadInfo(resUUID);
        if(loadInfo == undefined)
            return;
        if(loadInfo.timeID != undefined){
            loadInfo.timeID.Stop();
            loadInfo.timeID = undefined;
        }
        this.mBundleProxy.UnUseAssetByUUID("resources",resUUID);//反引用这个资源
        this.mLoadMap.delete(resUUID);
    }

    public DecResource(resUUID:UUID):void{
        let loadInfo:{loadID:LoadID,count:number,timeID:SoltCell} | undefined = this.GetLoadInfo(resUUID);
        if(loadInfo == undefined) return;//没有加载过本资源
        loadInfo.count--;//减去引用 
        if(loadInfo.count < 0 && loadInfo.timeID == undefined)
            loadInfo.timeID = _G.TimeWheel.Set(10000,this.Release.bind(this),resUUID);
    }

    public AddResource(resUUID:UUID):Asset|undefined{
        let loadInfo:{loadID:LoadID,count:number,asset:Asset,timeID:SoltCell} | undefined = this.GetLoadInfo(resUUID);
        if(loadInfo == undefined) return undefined;//本资源未加载过
        loadInfo.count++;
        if(loadInfo.count >= 0 && loadInfo.timeID != undefined){
            loadInfo.timeID.Stop();
            loadInfo.timeID = undefined;
        }
        return loadInfo.asset;
    }
}