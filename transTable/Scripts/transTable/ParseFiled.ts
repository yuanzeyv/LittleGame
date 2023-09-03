import { parse } from "node-xlsx";
import { ArrayType, BaseTypeObj, BooleanType, NumberType, ObjectType, StringType } from "./FiledType/FiledType";
import { aaaConfig } from "../../Table/OutputScript/aaa";
const DisposeSheet:string = "sheet"
export type DataType = "number" | "string"|"boolean"|"Array"|"Object"; //表中可以填写的五种类型
export type ContainType = number | boolean | string;//基础数据类型

export class ParseFiled{ 
    private mPath:string = "";//表路径 
    private mName:string = "";//表路径 
    private mOrignData:{name: string,data:any[][];}[] | undefined;//经过解析后的原始表数据
    
    private mIsSuccess:boolean = false;
    private mErrArray:string = "";//无效原因 数组

    private mFiledName:Map<string,number>|undefined = new Map<string,number>();//字段名称 
    private mFiledNameIndex:Map<number,string> = new Map<number,string>();//字段名称 
    private mFiledDesc:Map<number,string>|undefined = new Map<number,string>();//字段描述
    private mFiledTypeMap:Map<number,BaseTypeObj>|undefined = new Map<number,BaseTypeObj>();//字段类型

    private mDataMap:Map<number,Map<number,ContainType | Array<ContainType> | Map<string,ContainType>  |undefined>> | undefined;//数据结构信息
    public constructor(path:string,name:string){
        this.mPath = path;
        this.mName = name;
    }
    public InitData():boolean{
        let table:{name: string,data:any[][];}|undefined  = this.ParseTable();  
        if(table == undefined)
            return false;
        //初始化字段
        this.mFiledName = this.InitFiled(table);
        if(this.mFiledName == undefined)
            return false;
        this.mFiledName.forEach((index: number, key: string)=>this.mFiledNameIndex.set(index,key));
            
        //初始化描述
        this.mFiledDesc = this.InitDesc(table,this.mFiledName);
        if(this.mFiledDesc == undefined)
            return false;
        this.mFiledTypeMap = this.InitFiledType(table,this.mFiledName); //初始化字段类型
        if(this.mFiledTypeMap == undefined)
            return false;
        //初始化整表数据
        this.mDataMap = this.InitTableData(table,this.mFiledName,this.mFiledTypeMap);
        if(this.mDataMap == undefined)
            return false;
        this.mIsSuccess = true;
        return true;
    }
    public IsSuccess():boolean{
        return  this.mIsSuccess;
    }
    public GetPath():string{
        return  this.mPath;
    }
    public GetName():string{
        return  this.mName;
    }
    public GetKeyType():string{
        let keyIndex:number = this.mFiledName?.get("key")!;
        return this.mFiledTypeMap!.get(keyIndex)!.GetType();
    }

    public GetErrorResult():string{
        return this.mErrArray;
    }
    public GetMemberAttr():Array<{filed:string,desc:string,type:string}>{
        let retArray:Array<{filed:string,desc:string,type:string}> = new Array<{filed:string,desc:string,type:string}>();
        for(let cell of this.mFiledName!){
            let key:string = cell[0];
            let desc:string = this.mFiledDesc!.get(cell[1])!;
            let type:string = this.mFiledTypeMap!.get(cell[1])!.GetType();
            retArray.push({filed:key,desc:desc,type:type});
        }
        return retArray;
    }

