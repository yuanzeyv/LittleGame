import {_decorator,Node, find, v2, EventTouch, Event, SystemEventType, SystemEvent, Camera, Vec3, Vec2, Collider} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global'; 
import { PlayerBase } from './Player/PlayerBase'; 
import { Cfg_PhysicsPlayer, IPhysicsPlayerStruct } from '../../../Config/Cfg_PhysicsPlayer';
import { eNotice } from '../../../NotificationTable';
import { PhysicsWrold } from './Physics/World';
import { PhysicsProxy } from '../../Proxy/PhysicsProxy/PhysicsProxy';
import { GPhysicsScalingFactor } from '../../Proxy/PhysicsProxy/Define/Physics';
import  Physics, { Shape } from '@dimforge/rapier2d-compat';
import { RigidBodies } from './Physics/RigidBodies';
const {ccclass,} = _decorator;
@ccclass('PhysicsLayer') 
export class PhysicsLayer extends BaseLayer {  
    private mActorMap:Map<number,PlayerBase> = new Map<number,PlayerBase>();//物理世界中的玩家对象
    private mWorld:PhysicsWrold;//这是一个物理游戏世界
    private mStartButton:Node;//开始游戏按钮
    InitNode() { 
        this.mStartButton = find("StartButton",this.node);
    } 

    public InitData():void{   
        this.node.on(SystemEvent.EventType.TOUCH_START,(eventTouch:EventTouch)=>{
            let touchiWorldPos:Vec3 = find("Canvas/Camera").getComponent(Camera).screenToWorld(new Vec3(eventTouch.getLocation().x,eventTouch.getLocation().y));//获取到点击的世界坐标
            let nowPos:Vec3 = this.node.worldPosition;//获取到当前节点的世界坐标
            let residuePos:Vec3 =  touchiWorldPos.subtract(nowPos).divide3f(GPhysicsScalingFactor,GPhysicsScalingFactor,GPhysicsScalingFactor);
            let ray:Physics.Ray = new Physics.Ray({x:residuePos.x,y:residuePos.y},{x:0,y:1})
            let aaa= this.mWorld.World.castRay(ray,3,true,);  
            if(aaa != undefined){ 
                let qqq = aaa.collider.radius();
                let shape:Shape = new Physics.Ball(qqq * (1 + 0.01));
                //判断当前碰撞了谁
                this.mWorld.World.intersectionsWithShape(aaa.collider.parent().translation(),0,shape,(collider:Physics.Collider)=>{
                    let actor:PlayerBase = this.mActorMap.get(collider.parent().handle);
                    let ackerActor:PlayerBase = this.mActorMap.get(aaa.collider.parent().handle);
                    console.log(`${ackerActor.Name}碰撞${actor.Name}`);    
                    ackerActor.DestorySelf();
                    return true;   
                },undefined,0x0001FFFF,aaa.collider,undefined);
            } 
        } ,this.node);     
        this.RegisterButtonEvent(this.mStartButton,this.StartButtonHandle,this);//节点信息初始 化
        this.mWorld = new PhysicsWrold(v2(0,-10),0.01666666);  
    }  
    
    public InitLayer() {       
        this.InitActorMap(); 
    }         
 
    //初始化所有角色信息内容 
    public InitActorMap(){ 
        for(let cell of _Facade.FindProxy(PhysicsProxy).GetPassConfig().MonsterArray){
            let config:IPhysicsPlayerStruct = Cfg_PhysicsPlayer.GetData(cell.ID);//获取到玩家的配置信息
            let retPlayerBase:PlayerBase = new PlayerBase(config,this.mWorld);//创建一个玩家
            retPlayerBase.SetPosition(cell.Pos.X,cell.Pos.Y);//设置刚体的初始位置
            this.node.addChild(retPlayerBase.Node);//添加当前节点到根结点 
            this.mActorMap.set(retPlayerBase.ID,retPlayerBase);//设置玩家信息监听 
        }
        this.StartButtonHandle();
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
} 
