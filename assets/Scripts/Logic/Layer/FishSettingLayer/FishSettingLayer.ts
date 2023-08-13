import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar, sp, random } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { NotificationEnum } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { FishSettingMediator } from '../../Mediator/FishSettingMediator/FishSettingMediator';
const { ccclass, property,type} = _decorator;
export class FishSettingLayer extends BaseLayer {
    private mExitButton:Node;

    public InitNode(): void {
        this.mExitButton = find("ButtonPanel/ExitButton",this.node);

        this.mExitButton.on("click",()=>{
            _Facade.Send(NotificationEnum.CloseWindow,FishSettingMediator.MediatorName);
        });
    }
}
