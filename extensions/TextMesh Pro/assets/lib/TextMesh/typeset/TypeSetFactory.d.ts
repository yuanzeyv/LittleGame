import { ITypeSet } from "../types/ITypeSet";
export declare class TypeSetFactory {
    private static _typeMap;
    private static _typeInsts;
    static regist(type: string, cst: Function): void;
    static get(type: string): ITypeSet;
}
