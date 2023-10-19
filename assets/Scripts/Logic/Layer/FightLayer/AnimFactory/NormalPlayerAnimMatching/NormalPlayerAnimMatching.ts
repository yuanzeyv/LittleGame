import { eFightAction } from "../../ActionFactory/BaseFightAction";
import { Player } from "../../FightLayer";
import { BaseFightAnim } from "../BaseFightAnim";
export class  NormalPlayerAnimMove extends BaseFightAnim{
    //进入时要做的事情
    public Enter(player:Player):void{
        player.PlayAnim("move"); 
    }
    //离开时要做的事情
    public Exit(player:Player):void{
    } 
}; 
export class  NormalPlayerAnimAttack extends BaseFightAnim{
    //进入时要做的事情 
    public Enter(player:Player):void{
        player.PlayAnim("att",false,()=>{
            player.ChangeActionStatus(eFightAction.SKILL);
            player.Enemy().ChangeActionStatus(eFightAction.BE_HIT);
        }); 
    }
    //离开时要做的事情
    public Exit(player:Player):void{  
    } 
};
export class NormalPlayerAnimSkill extends BaseFightAnim{
    //进入时要做的事情 
    public Enter(player:Player):void{
        player.PlayAnim("skill",false,()=>{
            player.Enemy().ChangeActionStatus(eFightAction.BE_HIT);
            player.ChangeActionStatus(eFightAction.IDLE);
        });   
    }
    //离开时要做的事情 
    public Exit(player:Player):void{  
    }  
};

export class  NormalPlayerAnimIdle extends BaseFightAnim{
    //进入时要做的事情
    public Enter(player:Player):void{
        player.PlayAnim("holdon"); 
    }
    //离开时要做的事情
    public Exit(player:Player):void{
    }  
};

export class  NormalPlayerAnimTeleport extends BaseFightAnim{
    //进入时要做的事情
    public Enter(player:Player):void{ 
    }
    //离开时要做的事情
    public Exit(player:Player):void{
    } 
};

export class  NormalPlayerAnimBeHit extends BaseFightAnim{
    //进入时要做的事情
    public Enter(player:Player):void{
        player.PlayAnim("behit",false); 
    } 
    //离开时要做的事情
    public Exit(player:Player):void{
    }   
};

export class  NormalPlayerAnimDie extends BaseFightAnim{
    //进入时要做的事情
    public Enter(player:Player):void{

    }
    //离开时要做的事情
    public Exit(player:Player):void{
    } 
};



