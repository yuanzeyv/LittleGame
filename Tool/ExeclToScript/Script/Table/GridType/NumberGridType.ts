import { BaseGridType } from "./BaseGridType";
import { AllType } from "../Define";

export class NumberGridType extends BaseGridType{ 
    public AnalysisType(str:string):boolean{ return true; }
    public Prase(str:string):AllType|undefined{    
        if(isNaN(Number(str)))
            return undefined;
        return Number(str);
    } 
    public TypeLenth():number{ return "Number".length; }
    
    public getTypeForTs():string{
        return "number";
    }

} 