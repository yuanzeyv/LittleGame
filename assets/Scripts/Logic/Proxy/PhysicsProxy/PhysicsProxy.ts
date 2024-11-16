// import { PhysicsWrold } from "./Physics/World"; 
// import { WorldVectorBase } from "./PhysicsRigidBody/WorldPlayerBaseFactory/WorldVectorBase";  
// import { PlayerBase } from "./PhysicsRigidBody/PlayerBase"; 
// import { GameStatusBase, eGameStatus } from "./GameStatus/GameStatusBase";
// import { GameStatusFactroy } from "./GameStatus/GameStatusFactroy";
// import { HeroPlayerBase } from "./PhysicsRigidBody/HeroPlayerBaseFactory/HeroPlayerBase";
// import { EventNotify } from "../../../event/EventNotify";   
// import { Hyperlink } from "../../../utils/Hyperlink";  
// import { RigidBodies } from "./Physics/RigidBodies";
// import { RoomVectorBase } from "./PhysicsRigidBody/RoomPlayerBaseFactory/RoomVectorBase";
// import { RoomDoorVectorBase } from "./PhysicsRigidBody/BuildingPlayerBaseFactory/RoomDoorVectorBase"; 
// import { XianTuDataMgr } from "../../DataMgrReg";
// import { BuildingPlayerBase } from "./PhysicsRigidBody/BuildingPlayerBaseFactory/BuildingPlayerBase";
// import { PF } from "../../../../mainSrc/Physics";
// import cfg_NightmareNightmarePassCfgData from "../../../cfg/data/cfg_NightmareNightmarePassCfgData";
// import { cfg } from "../../../cfg/ConfigBaseCfgInfo";
// import { GlobalMgr } from "../../../controller/GlobalMgr";
// import cfg_NightmareBuildConfigCfgData from "../../../cfg/data/cfg_NightmareBuildConfigCfgData";
// import cfg_NightmareMonsterCfgData from "../../../cfg/data/cfg_NightmareMonsterCfgData";
// import { MainPlayerHeroBase } from "./PhysicsRigidBody/HeroPlayerBaseFactory/MainPlayerHeroBase";
// import { ePhysicsGoodsType, eRigidBuildType, eRigidHeroType, eRigidRangeDetectionType } from "./Define/PhysicsConst";
// import { RoomBuildingVectroBase } from "./PhysicsRigidBody/BuildingVectorPlayerBaseFactory/RoomBuildingVectroBase";
// import { PlayerBaseAbstractFactroy } from "./PhysicsRigidBody/PlayerBaseAbstractFactroy";
// import { GameCameraPlayerBase } from "./PhysicsRigidBody/DetectPlayerBaseFactory/GameCameraPlayerBase";
// import cfg_ShapeHeadIdCfgData from "../../../cfg/data/cfg_ShapeHeadIdCfgData";
// import { NightmarePlayerBase } from "./PhysicsRigidBody/NightmarePlayerBaseFactory/NightmarePlayerBase";
// import cfg_NightmarePhysicsPlayerCfgData from "../../../cfg/data/cfg_NightmarePhysicsPlayerCfgData";
// import { IVectorType } from "./Define/GameMapType";
// import { RoomBedVectorBase } from "./PhysicsRigidBody/BuildingPlayerBaseFactory/RoomBedVectorBase";
 
// enum eCondtionType{ 
//     RoomLevelGreaterThan = 1,//房门等级大于 
//     RoomLevelLessThan = 2,//房门等级小于
//     BedLevelGreaterThan = 3,//床的等级大于
//     BedLevelLessThan = 4,//床的等级小于
//     ResourceGreaterThan = 5,//玩家的货币大于
//     ResourceLessThan = 6,//玩家的货币小于 
// };  

// //游戏中的背包代理 
// export class PhysicsProxy{  
//     //条件信息
//     private mConditionHandleArr:Array<(playerID:number,condtionParam:number)=>boolean> = new Array<(playerID:number,condtionParam:number)=>boolean>();
//     //建筑等级表
//     private mCfgBuildingLevelMap:Map<number,Map<number,cfg.NightmareBuildConfigCfgInfo>> = new Map<number,Map<number,cfg.NightmareBuildConfigCfgInfo>>();
//     //梦魇等级表
//     private mCfgNightmareLevelMap:Map<number,Map<number, cfg.NightmareMonsterCfgInfo>> = new Map<number,Map<number, cfg.NightmareMonsterCfgInfo>>();
//     //当前的关卡表
//     private mNowPassID:number;//当前游戏的关卡ID（用以对照关卡表）
//     //唯一的操作ID
//     private mOperationID:number = 0;//唯一的操作ID分配    
//     //控制游戏的整场逻辑 
//     private mGameStatusObj:GameStatusBase;
//     //AI角色寻路网格
//     private mGridInfo:PF.Grid;//整场游戏的网格世界信息用于寻路(障碍物的宽高必须按指定要求，为单数，不可为小数。 放置的位置必须为整数，不可为小数) 
//     //当前的游戏运行时长
//     private mRunningTime:number = 0;

