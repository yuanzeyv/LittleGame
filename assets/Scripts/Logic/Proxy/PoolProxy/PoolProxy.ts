import { Pool,Node, NodePool } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
export class PoolProxy extends BaseProxy{  
    static get ProxyName():string { return "PoolProxy" }; 
    public onLoad(): void {
    }
} 