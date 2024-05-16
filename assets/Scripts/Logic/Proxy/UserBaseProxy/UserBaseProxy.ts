import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global"; 
import { eNetProtocol } from "../../../NetNotification";
import { NetWorkProxy } from "../NetWorkProxy/NetWorkProxy"; 
export interface IUserBaseData{
    Name:string;//玩家的名称
    SID:string;//玩家的名称
    HeadID:number;//玩家的头像信息
};
//游戏中的背包代理 
export class UserBaseProxy extends BaseProxy{ 
    static  get ProxyName():string { return "UserBaseProxy" };  
    public onLoad():void {
        _Facade.FindProxy(NetWorkProxy).RegisterNetHandle(eNetProtocol.SC_UserInfoInit,this.UserInfoInitHandle.bind(this));
    } 
    private UserInfoInitHandle(data:IUserBaseData):void{ 
        console.log(data);

    }
}   