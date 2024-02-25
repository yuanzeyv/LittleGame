import { native } from "cc";
import { eHotUpdateStatus } from "../HotUpdateStatus";
import { HotUpdateLayer } from "../HotUpdateLayer";
import { HotUpdateStateMachine } from "./HotUpdateStateMachine";

//空状态
export class HotUpdateProgressStateMachine extends HotUpdateStateMachine{ 
    public OnEnter(hotProxy:HotUpdateLayer){ 
    }
    //退出状态时的回调
    public OnExit(hotProxy:HotUpdateLayer){ 
    }
    //检查热更的回调
    public CheckHotUpdate(hotProxy:HotUpdateLayer,nativeUrl:string){ 
        console.log("热更=>正在热更中...");  
    }
    //重试热更的回调
    public RetryHotUpdate(hotProxy:HotUpdateLayer){ 
        console.log("热更=>正在热更中...");  
    }
    //执行热更的回调
    public ExecHotUpdate(hotProxy:HotUpdateLayer){ 
        console.log("热更=>正在热更中...");  
    }

    public ErrorNoLocalManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST  
        console.log("热更=>热更执行过程中，检查到没有找到本地Manifest文件，中止热更");  
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.Idle);//回归原点
    }
    public ErrorDownloadManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST 
        console.log("热更=>热更执行过程中，错误下载远程Manifest文件，中止热更");  
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.Idle);//回归原点 
    }
    public ErrorParseManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_PARSE_MANIFEST 
        console.log("热更=>热更执行过程中，错误解析远程Manifest文件，中止热更");  
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.Idle);//回归原点 
    }
    public NewVersionFoundHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.NEW_VERSION_FOUND 
        console.log("热更=>异常，未知原因进入了检查到最新版本的Code");  
    }
    public AlreadyUpToDateHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ALREADY_UP_TO_DATE 
        console.log("热更=>半个错误，已是最新版本，未知的原因进入了热更");  
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.SkipHotUpdate);//回归原点 
    }
    public UpdateProgressionHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.UPDATE_PROGRESSION 
        let filePercent:number = event.getPercentByFile();
        var msg = event.getMessage();//获取到下载信息 
        let fileID:string = event.getAssetId();///获取到正在操作的文件名
        let totalBytes:number = event.getTotalBytes();///获取到下载的字节总数
        let downloadedBytes:number = event.getDownloadedBytes();///获取到下载的字节数
        let TotalFilsCount:number = event.getTotalFiles();///获取到下载的总文件个数
        let downloadedFilsCount:number = event.getDownloadedFiles();///获取到下载的总文件个数
        let percent:number = event.getPercent();///获取到当前的下载总进度
        let fileDownPercent:number = event.getPercentByFile();///获取到当前文件下载总进度 
        console.log(`热更=>正在下载资源中 总进度:${percent} 单个文件进度:${filePercent} 资源个数:${event.getDownloadedFiles()}/${event.getTotalFiles()} 字节:${event.getDownloadedBytes()}/${event.getTotalBytes()}`);
        console.log(`热更=>下载消息:${!msg ? msg : "无"}`);
    }
    public AssetUpdateHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ASSET_UPDATED 
        console.log(`热更=>进入了错误的回调`);
    }
    public ErrorUpdatingHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_UPDATING  
        console.log(`热更=>下载资源出现错误，资源ID:${event.getAssetId()}  错误信息:${event.getMessage()}`); 
    }  
    public UpdateFinishedHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.UPDATE_FINISHED 
        console.log(`热更=>热更成功 准备重启游戏`);  
        var searchPaths = native.fileUtils.getSearchPaths();
        var newPaths = hotProxy.AssetManager.getLocalManifest().getSearchPaths();
        console.log(JSON.stringify(newPaths));
        Array.prototype.unshift.apply(searchPaths, newPaths);
        localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
        native.fileUtils.setSearchPaths(searchPaths); 
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.HotUpdateFinish);   
    }  
    public UpdateFailedHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.UPDATE_FAILED 
        console.log(`热更=>热更失败，请尝试重新热更`);  
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.HotUpdateFail);  
    }  
    public ErrorDecompressHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_DECOMPRESS 
        console.log(`热更=>解压资源出现错误 错误信息:${event.getMessage()}`); 
    } 
} 