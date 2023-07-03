import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
//每个系统会有一万的消息可使用
export class TestProxy extends BaseProxy{ 
    static  get ProxyName():string { return "TestProxy" };
    private m_MyData:string = "这是一个简单的测试数据";
    public getMyData():string { 
        return this.m_MyData;
    } 
}  
