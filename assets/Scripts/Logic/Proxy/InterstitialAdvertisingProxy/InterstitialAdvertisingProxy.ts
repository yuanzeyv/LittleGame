//本代理用于管理Banner广告
//广告有五种 原生 banner grid 插屏 视频
import { sys } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
export class InterstitialAdvertisingProxy extends BaseProxy{
    static get ProxyName():string { return "InterstitialAdvertisingProxy" };
    private mInterstitialAd?:any;//Banner广告对象
    public onLoad(): void {
        if(sys.platform == sys.Platform.WECHAT_GAME){//平台等于微信，才会调用广告位置初始化
            this.InitAdvertising();
        }
    }

    private InitAdvertising():void{ // 创建 Banner 广告实例，提前初始化
        let wx:any = window["wx"];
        if(wx == undefined)//取消初始化
            return;  
        this.mInterstitialAd = wx.createInterstitialAd({
            adUnitId: ''//传入自己的id，此处为视频广告位ID
        });
    } 

    public ShowIntersitialAD(){//显示Banner广告
        if(this.mInterstitialAd == undefined)
            return;
        this.mInterstitialAd.show().catch((error) => {
            _Facade.Send(eNotice.TipsShow,error);//在弹出面板弹出广告加载失败的通知
        })
    }
}