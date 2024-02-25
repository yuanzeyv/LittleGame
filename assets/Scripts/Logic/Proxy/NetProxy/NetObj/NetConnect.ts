// import { _Facade } from "../../../../Global";
// import { eNotificationEnum } from "../../../../NotificationTable";
// import { NetDispatchProxy } from "../../NetDispatchProxy/NetDispatchProxy";
// import { NetProxy } from "../NetProxy";
// import { NetCellBase } from "./NetCellBase";
// export interface MessageFormat {
//     ID:number;//消息的id
//     Data:any;//消息的详细数据
// }
// export class NetConnect extends NetCellBase{
//     private m_NetDispatchProxy:any = _Facade.FindProxy(NetDispatchProxy);  
//     //不可能走到这里
//     OpenHandle(ev: Event): void {
//         console.error("发生了一个错误，走到了一个永远也不会走到的地方");
//     }
//     CloseHandle(ev: CloseEvent): void {
//         let netProxy:NetProxy = _Facade.FindProxy(NetProxy); 
//         _Facade.Send(eNotificationEnum.M_NetDisConnect);//网络断开连接
//         netProxy.ClearNetCell();//将网络单元清除
//     }

//     ErrorHandle(ev: Event): void { 
//         this.m_WebSocket.close();//socket连接出现了异常，直接进行关闭
//     }

//     MessageHandle(ev: MessageEvent<any>): void { 
//         let data:string = ev.data;
//         var obj:MessageFormat = JSON.parse(data);//转换为字符串
//         if(obj.ID == undefined || typeof(obj.ID)  != "number" || obj.Data == undefined){
//             console.warn("接收到一条格式错误的消息" + data.toString());
//             return;
//         } 
//         //将消息派发至各个游戏系统之中
//         this.m_NetDispatchProxy.Execute(obj.ID,obj.Data);//执行这一个网络消息
//     }
// }