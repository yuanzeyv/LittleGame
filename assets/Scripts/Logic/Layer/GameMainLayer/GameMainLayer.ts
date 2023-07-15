import {
    _decorator,
    Component,
    Node,
    BlockInputEvents,
    view,
    Sprite,
    Button,
    instantiate,
    RichText,
    Vec3,
    tween,
    UIOpacity,
    UITransform,
    director,
    Director,
    Tween,
    Label,
    find,
    Prefab
} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {NotificationEnum} from '../../../NotificationTable';
import {GameMainMediator} from '../../Mediator/GameMainMediator/GameMainMediator';
import {ImageResProxy} from '../../Proxy/ResourceProxy/ImageResProxy';
import {PagePassProxy, PassData} from "db://assets/Scripts/Logic/Proxy/PagePassProxy/PagePassProxy";
import {CardMap} from "db://assets/Scripts/CardConfig";
import {CardCellEffect} from "db://assets/Scripts/Frame/BaseControl/CardCellEffect";
import { ResouceProxy } from '../../Proxy/BundleProxy/ResouceProxy';

export class CardCell {
    m_Pos: Vec3;//卡牌的最终坐标
    m_Card: string;//麻将牌代码
    m_Selectable: boolean;//是否可选

    constructor(card: string, pos: Vec3, selectable: boolean) {
        this.m_Card = card;
        this.m_Pos = pos;
        this.m_Selectable = selectable
    }
}

const {ccclass, property, type} = _decorator;

@ccclass('GameMainLayer')
export class GameMainLayer extends BaseLayer {
    @property({type: Button, displayName: "返回按钮"})
    private m_BackButton: Button;
    @property({type: Button, displayName: "返回按钮"})
    private m_StartGameButton: Button;
    @property({type: Label, displayName: "关卡等级"})
    private m_LevelPassLabel: Label;
    @property({type: Node, displayName: "卡牌装载节点"})
    private m_MainGamePanel: Node;
    @property({type: Label, displayName: "问题描述节点"})
    private m_QuestionLabel: Label;
    @property({type: Node, displayName: "答案装载节点"})
    private m_AnswerPanel: Node;

    @property({type: Prefab, displayName: "卡牌预制体"})
    private m_CardCellPrefab: Prefab;
    @property({ type: Prefab, displayName: "失败对话框" })
    private m_FailedDialogPrefab: Prefab;

    private m_OffsetY: number = 500;
    private m_CardCellArray: Array<CardCell> = new Array<CardCell>();//装所有卡牌
    private m_OptionsCellArray: Array<CardCell> = new Array<CardCell>();//装所有卡牌

    private m_PassData: PassData;

    // public GetRandomInt(max: number) {
    //     return Math.floor(Math.random() * max);
    // }

	InitNode() {
		console.log("子组件数量="+this.node.children.length)
		this.node.children.forEach(v=>{
			console.log(v.name)
		})
        this.m_BackButton = find("ItemPanel/BackButton", this.node).getComponent(Button);
        this.m_StartGameButton = find("StartGameButton", this.node).getComponent(Button);
        this.m_LevelPassLabel = find("PassPanel/PassLabel", this.node).getComponent(Label);
        this.m_QuestionLabel = find("QuestionPanel/QuestionLabel", this.node).getComponent(Label);
        this.m_MainGamePanel = find("MainGamePanel", this.node);
        this.m_AnswerPanel = find("AnswerPanel", this.node);
    }

    InitData() {
        this.m_BackButton.node.on("click", this.ButtonBackHandle.bind(this));
        this.m_StartGameButton.node.on("click", this.StartGameHandle.bind(this));
        this.m_LevelPassLabel.string = `第${this.m_Custom}关`
        this.m_OffsetY = this.m_MainGamePanel.getComponent(UITransform).contentSize.height;

        let pagePassProxy: PagePassProxy = _Facade.FindProxy(PagePassProxy);
        this.m_PassData = pagePassProxy.GetPassData(this.m_Custom);
        this.m_QuestionLabel.string = this.m_PassData.m_Question;
        this.InitCardPos();
        this.CreateAllCard();
    }

