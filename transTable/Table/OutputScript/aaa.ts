export interface IaaaStruct{
	key:number; //唯一键
	name:string; //名称
	pos:{x:number,y:number,z:number,}; //坐标
	data:Array<number>; //数组信息
	isSuccess:boolean; // 是否成功
};
class aaa{ 
    private mConfigArray:{[key:number]: IaaaStruct}  = {};
    constrator(){
        this.InitConfig();
    }
    private InitConfig():void{
		this.mConfigArray[6] = {key:6,name:"天使鱼",pos:{x:100,y:200,z:300,},data:[1,],isSuccess:false,};
		this.mConfigArray[2] = {key:2,name:"灯笼鱼",pos:{x:101,y:200,z:300,},data:[2,],isSuccess:true,};
		this.mConfigArray[3] = {key:3,name:"炸弹鱼",pos:{x:102,y:200,z:300,},data:[3,4,],isSuccess:false,};
		this.mConfigArray[4] = {key:4,name:"骨头鱼",pos:{x:103,y:200,z:300,},data:[],isSuccess:true,};
		this.mConfigArray[5] = {key:5,name:"螃蟹鱼",pos:{x:104,y:200,z:300,},data:[4,5,],isSuccess:true,};
    }
    public GetData(key:number): IaaaStruct | undefined{
        return this.mConfigArray[key];
    } 
};
export let aaaConfig:aaa = new aaa();
