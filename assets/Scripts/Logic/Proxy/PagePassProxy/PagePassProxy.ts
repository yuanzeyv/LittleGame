import {BaseProxy} from "../../../Frame/BaseProxy/BaseProxy";
import {getAllRound, wechatGetPassCount} from "db://assets/Scripts/api/WechatAPI";
import {_Facade, _G} from "db://assets/Scripts/Global";
import {NotificationEnum} from "db://assets/Scripts/NotificationTable"; 
import { PassDataStruct ,PassDataType,PassDataAnswerType,PassDataMode, PassDataTypeStruct} from "./PassDataStruct";
import { CardMap } from "../../../CardConfig";
export let PAGE_COUNT:number = 20;
export class PassData {
    m_Round: number;
    m_Question: string; //问题描述
    m_Mode:number;//当前的游戏模式 1--正常，2--乱序，3--倒计时马赛克，4--乱序+倒计时马赛克
    m_HelpText:string = "";
    m_Options: Array<any> = []; //可选答案
    m_Answers: Array<number> = []; //正确答案
    m_Type: number//问题类型：1--多选；2--单选；3--判断
    m_SpecialCards:Array<string> = [];//置于上方的特殊牌
    m_NormalCards:Array<string> = [];//置于下方的通用牌
    m_Level:number = 0;//当前的关卡
}
export interface PassCount{
    total:number;
    errMessage:string;
    nowPlan:number;
}

//每个系统会有一万的消息可使用
export class PagePassProxy extends BaseProxy {
    static get ProxyName(): string { return "PagePassProxy"}; 
    //获取到当前的总关卡
    private mSumPass: number = 0;
    //当前的通关进度
    private mNowPlan: number = 0;
    //当前的关卡数据信息
    private mPassDataMap: Map<number, PassData> = new Map<number, PassData>();

    public async RequestPassData(pageNo:number) {
        try {
            let roundList: Array<any> = getAllRound(pageNo);
            roundList.forEach(data => {
                let passData: PassData = new PassData();
                passData.m_Round = data._id;
                passData.m_Question = data.question;
                passData.m_Type = data.answerType;
                passData.m_Mode = data.mode;
                passData.m_HelpText = data.descr || "";
                passData.m_Options = [].concat(data.options);
                passData.m_Answers = [].concat(data.answer);
                passData.m_SpecialCards = [].concat(data.specialCards);
                passData.m_NormalCards = passData.m_NormalCards.concat(data.cards)
                passData.m_Level = data.level;
                this.mPassDataMap.set(passData.m_Round, passData);
            });
            _Facade.Send(NotificationEnum.UpdatePageCell,pageNo);
        } catch (error) {
            this.mPassDataMap.clear();//清空关卡数据信息
            _Facade.Send(NotificationEnum.M_TipsShow, "服务器数据异常");
        }
    }

    public RequestPassCount() {
        wechatGetPassCount(this.ResponsePassCount.bind(this));
    }
 
    public ResponsePassCount(data:PassCount){
        this.mSumPass = data.total;
        this.mNowPlan = data.nowPlan;
        _Facade.Send(NotificationEnum.UpdatePageCount,data);//发送关卡数据
    }
 
    public GetPassCount() {
        return this.mSumPass;
    }

    public GetNowPlan() {
        return this.mNowPlan;
    }

    public GetLevelCanGame(level:number):boolean {//是否可以进行当前等级的游戏
        return level < (this.mNowPlan + 1);
    }

    public GetPassData(pass: number): PassData | undefined {
        return this.mPassDataMap.get(pass);
    }

    //设置游戏的设置 
    public SetPassCount(count: number) {
        this.mSumPass = count;
    }

    //组装游戏数据
    public GenerateGameData(level:number):PassDataStruct|undefined{
        let passData:PassData|undefined = this.GetPassData(level);
        if(passData == undefined)
            return undefined;
        let testData:PassDataStruct = new PassDataStruct();
        testData.AnswerType = passData.m_Type;//设置关卡选择类型
        testData.Question = passData.m_Question;//关卡的问题文本
        testData.PassID = passData.m_Level;//当前关卡的等级
        testData.SetGameMode(passData.m_Mode);
        testData.HelpText = passData.m_HelpText;
        //设置当前底牌
        for(let element of passData.m_NormalCards){
            if(CardMap[element] == undefined)
                continue;
            testData.DarkCards.push(Number(CardMap[element].img));
        }
        //特殊卡牌
        for(let element of passData.m_SpecialCards){
            if(CardMap[element] == undefined)
                continue;
            testData.BrightCards.push(Number(CardMap[element].img)); 
        }
        //填入答案
        for(let elemet of passData.m_Answers )
            testData.AnswerArray.push(elemet);;
        for(let element of passData.m_Options){
            if(element.type == "card"){
                let param:PassDataTypeStruct = {Type:PassDataType.Cards,CardArray:[]};
                for(let data of element.value ) 
                    param.CardArray.push( CardMap[data].img);
                    testData.OptinsArray.push(param);
            }else if(element.type == "text"){
                testData.OptinsArray.push({Type:PassDataType.Text,Text:element.string});
            }
        }
        return testData;
    }
}
