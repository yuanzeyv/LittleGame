import {BaseProxy} from "../../../Frame/BaseProxy/BaseProxy";
import {getAllRound, wechatGetPassCount, wechatLogin} from "db://assets/Scripts/api/WechatAPI";
import {_Facade, _G} from "db://assets/Scripts/Global";
import { PassData } from "../PagePassProxy/PagePassProxy";
export class PassStar{
    mPass:number;//当前关卡
    mStar:number;//当前星级
    constructor(pass:number,star:number){
        this.mPass = pass;
        this.mStar = star;
    }
}
export class UserData {
    public mID:string;
    public mOpenID:string;
    public mHeadUrl:string;
    public mCity:string;
    public mCountry:string;
    public mGender:number;
    public mLanguage:"zh_CN";
    public mUserName:string; 
    public mLevel:number;
    public mMaxRoound:number;
    public mScore:number;
    public mPassStarMap:Map<number,PassStar> = new Map<number,PassStar>();
    
    //获取到当前的关卡星级信息
    public GetPassStar(pass:number){ 
        let  passStar :PassStar | undefined= this.mPassStarMap.get(pass);
        if(passStar == undefined)
            return 0;
        return passStar.mStar;
    }
} 
 


//每个系统会有一万的消息可使用
export class UserDataProxy extends BaseProxy {
    static get ProxyName(): string { return "UserDataProxy"}; 
    private mUserData:UserData|undefined;
    //向服务端请求用户信息
    public RequestUserData(userInfo:any){
        if(this.mUserData != undefined)
            return;
        wechatLogin(userInfo,this.RespondUserData.bind(this));
    }

    //获取到当前的关卡星级信息
    public GetPassStar(pass:number){
        return this.mUserData?.GetPassStar(pass) || 0;
    }

    //获取到当前的关卡星级信息
    public GetHeadIcon():string{
        return this.mUserData?.mHeadUrl  || "";
    }
    //获取到用户名称
    public GetUserName():string{
        return this.mUserData?.mUserName || "";
    }

    private RespondUserData(data:any){
        this.mUserData = new UserData();
        this.mUserData.mID = data._id;
        this.mUserData.mOpenID = data.openId;
        this.mUserData.mHeadUrl = data.avatarUrl;
        this.mUserData.mCity = data.city;
        this.mUserData.mCountry = data.country;
        this.mUserData.mGender = data.gender;
        this.mUserData.mLanguage = data.language;
        this.mUserData.mUserName = data.nickName;
        this.mUserData.mLevel = data.level;
        this.mUserData.mMaxRoound = data.maxRound;
        this.mUserData.mScore = data.score;
        data.rounds.forEach((data:any)=>{
            let passID:number = Math.ceil(data.r);
            this.mUserData.mPassStarMap.set(passID,new PassStar(passID,Math.ceil(data.s)));
        });
        this.mUserData.mLevel = data.level;
    }   
}