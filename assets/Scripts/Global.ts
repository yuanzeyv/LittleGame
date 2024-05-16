import {IBaseMVCRegister} from "./Frame/MVCRegister/BaseMVCRegister";
import {Facade} from "./Frame/PureMVC"; 
import {TimeWheel} from "./Util/Time/TimeWheel";
class Global {
    private m_Facade: Facade = new Facade();
    get Facade(): Facade { return this.m_Facade; }//返回MVC外观对象
    private m_TimeWheel: TimeWheel = new TimeWheel(10, "Global");

    get TimeWheel(): TimeWheel { return this.m_TimeWheel; }

    private m_GameMVCRegister: IBaseMVCRegister;
    public set GameMVCRegister(logingInMVCRegister: IBaseMVCRegister) {//返回MVC外观对象
        this.m_GameMVCRegister = logingInMVCRegister;
    }
    public get GameMVCRegister(): IBaseMVCRegister {//返回MVC外观对象
        return this.m_GameMVCRegister;
    }
}
export let _G: Global = new Global();//向外导出Gloabl对象
export let _Facade: Facade = _G.Facade;//向外导出Gloabl对象