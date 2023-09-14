export interface ISimpleFishMoveStruct{
	key:number; //唯一键
	name:string; //名称
	desc:string; //文本描述
	pet_pos:number; //在宠物中的排布
	spine_path:string; //宠物对应的简单的Spine地址
	offset:{x:number,y:number,z:number,}; //坐标
};
class SimpleFishMove{  
    private mConfigObject:{[key:number]: ISimpleFishMoveStruct}  = {};
    private mConfigArray:Array<ISimpleFishMoveStruct> = new Array<ISimpleFishMoveStruct>();
    constructor(){
        this.InitConfig();
        this.InitArray();
    }
    private InitConfig():void{
		this.mConfigObject[1] = {key:1,name:"蜗牛",desc:"在水箱下漫游，拾取所触碰到的所有金币",pet_pos:1,spine_path:"SimpleMoveFish/Snail",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[2] = {key:2,name:"蚌壳",desc:"蚌壳可以生产珍珠，点击可以获得大量的金币",pet_pos:2,spine_path:"SimpleMoveFish/PearlShell",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[3] = {key:3,name:"金枪鱼",desc:"金枪鱼可以帮助你攻击外星人",pet_pos:3,spine_path:"SimpleMoveFish/Swordfish",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[4] = {key:4,name:"妈妈鱼",desc:"妈妈鱼每隔一段时间，会生下一条小小鱼",pet_pos:4,spine_path:"SimpleMoveFish/MotherFish",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[5] = {key:5,name:"小海马",desc:"小海马会帮助你喂你的小鱼",pet_pos:5,spine_path:"SimpleMoveFish/Hippo",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[6] = {key:6,name:"丑丑水母",desc:"丑丑水母会飘过你的鱼缸，收集所触碰到的所有金币",pet_pos:6,spine_path:"SimpleMoveFish/Octopus",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[7] = {key:7,name:"骨头鱼",desc:"骨头鱼会向小丑鱼一样生产金币，但是你不需要喂它",pet_pos:7,spine_path:"SimpleMoveFish/BoneFish",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[8] = {key:8,name:"小螃蟹",desc:"当敌人在鱼缸底部是，小螃蟹会对敌人照成成吨的伤害",pet_pos:8,spine_path:"SimpleMoveFish/Crab",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[9] = {key:9,name:"美人鱼",desc:"让小鱼更开心，更快的成长鱼生产金币",pet_pos:9,spine_path:"SimpleMoveFish/Mermaid",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[10] = {key:10,name:"鲸鱼",desc:"外星人来领时，鲸鱼会保护你的小鱼",pet_pos:10,spine_path:"SimpleMoveFish/Whale",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[11] = {key:11,name:"小象",desc:"可爱的小象",pet_pos:11,spine_path:"SimpleMoveFish/Elephant",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[12] = {key:12,name:"大鼻子",desc:"大人物的鼻子",pet_pos:12,spine_path:"SimpleMoveFish/Nose",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[13] = {key:13,name:"小恐龙",desc:"小恐龙无所畏惧",pet_pos:13,spine_path:"SimpleMoveFish/LittleDinosaur",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[14] = {key:14,name:"小企鹅",desc:"北极的企鹅迷路啦",pet_pos:14,spine_path:"SimpleMoveFish/Penguin",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[15] = {key:15,name:"小乌龟",desc:"小乌龟会让所有触碰到的金币重新弹起来",pet_pos:15,spine_path:"SimpleMoveFish/Tortoise",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[16] = {key:16,name:"炸弹小鱼",desc:"定期生产炸弹，会炸飞你的小鱼，但是拆毁炸弹会获得大量金币",pet_pos:16,spine_path:"SimpleMoveFish/BomFish",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[17] = {key:17,name:"灯笼鱼",desc:"当地人来临时，带领你的小鱼远离敌人",pet_pos:17,spine_path:"SimpleMoveFish/Anglerfish",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[18] = {key:18,name:"海豚",desc:"海洋情报员，掌管了海洋的所有信息",pet_pos:18,spine_path:"SimpleMoveFish/Dolphin",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[19] = {key:19,name:"寄居蟹",desc:"小小寄居蟹",pet_pos:19,spine_path:"SimpleMoveFish/HermitCrab",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[20] = {key:20,name:"可爱魔鬼",desc:"把所有触碰到的物体都扔了",pet_pos:20,spine_path:"SimpleMoveFish/FlyingFish",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[21] = {key:21,name:"小小电鳗",desc:"它将电飞你鱼缸你的所有鱼",pet_pos:21,spine_path:"SimpleMoveFish/ElectricEel",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[22] = {key:22,name:"英俊鲨",desc:"帮助你攻击敌人",pet_pos:22,spine_path:"SimpleMoveFish/Shark",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[23] = {key:23,name:"神仙鱼",desc:"可以复活死亡的小鱼",pet_pos:23,spine_path:"SimpleMoveFish/Angle",offset:{x:0,y:0,z:0,},};
		this.mConfigObject[24] = {key:24,name:"小蝌蚪",desc:"复制任何小鱼的能力",pet_pos:24,spine_path:"SimpleMoveFish/TadpoleFish",offset:{x:0,y:0,z:0,},};
    }
    private InitArray(){
        for(let key in this.mConfigObject){
            this.mConfigArray.push(this.mConfigObject[key]);
        }
    }
    public GetLen(){
        return this.mConfigArray.length;
    }
    public GetData(key:number): ISimpleFishMoveStruct | undefined{
        return this.mConfigObject[key];
    } 
    public GetDatas():Readonly<Array<ISimpleFishMoveStruct>>{
        return this.mConfigArray;
    }
};
export let SimpleFishMoveConfig:SimpleFishMove = new SimpleFishMove();
