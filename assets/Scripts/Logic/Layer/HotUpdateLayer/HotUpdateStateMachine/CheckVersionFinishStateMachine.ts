import { eHotUpdateStatus } from "../HotUpdateStatus";
import { HotUpdateLayer } from "../HotUpdateLayer";
import { HotUpdateStateMachine } from "./HotUpdateStateMachine";

//空状态
export class CheckVersionFinishStateMachine extends HotUpdateStateMachine{ 
    public OnEnter(hotProxy:HotUpdateLayer){
    }
    //退出状态时的回调
    public OnExit(hotProxy:HotUpdateLayer){ 
    }
    //检查热更的回调 
    public CheckHotUpdate(hotProxy:HotUpdateLayer,nativeUrl:string){ 
        console.log(`热更=>检查完成，可执行更新，请执行更新`);
    }
    //重试热更的回调
    public RetryHotUpdate(hotProxy:HotUpdateLayer){
        console.log(`热更=>请先尝试更新版本，失败后可点击本按钮重试`);
    }
    //执行热更的回调
    public ExecHotUpdate(hotProxy:HotUpdateLayer){    
        hotProxy.ChangeHotUpdateMachine(eHotUpdateStatus.HotUpdateProgress);//进度等待更新
        hotProxy.AssetManager.update();  
    } 
}