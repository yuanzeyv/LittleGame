export abstract class BaseTypeObj{
    protected mData:any;
    protected mVirifyResult:string = "";
    public constructor(){}
    public abstract GetType():string;
    public SetData(data:any):void{
        this.mData = data;
    }
    public GetError():string{   
        return this.mVirifyResult;
    }
    public abstract Virify():boolean;
    public abstract GetResult():any;

}

//通用类型
export class BooleanType extends BaseTypeObj{
    public mBooleanData:boolean = false;
    public GetType():string{
        return "boolean";
    }
    public Virify():boolean{
        if(typeof(this.mData) != "boolean"){
            this.mVirifyResult = "校验失败，传入参数不为 Boolean 类型";
            return false;
        }
        this.mBooleanData = this.mData;
        return true;
    }
    public GetResult():any{
        return this.mBooleanData;
    }
}
export class StringType extends BaseTypeObj{
    private mStringData:string|undefined; 
    public Virify():boolean{
        if(typeof(this.mData) == "undefined" || typeof(this.mData) == "boolean"){
            this.mVirifyResult = "校验失败，传入参数无法转换为字符串类型 类型";
            return false;
        }
        this.mStringData = this.mData.toString();
        return true;
    }
    public GetResult():string{
        return this.mStringData!;
    }
    public GetType():string{
        return "string";
    }
}
export class NumberType extends BaseTypeObj{
    private mNumberData:number|undefined; 
    public Virify():boolean{
        if(typeof(this.mData) == "undefined" || typeof(this.mData) == "boolean"){
            this.mVirifyResult = "校验失败，传入参数无法转换为整数类型";
            return false;
        }
        if(typeof(this.mData) == "string" || isNaN(Number(this.mData)) ){
            this.mVirifyResult = "校验失败，传入参数为字符串类型，但是无法转换为整数类型";
            return false;
        }
        this.mNumberData = Number(this.mData);
        return true;
    }
    public GetResult():number{
        return this.mNumberData!;
    }
    public GetType():string{
        return "number";
    }
}

//特殊类型
export class ObjectType extends BaseTypeObj{
    private mDataTypeMap:Map<string,BaseTypeObj>;
    private mDataMap:Map<string, number | string | boolean >|undefined;
    constructor(typeMap:Map<string,BaseTypeObj>){
        super(); 
        this.mDataTypeMap = typeMap;
    }
    public Virify():boolean{
        if(typeof(this.mData) != "string"){
            this.mVirifyResult = "校验失败，传入参数不为字符串,无法进行下一步转换";
            return false;
        }
        let obj:any
        try{
            obj = JSON.parse(this.mData);
        }catch{
            this.mVirifyResult = "校验失败，传入的json字符串，无法被正常转换";
            return false;
        }
        if(obj.constructor.name != "Object"){
            this.mVirifyResult = "校验失败，转换结果存在错误，其并不为对象类型";
            return false;
        }  
        let data:Map<string, number | string | boolean > = new Map<string, number | string | boolean>();
        for(let cell of this.mDataTypeMap){
            let value:any|undefined = obj[cell[0]];
            if(value == undefined){
                this.mVirifyResult = `对象值：${cell[0]}不存在,请检查Json数据`;
                return false;
            }
            cell[1].SetData(value);
            if(cell[1].Virify() == false){
                this.mVirifyResult = `对象值：${cell[0]}校验失败,原因:${cell[1].GetError()} 请检查Json数据`;
                return false;
            } 
            data.set(cell[0],cell[1].GetResult());
        }
        this.mDataMap = data;
        return  true;
    }
    public GetResult():Map<string, number | string | boolean >|undefined{
        return this.mDataMap!;
    }
    public GetType():string{
        let type:string = "";
        for(let cell of this.mDataTypeMap){
            type += `${cell[0]}:${cell[1].GetType()},` ;
        }
        return `{${type}}`;
    }
}

export class ArrayType extends BaseTypeObj{
    private mDataType:BaseTypeObj;
    private mDataArrayMap:Array<number | string | boolean> | undefined;
    constructor(typeObj:BaseTypeObj){
        super();
        this.mDataType = typeObj;
    }
    
    public GetResult():Array<number | string | boolean>{
        return this.mDataArrayMap!;
    }

    public Virify():boolean{
        if(typeof(this.mData) != "string"){
            this.mVirifyResult = "校验失败，传入参数不为字符串,无法进行下一步转换";
            return false;
        }
        let obj:any
        try{
            obj = JSON.parse(this.mData);
        }catch{
            this.mVirifyResult = "校验失败，传入的json字符串，无法被正常转换";
            return false;
        }
        if(!(obj instanceof Array)){
            this.mVirifyResult = "校验失败，转换结果存在错误，其并不为数组类型";
            return false;
        }  
        let data:Array<number | string | boolean > = new Array<number | string | boolean>();
        for(let cell of obj){
            this.mDataType.SetData(cell); 
            if(this.mDataType.Virify() == false){
                this.mVirifyResult = `数组值${cell}校验失败,原因:${cell[1].GetError()} 请检查Json数据`;
                return false;
            } 
            data.push(this.mDataType.GetResult());
        }
        this.mDataArrayMap = data;
        return  true;
    }
    
    public GetType():string{
        return `Array<${this.mDataType.GetType()}>`;
    }
}
 