import { _decorator, Vec3, UITransform, Tween, tween,Node } from "cc"; 
import { BaseLayer, LayerExecute } from "../../../Frame/BaseLayer/BaseLayer";
import { eNotice } from "../../../NotificationTable";   
import { GetTextMeshComp } from "../../../Util/Util";
import { TextMeshLabel } from "../../../../../extensions/TextMesh Pro/assets/TextMesh";

const { ccclass, property,type} = _decorator;
@ccclass('AnnouncementLayer')
export class AnnouncementLayer extends BaseLayer {
    public mMoveNode:Node; 
    public m_StartPosition:Vec3 = new Vec3(0,0,0);
    public m_EndPosition:Vec3 = new Vec3(0,0,0);
    public m_IsPlayStatus:boolean = false;//正在播放的状态
    public m_MoveSpeedPX:number= 380;
    //拥有一个Tips队列，用以收集需要播放的tips
    private m_AnnouncementStringArray:Array<string> = new Array<string>(); 
    RegisterExecuteHandle(executeMap:Map<eNotice,LayerExecute> ){
        executeMap.set(eNotice.AnnouncementShow,this.AnnouncementShowHandle.bind(this));//缓冲队列中存在该条消息时。
    }

    InitNode() {
        this.mMoveNode = this.node.getChildByName("TextNode");
        this.m_StartPosition = this.node.getChildByName("StartNode").position;
        this.m_EndPosition = this.node.getChildByName("EndNode").position;
    } 

    AnnouncementShowHandle(text:string):void{
        this.m_AnnouncementStringArray.push(text);//将文本插入
        this.Play();//准备开始播放
    } 
    
    Play() {
        if( this.m_IsPlayStatus == true || this.m_AnnouncementStringArray.length == 0 )//正在播放时，是无法再次进行播放的
            return;
        this.mMoveNode.setPosition(this.m_StartPosition); 
        let richText:TextMeshLabel = GetTextMeshComp(this.mMoveNode)
         richText.string = this.m_AnnouncementStringArray.pop();//准备弹出
        this.NodeMove();
    }

    private NodeMove(){  
        this.mMoveNode.active = true; 
        this.m_IsPlayStatus = true;
        let length:number = this.mMoveNode.getComponent(UITransform).contentSize.width;
        let winWidth:number = this.node.getComponent(UITransform).contentSize.width;
        //移动速度为 每 1 秒 移动 this.m_MoveSpeedPX px
        let tweenObj:Tween<Node> = tween(this.mMoveNode)  
        if(length <= winWidth) {//可以停留两秒的情况 
            let mutexPx:number = (winWidth - length) / 2 ; 
            tweenObj.by(((length + mutexPx) / this.m_MoveSpeedPX),{position:new Vec3(-(length + mutexPx),0,0)})//先移动到屏幕中心
            .delay(1.5)
            .by(((length + mutexPx) / this.m_MoveSpeedPX),{position:new Vec3(-(length + mutexPx),0,0)});//再移动到屏幕之外
        }else{
            let moveTime:number = (length + winWidth)  / this.m_MoveSpeedPX;//待移动的总距离 / this.m_MoveSpeedPX
            tweenObj.by(moveTime,{position:new Vec3(-(length + winWidth),0,0)})//先移动到屏幕中心
            .delay(1.5)
        }
        tweenObj.call(()=>{ 
            this.mMoveNode.active = false;
            this.m_IsPlayStatus = false;
            this.Play();
        });
        tweenObj.start();
    }
}


