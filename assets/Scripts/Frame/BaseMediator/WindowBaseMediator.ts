import { Color } from "cc";
import { WindowInterface } from "../../Compoment/WindowInterface";
import { INotification } from "../PureMVC";
import { eNotificationEnum } from "../../NotificationTable";
import { BaseMediator } from "./BaseMediator"; 
import { _Facade } from "../../Global";
import { WindowCreateRequest, LayerOrder } from "../../Logic/Proxy/WindowProxy/Class";
import { BaseLayer } from "../BaseLayer/BaseLayer";
import { WindowProxy } from "../../Logic/Proxy/WindowProxy/WindowProxy";
import { ParaseUrl } from "../../Util/Util";
export  abstract class WindowBaseMediator extends BaseMediator {
    private mResourcePathSet:Set<string> = new Set<string>();//获取到初始资源列表 
    //预制体资源 及 路径
    private mPrefabPath:{path:string,bundle:string};//获取到预制体路径
    private mLayerCompnent:new ()=>BaseLayer;//获取到预制体类型
    //窗口资源关联组件
    private m_WindowInterface:WindowInterface; //界面关联的组件
    public get WindowInterface():WindowInterface{ return this.m_WindowInterface; }
    public set WindowInterface(window:WindowInterface){ this.m_WindowInterface = window; }
    //界面资源需要绑定的一些UI资源文件目录，默认在资源未加载完成时，界面是不会被打开的
    protected InitResourcePathSet(resourceSet:Set<string>):void{ }
    public GetResourceArray():{bundleName:string,dirName:string}[]{
        let ret:Array<{bundleName:string,dirName:string}> = new Array<{bundleName:string,dirName:string}>();
        for(let cell of this.mResourcePathSet){
            let parase:{bundleName:string,url:string} = ParaseUrl(cell)
            ret.push({dirName:parase.url,bundleName:parase.bundleName});
        }
        return ret;
    }
    /*界面内的一些必要参数*/
    protected abstract InitPrefabInfo():{path:string,layerConst:new ()=>BaseLayer};
    public WindowOrder():LayerOrder{ return LayerOrder.MinBottom; }  
    protected GetWindowParam():{fullScrenMask:boolean,touchClose:boolean,openBg:boolean,bgColor:Color,showLoading:boolean,windowBlock:boolean}{
        return {fullScrenMask:false,touchClose:false,openBg:false,bgColor:new Color(0,0,0,0),showLoading:true,windowBlock:true};
    }
    //是否显示资源加载信息界面 
    protected ShowResourceLoadInfo():boolean{ return true; }

    protected InitWindow():void{
        this.InitResourcePathSet(this.mResourcePathSet);
        let prefabInfo:{path:string,layerConst:new ()=>BaseLayer}|undefined = this.InitPrefabInfo();
        let realPath:{bundleName:string,url:string}  = ParaseUrl(prefabInfo.path);
        this.mPrefabPath = {path:realPath.url,bundle:realPath.bundleName};
        this.mLayerCompnent = prefabInfo?.layerConst; 
    }
    public GetPrefabPath():{path:string,bundle:string}{
        return this.mPrefabPath;
    }
    public GetPrefabComponent():new ()=>BaseLayer{
        return this.mLayerCompnent;
    }

    onRegister(): void {
        this.InitWindow(); 
    }

    LayerHandle(body:any,notification:INotification){
        if(!this.WindowInterface)//窗口不存在直接关闭
            return;
        this.m_WindowInterface.ExcuteNotify(notification);
    }

    protected OpenLayer(data:any){//打开一个界面
        if(this.WindowInterface) return; //默认情况下一个窗口只能够被打开一次
        let layerParam:{fullScrenMask:boolean,touchClose:boolean,openBg:boolean,bgColor:Color,showLoading:boolean,windowBlock:boolean} = this.GetWindowParam();
        //发送一个窗口创建请求，以创建本窗口
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data);//创建一个window请求
        windowRequest.SetFullScreenMask(layerParam.fullScrenMask,layerParam.touchClose);   
        windowRequest.SetFullScreenBackGround(layerParam.openBg,layerParam.bgColor);    
        windowRequest.SetIsLoadingShow(layerParam.showLoading);
        windowRequest.SetWindowTouchBlock(layerParam.windowBlock);
        _Facade.FindProxy(WindowProxy).CreateWindow(windowRequest,this.mLayerCompnent);//直接进行窗口创建 
    } 

    //关闭本界面
    protected CloseLayer(data:any){
        _Facade.Send(eNotificationEnum.CloseWindow,this.getMediatorName());
    }
}
