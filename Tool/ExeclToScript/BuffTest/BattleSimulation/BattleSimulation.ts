import { BattleCommunicant, BattleCommunicantProxy } from "../Communicant/BattleCommunicant";
import { eNotifyType } from "../Communicant/Define/Define";
import { Camp } from "./Camp";
import { eCampType } from "./Define/BattleDefine";
import { Player } from "./Player";
//一个战斗模拟对象
export class BattleSimulation{ 
    private mBattleCommunicantID:number;//战斗通知模块
    private mMaxRound:number = 0;//最大回合数
    private mPlayerCampArray:Array<Camp> = new Array<Camp>();//当前的所有玩家阵营 
    public get MaxRound():number{ return this.mMaxRound; } 
    public set MaxRound(round:number){ this.mMaxRound = round; }
    //通过属性设置战斗角色的属性
    public InitCampInfo(type:eCampType,name:string):void{
        this.mPlayerCampArray[type] = new Camp(this.BattleCommunicantID,this,type,name);
    }
    
    //获取到玩家的阵营信息
    public GetPlayerCampInfo(type:eCampType):Camp{ 
        return this.mPlayerCampArray[type];
    }
    
    //获取到玩家的攻击顺序
    public GetAllPlayer():Array<Player>{
        let playerArray:Array<Player> = new Array<Player>();
        for(let camp of this.mPlayerCampArray){//首先生成当前的攻击顺序
            for(let player of camp.GetPlayerArray())
                playerArray.push(player)
        }
        return playerArray;
    } 
    
    //设置通讯ID
    public set BattleCommunicantID(id:number){
        this.mBattleCommunicantID = id;
    }
    public get BattleCommunicantID():number{
        return this.mBattleCommunicantID;
    }
    

};