import { _Facade, _G } from "../../../Global";
import { BundleProxy, ResouoceType, UUID } from "./BundleProxy"; 
import { SoltCell } from "../../../Util/Time/TimeWheel";
import { Asset, AssetManager } from "cc"; 
class File{//描述文件信息用
    public mAssetTypeSet:Map<new ()=>Asset,string> = new Map<new ()=>Asset,string>();
}
class Dir{//描述目录用
    public mDIRMap:Map<string,Dir> = new Map<string,Dir>();
    public mFileMap:Map<string,File> = new Map<string,File>();
    public GetDir(dir:string):Dir|undefined{
        return this.mDIRMap.get(dir);
    }  
}

class DirManager{
    private mFileDir:Dir = new Dir();
    public InitDir(configMap:Map<string,{ctor:new ()=>Asset,path:string,uuid:string}>){
        configMap.forEach((data:{ctor:new ()=>Asset,path:string,uuid:string})=>{  
            if(data.path == undefined){
                console.log(`解析文件:${data.path} UUID:${data.uuid}，发生错误`); 
                return;
            }
            let paths:Array<string> = data.path.split("/");
            let subFolder:Dir = this.mFileDir;
            for(let index = 0; index < paths.length;index++){ 
                let fileName:string = paths[index];
                if(index ==  paths.length - 1){//代表当前是文件
                    let file:File|undefined = subFolder.mFileMap.get(fileName);//判断当前是否有的文件
                    if(file == undefined){
                        file = new File();
                        subFolder.mFileMap.set(fileName,file);
                    } 
                    file.mAssetTypeSet.set(data.ctor,data.uuid);
                    continue;
                }
                let dir:Dir|undefined = subFolder.mDIRMap.get(fileName);//判断当前是否有对应文件夹
                if(dir == undefined){//依旧是文件夹的话
                    dir = new Dir();
                    subFolder.mDIRMap.set(fileName,dir);
                }
                subFolder = dir;  
            } 
        });
    }
    //获取到一个数组下的所有资源信息 
    public GetDirFiles(path:string = ""):Array<{path:string,ctor:new ()=>Asset,uuid:string}>{
        let retArr:Array<{path:string,ctor:new ()=>Asset,uuid:string}> = new Array<{path:string,ctor:new ()=>Asset,uuid:string}>();
        let traverseDir:Dir = this.mFileDir;
        //获取到待查找的目录
        if(path != ""){
            let subDirPaths:string[] = path.split("/");//对path进行解析   
            for(let i = 0 ; i < subDirPaths.length ;i++){
                traverseDir = traverseDir.GetDir(subDirPaths[i]);
                if(traverseDir == undefined)//立即返回
                    break;
            }
        }
        let dirName:string = path == undefined ? "":`${path}/`;
        //添加目录下所有的文件
        traverseDir.mFileMap.forEach((file:File,fileName:string)=>{
            for(let cell of file.mAssetTypeSet)
                retArr.push({path:`${dirName}${fileName}`,ctor:cell[0],uuid:cell[1]})
        })
        //文件添加完毕后,循环遍历所有的目录信息
        traverseDir.mDIRMap.forEach((dir:Dir,fileName:string)=>{
            let files:Array<{path:string,ctor:new ()=>Asset,uuid:string}> = this.GetDirFiles(`${dirName}${fileName}`);
            for(let cell of files)
                retArr.push(cell);
        });
        return retArr;
    }
    //获取某个文件的UUID
    public GetFileUUID(filePath:string,type:new ()=>Asset):string|undefined{
        let subDirPaths:string[] = filePath.split("/");//对path进行解析   
        let fileDir:Dir = this.mFileDir;
        for(let i = 0 ; i < subDirPaths.length - 1;i++){
            fileDir = fileDir.GetDir(subDirPaths[i]);
            if(fileDir == undefined)
                return undefined;
        }
        let fileMap:File|undefined = fileDir.mFileMap.get(subDirPaths[subDirPaths.length - 1]);
        if(fileMap == undefined)
            return undefined;
        return fileMap.mAssetTypeSet.get(type); 
    }
} 
//立即减少引用计数，如果资源引用计数为0时，立即删除引用计数资源，由Cocos系统管理
export class BundleAssest{ 
    private readonly mBundleProxy:BundleProxy;//Bundle代理
    private readonly mBundle:AssetManager.Bundle;//Bundle对象 
    private mDirManager:DirManager = new DirManager();//Bundle已经加载的资源引用、 <Path,Map<Type,Count>>
    private mRemeberCountMap:Map<string,{asset:Asset,loadCount:number,soltCell?:SoltCell}> = new Map<string,{asset:Asset,loadCount:number,soltCell?:SoltCell}>();
    public constructor(bundleProxy:BundleProxy,bundle:AssetManager.Bundle){ 
        this.mBundleProxy = bundleProxy;
        this.mBundle = bundle;
        this.mDirManager.InitDir((this.mBundle as any).config.assetInfos); 
    }   
    //递归获取到Bundle某个目录下的所有文件信息
    public GetDirFiles(floder:string):Array<{path:string,ctor:new ()=>Asset,uuid:string}>{
        return this.mDirManager.GetDirFiles(floder);//获取到文件目录信息
    }

