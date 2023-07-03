import {PassData} from "db://assets/Scripts/Logic/Proxy/PagePassProxy/PagePassProxy";

export const CardJson = [
    {code: 'B1', desc: '一饼', img: '1', img_b: 'm_1'},
    {code: 'B2', desc: '二饼', img: '2', img_b: 'm_2'},
    {code: 'B3', desc: '三饼', img: '3', img_b: 'm_3'},
    {code: 'B4', desc: '四饼', img: '4', img_b: 'm_4'},
    {code: 'B5', desc: '五饼', img: '5', img_b: 'm_5'},
    {code: 'B6', desc: '六饼', img: '6', img_b: 'm_6'},
    {code: 'B7', desc: '七饼', img: '7', img_b: 'm_7'},
    {code: 'B8', desc: '八饼', img: '8', img_b: 'm_8'},
    {code: 'B9', desc: '九饼', img: '9', img_b: 'm_9'},
    {code: 'W1', desc: '一万', img: '10', img_b: 'm_10'},
    {code: 'W2', desc: '二万', img: '11', img_b: 'm_11'},
    {code: 'W3', desc: '三万', img: '12', img_b: 'm_12'},
    {code: 'W4', desc: '四万', img: '13', img_b: 'm_13'},
    {code: 'W5', desc: '五万', img: '14', img_b: 'm_14'},
    {code: 'W6', desc: '六万', img: '15', img_b: 'm_15'},
    {code: 'W7', desc: '七万', img: '16', img_b: 'm_16'},
    {code: 'W8', desc: '八万', img: '17', img_b: 'm_17'},
    {code: 'W9', desc: '九万', img: '18', img_b: 'm_18'},
    {code: 'T1', desc: '一条', img: '19', img_b: 'm_19'},
    {code: 'T2', desc: '二条', img: '20', img_b: 'm_20'},
    {code: 'T3', desc: '三条', img: '21', img_b: 'm_21'},
    {code: 'T4', desc: '四条', img: '22', img_b: 'm_22'},
    {code: 'T5', desc: '五条', img: '23', img_b: 'm_23'},
    {code: 'T6', desc: '六条', img: '24', img_b: 'm_24'},
    {code: 'T7', desc: '七条', img: '25', img_b: 'm_25'},
    {code: 'T8', desc: '八条', img: '26', img_b: 'm_26'},
    {code: 'T9', desc: '九条', img: '27', img_b: 'm_27'},

    {code: 'DF', desc: '东风', img: '28', img_b: 'm_28'},
    {code: 'NF', desc: '南风', img: '29', img_b: 'm_29'},
    {code: 'XF', desc: '西风', img: '30', img_b: 'm_30'},
    {code: 'BF', desc: '北风', img: '31', img_b: 'm_31'},
    {code: 'ZH', desc: '红中', img: '32', img_b: 'm_32'},
    {code: 'FA', desc: '发财', img: '33', img_b: 'm_33'},
    {code: 'BB', desc: '白板', img: '34', img_b: 'm_34'}
]
let CodeMap: object = {};

CardJson.forEach(v => {
    CodeMap[v.code] = v;
})

export const CardMap = Object.assign({}, CodeMap);
;

