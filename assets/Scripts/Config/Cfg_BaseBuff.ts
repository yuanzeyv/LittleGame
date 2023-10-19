export interface IBaseBuffStruct{
	key:number; //唯一键
	name:string; //名称
	desc:string; //文本描述
	buffType:number; //Buff类型
	pet_pos:number; //加成类型
};
class BaseBuff{  
    private mConfigObject:{[key:number]: IBaseBuffStruct}  = {};
    private mConfigArray:Array<IBaseBuffStruct> = new Array<IBaseBuffStruct>();
    constructor(){
        this.InitConfig();
        this.InitArray();
    }
    private InitConfig():void{
		this.mConfigObject[1] = {key:1,name:"攻击力加成",desc:"生物的攻击力加成",buffType:0,pet_pos:1,};
		this.mConfigObject[2] = {key:2,name:"基础攻击力加成(百分比)",desc:"生物的基础攻击力加成百分之数值",buffType:0,pet_pos:2,};
		this.mConfigObject[3] = {key:3,name:"总攻击力加成(百分比)",desc:"生物的总攻击力加成",buffType:0,pet_pos:3,};
		this.mConfigObject[4] = {key:4,name:"防御力加成",desc:"生物防御力加成",buffType:1,pet_pos:1,};
		this.mConfigObject[5] = {key:5,name:"基础防御力加成(百分比)",desc:"生物基础防御力加成",buffType:1,pet_pos:2,};
		this.mConfigObject[6] = {key:6,name:"总防御力加成（百分比）",desc:"生物总防御力加成",buffType:1,pet_pos:3,};
		this.mConfigObject[7] = {key:7,name:"生命上限加成",desc:"生物的生命上限加成",buffType:2,pet_pos:1,};
		this.mConfigObject[8] = {key:8,name:"基础生命上限加成（百分比）",desc:"基础生命上限加成",buffType:2,pet_pos:2,};
		this.mConfigObject[9] = {key:9,name:"总生命上限加成(百分比)",desc:"总生命上限加成",buffType:2,pet_pos:3,};
		this.mConfigObject[10] = {key:10,name:"移速加成",desc:"移动速度加成",buffType:3,pet_pos:1,};
		this.mConfigObject[11] = {key:11,name:"基础移速加成(百分比)",desc:"基础速度加成",buffType:3,pet_pos:2,};
		this.mConfigObject[12] = {key:12,name:"总移速加成(百分比)",desc:"总速度加成",buffType:3,pet_pos:3,};
		this.mConfigObject[13] = {key:13,name:"暴击率加成",desc:"基础暴击加成",buffType:4,pet_pos:1,};
		this.mConfigObject[14] = {key:14,name:"基础暴击率加成（百分比）",desc:"基础暴击率加成",buffType:4,pet_pos:2,};
		this.mConfigObject[15] = {key:15,name:"总暴击率加成(百分比)",desc:"总暴击率加成",buffType:4,pet_pos:3,};
		this.mConfigObject[16] = {key:16,name:"暴击伤害加成",desc:"暴击伤害加成",buffType:5,pet_pos:1,};
		this.mConfigObject[17] = {key:17,name:"基础暴击伤害加成（百分比）",desc:"暴击伤害百分比加成",buffType:5,pet_pos:2,};
		this.mConfigObject[18] = {key:18,name:"总暴击伤害加成(百分比)",desc:"总暴击伤害加成",buffType:5,pet_pos:3,};
		this.mConfigObject[19] = {key:19,name:"能量消耗速率加成",desc:"能量消耗速率加成",buffType:6,pet_pos:1,};
		this.mConfigObject[20] = {key:20,name:"基础能量消耗速率加成(百分比)",desc:"能量消耗速率基础加成",buffType:6,pet_pos:2,};
		this.mConfigObject[21] = {key:21,name:"总能量消耗速率加成(百分比)",desc:"总能量消耗速率加成",buffType:6,pet_pos:3,};
		this.mConfigObject[22] = {key:22,name:"进食速率加成",desc:"进食速率加成",buffType:7,pet_pos:1,};
		this.mConfigObject[23] = {key:23,name:"基础进食速率加成(百分比)",desc:"基础进食速率加成",buffType:7,pet_pos:2,};
		this.mConfigObject[24] = {key:24,name:"总进食速率加成(百分比)",desc:"总进食速率加成",buffType:7,pet_pos:3,};
    }
    private InitArray(){
        for(let key in this.mConfigObject){
            this.mConfigArray.push(this.mConfigObject[key]);
        }
    }
    public GetLen(){
        return this.mConfigArray.length;
    }
    public GetData(key:number): IBaseBuffStruct | undefined{
        return this.mConfigObject[key];
    } 
    public GetDatas():Readonly<Array<IBaseBuffStruct>>{
        return this.mConfigArray;
    }
};
export let BaseBuffConfig:BaseBuff = new BaseBuff();
