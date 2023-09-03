import { readFolderSync, writeStringToFile } from './FileOperation/FileOperation';
import { ParseFiled } from './transTable/ParseFiled'; 
const baseFolderPath = './Table/TransXlsxTable'; // 替换为要读取的文件夹的路径
let paths:Array<string> = readFolderSync(baseFolderPath);//获取文件夹下所有木文件信息
let parseFiledArray:Array<ParseFiled> = new Array<ParseFiled>();
for(let path of paths){
    let parseData:ParseFiled = new ParseFiled(`${baseFolderPath}/${path}`,path);//创建一个解析字段
    if(!parseData.InitData()){//初始化其数据
        console.log(`解析${path}表 状态:失败  错误原因:${parseData.GetErrorResult()}`);
        continue;
    }
    console.log(`解析${path}表 状态:成功`);
    parseFiledArray.push(parseData);
}  
console.log(``);
console.log(`解析缓存数据创建成功，开始解析表文件至文件夹 `);

for(let cell of parseFiledArray){
    if(!cell.IsSuccess()) continue;
    let name = cell.GetName().split(".")[0];//表明
    let configStructName:string = `I${name}Struct`;//数据结构名
    let exportClassName:string = `${name}Config`;//输出表名
    let keyType:string = cell.GetKeyType();//获取到key的类型
    //成员变量描述
    let memberArr:{filed: string; desc: string;type: string;}[] = cell.GetMemberAttr();
    let meberDesc:string = "";
    for(let cell of memberArr){
        meberDesc += `\n\t${cell.filed}:${cell.type}; //${cell.desc}`;
    } 
    //成员数据区域
    let dataArray:Array<string> = cell.GetDataArray();
    let dataDesc:string = "";
    for(let cell of dataArray)
        dataDesc += `\n\t\tthis.mConfigArray${cell};`;
    
let outputTemplet:string = 
`export interface ${configStructName}{${meberDesc}
};
class ${name}{ 
    private mConfigArray:{[key:${keyType}]: ${configStructName}}  = {};
    constrator(){
        this.InitConfig();
    }
    private InitConfig():void{${dataDesc}
    }
    public GetData(key:${keyType}): ${configStructName} | undefined{
        return this.mConfigArray[key];
    } 
};
export let ${exportClassName}:${name} = new ${name}();
`; 
    writeStringToFile(`./Table/OutputScript/${name}.ts`, outputTemplet);
} 