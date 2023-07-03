import { SpriteFrame, tween ,Node, Asset} from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { ResouceNotice } from "./ResouceNotice";
import { ResouceProxy1 } from "./ResouceProxy";
export type KeyPartial<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T];
export type KeyPartialArr<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T][];
type Path = string;
type Filed = string;
type Obj = any;
//图片资源管理器
export abstract class ResouceModuleProxy extends BaseProxy{  
    protected m_ResourceProxy:ResouceProxy1 | undefined;//资源代理
    protected m_ResouceMap:Map<Path,ResouceNotice> = new Map<Path,ResouceNotice>();
    protected m_WaitCompleteMap:Map<Path,Map<Obj,Set<Filed>>> = new Map<Path,Map<Obj,Set<Filed>>>();
    protected m_WaitCompleteFiledMap:Map<Obj,Map<Filed,Path>> =  new Map<Obj,Map<Filed,Path>>();//防止对一个字段，重复的设置
    public onLoad(): void {
        this.m_ResourceProxy = _Facade.FindProxy(ResouceProxy1);
    }
    protected abstract CreateNotice(path):ResouceNotice;
    //设置等待队列
    LoadResouceNotice(notice:ResouceNotice){}//首次加载
    UpdateSpriteNotice(notice:ResouceNotice){}//更新
    LoadCompleteNotice(notice:ResouceNotice){}//加载完成
    LoadFinishNotice(notice:ResouceNotice){//彻底完成
        this.m_ResouceMap.set(notice.m_Path,notice);//资源加载完成，设置资源信息
        this.LoadFinishHandle(notice.m_Asset,this.m_WaitCompleteMap.get(notice.m_Path));
        //清理信息
        this.ClearWaitCompleteFiled(notice.m_Path);//清理信息
        if(this.m_WaitCompleteMap.has(notice.m_Path))
            this.m_WaitCompleteMap.delete(notice.m_Path);
    }

    LoadFinishHandle(asset:Asset,objMap:Map<any, Set<string>>){//彻底完成
        objMap.forEach((element:Set<string>,obj:Obj)=>{
            for(let key of element.values())
                obj[key] = asset;
        }) 
            
    }

    private ClearWaitCompleteFiled(path:string){
        let resouceMap:Map<Obj,Set<Filed>> = this.m_WaitCompleteMap.get(path);
        resouceMap.forEach((element:Set<string>,obj:any)=>{
            let filedMap:Map<Filed,Path> = this.m_WaitCompleteFiledMap.get(obj);
            element.forEach((filed:Filed)=>{
                if(filedMap == undefined)
                return;
                let path:Path = filedMap.get(filed);
                if(path && path == path)
                    filedMap.delete(filed);
            })
            if(filedMap.size == 0)
                this.m_WaitCompleteFiledMap.delete(obj);
        });  
    } 
    private SetWaitCompleteFiled<T>(obj:T,path:string,keyPartialSet:Set<Filed>){
        if(!this.m_WaitCompleteFiledMap.has(obj))
            this.m_WaitCompleteFiledMap.set(obj,new Map<string,string>());
        let fileds:Map<string,string> = this.m_WaitCompleteFiledMap.get(obj);
        for(let element of keyPartialSet){
            let filedPath:string|null = fileds.get(element);
            if(!(filedPath && filedPath != path)) 
                continue;
            let ResouceMap:Map<Obj, Set<Filed>> = this.m_WaitCompleteMap.get(path);//找到对应path
            if(!ResouceMap)
                continue;
            let filedSet: Set<Filed> =ResouceMap.get(obj);
            if(!filedSet)
                continue;
            filedSet.delete(element);
        }
        //再次设置
        keyPartialSet.forEach((filed:Filed)=>{
            fileds.set(filed,path);
        })
    }
    private ArrTransSet<T>(paramInter:KeyPartialArr<T>):Set<Filed>{
        let KeySet:Set<Filed> = new Set<Filed>();
        paramInter.forEach((keyPartial:KeyPartial<T>)=>{
            KeySet.add(keyPartial.toString());
        });
        return KeySet;
    }
    Load<T>(path:Path,obj:T,paramInter:KeyPartialArr<T>){
        let KeySet:Set<Filed> = this.ArrTransSet(paramInter);
        let notice:ResouceNotice = this.m_ResouceMap.get(path);
        if(notice != null){
            for(let element of KeySet)
                obj[element] = notice.m_Asset;
            return;
        }
        if(this.m_WaitCompleteMap.has(path)){//该路径资源正在加载中
            this.SetWaitCompleteFiled(obj,path,KeySet);//设置之前 首先清理一下重复字段
            let ResouceSet: Map<Obj, Set<Filed>> =this.m_WaitCompleteMap.get(path);
            if(!ResouceSet.has(obj))
                ResouceSet.set(obj,new Set<Filed>());
            let keySet:Set<Filed> = ResouceSet.get(obj);
            for(let element of paramInter)
                keySet.add(element.toString());
            return;
        }
        this.m_ResourceProxy.Load(path,SpriteFrame,this.CreateNotice(path));
        if(!this.m_WaitCompleteMap.has(path))
            this.m_WaitCompleteMap.set(path,new Map<Obj,Set<Filed>>());
        let ResouceMap:Map<any,Set<Filed>> = this.m_WaitCompleteMap.get(path);
        ResouceMap.set(obj,KeySet);
        this.SetWaitCompleteFiled(obj,path,KeySet);//设置之前 首先清理一下重复字段
    }
}