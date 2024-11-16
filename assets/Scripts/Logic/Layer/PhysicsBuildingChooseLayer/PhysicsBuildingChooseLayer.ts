import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _decorator, find, instantiate, Prefab ,Node, Label, Sprite, SpriteFrame } from 'cc';    
import { Cfg_BuildingShop } from '../../../Config/Cfg_BuildingShop';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { ResouceProxy } from '../../Proxy/ResourceProxy/ResouceProxy';
import { Cfg_BuildConfig, IBuildConfigStruct } from '../../../Config/Cfg_BuildConfig';
import { IPhysicsPlayerStruct, Cfg_PhysicsPlayer } from '../../../Config/Cfg_PhysicsPlayer';
import { RoomBuildingVectroBase } from '../../../Util/PhysicsRigidBody/RoomBuildingVectroBase';
import { PhysicsProxy } from '../../Proxy/PhysicsProxy/PhysicsProxy';
const { ccclass} = _decorator;
@ccclass('PhysicsBuildingChooseLayer')  
export class PhysicsBuildingChooseLayer extends BaseLayer {
    private mWindowID:number;
    private mRigidID:number;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) {  
    } 
    
    InitNode() { 
        for(let cell of Cfg_BuildingShop.GetDatas()){
            let node:Node = instantiate(_Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/PhysicsBuildingChooseLayer/Comp/BuildingCell",Prefab));
            find("Name",node).getComponent(Label).string = cell.Name;
            find("Desc",node).getComponent(Label).string = cell.Desc; 
            this.RegisterButtonEvent(find("YellowButton",node),()=>{
                let buildConfig:IBuildConfigStruct = Cfg_BuildConfig.GetData(cell.BuildID);//获取到建筑配置信息
                _Facade.FindProxy(PhysicsProxy).GeneralBuliding(this.mRigidID,buildConfig)
                _Facade.Send(eNotice.MultPanleClose,this.mWindowID );
            });  
            _Facade.FindProxy(ResouceProxy).Load(find("Head",node).getComponent(Sprite),"spriteFrame",`resources`,`LayerSource/PhysicsBuildingChooseLayer/Images/${cell.Head}/spriteFrame`,SpriteFrame);
            find("Children",this.node).addChild(node);
        }
    } 
        
    InitData(viewInfo:{windowID:number,windowInfo:any}) {      
        this.mWindowID = viewInfo.windowID;
        this.mRigidID = viewInfo.windowInfo; 
    }     
     
    InitLayer() {      
    }           
     
    onClose():void{      
    } 
 
} 