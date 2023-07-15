import { _decorator, Node, Sprite, find, SpriteFrame, instantiate, Label, Toggle, assetManager, Texture2D, ImageAsset, Vec2, tween, Vec3, math } from 'cc'; 
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade, _G } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { SoltCell } from '../../../Util/Time/TimeWheel';
import { DisorganizeArray, StringLimit } from '../../../Util/Util';
import { PassDataStruct, PassDataTypeStruct, PassDataType, PassDataAnswerType } from '../../Proxy/PagePassProxy/PassDataStruct';
import { UserDataProxy } from '../../Proxy/UserDataProxy/UserDataProxy';
import { ResouceProxy } from '../../Proxy/BundleProxy/ResouceProxy';
const { ccclass, property,type} = _decorator;
@ccclass('MainGameLayer')
export class MainGameLayer extends BaseLayer {
    //节点区域
    private mOwnerCardLayout:Node;//明牌队列
    private mNotOwnerCardLayout:Node;//底牌队列
    private mCloneMoodel:Node;//问题节点模板
    private mAnswerLayout:Node;   //问题节点容器
    private mConfirmButton:Node; //提交节点按钮
    private mHelpButton:Node; //帮助按钮
    private mPauseButton:Node; //暂停按钮
    private mCardModel:Node;//麻将牌的预制体
    private mQuestionChooseLabel:Label;//问题节点
    private mCountDownLabel:Label;//倒计时节点
    private mPassLevelLabel:Label;//当前的关卡节点

    //空闲的功能按钮
    private mIdleButtno_1:Node;
    private mIdleButtno_2:Node;
    private mIdleButtno_3:Node;
    
    private mPlayerHeadSprite:Sprite;//获取到头像节点 
    private mPlayerNameLabel:Label;//获取到玩家名称 
    //数据区域
    private mPassData:PassDataStruct|undefined;//当前关卡的数据信息
    //倒计时时间
    private mCountDown:number = 99;
    private mCountDownSolt:SoltCell|undefined;
    private mMosaicSolt:SoltCell|undefined;
    //当前已经选中的答案数组
    private mAnswerNodeMap:Map<number,Node> = new Map<number,Node>();
    private mChooseAnswerSet:Set<number> = new Set<number>();
    public InitNode() {
        this.mOwnerCardLayout = find("CardsQuestionWidget/OwnerCardLayout",this.node);//明牌队列
        this.mNotOwnerCardLayout = find("CardsQuestionWidget/NotOwnerCardLayout",this.node);//底牌队列
        this.mCloneMoodel = find("QuestionChooses/CloneMoodel",this.node);//问题节点模板
        this.mAnswerLayout = find("QuestionChooses/AnswerLayout",this.node);   //问题节点容器
        this.mConfirmButton = find("ConfirmButton",this.node); //提交节点按钮
        this.mHelpButton = find("FunctionWidget/HelpButton",this.node); //帮助按钮
        this.mPauseButton = find("FunctionWidget/PauseButton",this.node); //暂停按钮
        this.mCardModel = find("CardModel",this.node); //卡牌模板
        this.mQuestionChooseLabel = find("QuestionChooses/Label",this.node).getComponent(Label);//问题节点
        this.mCountDownLabel = find("CardsQuestionWidget/CountDownLabel",this.node).getComponent(Label);
        this.mPassLevelLabel = find("TopBackGround/PassLevelWidget/Label",this.node).getComponent(Label);
        this.mPlayerNameLabel =  find("TopBackGround/HeadWidget/PlayerLabel",this.node).getComponent(Label);
        this.mPlayerHeadSprite =  find("TopBackGround/HeadWidget/HeadFrame/HeadImage/Sprite",this.node).getComponent(Sprite);
        this.mIdleButtno_1 = find("FunctionWidget/IdleButton_1",this.node);
        this.mIdleButtno_2 = find("FunctionWidget/IdleButton_2",this.node);
        this.mIdleButtno_3 = find("FunctionWidget/IdleButton_3",this.node);
    }
    protected RegisterExecuteHandle(executeMap:Map<string,LayerExecute> ){
        executeMap
        .set(NotificationEnum.RefreshGamePass,this.RefreshPass.bind(this))
    }

    public InitData(data:PassDataStruct) { 
        this.mPassData = data;
    }
    
