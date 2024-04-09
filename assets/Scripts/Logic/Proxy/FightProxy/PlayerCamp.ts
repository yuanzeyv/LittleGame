import { Buff } from "./Buff";
import { eAttrType } from "./Define/AttrDefine";
import { eCampType } from "./Define/CampDefine";
import { Player } from "./Player";
//阵营的数据层面展示
export class PlayerCamp{ 
    private mCampType:eCampType; 
    private mBuffMap:Map<number,Buff> = new Map<number,Buff>();//阵营Buff信息 key为BuffID 
    private mAttrsMap:Map<eAttrType,number> = new Map<eAttrType,number>();//当前阵营的血量信息
    private mPlayer:Player;//阵营下的玩家信息
    //玩家阵营构造器
    public constructor(camp:eCampType,attrs:{[key:number]:number},name:string){
        this.mCampType = camp; //
        this.mPlayer = new Player(name);
        this.UpdateAttrs(attrs);
    }


    //获取到玩家的单项属性
    public GetAttr(type:eAttrType):number{
        return this.mAttrsMap.get(type) || 0;
    }
    
    //更新玩家的属性
    public UpdateAttrs(attrs:{[key:number]:number}):void{
        for(let cell in attrs)
            this.UpdateAttr(Number(cell),attrs[cell]);
    }
    //更新玩家属性
    public UpdateAttr(type:eAttrType,value:number):void{
        this.mAttrsMap.set(type,value);
    }  

    //插入一个Buff
    public InsertBuff(buffID:number,buffIndex:number,buffLife:number){
        this.mBuffMap.set(buffID,new Buff(buffID,buffIndex,buffLife));//设置Buff信息
    }

    //获取到当前的主玩家
    public GetMainPlayer():Player{
        return this.mPlayer;
    }
} 