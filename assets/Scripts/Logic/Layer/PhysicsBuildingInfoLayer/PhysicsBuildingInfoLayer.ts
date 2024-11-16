import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _decorator, find, instantiate, Prefab ,Node, Label, Sprite, SpriteFrame } from 'cc';    
import { Cfg_BuildConfig, IBuildConfigStruct } from '../../../Config/Cfg_BuildConfig'; 
import { Facade } from '../../../Frame/PureMVC';
import { PhysicsProxy } from '../../Proxy/PhysicsProxy/PhysicsProxy';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { ResouceProxy } from '../../Proxy/ResourceProxy/ResouceProxy';
import { BuildingPlayerBase } from '../../../Util/PhysicsRigidBody/BuildingPlayerBase/BuildingPlayerBase';
const { ccclass} = _decorator;
@ccclass('PhysicsBuildingInfoLayer')  
export class PhysicsBuildingInfoLayer extends BaseLayer {
    private mWindowID:number;
    private mBuildingPlayerBase:BuildingPlayerBase;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) {  
    } 
    
    InitNode() { 
    } 
         
    InitData(viewInfo:{windowID:number,windowInfo:any}) {     
        this.mWindowID = viewInfo.windowID;
        this.mBuildingPlayerBase = viewInfo.windowInfo; 
        let buildingConfig:IBuildConfigStruct = this.mBuildingPlayerBase.BuildingConfig;//首先获取到建筑的当前信息
        find("NameGroup/BuildingName",this.node).getComponent(Label).string = buildingConfig.Name;//当前建筑的名称

        //获取到建筑下一级
        let nextConfig:IBuildConfigStruct = _Facade.FindProxy(PhysicsProxy).GetBuilingConfigByLevel(buildingConfig.RigidID,buildingConfig.Level + 1);
        let node:Node = find("NextLevelCell",this.node);
        find("Name",node).getComponent(Label).string = nextConfig.Name;
        find("Desc",node).getComponent(Label).string = nextConfig.Desc;  
        this.RegisterButtonEvent(find("YellowButton",node),()=>{
            if(this.mBuildingPlayerBase.UpGrade()){
                _Facade.Send(eNotice.TipsShow,"升级失败")
                return 
            }
            _Facade.Send(eNotice.TipsShow,"升级成功")
        }); 
    }     
     
    InitLayer() {       
    }           
     
    onClose():void{      
    } 
 
} 