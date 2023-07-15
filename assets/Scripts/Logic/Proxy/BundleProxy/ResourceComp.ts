//目前已知 常用的资源有 
/*
图片   通过记录 spriteFrame 
音乐   待定
音效   待定
Spine动画  通过记录 spriteFrame
行为树     
JsonFile   通过记录
TiledMap
帧动画
Animation
预制体


对象池不需要考虑 ，因为包含的节点确实没有被引用
*/
//对节点进行添加组件
//本组件用来保存所有对应的资源组件 和 key 
import { _decorator, Component} from 'cc'; 
import { _Facade } from '../../../Global'; 
import { ResouceProxy, UseKey, UUID } from './ResouceProxy';
const { ccclass, property,type} = _decorator;
@ccclass('GameMenuLayer')
export class ResourceComp extends Component {//配合资源管理器，来动态管理资源加载
    private mLoadMap:Map<UUID,Set<UseKey>> = new Map<UUID,Set<UseKey>>();
    //uuid:组件的唯一UUID  key:什么字段加载的资源
     public LoadRes(uuid:UUID,key:UseKey):void{
         let loadMap:Set<UseKey>|undefined = this.mLoadMap.get(uuid);//首先获取到要替换组件的UUIID
         if(loadMap == undefined){//如果没有找到的话
             loadMap = new Set<UseKey>();//进行设置
             this.mLoadMap.set(uuid,loadMap);
         }
         if(!loadMap.has(key))//如果没有设置这个key的话
             loadMap.add(key)//进行加载
     }

     public ReleaseRes(uuid:UUID,key:UseKey):void{
        let loadMap:Set<UseKey>|undefined = this.mLoadMap.get(uuid);//首先获取到要替换组件的UUIID
        if(loadMap == undefined)//如果没有找到的话
            return;
        loadMap.delete(uuid);
        if(loadMap.size == 0)
            this.mLoadMap.delete(uuid);
    }

    //当节点收到destory消息的时候
    protected onDestroy(): void {
        let resourceProxy:ResouceProxy = _Facade.FindProxy(ResouceProxy);//首先找到资源代理
        for(let data of this.mLoadMap){//遍历当前所有的资源信息
            for(let key of data[1])//资源加载总数据
                resourceProxy.Release(data[0],key[0]);
        }
        this.mLoadMap.clear();
    }
}

