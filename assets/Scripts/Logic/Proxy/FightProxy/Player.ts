export class Player{
    private mName:string;
    constructor(name:string){
        this.mName = name;
    }

    /*
    获取到当前玩家的名称
    */
   public get Name():string{
        return this.mName;
   }
}