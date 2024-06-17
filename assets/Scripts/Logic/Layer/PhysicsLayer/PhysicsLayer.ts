import {_decorator,Node, find, v2} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global'; 
import { PlayerBase } from './Player/PlayerBase'; 
import { eFinalAttrType } from '../../Proxy/PhysicsProxy/Define/AttrType';
import { Cfg_PassConfig, IPassConfigStruct } from '../../../Config/Cfg_PassConfig';
import { Cfg_PhysicsPlayer, IPhysicsPlayerStruct } from '../../../Config/Cfg_PhysicsPlayer';
import { eNotice } from '../../../NotificationTable';
import { PhysicsWrold } from './Physics/World';
import { PhysicsProxy } from '../../Proxy/PhysicsProxy/PhysicsProxy';
const {ccclass,} = _decorator;
@ccclass('PhysicsLayer') 
export class PhysicsLayer extends BaseLayer {  
    private mWorld:PhysicsWrold;
    private mActorMap:Map<number,PlayerBase> = new Map<number,PlayerBase>();//所有的游戏角色信息
    //节点区域
    private mStartButton:Node;//开始游戏按钮
    InitNode() { 
        this.mStartButton = find("StartButton",this.node);
    } 

    protected RegisterExecuteHandle(executeMap:Map<eNotice ,LayerExecute> ){
        executeMap.set(eNotice.PlayerDie,this.PlayerDie.bind(this));
    }

    public InitData():void{   
        this.RegisterButtonEvent(this.mStartButton,this.StartButtonHandle,this);//节点信息初始化
        this.mWorld = new PhysicsWrold(v2(0,-9.8),0.01666666); 
    }
 
    public InitLayer() {  
        this.InitActorMap(); 
    }         

    //初始化所有角色信息内容  
    public InitActorMap(){
        for(let cell of _Facade.FindProxy(PhysicsProxy).GetPassConfig().MonsterArray)
            this.CreatePlayer(cell.ID,{x:cell.Pos.X,y:cell.Pos.Y});
        this.StartButtonHandle();
    }

    //创建一个角色
    public CreatePlayer(tableID:number,pos:{x:number,y:number}):PlayerBase{
        let config:IPhysicsPlayerStruct = Cfg_PhysicsPlayer.GetData(tableID);//获取到玩家配置表信息
        let retPlayerBase:PlayerBase = new PlayerBase(config,this.mWorld.CreateRigidBody(config.RigidType));
        retPlayerBase.SetPosition(pos.x,pos.y);//设置刚体角色的位置信息
        this.node.addChild(retPlayerBase.Node); 
        this.mActorMap.set(retPlayerBase.ID,retPlayerBase);//设置玩家信息监听
        return retPlayerBase;   
    }
   
    protected update(dt: number): void { 
        this.mWorld.Update(dt);//更新物理世界每帧信息
        for(let cell of this.mActorMap.values())//更新所有节点的坐标信息
            cell.UpdateNode(); 
    }
    
    public CloseLayer(): void {    
    }   

    private StartButtonHandle():void{
        //for(let cell of this.mActorMap){
        //    let playerBase:PlayerBase = cell[1];
        //    playerBase.SetFinalAttr(eFinalAttrType.HP,playerBase.GetFinalAttr(eFinalAttrType.MaxHP));
        //    console.log(`${playerBase.Name} 的血量为 ${playerBase.GetFinalAttr(eFinalAttrType.HP)}`);
        //}
    } 
    
    //玩家死亡时
    private PlayerDie(signaleID:number):void{
        let playerBase:PlayerBase = this.mActorMap.get(signaleID);
        playerBase.DestorySelf();
        this.mActorMap.delete(signaleID);
    }
} 