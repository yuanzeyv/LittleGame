import { Vec2 } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global"; 
import { RigidBodies } from "../../../Util/Physics/RigidBodies";
import { PhysicsWrold } from "../../../Util/Physics/World";
import { PlayerBase } from "./Physics/PlayerBase";
import { ePlayerType, eMoveControlType } from "./Physics/ColliderTypeDefine";
import { LinearVelocityControl } from "./Physics/PhysicsColliderComp/MoveControlComp/LinearVelocityControl";
import { CameraPhysicsObject } from "./PlayerObject/PhysicsType/CameraPhysicsObject";
import { HeroPhysicsObject } from "./PlayerObject/PhysicsType/HeroPhysicsObject";
import { Object } from "./PlayerObject/Object";
import { PhysicsObjectFactory } from "./PlayerObject/PhysicsObjectFactory";
import { GroupObjectFactory } from "./PlayerObject/GroupObjectFactory";
import { PhysicsObejct } from "./PlayerObject/PhysicsType/PhysicsObejct";
import { eFinalAttrType } from "./Attr/AttrType"; 
import { GameObjectPool} from "./GameObjectPool/GameObjectPool";
import { Cfg_PhysicsBuff } from "../../../Config/Cfg_PhysicsBuff";
import { eTriggerType } from "./Buff/BuffDefine";
import { AttrObjectFacade } from "./Attr/AttrObjectFacade";
import { GameRefObject } from "./GameObjectPool/GameRefObject";
export type TObjectMapCell = {ID:number,Type:number,BodyID:number,Rotate:number,Position:{x:number,y:number},Colliders?:Array<number>,Relevance?:string,Param?:string,Attr?:string};
 
export class OnlyTheBraveProxy extends BaseProxy{ 
    static get ProxyName():string { return "OnlyTheBraveProxy" }; 
    private mPhysicsWrold:PhysicsWrold;//勇往向前中的物理世界对象 
    /*
    *游戏内对象文件
    */
    private mMainGameGroup:Object;//游戏组的根节点
    private mPlayerObject:Object;//游戏中的主角对象
    private mCameraObject:CameraPhysicsObject;//游戏中的主角对象
    private mObjectMap:Map<number,Object> = new Map<number,Object>();//主游戏对象也会记录所有的游戏数据信息
    /*
    *单局游戏内的地图数据信息
    */
    private mMapObj:Map<string,Array<TObjectMapCell>> = new Map<string,Array<TObjectMapCell>>();
    private mAttrMap:Map<string,Array<{K:number,V:number}>> = new Map<string,Array<{K:number,V:number}>>();
    /*
    *属性对象池，目的为快速解耦对象间的关系，只向外抛出查询对象
    */
    private mPlayerAttrObjPool:GameObjectPool<AttrObjectFacade> = new GameObjectPool<AttrObjectFacade>(AttrObjectFacade);
    
    /*
    *配置表信息
    */
    //记录Buff单个Buff所对应的所有触发类型 以及 执行类型 及 执行参数
    private mBuffTriggerInfoMap:Map<number,Map<eTriggerType,Array<{Exec:number,Param:Array<String>}>>> = new Map<number,Map<eTriggerType,Array<{Exec:number,Param:Array<String>}>>>();
    public Init(): void {
        this.InitConfig();
    }

    //初始化游戏配置区域
    public InitConfig():void{
        this.InitAnalysisBuffTriggerInfo();
    }

