import { GroupObject } from "./GroupObject";
import { Object } from "../Object";
import { _Facade } from "../../../../../Global";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";

export class AndObjectGroup extends GroupObject{ 
    public RemoveChildByID(id:number):boolean{
        if(!super.RemoveChildByID(id))
            return false;
        this.RemoveChildren();//删除所有子节点
        this.RemoveObject();
        return true;
    }  

    //删除当前节点下的所有的子节点 
    public RemoveChildren():void{
        for(let cell of this.mChildrenArray){
            let object:Object = cell;
            object.RemoveChildren();//子节点再次删除自己的所有子节点
            object.PlayerBase.Destory();//刚体销毁自己 
            object.Parent = undefined;//子节点的父节点设置为空
        }
        this.mChildrenArray.splice(0,this.mChildrenArray.length);
    }
};
