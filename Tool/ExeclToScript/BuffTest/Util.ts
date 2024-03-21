import { IBuffStruct, BuffConfig } from "../Work/OutputScript/Buff";

export function GetKV(data:number):{k:number,v:number}{
    data = Math.floor(data);
    let key:number = data % 100;
    let value:number = (data - key) / 100;
    return {k:key,v:value};
}
