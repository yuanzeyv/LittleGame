import { Node, Vec2, Vec3 } from "cc";
import { SpineMediator } from "../../Proxy/SkeletonProxy/Const/SpineMediator";
import { _Facade } from "../../../Global";
import { SkeletonProxy } from "../../Proxy/SkeletonProxy/SkeletonProxy";

export enum eAttrType{//用于计算属性的基础信息
    //玩家的基础属性
    Attack              =    0,//攻击
    AttackPercent       =    1,//攻击百分比加成
    AttackFinalPercent  =    2,//攻击力最终百分比加成
    Defense             =    3,//防御
    DefensePercent      =    4,//防御百分比加成
    DefenseFinalPercent =    5,//防御力最终百分比加成
    Speed               =    6,//速度
    SpeedPercent        =    7,//速度百分比加成
    SpeedFinalPercent   =    8,//速度力最终百分比加成
    Life                =    9,//生命
    LifePercent         =   10,//生命百分比
    LifeFinalPercent    =   11,//生命最终加成
    //玩家的额外基础属性
    SumAttack           =   50,//总攻击力 
    SumDefense          =   51,//总防御力
    SumHPLimit          =   52,//最大生命值
    SumSpeed            =   53,//总速度
    SumFinalHP          =   54,//角色当前生命值
    Final               ,//最大
};
//阵营信息
export enum eCampType{
    Initiative,//主动进攻的一方 
    Passivity, //被动防守的一方
}
export class Player{
    private mHeroSpineMediator:SpineMediator;
    private mNode:Node;//角色节点
    private mHPBar:Node;//血条节点
    public constructor(parent:Node,path:string){
        this.mHeroSpineMediator = _Facade.FindProxy(SkeletonProxy).CreateSpineEffect(parent,path,[
            "root/main/body",//身体
            "root/main/body/body2",//副武器
            "root/main/body/hand",//胳膊
            "root/main/body/hand2",
            "root/main/body/head",
            "root/main/body/head/fair",
            "root/main/shadow",
        ]);
        this.mHeroSpineMediator.SetAction("stand");
    }

    public SetPosition(x:number,y:number):void{
        this.mHeroSpineMediator.GetNode().setPosition( x , y );
    }

    public SetFilp(isFilp:boolean):void{
        let scaleVec:Vec3 = this.mHeroSpineMediator.GetNode().getScale();
        this.mHeroSpineMediator.GetNode().setScale(scaleVec.x * (isFilp ? -1 : 1),scaleVec.y,scaleVec.z)
    }
}
export class Camp{
    private mIsReversal:boolean;
    private mCampType:eCampType;
    private mNode:Node;//节点Nod
    private mPlayer:Player;
    private mAttrsMap:Map<eAttrType,number> = new Map<eAttrType,number>();//当前阵营的血量信息

    public constructor(camp:eCampType,fightNode:Node){
        this.mCampType = camp;
        this.mNode = fightNode;
    }
    
    public InitAttrs(attrs:{[key: number]: number;}){
        for(let key in eAttrType){
            if(this.mAttrsMap[key] == undefined)
                continue;
            this.mAttrsMap[key] = 0;
        }
        for(let cell in attrs)
            this.mAttrsMap[cell] = attrs[cell]; 
    }
    public InsertPlayer(path:string,isReversal:boolean):void{ 
        this.mPlayer = new Player(this.mNode,`spine_eff/${path}`); 
        let isTurn:number =  this.mCampType == eCampType.Initiative ? 1 : -1;
        isTurn = !isReversal ? isTurn : isTurn * -1;
        this.mPlayer.SetPosition( isTurn * 300 ,0);
        this.mPlayer.SetFilp(isTurn == 1);
    }
} 