//     //游戏中的所有的玩家数组列表信息(
//     //Status:
//     //1:正常状态
//     //0:死亡状态
//     private mPlayerArray:Map<number,{RigidID:number,Status:number,HeadUrl:number,IsSelf:boolean}> = new Map<number,{RigidID:number,Status:number,HeadUrl:number,IsSelf:boolean}>;
//     //游戏中的所有的怪物数组列表信息
//     private mMonsterStatus:{RigidID:number,Status:number,HeadUrl:number,Level:number};
    
//     //游戏的物理世界，将不再依托于界面
//     private mWorld:PhysicsWrold;//物理世界中，虚拟出来的世界
//     private mWorldBase:WorldVectorBase;//从物理世界中，抽象出来的刚体世界
//     public get WorldBase():WorldVectorBase { return this.mWorldBase; }  
//     public get PFGrid():PF.Grid{ return this.mGridInfo }
//     public set PFGrid(pfGrid:PF.Grid){ this.mGridInfo = pfGrid; } 
    
//     public get PFGridWidth():number { return this.mGridInfo.width; }
//     public get PFGridHeight():number { return this.mGridInfo.height; } 
//     //游戏的钩爪函数
//     constructor(passID:number){
//         this.mNowPassID = passID;
//         this.InitConditionMap();
//         this.InitBuildingMap();//初始化配置信息
//             this.InitNightmareMap();//初始化梦魇配置信息
//     }
//     //获取到当前的游戏帧率，每帧所需要的时间
//     public get FrameTime():number{
//         return this.mWorld.World.timestep;
//     }
//     //获取到当前关卡的通关配置信息
//     public GetNowPassInfo():cfg.NightmareNightmarePassCfgInfo{
//         return cfg_NightmareNightmarePassCfgData.getInfo(this.mNowPassID);
//     } 
 
//     //初始化建筑配表信息
//     public InitBuildingMap():void{ 
//         for(let cell of cfg_NightmareBuildConfigCfgData.getAllList()){
//             let buildConfigMap:Map<number,cfg.NightmareBuildConfigCfgInfo>|undefined = this.mCfgBuildingLevelMap.get(cell.rigidID);
//             if(buildConfigMap == undefined){
//                 buildConfigMap = new Map<number,cfg.NightmareBuildConfigCfgInfo>();
//                 this.mCfgBuildingLevelMap.set(cell.rigidID,buildConfigMap);
//             }  
//             buildConfigMap.set(cell.level,cell);
//         } 
//     }
    
//     //初始化梦魇配置信息
//     public InitNightmareMap():void{
//         for(let cell of cfg_NightmareMonsterCfgData.getAllList()){
//             let nightmareConfig:Map<number, cfg.NightmareMonsterCfgInfo>|undefined = this.mCfgNightmareLevelMap.get(cell.monsterGroup);
//             if(nightmareConfig == undefined){
//                 nightmareConfig = new Map<number, cfg.NightmareMonsterCfgInfo>();
//                 this.mCfgNightmareLevelMap.set(cell.monsterGroup,nightmareConfig);
//             }
//             nightmareConfig.set(cell.level,cell);
//         }
//     }
    
//     //获取到建筑的信息，通过等级
//     public GetBuilingConfigByLevel(type:number,level:number):cfg.NightmareBuildConfigCfgInfo|undefined{
//         let buildConfigMap:Map<number,cfg.NightmareBuildConfigCfgInfo>|undefined = this.mCfgBuildingLevelMap.get(type);
//         if(buildConfigMap == undefined)
//             return undefined;
//         return buildConfigMap.get(level);
//     }

//     //获取到建筑的信息，通过等级
//     public GetNightmareConfigByLevel(type:number,level:number): cfg.NightmareMonsterCfgInfo|undefined{
//         let nightmareConfigMap:Map<number, cfg.NightmareMonsterCfgInfo>|undefined = this.mCfgNightmareLevelMap.get(type);
//         if(nightmareConfigMap == undefined)
//             return undefined; 
//         return nightmareConfigMap.get(level);
//     }

    
//     //生成一个操作ID
//     public GenOperationID():number{ return this.mOperationID++; }
//     //初始化刚体地图
//     public InitPhysicsMapInfo(TestWorld:IVectorType){
//         this.mWorld = new PhysicsWrold(new cc.Vec2(0,0),1/45);//创建一个真实物理世界
//         this.mWorldBase = this.InitGameBase(TestWorld,{x:0,y:0},undefined) as WorldVectorBase;//初始化抽象物理世界
//     }

