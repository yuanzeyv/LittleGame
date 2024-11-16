import { native } from "cc";  
import { eHotUpdateStatus } from "../HotUpdateStatus";
import { HotUpdateStateMachine } from "./HotUpdateStateMachine"; 
import { NATIVE } from "cc/env";
import { HotUpdateLayer } from "../HotUpdateLayer";
//空状态
export class IdleStatusMachine extends HotUpdateStateMachine{ 
    public OnEnter(hotProxy:HotUpdateLayer){
        hotProxy.ClearAssetManager();//清理热更对象
        hotProxy.InitAssetManager();//重新生成热更对象
    }
    //退出状态时的回调
    public OnExit(hotProxy:HotUpdateLayer){ 
    }
    //检查热更的回调
    public CheckHotUpdate(hotProxy:HotUpdateLayer,nativeUrl:string){ 
        if(!NATIVE){
            console.log("热更=>当前非Native平台，无法检查热更版本"); 
            //发送一个热更完成的请求，代表当前跳过了热更
            return;
        } 
        console.log(`热更=>找到了热更资源 Native路径为:${nativeUrl}`);//获取到本地热更文件路径信息
        if (hotProxy.AssetManager.getState() === native.AssetsManager.State.UNINITED){
            console.log(`热更=>当前处于 UNINITED 状态`);
            hotProxy.AssetManager.loadLocalManifest(nativeUrl);
        }  
        //没有取得Manifest文件 或者 文件未被加载成功的话
        if (!hotProxy.AssetManager.getLocalManifest() || !hotProxy.AssetManager.getLocalManifest().isLoaded()) {
            console.log(`热更=>加载本地 Manifest 资源失败`);
            return;
        }    
        console.log(`热更=>准备进入 检查版本状态`); 
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.ExecuteCheckVersion);//切换状态到检查状态
        hotProxy.AssetManager.checkUpdate();  
    }
    //重试热更的回调
    public RetryHotUpdate(hotProxy:HotUpdateLayer){
        console.log(`热更=>热更未执行，无法重试`);
    }
    //执行热更的回调
    public ExecHotUpdate(hotProxy:HotUpdateLayer){ 
        console.log(`热更=>未执行热更验证，无法执行热更新操作`); 
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