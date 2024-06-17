// import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
// import { _Facade, _G } from "../../../Global";
// import { SoltCell } from "../../../Util/Time/TimeWheel";  



// export class BuffBase{
//     public mBuffID:number;//当前的BuffIDfangyv c
//     public mBuffLife:number;//buff的对应生命周期
//     public constructor(buffID:number){
//     }
//     public OnInit(){//Buff初始化的时候
//     }

//     public OnEnter(){//Buff进入的时候
//     }

//     public OnExit(){//Buff退出的时候
//     }

//     public OnStart(){//Buff每次被触发的时候
//     }

//     public GetBuffAddtionArray():Array<{attrID:number,value:number}>{//获取到当前Buff所加成的具体属性
//         let ret:Array<{attrID:number,value:number}> = new Array<{attrID:number,value:number}>();
//         return ret;
//     }

//     public IsChangeAttr():boolean{//调用后是否会发生属性变化
//         return false;
//     }    
// };

// export class EntryBattleBuff extends BuffBase{
// }

// export class RoundStartBuff extends BuffBase{
// }

// export class RoundEndBuff extends BuffBase{
// }

// export class AttackEndBuff extends BuffBase{
// }




// abstract class BuffType{
//     protected mBiologyID:number;//角色ID
//     protected mBuffSignalID:number;//BUff的唯一ID 
//     public constructor(biologyID:number,signalID:number){
//         this.mBiologyID = biologyID;
//         this.mBuffSignalID = signalID; 
//     }
//     //Buff 首次启动时 
//     public abstract OnEnter(); 
//     //Buff 退出时
//     public abstract OnExit(); 
// } 

// class AttrBuffType extends BuffType{    
//     protected mOperAttrType:eAttrAddtionType;//增加的类型 
//     protected mAddtionValue:number;//增加的属性 
//     public constructor(biologyID:number,signalID:number,attrType:eAttrAddtionType,value:number){
//         super(biologyID,signalID);
//         this.mOperAttrType = attrType;
//         this.mAddtionValue = value;
//     }
//     //Buff 首次启动时 
//     public OnEnter(){
//         //_Facade.FindProxy(BiologyAttrProxy).GetBiologyAttrInfo(this.mBiologyID)?.IncreaseAttrAddtionByType(this.mOperAttrType,this.mAddtionValue);
//     }  
//     //Buff 退出时
//     public OnExit(){
//         _Facade.FindProxy(BiologyAttrProxy).GetBiologyAttrInfo(this.mBiologyID)?.IncreaseAttrAddtionByType(this.mOperAttrType,this.mAddtionValue * -1);
//     }
// }

// class BuffInfo{
//     private mSignalID:number;//唯一Buff
//     private mRiologyID:number;//角色唯一ID
//     private mBuffID:number;//BUff的ID 
//     private mBuffCellArray:Array<BuffType> = new Array<BuffType>();//BuffMap
//     private mLifeSolt:SoltCell|undefined = undefined;//定时器
//     public constructor(riologyID:number,signalID:number,buffID:number){
//         this.mSignalID = signalID;
//         this.mRiologyID = riologyID;
//         this.mBuffID = buffID;
//     }
//     public GetSignalID():number{
//         return this.mSignalID;
//     }
//     public GetBuffID():number{
//         return this.mBuffID;
//     }
//     public Init(){
//         let buffData:IBuffTableStruct = BuffTableConfig.GetData(this.mBuffID);
//         if(buffData == undefined)   
//             buffData = BuffTableConfig.GetData(1);
//         for(let i = 1; i <= 5 ;i++){
//             let buffCell:{BuffType:number,addtionValue:number,} = buffData[`buff_${i}`];
//             if(buffCell.BuffType == 0)
//                 continue;
//             let attrBuffType:AttrBuffType = new AttrBuffType(this.mRiologyID,this.mSignalID,buffCell.BuffType as eAttrAddtionType,buffCell.addtionValue)
//             this.mBuffCellArray.push(attrBuffType);//创建一个Buff
//             attrBuffType.OnEnter();
//         }
//         if(buffData.duration != -1){ 
//             this.mLifeSolt = _G.TimeWheel.Set(buffData.duration,()=>{
//                 _Facade.FindProxy(BuffProxy).DeleteBuff(this.mSignalID);//删除本Buff
//             });
//         }
//     }
//     public Destory(){
//         for(let buffCell of this.mBuffCellArray)
//             buffCell.OnExit();
//         this.mBuffCellArray.length = 0;
//         this.mLifeSolt?.Stop();
//     }
// }

