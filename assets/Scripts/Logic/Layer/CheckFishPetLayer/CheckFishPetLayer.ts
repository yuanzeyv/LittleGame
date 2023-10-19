import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { NotificationEnum, NotificationEnum as eNotificationEnum } from '../../../NotificationTable';
import { ISimpleFishMoveStruct, SimpleFishMoveConfig } from '../../../Config/Cfg_SimpleFishMove';
import { find } from 'cc';
import { _Facade, _G } from '../../../Global';
import { ResouceProxy } from '../../Proxy/BundleProxy/ResouceProxy';
import { sp } from 'cc';
import { math } from 'cc';
import { EventTouch } from 'cc';
import { TipsMediator } from '../../Mediator/TipsMediator/TipsMediator';
import { MusicProxy } from '../../Proxy/MusicProxy/MusicProxy';
const { ccclass, property,type} = _decorator;
export class CheckFishPetLayer extends BaseLayer { 
    private mPosNodeMap:Map<number,{node:Node,config:ISimpleFishMoveStruct}> = new Map<number,{node:Node,config:ISimpleFishMoveStruct}>();
    private mNowMaxCount:number = 4;
    private mChoosePetMap:Set<number> = new Set<number>();  

    public InitNode(): void { 
        for(let cell of SimpleFishMoveConfig.GetDatas()) {
            let node:Node = find(`PetVectorNode/PetMap/PetNode_${cell.pet_pos}`,this.node);
            this.mPosNodeMap.set(cell.key,{node:node,config:cell}); 
        }
    }   
    protected InitLayer(): void {
        for(let cell of this.mPosNodeMap.values()){
            let spine:sp.Skeleton = find("PetSpine",cell.node).getComponent(sp.Skeleton);
            _G.Facade.FindProxy(ResouceProxy).Load(spine,`resources/Spine/${cell.config.spine_path}/skeleton`,"skeletonData",sp.SkeletonData,(comp:sp.Skeleton)=>{
                comp.setAnimation(0,"move",true);
            }); 
            cell.node.on("click",()=>{ 
                _G.Facade.FindProxy(MusicProxy).Play(1);
                if(this.mChoosePetMap.size >= this.mNowMaxCount && !this.mChoosePetMap.has(cell.config.key)){
                    _G.Facade.Send(eNotificationEnum.M_TipsShow,"已经达到上限了，无法继续选中"); 
                    return;
                }
                if(this.mChoosePetMap.has(cell.config.key)) 
                    this.mChoosePetMap.delete(cell.config.key);
                else
                    this.mChoosePetMap.add(cell.config.key);
                find("ButtonEndedSprite",cell.node).active = this.mChoosePetMap.has(cell.config.key);
            });
        }
 
        find("PetVectorNode/DescBG/StartButton",this.node).on("click",()=>{
            _Facade.Send(NotificationEnum.FishChoosePetsLayerClose);
            _Facade.Send(NotificationEnum.FishMainGameLayerOpen);
        })
    }  
} 