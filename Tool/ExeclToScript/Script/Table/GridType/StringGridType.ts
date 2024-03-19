import { AllType } from "../Define";
import { BaseGridType } from "./BaseGridType";
export class StringGridType extends BaseGridType{ 
    public AnalysisType(str:string):boolean{
        return true;
    }

    public Prase(str:string):AllType|undefined{     
        return str.toString();
    } 
    public TypeLenth():number{ return "String".length; }
    public getTypeForTs():string{
        return "string";
    }
}