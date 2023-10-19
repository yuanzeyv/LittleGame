import { sp } from "cc";
import { Biology, eBiologyDir } from "./Biology";
import { _Facade } from "../../../../Global";
import { BiologySatietyProxy, eSatietyStatus } from "../../BiologySatietyProxy/BiologySatietyProxy";


//生物动作枚举
export enum eBiologyAction{
    MoveAction,//移动状态
    TransDirAction,//转向状态
    HungerAction,//饥饿状态
    EatAction,//吃饭状态
    AgonalAction,//濒死状态
    DieAction,//死亡状态
} 
export abstract class AnimationStateMatchine{
    //进入状态
    public abstract OnEnter(biology:Biology);
    //动画播放结束
    public abstract OnAniPlayEnd(biology:Biology);
    //离开状态
    public abstract OnExit(biology:Biology); 
}