import { Vec2 } from "cc";
import { PhysicsWrold } from "../../../../../Util/Physics/World";
import { Object } from "../Object";
import { BuffManager } from "../../Buff/BuffManager"; 
import { _Facade } from "../../../../../Global";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";
import { eTriggerType } from "../../Buff/BuffDefine";
import { AttrObjectFacade } from "../../Attr/AttrObjectFacade";
import { GameRefObject } from "../../GameObjectPool/GameRefObject";
 /*
 *游戏中的物理对象，存在一个Buff 一个属性对象
 */
export class PhysicsObejct extends Object{ 
    protected mBuffControl:BuffManager; 
    protected mAttrObj:GameRefObject<AttrObjectFacade>;//这是一个属性计算单元，每个对象都会有这个单元，用以计算玩家的属性信息

    constructor(physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos:Vec2 = new Vec2(0,0),rotate:number = 0,param?:string,attrs?:Array<{K:number,V:number}>){
        super(physicsWorld,name,bodyID,functionBodys,pos,rotate,param);
        let onlyTheBraveProxy:OnlyTheBraveProxy = _Facade.FindProxy(OnlyTheBraveProxy);//获取到游戏对象
        this.mAttrObj = onlyTheBraveProxy.GenerateSelectObj();//生成属性对象
        this.mPlayerBase.AttrRefObj = this.mAttrObj;//物理对象绑定属性
        this.mAttrObj.Data.InitAttrs(attrs);//初始化属性对象
        this.mBuffControl = new BuffManager(this);//创建一个Buff管理对象（每个角色都会拥有一个）
    }

    //尝试删除自己
    public RemoveObject():void{
        this.mBuffControl.TriggerEvent(eTriggerType.SelfDie,{});//向Buff发送自己即将死亡的消息
        this.mAttrObj.RefDec();//被释放时，立即设置删除
        super.RemoveObject();
        this.mBuffControl.Destory();
    }
    public get AttrObj():GameRefObject<AttrObjectFacade>{
        return this.mAttrObj;
    }


    public get BuffControl():BuffManager{
        return this.mBuffControl;
    }
};