//     public InsterPhysicsPlayerInfo(physicsCofnig: cfg.NightmarePhysicsPlayerCfgInfo ,pos:{x:number,y:number},isSelf:boolean,HeadUrl:number,Extra?:any){
//         let playerBase = this.CreatePlayerBase(physicsCofnig,pos,this.mWorldBase,Extra);
//         if(physicsCofnig.type == ePhysicsGoodsType.Nightmare){ 
//             this.mMonsterStatus = {RigidID:playerBase.ID,Status:1,HeadUrl:HeadUrl,Level:(playerBase as NightmarePlayerBase).GetLevel()};
//             TitanCCC.EventMgr.trigger(EventNotify.MonsterEnterGame,playerBase.ID); 
//         }else{ 
//             this.mPlayerArray.set(playerBase.ID,{RigidID:playerBase.ID,Status:1,HeadUrl:HeadUrl,IsSelf:isSelf});
//             TitanCCC.EventMgr.trigger(EventNotify.GamePlayerEnterGame,playerBase.ID);//当一个玩家进入了游戏的时候
//         }
//     }

//     //界面完全准备好后，就可以调用开始游戏，进行加载完整的物理世界数据了
//     public StartGame(){
//         for(let cell of this.mWorld.GetRigidBodyMap())//更新所有节点的坐标
//             (cell[1].RelevanceObj as PlayerBase).PhysicsWorldInitFinish();  
//         this.ChangeGameStatus(eGameStatus.Wait);//游戏初始数据初始化完毕，进入Wait状态  
//     }

//     //创建一个物理玩家 
//     public CreatePlayerBase(config:cfg.NightmarePhysicsPlayerCfgInfo,pos:{x:number,y:number},parent:PlayerBase|undefined,customData?:any):PlayerBase{
//         let retPlayerBase:PlayerBase = PlayerBaseAbstractFactroy.Inst.GeneratePlayerBase(config,this.mWorld,customData);//首先通过自定义参数创建一个玩家出来
//         retPlayerBase.InitInfo();//初始化基础信息 
//         retPlayerBase.SetPosition(pos.x,pos.y);//设置刚体的位置信息  
//         TitanCCC.EventMgr.trigger(EventNotify.AddPhysicsRigidBody,retPlayerBase);//优先创建一个PlayerBase
//         retPlayerBase.InitColliders();//初始化基础信息
//         if(parent != undefined)   
//             parent.InsertPlayerBase(retPlayerBase);//父节点加入子PlayerBase 
//         retPlayerBase.InitComplete();//完成添加 
//         return retPlayerBase; 
//     }   
  
//     //初始化游戏的物理世界
//     private InitGameBase(vector:IVectorType,offset:{x:number,y:number},grandfather:PlayerBase|undefined):PlayerBase{
//         let config: cfg.NightmarePhysicsPlayerCfgInfo = cfg_NightmarePhysicsPlayerCfgData.getInfo(vector.Key);//获取到物理世界的玩家信息
//         let offsetPos:cc.Vec2 = new cc.Vec2(offset.x + vector.Pos.x,offset.y + vector.Pos.y);
//         let father = this.CreatePlayerBase(config,offsetPos,grandfather,vector.CustomData);//创建一个玩家信息
//         if(!config.isVector || !vector.Child) return;//非容器类型不可以添加子建筑
//         for(let index in vector.Child){
//             let child = vector.Child[index];
//             this.InitGameBase(child,offsetPos,father); 
//         }
//         return father;  
//     }   

//     //尝试改变游戏进程状态
//     public ChangeGameStatus(gameStatus:eGameStatus,param:any|undefined = undefined){
//         this.mGameStatusObj && this.mGameStatusObj.OnExit();//退出之前的状态
//         this.mGameStatusObj = GameStatusFactroy.Ins.GetGameStatus(gameStatus)!;//初始化游戏状态状态机
//         this.mGameStatusObj.OnEnter(param);//进入游戏
//     }  

//     //尝试生成一个建筑
//     public GeneralBuliding(heroPlayerID:number,buildVectorID:number,buildShopCell:cfg.NightmareBuildingShopCfgInfo,isShowTips:boolean =false):boolean{
//         //开始判断条件信息 
//         if(!XianTuDataMgr.PhysicsProxy.ConditionIsReach(heroPlayerID,GlobalMgr.ParseArray(buildShopCell.condition,"|")))
//             return; 
//         //获取到玩家所在的房间
//         let heroPlayerBase:HeroPlayerBase = XianTuDataMgr.PhysicsProxy.GetPhysicsRigid(heroPlayerID) as HeroPlayerBase;//通过参数获取到建筑的
//         let rommPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();//获取到玩家所在的房间
//         if(!XianTuDataMgr.PhysicsProxy.ResourceIsReach(heroPlayerID,GlobalMgr.ParseKeyValue(buildShopCell.cost,"_","|"))){
//             isShowTips && Hyperlink.showTipsByLanId("NightmareResourceNotEnough");
//             return;  
//         }
//         //消耗对应的道具资源 
//         for(let cell of GlobalMgr.ParseKeyValue(buildShopCell.cost,"_","|")){
//             if(cell.key == 1) 
//                 rommPlayerBase.AddGoldCount(cell.value * -1);
//             else if(cell.key == 2)
//                 rommPlayerBase.AddTomatoCount(cell.value * -1); 
//         }

