import { tween } from "cc";
import { eFightAnim } from "../../AnimFactory/BaseFightAnim";
import { Player } from "../../FightLayer";
import { BaseFightAction, eFightAction } from "../BaseFightAction";
import { Vec2 } from "cc";
import { Vec3 } from "cc";
export class  NormalPlayerActionMove extends BaseFightAction{
    //进入时要做的事情
    public Enter(player:Player):void{
        player.ChangeAnimStatus(eFightAnim.MOVE);
        tween(player.Node())
        .to(0.5,{worldPosition:new Vec3(player.Enemy().Node().worldPosition.x + 80,player.Enemy().Node().worldPosition.y) })
        .call(()=>{
            player.TriggerActionStatus(eFightAction.ATTACK);
        })
        .start();
    }
    //离开时要做的事情 
    public Exit(player:Player):void{
    } 

    protected TriggerAttack(player: Player): void {
        player.ChangeActionStatus(eFightAction.ATTACK);
    }
};

export class  NormalPlayerActionAttack extends BaseFightAction{
    //进入时要做的事情
    public Enter(player:Player):void{
        player.ChangeAnimStatus(eFightAnim.ATTACK);
    }
    //离开时要做的事情
    public Exit(player:Player):void{
    }
};

export class  NormalPlayerActionSkill extends BaseFightAction{
    //进入时要做的事情
    public Enter(player:Player):void{
        player.ChangeAnimStatus(eFightAnim.SKILL);
    }
    //离开时要做的事情
    public Exit(player:Player):void{
    }
};

//进入时要做的事情
export class  NormalPlayerActionIdle extends BaseFightAction{
    public Enter(player:Player):void{
        player.ChangeAnimStatus(eFightAnim.IDLE);
    }
    //离开时要做的事情
    public Exit(player:Player):void{ 
    }  

    //触发移动
    protected TriggerMove(player:Player):void{
         player.ChangeActionStatus(eFightAction.MOVE);
    }
};
 
export class  NormalPlayerActionTeleport extends BaseFightAction{
    //进入时要做的事情
    public Enter(player:Player):void{
    }
    //离开时要做的事情
    public Exit(player:Player):void{
    } 
};

export class  NormalPlayerActionBeHit extends BaseFightAction{
    //进入时要做的事情
    public Enter(player:Player):void{
        player.ChangeAnimStatus(eFightAnim.BE_HIT);
    }
    //离开时要做的事情
    public Exit(player:Player):void{
    }  
};

export class  NormalPlayerActionDie extends BaseFightAction{
    //进入时要做的事情
    public Enter(player:Player):void{

    }
    //离开时要做的事情
    public Exit(player:Player):void{
    } 
};