    CreateAllCard() { 
        let MaxTime: number = 0.5;//总时间
        for (let cardCell of this.m_CardCellArray) {
            let card: Node = instantiate(this.m_CardCellPrefab);
            card.position = new Vec3(cardCell.m_Pos.x, cardCell.m_Pos.y + this.m_OffsetY);
            card.getComponent(CardCellEffect).Selectable = false
            this.m_MainGamePanel.addChild(card);
            this.CreateTweenAnim(card, Math.random() * MaxTime);

            let carImg = ''; //this.GetRandomInt(34) + 1

            if (cardCell.m_Card.indexOf('+') > 0) {//包含星号，说明是明牌
                carImg = CardMap[cardCell.m_Card.substring(0, 2)].img_b; //this.GetRandomInt(34) + 1
            } else {
                carImg = CardMap[cardCell.m_Card].img
            }
            _Facade.FindProxy(ResouceProxy).Load( card.getComponent(Sprite),`resources/Images/Public/Card/${carImg}/spriteFrame`,"spriteFrame"); 
        }
        for (let cardCell of this.m_OptionsCellArray) {
            let card: Node = instantiate(this.m_CardCellPrefab);
            card.position = new Vec3(cardCell.m_Pos.x, cardCell.m_Pos.y + this.m_OffsetY);
            card.getComponent(CardCellEffect).Selectable = true
            card.getComponent(CardCellEffect).Selected = false
            this.m_AnswerPanel.addChild(card);
            this.CreateTweenAnim(card, Math.random() * MaxTime);
            let carImg = CardMap[cardCell.m_Card].img
            _Facade.FindProxy(ResouceProxy).Load( card.getComponent(Sprite),`resources/Images/Public/Card/${carImg}/spriteFrame`,"spriteFrame"); 
        }

        let dialog: Node = instantiate(this.m_FailedDialogPrefab);
        dialog.position = new Vec3(0, 0);
        
        this.node.addChild(dialog);

        _Facade.Send(NotificationEnum.PlayAudioEffect, "resources/Sound/1");
    }

    //给节点创建一个Tween动画
    CreateTweenAnim(node: Node, time: number) {
        tween(node)
            .by(time, {position: new Vec3(0, -this.m_OffsetY, 0)}, {easing: "quintIn"})
            .start();
    }

    InitCardPos() {
        let size = this.m_PassData.m_Cards.length;
        let width = view.getVisibleSize().width;
        let leftPadding = 20;
        let perSize = (width - 40) / size
        this.m_PassData.m_Cards.forEach((card, index) => {
            this.m_CardCellArray.push(new CardCell(card, new Vec3(perSize * index + leftPadding, 0, 0), false));
        })
        size = this.m_PassData.m_Options.length;
        leftPadding = 60;
        perSize = (width - 120) / size
        if (perSize > 100) {
            perSize = 100;
            leftPadding = (width - perSize * size) / 2
        }

        this.m_PassData.m_Options.forEach((card, index) => {
            this.m_OptionsCellArray.push(new CardCell(card, new Vec3(perSize * index + leftPadding, 0, 0), true));
        })
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76* 0 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 1 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 2 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 3 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 4 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 5 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 6 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 7 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 8 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 9 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 10 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 11 + 10, 0, 0)));
        // this.m_CardCellArray.push(new CardCell(new Vec3(0.7 * 76 * 12 + 10, 0, 0)));
    }

    ButtonBackHandle() {
        _Facade.Send(NotificationEnum.CloseWindow, GameMainMediator.MediatorName);
        _Facade.Send(NotificationEnum.PassSelectOpen);
    }

    StartGameHandle() {
        this.m_MainGamePanel.destroyAllChildren();
        this.m_AnswerPanel.destroyAllChildren();
        this.CreateAllCard();
    }
}


