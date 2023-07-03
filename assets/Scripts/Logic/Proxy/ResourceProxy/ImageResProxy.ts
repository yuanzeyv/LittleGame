import { SpriteFrame, tween ,Node, Asset} from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade } from "../../../Global";
import { ResouceModuleProxy } from "./ResouceModuleProxy";
import { ResouceNotice } from "./ResouceNotice";
import { ResouceProxy1 } from "./ResouceProxy";
export type KeyPartial<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T];
export type KeyPartialArr<T> = {[Key in keyof T]: T[Key] extends Function ? never : Key;}[keyof T][];
interface ResouceParam<T>{
    obj:T;
    paramArray:KeyPartialArr<T>;
}
type Path = string;
class ImageResNotice extends ResouceNotice{
}
//图片资源管理器
export class ImageResProxy extends ResouceModuleProxy{  
    static  get ProxyName():string { return "ImageResProxy" };
    protected CreateNotice(path):ResouceNotice{
        return new ImageResNotice(this,path);
    }  
}