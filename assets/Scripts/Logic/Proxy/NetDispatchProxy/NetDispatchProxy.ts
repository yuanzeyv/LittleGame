import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { MessageFormat } from "../NetProxy/NetObj/NetConnect";
import { NetHandle, NetModule } from "./NetModule";
//每个系统会有一万的消息可使用
export enum SystemType{
    UserSystem = 1,//用户系统用
    Final = 9999,//不会用到的系统
};
export class NetDispatchProxy extends BaseProxy{ 
    private m_UserMap:Map<SystemType,NetModule> = new Map<SystemType,NetModule>();//一个网络模块
    private m_ClienthandleMap:Map<number,NetHandle> = new Map<number,NetHandle>();//网络模块中包含的网络回调
    public RegisterNetModule(netModule:NetModule){
        if(this.m_UserMap.has(netModule.SystemType))
            return;//已经注册过了
        this.m_UserMap.set(netModule.SystemType,netModule);
        netModule.ListenMap.forEach((handle:NetHandle,requestID:number)=>{
            this.m_ClienthandleMap.set(netModule.GetResponseID(requestID),handle);
        })
    }
    public UnRegisterNetModule(netModule:NetModule){
        this.m_UserMap.delete(netModule.SystemType);
        netModule.ListenMap.forEach((handle:NetHandle,requestID:number)=>{
            this.m_ClienthandleMap.delete(netModule.GetResponseID(requestID));
        })
    }
    Execute(msgID:number,data:any){ 
        let netHandle:NetHandle | undefined = this.m_ClienthandleMap.get(msgID);
        if( netHandle == undefined){
            console.info(`消息号:${msgID} 未注册执行函数`);
            return;
        }
        netHandle(data);
    } 
}  
