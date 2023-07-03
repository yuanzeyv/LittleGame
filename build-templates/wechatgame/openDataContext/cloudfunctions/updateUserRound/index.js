// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV}) // 使用当前云环境

const db =  cloud.database();// cloud.database() //引用云数据库
const userDB = db.collection("user_data") //引用data数据表（刚创建的那个数据表名称）
// 云函数入口函数
exports.main = async (event, context) => {
    const openId = context.OPENID
    let {round, star} = event;

    let userInfo = await userDB.doc(openId).get().data;

    if (userInfo) {
        let rounds = userInfo.rounds || []
        let uRound = rounds.find(v => v.r == round)
        if (uRound) {
            uRound.s = star
        } else {
            uRound.s = star
            uRound.r = star
            rounds.push(uRound)
        }
        uRound.t = new Date();
        userDB.doc(userInfo._id).update({rounds: rounds});

        return userInfo;
    } else {
        console.error("用户不存在")
        return null;
    }
}
