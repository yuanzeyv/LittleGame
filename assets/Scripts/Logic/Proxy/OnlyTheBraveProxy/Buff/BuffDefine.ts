
/*
监听的触发类型:Tri 执行事件类型:Exec 执行参数:Param
0 :插入Buff时    (携带参数:{ Owner:Buff拥有者 })      
1 :删除Buff时    (携带参数:{ Owner:Buff拥有者 })       
2 :定时器触发回调 (携带参数:{ Owner:Buff拥有者 })     
3 :攻击敌人前     (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 BeAtker:被攻击对象 Hurm:造成伤害}) 
4 :攻击敌人后     (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 BeAtker:被攻击对象 Hurm:造成伤害})   
5 :被敌人攻击前   (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 Hurm:造成伤害})    
6 :被敌人攻击后   (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 Hurm:造成伤害})    
7 :击杀敌人前     (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})    
8 :击杀敌人后     (携带参数:{ Owner:Buff拥有者 })    
9 :自己死亡前     (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})  
10:基础子弹死亡前 (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})     

执行类型:
0 :在当前位置创建指定对象                      (需求参数顺序:{ Owner:Buff拥有者 })       
1 :在操作对象位置创建指定对象                   (需求参数顺序:{ OperObj:操作对象 })                     
2 :在被攻击对象位置创建指定对象                 (需求参数顺序:{ BeAtker:操作对象 })                     
3 :给当前玩家插入一个Buff                    (需求参数顺序:{ Owner:Buff拥有者 }) 
4 :给当前操作玩家插入一个Buff                (需求参数顺序:{ OperObj:操作对象 }) 
5 :给被攻击敌人插入一个Buff                      (需求参数顺序:{ BeAtker:操作对象 }) 
6 :修改当前玩家的一些属性信息                    (需求参数顺序:{ Owner:Buff拥有者 }) 
7 :修改操作玩家的一些属性信息                (需求参数顺序:{ OperObj:操作对象 }) 
8 :修改被攻击玩家的一些属性信息                (需求参数顺序:{ BeAtker:操作对象 })  
9 :修改当前玩家的一些属性信息                    (需求参数顺序:{ Owner:Buff拥有者 }) 
10 :修改操作玩家的一些属性信息                (需求参数顺序:{ OperObj:操作对象 }) 
11 :修改被攻击玩家的一些属性信息                (需求参数顺序:{ BeAtker:操作对象 }) 
*/
export enum eTriggerType{
    InsertBuff     = 0,//插入Buff时    (携带参数:{ Owner:Buff拥有者 })      
    RemoveBuff     = 1,//删除Buff时    (携带参数:{ Owner:Buff拥有者 })       
    OutTimeBuff    = 2,//定时器触发回调 (携带参数:{ Owner:Buff拥有者 })     
    AttackFront    = 3,//攻击敌人前     (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 BeAtker:被攻击对象 Hurm:造成伤害}) 
    AttackAfter    = 4,//攻击敌人后     (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 BeAtker:被攻击对象 Hurm:造成伤害})   
    BeHitFront     = 5,//被敌人攻击前   (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 Hurm:造成伤害})    
    BeHitAfter     = 6,//被敌人攻击后   (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 Hurm:造成伤害})    
    KillEnemyFront = 7,//击杀敌人前     (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})    
    KillEnemyAfter = 8,//击杀敌人后     (携带参数:{ Owner:Buff拥有者 })    
    SelfDie        = 9,//自己死亡前     (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})  
    CompDie        =10,//基础子弹死亡前 (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象}) 
    finally                     ,//计算用
};
export enum eExecuteType{
    InsertObjOfSelf         = 0 ,//0 :在当前位置创建指定对象                      (需求参数顺序:{ Owner:Buff拥有者 })       
    InsertObjOfOper         = 1 ,//1 :在操作对象位置创建指定对象                   (需求参数顺序:{ OperObj:操作对象 })                     
    InsertObjOfBeAttker     = 2 ,//2 :在被攻击对象位置创建指定对象                 (需求参数顺序:{ BeAtker:操作对象 })                     
    InsertBuffOfSelf        = 3 ,//3 :给当前玩家插入一个Buff                    (需求参数顺序:{ Owner:Buff拥有者 }) 
    InsertBuffOfOper        = 4 ,//4 :给当前操作玩家插入一个Buff                (需求参数顺序:{ OperObj:操作对象 }) 
    InsertBuffOfBeAttker    = 5 ,//5 :给被攻击敌人插入一个Buff                      (需求参数顺序:{ BeAtker:操作对象 }) 
    AlterBaseAttrOfSelf     = 6 ,//6 :修改当前玩家的一些属性信息                    (需求参数顺序:{ Owner:Buff拥有者 }) 
    AlterBaseAttrOfOper     = 7 ,//7 :修改操作玩家的一些属性信息                (需求参数顺序:{ OperObj:操作对象 }) 
    AlterBaseAttrOfBeAttker = 8 ,//8 :修改被攻击玩家的一些属性信息                (需求参数顺序:{ BeAtker:操作对象 })  
    AlterFinalAttrOfSelf    = 9 ,//9 :修改当前玩家的一些属性信息                    (需求参数顺序:{ Owner:Buff拥有者 }) 
    AlterFinalAttrOfOper    = 10,//10 :修改操作玩家的一些属性信息                (需求参数顺序:{ OperObj:操作对象 }) 
    AlterFinalAttrOfBeAttker= 11,//11 :修改被攻击玩家的一些属性信息                (需求参数顺序:{ BeAtker:操作对象 })  
    finally                     ,//计算用
};