// import { Asset, Component } from "cc";
// import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
// import { _Facade } from "../../../Global";
// import { BundleProxy, ListenObj, LoadID, LoadStruct } from "../BundleProxy/BundleProxy";
// import { ResourceComp } from "./ResourceComp";
// export type UUID = string;
// export type UseKey = string; 
// export type KeyPartial<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T];
// export type KeyPartialArr<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T][];

// export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
// export type CompleteHandle<T extends Asset>  = (data:T | undefined) => void;
// export class ResouceProxy extends BaseProxy{  
//     static get ProxyName():string { return "ResouceProxy" }; 
//     private mLoadMap:Map<UUID,{loadID:LoadID,count:number}> = new Map<UUID,{loadID:LoadID,count:number}>();
    
//     //对具体组件加载一个资源
//     public Load<T extends Component>(comp:T,key:KeyPartial<T>,bundleName:string,path: string,type:ResouoceType<Asset>,successHandle?:(comp:T)=>void):void{
//         let bundleProxy:BundleProxy = _Facade.FindProxy(BundleProxy);
//         if(comp == undefined || !comp.isValid)//判断资源是否有效
//             return;
//         //获取到资源的UUID
//         let uuid:UUID|undefined = bundleProxy.GetAssetUUID(bundleName,path,type);
//         if(uuid == undefined)//游戏中不存在对应的资源信息，无法引用
//             return;
//         //判断当前是否已经加载过对应的
//         let data:{loadID:LoadID,count:number}|undefined = this.mLoadMap.get(uuid);
//         if(data != undefined){
//             let resComp:ResourceComp = comp.node.getComponent(ResourceComp) || comp.node.addComponent(ResourceComp);//查询是否拥有组件
//             let frontLoadUUID:UUID|undefined = resComp.GetLoad(comp.uuid,key.toString());//判断之前有没有加载
//             if(frontLoadUUID != undefined){//组件之前有加载过这个资源
//                 data.count--;
//                 resComp.ReleaseRes(comp.uuid,key as string);//停止使用本资源
//                 bundleProxy.UnUseAssetByUUID(bundleName,frontLoadUUID);//反引用此资源
//             }
//             comp[key as string] = _Facade.FindProxy(BundleProxy).UseAssetByUUID(bundleName,uuid);//使用本资源
//             resComp.LoadRes(comp.uuid,key as string,uuid);//引用资源  
//             if(successHandle) 
//                 successHandle(comp);
//             return;
//         }
//         //

//         let loadID:LoadID = bundleProxy.Load(bundleName,path,type);//开始监听资源
//         let loadHandle:(loadStruct:LoadStruct)=>void = ( loadStruct:LoadStruct)=>{//加载回调
//             if(loadStruct.IsAllComplete()){
//                 bundleProxy.DestoryLoadID(loadID);
//                 return;
//             }
//             if(resComp.isValid == false)//组件已经无效化了
//                 return 
//             let frontLoad:UUID|undefined = this.HasLoadInfo(comp.uuid,key as string);//判断之前有没有加载
//             if(frontLoad != undefined){//组件之前有加载过这个资源
//                 resComp.ReleaseRes(comp.uuid,key as string);//停止使用本资源
//                 _Facade.FindProxy(BundleProxy).UnUseAssetByUUID(bundleName,frontLoad);//反引用这个资源
//                 this.DelLoadInfo(comp.uuid,key as string);//毫无意义的删除
//             }
//             if(loadStruct.IsFinish() == false){
//                 comp[key as string] = undefined;//设置资源信息
//                 return;
//             }
//             let asset:Asset|undefined = _Facade.FindProxy(BundleProxy).UseAsset(bundleName,path,type);//获取到本轮正确的资源 
//             comp[key as string] = asset;//设置资源信息
//             resComp.LoadRes(comp.uuid,key as string);//引用资源
//             this.SetLoadInfo(comp.uuid,key as string,asset.uuid);
//             if(successHandle) 
//                 successHandle(comp);
//         } 
//         bundleProxy.RegisterListen(new ListenObj(loadID,loadHandle));
//     } 
//     private DelLoadInfo(uuid:UUID,key:string):void{
//         let loadInfo:Map<UseKey,UUID>|undefined = this.mLoadInfoMap.get(uuid);
//         if(loadInfo == undefined)
//             return;
//         loadInfo.delete(key);
//         if(loadInfo.size == 0)
//             this.mLoadInfoMap.delete(uuid);
//     }
//     private HasLoadInfo(uuid:UUID,key:string):UUID|undefined{
//         let loadInfo:Map<UseKey,UUID>|undefined = this.mLoadInfoMap.get(uuid);
//         if(loadInfo == undefined)
//             return undefined;
//         return loadInfo.get(key);
//     } 

//     //由RescourceCom调用，不可主动调用
//     public Release(uuid:string,key:string){ 
//         let loadMap:Map<UseKey,UUID>|undefined =  this.mLoadInfoMap.get(uuid);
//         if(loadMap == undefined)//没有找到加载的资源
//             return;
//         let assetData:UUID|undefined = loadMap.get(key);
//         if(assetData == undefined)//没有对这个字段进行操作
//             return;
//         _Facade.FindProxy(BundleProxy).UnUseAssetByUUID(assetData.path,assetData.type);//反引用这个资源
//         loadMap.delete(key);
//         if(loadMap.size == 0)
//             this.mLoadInfoMap.get(uuid)
//     }
// }