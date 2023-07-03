//本代理用于管理Banner广告
//广告有五种 原生 banner grid 插屏 视频
import { sys } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
export class BannerAdvertisingProxy extends BaseProxy{
    static get ProxyName():string { return "BannerAdvertisingProxy" };
    private mBannerWidth:number = 300;//bannerWidth广告的宽度
    private mBannerHeight:number = 80;//BannerHeight广告的高度
    private mBannerAD?:any;//Banner广告对象
    public onLoad(): void {
        if(sys.platform == sys.Platform.WECHAT_GAME){//平台等于微信，才会调用广告位置初始化
            this.InitAdvertising();
        }
    }

    private InitAdvertising():void{ // 创建 Banner 广告实例，提前初始化
        let wx:any = window["wx"];
        if(wx == undefined)//取消初始化
            return;  
        let winSize = wx.getSystemInfoSync();//获取像素size
        this.mBannerAD = wx.createBannerAd({
            adUnitId: '',//传入自己的id，此处为banner广告位ID
            adIntervals: 30,//定时刷新，最低30S
            style: {
                left: (winSize.windowWidth - this.mBannerWidth) / 2,
                top: winSize.windowHeight - this.mBannerHeight,
                width: this.mBannerWidth,
            }
        })
        //重新定banner位置
        this.mBannerAD.onResize((res) => {
            this.mBannerAD.style.top = winSize.windowHeight - this.mBannerAD.style.realHeight-1;
        })
		//拉取失败处理
        this.mBannerAD.onError(this.BannerADErrorHandle.bind(this));
    }

    private BannerADErrorHandle(error:string){
        _Facade.Send(NotificationEnum.M_TipsShow,error);//在弹出面板弹出广告加载失败的通知
    }

    public ShowBanner(){//显示Banner广告
        if(this.mBannerAD == undefined)
            return;
        this.mBannerAD.show();
    }

    public HideBanner(){//隐藏Banner广告
        if(this.mBannerAD == undefined)
            return;
        this.mBannerAD.hide();
    }

    //暂时不考虑销毁
}