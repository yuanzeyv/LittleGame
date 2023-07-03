import { Asset } from "cc";

export class Directory{//目录
    private m_AssestDirMap:Map<string,Directory> = new Map<string,Directory>();//目录中包含目录
    private m_Assest:Map<string,Asset> = new Map<string,Asset>();//目录中包含资源  
    //寻找一个目录 如果不存在就创建一个
    public ForceCreateDir(fullPath:string):Directory{
        let pathArray:Array<string> = fullPath.split("/");
        let assetsDir:Directory = this;
        for(let i = 0;i < pathArray.length - 1; i++){
            let dir:string = pathArray[i];
            let tempAssetDir:Directory = assetsDir.m_AssestDirMap.get(dir);
            if(tempAssetDir == undefined){
                tempAssetDir = new Directory();
                assetsDir.m_AssestDirMap.set(dir,tempAssetDir);
            }
            assetsDir = tempAssetDir;
        } 
        assetsDir.SetAsset(pathArray[pathArray.length -1],undefined);
        return assetsDir;
    }
    //寻找一个目录
    public FindDir(paths:string):Directory{
        let pathArray:Array<string> = paths.split("/");
        let assetsDir:Directory = this;
        for(let i = 0;i < pathArray.length - 1; i++){
            let dir:string = pathArray[i];
            assetsDir = assetsDir.m_AssestDirMap.get(dir);
            if(assetsDir == undefined)
                return undefined;
        }
        return assetsDir;
    }
    //判断是否有这个资源
    public HasAsset(paths:string):boolean{
        let assetsDir:Directory = this.FindDir(paths);
        if(assetsDir == undefined)
            return undefined;
        let pathArray:Array<string> = paths.split("/");
        return assetsDir.m_Assest.has(pathArray[pathArray.length-1]);
    }
    //寻找一个资源
    public GetAsset(paths:string):Asset | undefined{
        let assetsDir:Directory = this.FindDir(paths);
        if(assetsDir == undefined)
            return undefined;
        let pathArray:Array<string> = paths.split("/");
        return assetsDir.m_Assest.get(pathArray[pathArray.length-1]);
    }
    //设置一个资源
    public SetAsset(funllPath:string,asset:Asset|undefined):boolean{
        let pathArr:Array<string> = funllPath.split("/");
        let assetName:string = pathArr.pop();
        let assetsDir:Directory = this.FindDir(funllPath);
        if(assetsDir == undefined)
            return false; 
        assetsDir.m_Assest.set(assetName,asset);
        return true;
    }
}