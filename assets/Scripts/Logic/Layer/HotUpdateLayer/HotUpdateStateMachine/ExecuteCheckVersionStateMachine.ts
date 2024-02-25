import { native } from "cc"; 
import { eHotUpdateStatus } from "../HotUpdateStatus";
import { HotUpdateLayer } from "../HotUpdateLayer";
import { HotUpdateStateMachine } from "./HotUpdateStateMachine";

//空状态
export class ExecuteCheckVersionStateMachine extends HotUpdateStateMachine{ 
    public OnEnter(hotProxy:HotUpdateLayer){}
    //退出状态时的回调
    public OnExit(hotProxy:HotUpdateLayer){} 
    //检查热更的回调
    public CheckHotUpdate(hotProxy:HotUpdateLayer,nativeUrl:string){ 
        console.log(`热更=>正在检查热更新中，请勿重复操作`);  
    }
    //重试热更的回调
    public RetryHotUpdate(hotProxy:HotUpdateLayer){
        console.log(`热更=>并未执行检查操作，无法重新热更`);
    }
    //执行热更的回调
    public ExecHotUpdate(hotProxy:HotUpdateLayer){ 
        console.log(`热更=>未执行热更验证，无法执行热更新操作`); 
    }

    public ErrorNoLocalManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST 
        console.log(`热更=>检查热更失败，没有找到合适的本地热更Manifest文件`);
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.Idle);//改变状态未None
    }
    public ErrorDownloadManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST 
        console.log(`热更=>检查热更失败，下载远程Manifest失败`);
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.Idle);//改变状态未None
    }
    public ErrorParseManifestHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ERROR_PARSE_MANIFEST 
        console.log(`热更=>检查热更失败，解析远程Manifest文件失败`);
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.Idle);//改变状态未None
    }
    public NewVersionFoundHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.NEW_VERSION_FOUND 
        console.log(`热更=>检查热更成功,找到待更新的版本${hotProxy.AssetManager.getRemoteManifest().getVersion()}。更新消耗  ${Math.floor(hotProxy.AssetManager.getTotalBytes() / 1024 )} 字节 `);  
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.CheckVersionFinish);//改变状态未None
    }
    public AlreadyUpToDateHandle(hotProxy:HotUpdateLayer,code:number,event:native.EventAssetsManager){//jsb.EventAssetsManager.ALREADY_UP_TO_DATE 
        console.log(`热更=>检查热更成功，本地版本与远程本版一致，已经是最新`);
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.SkipHotUpdate);
    } 
} 