export interface IPhysicsBuffStruct{
   ImmediatelyAlterBaseAttr: any;
   /*
   key名:Key
   描述:每种Buff的唯一ID
   */
   'Key': number;
   /*
   key名:BuffID
   描述:同类型Buff的ID
   */
   'BuffID': number;
   /*
   key名:Name
   描述:Buff的名称
   */
   'Name': string;
   /*
   key名:Level
   描述:Buff的等级
   */
   'Level': number;
   /*
   key名:Desc
   描述:Buff的详细描述
   */
   'Desc': string;
   /*
   key名:CountDownTime
   描述:Buff生命倒计时(0代表无限时间)
   */
   'CountDownTime': number;
   /*
   key名:ListenTrigger
   描述:监听的触发类型:Tri 执行事件类型:Exec 执行参数:Param
      *:0 :插入Buff时    (携带参数:{ Owner:Buff拥有者 })      
      *:1 :删除Buff时    (携带参数:{ Owner:Buff拥有者 })       
      *:2 :定时器触发回调 (携带参数:{ Owner:Buff拥有者 })     
      *:3 :攻击敌人前     (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 BeAtker:被攻击对象 Hurm:造成伤害}) 
      *:4 :攻击敌人后     (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 BeAtker:被攻击对象 Hurm:造成伤害})   
      *:5 :被敌人攻击前   (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 Hurm:造成伤害})    
      *:6 :被敌人攻击后   (携带参数:{ Owner:Buff拥有者 OperObj:攻击对象 Hurm:造成伤害})    
      *:7 :击杀敌人前     (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})    
      *:8 :击杀敌人后     (携带参数:{ Owner:Buff拥有者 })    
      *:9 :自己死亡前     (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})  
      *:10:基础子弹死亡前 (携带参数:{ Owner:Buff拥有者 OperObj:被击杀对象})     
      *:
      *:执行类型:
      *:1 :在当前位置创建指定对象                    (需求参数顺序:{ Owner:Buff拥有者 })       
      *:2 :在操作对象位置创建指定对象                 (需求参数顺序:{ OperObj:操作对象 })                     
      *:3 :给当前玩家插入一个Buff                    (需求参数顺序:{ Owner:Buff拥有者 }) 
      *:4 :给当前操作玩家插入一个Buff                (需求参数顺序:{ OperObj:操作对象 }) 
      *:5 :修改当前玩家的基础属性                    (需求参数顺序:{ Owner:Buff拥有者 }) 
      *:6 :修改操作玩家的基础属性                    (需求参数顺序:{ OperObj:操作对象 }) 
      *:7 :修改当前玩家的基础属性                    (需求参数顺序:{ Owner:Buff拥有者 }) 
      *:8 :修改操作玩家的基础属性                    (需求参数顺序:{ OperObj:操作对象 }) 
      *:9 :修改当前玩家的最终属性                    (需求参数顺序:{ Owner:Buff拥有者 }) 
      *:10:修改操作玩家的最终属性                    (需求参数顺序:{ OperObj:操作对象 }) 
   */
   'ListenTrigger': {Tri:number;Exec:number;Param:string[];}[];
};
class PhysicsBuff{
   private mConfigObject:{[key:number]:IPhysicsBuffStruct}  = {};
   private mConfigArray:IPhysicsBuffStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"BuffID":1,"Name":"毁灭","Level":1,"Desc":"立即增加玩家100%的物理攻击力，","CountDownTime":0,"ListenTrigger":[{"Tri":0,"Exec":5,"Param":["\"100\"","\"10000\""]},{"Tri":1,"Exec":5,"Param":["\"100\"","\"-10000\""]}]};
       this.mConfigObject[2] = {"Key":2,"BuffID":1,"Name":"毁灭","Level":2,"Desc":"立即增加玩家200%的物理攻击力，","CountDownTime":0,"ListenTrigger":[{"Tri":0,"Exec":5,"Param":["\"100\"","\"20000\""]},{"Tri":1,"Exec":5,"Param":["\"100\"","\"-20000\""]}]};
       this.mConfigObject[3] = {"Key":3,"BuffID":1,"Name":"毁灭","Level":3,"Desc":"立即增加玩家300%的物理攻击力，","CountDownTime":0,"ListenTrigger":[{"Tri":0,"Exec":5,"Param":["\"100\"","\"30000\""]},{"Tri":1,"Exec":5,"Param":["\"100\"","\"-30000\""]}]};
       this.mConfigObject[4] = {"Key":4,"BuffID":1,"Name":"毁灭","Level":4,"Desc":"立即增加玩家400%的物理攻击力，","CountDownTime":0,"ListenTrigger":[{"Tri":0,"Exec":5,"Param":["\"100\"","\"40000\""]},{"Tri":1,"Exec":5,"Param":["\"100\"","\"-40000\""]}]};
       this.mConfigObject[5] = {"Key":5,"BuffID":1,"Name":"毁灭","Level":5,"Desc":"立即增加玩家500%的物理攻击力，","CountDownTime":0,"ListenTrigger":[{"Tri":0,"Exec":5,"Param":["\"100\"","\"50000\""]},{"Tri":1,"Exec":5,"Param":["\"100\"","\"-50000\""]}]};
       this.mConfigObject[6] = {"Key":6,"BuffID":2,"Name":"子弹散射","Level":1,"Desc":"枪弹在消散时,向周围随机1枚随机角度的溅射子弹","CountDownTime":0,"ListenTrigger":[{"Tri":10,"Exec":2,"Param":["\"Sputtering\"","\"1\""]}]};
       this.mConfigObject[7] = {"Key":7,"BuffID":2,"Name":"子弹散射","Level":2,"Desc":"枪弹在消散时,向周围随机2枚随机角度的溅射子弹","CountDownTime":0,"ListenTrigger":[{"Tri":10,"Exec":2,"Param":["\"Sputtering\"","\"2\""]}]};
       this.mConfigObject[8] = {"Key":8,"BuffID":2,"Name":"子弹散射","Level":3,"Desc":"枪弹在消散时,向周围随机3枚随机角度的溅射子弹","CountDownTime":0,"ListenTrigger":[{"Tri":10,"Exec":2,"Param":["\"Sputtering\"","\"3\""]}]};
       this.mConfigObject[9] = {"Key":9,"BuffID":2,"Name":"子弹散射","Level":4,"Desc":"枪弹在消散时,向周围随机4枚随机角度的溅射子弹","CountDownTime":0,"ListenTrigger":[{"Tri":10,"Exec":2,"Param":["\"Sputtering\"","\"4\""]}]};
       this.mConfigObject[10] = {"Key":10,"BuffID":2,"Name":"子弹散射","Level":5,"Desc":"枪弹在消散时,向周围随机5枚随机角度的溅射子弹","CountDownTime":0,"ListenTrigger":[{"Tri":10,"Exec":2,"Param":["\"Sputtering\"","\"5\""]}]};
       this.mConfigObject[11] = {"Key":11,"BuffID":2,"Name":"子弹散射","Level":6,"Desc":"枪弹在消散时,向周围随机6枚随机角度的溅射子弹","CountDownTime":0,"ListenTrigger":[{"Tri":10,"Exec":2,"Param":["\"Sputtering\"","\"6\""]}]};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): IPhysicsBuffStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<IPhysicsBuffStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_PhysicsBuff:PhysicsBuff = new PhysicsBuff();