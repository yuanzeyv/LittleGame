import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
//目前不做本地存储。 
//先直接写死在内存中
export enum GameSetting{
    MUSIC,              //背景音乐
    SOUND_EFFECT,       //背景音效
}
//每个系统会有一万的消息可使用
export class GameSettingProxy extends BaseProxy{ 
    static  get ProxyName():string { return "GameSettingProxy" };

    private m_GameSettingMap:Map<GameSetting,number> = new Map<GameSetting,number>();
    public onRegister(): void {
        this.InitSetting();

    }
    public InitSetting(){ 
        for(let key in GameSetting){
            if(Number(key) == 0 || Number(key))
                continue;
            let ID:number = Number(GameSetting[key]);
            this.m_GameSettingMap.set(ID,1);
        }
    }

    //获取到游戏的设置
    public GetSetting(type:GameSetting):number{
        let value:number | undefined = this.m_GameSettingMap.get(type);
        if(value == undefined)
            return 0;
        return value;
    }
    
    //设置游戏的设置
    public SetSetting(type:GameSetting,value:number){
        return this.m_GameSettingMap.set(type,value);
    }
}  