//         let BuildVectorBase:RoomBuildingVectroBase = this.mWorld.GetRigidBody(buildVectorID).RelevanceObj as RoomBuildingVectroBase;
//         if(BuildVectorBase.GetPlayerArrByType(ePhysicsGoodsType.Build).length != 0){
//             isShowTips && Hyperlink.showTipsByLanId("NightmareEarlyGenBuild");
//             return false;  
//         }  
//         let buildConfig:cfg.NightmareBuildConfigCfgInfo = cfg_NightmareBuildConfigCfgData.getInfo(buildShopCell.buildID);//获取到建筑配置信息 
//         let config:cfg.NightmarePhysicsPlayerCfgInfo = cfg_NightmarePhysicsPlayerCfgData.getInfo(buildConfig.genBuilding);//获取到玩家的配置信息
//         this.CreatePlayerBase(config,BuildVectorBase.RigidBody.Position,BuildVectorBase,buildConfig.key);//创建一个角色
//         return true; 
//     }  

//     public CanLevelUpgradeBuild(buildVector:RoomBuildingVectroBase,isShowTips:boolean = false):boolean{
//         let buildingPlayerBase:BuildingPlayerBase|undefined  = buildVector.GetBuildingBase() as BuildingPlayerBase; 
//         if( buildingPlayerBase == undefined)
//             return false;
//         let nowBuildConfig = buildingPlayerBase.BuildingConfig;//获取到当前的建筑配置信息
//         if(XianTuDataMgr.PhysicsProxy.GetBuilingConfigByLevel(nowBuildConfig.rigidID,nowBuildConfig.level + 1) == undefined){//已经满级了
//             isShowTips && Hyperlink.showTipsByLanId("NightmareLevelFull");
//             return false;
//         }
//         let roomVectorBase:RoomVectorBase = (buildingPlayerBase.Parent.Parent as RoomVectorBase);
//         let roomBedBase:RoomBedVectorBase|undefined = roomVectorBase.RoomBedBase;
//         if( roomBedBase == undefined || !roomBedBase.IsSleep() )
//             return false; 
//         let sleepPlayerID:number = roomBedBase.SleepPlayerID(); 
//         if(!XianTuDataMgr.PhysicsProxy.ConditionIsReach(sleepPlayerID,GlobalMgr.ParseArray(nowBuildConfig.upLevelCondition,"|"))){
//             isShowTips && Hyperlink.showTipsByLanId("NightmareLevelUpCondtionNotEnough");   
//             return false;
//         }
//         if(!XianTuDataMgr.PhysicsProxy.ResourceIsReach(sleepPlayerID,GlobalMgr.ParseKeyValue(nowBuildConfig.upLevelCost,"_","|"))){
//             isShowTips && Hyperlink.showTipsByLanId("NightmareResourceNotEnough");   
//             return false;
//         }
//         return true; 
//     } 
    
//     //升级场上的一个建筑物
//     public UpgradeBuilding(buildVectorID:number):boolean{
//         let buildVector:RoomBuildingVectroBase = XianTuDataMgr.PhysicsProxy.GetPhysicsRigid(buildVectorID) as RoomBuildingVectroBase;//通过参数获取到建筑的
//         if( buildVector == undefined || !this.CanLevelUpgradeBuild(buildVector))
//             return false;
//         let buildingPlayerBase:BuildingPlayerBase|undefined  = buildVector.GetBuildingBase() as BuildingPlayerBase; 
//         if(buildingPlayerBase == undefined )
//             return false;
//         let roomVectorBase:RoomVectorBase = (buildingPlayerBase.Parent.Parent as RoomVectorBase);
//         let nowBuildConfig = buildingPlayerBase.BuildingConfig;//获取到当前的建筑配置信息
//         //消耗对应的道具资源  
//         for(let cell of GlobalMgr.ParseKeyValue(nowBuildConfig.upLevelCost,"_","|")){
//             if(cell.key == 1)
//                 roomVectorBase.AddGoldCount(cell.value * -1); 
//             else if(cell.key == 2)
//                 roomVectorBase.AddTomatoCount(cell.value * -1);
//         } 
//         this.CameraVisibleNotifyUpgrade(buildingPlayerBase.ID);
//         buildingPlayerBase.UpGrade();
//     }

