// import {_decorator,Node, find, Vec2, Prefab, instantiate, Label, UITransform, Vec3, EventTouch} from 'cc';
// import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
// import {_Facade, _G} from '../../../Global';    
// import { eNotice } from '../../../NotificationTable'; 
// import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy'; 
// import { PlayerBase } from '../../Proxy/PhysicsProxy/PhysicsRigidBody/PlayerBase';
// import { IJoystick, Joystick } from './Joystick';
// import { PhysicsProxy } from '../../Proxy/PhysicsProxy/PhysicsProxy'; 
// import { ShapeCompBase } from '../../Proxy/PhysicsProxy/PhysicsColliderComp/ShapeCompBase';
// import { PlayerBaseInfo } from './PlayerBaseInfo';
// import { eColliderCompType, eColliderDetectionBody, ePhysicsGoodsType, GPhysicsScalingFactor } from '../../Proxy/PhysicsProxy/Define/Physics';
// import Pathfinding from 'pathfinding';
// import { GetGridPosByPos, GetPosByGridPos } from '../../Proxy/PhysicsProxy/Tool/Util';
// import { NightmarePlayerBase } from '../../Proxy/PhysicsProxy/PhysicsRigidBody/NightmarePlayerBase';
// import { SkillInfo } from '../../Proxy/PhysicsProxy/Skill/SkillInfo';
// import { DetectionBodyCompBase } from '../../Proxy/PhysicsProxy/PhysicsColliderComp/DetectionBodyComp/DetectionBodyCompBase';
// const {ccclass,} = _decorator;   
// @ccclass('PhysicsLayer')  
// export class PhysicsLayer extends BaseLayer implements IJoystick{
//     private mJoystick:Joystick;//游戏的遥感组件   
//     public mPlayerBaseMap:Map<number,PlayerBaseInfo> = new Map<number,PlayerBaseInfo>();//获取到物理世界所对应的全部节点
//     //界面监听回调
//     protected RegisterExecuteHandle(executeMap:Map<eNotice ,LayerExecute> ){
//         //刷新属性更新
//         executeMap.set(eNotice.PlayerBaseAttrChange,this.PlayerBaseAttrChangeHandle.bind(this));   
//         //刷新单角色货币数据信息
//         executeMap.set(eNotice.RefreshCurrencyInfo,this.RefreshCurrencyInfoHandle.bind(this));    
//         //刚体角色被添加时
//         executeMap.set(eNotice.AddPhysicsRigidBody,this.AddPhysicsRigidBodyHandle.bind(this));
//         executeMap.set(eNotice.DelPhysicsRigidBody,this.DelPhysicsRigidBodyHandle.bind(this));
//         //添加物理刚体
//         executeMap.set(eNotice.AddPhysicsCollider,this.AddPhysicsColliderHandle.bind(this));
//         executeMap.set(eNotice.DelPhysicsCollider,this.DelPhysicsColliderHandle.bind(this));
//     }

//     protected InitLayer():void{
//         _Facade.FindProxy(PhysicsProxy).StartGame();//界面准备完毕后，开始游戏逻辑
//         this.Init();
//         this.mJoystick = new Joystick(this,find("TouchListen",this.node),find("MainJoystick",this.node),find("MainJoystick/Joystick",this.node),35);
//     }      
 
//     protected Init(){ 
//         let data:Pathfinding.Grid = _Facade.FindProxy(PhysicsProxy).PFGrid; 
//         for(let x = 0; x < data.width;x++){
//             for(let y = 0; y < data.height ;y++){
//                 let position = GetPosByGridPos(x,y,data.width,data.height); 
//                 let node:Node = instantiate(_Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/PhysicsLayer/Comp/BarrierShapeComp",Prefab));
//                 node.getComponent(UITransform).setContentSize(GPhysicsScalingFactor,GPhysicsScalingFactor);
//                 node.active = !data.isWalkableAt(x,y);;
//                 node.position = new Vec3(position.x * GPhysicsScalingFactor ,position.y * GPhysicsScalingFactor);//new Vec3( (x + 0.5) *GPhysicsScalingFactor - data.width / 2 * GPhysicsScalingFactor , (y + 0.5 )* GPhysicsScalingFactor - data.height / 2 * GPhysicsScalingFactor);
//                 find("Barrier",this.node).addChild(node);   
//             } 
//         }   
//     } 
    
//     protected UpdateBarrier(){
//         let data:Pathfinding.Grid = _Facade.FindProxy(PhysicsProxy).PFGrid; 
//         for(let x = 0; x < data.width;x++){
//             for(let y = 0; y < data.height ;y++)
//                 find("Barrier",this.node).children[x * data.width+ y].active = !data.isWalkableAt(x,y);
//         }   
//     }
 
