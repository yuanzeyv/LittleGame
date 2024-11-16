/*
用以描述玩家的身体与展示
*/
import { find, Node, Sprite, SpriteFrame, UITransform, Vec2 } from "cc"; 
import { _Facade } from "../../../../Global";
import { OnlyTheBraveProxy } from "../../../Proxy/OnlyTheBraveProxy/OnlyTheBraveProxy";
import { PlayerBase } from "../../../Proxy/OnlyTheBraveProxy/Physics/PlayerBase";
import { ePrefabType } from "../../../Proxy/PhysicsProxy/Define/PhysicsConst";
import { ResouceProxy } from "../../../Proxy/ResourceProxy/ResouceProxy";
import { GPhysicsPantographRatio } from "../../../Proxy/OnlyTheBraveProxy/Physics/ColliderTypeDefine";
export class PlayerBody{
    private mPlayerBaseID:number;//玩家对应的世界刚体ID
    private mBodyNode:Node;//玩家对应的刚体节点
    public constructor(playerID:number,bodyNode:Node){
        this.mPlayerBaseID = playerID;
        this.mBodyNode = bodyNode;
        this.InitTexture();
    }

    public InitTexture():void{
        let playerBase:PlayerBase | undefined = _Facade.FindProxy(OnlyTheBraveProxy).GetPlayerBase(this.mPlayerBaseID);
        if(playerBase.BodyCollider != undefined)
            _Facade.FindProxy(ResouceProxy).Load(find("Image",this.mBodyNode).getComponent(Sprite),"spriteFrame","resources",`LayerSource/OnlyTheBraveLayer/Images/${playerBase.BodyCollider.Shape == ePrefabType.Ball ? "CircleImage" :"CubeImage"}/spriteFrame`,SpriteFrame);
    }

    public Update(dt:number){
        let cameraPos:Vec2 = _Facade.FindProxy(OnlyTheBraveProxy).GetCameraObject().PlayerBase.GetPosition();

        //首先从代理中拿出对应刚体的数据信息
        let playerBase:PlayerBase | undefined = _Facade.FindProxy(OnlyTheBraveProxy).GetPlayerBase(this.mPlayerBaseID);
        
        //设置玩家的刚体大小
        let width:number = playerBase.BodyCollider ? playerBase.BodyCollider.Shape == ePrefabType.Ball ? playerBase.BodyCollider.Redius : playerBase.BodyCollider.Width : 0;
        let height:number = playerBase.BodyCollider ? playerBase.BodyCollider.Shape == ePrefabType.Ball ? playerBase.BodyCollider.Redius : playerBase.BodyCollider.Height : 0;
        this.mBodyNode.getComponent(UITransform).setContentSize(width * 2 * GPhysicsPantographRatio  ,height * 2 * GPhysicsPantographRatio);
        playerBase.BodyCollider && this.mBodyNode.setPosition(playerBase.BodyCollider.PositionV3.subtract3f(cameraPos.x,cameraPos.y,0).multiplyScalar(GPhysicsPantographRatio)); 
        //设置玩家的旋转角度
        this.mBodyNode.angle = playerBase.GetRotate(); 
    }  
 
    public Destory():void{
        this.mBodyNode.removeFromParent();//删除父节点
        this.mBodyNode.destroy();//销毁对象
    }
}