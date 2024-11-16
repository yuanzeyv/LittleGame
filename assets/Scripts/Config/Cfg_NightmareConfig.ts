export interface INightmareConfigStruct{
   /*
   key名:Key
   描述:怪物的唯一ID
   */
   'Key': number;
   /*
   key名:Name
   描述:怪物的名称
   */
   'Name': string;
   /*
   key名:RigidBodyID
   描述:怪物对应的刚体信息
   */
   'RigidBodyID': number;
   /*
   key名:Level
   描述:怪物的等级
   */
   'Level': number;
   /*
   key名:Desc
   描述:怪物描述
   */
   'Desc': string;
   /*
   key名:AddtionAttr
   描述:增加的属性信息
   */
   'AddtionAttr': {k:number;v:number;}[];
   /*
   key名:NeedExp
   描述:升级所需经验
   */
   'NeedExp': number;
};
class NightmareConfig{
   private mConfigObject:{[key:number]:INightmareConfigStruct}  = {};
   private mConfigArray:INightmareConfigStruct[] = [];
   public constructor(){
       this.InitConfig();
       this.InitArray();
   }
   private InitConfig():void{
       this.mConfigObject[1] = {"Key":1,"Name":"一级的怪物","RigidBodyID":24,"Level":1,"Desc":"一级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":10},{"k":60,"v":500},{"k":36,"v":0.8},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":25};
       this.mConfigObject[2] = {"Key":2,"Name":"二级的怪物","RigidBodyID":24,"Level":2,"Desc":"二级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":15},{"k":60,"v":800},{"k":36,"v":1.2},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":50};
       this.mConfigObject[3] = {"Key":3,"Name":"三级的怪物","RigidBodyID":24,"Level":3,"Desc":"三级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":15},{"k":60,"v":1200},{"k":36,"v":1.2},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":75};
       this.mConfigObject[4] = {"Key":4,"Name":"四级的怪物","RigidBodyID":24,"Level":4,"Desc":"四级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":15},{"k":60,"v":1500},{"k":36,"v":1.2},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":100};
       this.mConfigObject[5] = {"Key":5,"Name":"五级的怪物","RigidBodyID":24,"Level":5,"Desc":"四级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":20},{"k":60,"v":1600},{"k":36,"v":1.2},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":150};
       this.mConfigObject[6] = {"Key":6,"Name":"六级的怪物","RigidBodyID":24,"Level":6,"Desc":"四级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":30},{"k":60,"v":1600},{"k":36,"v":2},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":200};
       this.mConfigObject[7] = {"Key":7,"Name":"七级的怪物","RigidBodyID":24,"Level":7,"Desc":"四级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":32},{"k":60,"v":1600},{"k":36,"v":2.1},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":260};
       this.mConfigObject[8] = {"Key":8,"Name":"八级的怪物","RigidBodyID":24,"Level":8,"Desc":"四级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":35},{"k":60,"v":1800},{"k":36,"v":2.5},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":300};
       this.mConfigObject[9] = {"Key":9,"Name":"九级的怪物","RigidBodyID":24,"Level":9,"Desc":"四级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":40},{"k":60,"v":2000},{"k":36,"v":2.7},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":320};
       this.mConfigObject[10] = {"Key":10,"Name":"十级的怪物","RigidBodyID":24,"Level":10,"Desc":"四级的怪物，拥有摧山之能","AddtionAttr":[{"k":0,"v":45},{"k":60,"v":2200},{"k":36,"v":3},{"k":33,"v":5},{"k":69,"v":30}],"NeedExp":400};
   }
   private InitArray(){
       for(let key in this.mConfigObject)
           this.mConfigArray.push(this.mConfigObject[key]);
   }
   public GetLen(){
       return this.mConfigArray.length;
   }
   public GetData(key:number): INightmareConfigStruct|undefined{
       return this.mConfigObject[key];
   }
    public GetDatas():Readonly<Array<INightmareConfigStruct>>{
       return this.mConfigArray;
   }
}
export let Cfg_NightmareConfig:NightmareConfig = new NightmareConfig();