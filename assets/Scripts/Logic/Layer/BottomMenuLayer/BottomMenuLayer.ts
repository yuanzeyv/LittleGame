import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { ResouceProxy } from '../../Proxy/ResourceProxy/ResouceProxy'; 
import { ePoolDefine } from '../../Proxy/PoolProxy/PoolDefine';
import { PoolProxy } from '../../Proxy/PoolProxy/PoolProxy';
import { _decorator, Vec3, find, Camera, UITransform ,Node, Sprite, SpriteFrame, EventTouch} from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { BottomListConfig, IBottomListStruct } from '../../../Config/Cfg_BottomList';
import { GetTextMeshComp } from '../../../Util/Util';
enum eBottomType{
    Bag = 5,
}

export class BottomMenuLayer extends BaseLayer {  
    private mTouchUIPos:Vec3 = new Vec3(0,0,0);
    private mType:number = 1;
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
    } 
    
    InitNode() {  
    } 
    
    InitData(data:{worldPos:Vec3,type:number}) {    
        this.mTouchUIPos.set(data.worldPos.x,data.worldPos.y,0)  
        this.mType = data.type;
    }    
    
    InitLayer() {    
        let tableCell:Readonly<IBottomListStruct[]> = BottomListConfig.GetDatas()//读表
        let list:IBottomListStruct[] = tableCell.filter((cell)=>{ return cell.type == this.mType;  });
        list.sort((a,b)=>{ return b.sort - a.sort;} )
        list.forEach((cell:IBottomListStruct)=>{
            let node:Node = _Facade.FindProxy(PoolProxy).Get(ePoolDefine.ButtomMenuCell);
            _Facade.FindProxy(ResouceProxy).Load(find("IconSprite",node).getComponent(Sprite),"spriteFrame","resources",
                `LayerSource/BottomMenuLayer/Images/funcIcon/${cell.icon}/spriteFrame`,SpriteFrame);
            _Facade.FindProxy(ResouceProxy).Load(node.getComponent(Sprite),"spriteFrame","resources",
                `LayerSource/BottomMenuLayer/Images/${cell.backGround}/spriteFrame`,SpriteFrame);
            GetTextMeshComp(find("Name",node)).string = cell.name;
            
            GetTextMeshComp(find("FunctionDesc",node)).string = cell.desc;
            GetTextMeshComp(find("OwnerLabel",node)).string = cell.rightDesc; 
            find("OriginNode/CellLayout",this.node).addChild(node);    
  
            this.RegisterButtonEvent(node,this.ClickHandle,this,cell.key); 
        }); 
        find("OriginNode",this.node).setWorldPosition(this.mTouchUIPos);    
    }           
    
    onClose():void{     
        let nodeArr:Array<Node> = find("OriginNode/CellLayout",this.node).children;
        while(nodeArr.length > 0){
            _Facade.FindProxy(PoolProxy).Put(ePoolDefine.ButtomMenuCell,nodeArr[0]);
        } 
    }
 
    private ClickHandle(target:EventTouch,key:number):void{     
        if(eBottomType[key] == undefined)
            return;    
        _Facade.Send(eNotice.MultPanleOpen,2);
        _Facade.Send(eNotice.CloseBottomMenuLayer); 
    }
}       