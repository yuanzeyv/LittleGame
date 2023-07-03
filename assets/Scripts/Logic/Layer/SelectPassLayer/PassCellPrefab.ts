
import { _decorator, Label, Sprite, find } from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {NotificationEnum} from '../../../NotificationTable';
import { Resource } from '../../../Util/Resource/Resource';
import {LogInMeidator} from '../../Mediator/LogInMediator/LogInMeidator';
import {SelectPassMediator} from '../../Mediator/SelectPassMediator/SelectPassMediator';
import {PagePassProxy, PassData} from '../../Proxy/PagePassProxy/PagePassProxy';
import { PassDataStruct } from '../../Proxy/PagePassProxy/PassDataStruct';
import {ImageResProxy} from '../../Proxy/ResourceProxy/ImageResProxy';
import { UserDataProxy } from '../../Proxy/UserDataProxy/UserDataProxy';
const {ccclass, property, type} = _decorator;
@ccclass('PassCellPrefab')
export class PassCellPrefab extends BaseLayer {
    private m_LevelLabel: Label;
    private m_BackGourndSprite: Sprite;
    private m_LevelStartSprite: Array<Sprite> = new Array<Sprite>();
    private m_LevelAwardStartSprite: Array<Sprite> = new Array<Sprite>();
    private m_LevelUnAwardStartSprite: Array<Sprite> = new Array<Sprite>();

    //关卡序号（从0开始计数）
    private m_Level:number = 0;
    get Level() {return this.m_Level;}

    set Level(level: number) {
        this.m_Level = level;
        this.m_LevelLabel.string = this.m_Level.toString();
        this.UpdateCell();
    }

    InitNode(): void {
        this.m_LevelLabel = find("LevelLabel", this.node).getComponent(Label);
        this.m_BackGourndSprite = find("BGSprite", this.node).getComponent(Sprite);
        for (let i = 0; i < 3; i++){
            this.m_LevelStartSprite.push(find(`BGSprite/StarSprite_${i + 1}`, this.node).getComponent(Sprite));
            this.m_LevelAwardStartSprite.push(find(`BGSprite/StarSprite_${i + 1}/StarWin`, this.node).getComponent(Sprite));
            this.m_LevelUnAwardStartSprite.push(find(`BGSprite/StarSprite_${i + 1}/StarFail`, this.node).getComponent(Sprite));
        }
    }

    InitData(): void {
        this.node.on("click", this.TouchHandle.bind(this)); 
    }

    TouchHandle() {
        let pagePassProxy: PagePassProxy = _Facade.FindProxy(PagePassProxy); 
        let passData:PassData|undefined = pagePassProxy.GetPassData(this.Level);
        if(passData == undefined){//无数据的情况
            _Facade.Send(NotificationEnum.TipsWindowLayerOpen,"关卡数据读取错误，无法进入关卡");
            return;
        } 
        //如果当前的等级 大于了，通关进度加1
        if(!pagePassProxy.GetLevelCanGame(this.Level)){
            _Facade.Send(NotificationEnum.TipsWindowLayerOpen,"当前关卡无法进行,请由低到高通关!");
            return;
        } 
        let gameStruct:PassDataStruct|undefined = pagePassProxy.GenerateGameData(this.Level);
        if(gameStruct == undefined){
            _Facade.Send(NotificationEnum.M_TipsShow,"关卡数据生成失败，无法进入游戏");
            return; 
        }
        //组装一下游戏数据
        _Facade.Send(NotificationEnum.MainGameOpen,gameStruct);
    }

    UpdateCell() { 
        let pagePassProxy: PagePassProxy = _Facade.FindProxy(PagePassProxy);
        let passData:PassData|undefined = pagePassProxy.GetPassData(this.Level); 
        //关卡图片设置为默认
        Resource.Load("resources/Images/Private/PageSelectLayer/PassBGNoStart/spriteFrame", this.m_BackGourndSprite,"spriteFrame");
        for (let i = 0; i < 3; i++)
            this.m_LevelAwardStartSprite[i].node.active = false;
        for (let i = 0; i < 3; i++)
            this.m_LevelUnAwardStartSprite[i].node.active = false;
        //当前关卡要有数据 （并且前一个关卡要有数据，
        if(passData == undefined || !pagePassProxy.GetLevelCanGame(this.Level))//无数据的情况
            return;
        Resource.Load("resources/Images/Private/PageSelectLayer/PassBGStart/spriteFrame", this.m_BackGourndSprite, "spriteFrame");
        let passStarCount:number = _Facade.FindProxy(UserDataProxy).GetPassStar(this.m_Level) //获取到当前关卡的信息个数
        //星星显示
        for(let i = 0;i< 3;i++){
            if(passStarCount - 1 >= i)
                this.m_LevelAwardStartSprite[i].node.active = true;
            else
                this.m_LevelUnAwardStartSprite[i].node.active = true;
        }
    }
}


