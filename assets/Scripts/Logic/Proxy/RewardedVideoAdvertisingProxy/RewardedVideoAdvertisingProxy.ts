//本代理用于管理Banner广告
//广告有五种 原生 banner grid 插屏 视频
import { sys } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { NotificationEnum } from "../../../NotificationTable";
export class RewardedVideoAdvertisingProxy extends BaseProxy{
    static get ProxyName():string { return "RewardedVideoAdvertisingProxy" };
    private mVideoAd?:any;//Banner广告对象
    public onLoad(): void {
        if(sys.platform == sys.Platform.WECHAT_GAME){//平台等于微信，才会调用广告位置初始化
            this.InitAdvertising();
        }

    }

    private InitAdvertising():void{ // 创建 Banner 广告实例，提前初始化
        let wx:any = window["wx"];
        if(wx == undefined)//取消初始化
            return;  
        this.mVideoAd = wx.createRewardedVideoAd({
            adUnitId: ''//传入自己的id，此处为视频广告位ID
        });
		//拉取失败处理
        this.mVideoAd.onError(this.VideoADErrorHandle.bind(this));
        this.mVideoAd.onClose(this.VideoADUserCloseHandle.bind(this));
    }

    private VideoADErrorHandle(error:string){//错误回调
        _Facade.Send(NotificationEnum.M_TipsShow,error);//在弹出面板弹出广告加载失败的通知
    }

    private VideoADUserCloseHandle(data:any){//用户手动关闭回调
        //不清楚为什么要调用这一句
        //videoAdv.offClose();//需要清除回调，否则第N次广告会一次性给N个奖励
        if(data == undefined || data.isEnded == false){
            _Facade.Send(NotificationEnum.M_TipsShow,"广告未播放完成，无法获得奖励");//在弹出面板弹出广告加载失败的通知
            return;
        }
        //成功的情况下
        _Facade.Send(NotificationEnum.M_TipsShow,"恭喜您获得奖励");//在弹出面板弹出广告加载失败的通知
    }

    public ShowVideoAD(){//显示Banner广告
        if(this.mVideoAd == undefined){
            _Facade.Send(NotificationEnum.M_TipsShow,"激励视频没有被正确初始化");//在弹出面板弹出广告加载失败的通知
            return;
        }
        this.mVideoAd.show().catch(() => { 
            this.mVideoAd.load()
                .then(() => this.mVideoAd.show())
                .catch(err => { 
                    _Facade.Send(NotificationEnum.M_TipsShow,"激励广告播放失败");//在弹出面板弹出广告加载失败的通知
                })
        }) 
    }
} 