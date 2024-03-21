import { Camp } from "./Camp";
export class Player{
    private mName:string;//玩家名称
    private AffiliationCamp:Camp;//玩家所属阵营 
    //玩家需要一个
    public constructor(camp:Camp,name:string){
        this.mName = name;
        this.AffiliationCamp = camp;
    }
    //当前玩家的阵营信息
    public get Camp():Camp{ return this.AffiliationCamp; } 
    
    //获取到玩家的敌人信息
    public get Enemy():Player{ return this.Camp.EnemyCamp.MainPlayer; } 
    
    //获取玩家名称 
    public get Name():string{ return this.mName; }
}