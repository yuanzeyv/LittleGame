import {Asset, AssetManager, resources} from "cc";
import {BaseProxy} from "../../../Frame/BaseProxy/BaseProxy";
import {ResouceNotice} from "./ResouceNotice";

export type ResouoceType<T extends Asset> = new (...args: any[]) => T;
export type ProgressHandle  = (finished: number, total: number, item: AssetManager.RequestItem) => void;
export type CompleteHandle<T extends Asset>  = (err: Error | null, data:T) => void;
export type UUID = string;

export class ResouceProxy1 extends BaseProxy{
    static  get ProxyName():string { return "ResouceProxy" };

    private m_ProgressCacheMap:Set<UUID> = new Set<UUID>();//存储资源缓存
    private m_AssetCacheMap:Map<UUID,Asset> = new Map<UUID,Asset>();//存储资源缓存
    // private assetManager: AssetManager.;
    Load<T extends Asset>(paths: string, type: ResouoceType<T>|null,notice:ResouceNotice): void{
        resources.load(paths,type,(finished: number, total: number, item: AssetManager.RequestItem)=>{
            let pureUUID:string = item.uuid.split("@")[0];
            if(!this.m_ProgressCacheMap.has(pureUUID)){
                this.m_ProgressCacheMap.add(pureUUID);
                notice.ResouceStart(pureUUID);
            }
            notice.ResouceUpdate(finished,total);
            //向外部发送资源加载进度信息
            if(finished == total){
                this.m_ProgressCacheMap.delete(pureUUID);
                notice.ResouceEnd();
            }
            }
        ,(err:Error|null, asset:T) =>{
            if(err != null){
                console.warn(`资源加载失败:${err}`);
                notice.ResouceComplete(null);
                return;
            }
            let pureUUID:string = asset._uuid.split("@")[0];
            asset.addRef();
            this.m_AssetCacheMap.set(pureUUID,asset);
            notice.ResouceComplete(asset);
        });
        // this.assetManager.loadRemote();
    };
}
