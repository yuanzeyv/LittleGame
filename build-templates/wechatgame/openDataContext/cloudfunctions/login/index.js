// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database() //引用云数据库
const userDB = db.collection("user_data") //引用data数据表（刚创建的那个数据表名称）
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let userInfo = event.userInfo;

    //查询数据库是否已经注册
    let res = await userDB.doc(wxContext.OPENID).get()
    //如果没有注册
    if (!res.data) {
        let addData = {
            _id: wxContext.OPENID,
            openId: wxContext.OPENID,
            ...userInfo,
            due: new Date(),
            level: 0, //用户级别
            maxRound: 0,//最高关卡
            score: 0 //用户分数
        }
        //把获取的数据添加到数据库
        let isAdd = userDB.add({
            data: addData,
        })
        return {
            code: '0',
            data: addData
        }
    } else {
        //已经注册
        return {
            code: '0',
            data: res.data
        }
    }
}
