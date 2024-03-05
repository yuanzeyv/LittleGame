import { Interface } from "readline";
import { BaseLayer, LayerExecute } from "../../../Frame/BaseLayer/BaseLayer";
import { _Facade } from "../../../Global";
import { eNotice } from "../../../NotificationTable";
import { _decorator, find,Node } from "cc";
import { MultWindowProxy } from "../../Proxy/MultWindowProxy/MultWindowProxy";
import { MultWindowPanel } from "../BagLayer/MultWindowPanel"; 
import { TextMeshLabel } from "../../../../../extensions/TextMesh Pro/assets/TextMesh/label/TextMeshLabel"; 
const {ccclass, property, type} = _decorator; 
@ccclass('MultWindowLayer')
export class MultWindowLayer extends BaseLayer {   
    private mMainID:number = 0;//当前界面的主ID
    private mSelectID:number = 0;//当前打开的界面ID 
    private mContent:Node//获取到当前窗口的承载节点

    private mTwoWindowIDArray:Array<number> = new Array<number>();//当前打开的界面ID 


    
    private mTwoTableView:MultWindowPanel = undefined;//当前界面的2级窗口TableView 
    RegisterExecuteHandle(executeMap: Map<eNotice, LayerExecute>) {
        executeMap.set(eNotice.AddMultBagLayer,this.AddNodeToContent.bind(this));
        //用于设置多面板的窗口标题
    } 
    InitNode() {
        this.mContent = find("Content",this.node);
        this.mTwoTableView = find("ScrollView",this.node).getComponent(MultWindowPanel);
    } 
    InitData(windowInfo:{mainID:number,selectID:number}) {
        this.mMainID = windowInfo.mainID;
        this.mSelectID = windowInfo.selectID;
        this.mTwoWindowIDArray = _Facade.FindProxy(MultWindowProxy).GetWindowArrayByParentWindow(this.mMainID);//设置当前窗口的子窗口列表
    }  

    InitLayer() {
        this.mTwoTableView.SetWindowLayer(this);
        this.mTwoTableView.SetTableViewData(this.mTwoWindowIDArray);
        _Facade.Send(eNotice.OpenBagLayer);
    }   
  
    //设置多面板的窗口标题
    public SetWindowTitle(title:string):void{
        find("BackGround/AdaptiveLabelTitle",this.node).getComponent(TextMeshLabel).string = title; 
        find("BackGround/AdaptiveLabelTitle/WindowTitle",this.node).getComponent(TextMeshLabel).string = title;
    }

    //添加节点到子节点上
    public AddNodeToContent(node:Node):void{
        this.mContent.addChild(node);
    }

}   