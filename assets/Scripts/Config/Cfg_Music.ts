export interface IMusicStruct{
	key:number; //音乐ID值
	Desc:string; //音乐文本描述
	AudioType:number; //音乐类型 1:音乐（将会循环） 2:音效 （立即进行可控播放）
	path:string; //音乐路径
};
class Music{  
    private mConfigObject:{[key:number]: IMusicStruct}  = {};
    private mConfigArray:Array<IMusicStruct> = new Array<IMusicStruct>();
    constructor(){
        this.InitConfig();
        this.InitArray();
    }
    private InitConfig():void{
		this.mConfigObject[1] = {key:1,Desc:"通用点击音效",AudioType:2,path:"crowned1",};
		this.mConfigObject[2] = {key:2,Desc:"BGM",AudioType:1,path:"EVILLAFF",};
    }
    private InitArray(){
        for(let key in this.mConfigObject){
            this.mConfigArray.push(this.mConfigObject[key]);
        }
    }
    public GetLen(){
        return this.mConfigArray.length;
    }
    public GetData(key:number): IMusicStruct | undefined{
        return this.mConfigObject[key];
    } 
    public GetDatas():Readonly<Array<IMusicStruct>>{
        return this.mConfigArray;
    }
};
export let MusicConfig:Music = new Music();
