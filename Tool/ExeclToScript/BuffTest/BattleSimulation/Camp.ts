import { eAttrType } from "../AttrControl/Define/AttrDefine";
import { AttrCell } from "../AttrControl/AttrCell";
import { BuffProxy } from "../Buff/BuffProxy"; 
import { BattleSimulation } from "./BattleSimulation";
import { eCampType } from "./Define/BattleDefine";
import { Player } from "./Player";
//玩家阵营
export class Camp{ 
    private mBattleSimulation:BattleSimulation;
    private mCampType:eCampType;
    private mMainPlayer:Player;//阵营主角
    private mPlayerArray:Array<Player> = new Array<Player>();//阵营玩家 
    private mBuffControlID:number;//每个阵营维护一个Buff

    private mAttrCell:AttrCell;//阵营属性信息 

    public constructor(battleSimulation:BattleSimulation,campType:eCampType,name:string){
        this.mBattleSimulation = battleSimulation;
        this.mCampType = campType;
        this.mAttrCell = new AttrCell(this.mCampType);
        this.mBuffControlID = BuffProxy.Ins.GenBuffControl(campType,this.mAttrCell);
        this.InsertPlayer(name); 
    }

    public get CampType():eCampType{
        return this.mCampType;
    }
 
    public InsertPlayer(name:string):void{
        this.mMainPlayer = new Player(this,name);
        this.mPlayerArray.push(this.mMainPlayer)
    }
    

    public get MainPlayer():Player{
        return this.mMainPlayer;
    }
 
    public GetPlayerArray():Array<Player>{
        return this.mPlayerArray;
    }

    public GetAttrByType(type:eAttrType){
        return this.mAttrCell.GetAttr(type);
    }
    
    public SetAttrByType(type:eAttrType,value:number){
        return this.mAttrCell.SetAttr(type,value);
    } 
    //获取到敌对阵营
    public get EnemyCamp():Camp{ 
        return this.mBattleSimulation.GetPlayerCampInfo(this.mCampType == eCampType.Initiative?eCampType.Passivity:eCampType.Initiative);
    } 
    //获取到阵营关联的Buff控制器
    public get BuffControlID():number{
        return this.mBuffControlID;
    }
    //获取到玩家所关联的属性对象
    public get AttrObj():AttrCell{
        return this.mAttrCell;
    }
};
