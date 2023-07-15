import { Asset, AudioClip, AudioSource, director, find, instantiate,Node, Prefab, resources } from "cc"; 
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { ResouceProxy } from "../BundleProxy/ResouceProxy";
import { GameSetting, GameSettingProxy } from "../GameSettingProxy/GameSettingProxy";
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class AudioProxy extends BaseProxy{
    static  get ProxyName():string { return "AudioProxy" };
    private m_AudioSource:AudioSource;
    private m_BGVolume:number = 1;
    private m_EffectVolume:number = 1; 
    public onLoad(): void { 
        this.InitOrderNode();
    }  

    InitOrderNode() { 
        this.m_AudioSource = find("Canvas").getComponent(AudioSource);
        this.m_BGVolume = 1;
        this.m_EffectVolume = 1;
    }  
    public SetBGVolume(isOpen:boolean){
        this.m_BGVolume = isOpen ?1:0;
        this.m_AudioSource.volume = this.m_BGVolume;
    }
    public SetEffectVolume(isOpen:boolean){
        this.m_EffectVolume = isOpen ?1:0;
    }

    public GetMusicStatus():boolean{
        return this.m_BGVolume == 1;
    }
    public GetEffectStatuc():boolean{
        return this.m_EffectVolume == 1;
    }

    PlayAudioEffect(path:string){
        //_Facade.FindProxy(ResouceProxy).Load(path,(clip:AudioClip)=>{
        //    if(clip == undefined)   
        //        return; 
        //    this.m_AudioSource.playOneShot(clip,this.m_EffectVolume);
        //});
    }

    PlayMusic(path:string){
        //_Facade.FindProxy(ResouceProxy).Load(path,(clip:AudioClip)=>{
        //    if(clip == undefined)   
        //        return;
        //    this.m_AudioSource.clip = clip;
        //    this.m_AudioSource.loop = true;
        //    this.m_AudioSource.play();
        //});
    }
}