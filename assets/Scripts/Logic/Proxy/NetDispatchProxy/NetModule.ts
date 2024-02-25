// import { _Facade } from "../../../Global";
// import { NetProxy } from "../NetProxy/NetProxy";
// import { NetDispatchProxy, SystemType } from "./NetDispatchProxy";

// export type NetHandle = (data:any)=>void;
// export class NetModule{
//     private static BaseStep:number = 10000;
//     private static MixID:number = NetModule.BaseStep / 2;
//     private m_SystemType:SystemType = SystemType.Final;//当前系统的类型
//     private m_ListenMap:Map<number,NetHandle> = new Map<number,NetHandle>();//监听的函数列表
//     protected m_ExecuteObj:any;//这是一个执行对象
//     private m_NetProxy:NetProxy = _Facade.FindProxy(NetProxy);
//     private m_NetDispatchProxy:NetDispatchProxy = _Facade.FindProxy(NetDispatchProxy);
//     get SystemType():SystemType{
//         return this.m_SystemType;
//     }
//     get ListenMap():Map<number,NetHandle>{
//         return this.m_ListenMap;
//     }
//     constructor(executeObj:any){
//         this.m_SystemType = this.InitSystemType();
//         this.m_ExecuteObj = executeObj;
//         this.RegisterNetMap(this.m_ListenMap);
//         this.m_NetDispatchProxy.RegisterNetModule(this);
//     }

//     protected InitSystemType():SystemType{
//         return SystemType.Final;
//     }
//     get Name():string{
//         return ""; 
//     }
//     //针对由服务端收到客户端消息的处理
//     protected RegisterNetMap(listenMap:Map<number,NetHandle>){
//     }

//     //服务端向客户端发送消息的处理
//     Send(msgID:number,obj:Object){
//         this.m_NetProxy.SendMessage(this.GetRequestID(msgID),obj);
//     }
 
//     GetRequestID(id:number):number{
//         return this.m_SystemType * NetModule.BaseStep + id;
//     }
 
//     GetResponseID(id:number):number{
//         return this.m_SystemType * NetModule.BaseStep + NetModule.MixID + id;
//     }
// }