import { AttrObj } from "./AttrObj";
import { eBaseAttrType, eFinalAttrType } from "./AttrType";
import { _G } from "../../../../Global";
import { GameObjectData } from "../GameObjectPool/GameObjectData";
import { GameRefObject } from "../GameObjectPool/GameRefObject";
/*
*本属性的设计模式为:
*每个属性绑定一个父亲属性，当父亲属性变动的时候，父亲属性的所有儿子属性都会跟随变动
*/
export class AttrObjectFacade extends GameObjectData{  
    private mParentObj:GameRefObject<AttrObjectFacade>;//父亲的游戏引用对象
    private mChildAttrObject:Set<GameRefObject<AttrObjectFacade>> = new Set<GameRefObject<AttrObjectFacade>>();//儿子们的游戏引用对象
    
    private mAttrObj:AttrObj = new AttrObj();//自己的属性对象
    public constructor(){
        super();
        this.mAttrObj = new AttrObj();//首先生成属性对象
    } 
    
    Reset(): void { 
        this.mAttrObj.Reset();//重置这个属性对象
        this.mChildAttrObject.clear();//清理所有的子对象
    }

    //初始化属性
    public InitAttrs(attrs:Array<{K:number,V:number}>):void{
         for(let cell of attrs)
            this.AlterBaseAttr(cell.K,cell.V);
        this.SetFinalAttr(eFinalAttrType.HP,this.GetFinalAttr(eFinalAttrType.MaxHP));
    }

    //所有的修改都是增量更新 
    public AlterBaseAttr(attrType:eBaseAttrType,changeValue:number):boolean{
        let isChange:boolean = this.mAttrObj.AlterBaseAttr(attrType,changeValue)
        if( !isChange )
            return false;
        for(let cell of this.mChildAttrObject)
            cell[1].AlterBaseAttr(attrType,changeValue);
        return isChange; 
    }

    //获取到某一个基础的属性值
    public GetBaseAttr(attrType:eBaseAttrType):number{
        return this.mAttrObj.GetBaseAttr(attrType) || 0;//返回一个数值
    } 
 
    //获取某一个属性的最终属性
    public GetFinalAttr(attrType:eFinalAttrType):number{
        return this.mAttrObj.GetFinalAttr(attrType);//最终属性一定有值
    }

    //直接设置某个最终属性 为固定值
    protected SetFinalAttr(attrType:eFinalAttrType,value:number):void{
        this.mAttrObj.SetFinalAttr(attrType,value);//最终属性一定有值
    } 
    
    //修改玩家HP
    public AlterHP(changeHP:number):boolean{
        let nowHP:number = this.GetFinalAttr(eFinalAttrType.HP);
        nowHP += changeHP;
        if( nowHP < 0)
            nowHP = 0; 
        this.SetFinalAttr(eFinalAttrType.HP,nowHP);
        return nowHP <= 0;//死亡了
    } 

    //设置自己的父亲对象
    public SetParent(parent:GameRefObject<AttrObjectFacade>){
        parent.RefAdd();
        this.mParentObj = parent;
        this.mParentObj.Data.mChildAttrObject.add(this.GameRefObject as any);
        this.GameRefObject.RefAdd();
        //子节点的生命 + 玩家的具体属性
        for(let cell of this.mParentObj.Data.mAttrObj.GetBaseAttrs())
            this.AlterBaseAttr(cell[0],cell[1]);
    }
}