    //解析所有BUFF的触发数据信息
    public InitAnalysisBuffTriggerInfo(){
        for(let cell of Cfg_PhysicsBuff.GetDatas()){
            for(let buffTriggerInfo of cell.ListenTrigger){
                let buffTriggerMap:Map<number,Array<{Exec:number,Param:Array<String>}>>|undefined = this.mBuffTriggerInfoMap.get(cell.BuffID);
                if( buffTriggerMap == undefined){
                    buffTriggerMap = new Map<number,Array<{Exec:number,Param:Array<String>}>>();
                    this.mBuffTriggerInfoMap.set(cell.BuffID,buffTriggerMap);
                }
                let triggerTypeArray:Array<{Exec:number,Param:Array<String>}> = buffTriggerMap.get(buffTriggerInfo.Tri);
                if( triggerTypeArray == undefined){
                    triggerTypeArray = new Array<{Exec:number,Param:Array<String>}>();
                    buffTriggerMap.set(buffTriggerInfo.Tri,triggerTypeArray);
                }
                triggerTypeArray.push({Exec:buffTriggerInfo.Exec,Param:buffTriggerInfo.Param});
            }
        }
    }
    
    //获取到单个Buff的所有执行信息
    public GetBuffExecInfo(buffID:number,triggerType:eTriggerType):Array<{Exec:number,Param:Array<String>}>|undefined{
        let triggerInfoMap:Map<eTriggerType, { Exec: number; Param: Array<String>; }[]> = this.mBuffTriggerInfoMap.get(buffID);
        if( triggerInfoMap == undefined)
            return undefined;
        return triggerInfoMap.get(triggerType);
    }
    /*
    *操作物理世界
    */
    //游戏中的物理世界
    public get PhysicsWorld():PhysicsWrold{ 
        return this.mPhysicsWrold; 
    }
    //一帧的时间间隔
    public get FrameTime():number{ 
        return this.mPhysicsWrold.TimeStep; 
    }
    //查询物理世界中的某一个刚体
    public GetRigidBoides(playerID:number):RigidBodies | undefined{
        return this.mPhysicsWrold.GetRigidBody(playerID);
    }
    
    public GetPlayerBase(playerID:number):PlayerBase | undefined{
        let rigidBodies:RigidBodies = this.GetRigidBoides(playerID);//通过玩家ID 获取到刚体信息
        if(rigidBodies == undefined)
            return undefined;
        return rigidBodies.RelevanceObj as PlayerBase;//通过刚体信息获取到玩家描述对象
    }

    
    //获取到玩家对象
    public GetPlayerObject():Object{
        if( this.mPlayerObject == undefined)
            this.mPlayerObject = this.mMainGameGroup.GetChildByName("MainPlayer");
        return this.mPlayerObject;
    }
    //获取到玩家对象
    public GetCameraObject():Object{
        if( this.mCameraObject == undefined)
            this.mCameraObject = this.mMainGameGroup.GetChildByName("Camera") as CameraPhysicsObject;
        return this.mPlayerObject;
    }
    //删除游戏中的一个对象
    public RemoveObject(childID:number):void{ 
        let object:Object|undefined = this.mObjectMap.get(childID);
        if(object == undefined)
            return; 
        object.RemoveObject();
        this.mObjectMap.delete(childID);//将节点添加到界面中去
    }
    /*
    *游戏流程
    */
    //初始化游戏的地图
    private InitMapInfo(map:any){
        this.mMapObj.clear();
        this.mAttrMap.clear();
        for(let key in map.Object)//记录所有地图数据对象 
            this.mMapObj.set(key,map.Object[key]);
        for(let key in map.Attrs){//记录所有地图属性数据 
            let finalAttr:Array<{K:number,V:number}> = new Array<{K:number,V:number}>();
            for(let cell of map.Attrs[key])
                finalAttr.push({K:cell[0],V:cell[1]});
            this.mAttrMap.set(key,finalAttr);
        }
    }
    

    //设置一个玩家的移动,设置一个角色的移动方向
    public PlayerMoveToDir(playerID:number,dirVec:Vec2,percent:number){
        let playerObject:Object|undefined = this.mObjectMap.get(playerID);//寻找到对应的角色
        if(playerObject == undefined)//玩家不存在无法进行移动 
            return;
        this.PlayerMoveToPos(playerObject, playerObject.PlayerBase.GetPosition().add(dirVec.multiplyScalar(5000)),percent);
    }
    