//     //遥感被拉动时，会得到反馈
//     public JoystickSpeed(moveDir: Vec2, touchPercent: number): void {
//         _Facade.FindProxy(PhysicsProxy).OperationPlayer().MoveVelCollider.SetMoveDirection(moveDir.multiplyScalar(touchPercent));  
//     }   
       
//     private RefreshCurrencyInfoHandle(currencyObj:{rigidID:number,goalCount:number,tomatoCount:number}){ 
//     }   0
//     //当收到了物理世界更新消息后
//     private AddPhysicsColliderHandle(shapeCompBase:ShapeCompBase){
//         let playerBaseInfo:PlayerBaseInfo|undefined  = this.mPlayerBaseMap.get(shapeCompBase.Player.ID);//首先尝试找到数据管理信息
//         if(playerBaseInfo == undefined){
//             console.warn("尝试在一个不存在的PlayerBase上插入一个碰撞器？？？？？");
//             return;
//         }
//         playerBaseInfo.InsertCollider(shapeCompBase); 
//     } 
 
//     //当收到了物理世界更新消息后
//     private DelPhysicsColliderHandle(ShapeCompBase:ShapeCompBase){
//         let playerBaseInfo:PlayerBaseInfo|undefined  = this.mPlayerBaseMap.get(ShapeCompBase.Player.ID);//首先尝试找到数据管理信息
//         if(playerBaseInfo == undefined){
//             console.warn("尝试在一个不存在的PlayerBase上插入一个碰撞器？？？？？");
//             return;
//         }
//         playerBaseInfo.DelCollider(ShapeCompBase); 
//     }  
//     private UseSkillHandle(event: EventTouch,skillInfo:SkillInfo){
//         let detection:DetectionBodyCompBase = (skillInfo.PlayerBase as NightmarePlayerBase).GetColliderByType(eColliderCompType.Detection,eColliderDetectionBody.HeroDetection);
//         let playerBase:PlayerBase = detection.GetNearPlayerBase();
//         if(playerBase == undefined){
//             _Facade.Send(eNotice.TipsShow,"当前范围内没有敌人，无法发起攻击");
//             return;
//         }
//         skillInfo.UseSkill(playerBase);
//     }
//     //梦魇进入游戏时     
//     private NightmareEnterGame(nightmarePlayer:NightmarePlayerBase){
//         //let operationPrefab:Node = instantiate(_Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/PhysicsLayer/Comp/HeroHead",Prefab));
//         //find("EnemyList",this.node).addChild(operationPrefab); 
//         //let OperationLayoutNode:Node = find("OperationLayout",operationPrefab); //刷新一下操作Layout
//         //for(let cell of nightmarePlayer.SkillInfos){
//         //    let operationPrefab:Node = instantiate(_Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/PhysicsLayer/Comp/OperationCell",Prefab));
//         //    find("Label",operationPrefab).getComponent(Label).string = cell.SkillConfig.Name;
//         //    this.RegisterButtonEvent( operationPrefab,this.UseSkillHandle,this,cell);
//         //    OperationLayoutNode.addChild(operationPrefab);
//         //} 
//         ////this.mNightmareInfoMap.set(playerBase.ID,operationPrefab);  
//         //find("EnemyList",this.node).addChild(OperationLayoutNode);
//     } 
//     //当收到了物理世界更新消息后
//     private AddPhysicsRigidBodyHandle(playerBase:PlayerBase){    
//         this.mPlayerBaseMap.set(playerBase.ID,new PlayerBaseInfo(playerBase,find("BackGround",this.node),find("HpLayer",this.node))); 
//         //if(playerBase.Config.Type == ePhysicsGoodsType.Nightmare)
//         //    this.NightmareEnterGame(playerBase as NightmarePlayerBase);//一个梦魇进入了游戏
//     }
     
//     //当收到了物理世界更新消息后
//     private DelPhysicsRigidBodyHandle(playerBase:PlayerBase){
//         let playerBaseInfo:PlayerBaseInfo|undefined = this.mPlayerBaseMap.get(playerBase.ID);
//         if( playerBaseInfo == undefined){
//             console.log("是否正在试图多次的删除一个角色？？？"); 
//             return;
//         }
//         playerBaseInfo.Clear();
//         this.mPlayerBaseMap.delete(playerBase.ID);//直接对节点进行删除  
//     }
 
//     //每帧更新游戏状态时间戳
//     protected update(dt:number):void{  
//         _Facade.FindProxy(PhysicsProxy).Update(dt);  
//         for(let cell of this.mPlayerBaseMap)
//             cell[1].UpdateNodeInfo();
//        this.UpdateBarrier();
//     } 
// }    