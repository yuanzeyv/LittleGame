// import { _Facade } from "../../../Global";
// import { BundleProxy } from "../../Proxy/BundleProxy/BundleProxy";
// import { eFinalAttrType } from "../../Proxy/PhysicsProxy/Define/AttrType";
// import { ePrefabType, GPhysicsScalingFactor } from "../../Proxy/PhysicsProxy/Define/Physics";
// import { ShapeCompBase } from "../../Proxy/PhysicsProxy/PhysicsColliderComp/ShapeCompBase";
// import { PhysicsProxy } from "../../Proxy/PhysicsProxy/PhysicsProxy";
// import { PlayerBase } from "../../Proxy/PhysicsProxy/PhysicsRigidBody/PlayerBase";
// import { ResouceProxy } from "../../Proxy/ResourceProxy/ResouceProxy";
// import { find, instantiate, Label, math, Node, Prefab, ProgressBar, Sprite, SpriteFrame, UITransform, Vec2 } from "cc";
 
// export class PlayerBaseInfo{
//     private mParentNode:Node;//父节点
//     private mHPNode:Node;//血量节点
//     //(最开始考虑时直接将所有节点打散，不赋予子节点了。 但是这种成本太大，所以依然保留节点数据信息)
//     private mSpineNode:Node;//玩家可能需要一个形象，这个形象不单单只是一个简单的图片，可能需要是一张Spine或其他，此时可以考虑挂载在这个节点下，此节点的旋转不会跟随受其自己的逻辑控制
//     private mPlayerBase:PlayerBase;//玩家的ID

//     private mHPBar:Node;


//     private mColliderMap:Map<number,{collider:ShapeCompBase ,node:Node}> = new Map<number,{collider:ShapeCompBase,node:Node}>();//记录碰撞器Map
//     constructor(playerBase:PlayerBase,parentNode:Node,hpNode:Node){
//         this.mParentNode = parentNode;
//         this.mPlayerBase = playerBase; 
//         this.mHPNode = hpNode;
//         this.InsertHPBar();//尝试插入一个血条
//     }

//     public InsertHPBar():void{
//         if(!this.mPlayerBase.Config.IsShowHpBar)
//             return;
//         this.mHPBar = instantiate(_Facade.FindProxy(BundleProxy).UseAsset("resources","LayerSource/PhysicsLayer/Comp/EnemyHpBar",Prefab));//货币单元信息
//         find("Name",this.mHPBar).getComponent(Label).string = this.mPlayerBase.Config.Name + " " + this.mPlayerBase.ID ;
//         this.mHPNode.addChild(this.mHPBar);
//         //立即更新玩家血量
//         this.UpdatePlayerHP();
//     }
//     //更新玩家的HP血量
//     public UpdatePlayerHP(){
//         if(!this.mPlayerBase.Config.IsShowHpBar)
//             return; 
//         let nowHP:number = this.mPlayerBase.GetFinalAttr(eFinalAttrType.HP);
//         let maxHP:number = this.mPlayerBase.GetFinalAttr(eFinalAttrType.MaxHP);
//         this.mHPBar.getComponent(ProgressBar).progress = nowHP == 0 || maxHP == 0 ? 1 : (nowHP / maxHP) ;
//         find("HpLabel",this.mHPBar).getComponent(Label).string = `${nowHP}/${maxHP}`; 
//     }

//     public UpdatePlayerHPPosition(){
//         if(!this.mPlayerBase.Config.IsShowHpBar)
//             return; 
//         //更新位置
//         let pos:Vec2 = this.mPlayerBase.RigidBody.Position;
//         this.mHPBar.setPosition(  pos.x * GPhysicsScalingFactor,pos.y * GPhysicsScalingFactor + 20); 
//     }
     
//     public DestoryHPBar():void{
//         if(!this.mPlayerBase.Config.IsShowHpBar)
//             return;
//         _Facade.FindProxy(BundleProxy).UnUseAsset("resources","LayerSource/PhysicsLayer/Comp/EnemyHpBar",Prefab);//货币单元信息
//         this.mHPBar.removeFromParent();
//         this.mHPBar.destroy();
//     }
    
//     //尝试插入一个Collider
//     public InsertCollider(colliderComp:ShapeCompBase):void{
//         if(!colliderComp.Config.OwnerChartlet)
//             return; 
//         let retNode:Node = instantiate(_Facade.FindProxy(PhysicsProxy).GetPrefab(colliderComp.Config.Shape));//实例化一个节点
//         let spriteNode:Node = find("SpriteSplash",retNode);//获取到精灵节点
//         spriteNode.angle = colliderComp.Config.ChartletAngle;//设置角度
//         _Facade.FindProxy(ResouceProxy).Load(spriteNode.getComponent(Sprite),"spriteFrame",`resources`,`LayerSource/PhysicsLayer/Images/${colliderComp.Config.ChartletImg}/spriteFrame`,SpriteFrame);
//         this.mColliderMap.set(colliderComp.ID,{collider:colliderComp,node:retNode});
//         this.mParentNode.addChild(retNode);
//     } 
  
//     //尝试删除一个Collider 
//     public DelCollider(colliderComp:ShapeCompBase):void{
//         if(!colliderComp.Config.OwnerChartlet)
//             return;  
//         let compCollider:{collider:ShapeCompBase ,node:Node}|undefined = this.mColliderMap.get(colliderComp.ID);
//         if(compCollider.collider == undefined){
//             console.warn("尝试删除一个不存在的碰撞器？？？？？？？？");
//             return;
//         }
//         compCollider.node.removeFromParent();
//         compCollider.node.destroy();
//         this.mColliderMap.delete(colliderComp.ID);
//     } 

//     //更新节点位置与坐标
//     public UpdateNodeInfo():void{  
//         //再次设置节点所拥有的所有碰撞器的大小 
//         for(let cell of this.mColliderMap){
//             let collider:ShapeCompBase = cell[1].collider;
//             let node:Node = cell[1].node;
//             //更新位置
//             let collierPos:Vec2 = collider.Colider.Position;
//             node.setPosition(  collierPos.x * GPhysicsScalingFactor,collierPos.y * GPhysicsScalingFactor); 
//             //更新旋转
//             let rotation:number = collider.Rotation;//获取到RigidBody的旋转  
//             node.setRotationFromEuler(0,0,math.toDegree(rotation)); 
//             //更新大小
//             let width:number = collider.Config.Shape == ePrefabType.Ball ? collider.Config.Redius:collider.Config.Size.Width;
//             let height:number = collider.Config.Shape == ePrefabType.Ball ? collider.Config.Redius:collider.Config.Size.Height;
//             node.getComponent(UITransform).setContentSize(width * 2 * GPhysicsScalingFactor ,height * 2 * GPhysicsScalingFactor );
//             //更新玩家的血量
//             this.UpdatePlayerHPPosition();
//         }  
//     }      

//     public Clear(){     
//         this.DestoryHPBar();//删除血条
//     }
// }      