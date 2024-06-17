import { AudioClip, find, path, sp,Asset } from "cc";
import { Cfg_Music, IMusicStruct } from "../../../Config/Cfg_Music";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BundleProxy, ListenObj, LoadStruct, UUID } from "../BundleProxy/BundleProxy";
import { eNotice as eNotice } from "../../../NotificationTable"; 
export const MaxSourceAudioCompNum: number = 20;
type ControlID = number;
export class MusicProxy extends BaseProxy{ 
    static  get ProxyName():string { return "MusicProxy" }; 
    static SGlobalControl:ControlID = 1;//控制ID
    private mWaitLoadMusicMap:Set<ControlID> = new Set<ControlID>()//等待资源加载的音效 
    //等待加载资源的控制ID.31
    public Play(tableID:number):ControlID{
        let retControlID:number = 1;//返回当前的背景音乐ID，用以控制背景音乐的播放与显示
        let musicConfitg:IMusicStruct|undefined = Cfg_Music.GetData(tableID);//获取到音频的配置信息
        if(musicConfitg == undefined) return -1;//如果配置不存在的话，直接返回错误ID
        if(musicConfitg.AudioType == 2)//如果为音效的话， 
            retControlID = MusicProxy.SGlobalControl++; 
        //通过资源UUID判断当前资源是否存在
        let uuid:UUID|undefined = _Facade.FindProxy(BundleProxy).GetAssetUUID("resources",`GameResource/Sound/${musicConfitg.path}`,AudioClip)
        if( uuid == undefined ) 
            return -1;  //未找到指定游戏资源
        this.mWaitLoadMusicMap.add(retControlID);//等待音频资源被加载成功
        let loadID:number = _Facade.FindProxy(BundleProxy).Load("resources",`GameResource/Sound/${musicConfitg.path}`,AudioClip);
        _Facade.FindProxy(BundleProxy).RegisterListen(new ListenObj(loadID,(loadStruct: LoadStruct)=>{
            _Facade.FindProxy(BundleProxy).DestoryLoadID(loadID);//加载完成后立即进行删除
            let assets = loadStruct.GetFinishAssetSet();//获取到所有完成的资源列表
            if( assets.get(uuid)!.asset == undefined || !this.mWaitLoadMusicMap.has(retControlID))//未找到资源 或 已经停止加载了
                return;//直接返回
            _Facade.Send(eNotice.PlayMusic,{controlID:retControlID,bundleName:"resources",path:`GameResource/Sound/${musicConfitg.path}`,type:AudioClip});//传入一个控制ID
            this.mWaitLoadMusicMap.delete(retControlID);//设置加载完毕
        }));
        return retControlID; 
    }
      
    //停止一个音效
    public Stop(controlID:number):ControlID{
        if(this.mWaitLoadMusicMap.has(controlID)){//正在加载中的话，删除加载即可
            this.mWaitLoadMusicMap.delete(controlID);
            return;
        }
        _Facade.Send(eNotice.StopMusic,controlID);//传入一个控制ID
    } 
}   