    public InitLayer(){ 
        this.ShowBirghtCard();
        this.ShowDarkCard();
        this.ShowQusition();
        this.ShowAnswerArray();
        this.MatchMosaic();
        this.MatchCountDown();//判断当前是否需要进行对局倒计时
        this.UpdatePlayerInfo();//更新玩家数据
        this.mConfirmButton.on("click",this.ClickConfirmHandle.bind(this));
        this.mHelpButton.on("click",this.HelpButtonHandle.bind(this));
        this.mPauseButton.on("click",this.PauseButtonHandle.bind(this))
        this.mIdleButtno_1.on("click",this.IdleButtnHandle.bind(this,1))
        this.mIdleButtno_2.on("click",this.IdleButtnHandle.bind(this,2))
        this.mIdleButtno_3.on("click",this.IdleButtnHandle.bind(this,3))
    }
    public UpdatePlayerInfo(){
        let userDataPrxy:UserDataProxy = _Facade.FindProxy(UserDataProxy);
        
        StringLimit(userDataPrxy.GetUserName(),this.mPlayerNameLabel,120);//更新玩家名称
        
        assetManager.loadRemote(userDataPrxy.GetHeadIcon(), { ext: '.jpg' },(err: Error | null, imageAsset:ImageAsset) => {//更新玩家头像
            if (err) 
                return; 
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            this.mPlayerHeadSprite.spriteFrame =spriteFrame;
        });

        this.mPassLevelLabel.string = this.mPassData.PassID.toString();
    }
    public MatchMosaic(){
        if(!this.mPassData.IsMosaic())
            return;
        this.mMosaicSolt = _G.TimeWheel.Set(5000,this.FilpBlackCards.bind(this));
    }
    public FilpBlackCards(){
        for(let model of this.mNotOwnerCardLayout.children){
            _Facade.FindProxy(ResouceProxy).Load(model.getComponent(Sprite),`resources/Images/Public/48/spriteFrame`,"spriteFrame");
            this.mNotOwnerCardLayout.addChild(model);
        }
        this.mMosaicSolt = undefined;
    }
    public MatchCountDown(){
        this.ClearTimeOut();
        this.mCountDown = 99;
        this.mCountDownLabel.node.active = this.mPassData.IsCountDown();
        if(!this.mPassData.IsCountDown()){
            this.mCountDownLabel.string = this.mCountDown.toString();
            return;
        }
        this.mCountDown = 60;     
        this.CountDownHandle(true);
    }
    public ClearTimeOut(){
        this.mMosaicSolt?.Stop();
        this.mCountDownSolt?.Stop();
        this.mCountDownSolt = undefined;
        this.mMosaicSolt = undefined;
    }
    public CountDownHandle(isInit:boolean){
        if(isInit == false)
            this.mCountDown -= 1;
        this.mCountDownLabel.string = this.mCountDown.toString();
        if(this.mCountDown <= 0)
            _Facade.Send(NotificationEnum.TipsPassFailLayerOpen,this.mPassData.PassID);
        else    
            this.mCountDownSolt = _G.TimeWheel.Set(1000,this.CountDownHandle.bind(this,false));
    }
    //展示明牌
    private ShowBirghtCard(){
        this.mOwnerCardLayout.destroyAllChildren();
        for(let cardID of this.mPassData.BrightCards){
            let model:Node = instantiate(this.mCardModel);
            let spriteNode:Node = find("Sprite",model);
            model.active = true;
            _Facade.FindProxy(ResouceProxy).Load(spriteNode.getComponent(Sprite),`resources/Images/Public/Card/${ cardID }/spriteFrame`,"spriteFrame");
            this.mOwnerCardLayout.addChild(model);
            this.MoveByTween(spriteNode,math.random()* 0.8 ,new Vec3(0,Math.random() * 600,0));
        }
    } 
    //展示底牌
    private ShowDarkCard(){
        this.mNotOwnerCardLayout.destroyAllChildren();
        let cardArray:Array<number> = this.mPassData.IsDisorganize() ? DisorganizeArray(this.mPassData.DarkCards) : this.mPassData.DarkCards;
        cardArray.forEach((cardID:Number,index:number)=>{
            let model:Node = instantiate(this.mCardModel);
            let spriteNode:Node = find("Sprite",model);
            model.active = true;
            _Facade.FindProxy(ResouceProxy).Load(spriteNode.getComponent(Sprite),`resources/Images/Public/Card/${ cardID }/spriteFrame`,"spriteFrame");
            this.mNotOwnerCardLayout.addChild(model);
            this.MoveByTween(spriteNode,math.random()* 0.8 ,new Vec3(0,Math.random() * 600,0));
        }) 
    }
    //动画函数
    private MoveByTween(node:Node,dur:number,moveby:Vec3){
        let orignPos:Vec3 = node.getPosition();
        orignPos.add(moveby);//加上这个值
        node.setPosition(orignPos);
        tween(node).by(dur,{position:new Vec3(-moveby.x,-moveby.y,-moveby.z)},{easing:"quintIn"}).start();
    }

