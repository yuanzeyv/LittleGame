import { _Facade } from "../../../../../Global";
import { OnlyTheBraveProxy } from "../../OnlyTheBraveProxy";
import { GroupObject } from "./GroupObject";

export class SelectObjectGroup extends GroupObject{
    private mIsJudge:boolean = false;
    public RemoveChildByID(id:number):boolean{
        //删除所有的儿子之后，删除自己
        if(!super.RemoveChildByID(id))
            return false;
        if(!this.mIsJudge){
            if(this.Children.length == 0){//已经没有任何子节点了
                this.mIsJudge = true;//变更为已经判断过了
                _Facade.FindProxy(OnlyTheBraveProxy).AnysicsNodeToGroupParent(this,this.Param);
            }
        }
        if(this.Children.length == 0)//已经没有任何子节点了
            this.RemoveObject();
        return true;
    }  
};