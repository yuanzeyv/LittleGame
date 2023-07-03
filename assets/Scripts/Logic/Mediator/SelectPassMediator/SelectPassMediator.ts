import {Color} from "cc";
import {NotificationHandle} from "../../../Frame/BaseMediator/BaseMediator";
import {WindowBaseMediator} from "../../../Frame/BaseMediator/WindowBaseMediator";
import {_Facade} from "../../../Global";
import {NotificationEnum} from "../../../NotificationTable";
import {WindowCreateRequest, LayerOrder} from "../../Proxy/WindowProxy/Class";

export class SelectPassMediator extends WindowBaseMediator {
    static get MediatorName() {
        return "SelectPassMediator";
    }

    RegisterNotification(notificationMap: Map<string, NotificationHandle>): void {
        notificationMap
            .set(NotificationEnum.PassSelectOpen, this.PassSelectOpenHandle.bind(this))
            .set(NotificationEnum.UpdatePageCell, this.LayerHandle.bind(this))
            .set(NotificationEnum.UpdatePageCount, this.LayerHandle.bind(this));

            
    }

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/SelectPassLayer/SelectPassLayer";
    }

    PassSelectOpenHandle(data: any) {
        if (this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest: WindowCreateRequest = new WindowCreateRequest(this, data, LayerOrder.MinBottom);//创建一个window请求
        windowRequest.SetFullScreenMask(true, false, new Color(0, 128, 25, 255));
        windowRequest.SetWindowTouchMask(true);
        _Facade.Send(NotificationEnum.CreateWindow, windowRequest);//创建一个window请求
    } 
}
