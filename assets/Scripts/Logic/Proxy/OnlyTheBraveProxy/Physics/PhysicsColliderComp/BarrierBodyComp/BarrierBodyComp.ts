import { eColliderCompType } from "../../../../PhysicsProxy/Define/ColliderConst";
import { eColliderType, ePlayerType } from "../../ColliderTypeDefine";
import { PhysicsCompBase } from "../../PhysicsCompBase";

export class BarrierBodyComp extends PhysicsCompBase{  
    //当前玩家碰撞到的碰撞器信息  
    public OnInit(){       
       this.SetColliderActiveEvent(true,false); 
       this.Colider.Sensor = false;    
       //墙体的话，身为中立碰撞单元
       //其与 敌人 与 英雄发生碰撞，确保敌人与英雄无法穿越障碍物
       //但是不会与普通中立物体进行碰撞 
       this.SetCollidersGroup( 
       ((1 << eColliderType.Neutrality) << 16) | 
       (1 << eColliderType.Detection)| (1 << eColliderType.Enemy)| (1 << eColliderType.Hero) 
       );
    }     
      
    public OnRemove(): void { 
    }
}     