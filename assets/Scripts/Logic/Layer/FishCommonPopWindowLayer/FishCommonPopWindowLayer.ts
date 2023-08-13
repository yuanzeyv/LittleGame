import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar, sp, random, Label } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { NotificationEnum } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { FishSettingMediator } from '../../Mediator/FishSettingMediator/FishSettingMediator';
import { FishCommonPopWindowMediator } from '../../Mediator/FishCommonPopWindowMediator/FishCommonPopWindowMediator';
const { ccclass, property,type} = _decorator;
export interface ICommonData{
    title:string;
    desc:string;
    funcDesc:string;
    handleFunc:()=>void;
}
export class FishCommonPopWindowLayer extends BaseLayer {
    private mTitleLabel:Label;
    private mDescLabel:Label;
    private mFuncButton:Node;
    private mBackButton:Node;
    private mFuncLabel:Label;
    
    public InitNode(): void {
        this.mTitleLabel = find("TitleLabel",this.node).getComponent(Label);
        this.mDescLabel = find("TipsLabel",this.node).getComponent(Label);
        this.mFuncButton = find("FuncButton",this.node);
        this.mFuncButton = find("FuncButton",this.node);
        this.mFuncLabel = find("FuncButton/Label",this.node).getComponent(Label);
        this.mBackButton = find("QuitButton",this.node);
    }

    public InitData(data: ICommonData): void {
        this.mFuncButton.on("click",()=>{
            if(data.handleFunc)
                data.handleFunc();
        });
        this.mBackButton.on("click",()=>{
            _Facade.Send(NotificationEnum.CloseWindow,FishCommonPopWindowMediator.MediatorName);
        });
        this.mDescLabel.string = data.desc;
        this.mTitleLabel.string = data.title;
        this.mFuncLabel.string = data.funcDesc;
    }
}
