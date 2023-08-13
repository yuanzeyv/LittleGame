import { VideoPlayer } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { _G } from './Global';
import { VideoClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property({type:VideoClip})
    clip:VideoClip;
    onLoad() {
        //_G.TimeWheel.Set(1000,()=>{
        //    this.getComponent(VideoPlayer).clip = this.clip;   
        //    this.getComponent(VideoPlayer).playOnAwake = true;        
        //    this.getComponent(VideoPlayer).pause();  
        //    this.getComponent(VideoPlayer).play(); 
        //});  

        this.node.on("playing",()=>{
            console.log("正在准备播放");
        }) 
        
    }

    update(deltaTime: number) {
            console.log(this.getComponent(VideoPlayer).isPlaying);
        
    }
}