//     public CameraVisibleNotifyUpgrade(rigidID:number){
//         //如果建筑物位于视野范围内的话，向外部推送建筑升级通知
//         let cameraPlayer:GameCameraPlayerBase = this.CameraPlayer();
//         if(cameraPlayer == undefined || !cameraPlayer.DetectionComp.RigidBodyIsView(rigidID))        
//             return;
//         TitanCCC.EventMgr.trigger(EventNotify.BuildLevelUp,rigidID);
//     } 
//     public CameraVisibleNotifyDestory(rigidID:number){
//         //如果建筑物位于视野范围内的话，向外部推送建筑销毁通知
//         let cameraPlayer:GameCameraPlayerBase = this.CameraPlayer();
//         if(cameraPlayer == undefined || !cameraPlayer.DetectionComp.RigidBodyIsView(rigidID))        
//             return;
//         TitanCCC.EventMgr.trigger(EventNotify.BuildDestory,rigidID);
//     }

//     public DestroyBuilding(buildVectorID:number):boolean{
//         //首先获取到当前的玩家信息
//         let buildVector:RoomBuildingVectroBase = XianTuDataMgr.PhysicsProxy.GetPhysicsRigid(buildVectorID) as RoomBuildingVectroBase;//通过参数获取到建筑的
//         if(buildVector == undefined)
//             return false;   
//         //首先尝试获取到建筑的对象信息
//         let buildingPlayerBase:BuildingPlayerBase|undefined = buildVector.GetBuildingBase() as BuildingPlayerBase;//获取到建筑的信息
//         if(buildingPlayerBase == undefined)//没有找到当前的建筑信息，说明当前没有生成过建筑
//             return false;
//         let nowBuildConfig = buildingPlayerBase.BuildingConfig;//获取到当前的建筑配置信息
//         let roomVectorBase:RoomVectorBase = (buildingPlayerBase.Parent.Parent as RoomVectorBase);//获取到房间信息
//         for(let cell of GlobalMgr.ParseKeyValue(nowBuildConfig.destoryAward,"_","|")){
//             if(cell.key == 1) 
//                 roomVectorBase.AddGoldCount(cell.value);
//             else if(cell.key == 2)
//                 roomVectorBase.AddTomatoCount(cell.value); 
//         }   
//         this.CameraVisibleNotifyDestory(buildingPlayerBase.ID);
//         this.mWorld.ExecuteDestoryByRigidID(buildingPlayerBase.ID);
//         return true;
//     } 

  
//     //物理世界更新函数 
//     public Update(dt:number){
//         this.mWorld.Update(dt); 
//         this.mGameStatusObj.Update(dt); 
//         this.mRunningTime += dt;
//     }  
//     //获取到当前的运行进度
//     public GetRunningPercent(limitTime:number):number{
//         return ((this.mRunningTime % limitTime) / limitTime) * 100;//获取到当前针对限制事件的百分比进度
//     }
//     //获取到循环运行时间
//     public GetPingpongRunningPercent(limitTime:number):number{
//         let residueTime:number = (this.mRunningTime % limitTime * 2);
//         return (residueTime <= limitTime ? residueTime : limitTime * 2 -residueTime) / limitTime ;
//     }  

//     //获取到物理世界某一个刚体数据信息 
//     public GetPhysicsRigid(rigidBoideID:number):PlayerBase | undefined{
//         let rigidBodies:RigidBodies =  this.mWorld.GetRigidBody(rigidBoideID);
//         if(rigidBodies)
//             return rigidBodies.RelevanceObj as PlayerBase;
//         return undefined; 
//     }     

//     public OperationPlayer():MainPlayerHeroBase{
//         return this.WorldBase.GetPlayerArrByType(ePhysicsGoodsType.Hero,eRigidHeroType.Hero)[0] as MainPlayerHeroBase;
//     }

//     //游戏中摄像机玩家
//     public CameraPlayer():GameCameraPlayerBase{
//         return this.WorldBase.GetPlayerArrByType(ePhysicsGoodsType.RangeDetection,eRigidRangeDetectionType.Camera)[0] as GameCameraPlayerBase;
//     } 

//     //尝试对清理游戏世界
//     public FreePhyscicsWorld(){  
//         this.ChangeGameStatus(eGameStatus.None);
//         this.mWorldBase.Clear();//删除所有刚体与碰撞器 
//         if(this.mWorld.World.bodies.getAll().length != 0 || this.mWorld.World.colliders.getAll().length != 0  )
//             console.log(`世界资源未清理完毕，请检查游戏逻辑`);
//         this.mWorld.World.free();
//     }
    
