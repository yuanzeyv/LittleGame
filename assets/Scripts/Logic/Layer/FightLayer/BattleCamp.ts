import { Color, Node, Tween, Vec2, Vec3, sp, tween } from "cc";
import { SpineMediator } from "../../Proxy/SkeletonProxy/Const/SpineMediator";
import { _Facade, _G } from "../../../Global";
import { SkeletonProxy } from "../../Proxy/SkeletonProxy/SkeletonProxy";  
import { FightAttrScrollView } from "./FightAttrScrollView";
import { eCampType } from "../../Proxy/FightProxy/Define/CampDefine";
import { PoolProxy } from "../../Proxy/PoolProxy/PoolProxy";
import { ePoolDefine } from "../../Proxy/PoolProxy/PoolDefine";
import { GetTextMeshComp } from "../../../Util/Util";
import { TextMeshLabel } from "../../../../../extensions/TextMesh Pro/assets/TextMesh";
import { eAttackType } from "../../Proxy/FightProxy/Define/RecordDefine";
import { eAttrType } from "../../Proxy/FightProxy/Define/AttrDefine";

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
    private mPlayer:Player;
    
    private mNode:Node;//战斗主面板 
    private mNameLabel:TextMeshLabel;//名称节点
    private mAttrScrollView:FightAttrScrollView;//战斗属性列表信息
    
    public constructor(camp:eCampType){
        this.mCampType = camp; 
    }
    //玩家在战斗的哪个层级
    public SetFightNode(fightNode:Node):void{ this.mNode = fightNode; } 
    //玩家的名字存放在哪个Label下
    public SetNameLabel(nameLabel:TextMeshLabel):void{ this.mNameLabel = nameLabel; } 
    public SetCampName(name:string):void{ this.mNameLabel.string = name; } //设置玩家名称
    //玩家的战斗属性面板
    public SetPlayerAttrView(fightAttrScrollview:FightAttrScrollView):void{ 
        this.mAttrScrollView = fightAttrScrollview; 
        this.mAttrScrollView.CampType = this.mCampType;
    } 
    
    //插入一个玩家
    public InsertPlayer(path:string):void{ 
        this.mPlayer = new Player(this.mNode,`spine_eff/${path}`); 
        let isTurn:number =  this.mCampType == eCampType.Initiative ? 1 : -1; 
        this.mPlayer.SetPosition( isTurn * 300 ,0);
        this.mPlayer.SetFilp(isTurn == 1);
    }
 
    //获取一个玩家
    public GetPlayer():Player{
        return this.mPlayer;
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
    public PlayerAttack(type:eAttackType,isCircle:boolean,isMiss:boolean,harm:number,enemyCamp:BattleCamp,handle:()=>void){ 
        this.mPlayer.SpineMediator.SetAction("attack")//首先设置玩家的攻击动作
        let durationTime:number = this.mPlayer.SpineMediator.GetSp().findAnimation("attack").duration;//获取到玩家播放攻击动作所需要的时间
        let poolInfo:{pool:ePoolDefine,str:string}|undefined = undefined;//默认使用普通攻击
        //设置己方的飘字
        if( type == eAttackType.Normal && isCircle)//暴击
            poolInfo = {pool:ePoolDefine.FightRedLabel,str:"暴击"};
        else if(type == eAttackType.ContinueAttack)//连击
            poolInfo = {pool:ePoolDefine.FightGreenGrassLabel,str:"连击"};
        else if(type == eAttackType.AttackBack)//反击 
            poolInfo = {pool:ePoolDefine.FightYellowLabel,str:"反击"};  
        if(poolInfo){ 
            let node:Node = _Facade.FindProxy(PoolProxy).Get(poolInfo.pool,28,poolInfo.str);//在指定的池子进行获取对象
            node.parent = this.GetPlayer().Node; 
            node.setPosition(0,120,0); 
            tween(node).by(0.5,{position:new Vec3(0,100,0),},{easing: "expoOut"}).start();
            tween(GetTextMeshComp(node)) 
            .to(0.5,{color:new Color(255,255,255,0)})
            .delay(0.05)
            .call(()=> _Facade.FindProxy(PoolProxy).Put(poolInfo.pool,node))
            .start();
        }    

         
        _G.TimeWheel.Set(durationTime * 0.6 * 1000,()=>{//在攻击动作播放到百分之六十的时候，进行伤害飘字
            let poolInfo:{pool:ePoolDefine,str:string}|undefined = undefined;//默认使用普通攻击
            //设置地方飘字  
            poolInfo = isMiss?{pool:ePoolDefine.FightWhiteLabel,str:"闪避"}:{pool:ePoolDefine.FightOrangeLabel,str:`${harm}`};
            let node:Node = _Facade.FindProxy(PoolProxy).Get(poolInfo.pool,24,poolInfo.str);
            node.parent = enemyCamp.GetPlayer().Node; 
            node.setPosition(0,120,0); 
            tween(node).by(0.5,{position:new Vec3(0,100,0),},{easing: "expoOut"}).start();
            tween(GetTextMeshComp(node))
            .to(0.5,{color:new Color(255,255,255,0)})   
            .delay(0.05)
            .call(()=>{    
                _Facade.FindProxy(PoolProxy).Put(poolInfo.pool,node);
                handle && handle(); 
            }).start();
        });  
            
        this.mPlayer.SpineMediator.GetSp().setCompleteListener(()=>{
            this.mPlayer.SpineMediator.SetAction("stand");
            this.mPlayer.SpineMediator.GetSp().setCompleteListener(undefined); 
        }); 
    }

    //执行一次玩家的攻击
    public PlayerAttackSuckBlood(suckBlood:number,handle:()=>void){ 
        this.mPlayer.SpineMediator.SetAction("xixue");
        this.mPlayer.SpineMediator.GetSp().setCompleteListener(()=>{
            this.mPlayer.SpineMediator.SetAction("stand"); 
            this.mPlayer.SpineMediator.GetSp().setCompleteListener(undefined); 
        }); 
        
        let node:Node = _Facade.FindProxy(PoolProxy).Get(ePoolDefine.FightGreenLabel,24,`吸血:${suckBlood}`);
        node.parent =  this.mPlayer.Node; 
        node.setPosition(0,120,0); 
        tween(node).by(0.5,{position:new Vec3(0,100,0),},{easing: "expoOut"}) .call(()=>_Facade.FindProxy(PoolProxy).Put(ePoolDefine.FightGreenLabel,node)).start(); 
        tween(node).delay(0.3) .call(()=>handle && handle()).start(); 
        tween(GetTextMeshComp(node)).to(0.5,{color:new Color(255,255,255,125)}).start(); 
    }    

    public Destory(){
        this.mPlayer.Desctory(); 
    }

    //更新一个玩家的属性
    public UpdateListViewAttr(type:eAttrType):void{
        this.mAttrScrollView.UpdateAttrByAttrType(type);
    }
} 