import { _decorator, Label, PageView, find, instantiate, Button ,Node, tween, UIOpacity, Sprite, assetManager, ImageAsset, SpriteFrame, Texture2D} from 'cc';
import {BaseLayer, LayerExecute} from '../../../Frame/BaseLayer/BaseLayer';
import {_Facade, _G} from '../../../Global';
import {NotificationEnum} from '../../../NotificationTable'; 
import { StringLimit } from '../../../Util/Util';
import {SelectPassMediator} from '../../Mediator/SelectPassMediator/SelectPassMediator';
import {PagePassProxy} from '../../Proxy/PagePassProxy/PagePassProxy';
import { UserDataProxy } from '../../Proxy/UserDataProxy/UserDataProxy';
import { PassCellPrefab } from './PassCellPrefab';
import { ResouceProxy } from '../../Proxy/BundleProxy/ResouceProxy';

export class SelectPassLayer extends BaseLayer {
    private mBackButton: Node;//返回按钮
    private mFrontButton: Node;//左按钮
    private mNextButton: Node;//右按钮
    private mPageLabel: Label;//页签
    private mPageView: PageView;//页面视图
    private mUserNameLabel:Label;//玩家姓名节点
    private mUserIconSprite:Sprite;//玩家头像精灵

    private mPageModel:Node;//页模板
    private mLineModel:Node;//行模板
    private mCellModel:Node;//单元模板 

    private mPageMap:Map<number,Node> = new Map<number,Node>();//当前所存储的页
    private mLineMap:Map<number,Node> = new Map<number,Node>();//当前所存储的行
    private mCellMap:Map<number,Node> = new Map<number,Node>();//当前所存储的单元

    //当前有多少页
    private m_MaxPage: number = 0;
    InitNode(): void {
        this.mBackButton = find("TopBackGround/BackButton", this.node);
        this.mFrontButton = find("PageControlNode/FrontPageButton", this.node);
        this.mNextButton = find("PageControlNode/NextPageButton", this.node);
        this.mPageView = find("PageView", this.node).getComponent(PageView);
        this.mPageLabel = find("PageControlNode/PageLabel", this.node).getComponent(Label);
        this.mUserNameLabel = find("TopBackGround/HeadWidget/PlayerLabel", this.node).getComponent(Label);
        this.mUserIconSprite = find("TopBackGround/HeadWidget/HeadFrame/HeadImage/Sprite", this.node).getComponent(Sprite);
        
        this.mPageModel = find("PagePrefab",this.node);
        this.mLineModel = find("LinePrefab",this.node);
        this.mCellModel = find("PassCellPrefab",this.node);
    }

    InitData(): void {
        this.mBackButton.on("click", this.BackButtonHandle.bind(this));
        this.mFrontButton.on("click", this.FrontButtonHandle.bind(this));
        this.mNextButton.on("click", this.NextButtonHandle.bind(this));
        this.mPageView.node.on("page-turning", this.UpdatePageControlNode.bind(this));
    }
    
    InitLayer(): void { 
        this.InitMaxPage();
        this.InstantiateAllPage();
        this.mPageView.setCurrentPageIndex(0);
        this.UpdatePageControlNode();
        this.UpdatePlayerInfo();//更新用户的信息
    } 

    public UpdatePlayerInfo(){
        let userDataPrxy:UserDataProxy = _Facade.FindProxy(UserDataProxy);
        StringLimit(userDataPrxy.GetUserName(),this.mUserNameLabel,120);//更新玩家名称
        assetManager.loadRemote(userDataPrxy.GetHeadIcon(), { ext: '.jpg' },(err: Error | null, imageAsset:ImageAsset) => {//更新玩家头像
            if (err) 
                return; 
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            this.mUserIconSprite.spriteFrame =spriteFrame;
        });
    }

    protected RegisterExecuteHandle(executeMap:Map<string,LayerExecute> ){
        executeMap.set(NotificationEnum.UpdatePageCell,this.UpdatePageCellHandle.bind(this));
        executeMap.set(NotificationEnum.UpdatePageCount,this.UpdatePageCountHandle.bind(this));
    }

    private UpdatePageCellHandle(pageNo:number){
        for(let i = pageNo * (4 * 5);i < (pageNo + 1) * (4 * 5) ;i++ ){ 
            let node:Node|undefined = this.mCellMap.get(i);
            if(node == undefined)
                continue;
            let cellScript:PassCellPrefab = node.getComponent(PassCellPrefab);
            cellScript.UpdateCell();
        }
    }

