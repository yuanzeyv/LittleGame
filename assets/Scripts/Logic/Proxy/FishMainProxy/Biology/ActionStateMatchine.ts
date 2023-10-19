import { _Facade, _G } from "../../../../Global";
import { Biology, eBiologyDir } from "./Biology";
import { GameInning } from "../FishGame";
import { FishMainProxy } from "../FishMainProxy"; 
import { eSatietyStatus } from "../../BiologySatietyProxy/BiologySatietyProxy";
import { BiologyAttrProxy, eAttrType } from "../../BiologyAttrProxy/BiologyAttrProxy";
import { RigidBody2D,Vec2 } from "cc"; 
import { random } from "cc"; 
//生物移动状态
export enum eBiologyState{
    NewlyBornState,//出生状态
    MoveState,//移动状态
    HungerState,//饥饿状态 
    DieState,//死亡状态 
    AgonalState,//濒死状态   
};

export abstract class ActionStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
        this.CalcMovePos(biology);
    }
    //离开状态
    public abstract OnExit(biology:Biology); 
    //饥饿状态改变
    public abstract ChangeHungerStatus(biology:Biology,status:eSatietyStatus);
    //吃食物
    public abstract EatFood(biology:Biology,foodID:number);  
    //计算移动坐标接口
    public abstract CalcMovePos(biology:Biology);
    //移动接口
    public Move(biology:Biology,mult:number = 1){
        let attrProxy:BiologyAttrProxy = _Facade.FindProxy(BiologyAttrProxy);
        let rigidBody:RigidBody2D = biology.Rigebody;
        let fishPos:Vec2 = biology.GetPosition(); 
        let movePos:Vec2 = biology.EndPoint;//获取到小鱼的移动方向
        movePos.subtract(fishPos);
        let speed:number = attrProxy.GetBiologyAttrByType(biology.UUID,eAttrType.Speed);
        let baseMult:number = 1;
        if(movePos.length() < (speed * 1.5))    
            baseMult = movePos.length() / (speed * 1.5);   
        movePos.normalize();//获取到小鱼移动的方向     
        movePos.multiplyScalar(speed * rigidBody.getMass() * baseMult * mult);//移动向量赋予速度 
        rigidBody.linearVelocity = new Vec2(0,0);
        rigidBody.applyLinearImpulseToCenter(movePos,true);  
    }   
    //移动结束判断  
    public abstract MoveEnd(biology:Biology):boolean;
    //更新接口
    public Update(biology:Biology){
        this.Move(biology);//小鱼移动接口
        if(biology.GetResidueDistance() <= 3)
            this.MoveEnd(biology); 
    }
}