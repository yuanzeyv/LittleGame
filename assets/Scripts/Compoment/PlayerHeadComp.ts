import { _decorator, Component, find, Sprite, SpriteFrame } from 'cc';
import { _Facade } from '../Global';
import { ResouceProxy } from '../Logic/Proxy/ResourceProxy/ResouceProxy';
const { ccclass, property } = _decorator;

@ccclass('PlayerHead')
export class PlayerHead extends Component {
    private mPlayerHeadID:number = 0;
    @property({type:Sprite}) 
    public mPlayerHeadSprite:Sprite; 
    protected onLoad(): void {
        this.mPlayerHeadSprite = find("HeadSprite",this.node).getComponent(Sprite);
    } 
    protected onEnable(): void {} 
    protected onDisable(): void {} 
    protected onDestroy(): void {}
    public SetHeadID(id:number){
        this.mPlayerHeadID = id;
        _Facade.FindProxy(ResouceProxy).Load(this.mPlayerHeadSprite,"spriteFrame",`resources`,`GameResource/HeadImages/head_${this.mPlayerHeadID}/spriteFrame`,SpriteFrame);
    }
}
  