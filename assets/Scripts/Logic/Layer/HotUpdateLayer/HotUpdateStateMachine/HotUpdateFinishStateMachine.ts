import { game, native } from "cc";
import { HotUpdateLayer } from "../HotUpdateLayer";
import { HotUpdateStateMachine } from "./HotUpdateStateMachine";

//空状态
export class HotUpdateFinishStateMachine extends HotUpdateStateMachine{ 
    public OnEnter(hotProxy:HotUpdateLayer){
        setTimeout(() => { game.restart(); }, 2000)
    }
    //退出状态时的回调
    public OnExit(hotProxy:HotUpdateLayer){}
    //检查热更的回调 
    public CheckHotUpdate(hotProxy:HotUpdateLayer,nativeUrl:string){ 
        console.log("热更=>热更已完成，等待重启游戏"); 
    }
    //重试热更的回调
    public RetryHotUpdate(hotProxy:HotUpdateLayer){
        console.log("热更=>热更已完成，等待重启游戏"); 
    }
    //执行热更的回调
    public ExecHotUpdate(hotProxy:HotUpdateLayer){ 
        console.log("热更=>热更已完成，等待重启游戏"); 
    }
    public ErrorNoLocalManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST 
        console.log(`热更=>进入了错误的回调`);
    }
    public ErrorDownloadManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST 
        console.log(`热更=>进入了错误的回调`);
    }
    public ErrorParseManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_PARSE_MANIFEST 
        console.log(`热更=>进入了错误的回调`);
    }
    public NewVersionFoundHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.NEW_VERSION_FOUND 
        console.log(`热更=>进入了错误的回调`);
    }
    public AlreadyUpToDateHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ALREADY_UP_TO_DATE 
        console.log(`热更=>进入了错误的回调`);
    }
    public UpdateProgressionHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.UPDATE_PROGRESSION 
        console.log(`热更=>进入了错误的回调`);
    }
    public AssetUpdateHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ASSET_UPDATED 
        console.log(`热更=>进入了错误的回调`);
    }
    public ErrorUpdatingHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_UPDATING  
        console.log(`热更=>进入了错误的回调`);
    } 
    public UpdateFinishedHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.UPDATE_FINISHED 
        console.log(`热更=>进入了错误的回调`);
    }  
    public UpdateFailedHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.UPDATE_FAILED 
        console.log(`热更=>进入了错误的回调`);
    }  
    public ErrorDecompressHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_DECOMPRESS 
        console.log(`热更=>进入了错误的回调`);
    } 
} 