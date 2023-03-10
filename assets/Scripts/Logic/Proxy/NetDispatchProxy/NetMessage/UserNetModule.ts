import { SystemType } from "../NetDispatchProxy";
import { NetHandle, NetModule } from "../NetModule";
//C_S
export enum NetUserSystemC_S {
    Request_UserInfo,
    Request_UserChangeName, 
}
//S_C
export enum NetUserSystemS_C{
    Response_UserInfo,//响应用户信息
    Response_UserChangeName,//响应用户设置信息
}
export interface IUserInfo{
    level:number;//用户的等级
    name:string;//用户的名称
    uid:number;//用户的uid
} 
//用于存储角色的基本数据
export class UserNetModule extends NetModule{
    InitSystemType():SystemType{
        return SystemType.UserSystem;
    }

    //针对由服务端收到客户端消息的处理 
    RegisterNetMap(listenMap:Map<number,NetHandle>){
        listenMap
        .set(NetUserSystemS_C.Response_UserInfo,this.Response_UserInfoHandle.bind(this))
        .set(NetUserSystemS_C.Response_UserChangeName,this.Response_UserChangeNameHandle.bind(this));
    }
    
    Response_UserInfoHandle(data:any){
        if(this.m_ExecuteObj.OnUserInfoHandle)
            this.m_ExecuteObj.OnUserInfoHandle(data);
    }

    Response_UserChangeNameHandle(data:any){
        if(this.m_ExecuteObj.OnUserChangeNameHandle)
            this.m_ExecuteObj.OnUserChangeNameHandle(data);
    }
    //发送用户信息
    SendGetUserInfo(){
        this.Send(NetUserSystemC_S.Request_UserInfo,{});
    }

    //发送用户设置信息
    SendChangeName(name:string){
        this.Send(NetUserSystemC_S.Request_UserChangeName,name); 
    }
}
