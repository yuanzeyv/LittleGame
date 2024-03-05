import {_decorator,Component,Node,BlockInputEvents,Color,Sprite,Button,instantiate,RichText,Vec3,tween,UIOpacity} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade} from '../../../Global';
import {eNotice} from '../../../NotificationTable';
import { TextMeshLabel } from '../../../../../extensions/TextMesh Pro/assets/TextMesh/label/TextMeshLabel';

const {ccclass, property, type} = _decorator;
 
@ccclass('TipsLayer')
export class TipsLayer extends BaseLayer {
    public m_MoveNode: Node;
    public m_StartPosition: Vec3 = new Vec3(0, 0, 0);
    public m_EndPosition: Vec3 = new Vec3(0, 0, 0);
    //拥有一个Tips队列，用以收集需要播放的tips
    private m_TipsStringArray: Array<string> = new Array<string>();
    //当前是否是等待状态
    private m_IsWaitStatus: boolean = false;

    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) {
        executeMap.set(eNotice.TipsShow, this.TipsShowHandle.bind(this));//缓冲队列中存在该条消息时。
    }

    InitNode() {
        this.m_MoveNode = this.node.getChildByName("TextNode");
        this.m_StartPosition = this.node.getChildByName("StartNode").position;
        this.m_EndPosition = this.node.getChildByName("EndNode").position;
    }

    TextADddOutLine(text: string) {
        return text;
    }

    TipsShowHandle(text: string): void {
        this.m_TipsStringArray.push(this.TextADddOutLine(text));//将文本插入
        this.Play();//准备开始播放
    }

    private NodeMove(node: Node) {
        tween(node)
            .call(() => {
                node.active = true;
                this.m_IsWaitStatus = true;
            })
            .parallel(
                tween().to(0.8, {position: this.m_EndPosition}, {easing: "expoOut"}),
                tween().delay(0.20).call(() => {
                    this.m_IsWaitStatus = false;
                    this.Play();//播放下一个
                }))
            .start();

        tween(node.getComponent(UIOpacity))
            .delay(0.6)
            .to(0.5, {opacity: 0}, {easing: 'expoOut'})
            .call(() => {
                node.removeFromParent();
                node.destroy();
            })
            .start();
    }

    Play() {
        if (this.m_IsWaitStatus == true)//当前还不可以播放
            return;
        if (this.m_TipsStringArray.length == 0)
            return;
        let node: Node = instantiate(this.m_MoveNode); //实例化一个tips的消息
        this.node.addChild(node);
        node.setPosition(this.m_StartPosition);
        let richText: TextMeshLabel = node.getChildByPath("RichText").getComponent(TextMeshLabel);
        richText.string = this.m_TipsStringArray.pop();//准备弹出
        this.NodeMove(node);
        _Facade.Send(eNotice.PlayAudioEffect, "resources/Sound/shua");
    }
}


 