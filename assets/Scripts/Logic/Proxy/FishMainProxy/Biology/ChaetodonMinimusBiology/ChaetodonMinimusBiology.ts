import { _decorator, Component ,Node } from 'cc'; 
import { Vec2 } from 'cc';
import { _Facade } from '../../../../../Global';
import { FishMainProxy } from '../../FishMainProxy';
import { Size } from 'cc';
import { GameInning } from '../../FishGame';
import { Biology } from '../Biology';
import { AnimationStateMatchine, eBiologyAction } from '../AnimationStateMatchine';
import { ActionStateMatchine, eBiologyState } from '../ActionStateMatchine';
import { AgonalActionStateMachine, DieActionStateMachine, EatActionStateMachine, HungerActionStateMachine, MoveActionStateMachine, TransDirActionStateMachine } from './AnimationStateMatchine';
import { AgonalStateStateMachine, DieStateStateMachine, HungerStateStateMachine, MoveStateStateMachine, NewlyBornBiologyStateMachine } from './ActionStateMatchine';
const { ccclass, property } = _decorator;


class StateFactory{
    private mChaetodonActionArray:Array<AnimationStateMatchine> = new Array<AnimationStateMatchine>();
    private mChaetodonStateArray:Array<ActionStateMatchine> = new Array<ActionStateMatchine>();
    public constructor(){
        //动画状态机添加
        this.mChaetodonActionArray[eBiologyAction.MoveAction] = new MoveActionStateMachine();
        this.mChaetodonActionArray[eBiologyAction.TransDirAction] = new TransDirActionStateMachine();
        this.mChaetodonActionArray[eBiologyAction.HungerAction] = new HungerActionStateMachine();
        this.mChaetodonActionArray[eBiologyAction.EatAction] = new EatActionStateMachine();
        this.mChaetodonActionArray[eBiologyAction.AgonalAction] = new AgonalActionStateMachine();
        this.mChaetodonActionArray[eBiologyAction.DieAction] = new DieActionStateMachine(); 
        //状态状态机添加
        this.mChaetodonStateArray[eBiologyState.AgonalState ] = new AgonalStateStateMachine();
        this.mChaetodonStateArray[eBiologyState.DieState] = new DieStateStateMachine();
        this.mChaetodonStateArray[eBiologyState.HungerState] = new HungerStateStateMachine(); 
        this.mChaetodonStateArray[eBiologyState.MoveState] = new MoveStateStateMachine();
        this.mChaetodonStateArray[eBiologyState.NewlyBornState] = new NewlyBornBiologyStateMachine();
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
export class ChaetodonMinimusBiology extends Biology { 
    public constructor(fishID:number,fishNode:Node){
        super(fishID,fishNode);
        this.ChangeStateStateMatching(eBiologyState.NewlyBornState);//游戏一开始设置小鱼为新生状态
        this.mFishNode.on("click",()=>{
            _Facade.FindProxy(FishMainProxy).GenerateFish();
        })
    }
    protected ObtainAinimationState(biologyAction: eBiologyAction): AnimationStateMatchine {
        return CStateFactory.ObtainAinimationState(biologyAction);
    }
    protected ObtainActionState(biologyState: eBiologyState): ActionStateMatchine {
        return CStateFactory.ObtainActionState(biologyState);
    }   
}