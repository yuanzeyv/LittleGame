import { AudioClip, AudioSource, director, find, instantiate,Node, Prefab, resources } from "cc"; 
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { Resource } from "../../../Util/Resource/Resource";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class AudioProxy extends BaseProxy{
    private m_AudioSource:AudioSource;
    private m_BGVolume:number = 1;
    private m_EffectVolume:number = 1;
    //音效信息
    private m_WaitloadingFinishMap:Map<string,number> = new Map<string,number>();
    private m_AudioCache:Map<string,AudioClip> = new Map<string,AudioClip>();
 
    public onRegister(): void { 
        this.InitOrderNode();
    }  

    InitOrderNode() { 
        this.m_AudioSource = find("Canvas").getComponent(AudioSource);
    }

    RetrieveClip(path:string,volume:number):AudioClip{//为真代表已经存在缓存，为假代表不存在与缓存中，需要在下一帧
        let clip:AudioClip = this.m_AudioCache.get(path); 
        if( clip == undefined ){
            this.m_WaitloadingFinishMap.set(path,volume);
            Resource.LoaAudio(path,( clip:AudioClip)=>{
                if(clip == undefined)
                    this.LoadPrefabFail(path);
                else
                    this.LoadAudioSuccess(path,clip); 
            });
            return undefined;
        }
        return clip;
    } 

    PlayAudioEffect(path:string,volume:number = this.m_EffectVolume){
        let clip:AudioClip = this.RetrieveClip(path,volume);
        if(clip == undefined)
            return;
        this.m_AudioSource.playOneShot(clip,volume);
    }
    
    LoadAudioSuccess(path:string,clip:AudioClip) {   
        clip.addRef();//增加引用，之后会对其进行生命周期管理
        let volume:number = this.m_WaitloadingFinishMap.get(path);
        this.m_WaitloadingFinishMap.delete(path);
        this.m_AudioCache.set(path,clip);
        this.PlayAudioEffect(path,volume);
    }

    LoadPrefabFail(path: string) { 
        this.m_WaitloadingFinishMap.delete(path);
    }
    
}