// 	//尝试手动退出游戏
// 	public ExitGame():void{
// 		this.mGameStatusObj.ExitGame();
// 	}
 
//     /*
//     *条件判断区域
//     *
//     */
//     private InitConditionMap(){
//         this.mConditionHandleArr[eCondtionType.RoomLevelGreaterThan] = this.RoomLevelGreaterThanHandle.bind(this);//房门等级大于
//         this.mConditionHandleArr[eCondtionType.RoomLevelLessThan] = this.RoomLevelLessThanHandle.bind(this);//房门等级小于
//         this.mConditionHandleArr[eCondtionType.BedLevelGreaterThan] = this.BedLevelGreaterThanHandle.bind(this);//床的等级大于
//         this.mConditionHandleArr[eCondtionType.BedLevelLessThan] = this.BedLevelLessThanHandle.bind(this);//床的等级小于
//         this.mConditionHandleArr[eCondtionType.ResourceGreaterThan] = this.ResourceGreaterThanHandle.bind(this);//玩家的货币大于
//         this.mConditionHandleArr[eCondtionType.ResourceLessThan] = this.ResourceLessThanHandle.bind(this);//玩家的货币小于
//     }

//     private RoomLevelGreaterThanHandle(playerID:number,param:number):boolean{
//         let playerBase:PlayerBase|undefined = this.GetPhysicsRigid(playerID); //首先找寻到当前的玩家
//         if(playerBase == undefined || playerBase.Type != ePhysicsGoodsType.Hero)
//             return false; 
//         let heroPlayerBase:HeroPlayerBase = playerBase as HeroPlayerBase;
//         if(!heroPlayerBase.IsSleep)//玩家必须进入了睡眠状态才能够查询到房间的数据信息
//             return false; 
//         let roomPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();
//         for(let buildVector of roomPlayerBase.GetPlayerArrByType(ePhysicsGoodsType.BuildVector)){
//             let buildingArr:PlayerBase[] = buildVector.GetPlayerArrByType(ePhysicsGoodsType.Build);
//             //其下没有建筑物
//             if(buildingArr.length == 0 || buildingArr[0].SubType == eRigidBuildType.Door)
//                 continue;
//             if((buildingArr[0] as RoomDoorVectorBase).BuildingConfig.level > param)//只可能有一个建筑
//                 return true;
//         }  
//         return false;
//     } 
//     private RoomLevelLessThanHandle(playerID:number,param:number):boolean{
//         let playerBase:PlayerBase|undefined = this.GetPhysicsRigid(playerID); //首先找寻到当前的玩家
//         if(playerBase == undefined || playerBase.Type != ePhysicsGoodsType.Hero)
//             return false;
//         let heroPlayerBase:HeroPlayerBase = playerBase as HeroPlayerBase;
//         if(!heroPlayerBase.IsSleep)//玩家必须进入了睡眠状态才能够查询到房间的数据信息
//             return false;
//         let roomPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();
//         for(let buildVector of roomPlayerBase.GetPlayerArrByType(ePhysicsGoodsType.BuildVector)){
//             let buildingArr:PlayerBase[] = buildVector.GetPlayerArrByType(ePhysicsGoodsType.Build);
//             //其下没有建筑物
//             if(buildingArr.length == 0 || buildingArr[0].SubType == eRigidBuildType.Door)
//                 continue;
//             if((buildingArr[0] as RoomDoorVectorBase).BuildingConfig.level < param)//只可能有一个建筑
//                 return true;
//         }  
//         return false; 
//     } 

