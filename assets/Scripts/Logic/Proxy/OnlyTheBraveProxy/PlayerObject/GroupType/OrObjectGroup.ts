import { GroupObject } from "./GroupObject";


export class OrObjectGroup extends GroupObject{
    public RemoveChildByID(id:number):boolean{
        //删除所有的儿子之后，删除自己
        if(!super.RemoveChildByID(id))
            return false;
        if(this.Children.length == 0)//已经没有任何子节点了
            this.RemoveObject();
        return true;
    }  
};