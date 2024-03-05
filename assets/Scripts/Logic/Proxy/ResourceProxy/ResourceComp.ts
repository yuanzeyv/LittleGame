//对节点进行添加组件
//本组件用来保存所有对应的资源组件 和 key 
import { _decorator, Asset, Component, NodeEventType} from 'cc'; 
import { _Facade } from '../../../Global'; 
import { ResouceProxy, UseKey, UUID } from './ResouceProxy';
const { ccclass, property,type} = _decorator;
export class ResourceComp extends Component {//配合资源管理器，来动态管理资源加载
    //本处数据格式冗余
    private mLoadUUIDMap:Map<UUID,Map<Component,Map<UseKey,{waitLoad:boolean,finishHandle?:(comp:Component)=>void}>>> = new Map<UUID,Map<Component,Map<UseKey,{waitLoad:boolean,finishHandle:(comp:Component)=>void}>>>();//组件ID，变量key，资源UID
    private mLoadCompMap:Map<Component,Map<UseKey,UUID>> = new Map<Component,Map<UseKey,UUID>>();//组件ID，变量key，资源UID
    public onLoad(): void {
        this.node.on(NodeEventType.COMPONENT_REMOVED,this.ComponentRemoveHandle,this);
    } 
 
    //尝试通过资源UUID 组件 及 组件KEY删除一个资源的引用
    public UnLoadRes(resUUID:UUID,comp:Component,key:UseKey):void{
        let compMap:Map<Component,Map<UseKey,{waitLoad:boolean,finishHandle?:(comp:Component)=>void}>>|undefined = this.mLoadUUIDMap.get(resUUID);
        if(compMap == undefined) return;
        let keyMap:Map<UseKey,{waitLoad:boolean,finishHandle?:(comp:Component)=>void}>|undefined = compMap.get(comp);
        if(keyMap == undefined) return;
        let loadInfo:{waitLoad:boolean,finishHandle?:(comp:Component)=>void}|undefined = keyMap.get(key);
        if(loadInfo == undefined) return;
        if(loadInfo.waitLoad == false){//如果资源处于意见加载完成的话
            _Facade.FindProxy(ResouceProxy).DecResource(resUUID);//立即删除这个资源的引用
            comp[key] = undefined;//设置为空
        }
        //向回进行删除操作
        keyMap.delete(key);
        if(keyMap.size == 0){
            compMap.delete(comp);
            if(compMap.size == 0)
                this.mLoadUUIDMap.delete(resUUID);
        }
        //向回删除组件类型 
        let uuidCiteMap:Map<UseKey,UUID>|undefined = this.mLoadCompMap.get(comp);
        if(uuidCiteMap != undefined){
            uuidCiteMap.delete(key);
            if(uuidCiteMap.size == 0)
                this.mLoadCompMap.delete(comp);
        }
    }

    //尝试通过key获取到组件使用的资源UUID
    public GetCompCiteResByKey(comp:Component,key:UseKey):UUID|undefined{
        let uuidCiteMap:Map<UseKey,UUID>|undefined = this.mLoadCompMap.get(comp);
        if(uuidCiteMap == undefined) return undefined;
        return uuidCiteMap.get(key);
    }
     
    //加载完成了一个资源中
    public LoadingResFinish(resUUID:UUID,isSuccess:boolean):void{ 
        let compMap:Map<Component,Map<UseKey,{waitLoad:boolean,finishHandle?:(comp:Component)=>void}>>|undefined = this.mLoadUUIDMap.get(resUUID);//获取到组件信息
        compMap.forEach((value: Map<string, { waitLoad: boolean; finishHandle?: (comp: Component) => void; }>, compCell: Component)=>{
            value.forEach((data: { waitLoad: boolean; finishHandle?: (comp: Component) => void; }, key: string)=>{
                if(data.waitLoad == false) return;//没有加载的话
                if(isSuccess)
                    compCell[key] = _Facade.FindProxy(ResouceProxy).AddResource(resUUID);
                else    
                    this.UnLoadRes(resUUID,compCell,key);
            })
        });
    }

    //表示组件将加载一个资源
    public LoadRes(comp:Component,key:UseKey,resUUID:UUID,isLoad:boolean = false,finishHandle:(comp:Component)=>void = undefined):void{
        let useUUID:UUID|undefined = this.GetCompCiteResByKey(comp,key);//判断当前组件的Key是否正在使用资源 
        if(useUUID != undefined)//如果当前组件使用了资源
            this.UnLoadRes(useUUID,comp,key);//设置为不加载
        //创建UUID为索引的Key
        let allMap:Map<Component,Map<UseKey,{finishHandle?:(comp:Component)=>void,waitLoad:boolean}>>|undefined = this.mLoadUUIDMap.get(resUUID);//首先判断资源是否已经全部加载完成了
        if( allMap == undefined){
            allMap = new Map<Component,Map<UseKey,{finishHandle:(comp:Component)=>void,waitLoad:boolean}>>();
            this.mLoadUUIDMap.set(resUUID,allMap);
        }
        let useInfoMap:Map<UseKey,{finishHandle?:(comp:Component)=>void,waitLoad}>|undefined = allMap.get(comp);//判断对应的组件是否以前有加载过这个资源
        if( useInfoMap == undefined) {
            useInfoMap = new Map<UseKey,{finishHandle:(comp:Component)=>void,waitLoad}>();
            allMap.set(comp,useInfoMap);
        }
        useInfoMap.set(key,{waitLoad:isLoad,finishHandle:finishHandle});
        //创建Component为索引的Key
        let keyMap:Map<UseKey,UUID>|undefined = this.mLoadCompMap.get(comp);
        if(keyMap == undefined){
            keyMap = new Map<UseKey,UUID>();
            this.mLoadCompMap.set(comp,keyMap);
        }
        keyMap.set(key,resUUID);
        if(isLoad == false)
            comp[key] = _Facade.FindProxy(ResouceProxy).AddResource(resUUID);
 
    }
    
    //当节点收到destory消息的时候 
    protected onDestroy(): void { 
        this.node.off(NodeEventType.COMPONENT_REMOVED,this.ComponentRemoveHandle,this);
        let resouceProxy:ResouceProxy = _Facade.FindProxy(ResouceProxy);
        for(let cell of this.mLoadCompMap){
            let comp:Component = cell[0];
            for(let keyMap of cell[1]){
                comp[keyMap[0]] = undefined;//对变量进行赋值
                resouceProxy.DecResource(keyMap[1]);
            }
        }
    }

    //当节点收到组件移除的事件时
    protected ComponentRemoveHandle(a,b,c,d,e,f,g){
        //目标功能，对组件所绑定的所有的资源进行回收
        //删除此Comp下的所有引用
    } 
    
}