    public GetDataArray():Array<string>{
        let retArray:Array<string> = new Array<string>();
        for(let cell of this.mDataMap!) {
            let col:number = cell[0];
            //先获取到key
            let keyIndex:number = this.mFiledName!.get("key")!;//获取到key所在的列
            let keyTransObj:BaseTypeObj = this.mFiledTypeMap!.get(keyIndex)!;//获取到key对应的转换对象
            keyTransObj.SetData( cell[1]!.get(keyIndex)!);
            keyTransObj.Virify();
            let ret:any = keyTransObj.GetResult(); 


            let objStr:string = "{"
            for(let item of cell[1]){
                let index:number = item[0];
                let data:ContainType | Array<ContainType> | Map<string,ContainType> = item[1]!;
                let key:string = this.mFiledNameIndex.get(index)!;
                if(typeof(data) == "number" || typeof(data) == "boolean"){
                    objStr += `${key}:${data},`; 
                }else if(typeof(data) == "string"){
                    objStr += `${key}:"${data}",`;   
                }else if (data instanceof Array){ 
                    let temp:string = "[";
                    for(let grid of data){ 
                        if(typeof(grid) == "number" || typeof(grid) == "boolean"){
                            temp += `${grid},`;
                        }else if(typeof(grid) == "string"){
                            objStr += `"${grid}",`; 
                        }
                    }
                    temp += "]";
                    objStr += `${key}:${temp},`; 
                } else if (data instanceof Map){ 
                    let temp:string = "{";
                    for(let grid of data){
                        let key:string = grid[0];
                        if(typeof(grid[1]) == "number" || typeof(grid[1]) == "boolean"){
                            temp += `${key}:${grid[1]},`;
                        }else if(typeof(grid[1]) == "string"){
                            temp += `${key}:"${grid[1]}",`;
                        }
                    }
                    temp += "}";
                    objStr += `${key}:${temp},`; 
                }    
            }
            objStr += `}`; 
            if(typeof(ret) == "number"){
                retArray.push(`[${ret}] = ${objStr}`); 
            }else if(typeof(ret) == "string"){
                retArray.push(`["${ret}"] = ${objStr}`); 
            }
        }  
        return retArray; 
    }
     
    private ParseTable():{name: string,data:any[][];}|undefined {
        try{
            this.mOrignData = parse(this.mPath);
        }catch{ 
            this.mErrArray=  `${this.mPath}:表不存在 或 解析错误`;
            return undefined;
        }
        for(let index in this.mOrignData){
            let config:{name: string,data:any[][];} = this.mOrignData[index];
            if(config.name != DisposeSheet )
                continue; 
            if(config.data.length < 4){//表的基础长度必须大于
                this.mErrArray= "表列数不足，请检查表数据";
                break;
            }  
            return config;
        } 
        this.mErrArray= "未知错误";
        return undefined;
    }
    
