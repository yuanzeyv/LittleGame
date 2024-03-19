import { BaseGridType } from "./BaseGridType";
import { AllType } from "../Define";

export class BooleanGridType extends BaseGridType{
    public mBaseName:string = "Boolean"; 
    public AnalysisType(str:string):boolean{ return true; }

    public Prase(str:string):AllType|undefined{  
        return str.toString().toLowerCase() == "true"; 
    }  
    public TypeLenth():number{ return "Boolean".length; }

    public getTypeForTs():string{
        return "boolean";
    }

}