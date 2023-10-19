import { _decorator, Component ,Node } from 'cc'; 
import { Vec2 } from 'cc';
import { _Facade } from '../../../../../Global';
import { FishMainProxy } from '../../FishMainProxy';
import { Size } from 'cc';
import { GameInning } from '../../FishGame';
import { Biology } from '../Biology';
import { AnimationStateMatchine, eBiologyAction } from '../AnimationStateMatchine';
import { ActionStateMatchine, eBiologyState } from '../ActionStateMatchine';
import { DieStateStateMachine, MoveStateStateMachine } from './ActionStateMatchine';
const { ccclass, property } = _decorator;  


class StateFactory{
    private mChaetodonActionArray:Array<AnimationStateMatchine> = new Array<AnimationStateMatchine>();
    private mChaetodonStateArray:Array<ActionStateMatchine> = new Array<ActionStateMatchine>();
    public constructor(){
        //状态状态机添加
        this.mChaetodonStateArray[eBiologyState.MoveState] = new MoveStateStateMachine();
        this.mChaetodonStateArray[eBiologyState.DieState] = new DieStateStateMachine();
    } 
    public ObtainAinimationState(biologyAction: eBiologyAction): AnimationStateMatchine {
        return this.mChaetodonActionArray[biologyAction];
    }
    public ObtainActionState(biologyState: eBiologyState): ActionStateMatchine {
        return this.mChaetodonStateArray[biologyState];
    } 
}  
const CStateFactory:StateFactory = new StateFactory();
//蝴蝶鱼生物
export class FoodBiology extends Biology { 
    public constructor(fishID:number,fishNode:Node,pos:Vec2){
        super(fishID,fishNode); 
        this.SetPosition(pos.x,pos.y);//重新设置当前的移动坐标
        this.ChangeStateStateMatching(eBiologyState.MoveState);//游戏一开始设置小鱼为新生状态 
    }
    protected ObtainAinimationState(biologyAction: eBiologyAction): AnimationStateMatchine {
        return CStateFactory.ObtainAinimationState(biologyAction);
    }
    protected ObtainActionState(biologyState: eBiologyState): ActionStateMatchine {
        return CStateFactory.ObtainActionState(biologyState);
    }   
}