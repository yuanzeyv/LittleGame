import { Asset, Component } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BundleProxy, ListenObj, LoadID, LoadStruct } from "../BundleProxy/BundleProxy";
import { ResourceComp } from "./ResourceComp";
export type UUID = string;
export type UseKey = string; 
export type KeyPartial<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T];
export type KeyPartialArr<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T][];

export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type CompleteHandle<T extends Asset>  = (data:T | undefined) => void;
export class ResouceProxy extends BaseProxy{  
    static get ProxyName():string { return "ResouceProxy" }; 
    private mBundleProxy:BundleProxy;
    private mLoadMap:Map<UUID,{loadID:LoadID,count:number}> = new Map<UUID,{loadID:LoadID,count:number}>();
    public onLoad(): void {
        this.mBundleProxy = _Facade.FindProxy(BundleProxy);
    }
    /*
    *加载一个资源并对传入的组件进行赋值
    *comp:带传入的资源
    *key:要修改的字段
    *bundleName:资源所属Bundle
    *path:资源所在路径
    *type:资源类型
    *加载成功后回调
    */
    public Load<T extends Component>(comp:T,key:KeyPartial<T>,bundleName:string,path: string,type:ResouoceType<Asset>,successHandle?:(comp:T)=>void):void{
        let bundleProxy:BundleProxy = _Facade.FindProxy(BundleProxy);//首先获取到当前的BundleProxy
        if(comp == undefined || !comp.isValid)//判断资源是否有效
            return;
        let uuid:UUID|undefined = this.mBundleProxy.GetAssetUUID(bundleName,path,type);//通过资源的具体路径及类型锁定到资源
        if(uuid == undefined){//资源必须存在于游戏项目中才能够被正常的加载
            console.error(`尝试加载不存在于项目中的资源 bundle:${bundleName}  path:${path}`);
            return;
        } 
        let data:{loadID:LoadID,count:number}|undefined = this.mLoadMap.get(uuid);//查看资源是否被ResourceProxy加载过
        let resComp:ResourceComp|undefined = comp.node.getComponent(ResourceComp) ||comp.node.addComponent(ResourceComp);//查询是否拥有组件
        if(data != undefined){
            let frontLoadUUID:UUID|undefined = resComp.GetLoad(comp.uuid,key.toString());//获取对对应组件的资源加载情况
            if(frontLoadUUID != undefined){//如果之前有加载过的话
                data.count--;
                resComp.ReleaseRes(comp.uuid,key as string);//停止使用本资源
                bundleProxy.UnUseAssetByUUID(bundleName,frontLoadUUID);//反引用此资源
            }
            comp[key as string] = _Facade.FindProxy(BundleProxy).UseAssetByUUID(bundleName,uuid);//使用本资源
            resComp.LoadRes(comp.uuid,key as string,uuid);//引用资源  
            if(successHandle) 
                successHandle(comp);
            return;
        }
        let loadID:LoadID = bundleProxy.Load(bundleName,path,type);//开始监听资源
        let loadHandle:(loadStruct:LoadStruct)=>void = ( loadStruct:LoadStruct)=>{//加载回调
            if(!loadStruct.IsAllComplete()){//当前资源加载没有完成的话
                return;
            }
            if(!resComp.isValid){
                bundleProxy.DestoryLoadID(loadID);
                return;
            }
            let frontLoad:UUID|undefined = this.HasLoadInfo(comp.uuid,key as string);//判断之前有没有加载
            if(frontLoad != undefined){//组件之前有加载过这个资源
                data.count--;
                resComp.ReleaseRes(comp.uuid,key as string);//停止使用本资源
                _Facade.FindProxy(BundleProxy).UnUseAssetByUUID(bundleName,frontLoad);//反引用这个资源
                this.DelLoadInfo(comp.uuid,key as string);//毫无意义的删除
            }
            if(loadStruct.IsFinish() == false){
                comp[key as string] = undefined;//设置资源信息
                return;
            }
            let asset:Asset|undefined = _Facade.FindProxy(BundleProxy).UseAsset(bundleName,path,type);//获取到本轮正确的资源 
            comp[key as string] = asset;//设置资源信息
            resComp.LoadRes(comp.uuid,key as string,asset.uuid);//引用资源
            this.SetLoadInfo(comp.uuid,key as string,asset.uuid);
            if(successHandle) 
                successHandle(comp);
        } 
        bundleProxy.RegisterListen(new ListenObj(loadID,loadHandle));
    } 
    private DelLoadInfo(uuid:UUID,key:string):void{
        let loadInfo:Map<UseKey,UUID>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined)
            return;
        loadInfo.delete(key);
        if(loadInfo.size == 0)
            this.mLoadInfoMap.delete(uuid);
    }
    private HasLoadInfo(uuid:UUID,key:string):UUID|undefined{
        let loadInfo:Map<UseKey,UUID>|undefined = this.mLoadInfoMap.get(uuid);
        if(loadInfo == undefined)
            return undefined;
        return loadInfo.get(key);
    } 

    //由RescourceCom调用，不可主动调用
    public Release(uuid:string,key:string){ 
        let loadMap:Map<UseKey,UUID>|undefined =  this.mLoadInfoMap.get(uuid);
        if(loadMap == undefined)//没有找到加载的资源
            return;
        let assetData:UUID|undefined = loadMap.get(key);
        if(assetData == undefined)//没有对这个字段进行操作
            return;
        _Facade.FindProxy(BundleProxy).UnUseAssetByUUID(assetData.path,assetData.type);//反引用这个资源
        loadMap.delete(key);
        if(loadMap.size == 0)
            this.mLoadInfoMap.get(uuid)
    }
}