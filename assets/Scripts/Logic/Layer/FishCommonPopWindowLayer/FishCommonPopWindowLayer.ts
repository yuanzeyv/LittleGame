import { _decorator, find, Label, Node } from 'cc';
import { BaseLayer, } from '../../../Frame/BaseLayer/BaseLayer';
import { eNotice } from '../../../NotificationTable';
import { _Facade, _G } from '../../../Global';
const { ccclass, property,type} = _decorator;
export interface ICommonData{
    title:string;
    desc:string;
    funcDesc:string;
    handleFunc:()=>void;
} 
export class FishCommonPopWindowLayer extends BaseLayer {
    private mTitleLabel:Label;
    private mDescLabel:Label;
    private mFuncButton:Node;
    private mBackButton:Node;
    private mFuncLabel:Label;
    
    public InitNode(): void {
        this.mTitleLabel = find("TitleLabel",this.node).getComponent(Label);
        this.mDescLabel = find("TipsLabel",this.node).getComponent(Label);
        this.mFuncButton = find("FuncButton",this.node);
        this.mFuncButton = find("FuncButton",this.node);
        this.mFuncLabel = find("FuncButton/Label",this.node).getComponent(Label);
        this.mBackButton = find("QuitButton",this.node);
    }

    public InitData(data: ICommonData): void {
        this.mFuncButton.on("click",()=>{
            if(data.handleFunc)
                data.handleFunc();
        });
        this.mBackButton.on("click",()=>{
            _Facade.Send(eNotice.FishCommonLayerClose);
        });
        this.mDescLabel.string = data.desc;
        this.mTitleLabel.string = data.title; 
        this.mFuncLabel.string = data.funcDesc;
    }
}
