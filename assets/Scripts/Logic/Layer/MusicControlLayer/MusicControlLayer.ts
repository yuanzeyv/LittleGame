import { _decorator, Node } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade, _G } from '../../../Global';
import { AudioSource } from 'cc';
import { AudioClip } from 'cc';
import { NotificationEnum } from '../../../NotificationTable';
import { ResouceProxy } from '../../Proxy/BundleProxy/ResouceProxy';
import { BundleProxy, ResouoceType } from '../../Proxy/BundleProxy/BundleProxy';
const { ccclass, property,type} = _decorator;
//最大容纳50个音频节点
const MaxSourceAudioCompNum: number = 20;
//针对某些需要管理生命周期的音效单独抛出的接口
export abstract class AudioControl {
    protected mAudioResource: AudioSource;//游戏资源
    protected mControlID: number;//控制ID
    
    protected mAudioClip:AudioClip|undefined;//当前播放的音频资源
    protected mResourcePath:string;//资源加载路径
    protected mResourceType:ResouoceType<AudioClip>;//资源加载路径
    public constructor(source: AudioSource) {
        this.mAudioResource = source;
        this.mAudioResource.node.on("started", this.musicStartHandle.bind(this));//监听开始
        this.mAudioResource.node.on("ended", this.musicEndHandle.bind(this));//监听结束
    } 
    //是否正在播放音乐
    public IsPlaying():boolean{
        return this.mAudioResource.playing;
    }
    //播放音乐
    public Play(controlID:number,path:string,type:ResouoceType<AudioClip>):void{    
        this.mControlID = controlID;//当前音频的控制ID
        this.mResourcePath = path;
        this.mResourceType = type;
        this.mAudioClip = _Facade.FindProxy(BundleProxy).UseAsset(path,type);
    }
    //停止播放音乐
    public Stop(): void{
        if(this.mAudioClip != undefined)
            _Facade.FindProxy(BundleProxy).UnUseAsset(this.mResourcePath,this.mResourceType);
        this.mAudioClip = undefined;
    }
    //暂停播放音乐
    public abstract Pause(): void;   
    //设置音乐的音量
    public SetMusicVolume(value: number) {
        this.mAudioResource.volume = value; 
    } 
    //获取到节点对象
    public GetAudioSource():AudioSource{
        return this.mAudioResource;
    }

    protected musicStartHandle(){}
    protected musicEndHandle(){} 
};
export class MusicControl extends AudioControl {
    //播放音乐
    public Play(controlID:number,path:string,type:ResouoceType<AudioClip>):void{
        if(this.mAudioClip != undefined)//音乐类型
            this.Stop();//停止上一个音乐
        super.Play(controlID,path,type);//重置音乐数据
        this.mAudioResource.clip = this.mAudioClip;
        this.mAudioResource.loop = true;
        this.mAudioResource.play();//直接播放
    }
    //停止播放音乐
    public Stop(): void{
        super.Stop();
        this.mAudioResource.stop();
        this.mAudioResource.clip = undefined;
    }
    //暂停播放音乐
    public Pause(): void{
        this.mAudioResource.pause();
    } 
};
export class EffectControl extends AudioControl{
    //播放音乐
    public Play(controlID:number,path:string,type:ResouoceType<AudioClip>):void{
        super.Play(controlID,path,type);
        this.mAudioResource.clip = this.mAudioClip;
        this.mAudioResource.loop = false;
        this.mAudioResource.play();//直接播放
    }
    //暂停播放音乐(特效没有暂停函数)
    public Pause(): void{}   
    //停止播放音乐
    public Stop(): void{
        super.Stop();
        this.mAudioResource.stop();
        this.mAudioResource.clip = undefined;
    }
    protected musicEndHandle(){
        _Facade.Send(NotificationEnum.EffectPlayFinish,this.mControlID);//停止播放此音乐
    } 
};
export class MusicControlLayer extends BaseLayer {
    private mMusicSource:AudioControl;
    private mIdleAudioSourceMap:Array<AudioControl> = new Array<AudioControl>();//空闲的音频文件
    private mBusAudioSourceMap:Map<number,AudioControl> = new Map<number,AudioControl>();//忙碌的音频文件
    protected RegisterExecuteHandle(executeMap: Map<NotificationEnum, LayerExecute>): void {
        executeMap.set(NotificationEnum.EffectPlayFinish,this.EffectPlayFinishHandle.bind(this))
        executeMap.set(NotificationEnum.PlayMusic,this.Play.bind(this))
        executeMap.set(NotificationEnum.StopMusic,this.Stop.bind(this))
        
    }
    private Play(clipData:{controlID:number,path:string,type:ResouoceType<AudioClip>}){
        if(clipData.controlID == 0)
            this.PlayMusic(clipData.path,clipData.type);
        else    
            this.PlayEffect(clipData.controlID,clipData.path,clipData.type);
    }
    private Stop(controlID:number){
        if(controlID == 0)
            this.StopMusic();
        else    
            this.StopEffect(controlID);
    } 
    public CreateAudioSourceNode():AudioSource{
        let node:Node = new Node();
        let audioSource:AudioSource = node.addComponent(AudioSource);
        return audioSource; 
    }
    public InitNode(): void { 
        this.mMusicSource = new MusicControl(this.CreateAudioSourceNode());//暂时先创建
        
        this.mMusicSource.GetAudioSource().node.parent = this.node;
        for(let i = 1; i <= MaxSourceAudioCompNum;i++){
            let effectControl:EffectControl = new EffectControl(this.CreateAudioSourceNode());
            this.mIdleAudioSourceMap.push(effectControl);
            effectControl.GetAudioSource().node.parent = this.node;
        } 
    }      
    //播放音乐
    public PlayMusic(path:string,type:ResouoceType<AudioClip>):void{
        this.mMusicSource.Play(0,path,type);
    }  
    //停止音乐
    public StopMusic(){
        this.mMusicSource.Stop();
    }

    //播放音效 
    public PlayEffect(controlID:number,path:string,type:ResouoceType<AudioClip>){
        let audioControl:AudioControl|undefined = this.mIdleAudioSourceMap.pop();//首先寻找一个空闲的音频
        if(audioControl == undefined) return;
        audioControl.Play(controlID,path,type);
        this.mBusAudioSourceMap.set(controlID,audioControl); 
    } 
     
    //停止音效
    public StopEffect(controlId:number){
        let audioControl:AudioControl|undefined = this.mBusAudioSourceMap.get(controlId)
        if(audioControl == undefined)
            return;
        audioControl.Stop();
        this.mBusAudioSourceMap.delete(controlId);
        this.mIdleAudioSourceMap.push(audioControl);
    }
    //停止音效
    public StopAllEffect(){
        this.mBusAudioSourceMap.forEach((audioControl:AudioControl,controlID:number)=>{
            this.StopEffect(controlID);//停止播放一个音乐
        });
    }
    //特效播放结束
    private EffectPlayFinishHandle(controlID:number){
        this.StopEffect(controlID);
    }
}   