import { sp } from "cc";
import { _Facade } from "../../../../../Global";
import { BiologySatietyProxy, eSatietyStatus } from "../../../BiologySatietyProxy/BiologySatietyProxy";
import { AnimationStateMatchine, eBiologyAction } from "../AnimationStateMatchine";
import { Biology, eBiologyDir } from "../Biology";

//移动动作状态机
export class MoveActionStateMachine extends AnimationStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
        let isHunger:boolean = _Facade.FindProxy(BiologySatietyProxy).GetBiologyStatus(biology.UUID) == eSatietyStatus.Hunger;
        let hungerArray:Array<string> = isHunger?new Array<string>("HungrySwim_Left","HungrySwim_Right"):new Array<string>("SwimNormal_Left","SwimNormal_Right");
        biology.GetSpine().setAnimation(0,biology.GetFaceDir() == eBiologyDir.LEFT?hungerArray[0]:hungerArray[1],true); 
        biology.GetSpine().setEndListener(undefined);
    }
    public OnAniPlayEnd(biology:Biology){
    }  
    //离开状态
    public OnExit(biology:Biology){ 
        biology.GetSpine().clearAnimation(); 
    } 
}
//改变方向状态机
export class TransDirActionStateMachine extends AnimationStateMatchine{  
    //进入状态  
    public OnEnter(biology:Biology){ 
        let isHunger:boolean = _Facade.FindProxy(BiologySatietyProxy).GetBiologyStatus(biology.UUID) == eSatietyStatus.Hunger;
        let hungerArray:Array<string> = isHunger?new Array<string>("HungryTurn_Left","HungryTurn_Right"):new Array<string>("NormalTurn_Left","NormalTurn_Right");
        biology.GetSpine().setEndListener((trask:sp.spine.TrackEntry)=>this.OnAniPlayEnd(biology));
        biology.GetSpine().setAnimation(0,biology.GetFaceDir() == eBiologyDir.LEFT?hungerArray[0]:hungerArray[1],true); 
    }
    public OnAniPlayEnd(biology:Biology){
        biology.GetSpine().setEndListener(undefined);
        biology.ChangeAinimalStateMatching(eBiologyAction.MoveAction);//重新设置为移动状态
    }
    //离开状态
    public OnExit(biology:Biology){
    }
}

//饥饿状态机
export class HungerActionStateMachine extends AnimationStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
    }
    public OnAniPlayEnd(biology:Biology){
    }
    //离开状态
    public OnExit(biology:Biology){
    }
}

//饥饿状态机
export class EatActionStateMachine extends AnimationStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
    }
    public OnAniPlayEnd(biology:Biology){
    }
    //离开状态
    public OnExit(biology:Biology){
    }
}

//濒死状态机
export class AgonalActionStateMachine extends AnimationStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
        let hungerArray:Array<string> = new Array<string>("Die_Left","Die_Right");
        biology.GetSpine().setEndListener(undefined);
        biology.GetSpine().setAnimation(0,biology.GetFaceDir() == eBiologyDir.LEFT?hungerArray[0]:hungerArray[1],false); 
    } 
     
    public OnAniPlayEnd(biology:Biology){
    } 
    //离开状态
    public OnExit(biology:Biology){
    }
}

//饥饿状态机
export class DieActionStateMachine extends AnimationStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
    }
    public OnAniPlayEnd(biology:Biology){
    }
    //离开状态
    public OnExit(biology:Biology){
    }
} 