import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { _decorator, instantiate, Prefab , Node, find, NodeEventType, EventTouch, Camera, Vec3, tween, UIOpacity, Tween, Vec2 } from 'cc'; 
import { OnlyTheBraveProxy } from '../../Proxy/OnlyTheBraveProxy/OnlyTheBraveProxy';
import { PlayerBody } from './PhysicsView/PlayerBody';
import { Cfg_OnlyTheBravePhysicsPlayer } from '../../../Config/Cfg_OnlyTheBravePhysicsPlayer';
import { BundleProxy } from '../../Proxy/BundleProxy/BundleProxy';
import { Map_1 } from '../../Proxy/OnlyTheBraveProxy/Map';
import { vec3 } from 'recast-navigation';
const { ccclass } = _decorator; 
@ccclass( 'OnlyTheBraveLayer' )   
export class OnlyTheBraveLayer extends BaseLayer {     
    /*
    *摇杆控制相关
    */
    private mTouchID:number = -1;
    private mJoystickComp:Node;//摇杆节点，用于控制游戏中的英雄左右方向的虚拟小手柄

    private mPlayerBodyMap:Map<number,PlayerBody> = new Map<number,PlayerBody>();
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) { 
        executeMap.set(eNotice.OnlyTheBravePhysicsRigidBodyEnterView,this.OnlyTheBravePhysicsRigidBodyEnterViewHandle.bind(this))
        executeMap.set(eNotice.OnlyTheBravePhysicsRigidBodyLeaveView,this.OnlyTheBravePhysicsRigidBodyLeaveViewHandle.bind(this))
    } 

    InitNode() {
        this.mJoystickComp = find("Joystick",this.node);
    }  
          
    InitData() {     
    } 

    InitLayer() {  
        this.InitJoystick();
    } 

    protected InitJoystick(){
        this.SetJoystickStatus(false);
        this.node.on(NodeEventType.TOUCH_START ,this.JoystickTouchStart,this);//尝试监听游戏根节点的触摸事件
        this.node.on(NodeEventType.TOUCH_MOVE  ,this.JoystickTouchMove,this);//尝试监听游戏根节点的触摸事件
        this.node.on(NodeEventType.TOUCH_END   ,this.JoystickTouchEnd,this);//尝试监听游戏根节点的触摸事件
        this.node.on(NodeEventType.TOUCH_CANCEL,this.JoystickTouchEnd,this);//尝试监听游戏根节点的触摸事件
    }

    protected onClose(): void { 
    }

    protected OpenLayer(): void { 
        this.StartGame();//开始一场游戏
    }
    
    /* 
    *开始一场游戏
    */
    public StartGame(){
        _Facade.FindProxy(OnlyTheBraveProxy).StartGame(Map_1);
    }

    protected Update(dt: number): void {
        _Facade.FindProxy(OnlyTheBraveProxy).UpDate(dt); 
        for(let cell of this.mPlayerBodyMap)
            cell[1].Update(dt);
    }

    protected RefreshPhysicsView(){
    }

    protected OnlyTheBravePhysicsRigidBodyEnterViewHandle(playerID:number):void{
        if(this.mPlayerBodyMap.has(playerID)){
            console.error(`重复添加了:${playerID}`);
            return;
        }
        let node:Node = instantiate(_Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/OnlyTheBraveLayer/Prefab/Comp/PlayerBody",Prefab));
        find("BackGround",this.node).addChild(node);
        this.mPlayerBodyMap.set(playerID,new PlayerBody(playerID,node));
    }
    protected OnlyTheBravePhysicsRigidBodyLeaveViewHandle(playerID:number){
        if(!this.mPlayerBodyMap.has(playerID)){
            console.error(`尝试删除一个不存在的玩家:${playerID}`);
            return;
        }
        let playerBody:PlayerBody = this.mPlayerBodyMap.get(playerID);
        playerBody.Destory();//销毁节点对象
        _Facade.FindProxy(BundleProxy).UnUseAsset("resources","LayerSource/OnlyTheBraveLayer/Prefab/Comp/PlayerBody",Prefab); 
        this.mPlayerBodyMap.delete(playerID);
    }
 
    /*
    *游戏摇杆控制相关
    */
    private SetJoystickStatus(isShow:boolean,delay:number = 0){
        Tween.stopAllByTarget(this.mJoystickComp.getComponent(UIOpacity));//停止所有动画
        tween(this.mJoystickComp.getComponent(UIOpacity))
        .to(delay,{opacity: isShow ? 255 : 0})
        .call(()=> this.mJoystickComp.active = isShow)
        .start();
    }
    private JoystickTouchStart(event:EventTouch):void{
        if(this.mTouchID != -1)
            return;
        this.mTouchID = event.getID(); 
        let touchStartWorldPos = find("Canvas/Camera").getComponent(Camera).screenToWorld(new Vec3(event.getStartLocation().x,event.getStartLocation().y,0));
        this.mJoystickComp.setPosition(touchStartWorldPos);
        this.SetJoystickStatus(true);
    }
    private JoystickTouchMove(event:EventTouch):void{
        if(event.getID() != this.mTouchID)
            return; 
        let touchStartWorldPos = find("Canvas/Camera").getComponent(Camera).screenToWorld(new Vec3(event.getStartLocation().x,event.getStartLocation().y,0));
        let nowTouchWorldPos = find("Canvas/Camera").getComponent(Camera).screenToWorld(new Vec3(event.getLocationX(),event.getLocationY(),0));
        let offsetPos:Vec3 = Vec3.subtract(new Vec3(),nowTouchWorldPos,touchStartWorldPos);
        let normalOffPos:Vec3 = Vec3.normalize(new Vec3(),offsetPos);
        let moveLen:number = offsetPos.length();//获取到手指移动的距离
      
        let maxLen:number = 68;//最大移动40像素
        if(moveLen > maxLen){
            moveLen = maxLen;
            Vec3.multiplyScalar(offsetPos,normalOffPos,maxLen);
        }
        this.mJoystickComp.setPosition(touchStartWorldPos);
        find("Joystick",this.mJoystickComp).setPosition(offsetPos);//设置当前手指的坐标

        let playerID:number = _Facade.FindProxy(OnlyTheBraveProxy).GetPlayerObject().ID;
        _Facade.FindProxy(OnlyTheBraveProxy).PlayerMoveToDir(playerID,new Vec2(normalOffPos.x,normalOffPos.y),moveLen / maxLen)
        _Facade.Send(eNotice.JoystickTouchChange,{Dir:normalOffPos,ForcePercent:moveLen / maxLen})
    }
    private JoystickTouchEnd(event:EventTouch):void{ 
        if(event.getID() != this.mTouchID) 
            return; 
        this.mTouchID = -1;
        this.SetJoystickStatus(false,0.2);
        find("Joystick",this.mJoystickComp).setPosition(new Vec3(0,0,0));
        let playerID:number = _Facade.FindProxy(OnlyTheBraveProxy).GetPlayerObject().ID;
        _Facade.FindProxy(OnlyTheBraveProxy).PlayerMoveToDir(playerID,new Vec2(0,0),0)
        _Facade.Send(eNotice.JoystickTouchChange,{Dir:new Vec3(0,0,0),ForcePercent:0});
    }
}