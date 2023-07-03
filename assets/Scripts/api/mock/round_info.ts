export const ROUND_INFO = [
    {
        "_id": 1, //Id ,同时对应关卡级别
        "specialCards": ['W1', 'W2', 'W2'],
        "cards": ['B1', 'DF', 'T1', 'T5', 'T5', 'T6', 'T7', 'T8', 'T9', 'W4'],
        "options":[{'type':"card","value":['W6','W5']},{'type':"card","value":['T6','T7']},{'type':"card","value":['T2','T5','T8']},{'type':"text","string":'都不对'}],
        "question": '下列哪些牌可以胡？',
        "mode": 2,//1--正常，2--乱序，3--倒计时马赛克，4--乱序+倒计时马赛克
        "answer": [1],
        "answerType": 2 ,//答案模式：1--单选，2--多选，3--判断
        "descr": "典型的一条龙牌型，能和所有饼牌",
        "level":1
    },
    {
        "_id": 2, //Id ,同时对应关卡级别
        "specialCards": [],
        "cards": ['B2', 'B3', 'B4', 'B4', 'B4', 'B4', 'B6', 'B5', 'B7', 'B8','B9', 'B9', 'B9'],
        "options":[{'type':"card","value":['B1','B4','B7']},{'type':"card","value":['B2','B5','B8']},{'type':"card","value":['T2','T5','T8']},{'type':"text","string":'都可以'}],
        "question": '下列哪些牌可以胡？',
        "mode":3,//1--正常，2--乱序，3--倒计时马赛克，4--乱序+倒计时马赛克
        "answer": [2],
        "answerType": 1 ,//答案模式：1--单选，2--多选，3--判断
        "descr": "典型的一条龙牌型",
        "level":2
    }, 
    {
        "_id":3, //Id ,同时对应关卡级别
        "specialCards": [],
        "cards": ['B2', 'B3', 'B4', 'B4', 'B4', 'B4', 'B6', 'B5', 'B7', 'B8','B9', 'B9', 'B9'],
        "options":[{'type':"card","value":['B1','B4','B7']},{'type':"card","value":['B2','B5','B8']},{'type':"card","value":['T2','T5','T8']},{'type':"text","string":'都可以'}],
        "question": '下列哪些牌可以胡？',
        "mode":3,//1--正常，2--乱序，3--倒计时马赛克，4--乱序+倒计时马赛克
        "answer": [2],
        "answerType": 1 ,//答案模式：1--单选，2--多选，3--判断
        "descr": "典型的一条龙牌型",
        "level":3
    }, 
]
