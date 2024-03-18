import { Node, Prefab, instantiate, sp } from "cc";
import { _Facade } from "../../../../Global";
import { BundleProxy } from "../../BundleProxy/BundleProxy";
export class SpineMediator{
    private mSocketMap:Map<string,sp.SpineSocket> = new Map<string,sp.SpineSocket>();
    private misLoadFinish:boolean = false;
    private mSpine:sp.Skeleton;
    private mAnim:string;
    public constructor(node:Node,socketArray:Array<string>){
        this.mSpine = node.getComponent(sp.Skeleton);
        this.InitSocketMap(socketArray); 
    }
    public SetAction(anim:string):void{
        this.mAnim = anim;
        if(this.misLoadFinish == false)
            return;
        this.mSpine.setAnimation(0,this.mAnim,true);
    } 
    public LoadFinishHandle():void{
        this.misLoadFinish = true;
        this.mSpine.premultipliedAlpha = false;
        this.SetAction(this.mAnim);
        this.CreateSocketNode();
        console.log("当前节点的所有的插槽");
        console.log(this.mSpine.querySockets());
    }

    public GetNode():Node{
        return this.mSpine.node;
    }
    public GetSp():sp.Skeleton{
        return this.mSpine;
    }
    private InitSocketMap(socketArray:Array<string>){
        for(let path of socketArray)
            this.mSocketMap.set(path,new sp.SpineSocket(path));
    }

    private CreateSocketNode(){
        this.mSocketMap.forEach((spineSocket:sp.SpineSocket,socketName:string)=>{
            let isExist:boolean = this.mSpine.querySockets().findIndex((value:string)=>{ return value == socketName; } ) != -1;
            if(!isExist){
                this.mSocketMap.delete(socketName);
                console.log(`当前Spine不存在名为:${socketName}的插槽`);
                return;
            }
            spineSocket.target = new Node(socketName); 
            this.GetNode().addChild(spineSocket.target);
        });
        let spineSocketArr:Array<sp.SpineSocket> = new Array<sp.SpineSocket>();
        for(let cell of this.mSocketMap)
            spineSocketArr.push(cell[1]);
        this.mSpine.sockets = spineSocketArr;
    }
 
    public ClearSocketNode(){
        this.GetNode().removeAllChildren();
        this.GetNode().destroyAllChildren();
        this.mSocketMap.clear();
    }
}; 