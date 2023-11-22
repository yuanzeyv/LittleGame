import { _decorator, Component, Button, NodeEventType, EventTouch, Event, EventHandheld, EventHandler } from 'cc';
import { _Facade } from '../Global';
const { ccclass, property,type} = _decorator;
@ccclass('ClickComponent')
export class ClickComponent extends Component {
    private mClickListenMap:Map<Component,Map<(...args)=>void,(...args)=>void>> = new Map<Component,Map<(...args)=>void,(...args)=>void>>(); 
    //注册一个按钮事件
    public RegisterClick(target:Component,handle:(...args)=>void,...args):boolean{
        let listenMap:Map<(...args)=>void,(...args)=>void>|undefined = this.mClickListenMap.get(target);
        if(listenMap == undefined){
            listenMap = new Map<(...args)=>void,(...args)=>void>();
            this.mClickListenMap.set(target,listenMap);
        }
        if(listenMap.has(handle))//已经监听了相同的函数了
            return false;
        let button:Button|undefined = this.node.getComponent(Button);
        if(button == undefined)//添加一个Button按钮
            button = this.node.addComponent(Button);
        let executeFunc:(button:Button)=>void = (button:Button)=>{
            handle.bind(target)(button,args); 
        }; 
        listenMap.set(handle,executeFunc);
        this.node.on("click",executeFunc);
    }
    //反注册一个点击事件
    public UnRegisterClick(target:Component,handle:(...args)=>void):void{
        let listenMap:Map<(...args)=>void,(...args)=>void>|undefined = this.mClickListenMap.get(target);
        if(listenMap == undefined)//没有为此对象注册过按钮事件
            return;
        let listenHandle:(...args)=>void|undefined =  listenMap.get(handle);
        if(listenHandle)
            return;
        this.node.off("click",listenHandle);
        listenMap.delete(handle);
        if(listenMap.size == 0)
            this.mClickListenMap.delete(target);
    }
    protected onDestroy(): void {
        this.mClickListenMap.forEach((handleMap: Map<(...args: any[]) => void, (...args: any[]) => void>,key:Component)=>{
            handleMap.forEach((value: (...args: any[]) => void, key: (...args: any[]) => void)=>{
                this.node.off("click",value);
                handleMap.delete(key);
            });
            this.mClickListenMap.delete(key);
        });
    }
}