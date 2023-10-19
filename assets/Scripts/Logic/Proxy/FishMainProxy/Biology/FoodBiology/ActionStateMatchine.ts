import { RigidBody2D, random, Vec2 } from "cc";
import { _Facade } from "../../../../../Global";
import { eSatietyStatus } from "../../../BiologySatietyProxy/BiologySatietyProxy";
import { GameInning } from "../../FishGame";
import { FishMainProxy } from "../../FishMainProxy"; 
import { eBiologyAction } from "../AnimationStateMatchine";
import { Biology, eBiologyDir } from "../Biology";
import { ActionStateMatchine, eBiologyState } from "../ActionStateMatchine";

 //移动状态
export class MoveStateStateMachine extends ActionStateMatchine{
        //进入状态
        public OnEnter(biology:Biology){  
            let rigidBody:RigidBody2D = biology.Rigebody;
            rigidBody.linearDamping = 0;
            biology.SetEndPoint(biology.GetPosition().x, 70);//初始化小鱼的朝向 
            biology.ChangeAinimalStateMatching(eBiologyAction.AgonalAction);//进入濒死状态
        }
        //离开状态
        public OnExit(biology:Biology){
        }
        
        //吃食物
        public EatFood(biology:Biology,foodID:number){
        }
        //计算移动坐标接口
        public CalcMovePos(biology:Biology){
        } 
        //移动到指定位置时
        public MoveEnd(biology:Biology):boolean{ 
            //改变状态为移动状态 
            biology.ChangeStateStateMatching(eBiologyState.DieState);
            return;
        }
        //饥饿状态改变
        public ChangeHungerStatus(biology:Biology,status:eSatietyStatus){ 
        }
}


//死亡状态
export class DieStateStateMachine extends ActionStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){ 
        biology.SetEndPoint(biology.GetPosition().x,40);//初始化小鱼的朝向
        biology.ChangeAinimalStateMatching(eBiologyAction.EatAction);//进入濒死状态
    }
    //离开状态 
    public OnExit(biology:Biology){ 
    }
     
    //吃食物
    public EatFood(biology:Biology,foodID:number){
    } 
    //计算移动坐标接口
    public CalcMovePos(biology:Biology){ 
    }
    //移动接口
    public Move(biology:Biology){
        
    }
    public MoveEnd(biology:Biology):boolean{
        let rigidBody:RigidBody2D = biology.Rigebody;
        rigidBody.linearDamping = 50;
        return; 
    }
    //饥饿状态改变
    public ChangeHungerStatus(biology:Biology,status:eSatietyStatus){ 
    }
}