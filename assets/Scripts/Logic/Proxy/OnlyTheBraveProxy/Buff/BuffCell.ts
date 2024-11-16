import { _Facade } from "../../../../Global";
import { PhysicsObejct } from "../PlayerObject/PhysicsType/PhysicsObejct";
import { IPhysicsBuffStruct } from "../../../../Config/Cfg_PhysicsBuff";
import { eExecuteType, eTriggerType } from "./BuffDefine";
import { BuffManager } from "./BuffManager";

export class BuffCell{
    private mBuffManager:BuffManager;//生命管理对象
    private mEventHandle:Array<(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number})=>void> = new Array<(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number})=>void>();//零时的空间换时间代码，后期优化，现在值最求代码简洁

    protected mBuffCfg:IPhysicsBuffStruct;
    protected mBuffID:number;//对Buff分配的唯一ID
    protected mTimeTriggerCountDown:number;//当前的时间触发器

    protected mLifeVariable:number;//Buff的存活时间
    public constructor(buffManager:BuffManager,id:number,buffCfg:IPhysicsBuffStruct){
        this.mBuffManager = buffManager;
        this.mBuffID = id;
        this.mBuffCfg = buffCfg; 
        //尝试初始化触发倒计时以及触发次数 
        this.mTimeTriggerCountDown = this.mBuffCfg.CountDownTime;//设置超时时间
    } 

    public get BuffCfg():IPhysicsBuffStruct{
        return this.mBuffCfg;
    }
 
    //Buff的存活时间
    public get LifeVariable():number{
        return this.mLifeVariable;
    }

    public get ID():number{
        return this.mBuffID;
    }

    //销毁自己
    protected Destory(){  
    }
    
    //更新定时器
    public UpdateBuff(dt:number):void{
        this.mLifeVariable -= dt;
        if(this.mLifeVariable <= 0){
            this.Destory();//尝试销毁自己
            return;
        }
        this.Update(dt);
    }
    
    public Update(dt:number):void{
        let triggerCount:number = 0;//获取到当前可触发次数
        if( dt >= this.mBuffCfg.CountDownTime ){//如果当前dt>或者等于倒计时时间的话，需要进行取最小值
            while( (dt - this.mBuffCfg.CountDownTime) >= 0 ){//dt不停的-，知道数值小于
                dt -=  this.mBuffCfg.CountDownTime;
                triggerCount++; 
            }
        }
        if((this.mTimeTriggerCountDown -= dt) <= 0){
            this.mTimeTriggerCountDown += this.mTimeTriggerCountDown;
            triggerCount++;
        } 
        for(let i = 0 ; i < triggerCount ;i++)
            this.mBuffManager.TriggerEventByBuff(eTriggerType.OutTimeBuff,this,{})
    }
 
    public InitTriggerHandleArray(){
        this.mEventHandle[eExecuteType.InsertObjOfSelf]          =   this.InsertObjOfSelfHandle.bind(this);          
        this.mEventHandle[eExecuteType.InsertObjOfOper]          =   this.InsertObjOfOperHandle.bind(this);                                        
        this.mEventHandle[eExecuteType.InsertObjOfBeAttker]      =   this.InsertObjOfBeAttkerHandle.bind(this);                                    
        this.mEventHandle[eExecuteType.InsertBuffOfSelf]         =   this.InsertBuffOfSelfHandle.bind(this);        
        this.mEventHandle[eExecuteType.InsertBuffOfOper]         =   this.InsertBuffOfOperHandle.bind(this);        
        this.mEventHandle[eExecuteType.InsertBuffOfBeAttker]     =   this.InsertBuffOfBeAttkerHandle.bind(this);    
        this.mEventHandle[eExecuteType.AlterBaseAttrOfSelf]      =   this.AlterBaseAttrOfSelfHandle.bind(this);     
        this.mEventHandle[eExecuteType.AlterBaseAttrOfOper]      =   this.AlterBaseAttrOfOperHandle.bind(this);     
        this.mEventHandle[eExecuteType.AlterBaseAttrOfBeAttker]  =   this.AlterBaseAttrOfBeAttkerHandle.bind(this); 
        this.mEventHandle[eExecuteType.AlterFinalAttrOfSelf]     =   this.AlterFinalAttrOfSelfHandle.bind(this);    
        this.mEventHandle[eExecuteType.AlterFinalAttrOfOper]     =   this.AlterFinalAttrOfOperHandle.bind(this);    
        this.mEventHandle[eExecuteType.AlterFinalAttrOfBeAttker] =   this.AlterFinalAttrOfBeAttkerHandle.bind(this);
    }
    
    public TriggerEvent(eventType:eExecuteType,physicsObj:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}):void{
        this.mEventHandle[eventType](physicsObj,execute,param);
    }
    
    private InsertObjOfSelfHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private InsertObjOfOperHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private InsertObjOfBeAttkerHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private InsertBuffOfSelfHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private InsertBuffOfOperHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private InsertBuffOfBeAttkerHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private AlterBaseAttrOfSelfHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private AlterBaseAttrOfOperHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private AlterBaseAttrOfBeAttkerHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private AlterFinalAttrOfSelfHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private AlterFinalAttrOfOperHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
    private AlterFinalAttrOfBeAttkerHandle(ownerObject:PhysicsObejct,execute:Array<string>,param:{OperObj?:number,BeAtker?:number,Hurm?:number}){
    }
} 