    //设置一个玩家的移动,设置一个角色的移动方向
    public PlayerMoveToPos(object:Object|undefined,ToPos:Vec2,percent:number){
        if(object == undefined)
            return;
        let moveComponent:LinearVelocityControl = object.PlayerBase.GetColliderByType(ePlayerType.Move,eMoveControlType.Normal) as any;
        if(moveComponent == undefined)
            return;
        moveComponent.SetEndPoint(ToPos,percent);
    }  
 
    //开始一场游戏
    public StartGame(map:any):void{ 
        this.InitMapInfo(map);//初始化地图数据信息
        //首先创建游戏的物理世界
        this.mPhysicsWrold = new PhysicsWrold(new Vec2(0,0));
        this.mMainGameGroup = this.AnysicsNode(undefined,"Main", map.Main.Relevance ,map.Main);//创建游戏的组对象
        this.mCameraObject.SetFollowObject(this.mPlayerObject);//设置相机位置
    }
    //更新游戏的时间
    public UpDate(dt:number){
        this.mPhysicsWrold.Update(dt);//准备更新物理世界
    }

    //获取到游戏中的属性数组，通过属性数组名称
    public GetAttrArrayByName(attrName:string):Array<{K:number,V:number}>{
        return this.mAttrMap.get(attrName) || new Array<{K:number,V:number}>();
    }


    //为一个父节点添加一组对象（父节点一定要存在）
    public AnysicsNodeToGroupParent(parent:Object,nodeName:string){
        let nodeObj:Array<TObjectMapCell> = this.mMapObj.get(nodeName);//尝试寻找对应的节点信息
        if(nodeObj == undefined)
            return undefined;
        let objectPos:Vec2 = new Vec2(parent.Position.x,parent.Position.y);//设置节点坐标
        if(parent != undefined)
            objectPos.add(parent.Position); 
        for(let key in nodeObj)//循环遍历所有子节点对象
            this.AnysicsNode(parent,key,nodeObj[key].Relevance,nodeObj[key]);//对节点数据进行解析
    }
    
    public AnysicsNode(parent:Object,key:string,nodeName:string,data:TObjectMapCell):Object{
        let nodeObj:Array<TObjectMapCell> = this.mMapObj.get(nodeName);//尝试寻找对应的节点信息
        if(nodeObj == undefined && data.Type == 1)
            return undefined;
        let objectPos:Vec2 = new Vec2(data.Position.x,data.Position.y);//设置节点坐标
        if(parent != undefined) 
            objectPos.add(parent.Position);
        let retObjct:Object = data.Type == 0 ? PhysicsObjectFactory.Ins.GenPhysicsObject(this.mPhysicsWrold,data.ID,key,data.BodyID,data.Colliders ,objectPos,data.Rotate,data.Param,data.Attr) : GroupObjectFactory.Ins.GenGroupObject(this.mPhysicsWrold,data.ID,key,objectPos,data.Rotate,data.Param); 
        if(parent != undefined )//存在父亲节点的话，立即进行添加
            parent.AddChild(retObjct);
        if(data.Type == 1){//如果当前是组对象的话，说明当前还应该继续添加节点对象
            for(let key in nodeObj)//循环遍历所有子节点对象
                this.AnysicsNode(retObjct,key,nodeObj[key].Relevance,nodeObj[key]);//对节点数据进行解析
        }
        this.mObjectMap.set(retObjct.ID,retObjct);//将节点添加到界面中去
        return retObjct; 
    }

    public AddChildToMainRoot(child:Object){ 
        this.mMainGameGroup.AddChild(child);
        this.mObjectMap.set(child.ID,child);//将节点添加到界面中去
    }

