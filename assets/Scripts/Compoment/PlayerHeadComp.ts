import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerHead')
export class PlayerHead extends Component {
    private mLoadID:number = 0;
    private mPlayerHeadID:number = 0;

    update(deltaTime: number) {
        
    }
}

