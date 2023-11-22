import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, instantiate, RichText, Vec3, tween, UIOpacity, UITransform, director, Director, Tween, find, EventTouch, Input, math, ProgressBar, sp, random, game } from 'cc';
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { eNotificationEnum, eNotificationEnum as eNotificationEnum } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { FishMenuMediator } from '../../Mediator/FishMenuMediator/FishMenuMediator';
import { FishCommonPopWindowMediator } from '../../Mediator/FishCommonPopWindowMediator/FishCommonPopWindowMediator';
import { FishMainProxy } from '../../Proxy/FishMainProxy/FishMainProxy';
import { MusicProxy } from '../../Proxy/MusicProxy/MusicProxy';
const { ccclass, property,type} = _decorator;
export class FishMenuLayer extends BaseLayer {
    private mTailSpine:sp.Skeleton;
    private mMoveButton:Node;//点击尾巴 运动
    private mStartButton:Node;//开始按钮
    private mSettingButton:Node;//设置按钮
    private mExitButton:Node;//退出按钮
    private mFightTimeButton:Node;//计时按钮

    private mSoltCell:SoltCell;
    private mIsRunning:boolean = false;
    //加载文字进度条
    RegisterExecuteHandle(executeMap:Map<eNotificationEnum,LayerExecute> ){
    }

    TimeTrialButton
    InitNode() { 
        this.mStartButton = find("StartButton",this.node);
        this.mMoveButton = find("GameBG/MoveButton",this.node);
        this.mSettingButton = find("SettingButton",this.node);
        this.mExitButton = find("QuitButton",this.node);
        this.mFightTimeButton = find("TimeTrialButton",this.node);
         
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
            _G.Facade.FindProxy(MusicProxy).Play(2);
            _Facade.Send(eNotificationEnum.FishChoosePetsLayerOpen);
        });
         
        this.mMoveButton.on("click",()=>{
            if(this.mIsRunning== true) return;
            this.PlayTailAnimation(0);//立即播放一次
        });

        this.mSettingButton.on("click",()=>{
            _Facade.Send(eNotificationEnum.FishSettingLayerOpen);
        });

        this.RegisterButtonEvent<FishMenuLayer>(this.mFightTimeButton,"OpenFightLayer");
        this.PlayTailAnimation();//默认开局播放一次
    }   

    public PlayTailAnimation(delay:number = 5000){
        this.mSoltCell?.Stop();//停止播放当前的动画
        this.mSoltCell = _G.TimeWheel.Set(delay * Math.random(),()=>{
            this.mIsRunning = true;
            this.mTailSpine.setAnimation(0,"WiggleTail",false);
        });
    } 
 
    public OpenFightLayer(){ 
        _Facade.Send(eNotificationEnum.FightLayerOpen);
    }


    

    public InitLayer(): void { 
    }

 
    public Close(){
        this.mSoltCell.Stop();
        this.mSoltCell = undefined;
    }
}


