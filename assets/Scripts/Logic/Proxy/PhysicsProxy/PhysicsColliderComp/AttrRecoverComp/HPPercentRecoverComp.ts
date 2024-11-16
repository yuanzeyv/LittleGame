// import { eFinalAttrType } from '../../Define/AttrType'; 
// import { RecoverComp } from './RecoverComp';
// export class HPPercentRecoverComp extends RecoverComp{  
//     protected RefreshRecoverInfo():void{ 
//         let replyPercent:number = Math.floor(this.Player.GetFinalAttr(eFinalAttrType.HPPercentRecovery)) ;//获取到回复数量
//         let maxHP:number = this.Player.GetFinalAttr(eFinalAttrType.MaxHP);//获取到最大血量
//         let nowHP:number = this.Player.GetFinalAttr(eFinalAttrType.HP);//获取到当前血量
//         if(nowHP == maxHP)
//             return;
//         let replyHP:number = Math.floor((replyPercent / 10000) * maxHP);
//         let finalHP:number = nowHP + replyHP > maxHP ? maxHP : nowHP + replyHP;
//         this.Player.SetFinalAttr(eFinalAttrType.HP,finalHP);
//     }
// }  