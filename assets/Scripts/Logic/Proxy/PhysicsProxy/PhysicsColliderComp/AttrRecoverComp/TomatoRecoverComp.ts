// import { XianTuDataMgr } from '../../../../DataMgrReg';
// import { eFinalAttrType } from '../../Define/AttrType';
// import { RoomVectorBase } from '../../PhysicsRigidBody/RoomPlayerBaseFactory/RoomVectorBase';
// import { RecoverComp } from './RecoverComp';
// export class TomatoRecoverComp extends RecoverComp{  
//     protected RefreshRecoverInfo():void{ 
//         if(!this.mRoomVectorBase.RoomBedBase.IsSleep())
//             return;
//         let tomatoRecoveryCount:number = this.Player.GetFinalAttr(eFinalAttrType.TomatoRecovery);//获取到回复数量
//         (this.Player.Parent.Parent as RoomVectorBase).AddTomatoCount(tomatoRecoveryCount);
//         XianTuDataMgr.PhysicsProxy.CoinYieldNotify(this.Player.ID,tomatoRecoveryCount);

//     }
// }         
