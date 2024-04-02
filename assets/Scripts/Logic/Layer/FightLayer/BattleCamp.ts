import { Color, Node, Tween, Vec2, Vec3, sp, tween } from "cc";
import { SpineMediator } from "../../Proxy/SkeletonProxy/Const/SpineMediator";
import { _Facade, _G } from "../../../Global";
import { SkeletonProxy } from "../../Proxy/SkeletonProxy/SkeletonProxy";  
import { FightAttrScrollView } from "./FightAttrScrollView";
import { eCampType } from "../../Proxy/FightProxy/Define/CampDefine";
import { PoolProxy } from "../../Proxy/PoolProxy/PoolProxy";
import { ePoolDefine } from "../../Proxy/PoolProxy/PoolDefine";
import { GetTextMeshComp } from "../../../Util/Util";

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
        this.mNode = this.mHeroSpineMediator.GetNode();
    }

    public SetPosition(x:number,y:number):void{
        this.mHeroSpineMediator.GetNode().setPosition( x , y );
    }

    public SetFilp(isFilp:boolean):void{
        let scaleVec:Vec3 = this.mHeroSpineMediator.GetNode().getScale();
        this.mHeroSpineMediator.GetSp().node.setScale(scaleVec.x * (isFilp ? -1 : 1),scaleVec.y,scaleVec.z)
    }

    public get Node():Node{ 
        return this.mNode; 
    }

    public get SpineMediator():SpineMediator{
        return this.mHeroSpineMediator;
    }

    public Desctory():void{
        Tween.stopAllByTarget(this.mHeroSpineMediator.GetNode()); 
        _Facade.FindProxy(SkeletonProxy).RecycleSpineEffect(this.mHeroSpineMediator);
    }
}

export class BattleCamp{ 
    private mCampType:eCampType;//战斗拥有战斗类型
    
    private mNode:Node;//战斗主面板 
    private mAttrScrollView:FightAttrScrollView;//战斗属性列表信息
    private mPlayer:Player;

    public constructor(camp:eCampType,fightNode:Node,fightAttrScrollview:FightAttrScrollView){
        this.mCampType = camp;
        this.mNode = fightNode;
        this.mAttrScrollView = fightAttrScrollview;
        this.InsertPlayer("1001");
    }

    public GetPlayer():Player{
        return this.mPlayer;
    }
     
    public InsertPlayer(path:string):void{ 
        this.mPlayer = new Player(this.mNode,`spine_eff/${path}`); 
        let isTurn:number =  this.mCampType == eCampType.Initiative ? 1 : -1; 
        this.mPlayer.SetPosition( isTurn * 300 ,0);
        this.mPlayer.SetFilp(isTurn == 1);
    }
 
    //玩家的X轴移动
    public MovePlayer(posXOffset:number,handle:()=>void){
        let isTurn:number =  this.mCampType == eCampType.Initiative ? -1 : 1; 
        tween(this.mPlayer.Node) 
        .by(0.8,{position:new Vec3(posXOffset * isTurn,0,0)})
        .call(()=>{ 
            handle && handle() ; 
        }) 
        .start();//开始
    }

    //执行一次玩家的攻击
    public PlayerAttack(harm:number,enemyCamp:BattleCamp,handle:()=>void){ 
        this.mPlayer.SpineMediator.SetAction("attack")
        let durationTime:number = this.mPlayer.SpineMediator.GetSp().findAnimation("attack").duration;
        _G.TimeWheel.Set(durationTime * 0.6 * 1000,()=>{
            let node:Node = _Facade.FindProxy(PoolProxy).Get(ePoolDefine.FightOrangeLabel);
            node.parent = enemyCamp.GetPlayer().Node; 
            node.setPosition(0,120,0);
            GetTextMeshComp(node).fontSize = 30; 
            GetTextMeshComp(node).string = `${harm}`;
            tween(node)  
            .by(0.3,{position:new Vec3(0,150,0),},{easing: "expoOut"}) 
            .call(()=>{ 
                _Facade.FindProxy(PoolProxy).Put(ePoolDefine.FightOrangeLabel,node);
                handle && handle();
            }).start(); 
            
            tween(GetTextMeshComp(node))  
            .to(0.2,{color:new Color(255,255,255,0)})
            .start(); 
        }); 
        this.mPlayer.SpineMediator.GetSp().setCompleteListener(()=>{
            this.mPlayer.SpineMediator.SetAction("stand");
            this.mPlayer.SpineMediator.GetSp().setCompleteListener(undefined); 
        }); 
    }

    public Destory(){
        this.mPlayer.Desctory();
    }
} 