import { RigidBody2D, random, Vec2 } from "cc";
import { _Facade } from "../../../../../Global";
import { eSatietyStatus } from "../../../BiologySatietyProxy/BiologySatietyProxy";
import { GameInning } from "../../FishGame";
import { FishMainProxy } from "../../FishMainProxy"; 
import { eBiologyAction } from "../AnimationStateMatchine";
import { Biology, eBiologyDir } from "../Biology";
import { ActionStateMatchine, eBiologyState } from "../ActionStateMatchine";

//新生的小鱼
export class NewlyBornBiologyStateMachine extends ActionStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
        super.OnEnter(biology);
        biology.ChangeAinimalStateMatching(eBiologyAction.MoveAction);//进入移动状态
    }  
    //离开状态
    public OnExit(biology:Biology){
    }
    
    //吃食物
    public EatFood(biology:Biology,foodID:number){
    }
    //饥饿状态改变
    public ChangeHungerStatus(biology:Biology,status:eSatietyStatus){
        if(status == eSatietyStatus.Hunger){
            biology.ChangeStateStateMatching(eBiologyState.HungerState);
        }else if (status == eSatietyStatus.ArticuloMortis){ 
            biology.ChangeStateStateMatching(eBiologyState.AgonalState);
        }
    }  
    //计算移动坐标接口
    public CalcMovePos(biology:Biology){   
        let gameInning:GameInning= _Facade.FindProxy(FishMainProxy).GetGameInning()
        biology.SetPosition(Math.random() *  gameInning.MapSize.x,gameInning.MapSize.y);//初始化小鱼的坐标 
        let xOffset:number = (Math.random() * 60 - 30);
        biology.SetFaceDir(xOffset > 0 ? eBiologyDir.RIGHT:eBiologyDir.LEFT);//初始化小鱼的朝向
        biology.SetEndPoint(biology.GetPosition().x + (Math.random() * 60 - 30), (Math.random() * 80 )+ (gameInning.MapSize.y - 120));//初始化小鱼的朝向
    } 
    public MoveEnd(biology:Biology):boolean{   
        let rigidBody:RigidBody2D = biology.Rigebody; 
        if(biology["isEnter"]){  
            rigidBody.linearDamping = 1;   
            biology.ChangeStateStateMatching(eBiologyState.MoveState); 
            return;
        }  
        biology["isEnter"] = true;     
        rigidBody.linearDamping = 8;  
        biology.SetEndPoint(biology.GetPosition().x, biology.GetPosition().y + (random() * 20 ) + 10);//初始化小鱼的朝向
        return;
    }
    //移动接口 
    public Move(biology:Biology){ 
        let rigidBody:RigidBody2D = biology.Rigebody;
        let fishPos:Vec2 = biology.GetPosition();  
        let movePos:Vec2 = biology.EndPoint;//获取到小鱼的移动方向
        movePos.subtract(fishPos);
        movePos.multiplyScalar(rigidBody.getMass());//移动向量赋予速度
        rigidBody.applyForceToCenter(movePos,true);   
    }       
    //更新接口
    public Update(biology:Biology){ 
        this.Move(biology);  
        if(biology.GetResidueDistance() <= 5)
            this.MoveEnd(biology); 
    } 
} 

 //移动状态
export class MoveStateStateMachine extends ActionStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){ 
        let gameInning:GameInning= _Facade.FindProxy(FishMainProxy).GetGameInning();
        biology.SetEndPoint(Math.random() * gameInning.MapSize.x, Math.random() * gameInning.MapSize.y);//初始化小鱼的朝向
        //首先判断是否进入转向状态
        let dir:eBiologyDir = biology.GetEndPoint().x - biology.GetPosition().x < 0 ? eBiologyDir.LEFT:eBiologyDir.RIGHT;
        if(dir != biology.GetFaceDir()){ 
            biology.SetFaceDir(dir);//设置小鱼朝向
            biology.ChangeAinimalStateMatching(eBiologyAction.TransDirAction);//进入移动状态
        } else
            biology.ChangeAinimalStateMatching(eBiologyAction.MoveAction);//进入移动状态
    } 
    public OnExit(biology:Biology){
    } 
    
    //吃食物
    public EatFood(biology:Biology,foodID:number){
    } 
    //计算移动坐标接口
    public CalcMovePos(biology:Biology){
    }
    //移动接口 
    public MoveEnd(biology:Biology):boolean{
        //改变状态为移动状态 
        biology.ChangeStateStateMatching(eBiologyState.MoveState);//继续进行移动状态
        return;
    }  
    //饥饿状态改变
    public ChangeHungerStatus(biology:Biology,status:eSatietyStatus){
        if(status == eSatietyStatus.Hunger){
            biology.ChangeStateStateMatching(eBiologyState.HungerState);
        }else if (status == eSatietyStatus.ArticuloMortis){
            biology.ChangeStateStateMatching(eBiologyState.AgonalState);
        }
    }
}

//饥饿状态
export class HungerStateStateMachine extends ActionStateMatchine{
    //进入状态
    public OnEnter(biology:Biology){
        let gameInning:GameInning= _Facade.FindProxy(FishMainProxy).GetGameInning();
        biology.SetEndPoint(Math.random() * gameInning.MapSize.x, Math.random() * gameInning.MapSize.y);//初始化小鱼的朝向
        //首先判断是否进入转向状态
        let dir:eBiologyDir = biology.GetEndPoint().x - biology.GetPosition().x < 0 ? eBiologyDir.LEFT:eBiologyDir.RIGHT;
        if(dir != biology.GetFaceDir()){ 
            biology.SetFaceDir(dir);//设置小鱼朝向
            biology.ChangeAinimalStateMatching(eBiologyAction.TransDirAction);//进入移动状态
        } else
            biology.ChangeAinimalStateMatching(eBiologyAction.MoveAction);//进入移动状态
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
    
    public MoveEnd(biology:Biology):boolean{
        biology.ChangeStateStateMatching(eBiologyState.HungerState);
        return;
    }  
    //饥饿状态改变
    public ChangeHungerStatus(biology:Biology,status:eSatietyStatus){
        if(status == eSatietyStatus.FullStomach){ 
            biology.ChangeStateStateMatching(eBiologyState.MoveState);
        }else if (status == eSatietyStatus.ArticuloMortis){
            biology.ChangeStateStateMatching(eBiologyState.AgonalState);
        }
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
//濒死状态
export class AgonalStateStateMachine extends ActionStateMatchine{ 
    //进入状态
    public OnEnter(biology:Biology){ 
        let gameInning:GameInning= _Facade.FindProxy(FishMainProxy).GetGameInning();
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