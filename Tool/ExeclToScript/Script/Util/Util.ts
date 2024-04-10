import xlsx from "node-xlsx";  
import { ArrayGridType } from "../Table/GridType/ArrayGridType";
import { BaseGridType } from "../Table/GridType/BaseGridType";
import { BooleanGridType } from "../Table/GridType/BooleanGridType";
import { NumberGridType } from "../Table/GridType/NumberGridType";
import { ObjectGridType } from "../Table/GridType/ObjectGridType";
import { StringGridType } from "../Table/GridType/StringGridType";
import { WORK_TABLE_NAME, eRowType } from "../Table/Define";
export function GetTypeByStr(str:string):(new () => BaseGridType) | undefined {
    let compareMap:Map<string,new ()=>BaseGridType> = new Map<string,new ()=>BaseGridType>();
    compareMap.set("Array",ArrayGridType);
    compareMap.set("Number",NumberGridType); 
    compareMap.set("String",StringGridType);
    compareMap.set("Boolean",BooleanGridType); 
    compareMap.set("Object",ObjectGridType); 
    for(let cell of compareMap){
        let isCompare:boolean = str.startsWith(cell[0]);
        if(isCompare)
            return cell[1];
    } 
    return undefined; 
} 

export function GetWorkSheet(tablePath:string):{name: string,data:any[][] }|undefined{
    let tableInfo:Array<{name: string,data:any[][] }> = xlsx.parse(tablePath);
    for( let cell of tableInfo){
        if( cell.name == WORK_TABLE_NAME)
            return cell;
    }
    return undefined;
}


export function GetSimpleVirifyTable(basePath:string,tablePath:string):any[][]|undefined{
    let workSheet:{name: string,data:any[][] }|undefined= GetWorkSheet(`${basePath}/${tablePath}`);
    if( workSheet == undefined ){
        console.log(`${tablePath}:没有工作Sheet:${WORK_TABLE_NAME}`);
        return undefined;
    }
    let tableData:any[][] = workSheet.data;
    //eRowType.Type     类型行，将明确Table有多少列
    let sumCol:number = tableData[eRowType.Type].length;
    let sumRow:number = eRowType.Final;//获取到当前的总行数
    for(let index = eRowType.Final;index < tableData.length ;index ++ ){
        if(tableData[index][0] != "T")//循环遍历拥有多少个T
            break;  
        sumRow++;
    }
    console.log(`${tablePath}表   总行数为:${sumRow}  总列数为:${sumCol}`);
    tableData = tableData.slice(0,sumRow);  
    for(let row = 0; row < sumRow ;row ++ ){
        tableData[row] = tableData[row].slice(0,sumCol);//进行剔除多余列
        if(row < eRowType.Final)
            continue; 
        for(let col:number = 1;col < sumCol;col ++ ){
            let typeStr:string = tableData[eRowType.Type][col].replace(/\s/g,'');//对字符串进行匹配
            let BaseGridType:(new () => BaseGridType) | undefined = GetTypeByStr(typeStr);
            if(BaseGridType == undefined){
                console.log(`${tablePath}表,${tableData[eRowType.Name][col]}类型描述错误,无法在基础类型中找到 ${typeStr}`);
                return undefined;
            } 
            let gridType = new BaseGridType();  
            if(!gridType.AnalysisType(typeStr.substring(gridType.TypeLenth()))){
                console.log(`${tablePath}表,${tableData[eRowType.Name][col]}类型解析验证失败 ${typeStr}`);
                return undefined;
            }
            if(gridType.Prase(tableData[row][col] || "") == undefined){
                console.log(`${tablePath}表,在解析 ${row + 1}:${col + 1} 时，发现数据${tableData[row][col]} 无法被解析为${gridType.getTypeForTs()}`);
                return undefined;
            }
        }
    }
    return tableData;
}