    //玩家攻击函数
    /*
    *返回值:是否是一次有效的攻击
    */
    public ObjectAttack(attackID:number,beAttackID:number,skillID:number):boolean{
        let attackPhysicsObject:PhysicsObejct|undefined = this.mObjectMap.get(attackID) as PhysicsObejct;
        let enemyPhysicsObject:PhysicsObejct|undefined = this.mObjectMap.get(beAttackID) as PhysicsObejct;
        let attackAttrObj:AttrObjectFacade = attackPhysicsObject.AttrObj.Data;
        let beAttkAttrObj:AttrObjectFacade = attackPhysicsObject.AttrObj.Data;
        //子弹能够触碰到的只可能是携带了属性的对象 
        let enemyPhysicalDefence:number = beAttkAttrObj.GetFinalAttr(eFinalAttrType.PhysicalDefence);//敌方的物理防御
        let enemyDamageReduction:number = beAttkAttrObj.GetFinalAttr(eFinalAttrType.DamageReduction);//敌方的最终减伤
        let enemyCriticalResistDamage:number = beAttkAttrObj.GetFinalAttr(eFinalAttrType.CriticalResistDamage);//敌方的爆伤抵抗
        let enemyMissRate:number = beAttkAttrObj.GetFinalAttr(eFinalAttrType.MissRate);//敌方的闪避几率
        let enemyResistCirticalRate:number = beAttkAttrObj.GetFinalAttr(eFinalAttrType.ResistCirticalRate);//敌方抗暴击概率
        //获取到自己的部分属性信息
        let selfPhysicalAttack:number = attackAttrObj.GetFinalAttr(eFinalAttrType.PhysicalAttack);//自己的物理攻击
        let selfDamageBoost:number = attackAttrObj.GetFinalAttr(eFinalAttrType.DamageBoost);//自己的最终增伤
        let selfCriticalAddtionDamage:number = attackAttrObj.GetFinalAttr(eFinalAttrType.CriticalAddtionDamage);//自己的爆伤加成
        let selfHitRate:number = attackAttrObj.GetFinalAttr(eFinalAttrType.HitRate);//自己的命中几率
        let selfCriticalRate:number = attackAttrObj.GetFinalAttr(eFinalAttrType.CriticalRate);//自己的暴击概率
        
        //首先判断是当前针对敌方的攻击是否触发了暴击 
        let circleRandom:number = Math.floor(Math.random() * 10000);
        let missRandom:number = Math.floor(Math.random() * 10000);
        let isMiss:boolean = Math.max(selfHitRate - enemyMissRate,0) >= missRandom;
        let isCircle:boolean = Math.max(selfCriticalRate - enemyResistCirticalRate,0) >= circleRandom;
        //玩家彻底的躲闪了本次的攻击
        if( isMiss && !isCircle )
            return;
        //首先判断当前敌方是否闪避了这次攻击
        let baseHarm:number = Math.max(selfPhysicalAttack - enemyPhysicalDefence,0);//最少造成0点伤害
        let criticalResistDamage:number = Math.max(selfCriticalAddtionDamage - enemyCriticalResistDamage,-10000) / 10000;//暴击增伤,如果小于-10000的话，代表爆伤全免疫
        let damageBoost:number = Math.max(selfDamageBoost - enemyDamageReduction,-10000) / 10000;//计算伤害增加幅度，如果小于-10000，代表敌人完全免疫角色的所有攻击
        let finalHarm = baseHarm * (isCircle ? (1 + criticalResistDamage) : 1) * (1 + damageBoost);//最终伤害
        //设置伤害数值
        return !beAttkAttrObj.AlterHP(-finalHarm);
    } 

    /*
    *属性对象信息
    */
    //生成一个属性查询对象
    public GenerateSelectObj():GameRefObject<AttrObjectFacade>{
        return this.mPlayerAttrObjPool.GenerateGameObject();
    } 

    //获取到某一个Buff的所有触发信息
    public GetBuffTriggers(buffID:number):Array<number>{
        let ret:Array<number> = new Array<number>();
        let triggerInfoMap:Map<number, { Exec: number; Param: Array<String>; }[]> = this.mBuffTriggerInfoMap.get(buffID);
        if(triggerInfoMap == undefined)
            return ret;
        for(let cell of triggerInfoMap.keys())
            ret.push(cell);
        return;
    }

} 