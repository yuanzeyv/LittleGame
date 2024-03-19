import { GetTypeByStr } from "../../Util/Util";
import { AllType } from "../Define";
import { BaseGridType } from "./BaseGridType"; 
import { NumberGridType } from "./NumberGridType";
import { ObjectGridType } from "./ObjectGridType";
export class ArrayGridType extends BaseGridType{
    private mBaseType:BaseGridType;//每个数组保存个基础的格子类型
    //解析文件类型
    //Array<Array<Array<Boolean>>>
    //<Array<Array<Boolean>>> 
    //<Array<Boolean>> 
    //<Boolean> 
    public AnalysisType(str:string):boolean{ 
        if(!(str[0] == "<" && str[str.length - 1] == ">")) 
            return false;
        str = str.substring(1,str.length - 1);//删除 < >左右尖括号 
        let typeCons:(new ()=>BaseGridType )|undefined = GetTypeByStr(str);//获取到当前的文件信息
        if(typeCons == undefined) 
            return false;
        this.mBaseType = new typeCons();
        let typeLen:number = this.mBaseType.TypeLenth();
        let final:string = str.substring(typeLen);
        return this.mBaseType.AnalysisType(final);
    } 
    public TypeLenth():number{ return "Array".length; }

    private PraseArray(tempStr:string,result:Array<string>):boolean{ 
        if(tempStr.length == 0) 
            return true;
        if(tempStr[0] != "[")//解析失败的情况
            return false;
        let ret = true;
        let count:number = 0;//当前的花括号数量
        let nowIndex:number = 0//找到开始下标
        let endIndex:number = 0;//找到结束下标 
        while(endIndex < tempStr.length){ 
            if(tempStr[endIndex] == "[") count++; 
            if(tempStr[endIndex] == "]") count--; 
            endIndex++;
            if( count == 0 ){
                result.push(tempStr.substring(nowIndex,endIndex));
                if(tempStr[endIndex] == ","){
                    ret = this.PraseArray(tempStr.substring(endIndex + 1),result); 
                }else if(tempStr[endIndex] != undefined)
                    ret = false;
                break;
            }
        }
        return ret; 
    }
    //[[[0,0],[6546,123]],[[2,3]],[[4,5]],[[0,0]]]
    //[[0,0],[6546,123]],[[2,3]],[[4,5]],[[0,0]]
    //[0,0],[6546,123]],[[2,3]],[[4,5]],[[0,0]
    public PraseSumArray(tempStr:string,resultArr:Array<AllType>):boolean{
        if(!(tempStr[0] == "[" && tempStr[tempStr.length - 1] == "]"))//对数组进行去方括号
            return false; 
        let finalStr:string = tempStr.substring(1,tempStr.length - 1);
        if(this.mBaseType instanceof ArrayGridType){ 
            let ret:Array<string> = new Array<string>();
            if(!this.PraseArray(finalStr,ret))
                return false;
            for(let cell of ret){
                let ret:Array<AllType> = new Array<AllType>();
                if(!(this.mBaseType as ArrayGridType).PraseSumArray(cell,ret))
                    return false;
                resultArr.push(ret); 
            }
        }else if(this.mBaseType instanceof ObjectGridType){ 
            while(finalStr.length > 0){
                let nowCount:number = 0; 
                let nowIndex:number = 0;  
                while(nowIndex < finalStr.length){
                    if(finalStr[nowIndex] == "{") nowCount++;
                    if(finalStr[nowIndex] == "}") nowCount--;
                    nowIndex++;
                    if(nowCount == 0)
                        break;
                }
                let ret:AllType|undefined = this.mBaseType.Prase(finalStr.substring(0,nowIndex));
                if(ret == undefined)
                    return false;
                resultArr.push(ret);
                finalStr = finalStr.substring(nowIndex + 1);
            }
        }else if(this.mBaseType instanceof NumberGridType){
            let dataArr:Array<string> = finalStr.trim().split(",");
            if( dataArr.length == 1 && dataArr[0].length == 0 )
                return true;
            for(let cell of dataArr){ 
                let ret:AllType|undefined = this.mBaseType.Prase(cell);
                if( ret == undefined ) return false;
                resultArr.push(ret); 
            } 
        }else{
            let dataArr:Array<string> = finalStr.split(",");
            for(let cell of dataArr){
                let ret:AllType|undefined = this.mBaseType.Prase(cell);
                if( ret == undefined ) return false;
                resultArr.push(ret); 
            } 
        }
        return true;
    }
    public Prase(str:string):AllType|undefined{   
        let ret:Array<AllType> = new Array<AllType>();
        let isSuccess:boolean = this.PraseSumArray(str,ret);
        return isSuccess?ret:undefined;//准备解析一个数组
    }

    public getTypeForTs():string{
        return `${this.mBaseType.getTypeForTs()}[]`;
    }
} 
