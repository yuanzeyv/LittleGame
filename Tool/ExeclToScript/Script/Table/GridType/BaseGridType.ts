import { AllType } from "../Define";
export abstract class BaseGridType{
    public abstract AnalysisType(str:string):boolean;
    public abstract Prase(str:string):AllType|undefined;
    public abstract TypeLenth():number;
    public abstract getTypeForTs():string;
}; 