import { Buff } from "./Buff";
import { eAttrType } from "./Define/AttrDefine";
import { eCampType } from "./Define/CampDefine";
import { Player } from "./Player";
export class Camp{ 
    private mCampType:eCampType; 
    private mBuffMap:Map<number,Buff> = new Map<number,Buff>();//阵营Buff信息 key为BuffID 
    private mAttrsMap:Map<eAttrType,number> = new Map<eAttrType,number>();//当前阵营的血量信息
    private mPlayer:Player;//阵营下的玩家信息

    public constructor(camp:eCampType,attrs:{[key:number]:number}){
        this.mCampType = camp; 
        this.mPlayer = new Player();
        this.UpdateAttrs(attrs);
    }

    public GetAttr(type:eAttrType):number{
        return this.mAttrsMap.get(type) || 0;
    }
    
    public UpdateAttrs(attrs:{[key:number]:number}):void{
        for(let cell in attrs)
            this.mAttrsMap.set(Number(cell),attrs[cell]);
    }

    public UpdateAttr(type:eAttrType,value:number):void{
        this.mAttrsMap.set(type,value);
    }  

    public InsertBuff(buffID:number,buffIndex:number,buffLife:number){
        this.mBuffMap.set(buffID,new Buff(buffID,buffIndex,buffLife));//设置Buff信息
    }
} 