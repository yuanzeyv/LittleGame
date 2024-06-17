import { Prefab } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global"; 
import { eNetProtocol } from "../../../NetNotification"; 
import { eNotice } from "../../../NotificationTable"; 
import { NetWorkProxy } from "../NetWorkProxy/NetWorkProxy"; 
import { BundleProxy } from "../BundleProxy/BundleProxy"; 
import { Ball } from "@dimforge/rapier2d-compat";
import { Cfg_PassConfig, IPassConfigStruct } from "../../../Config/Cfg_PassConfig";
import { PhysicsWrold } from "../../Layer/PhysicsLayer/Physics/World";
export enum ePrefabType{
    Cube,
    Ball,
};

export enum eColiiderType{
    Wall   = 1 << 0,//墙体
    Player = 1 << 1,//主玩家
    Enemy  = 1 << 2,//敌人 
};
//游戏中的背包代理
export class PhysicsProxy extends BaseProxy{ 
    static  get ProxyName():string { return "PhysicsProxy" };  
    private mPassID:number = 1;
    private mPassConfig:IPassConfigStruct;//获取到当前的关卡配表 

    private mWorld:PhysicsWrold;

    private mIsDebug:boolean = true; 
    private mPrefabArray:Array<Prefab> = new Array<Prefab>();
    public onLoad():void {
        this.mPassConfig = Cfg_PassConfig.GetData(this.mPassID);
    }   

    public InitPrefabArray(){
        this.mPrefabArray[ePrefabType.Cube]  = _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/PhysicsLayer/Comp/Rectangle",Prefab);
        this.mPrefabArray[ePrefabType.Ball]  = _Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/PhysicsLayer/Comp/Circle",Prefab);    
    }

    public GetPrefab(type:ePrefabType):Prefab{
        return this.mPrefabArray[type];
    }

    public IsDebugModel():boolean{
        return this.mIsDebug;
    }

    public GetPassConfig(){
        return this.mPassConfig;
    }
}    