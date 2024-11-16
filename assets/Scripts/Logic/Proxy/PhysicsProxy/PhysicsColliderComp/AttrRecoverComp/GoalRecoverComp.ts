// import { XianTuDataMgr } from '../../../../DataMgrReg';
// import { eFinalAttrType } from '../../Define/AttrType';
// import { RoomVectorBase } from '../../PhysicsRigidBody/RoomPlayerBaseFactory/RoomVectorBase';
// import { RecoverComp } from './RecoverComp';

// export class GoalRecoverComp extends RecoverComp{     
//     protected RefreshRecoverInfo():void{ 
//         if(!this.mRoomVectorBase.RoomBedBase.IsSleep())
//             return;
//         let goldRecoveryCount:number = this.Player.GetFinalAttr(eFinalAttrType.GoldRecovery);//获取到回复数量
//         (this.Player.Parent.Parent as RoomVectorBase).AddGoldCount(goldRecoveryCount);
//         XianTuDataMgr.PhysicsProxy.GoldYieldNotify(this.Player.ID,goldRecoveryCount);
//     }
// }        