    private InitFiled( table:{name: string,data:any[][];}|undefined ):Map<string,number> | undefined{//设置字段名称 及 索引位置
        let retMap:Map<string,number> = new Map<string,number>();
        for(let i = 1;i < table!.data[1].length;i++){
            let filedName:string = table!.data[1][i];//获取到字段名称
            if( typeof(filedName) != "string" ||  filedName == ""){//如果检测到key为空字符串的话
                this.mErrArray = `空键:1:${i} 类型错误 或 键为空，请检查表数据`;
                retMap.clear();
                return undefined;
            }
            if(retMap.has(filedName)){
                this.mErrArray = `键重复:1:${i} 1:${retMap.get(filedName)} 键都为${filedName}，请检查表数据`;
                return undefined;
            }
            retMap.set(filedName,i);
        }
        //检查表中是否有 key 键
        if(!retMap.has("key")){
            this.mErrArray = `未找到键:表中为找到唯一的键(key)，请检查表是否添加唯一键`;
            return undefined;
        }
        return retMap;
    }
    //初始化字段描述
    private InitDesc( table:{name: string,data:any[][];},filedMap:Map<string,number> ):Map<number,string>|undefined{
        let retMap:Map<number,string> = new Map<number,string>();
        for(let cell of filedMap){ 
            let desc:string  = table.data[0][cell[1]] || "无描述";
            retMap.set(cell[1],desc);
        }
        return retMap;
    }
    private InitFiledType(table:{name: string,data:any[][];},filedMap:Map<string,number>):Map<number,BaseTypeObj>|undefined{
        let retMap:Map<number,BaseTypeObj> = new Map<number,BaseTypeObj>(); 
        for(let cell of filedMap){
            let key:string = cell[0];
            let index:number = cell[1];
            let type:string = table!.data[2][index]; 
            let objType:BaseTypeObj|undefined = TypeObjGenHandle(type);
            if(!objType){
                if("Array" == type){
                    let objInfo:string = table.data[3][index]; //首先获取到具体的类型
                    let genObj:BaseTypeObj|undefined = TypeObjGenHandle(objInfo);
                    if(genObj == undefined){
                        this.mErrArray = `数组类型错误:3:${index} 类型错误 或 不规范，请检查表数据`;
                        return undefined;
                    }
                    objType = new ArrayType(genObj);    
                }else if("Object" == type){
                    let objInfo:string = table!.data[3][index];
                    try{
                        let obj:any = JSON.parse(objInfo)
                        if(obj.constructor.name != "Object"){
                            this.mErrArray = `对象类型错误:3:${index} 请填写如正确的对象Json格式，请检查表数据`;
                            return undefined;
                        }  
                        let cellTypeMap:Map<string,BaseTypeObj> = new Map<string,BaseTypeObj>();
                        for(let objKey in obj){  
                            let type:string = obj[objKey]; 
                            let genObj:BaseTypeObj|undefined = TypeObjGenHandle(type);
                            if(genObj == undefined){
                                this.mErrArray = `对象类型错误:3:${index} 类型错误 或 不规范，请检查表数据`;
                                return undefined;
                            }
                            cellTypeMap.set(objKey,genObj);
                        } 
                        if(cellTypeMap.size == 0) {
                            this.mErrArray = `对象类型错误:3:${index} 传入数据不足，请补充数据`;
                            return undefined;
                        }
                        objType = new ObjectType(cellTypeMap);    
                    }catch{
                        this.mErrArray = `对象类型解析失败:3:${index} 请填写如正确的Json格式，请检查表数据`;
                        return undefined;
                    } 
                }else{
                    this.mErrArray =`${key} 类型选取错误，请使用 number、string、boolean、Array、Object来重新赋值`;
                    return undefined;
                }
            }
            retMap.set(index,objType); 
        } 
        return retMap;
    }

    private InitTableData( table:{name: string,data:any[][];},filedMap:Map<string,number>,typeMap:Map<number,BaseTypeObj>):Map<number,Map<number,ContainType | Array<ContainType> | Map<string,ContainType>  |undefined>> |undefined{ 
        let retMap:Map<number,Map<number,ContainType | Array<ContainType> | Map<string,ContainType>  |undefined>> = new Map<number,Map<number,ContainType | Array<ContainType> | Map<string,ContainType>  |undefined>>();
        for(let i = 4 ; i <table.data.length;i++){
            let isExist:string = table.data[i][0]; 
            if(isExist != "T") break;//遍历结束    
            let colDataMap:Map<number,ContainType | Array<ContainType> | Map<string,ContainType>  |undefined> | undefined = retMap.get(i);
            if(colDataMap == undefined){
                colDataMap = new Map<number,ContainType | Array<ContainType> | Map<string,ContainType>|undefined>();
                retMap.set(i,colDataMap);
            }
            for(let index of filedMap.values()){
                let baseTypeobj:BaseTypeObj = typeMap.get(index)!;//获取到当前的字段类型
                let data:ContainType = table.data[i][index];//获取到当前的值
                baseTypeobj.SetData(data);
                if(baseTypeobj.Virify() == false){
                    this.mErrArray = `数据转换失败:${i}:${index} 原因:${baseTypeobj.GetError()}`;
                    return undefined;
                }
                colDataMap.set(index,baseTypeobj.GetResult());
            }
        }   
        return retMap; 
    }
}

  

function TypeObjGenHandle(type:string):BaseTypeObj|undefined{ 
    switch(type){
        case "number":  return new NumberType();
        case "string":  return new StringType();
        case "boolean":  return new BooleanType();
    }
    return undefined;
}; 