    private UpdatePageCountHandle(){ 
        this.mPageView.node.destroyAllChildren();//销毁所有的节点信息
        this.mPageMap.clear();
        this.mLineMap.clear();
        this.mCellMap.clear();
        this.InitMaxPage();
        this.InstantiateAllPage();
        this.mPageView.setCurrentPageIndex(0);
        this.UpdatePageControlNode();
    }

    InitMaxPage() {
        this.m_MaxPage = Math.ceil( _Facade.FindProxy(PagePassProxy).GetPassCount() / (4 * 5)); //10页
    }

    InstantiateAllPage(){
        let maxCol = Math.ceil(_Facade.FindProxy(PagePassProxy).GetPassCount() / 4); 
        //初始化所有的页
        for(let i = 0 ;i < this.m_MaxPage;i++){
            let pageModel:Node = instantiate(this.mPageModel);
            pageModel.active = true;
            this.mPageMap.set(i,pageModel);
            this.mPageView.addPage(pageModel);
        }
        //初始化所有的行
        this.mPageMap.forEach((pageNode:Node,index:number)=>{
            //判断当前页可以创建多少行
            for(let i = index * 5; i < (index * 5) + 5 ;i++){
                if( i >= maxCol)
                    continue;
                let lineModel:Node = instantiate(this.mLineModel);
                lineModel.active = true;
                this.mLineMap.set(i,lineModel);
                pageNode.addChild(lineModel)
            }
        });
        //初始化所有的单元
        this.mLineMap.forEach((lineNode:Node,lineIndex:number)=>{
            for(let i = lineIndex * 4;i < lineIndex * 4 + 4 ;i++){
                if( i >= _Facade.FindProxy(PagePassProxy).GetPassCount())
                    continue;
                let cellNode:Node = instantiate(this.mCellModel);
                this.mCellMap.set(i,cellNode);
                lineNode.addChild(cellNode);
                let opacityComp:UIOpacity = cellNode.getComponent(UIOpacity);
                opacityComp.opacity = 0;
                tween(opacityComp).to(0.3,{opacity:255}).start();
                _G.TimeWheel.Set( i * 15,()=>{
                    cellNode.active = true;
                });
                
                let cellScript:PassCellPrefab = cellNode.getComponent(PassCellPrefab);
                cellScript.InitNode();
                cellScript.InitData();
                cellScript.Level = i + 1;
            }
        });
    }


    UpdatePageControlNode() {
        let nowIndex: number = this.mPageView.getCurrentPageIndex();
        let sumCount: number = this.m_MaxPage - 1;
        this.mPageLabel.string = (nowIndex + 1).toString();
        let frontSpritePath: string = nowIndex == 0 ? "resources/Images/Private/PageSelectLayer/FrontPageEnd/spriteFrame" : "resources/Images/Private/PageSelectLayer/FrontPage/spriteFrame";
        let nextSpritePath: string = (sumCount < 0 || nowIndex == sumCount) ? "resources/Images/Private/PageSelectLayer/NextPageEnd/spriteFrame" : "resources/Images/Private/PageSelectLayer/NextPage/spriteFrame";
        _Facade.FindProxy(ResouceProxy).Load(this.mFrontButton.getComponent(Button),frontSpritePath, "normalSprite");
        _Facade.FindProxy(ResouceProxy).Load(this.mNextButton.getComponent(Button),nextSpritePath, "normalSprite");
        //请求本页数据
        _Facade.FindProxy(PagePassProxy).RequestPassData(nowIndex);//页数据必须每次更新都请求
    }

    BackButtonHandle() {
        _Facade.Send(NotificationEnum.CloseWindow, SelectPassMediator.MediatorName);
    }

    FrontButtonHandle() {
        let nowIndex: number = this.mPageView.getCurrentPageIndex();
        if (nowIndex == 0)//顶部了 无法再继续移动了
            return; 
        this.mPageView.scrollToPage(nowIndex - 1);
        this.UpdatePageControlNode();
    }

   NextButtonHandle() {
        let nowIndex: number = this.mPageView.getCurrentPageIndex();
        if (nowIndex == this.m_MaxPage - 1)//顶部了 无法再继续移动了
            return; 
        this.mPageView.scrollToPage(nowIndex + 1);
        this.UpdatePageControlNode();
    }
}