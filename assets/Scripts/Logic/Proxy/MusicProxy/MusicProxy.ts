import { AudioClip } from "cc";
import { IMusicStruct, MusicConfig } from "../../../Config/Cfg_Music";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { BundleProxy, LoadStruct } from "../BundleProxy/BundleProxy";
import { NotificationEnum as eNotificationEnum } from "../../../NotificationTable";
type ControlID = number;
export class MusicProxy extends BaseProxy{ 
    static  get ProxyName():string { return "MusicProxy" }; 
    static SGlobalControl:ControlID = 1;//控制ID
    private mWaitLoadMusicMap:Set<ControlID> = new Set<ControlID>()//等待资源加载的音效 
    //等待加载资源的控制ID.31
    public Play(tableID:number):ControlID{
        let retControlID:number = 0;
        let musicConfitg:IMusicStruct|undefined = MusicConfig.GetData(tableID);
        if(musicConfitg == undefined)
            return retControlID;  
        if(musicConfitg.AudioType == 2)
            retControlID = MusicProxy.SGlobalControl++;//获取到当前的控制ID
        this.mWaitLoadMusicMap.add(retControlID);
        _Facade.FindProxy(BundleProxy).Load(`resources/Sound/${musicConfitg.path}`,AudioClip,((loadStruct: LoadStruct)=>{
            if(this.mWaitLoadMusicMap.has(retControlID) == false)
                return;
            this.mWaitLoadMusicMap.delete(retControlID);
            if(loadStruct.OperationAsset != undefined) 
                _Facade.Send(eNotificationEnum.PlayMusic,{controlID:retControlID,path:`resources/Sound/${musicConfitg.path}`,type:AudioClip});//传入一个控制ID
        }));//加载资源
    }
    //暂停一个音乐的播放
    public Stop(controlID:number):ControlID{
        //此音频资源正在加载中，直接删除加载ID
        if(this.mWaitLoadMusicMap.has(controlID)){
            this.mWaitLoadMusicMap.delete(controlID);
            return;
        }
        _Facade.Send(eNotificationEnum.StopMusic,controlID);//传入一个控制ID
    } 
}   