    //展示问题
    private ShowQusition(){
        this.mQuestionChooseLabel.string = this.mPassData.Question;
    }

    //展示答案
    private ShowAnswerArray(){
        this.mAnswerLayout.destroyAllChildren();
        this.mChooseAnswerSet.clear();
        this.mPassData.OptinsArray.forEach((element:PassDataTypeStruct,index:number)=>{
            this.ShowAnswer(element,index);
        });
    }
    //展示答案
    private ShowAnswer(element:PassDataTypeStruct,index:number){
        let instanceNode:Node = instantiate(this.mCloneMoodel);
        instanceNode.active = true;
        this.mAnswerNodeMap.set(index,instanceNode);
        let toggleComp:Toggle = find("ToggleButton",instanceNode).getComponent(Toggle);
        find("ToggleButton",instanceNode).on("toggle",this.AnswerClickHandle.bind(this,index));
        find("CardLayout",instanceNode).on("click",this.AnswerButtonCLickHandle.bind(this,toggleComp));
        this.mAnswerLayout.addChild(instanceNode);

        //判断当前牌型
        if(element.Type == PassDataType.Cards ){
            let cardLayout:Node = find("CardLayout",instanceNode);
            cardLayout.active = true;
            for(let cardID of element.CardArray || new Array<number>()){
                let model:Node = instantiate(this.mCardModel);
                let spriteNode:Node = find("Sprite",model);
                model.active = true;
                _Facade.FindProxy(ResouceProxy).Load(spriteNode.getComponent(Sprite),`resources/Images/Public/Card/${ cardID }/spriteFrame`,"spriteFrame");
                cardLayout.addChild(model);
            }
        }else{
            let allRightLabel:Label = find("AllRIghtLabel",instanceNode).getComponent(Label);
            allRightLabel.node.active = true;
            allRightLabel.string = element.Text || "配置错误";
        }
    }
    //额外的点击范围
    private AnswerButtonCLickHandle(toggleComp:Toggle){
        toggleComp.isChecked = !toggleComp.isChecked;
    }
    //答案的点击事件
    private AnswerClickHandle(index:number,toggleComp:Toggle){ 
        //首先判断当前是否是反选,如果当前是反选,直接设置并且返回
        if(toggleComp.isChecked == false){
            this.mChooseAnswerSet.delete(index);
            return;
        }
        //如果当前不是反选
        switch(this.mPassData.AnswerType){
            case PassDataAnswerType.JudgeChoice:
            case PassDataAnswerType.SignalChoice:
                for(let toggleIndex of this.mChooseAnswerSet){
                    //首先获取到当前的节点
                    let toggle:Toggle = find("ToggleButton", this.mAnswerNodeMap.get(toggleIndex)) .getComponent(Toggle);
                    toggle.isChecked = false
                }
                this.mChooseAnswerSet.clear();
                break;
            case PassDataAnswerType.MultipleChoice:
                break;
        }
        this.mChooseAnswerSet.add(index);
    }

    HelpButtonHandle(){
        _Facade.Send(NotificationEnum.HelpWindowLayerOpen,this.mPassData.HelpText);
    }
    PauseButtonHandle(){
        _Facade.Send(NotificationEnum.GameMenuLayerOpen,this.mPassData.PassID);
    }
    IdleButtnHandle(id:number){
        _Facade.Send(NotificationEnum.RewardedVideoAdvertisingShow);
    }
    
    ClickConfirmHandle(){
        //与数据进行匹配
        if(this.mChooseAnswerSet.size == 0){
            _Facade.Send(NotificationEnum.M_TipsShow,"没有选择任何答案") //没有输入答案
            return ;
        }
        this.ClearTimeOut();
        //首先匹配长度
        if(this.mPassData.AnswerArray.length != this.mChooseAnswerSet.size){
            _Facade.Send(NotificationEnum.TipsPassFailLayerOpen,this.mPassData.PassID);
            return;
        }
        let isAllRight:boolean = true;
        for(let index of this.mPassData.AnswerArray){
            if(!this.mChooseAnswerSet.has(index)){
                isAllRight = false;
                break;
            }
        }
        if(isAllRight == false){
            _Facade.Send(NotificationEnum.TipsPassFailLayerOpen,this.mPassData.PassID);
            return;
        } 
        _Facade.Send(NotificationEnum.TipsPassWinLayerOpen,this.mPassData.PassID); 
    }
    public CloseLayer(){//界面只要被退出就要清理定时器
        this.ClearTimeOut();
    }

    //更新关卡
    public RefreshPass(passData:PassDataStruct|undefined){
        this.ClearTimeOut();
        this.InitData(passData);
        this.InitLayer();
    }
}