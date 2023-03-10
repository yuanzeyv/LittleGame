import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
import { ChangeNameLayer } from "../../Layer/ChangeNameLayer/ChangeNameLayer";
import { IUserInfo, UserNetModule } from "../NetDispatchProxy/NetMessage/UserNetModule";

export class UserInfo{
    public m_ID:number = -1;
    public m_Name:string = "";
}

export class UserProxy extends BaseProxy{
    private m_UserNetModule:UserNetModule = new UserNetModule(this);
    private m_UserInfo:UserInfo = new UserInfo();
    get NetModule():UserNetModule{ return this.m_UserNetModule; }
    get Name():string{return this.m_UserInfo.m_Name; }
    OnUserInfoHandle(data:IUserInfo){
        this.m_UserInfo.m_ID = data.uid;
        this.m_UserInfo.m_Name = data.name;
        if(this.m_UserInfo.m_Name == ""){//角色还未去名称，需要先取名称
            _Facade.Send(NotificationEnum.ChangeNameOpen);//打开取名界面
        }else{
            _Facade.Send(NotificationEnum.M_MainBoxLayerOpen); //打开主界面
            _Facade.Send(NotificationEnum.UserBaseOpen); //打开主界面的插件
            _Facade.Send(NotificationEnum.MainMenuOpen); //打开主界面的插件
        }
    }
    
    OnUserChangeNameHandle(name:string){
        this.m_UserInfo.m_Name = name;
        _Facade.Send(NotificationEnum.M_CloseWindow ,ChangeNameLayer.name);
        _Facade.Send(NotificationEnum.M_MainBoxLayerOpen); //打开主界面
        _Facade.Send(NotificationEnum.UserBaseOpen); //打开主界面的插件
        _Facade.Send(NotificationEnum.MainMenuOpen); //打开主界面的插件
    }
    
    SendChangeName(name:string):void{
        this.NetModule.SendChangeName(name);
    }
}