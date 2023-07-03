// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV}) // 使用当前云环境

const db = cloud.database() //引用云数据库
const roundDB = db.collection("round_info") //引用data数据表（刚创建的那个数据表名称）
// 云函数入口函数
exports.main = async (event, context) => {
    let {pageNo, pageSize} = event
    if (!pageNo) {
        pageNo = 0;
    }
    if (!pageSize) {
        pageSize = 20;
    }
    //分页
    let roundList = roundDB.skip(pageNo * pageSize) // 跳过结果集中的前 10 条，从第 11 条开始返回
        .limit(pageSize) // 限制返回数量为 10 条get();
        .get();
    //获取用户实际通关数据
    return roundList;
}
