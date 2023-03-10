import { AudioClip, Prefab, resources } from "cc";
export type LoadResourceHandle = (prefab:Prefab)=>void;
export type LoadAudioResourceHandle = (prefab:AudioClip)=>void;
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
}