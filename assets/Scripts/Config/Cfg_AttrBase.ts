export interface IAttrBaseStruct{
	key:number; //属性名称
	name:string; //属性名称
};
class AttrBase{  
    private mConfigObject:{[key:number]: IAttrBaseStruct}  = {};
    private mConfigArray:Array<IAttrBaseStruct> = new Array<IAttrBaseStruct>();
    constructor(){
        this.InitConfig();
        this.InitArray();
    }
    private InitConfig():void{
		this.mConfigObject[1] = {key:1,name:"生命",};
		this.mConfigObject[2] = {key:2,name:"生命万分比",};
		this.mConfigObject[3] = {key:3,name:"生命总万分比",};
		this.mConfigObject[4] = {key:4,name:"攻击力",};
		this.mConfigObject[5] = {key:5,name:"攻击万分比",};
		this.mConfigObject[6] = {key:6,name:"攻击总万分比",};
		this.mConfigObject[7] = {key:7,name:"防御",};
		this.mConfigObject[8] = {key:8,name:"防御万分比",};
		this.mConfigObject[9] = {key:9,name:"防御总万分比",};
		this.mConfigObject[10] = {key:10,name:"速度",};
		this.mConfigObject[11] = {key:11,name:"速度万分比",};
		this.mConfigObject[12] = {key:12,name:"速度总万分比",};
		this.mConfigObject[13] = {key:13,name:"吸血",};
		this.mConfigObject[14] = {key:14,name:"吸血万分比",};
		this.mConfigObject[15] = {key:15,name:"吸血总万分比",};
		this.mConfigObject[16] = {key:16,name:"反击",};
		this.mConfigObject[17] = {key:17,name:"反击万分比",};
		this.mConfigObject[18] = {key:18,name:"反击总万分比",};
		this.mConfigObject[19] = {key:19,name:"连击",};
		this.mConfigObject[20] = {key:20,name:"连击万分比",};
		this.mConfigObject[21] = {key:21,name:"连击总万分比",};
		this.mConfigObject[22] = {key:22,name:"爆伤",};
		this.mConfigObject[23] = {key:23,name:"爆伤万分比",};
		this.mConfigObject[24] = {key:24,name:"爆伤总万分比",};
		this.mConfigObject[25] = {key:25,name:"闪避",};
		this.mConfigObject[26] = {key:26,name:"闪避万分比",};
		this.mConfigObject[27] = {key:27,name:"闪避总万分比",};
		this.mConfigObject[28] = {key:28,name:"暴击",};
		this.mConfigObject[29] = {key:29,name:"暴击万分比",};
		this.mConfigObject[30] = {key:30,name:"暴击总万分比",};
		this.mConfigObject[31] = {key:31,name:"击晕",};
		this.mConfigObject[32] = {key:32,name:"击晕万分比",};
		this.mConfigObject[33] = {key:33,name:"击晕总万分比",};
		this.mConfigObject[34] = {key:34,name:"最终伤害",};
		this.mConfigObject[35] = {key:35,name:"最终伤害万分比",};
		this.mConfigObject[36] = {key:36,name:"最终伤害总万分比",};
		this.mConfigObject[37] = {key:37,name:"抗吸血",};
		this.mConfigObject[38] = {key:38,name:"抗吸血万分比",};
		this.mConfigObject[39] = {key:39,name:"抗吸血总万分比",};
		this.mConfigObject[40] = {key:40,name:"抗反击",};
		this.mConfigObject[41] = {key:41,name:"抗反击万分比",};
		this.mConfigObject[42] = {key:42,name:"抗反击总万分比",};
		this.mConfigObject[43] = {key:43,name:"抗连击",};
		this.mConfigObject[44] = {key:44,name:"抗连击万分比",};
		this.mConfigObject[45] = {key:45,name:"抗连击总万分比",};
		this.mConfigObject[46] = {key:46,name:"抗爆伤",};
		this.mConfigObject[47] = {key:47,name:"抗爆伤万分比",};
		this.mConfigObject[48] = {key:48,name:"抗爆伤总万分比",};
		this.mConfigObject[49] = {key:49,name:"抗闪避",};
		this.mConfigObject[50] = {key:50,name:"抗闪避万分比",};
		this.mConfigObject[51] = {key:51,name:"抗闪避总万分比",};
		this.mConfigObject[52] = {key:52,name:"抗暴击",};
		this.mConfigObject[53] = {key:53,name:"抗暴击万分比",};
		this.mConfigObject[54] = {key:54,name:"抗暴击总万分比",};
		this.mConfigObject[55] = {key:55,name:"抗击晕",};
		this.mConfigObject[56] = {key:56,name:"抗击晕万分比",};
		this.mConfigObject[57] = {key:57,name:"抗击晕总万分比",};
		this.mConfigObject[58] = {key:58,name:"减伤",};
		this.mConfigObject[59] = {key:59,name:"减伤万分比",};
		this.mConfigObject[60] = {key:60,name:"减伤总万分比",};
    }
    private InitArray(){
        for(let key in this.mConfigObject){
            this.mConfigArray.push(this.mConfigObject[key]);
        }
    }
    public GetLen(){
        return this.mConfigArray.length;
    }
    public GetData(key:number): IAttrBaseStruct | undefined{
        return this.mConfigObject[key];
    } 
    public GetDatas():Readonly<Array<IAttrBaseStruct>>{
        return this.mConfigArray;
    }
};
export let AttrBaseConfig:AttrBase = new AttrBase();
