/**
 * 原来的Mediator的注册和监听，会造成程序的代码冗余，这里直接使用Map将对应的监听消息 与 监听回调进行保存，放在频繁重写代码造成代码冗余，与减少编程过程中的低级错误。
 */
import { INotification, Mediator } from "../../Frame/PureMVC";
import { _Facade} from "../../Global";
export type NotificationHandle = (data:any,notification:INotification)=>void;
export class BaseMediator extends Mediator{
    private m_NotificationMap:Map<string,NotificationHandle> = new Map<string,NotificationHandle>();
    RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{}
    listNotificationInterests(): string[] {
        this.RegisterNotification(this.m_NotificationMap);
        let listenArray:Array<string> = new Array<string>();
        this.m_NotificationMap.forEach((v:NotificationHandle,k:string)=>{
            v.bind(this);
            listenArray.push(k);
        });
        return listenArray;
    }

    handleNotification(notification: INotification): void {
        let handleName:string = notification.getName();
        let handleFunc:NotificationHandle|undefined = this.m_NotificationMap.get(handleName);
        if( handleFunc == undefined ) {
           console.warn("The message was not implemented");//打印消息没有被实现
            return;
        }
        handleFunc(notification.getBody(),notification);
    }
}