//     private BedLevelGreaterThanHandle(playerID:number,param:number):boolean{
//         let playerBase:PlayerBase|undefined = this.GetPhysicsRigid(playerID); //首先找寻到当前的玩家
//         if(playerBase == undefined || playerBase.Type != ePhysicsGoodsType.Hero)
//             return false;
//         let heroPlayerBase:HeroPlayerBase = playerBase as HeroPlayerBase;
//         if(!heroPlayerBase.IsSleep)//玩家必须进入了睡眠状态才能够查询到房间的数据信息
//             return false;
//         let roomPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();
//         for(let buildVector of roomPlayerBase.GetPlayerArrByType(ePhysicsGoodsType.BuildVector)){
//             let buildingArr:PlayerBase[] = buildVector.GetPlayerArrByType(ePhysicsGoodsType.Build);
//             //其下没有建筑物
//             if(buildingArr.length == 0 || buildingArr[0].SubType == eRigidBuildType.Bed)
//                 continue;
//             if((buildingArr[0] as RoomDoorVectorBase).BuildingConfig.level > param)//只可能有一个建筑
//                 return true;
//         }  
//         return false;
//     } 
//     private BedLevelLessThanHandle(playerID:number,param:number):boolean{
//         let playerBase:PlayerBase|undefined = this.GetPhysicsRigid(playerID); //首先找寻到当前的玩家
//         if(playerBase == undefined || playerBase.Type != ePhysicsGoodsType.Hero)
//             return false;
//         let heroPlayerBase:HeroPlayerBase = playerBase as HeroPlayerBase;
//         if(!heroPlayerBase.IsSleep)//玩家必须进入了睡眠状态才能够查询到房间的数据信息
//             return false;
//         let roomPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();
//         for(let buildVector of roomPlayerBase.GetPlayerArrByType(ePhysicsGoodsType.BuildVector)){
//             let buildingArr:PlayerBase[] = buildVector.GetPlayerArrByType(ePhysicsGoodsType.Build);
//             //其下没有建筑物
//             if(buildingArr.length == 0 || buildingArr[0].SubType == eRigidBuildType.Bed)
//                 continue;
//             if((buildingArr[0] as RoomDoorVectorBase).BuildingConfig.level < param)//只可能有一个建筑
//                 return true;
//         }  
//         return false;
//     } 
//     private ResourceGreaterThanHandle(playerID:number,param:number):boolean{
//         let itemCount:number = Math.floor(param / 100);//当前的ItemID,最大判断 99万个 货币
//         let itemID:number = param % 100;//当前的ItemID,最大判断 99万个 货币
//         let playerBase:PlayerBase|undefined = this.GetPhysicsRigid(playerID); //首先找寻到当前的玩家
//         if(playerBase == undefined || playerBase.Type != ePhysicsGoodsType.Hero)
//             return false;
//         let heroPlayerBase:HeroPlayerBase = playerBase as HeroPlayerBase;
//         if(!heroPlayerBase.IsSleep)//玩家必须进入了睡眠状态才能够查询到房间的数据信息
//             return false;
//         let roomPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();
//         if(itemID == 1)
//             return roomPlayerBase.GoldCount > itemCount;
//         else if( itemID == 2)
//             return roomPlayerBase.TomatoCount > itemCount;
//         return false;
//     }

//     private ResourceLessThanHandle(playerID:number,param:number):boolean{
//         let itemCount:number = Math.floor(param / 100);//当前的ItemID,最大判断 99万个 货币
//         let itemID:number = param % 100;//当前的ItemID,最大判断 99万个 货币
//         let playerBase:PlayerBase|undefined = this.GetPhysicsRigid(playerID); //首先找寻到当前的玩家
//         if(playerBase == undefined || playerBase.Type != ePhysicsGoodsType.Hero)
//             return false;
//         let heroPlayerBase:HeroPlayerBase = playerBase as HeroPlayerBase;
//         if(!heroPlayerBase.IsSleep)//玩家必须进入了睡眠状态才能够查询到房间的数据信息
//             return false;
//         let roomPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();
//         if(itemID == 1)
//             return roomPlayerBase.GoldCount < itemCount;
//         else if( itemID == 2)
//             return roomPlayerBase.TomatoCount < itemCount;
//         return false;
//     }   

//     //判断条件是否达成
//     public ConditionIsReach(playerID:number,conditions:Array<number>):boolean{ 
//         for(let data of conditions) { 
//             let key:number = data % 1000;
//             //如果配置错误的话，作提示，但是让其通过
//             if( this.mConditionHandleArr[key] == undefined){ 
//                 Hyperlink.showTips(`参数:${data} 下 ${key}不存在`); 
//                 continue;
//             }
//             if(!this.mConditionHandleArr[key](playerID,Math.floor(data / 1000)))
//                 return false;
//         }
//         return true;
//     } 

//     //判断道具资源是否足够
//     public ResourceIsReach(playerID:number,costGoods:Array<{key:number,value:number}>):boolean{ 
//         for(let data of costGoods) { 
//             let itemID:number = data.key;
//             let itemCount :number = data.value;
//             let playerBase:PlayerBase|undefined = this.GetPhysicsRigid(playerID); //首先找寻到当前的玩家
//             if(playerBase == undefined || playerBase.Type != ePhysicsGoodsType.Hero)
//                 return false;
//             let heroPlayerBase:HeroPlayerBase = playerBase as HeroPlayerBase;
//             if(!heroPlayerBase.IsSleep)//玩家必须进入了睡眠状态才能够查询到房间的数据信息
//                 return false;
//             let roomPlayerBase:RoomVectorBase = heroPlayerBase.GetSleepRoom();
//             let nowNum:number = 0;
//             if(itemID == 1)
//                 nowNum = roomPlayerBase.GoldCount;
//             else if( itemID == 2) 
//                 nowNum =  roomPlayerBase.TomatoCount;
//             if(nowNum < itemCount)
//                 return false;
//         } 
//         return true;
//     }

