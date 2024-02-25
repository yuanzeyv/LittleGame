import {Proxy} from "../../Frame/PureMVC";
/**
 * 在原有的基础上，新加了一个onLoad方法，这个方法会在所有Proxy都加载完后，同意运行，可以更加方便的获取代理间的指针引用。
 */
export class BaseProxy extends Proxy{
    public constructor(proxyName:string = "" ){
        super(proxyName)
        this.Init();
    }
    //初始化方法，会在构造函数中调用
    public Init():void {}
    //将会在所有的代理加载完毕后，调用本函数，以便无视优先级，直接查询各个代理
    public onLoad(): void {}
}
