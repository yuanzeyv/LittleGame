import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, Label, find, tween, PageView, Vec2, UITransform, Size, Prefab, instantiate } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { LogInMeidator } from '../../Mediator/LogInMediator/LogInMeidator';
import { SelectPassMediator } from '../../Mediator/SelectPassMediator/SelectPassMediator';
import { PagePassProxy } from '../../Proxy/PagePassProxy/PagePassProxy';
import { ImageResProxy } from '../../Proxy/ResourceProxy/ImageResProxy';
import { PassCellPrefab } from './PassCellPrefab';
const { ccclass, property,type} = _decorator;
@ccclass('PassPagePrefab')
export class PassPagePrefab extends BaseLayer {
    @property({type:Prefab,displayName:"单元预制体"})
    private m_PageCellPrefab:Prefab;
    private m_PageIndex:number = 0;//当前是第几页
    SetPageIndex(index:number){
        this.m_PageIndex = index;
    }
    CreatePageCell(index:number){
        let pageCell:Node=  instantiate(this.m_PageCellPrefab);
        return pageCell;
    }
    InitNode(){
    }
    InitData(){
        let passCount:number = _Facade.FindProxy(PagePassProxy).GetPassCount();
        let startIndex:number = this.m_PageIndex * 20;
        let endIndex:number = this.m_PageIndex * 20 + 20;
        if(endIndex > passCount)
            endIndex = passCount;
        for(let i = 0;i < 20 ;i++){
            if(i+startIndex >= this.m_PageIndex * 20 + 20)
                return;
            let node:Node = find(`Cell${i + 1}`,this.node);
            let cellNode:Node = this.CreatePageCell(i+startIndex)
            let passCellPrefab:PassCellPrefab = cellNode.getComponent(PassCellPrefab);
            node.addChild(cellNode);
            passCellPrefab.Level = i + startIndex + 1; //Level从1开始计数
        }
    }
}



