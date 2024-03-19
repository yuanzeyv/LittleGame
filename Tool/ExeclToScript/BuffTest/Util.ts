import { IBuffStruct, BuffConfig } from "../Work/OutputScript/Buff";

export function GetKV(data:number):{k:number,v:number}{
    data = Math.floor(data);
    let key:number = data % 100;
    let value:number = (data - key) / 100;
    return {k:key,v:value};
}

//通过类型与等级获取到指定的表信息
export function GetTableByTypeAndLevel(type:number,level:number):IBuffStruct|undefined{
    for(let cell of BuffConfig.GetDatas()){
        if(cell.BuffID == type && cell.Level == level)
            return cell;
    }
    return undefined;
}
