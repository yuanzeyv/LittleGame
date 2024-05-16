
import { GetTypeByStr } from "../../Util/Util";
import { ArrayGridType } from "./ArrayGridType";
import { BaseGridType } from "./BaseGridType";
import { BooleanGridType } from "./BooleanGridType";
import { NumberGridType } from "./NumberGridType";
import { AllType } from "../Define";
import { StringGridType } from "./StringGridType";
export class ObjectGridType extends BaseGridType{
    private mBaseTypeMap:Map<string,BaseGridType> = new Map<string,BaseGridType>();
    public AnalysisType(str:string):boolean{
        if(!(str[0] == "{" && str[str.length - 1] == "}"))//判断当前数据是否为一个基本的对象类型
            return false;
        str = str.substring(1,str.length - 1);//获取到需要的字符串
        while(str.length > 0){
            let nameInfo:Array<string>|null = str.match(/^[a-zA-Z]+[0-9a-zA-Z]*:/);
            if( nameInfo == undefined)
                return false;
            let name:string = nameInfo[0].substring(0,nameInfo[0].length-1);
            str = str.substring(name.length + 1);
            let baseType:(new () => BaseGridType) | undefined = GetTypeByStr(str);
            if( baseType == undefined)
                return false;
            let typeObj:BaseGridType = new baseType();//获取到了类型对象 
            let typeLength:number = typeObj.TypeLenth();
            if( (typeObj instanceof StringGridType) || (typeObj instanceof NumberGridType) || (typeObj instanceof BooleanGridType)){
                typeObj.AnalysisType("");
                str = str.substring(typeLength + 1); 
            }else if( (typeObj instanceof ArrayGridType) || (typeObj instanceof ObjectGridType)){
                str = str.substring(typeLength); 
                let nowCount:number = 0; 
                let nowIndex:number = 0;  
                let startFlag:string = (typeObj instanceof ArrayGridType) ? "<":"{";
                let endFlag:string = (typeObj instanceof ArrayGridType) ? ">":"}";
                while(nowIndex < str.length){
                    if(str[nowIndex] == startFlag)
                        nowCount++;
                    if(str[nowIndex] == endFlag)
                        nowCount--;
                    nowIndex++;
                    if(nowCount == 0)
                        break;
                }
                typeObj.AnalysisType(str.substring(0,nowIndex));
                str = str.substring(nowIndex + 1);
            }
            this.mBaseTypeMap.set(name,typeObj);
        } 
        return true; 
    }
    public TypeLenth():number{ return "Object".length; }


    public ParseObject(str:string,result:AllType):AllType|undefined{
        if(!(str[0] == "{" && str[str.length - 1] == "}"))//判断当前数据是否为一个基本的对象类型
            return undefined;
        str = str.substring(1,str.length - 1);//获取到需要的字符串
        while(str.length > 0){
            let nameInfo:Array<string>|null = str.match(/^[a-zA-Z]+[0-9a-zA-Z]*:/);
            if( nameInfo == undefined)
                return undefined;
            let name:string = nameInfo[0].substring(0,nameInfo[0].length-1);
            str = str.substring(name.length + 1); 
            let typeInfo:BaseGridType|undefined = this.mBaseTypeMap.get(name);//通过名称获取到对应的解释器
            if(typeInfo == undefined)//发现了一个不存在的Key
                return undefined;
            if( (typeInfo instanceof ObjectGridType) || (typeInfo instanceof ArrayGridType) ){ 
                let nowCount:number = 0; 
                let nowIndex:number = 0;   
                let startFlag:string = (typeInfo instanceof ArrayGridType) ? "[":"{";
                let endFlag:string = (typeInfo instanceof ArrayGridType) ? "]":"}";
                while(nowIndex < str.length){
                    if(str[nowIndex] == startFlag) nowCount++; 
                    if(str[nowIndex] == endFlag ) nowCount--;
                    nowIndex++;
                    if(nowCount == 0)
                        break;
                }
                let retInfo:AllType|undefined= typeInfo.Prase(str.substring(0,nowIndex)); 
                (result as any)[name] = retInfo;
                str = str.substring(nowIndex + 1);  
            }else {
                let nameInfo:Array<string>|null = str.match(/^[^,]*,/);  
                let ret:AllType|undefined;
                if(nameInfo == undefined){
                    nameInfo = [str];
                    ret = typeInfo.Prase(nameInfo[0].substring(0,nameInfo[0].length)); 
                }else
                    ret = typeInfo.Prase(nameInfo[0].substring(0,nameInfo[0].length -1));
                
                if(ret == undefined )
                    return false; 
                (result as any)[name] = ret; 
                str = str.substring(nameInfo[0].length);
            }
        } 
        return result; 
    }

    public Prase(str:string):AllType|undefined{   
        let result:{[key:string]:number} = {}; 
        return this.ParseObject(str,result);
    }
 
    public getTypeForTs():string{ 
        let ret:string = "{"
        for(let cell of this.mBaseTypeMap){
            ret += cell[0];
            ret += ":";
            ret += cell[1].getTypeForTs();
            ret += ";"; 
        }
        ret += "}";
        return ret;
    }
} 