// class BiologyBuffInfo{ 
//     private mBiologyID:number;//生物ID
//     private mBuffMap:Map<number,BuffInfo> = new Map<number,BuffInfo>();//管理的所有Buff信息
//     constructor(biologyID:number){
//         this.mBiologyID = biologyID;
//     }
//     //添加一个BUff
//     public AddBuff(signalID:number,buffID:number):BuffInfo{ 
//         let buffInfo:BuffInfo = new BuffInfo(this.mBiologyID,signalID,buffID);
//         buffInfo.Init();
//         this.mBuffMap.set(signalID,buffInfo); 
//         return buffInfo;
//     }
//     //删除一个Buff
//     public DelBuff(signalID:number):void{
//         let buffInfo:BuffInfo|undefined = this.mBuffMap.get(signalID); 
//         if(buffInfo == undefined)
//             return;
//         buffInfo.Destory();//销毁此buff
//         this.mBuffMap.delete(signalID);
//     }
//     //删除一个Buff
//     public ClearBuff():void{
//         this.mBuffMap.forEach((buffInfo:BuffInfo)=>this.DelBuff(buffInfo.GetSignalID()));
//     }
// } 
// export class BuffProxy extends BaseProxy{  
//     private static sBuffSingelID:number = 1;//Buff的唯一ID分配
//     static get ProxyName():string { return "BuffProxy" }; 
//     private mBiologyBuffMap:Map<number,BiologyBuffInfo> = new Map<number,BiologyBuffInfo>();//生物对应的Buff对象
//     private mBuffSignalMap:Map<number,number> = new Map<number,number>();//BuffID对应所有Buff信息

//     public AddBiology(biologyID:number){//添加一个角色
//         let biologyBuffInfo:BiologyBuffInfo|undefined = this.mBiologyBuffMap.get(biologyID);
//         if(biologyBuffInfo != undefined)
//             return;
//         this.mBiologyBuffMap.set(biologyID,new BiologyBuffInfo(biologyID));
//     }
//     public DelBiology(biologyID:number){//删除一个角色
//         let biologyBuffInfo:BiologyBuffInfo|undefined = this.mBiologyBuffMap.get(biologyID);
//         if(biologyBuffInfo == undefined)
//             return;
//         biologyBuffInfo.ClearBuff();
//         this.mBiologyBuffMap.delete(biologyID);
//     }
//     public HasBiology(biologyID:number):boolean{//删除一个角色
//         return this.mBiologyBuffMap.has(biologyID);
//     }

//     public AddBuff(biologyID:number,buffID:number):number{
//         if(BuffTableConfig.GetData(buffID) ==undefined)//首先判断BuffID是否存在于表内
//             return 0;//返回未添加
//         let biologyBuffInfo:BiologyBuffInfo|undefined = this.mBiologyBuffMap.get(biologyID);
//         if(biologyBuffInfo == undefined)
//             return 0;
//         let signalID:number = BuffProxy.sBuffSingelID++;
//         biologyBuffInfo.AddBuff(signalID,buffID);//为角色添加一个Buff
//         this.mBuffSignalMap.set(signalID,biologyID);
//         return signalID;
//     }

//     public DeleteBuff(signalID:number):void{
//         let biologyID:number|undefined = this.mBuffSignalMap.get(signalID);//首先判断当前BuffID是否存在
//         if(biologyID == undefined)//添加过此ID的buff
//             return; 
//         let biologyBuffInfo:BiologyBuffInfo = this.mBiologyBuffMap.get(biologyID)!;
//         biologyBuffInfo.DelBuff(signalID);
//         this.mBuffSignalMap.delete(signalID);
//     }

// } 