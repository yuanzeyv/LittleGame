// import { eFinalAttrType } from '../../Define/AttrType'; 
// import { RecoverComp } from './RecoverComp';
// export class HPRecoverComp extends RecoverComp{  
//     protected RefreshRecoverInfo():void{ 
//         let hpReply:number = this.Player.GetFinalAttr(eFinalAttrType.HPReply);//获取到回复数量
//         let nowHP:number = this.Player.GetFinalAttr(eFinalAttrType.HP);//获取到当前血量
//         let maxHP:number = this.Player.GetFinalAttr(eFinalAttrType.MaxHP);//获取到最大血量
//         let finalHP:number = nowHP + hpReply > maxHP ? maxHP : nowHP + hpReply;
//         this.Player.SetFinalAttr(eFinalAttrType.HP,finalHP);
//     }
// }  