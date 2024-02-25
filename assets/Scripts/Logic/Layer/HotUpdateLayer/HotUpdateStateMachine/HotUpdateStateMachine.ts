import { native } from "cc"; 
import { HotUpdateLayer } from "../HotUpdateLayer";
//热更的基础类
export class HotUpdateStateMachine{
    private mStatusName:string = "";
    private mCodeInfoMap:Map<number,{name:string,handle:(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager)=>void}> = new Map<number,{name:string,handle:(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager)=>void}>();
    public constructor(name:string){
        this.mStatusName = name;
        this.InitCodeInfoMap();
    }
    private InitCodeInfoMap(){
        this.mCodeInfoMap.set(native.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST,{name:"ERROR_NO_LOCAL_MANIFEST",handle:this.ErrorNoLocalManifestHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST,{name:"ERROR_DOWNLOAD_MANIFEST",handle:this.ErrorDownloadManifestHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.ERROR_PARSE_MANIFEST   ,{name:"ERROR_PARSE_MANIFEST   ",handle:this.ErrorParseManifestHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.NEW_VERSION_FOUND      ,{name:"NEW_VERSION_FOUND      ",handle:this.NewVersionFoundHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.ALREADY_UP_TO_DATE     ,{name:"ALREADY_UP_TO_DATE     ",handle:this.AlreadyUpToDateHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.UPDATE_PROGRESSION     ,{name:"UPDATE_PROGRESSION     ",handle:this.UpdateProgressionHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.ASSET_UPDATED          ,{name:"ASSET_UPDATED          ",handle:this.AssetUpdateHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.ERROR_UPDATING         ,{name:"ERROR_UPDATING         ",handle:this.ErrorUpdatingHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.UPDATE_FINISHED        ,{name:"UPDATE_FINISHED        ",handle:this.UpdateFinishedHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.UPDATE_FAILED          ,{name:"UPDATE_FAILED          ",handle:this.UpdateFailedHandle.bind(this)});
        this.mCodeInfoMap.set(native.EventAssetsManager.ERROR_DECOMPRESS       ,{name:"ERROR_DECOMPRESS       ",handle:this.ErrorDecompressHandle.bind(this)});
    }
    //进入状态时的回调
    public OnEnter(hotProxy:HotUpdateLayer){}
    //退出状态时的回调
    public OnExit(hotProxy:HotUpdateLayer){}
    //检查热更的回调
    public CheckHotUpdate(hotProxy:HotUpdateLayer,nativeUrl:string){}
    //重试热更的回调
    public RetryHotUpdate(hotProxy:HotUpdateLayer){}
    //执行热更的回调
    public ExecHotUpdate(hotProxy:HotUpdateLayer){}
    //事件Handle
    public HotEventHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){
        let data:undefined|{name:string,handle:(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager)=>void} = this.mCodeInfoMap.get(code);
        if(data == undefined){
            console.log(`热更(Tips)=>出现了一个错误，错误代码:${code}`);
            return; 
        }
        console.log(`热更(Tips)=>状态机:${this.mStatusName} Code:${data.name}(${code})`);
        data.handle(hotProxy,code,event);
    }
    //收到具体消息时的回调
    public ErrorNoLocalManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST
    public ErrorDownloadManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST
    public ErrorParseManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.ERROR_PARSE_MANIFEST
    public NewVersionFoundHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.NEW_VERSION_FOUND
    public AlreadyUpToDateHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.ALREADY_UP_TO_DATE
    public UpdateProgressionHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.UPDATE_PROGRESSION
    public AssetUpdateHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.ASSET_UPDATED
    public ErrorUpdatingHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.ERROR_UPDATING 
    public UpdateFinishedHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.UPDATE_FINISHED
    public UpdateFailedHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){}//native.EventAssetsManager.UPDATE_FAILED
    public ErrorDecompressHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){} //native.EventAssetsManager.ERROR_DECOMPRESS
}
 