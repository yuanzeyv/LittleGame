import { BuffControl } from "../../../../../Tool/ExeclToScript/BuffTest/Buff/BuffControl";
import { Cfg_Buff, IBuffStruct } from "../../../Config/Cfg_Buff";
export class Buff{
    private mBuffID:number;//每一个Buff的唯一ID
    protected mBuffCfg:IBuffStruct;//当前Buff的配置表
    protected mLifeCount:number;//生命次数 每次触发对应的扣除逻辑后，就会进行-1,当LifeCount为0时，删除本Buff 
    constructor(buffID:number,buffIndex:number,buffLife:number){
        this.mBuffID = buffID;
        this.mBuffCfg = Cfg_Buff.GetData(buffIndex)!;
        this.mLifeCount = buffLife;
    }
}