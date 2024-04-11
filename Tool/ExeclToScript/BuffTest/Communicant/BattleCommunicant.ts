import { eNotifyType } from "./Define/Define";

//用于通知战斗内的各个事件信息，充分将战斗模块进行解耦
export class BattleCommunicant{
    private mID:number;
    private mNotifyHandleMap:Map<eNotifyType,Map<(...param:any[])=>void,Set<Object>>> = new Map<eNotifyType,Map<(...param:any[])=>void,Set<Object>>>();
    public constructor(id:number){
        this.mID = id;
    }
    //注册通知
    public RegisterNotify(event:eNotifyType,obj:Object,handle:(...param:any[])=>void){
        let handleMap:Map<(...param:any[])=>void,Set<Object>>|undefined = this.mNotifyHandleMap.get(event);
        if(!handleMap){
            handleMap = new Map<(...param:any[])=>void,Set<Object>>();
            this.mNotifyHandleMap.set(event,handleMap);
        }
        let objMap:Set<Object>|undefined = handleMap.get(handle);
        if(objMap == undefined){
            objMap = new Set<Object>();
            handleMap.set(handle,objMap);
        }
        if(objMap.has(obj))//已经注册过的情况下
            return;
        objMap.add(obj);
    }

    public UnRegisterNotify(event:eNotifyType,obj:Object,handle:(...param:any[])=>void){
        let handleMap:Map<(...param:any[])=>void,Set<Object>>|undefined = this.mNotifyHandleMap.get(event);
        if(!handleMap)//不存在此事件的注册
            return;
        let objMap:Set<Object>|undefined = handleMap.get(handle);
        if(objMap == undefined)
            return; 
        objMap.delete(obj);
        if(objMap.size == 0)
            handleMap.delete(handle);
        if(handleMap.size == 0)
            this.mNotifyHandleMap.delete(event);
    }

    public Notify(event:eNotifyType,...param:any[]){
        let handleMap:Map<(...param:any[])=>void,Set<Object>>|undefined = this.mNotifyHandleMap.get(event);
        if(handleMap == undefined)
            return;
        for(let cell of handleMap){
            let handle:(...param: any[]) => void = cell[0];
            let objSet:Set<Object> = cell[1];
            for(let obj of objSet)
                handle.bind(obj)(...param); 
        }
    }
}

export class BattleCommunicantProxy{
    private static sInstance:BattleCommunicantProxy;
    private mBattleCommunicantMap:Map<number,BattleCommunicant> = new Map<number,BattleCommunicant>();
    private mGenGlobalID:number = 0;
    public static get Ins():BattleCommunicantProxy{
        if(this.sInstance == undefined)
            this.sInstance = new BattleCommunicantProxy();
        return this.sInstance;
    }
    //生成一个通知对象
    public GenObj():number{
        let id:number = this.mGenGlobalID++;
        let battleCommunicant:BattleCommunicant = new BattleCommunicant(id);
        this.mBattleCommunicantMap.set(id,battleCommunicant);
        return id;
    }
    //注册通知
    public RegisterNotify(id:number,event:eNotifyType,obj:Object,handle:(...param:any[])=>void){
        let battleCommunicant:BattleCommunicant|undefined = this.mBattleCommunicantMap.get(id);
        if( battleCommunicant == undefined)
            return;
        battleCommunicant.RegisterNotify(event,obj,handle); 
    }

    public UnRegisterNotify(id:number,event:eNotifyType,obj:Object,handle:(...param:any[])=>void){
        let battleCommunicant:BattleCommunicant|undefined = this.mBattleCommunicantMap.get(id);
        if( battleCommunicant == undefined)
            return;
        battleCommunicant.UnRegisterNotify(event,obj,handle); 
    }

    public Notify(id:number,event:eNotifyType,...param:any[]){
        let battleCommunicant:BattleCommunicant|undefined = this.mBattleCommunicantMap.get(id);
        if( battleCommunicant == undefined)
            return;
        battleCommunicant.Notify(event,...param);  
    }
} 
