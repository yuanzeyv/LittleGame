import { find } from 'cc';
import { Size, Vec3 } from 'cc';
import { RigidBody2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { _Facade } from '../../../../Global';
import { FishMainProxy } from '../../../Proxy/FishMainProxy/FishMainProxy';
import { Vec2 } from 'cc';
import { NotificationEnum } from '../../../../NotificationTable';
const { ccclass, property } = _decorator;

@ccclass('ChaetodonMinimusScripts')
export class ChaetodonMinimusScripts extends Component {
    private mFishID:number;
    private mFirstEnter:boolean = false;
    private mRigidBody:RigidBody2D ;
    
    //加载具体数据信息
    protected onLoad(): void {
        this.mRigidBody = this.node.getComponent(RigidBody2D);    
    }
    
    public InitData(id:number){
        this.mFishID = id;
        this.node.on("click",()=>{ 
            _Facade.Send(NotificationEnum.GenerateFish);
        })
    } 

    public get FishID():number{
        return this.mFishID;
    }
    public get RigidBody():RigidBody2D{
        return this.mRigidBody;
    }

    public set FirstEnter(status:boolean){
        this.mFirstEnter = status;
    }
    public get FirstEnter():boolean{
        return this.mFirstEnter;
    }
    public SetPosition(pos:Vec2):void{
        this.node.position.set(pos.x,pos.y);
    }
    public GetPosition():Vec2{
        let pos:Vec3 = this.node.position;
        return new Vec2(pos.x,pos.y);
    }
}


