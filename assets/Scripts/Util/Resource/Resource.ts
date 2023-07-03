import { Asset, AudioClip, Prefab, resources } from "cc";
import { _Facade } from "../../Global";
import { ResouceProxy } from "../../Logic/Proxy/BundleProxy/ResouceProxy";
export type LoadResourceHandle = (prefab:Prefab)=>void;
export type LoadAudioResourceHandle = (prefab:AudioClip)=>void; 

export type KeyPartial<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T];
export type KeyPartialArr<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T][];

export class Resource{
    static LoadPrefab(prefabPath:string,LoadResourceHandle){
        resources.load(prefabPath,(err,data:Prefab)=>{
            if(err == undefined)
                LoadResourceHandle(data);
            else
                LoadResourceHandle(undefined);
        });
    }
    static LoaAudio(audioPath:string,LoadAudioResourceHandle){
        resources.load(audioPath,(err,data:Prefab)=>{
            if(err == undefined)
                LoadAudioResourceHandle(data);
            else
                LoadAudioResourceHandle(undefined);
        });
    }
    static Load<T>(path:string,obj:T,key:KeyPartial<T>){
        let resouceProxy:ResouceProxy = _Facade.FindProxy(ResouceProxy);
        resouceProxy.Load(path,(asset:Asset | undefined)=>{
            if(asset == undefined )
                return;
            obj[key.toString()] = asset;
        })
    }
 
}