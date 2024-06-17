import { eRowType, AllType } from "./Table/Define";
import { BaseGridType } from "./Table/GridType/BaseGridType";
import { readFolderSync as ReadFolderSync, writeStringToFile } from "./Util/FileOperation";
import { GetTypeByStr, GetSimpleVirifyTable } from "./Util/Util";
import * as fflate from './fflate';
import fs from "fs"
class TableData{
    private mPath:string;
    private mTable:any[][];
    private mDataTypeBase:Map<number,BaseGridType> = new Map<number,BaseGridType>(); 
    constructor(path:string,table:any[][]){
        this.mPath = path;
        this.mTable = table;
    }

    public GetPath():string{
        return this.mPath;
    }

    //获取到当前表的总列数
    public GetCols():number{
        return this.mDataTypeBase.size;
    }
 
    //获取到指定列的详细名称
    public GetName(col:number):string{
        return this.mTable[eRowType.Name][col];
    }
    
    //获取到表的Key值
    public GetKey():string{
        return this.mTable[0][0] || "Key";
    }

    //获取到指定列的详细描述
    public GetDesc(col:number):string{ 
        return this.mTable[eRowType.Desc][col] ?  this.mTable[eRowType.Desc][col].toString():"空描述";
    }
    //获取到指定列的详细描述
    public GetType(col:number):BaseGridType{
        return this.mDataTypeBase.get(col)!;
    }
    //获取到指定列的文本类型描述
    public GetTypeDesc(col:number):string{
        return this.mTable[eRowType.Type][col];
    }
    //获取到指定列的客户端类型
    public GetProtType(col:number):string{
        return this.mTable[eRowType.Port][col];
    } 
    //初始化资源类型
    public InitType():boolean{ 
        for( let i = 1 ;i < this.mTable[eRowType.Type].length ; i++ ){
            let typeStr:string = this.mTable[eRowType.Type][i].replace(/\s/g,'');
            let BaseGridType:(new () => BaseGridType) | undefined = GetTypeByStr(typeStr);
            if( BaseGridType == undefined){
                console.log(`${typeStr} 解析失败`);
                return false;
            }
            let typeObj:BaseGridType = new BaseGridType();
            if(!typeObj.AnalysisType(typeStr.substring(typeObj.TypeLenth()))){
                console.log(`${typeStr.substring(length)} 解析失败`);
                return false;
            }  
            this.mDataTypeBase.set(i,typeObj);
        }
        return true;
    }
    //解析当前的整表
    public Analysis(row:number,col:number):AllType|undefined{
        return this.GetType(col).Prase(this.mTable[row][col]);
    }
    //获取到某个类型的TS表示
    public GetTypeForTs(col:number):string{
        return this.mDataTypeBase.get(col)!.getTypeForTs();
    }
    //解析全表
    public AnalysisTable():Array<{[key:string]:AllType}>|undefined{
        let ret:Array<{[key:string]:AllType}> = new Array<{[key:string]:AllType}>;
        for(let row = eRowType.Final ;row < this.mTable.length;row++){//取到一列数据
            let colInfo:{[key:string]:AllType} = {};
            for(let col = 1;col < this.mTable[eRowType.Type].length ; col++){
                let ret:AllType | undefined= this.Analysis(row,col);
                if(ret == undefined){
                    console.log(`${this.mPath}:第${row}行，${this.GetName(col)} 出错，请检查`);
                    return undefined;
                }
                colInfo[this.GetName(col)] = ret;
            } 
            ret.push(colInfo);
        }
        return ret;
    }  
} 

const BaseFolderPath = './Work/TransXlsxTable'; // 替换为要读取的文件夹的路径
function main(){ 
    let outJson:{[key:string]:Array<any>} = {}; 
    let paths:Array<string> = ReadFolderSync(BaseFolderPath);//获取文件夹下所有木文件信息
    for(let path of paths){
        let name:string = path.split(".")[0];//获取到文件本名  
        let table:any[][]|undefined = GetSimpleVirifyTable(BaseFolderPath,path);
        if(table == undefined){
            console.log(`${path}:进行简单校验时，发生错误，请检查配置`);
            continue;
        }
        let tableData:TableData = new TableData(name,table);//新建一个Table
        if( !tableData.InitType() ){//对表进行类型初始化
            console.log(`${tableData.GetPath()}:文件初始化类型时，失败`);
            return;
        } 
        let allData:{[key:string]:AllType}[]|undefined = tableData.AnalysisTable();
        if( allData == undefined){
            console.log(`${tableData.GetPath()}:解析整表出现错误`);
            return;
        }
        outJson[name] = allData;
        let text:string = "";
        text += `export interface I${name}Struct{\n`;
        for(let col = 1 ; col <= tableData.GetCols() ; col++ ){
            text += `   /*\n`; 
            text += `   key名:${tableData.GetName(col)}\n`; 
            let desc:string|undefined = tableData.GetDesc(col);
            if( desc != undefined ){
                let dataArr:Array<string> = desc.split(`\n`);
                text += `   描述:${dataArr[0]}\n`
                for(let i = 1;i < dataArr.length;i++)
                    text += `      *:${dataArr[i]}\n`
            }
            text += `   */\n`;
            text += `   '${tableData.GetName(col)}': ${tableData.GetTypeForTs(col)};\n`; 
        } 
        text += `};\n`; 
         
        text += `class ${name}{\n`;
        text += `   private mConfigObject:{[key:${tableData.GetTypeForTs(1)}]:I${name}Struct}  = {};\n`;
        text += `   private mConfigArray:I${name}Struct[] = [];\n`;
        text += `   public constructor(){\n`;
        text += `       this.InitConfig();\n`;
        text += `       this.InitArray();\n`;
        text += `   }\n`;
        text += `   private InitConfig():void{\n`;
        for(let cell of allData)
            text += `       this.mConfigObject[${cell[tableData.GetKey()]}] = ${JSON.stringify(cell)};\n`; 
        text += `   }\n`; 
        text += `   private InitArray(){\n`; 
        text += `       for(let key in this.mConfigObject)\n`;
        text += `           this.mConfigArray.push(this.mConfigObject[key]);\n`;
        text += `   }\n`;
    
        text += `   public GetLen(){\n`
        text += `       return this.mConfigArray.length;\n`
        text += `   }\n`
        text += `   public GetData(key:${tableData.GetTypeForTs(1)}): I${name}Struct|undefined{\n`
        text += `       return this.mConfigObject[key];\n`
        text += `   }\n `
        text += `   public GetDatas():Readonly<Array<I${name}Struct>>{\n`
        text += `       return this.mConfigArray;\n`
        text += `   }\n`;
        text += `}\n`;
        text += `export let Cfg_${name}:${name} = new ${name}();` 
        writeStringToFile(`../../assets/Scripts/Config/Cfg_${name}.ts`, text);
    }   
}
main();    
