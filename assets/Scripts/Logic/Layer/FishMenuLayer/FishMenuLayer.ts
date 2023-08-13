import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar, sp, random, game } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { NotificationEnum, NotificationEnum as eNotificationEnum } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { FishMenuMediator } from '../../Mediator/FishMenuMediator/FishMenuMediator';
import { FishCommonPopWindowMediator } from '../../Mediator/FishCommonPopWindowMediator/FishCommonPopWindowMediator';
import { FishMainProxy } from '../../Proxy/FishMainProxy/FishMainProxy';
const { ccclass, property,type} = _decorator;
export class FishMenuLayer extends BaseLayer {
    private mTailSpine:sp.Skeleton;
    
    private mMoveButton:Node;//点击尾巴 运动
    private mStartButton:Node;//开始按钮
    private mSettingButton:Node;//设置按钮
    private mExitButton:Node;//退出按钮

    private mSoltCell:SoltCell;
    private mIsRunning:boolean = false;
    //加载文字进度条
    RegisterExecuteHandle(executeMap:Map<eNotificationEnum,LayerExecute> ){
    }

    InitNode() { 
        this.mStartButton = find("StartButton",this.node);
        this.mMoveButton = find("GameBG/MoveButton",this.node);
        this.mSettingButton = find("SettingButton",this.node);
        this.mExitButton = find("QuitButton",this.node);
         
        this.mTailSpine = find("GameBG/TailNode",this.node).getComponent(sp.Skeleton);
        this.mTailSpine.setCompleteListener(()=>{//播放完成时
            this.mIsRunning = false;//设置没有在播放
            this.PlayTailAnimation();//随机五秒再播放一次
        })
        this.mExitButton.on("click",()=>{
            _Facade.Send(eNotificationEnum.FishCommonLayerOpen,{title:"退出",desc:"停止游戏?",funcDesc:"退出",handleFunc:()=>{
                game.end();
            }});
        });
        this.mStartButton.on("click",()=>{
            _Facade.Send(NotificationEnum.FishMainGameLayerOpen)
        });
        
        this.mMoveButton.on("click",()=>{
            if(this.mIsRunning== true) return;
            this.PlayTailAnimation(0);//立即播放一次
        });

        this.mSettingButton.on("click",()=>{
            _Facade.Send(eNotificationEnum.FishSettingLayerOpen);
        });
        this.PlayTailAnimation();//默认开局播放一次
    }   

    private PlayTailAnimation(delay:number = 5000){
        this.mSoltCell?.Stop();//停止播放当前的动画
        this.mSoltCell = _G.TimeWheel.Set(delay * Math.random(),()=>{
            this.mIsRunning = true;
            this.mTailSpine.setAnimation(0,"WiggleTail",false);
        });
    }


    

    public InitLayer(): void { 
    }

 
    public CloseLayer(){
        this.mSoltCell.Stop();
        this.mSoltCell = undefined;
    }
}


