export enum PassDataType{
    Cards =1,//卡牌类型
    Text = 2//文本类型
};
export enum PassDataMode{//牌局模式
    Noise = 1,//乱序类型
    Mosaic = 2,//马赛克类型
    CountDown =4//倒计时类型
};
export enum PassDataAnswerType{//牌局模式
    SignalChoice  = 1,//单选
    MultipleChoice = 2,//多选
    JudgeChoice =3//判断
};
export interface PassDataTypeStruct{
    Type:PassDataType;//牌型
    CardArray?:Array<number>;//属于卡牌类型的时候，使用本字段
    Text?:string;//属于文本类型的时候，使用本字段
}
export class PassDataStruct{
    PassID:number;//当前的关卡数
    BrightCards:Array<number> = new Array<number>();//亮牌
    DarkCards:Array<number>  = new Array<number>();//暗牌
    Question:string;//提示
    OptinsArray:Array<PassDataTypeStruct> = new Array<PassDataTypeStruct>();
    AnswerArray:Array<number> = new Array<number>();//问题正确答案的列表
    AnswerType:PassDataAnswerType;//选择类型
    HelpText:string;//提示文本
    GameMode:number;//牌局类型

    public IsDisorganize():boolean{
        return (this.GameMode & PassDataMode.Noise) != 0
    }
    public IsCountDown():boolean{
        return (this.GameMode & PassDataMode.CountDown) != 0
    }
    public IsMosaic():boolean{
        return (this.GameMode & PassDataMode.Mosaic) != 0
    }
    public SetGameMode(waitTrans:number){
        ////1--正常，2--乱序，3--倒计时马赛克，4--乱序+倒计时马赛克
        this.GameMode = 0;
        if(waitTrans == 2){
            this.GameMode |= PassDataMode.Noise;
        } else if (waitTrans == 3){
            this.GameMode = PassDataMode.CountDown | PassDataMode.Mosaic;  
        }else if(waitTrans == 4){
            this.GameMode = PassDataMode.CountDown | PassDataMode.Mosaic | PassDataMode.Noise;
        }
    }
}