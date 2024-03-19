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

export function RoughVirifyTable(tablePath:string):any[][]|undefined{
    let qq:Array<{name: string,data:any[][] }> = xlsx.parse(tablePath);
    let dataTable:any[][]|undefined = undefined;
    for(let cell of qq){
        if( cell.name == WORK_TABLE_NAME ){
            dataTable = cell.data;
            break;
        }
    }
    if(dataTable == undefined){
        console.log(`${tablePath}:没有工作Sheet:${WORK_TABLE_NAME}`);
        return undefined;
    }
    let col:number = dataTable[eRowType.Type].length;//用类型行，表示一行有几个元素
    let sumRow:number = eRowType.Final;//获取到当前的总行数
    for(let index = eRowType.Final;index < dataTable.length ;index ++ ){
        if(dataTable[index][0] != "T")
            break; 
        sumRow++;
    }
    dataTable = dataTable.slice(0,sumRow);  
    for(let index = 0;index < sumRow ;index ++ ){
        dataTable[index] = dataTable[index].slice(0,col);
        if(index < eRowType.Final)
            continue;
        //判断列不为空
        for(let colIndex:number = 1;colIndex < col;colIndex ++ ){
            if( dataTable[index][colIndex] == undefined){
                console.log(`${tablePath}:简单校验失败 ${index}:${colIndex}为空`);
                return undefined;
            }
        }
    }
    return dataTable;
}