import {_Facade, _G} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _decorator } from 'cc';
const { ccclass, property,type} = _decorator;
@ccclass('BagLayer')
export class BagLayer extends BaseLayer {   
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
    } 
    
    InitNode() {  
    } 
    
    InitData() {     
    }    
    
    InitLayer() {      
    }           
    
    onClose():void{      
    } 
}