    //判断是否存在对应文件
    public GetUUID(filePath:string,type:new ()=>Asset):string|undefined{
        return this.mDirManager.GetFileUUID(filePath,type);//获取到文件目录信息
    }
    //加载一个资源
    public Load(assetPathSet:Map<string,UUID>,type:ResouoceType<Asset>):void{
        let loadRess:Array<string> = new Array<string>()
        assetPathSet.forEach((uuid:UUID,path:string)=>{ 
            let asset:Asset|undefined= this.mBundle.get(path);
            if(asset != undefined){
                this.mBundleProxy.AssetLoadFinish(this.mBundle.name,uuid,asset);//成功找到的话 
                return;
            }
            loadRess.push(path);
        });
        if(loadRess.length == 0)
            return;
        //必定是资源首次被加载
        this.mBundle.load(loadRess,type,(err:Error|undefined,data:Asset[]|undefined)=>{
            if(err != undefined){ 
                for(let path of loadRess){
                    let uuid:UUID = assetPathSet.get(path);
                    this.mBundleProxy.AssetLoadFinish(this.mBundle.name,uuid); //添加引用
                    console.warn(`资源${path} 加载失败，错误原因:${err}`);//打印资源加载错误日志
                }
                return;
            }  
            for(let asset of data){
                this.mRemeberCountMap.set(asset.uuid,{asset:asset,loadCount:0,soltCell:undefined});
                asset.addRef(); 
                this.mBundleProxy.AssetLoadFinish(this.mBundle.name,asset.uuid,asset); //添加引用
                this.TimeOutRelease(asset.uuid);//加入超时释放 
            }
        });  
    }

    //加载
    //对某一个资源添加定时释放
    private TimeOutRelease(uuid:string):void{
        let refObj:{asset:Asset,loadCount:number,soltCell?:SoltCell}|undefined = this.mRemeberCountMap.get(uuid);
        if(refObj == undefined || refObj.loadCount != 0)
            return;
        refObj.soltCell?.Stop();//停止定时器 
        refObj.soltCell =  _G.TimeWheel.Set(1 * 1000,()=>{
            if(refObj.loadCount != 0)//不可能出现这种情况
               return;
            refObj.soltCell = undefined;//清空本次的定时器（无用逻辑）
            this.mRemeberCountMap.delete(uuid);//删除引用 
            refObj.asset.decRef();//删除引用
            console.log(`清理了游戏资源 ${uuid}`); 
        });
    }
    //增加引用
    public UseAsset(assetPath:string,type:ResouoceType<Asset>):Asset |undefined{
        let fileUUID:string|undefined = this.mDirManager.GetFileUUID(assetPath,type);
        return this.RefByUUID(fileUUID);
    }
     
    //删除引用
    public DecRef(assetPath:string,type:ResouoceType<Asset>):void{
        let fileUUID:string|undefined = this.mDirManager.GetFileUUID(assetPath,type);
        this.DecRefByUUID(fileUUID);
    }
    public DecRefByUUID(uuid:string):void{
        let refObj:{asset:Asset,loadCount:number,soltCell?:SoltCell} = this.mRemeberCountMap.get(uuid);
        if(refObj.loadCount == 0)//资源已经被释放过了
            return;
        refObj.loadCount--;
        this.TimeOutRelease(uuid);
    }
    public RefByUUID(uuid:string):Asset |undefined{ 
        let refObj:{asset:Asset,loadCount:number,soltCell?:SoltCell}|undefined = this.mRemeberCountMap.get(uuid);
        if(refObj == undefined) 
            return undefined;
        if(refObj.loadCount == 0 ){//只要为0，就说明资源被引用过了
            refObj.soltCell?.Stop();
            refObj.soltCell = undefined;
        } 
        refObj.loadCount++;//添加一次引用
        return refObj.asset;
    }
} 