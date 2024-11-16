import { eColliderCompType } from "../../../../PhysicsProxy/Define/ColliderConst";
import { eColliderType, ePlayerType } from "../../ColliderTypeDefine";
import { PhysicsCompBase } from "../../PhysicsCompBase";

export class HeroBodyComp extends PhysicsCompBase{  
    //当前玩家碰撞到的碰撞器信息  
    public OnInit(){       
       this.SetColliderActiveEvent(true,false); 
       this.Colider.Sensor = false;    
       this.SetCollidersGroup( 
       ((1 << eColliderType.Hero) << 16) | 
       (1 << eColliderType.Detection) | (1 << eColliderType.Neutrality) 
       );
    }     
      
    public OnRemove(): void { 
    }
}     