import {Color} from "cc";
import {NotificationHandle} from "../../../Frame/BaseMediator/BaseMediator";
import {WindowBaseMediator} from "../../../Frame/BaseMediator/WindowBaseMediator";
import {_Facade} from "../../../Global";
import {NotificationEnum} from "../../../NotificationTable";
import {WindowCreateRequest, LayerOrder} from "../../Proxy/WindowProxy/Class";
import { BaseLayer } from "../../../Frame/BaseLayer/BaseLayer";
import { SelectPassLayer } from "../../Layer/SelectPassLayer/SelectPassLayer";

export class SelectPassMediator extends WindowBaseMediator {
    static get MediatorName() {
        return "SelectPassMediator";
    }

    RegisterNotification(notificationMap: Map<string, NotificationHandle>): void {
        notificationMap
            .set(NotificationEnum.PassSelectOpen, this.OpenLayer.bind(this))
            .set(NotificationEnum.UpdatePageCell, this.LayerHandle.bind(this))
            .set(NotificationEnum.UpdatePageCount, this.LayerHandle.bind(this));

            
    }

    protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "resources/Perfab/SelectPassLayer/SelectPassLayer";
    }
    protected InitLayerComponent(): new () => BaseLayer {
        return SelectPassLayer;
    }  
}
