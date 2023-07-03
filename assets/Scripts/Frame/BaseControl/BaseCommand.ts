import { INotification, SimpleCommand } from "../PureMVC"

/**
 * 主要逻辑就是，程序通过通知者模式，传递数据给新建的Command. 他会对消息进行一次解包，将所有数据信息分开传给其他函数。
 */
export class BaseCommand extends SimpleCommand{
    constructor(){
        super();
    }

    Execute(body:any,name:string,notification:INotification){

    }
    execute(notify: INotification): void {
        this.Execute(notify.getBody(),notify.getName(),notify);//直接传入解析后的数据
    }
}
