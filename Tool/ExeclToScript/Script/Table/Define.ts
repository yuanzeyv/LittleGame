export const WORK_TABLE_NAME = "DataTable";//用以描述工作Table的名字
export enum eRowType{
    Name,//名字列
    Desc,//描述列
    Type,//类型列
    Port,//前后端字段列
    Final,//数据列
};

export type TBaseType = number|string|boolean;
export type TArrayBaseType = Array<number|string|boolean|TArrayBaseType|TObjectBaseType>;
export type TObjectBaseType = {[key:string]:TObjectBaseType|TArrayBaseType|TBaseType};
export type AllType = TArrayBaseType|TBaseType|TObjectBaseType;
