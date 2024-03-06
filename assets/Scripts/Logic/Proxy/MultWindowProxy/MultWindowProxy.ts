import { find,Node, Vec3, Widget } from "cc"; 
import { WindowInterface } from "../../../Compoment/WindowInterface";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
import { _Facade, _G } from "../../../Global";
import { IMultPanleStruct, MultPanleConfig } from "../../../Config/Cfg_MultPanle";
export enum eWindowLevel{
    One    = 1,//一级窗口
    Second = 2,//二级窗口
    Three  = 3,//三级窗口
    Final  = 4,//最终大小
};
//用于管理当前游戏中的所有窗口 以及 预制体缓存
export class MultWindowProxy extends BaseProxy{
    static get ProxyName():string { return "MultWindowProxy" }; 
    private mWindowConfigMap:Map<number,{type:eWindowLevel,parent:number,children:Array<number>,config:IMultPanleStruct}> = new Map<number,{type:eWindowLevel,parent:number,children:Array<number>,config:IMultPanleStruct}>();//初始化当前界面的表信息
    //value 窗口的控制组件 key mediator分配的名称
    private mWindowMap:Map<string,WindowInterface> = new Map<string,WindowInterface>()//保存所有的窗口对象信息，支持打开一个窗口，支持关闭一个窗口。
    public onLoad(): void {  
        this.InitMultWindowTable();
    }    
        
    //初始化多面板表
    private InitMultWindowTable():void{
        //循环遍历所有的表
        for(let cell of MultPanleConfig.GetDatas()){
            if(cell.type >= eWindowLevel.Final){
                console.warn(`请检查窗口ID:${cell.key}的窗口类口类型是否正常`);
                continue;
            }
            let windowConfig = {type:cell.type,parent:0,children:cell.childWindow,config:cell};
            this.mWindowConfigMap.set(cell.key,windowConfig);
        }
        //遍历所有的数据结构，对所有的子节点赋予父级
        for(let cell of this.mWindowConfigMap){
            if(cell[1].type == eWindowLevel.One){
                for(let childID of cell[1].children){
                    let childConfig:{type:eWindowLevel,parent:number,children:Array<number>,config:IMultPanleStruct}|undefined = this.mWindowConfigMap.get(childID);
                    if(childConfig == undefined){
                        console.warn(`请检查窗口ID:${childID}是否存在`);
                        continue;
                    }
                    if(childConfig.type != eWindowLevel.Second){
                        console.warn(`请检查窗口ID:${childID},其为一级窗口:${cell[0]}的二级界面，却不是二级界面`);
                        continue;
                    }
                    if(childConfig.parent != 0){
                        console.warn(`二级窗口是否被多个一级窗口引用 :${childConfig.parent} ${cell[0]}`);
                        continue;
                    }
                    childConfig.parent = cell[0];
                }
            } else if(cell[1].type == eWindowLevel.Second){
                for(let childID of cell[1].children){
                    let childConfig:{type:eWindowLevel,parent:number,children:Array<number>,config:IMultPanleStruct}|undefined = this.mWindowConfigMap.get(childID);
                    if(childConfig == undefined){
                        console.warn(`请检查窗口ID:${childID}是否存在`);
                        continue;
                    }
                    if(childConfig.type != eWindowLevel.Three){
                        console.warn(`请检查窗口ID:${childID},其为二级窗口:${cell[0]}的三级界面，却不是三级界面`);
                        continue;
                    }
                    if(childConfig.parent != 0){
                        console.warn(`三级窗口是否被多个二级窗口引用 :${childConfig.parent} ${cell[0]}`);
                        continue;
                    }
                    childConfig.parent = cell[0];
                }
            }
        } 
        //循环遍历所有二 三 级窗口有没有父节点，如果没有进行剔除
        this.mWindowConfigMap.forEach((value: { type: eWindowLevel; parent: number; children: number[]; config: IMultPanleStruct; }, key: number)=>{
            if(value.type == eWindowLevel.One || value.parent != 0)
                return;
            console.warn(`窗口ID${key},没有父节点,程序删除了这个无用的单元`);
            this.mWindowConfigMap.delete(key);
        });
    }  

    //获取到某个ID的主线
    public GetOneLevelWindowID(windowID:number):number{
        let ret:number = windowID;
        while(true){
            let config:{type:eWindowLevel,parent:number,children:Array<number>,config:IMultPanleStruct}|undefined = this.mWindowConfigMap.get(ret);
            if(config == undefined){
                ret = 0; 
                break;
            }
            if(config.type == eWindowLevel.One)
                break;
            ret = config.parent;
        }
        return ret;
    }

    //获取到主窗口下所存在的所有的子窗口 
    public GetWindowArrayByParentWindow(oneWindowID:number):Array<number>{
        let ret:Array<number> = new Array<number>();
        let windowConfig:{type:eWindowLevel,parent:number,children:Array<number>,config:IMultPanleStruct}|undefined  = this.mWindowConfigMap.get(oneWindowID);
        if(windowConfig == undefined )
            return ret;
        return windowConfig.children.concat();
    }
}   