import { Asset } from "cc";
import { ResouceModuleProxy } from "./ResouceModuleProxy";

//资源通知用 
export class ResouceNotice{
    public m_ResouceProxy:ResouceModuleProxy;//一个资源代理
    public m_Path:string;//资源路径
    public m_UUID:string;//资源的UUID
    public m_Finished:number;//已完成的进度
    public m_Total:number;//总进度
    public m_Asset:Asset|null;//资源
    constructor(proxy:ResouceModuleProxy,path:string){
        this.m_ResouceProxy = proxy;
        this.m_Path = path;
    }

    public ResouceStart(uuid:string){//资源开始更新的回调
        this.m_UUID = uuid;
        this.m_ResouceProxy.LoadResouceNotice(this);
    }
    public ResouceUpdate(finished:number,total:number){//资源更新回调
        this.m_Finished = finished;
        this.m_Total = total;
        this.m_ResouceProxy.UpdateSpriteNotice(this);
    }
    public ResouceEnd(){//资源更新回调 
        this.m_ResouceProxy.LoadCompleteNotice(this);
    }

    public ResouceComplete(asset:Asset | null){//资源完成回调
        if(asset == null)
            return;
        this.m_Asset = asset;
        this.m_ResouceProxy.LoadFinishNotice(this);
    }  
}