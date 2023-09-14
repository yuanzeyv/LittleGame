import { Asset, AssetManager, } from "cc";
import { _Facade, _G } from "../../../Global";
import { BundleProxy, ResouoceType } from "./BundleProxy";
import { SoltCell } from "../../../Util/Time/TimeWheel";
//打比方，Bundle是系统，而BundleAssest是应用程序。 
//当资源被加载时:
//立即将资源放入一分钟释放队列。
//当资源被UseAsset时，对资源添加引用计数:
//立即删除一分钟定时器，
//当资源被UnUseAsset时:
//立即减少引用计数，如果资源引用计数为0时，立即删除引用计数资源，由Cocos系统管理
export class BundleAssest{ 
    private readonly mBundleProxy:BundleProxy;//Bundle代理
    private readonly mBundle:AssetManager.Bundle;//Bundle对象
    //Bundle已经加载的资源引用、 <Path,Map<Type,Count>>
    private mRemeberCountMap:Map<string,Map<ResouoceType<Asset>,{asset:Asset,loadCount:number,soltCell?:SoltCell}>> = new Map<string,Map<ResouoceType<Asset>,{asset:Asset,loadCount:number,soltCell?:SoltCell}>>();
    public constructor(bundleProxy:BundleProxy,bundle:AssetManager.Bundle){ 
        this.mBundleProxy = bundleProxy;
        this.mBundle = bundle;
    }
    
    //加载一个资源
    public Load(assetPath:string,type:ResouoceType<Asset>):void{
        let fullPath:string = `${this.mBundle.name}/${assetPath}`;
        if(!this.mBundle.getInfoWithPath(assetPath)){
            console.warn(`Bundle:${this.mBundle.name} 正在尝试加载一个不存在的文件 ${assetPath}`);
            this.mBundleProxy.AssetLoadFinish(fullPath,type); 
            return;
        }
        let asset:Asset|undefined= this.mBundle.get(assetPath);
        if(asset != undefined){
            this.mBundleProxy.AssetLoadFinish(fullPath,type,asset);//成功找到的话
            return;
        }   
        //必定是资源首次被加载
        this.mBundle.load(assetPath,type,(err:Error|undefined,data:Asset|undefined)=>{
            if(err != undefined){
                this.mBundleProxy.AssetLoadFinish(fullPath,type,data); //添加引用
                console.warn(err);//打印资源加载错误日志
                return;
            }  
            let typeRefMap:Map<ResouoceType<Asset>,{asset:Asset,loadCount:number,soltCell?:SoltCell}> = new Map<ResouoceType<Asset>,{asset:Asset,loadCount:number,soltCell?:SoltCell}>();
            typeRefMap.set(type,{asset:data,loadCount:0,soltCell:undefined});
            this.mRemeberCountMap.set(assetPath,typeRefMap);

            data.addRef();//删除引用
            this.TimeOutRelease(assetPath,type);//加入超时释放 
            this.mBundleProxy.AssetLoadFinish(fullPath,type,data); //添加引用
        });
    }
    //对某一个资源添加定时释放
    private TimeOutRelease(assetPath:string,type:ResouoceType<Asset>):void{
        let typeRefMap:Map<ResouoceType<Asset>,{asset:Asset,loadCount:number,soltCell?:SoltCell}> = this.mRemeberCountMap.get(assetPath);
        if(typeRefMap == undefined)
            return;
        let refObj:{asset:Asset,loadCount:number,soltCell?:SoltCell} = typeRefMap.get(type);
        if(refObj.loadCount != 0)
            return;
        refObj.soltCell?.Stop();//停止定时器 
        refObj.soltCell =  _G.TimeWheel.Set(20 * 1000,()=>{
            //if(refObj.loadCount != 0)//不可能出现这种情况
            //    return;
            refObj.soltCell = undefined;//清空本次的定时器（无用逻辑）
            typeRefMap.delete(type);//删除此资源引用信息
            this.mRemeberCountMap.delete(assetPath);//删除引用
            refObj.asset.decRef();//删除引用
        });
    }
    //增加引用
    public UseAsset(assetPath:string,type:ResouoceType<Asset>):Asset{
        let typeRefMap:Map<ResouoceType<Asset>,{asset:Asset,loadCount:number,soltCell?:SoltCell}> = this.mRemeberCountMap.get(assetPath);
        if(typeRefMap == undefined)
            return undefined;
        let refObj:{asset:Asset,loadCount:number,soltCell?:SoltCell} = typeRefMap.get(type);
        if(refObj.loadCount == 0 ){//只要为0，就说明资源被引用过了
            refObj.soltCell?.Stop();
            refObj.soltCell = undefined;
        } 
        refObj.loadCount++;//添加一次引用
        return refObj.asset;
    }
    
    //删除引用
    public DecRef<T extends Asset>(assetPath:string,type:ResouoceType<Asset>):void{
        let typeRefMap:Map<ResouoceType<Asset>,{asset:Asset,loadCount:number,soltCell?:SoltCell}> = this.mRemeberCountMap.get(assetPath);
        if(typeRefMap == undefined)
            return undefined;
        let refObj:{asset:Asset,loadCount:number,soltCell?:SoltCell} = typeRefMap.get(type);
        if(refObj.loadCount == 0)//资源已经被释放过了
            return;
        refObj.loadCount--;
        this.TimeOutRelease(assetPath,type);
    }
} 