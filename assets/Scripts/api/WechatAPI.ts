import {_G} from '../Global'
import {USER_INFO} from "db://assets/Scripts/api/mock/user_data";
import {ROUND_INFO} from "db://assets/Scripts/api/mock/round_info";
import {sys, JsonAsset, loader} from 'cc';
import { ROUND_COUNT } from './mock/round_count';

const wx = window['wx'] || {};
let wxCloud = undefined;
if (sys.platform == sys.Platform.WECHAT_GAME) {
    try {
        window['wx'].cloud.init();
        wxCloud = window['wx'].cloud;
    } catch (error) {
        console.error(error)
    }
}
export const wechatLogin = function (_userInfo, executeHandle?:(data:any)=>void) {
    let userInfo:any = undefined;
    if (sys.platform !== sys.Platform.WECHAT_GAME) {
        userInfo = Object.assign({}, USER_INFO); 
    } else {
        let res = wxCloud.callFunction({
            name: "login",//云函数名字
            data: {
                userInfo: _userInfo,
            }
        });

        console.log('处理注册信息成功', res);
        userInfo = res.result.data;
        console.log('获取到回调的用户信息：', userInfo);
        window['wx'].setStorageSync("userInfo",userInfo)
    }
    new Promise((resolve,reject)=>{
        resolve(userInfo);
    }).then((data:any)=>{
        executeHandle && executeHandle(data);
    });
}


export const wechatGetPassCount = function (executeHandle?:(data:any)=>void) {
    if (sys.platform !== sys.Platform.WECHAT_GAME) {
        new Promise((resolve:any,reject:any)=>{
            //请求数据消息的异步回调
            resolve(ROUND_COUNT);
        }).then((data:any)=>{
            if(executeHandle != undefined)
                executeHandle(data);
        });
    } else {
        let res = wxCloud.callFunction({
            name: "getRoundCount", 
        })
       // retParam = res.result.data || []; //{_id:1,cards:[],answer:[],options:[],type:1}
    }
}
 
export function getAllRound(pageNo) {
    let roundList = [];
    if (sys.platform !== sys.Platform.WECHAT_GAME) {
        roundList = [].concat(ROUND_INFO);
    } else {
        let res = wxCloud.callFunction({
            name: "getRoundInfo",
            data: {
                pageNo //从0开始计数
            }
        })
        roundList = res.result.data || roundList; //{_id:1,cards:[],answer:[],options:[],type:1}
    }
    // @ts-ignore
    //let userRound = (_G.userInfo && _G.userInfo.rounds) || [];//用户已通关记录{r:1,t:时间, s:0/1/2/3--档次}
    //roundList.forEach(v => {
    //    let uRound = userRound.find(m => m.r == v._id);
    //    if (uRound) {
    //        v.star = uRound.s;
    //        v.state = true;
    //    } else {
    //        v.star = 0;//star表示玩过的最好成绩：0/1/2/3表示不同颗星。一次通关三颗星，二次通关2颗心，三次通关1颗心，超过三次0颗心
    //        v.state = false; //state表示是否玩过
    //    }
    //})
    return roundList;
}

export const updateUserRound = async function (round, star) {
    let res = await wxCloud.callFunction({
        name: "updateUserRound",
        data: {
            round,
            star
        }
    })
    console.log('修改用户通过信息=', res);
    _G.userInfo.rounds = _G.userInfo.rounds || []
    let uRound = _G.userInfo.rounds.find(m => m.r == round);
    if (uRound) {
        uRound.s = star;
    } else {
        uRound.r = round;
        uRound.s = star;
    }
    uRound.t = new Date();
    wx.setStorageSync("userInfo", _G.userInfo)//更新缓存信息
}