//     public CoinYieldNotify(rigidID:number,yieldCount:number){
//         let cameraPlayer:GameCameraPlayerBase = this.CameraPlayer();
//         if(cameraPlayer == undefined || !cameraPlayer.DetectionComp.RigidBodyIsView(rigidID))        
//             return;
//         //触发玩家收益提示
//         TitanCCC.EventMgr.trigger(EventNotify.ShowCoinCurrencyChange,{RigidID:rigidID,Count:yieldCount});
//     }
//     public GoldYieldNotify(rigidID:number,yieldCount:number){
//         let cameraPlayer:GameCameraPlayerBase = this.CameraPlayer();
//         if(cameraPlayer == undefined || !cameraPlayer.DetectionComp.RigidBodyIsView(rigidID))        
//             return;
//         //触发玩家收益提示
//         TitanCCC.EventMgr.trigger(EventNotify.ShowGoldCurrencyChange,{RigidID:rigidID,Count:yieldCount}); 
//     }

//     public UpdatePlayerOpertationInfo(rigidID:number){
//         let cameraPlayer:GameCameraPlayerBase = this.CameraPlayer();
//         if(cameraPlayer == undefined || !cameraPlayer.DetectionComp.RigidBodyIsView(rigidID))        
//             return;
//         TitanCCC.EventMgr.trigger(EventNotify.RefreshOperationInfo,rigidID);//发送玩家操作列表变动的信息
//     }
//     //获取到所有的玩家列表
//     public GetPlayerInfo(id:number):{RigidID:number,Status:number,HeadUrl:number,IsSelf:boolean}{
//         return this.mPlayerArray.get(id);
//     }
 
//     //获取到所有的玩家列表大小
//     public GetPlayerCount():number{
//         return this.mPlayerArray.size;
//     }

//     //获取到所有的玩家的列表信息
//     public GetPlayerArray():Array<{RigidID:number,Status:number,HeadUrl:number,IsSelf:boolean}>{
//         let ret:Array<{RigidID:number,Status:number,HeadUrl:number,IsSelf:boolean}> = new Array<{RigidID:number,Status:number,HeadUrl:number,IsSelf:boolean}>();
//         for(let cell of this.mPlayerArray)
//             ret.push(cell[1]);
//         return ret;
//     }

//     //一个玩家进入了游戏内
//     public PlayerEnterGame(playerBase:PlayerBase){ 
//     } 

//     //一个玩家离开了游戏 
//     public PlayerExitGame(playerBase:PlayerBase){
//         if(!this.mPlayerArray.has(playerBase.ID))
//             return; 
//         this.mPlayerArray.get(playerBase.ID).Status = 0;
//         TitanCCC.EventMgr.trigger(EventNotify.GamePlayerExitGame,playerBase.ID);//当一个玩家进入了游戏的时候
//     } 

//     //一个玩家在游戏中房门受到了伤害
//     public PlayerBeHurt(playerBase:PlayerBase):void{
//         TitanCCC.EventMgr.trigger(EventNotify.GamePlayerBeHurt,playerBase.ID);//当一个玩家死亡的时候
//     }
    
//     //玩家属性变动时
//     public PlayerAttrChange(playerBase:PlayerBase){
//         let cameraPlayer:GameCameraPlayerBase = this.CameraPlayer();
//         if(cameraPlayer == undefined || !cameraPlayer.DetectionComp.RigidBodyIsView(playerBase.ID))        
//             return;
//         TitanCCC.EventMgr.trigger(EventNotify.PlayerBaseAttrChange,playerBase.ID);
//     } 

//     //怪物血量变动时
//     public MonsterAttrChange(playerBase:PlayerBase){ 
//         TitanCCC.EventMgr.trigger(EventNotify.MonsterAttrChange,playerBase.ID);
//     } 
    
//     //怪物血量变动时
//     public MonsterLevelChange(playerBase:PlayerBase){ 
//         this.mMonsterStatus.Level =  (playerBase as NightmarePlayerBase).GetLevel();
//         TitanCCC.EventMgr.trigger(EventNotify.MonsterLevelChange,playerBase.ID);
//     } 
    
//     //怪物血量变动时
//     public MonsterEnterGame(playerBase:PlayerBase){ 
//     } 
//     //怪物血量变动时 
//     public MonsterExitGame(playerBase:PlayerBase){ 
//         this.mMonsterStatus.Status = 0;
//         TitanCCC.EventMgr.trigger(EventNotify.MonsterExitGame,playerBase.ID);
//     }  
    
//     //获取到怪物的当前状态信息
//     public GetMonsterStatus():{RigidID:number,Status:number,HeadUrl:number,Level:number}{
//         return this.mMonsterStatus;
//     }
// }  