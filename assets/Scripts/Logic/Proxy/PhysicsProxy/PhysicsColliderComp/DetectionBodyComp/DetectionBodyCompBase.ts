// import { ePhysicsGoodsType } from '../../Define/PhysicsConst';
// import { ColliderBase } from '../../Physics/ColliderBase';
// import { PlayerBase } from '../../PhysicsRigidBody/PlayerBase'; 
// import { PhysicsCompBase } from '../PhysicsCompBase';
// import { ShapeCompBase } from '../ShapeCompBase';
// export class DetectionBodyCompBase extends ShapeCompBase{   
//     protected mViewRigdibody:Map<number,PlayerBase> = new Map<number,PlayerBase>();//当前观察到的敌人信息
//     protected mViewRigidBodyTypeMap:Map<ePhysicsGoodsType,Map<number,PlayerBase>> = new Map<ePhysicsGoodsType,Map<number,PlayerBase>>();//当前观察到的敌人信息
//     //开始碰撞回调   
//     public OnStartConcatCollider(playerBase:ColliderBase):void{    
//         if( this.mViewRigdibody.has(playerBase.Parent.ID))
//             console.log(`${(playerBase.RelevanceObj as PhysicsCompBase).Name} 玩家:${(playerBase.Parent.RelevanceObj as PlayerBase).Name} 再一次尝试进入${this.mPlayer.Name}视野`);
//         this.mViewRigdibody.set(playerBase.Parent.ID,playerBase.Parent.RelevanceObj as PlayerBase); 
//         //发送检测到检查者进入的消息
//         this.Player.DetectionPlayerBaseEnter((playerBase.Parent.RelevanceObj as PlayerBase),this.Config.subType);
//     }  
//     //结束碰撞回调  
//     public OnLeaveConcatCollider(playerBase:ColliderBase):void{ 
//         if( !this.mViewRigdibody.has(playerBase.Parent.ID))
//             console.log(`玩家:${(playerBase.Parent.RelevanceObj as PlayerBase).Name} 没有进入视野，却被告知尝试离开其中`); 
//         this.mViewRigdibody.delete(playerBase.Parent.ID);
//         //发送检测到检查者离开的消息
//         this.Player.DetectionPlayerBaseLeave((playerBase.Parent.RelevanceObj as PlayerBase),this.Config.subType);
//     } 
    
//     //判断 某一个ID是否在房间里 
//     public RigidBodyIsView(rigidID:number):boolean{
//         return this.mViewRigdibody.has(rigidID);
//     }  

//     //获取到当前视野范围内的玩家数量
//     public VisbleCount():number{  
//         return this.mViewRigdibody.size; 
//     }
    
//     //获取到视野范围内，距离自己的RigidBody最近的一名玩家
//     public GetNearPlayerBase():PlayerBase|undefined{ 
//         let optimalTarget:PlayerBase = undefined;
//         let distanceSqr:number = 0;
//         for(let cell of this.mViewRigdibody){
//             let cellDistanceSqr:number = this.Player.RigidBody.Position.subtract(cell[1].RigidBody.Position).lengthSqr();
//             if(!(optimalTarget == undefined || cellDistanceSqr < distanceSqr))
//                 continue;
//             optimalTarget = cell[1];
//             distanceSqr = cellDistanceSqr;
//         }
//         //没有找到最佳的攻击目标
//         if(optimalTarget == undefined)
//             return undefined;
//         return optimalTarget;
//     }
// }      