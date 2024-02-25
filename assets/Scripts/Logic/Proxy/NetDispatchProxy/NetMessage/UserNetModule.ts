// import { SystemType } from "../NetDispatchProxy";
// import { NetHandle, NetModule } from "../NetModule";
// //C_S
// export enum NetUserSystemC_S {
//     Request_UserInfo,
//     Request_UserSettingInfo, 
// }
// //S_C
// export enum NetUserSystemS_C{
//     Response_UserInfo,//响应用户信息
//     Request_UserSettingInfo,//响应用户设置信息
// }
// export interface UserInfo{
//     level:number;//用户的等级
//     name:string;//用户的名称
//     uid:number;//用户的uid
// }
// export interface UserSettingInfo{
//     soundSwitch:boolean;//音乐开关
//     soundEffSwitch:boolean;//音效开关
//     lowPowerSwitch:boolean;//低电源模式开关
//     manorNotify:boolean;//领地刷新提示
//     manorSolt:boolean;//领地资源抢夺提示
//     boxLevelNotify:boolean;//宝箱升级可减少cd的提示
//     boxLevelUpFinish:boolean;//宝箱升级完成的提示
// }
// //用于存储角色的基本数据
// export class UserNetModule extends NetModule{
//     InitSystemType():SystemType{
//         return SystemType.UserSystem;
//     }

//     //针对由服务端收到客户端消息的处理
//     RegisterNetMap(listenMap:Map<number,NetHandle>){
//         listenMap
//         .set(NetUserSystemS_C.Response_UserInfo,this.Response_UserInfoHandle.bind(this))
//         .set(NetUserSystemS_C.Request_UserSettingInfo,this.Response_UserSettingInfoHandle.bind(this));
//     }
    
//     Response_UserInfoHandle(data:any){
//         if(this.m_ExecuteObj.OnUserInfoHandle)
//             this.m_ExecuteObj.OnUserInfoHandle(data);
//     }

//     Response_UserSettingInfoHandle(data:any){
//         if(this.m_ExecuteObj.OnUserSettingInfoHandle)
//             this.m_ExecuteObj.OnUserSettingInfoHandle(data);
//     }
//     //发送用户信息
//     SendGetUserInfo(){
//         this.Send(NetUserSystemC_S.Request_UserInfo,{});
//     }

//     //发送用户设置信息
//     SendUserSettingInfo(){
//         this.Send(NetUserSystemC_S.Request_UserSettingInfo,{}); 
//     }
// }
