import { Vec2 } from "cc";
import { eRigidType } from "../../../../Util/Physics/PhysicsDefine";
import { PhysicsWrold } from "../../../../Util/Physics/World";
import { PlayerBase } from "../Physics/PlayerBase";

export class Object{  
    protected mParam:string;//自定义用户参数
    protected mName:string;//用于获取到唯一ID
    protected mParent:Object|undefined = undefined;//父亲节点（节点对象对应的结构） 
    //记录对象的所有子节点信息
    protected mChildrenArray:Array<Object> = new Array<Object>();

    //节点对应的刚体信息(每个节点都有一个刚体对象，用于处理游戏中的碰撞逻辑)
    protected mPlayerBase:PlayerBase;//物理世界中的刚体对象
    /* 
    *name:对象的名称
    *pos:对象相对父节点的位置信息
    *rotate:对象相对父节点的旋转信息
    */
    constructor(physicsWorld:PhysicsWrold,name:string,bodyID:number,functionBodys:Array<number>,pos:Vec2 = new Vec2(0,0),rotate:number = 0,param:string = ""){
        this.mName = name;//节点的名称（组的话，就用组名称 + ID）  
        this.mParam = param;
        this.InitPhysicsPlayer(physicsWorld,bodyID,functionBodys,pos,rotate);
        this.PlayerBase.RigidBody.LockRotation(true);//锁定旋转方向
    }
    
    /*
    *节点尝试添加一个子节点
    */
    public AddChild(child:Object):void{
        if(child.mParent == this)
            return;  
        child.mParent = this;//设置节点的父节点
        this.mChildrenArray.push(child);
    }

    /*
    *通过ID获取到一个子节点
    */
    public GetChildByName(name:string):Object{
        return this.mChildrenArray.find((obj:Object)=> obj.mName == name);
    }
    
    /*
    *通过ID获取到一个对象
    */
    public GetChildByID(id:number):Object{
        return this.mChildrenArray.find((obj:Object)=> obj.ID == id);
    }

    //删除对象数组中的一个元素，通过ID
    protected PopChildByID(id:number):void{
        let index:number = this.mChildrenArray.findIndex((obj:Object)=> obj.ID == id);
        if(index == -1)
            return;
        this.mChildrenArray.splice(index,1);
    }
 
    protected RigidType():eRigidType{ return eRigidType.Dynamic; }
    
    //尝试初始化物理对象
    protected InitPhysicsPlayer(physicsWorld: PhysicsWrold,bodyID:number,functionBodys:Array<number>,pos:Vec2 = new Vec2(0,0),rotate:number = 0):void{ 
        this.mPlayerBase = new PlayerBase(physicsWorld,this.RigidType(),bodyID,functionBodys);//默认所有的组对象都为静态对象
        this.mPlayerBase.SetPosition((this.mParent ? this.mParent.Position.x : 0) + pos.x,(this.mParent ? this.mParent.Position.y : 0) + pos.y);//设置位置
        this.mPlayerBase.SetRotate((this.mParent ? this.mParent.Rotate : 0)   +  rotate);//设置旋转
    } 

    //删除当前对象下的一个子对象节点
    public RemoveChildByID(id:number):boolean{
        let object:Object|undefined = this.GetChildByID(id);
        if(object == undefined)
            return false;
        this.PopChildByID(id);//将该对象弹出
        object.RemoveChildren();//子节点再次删除自己的所有子节点
        object.mPlayerBase.Destory();//刚体销毁自己 
        object.mParent = undefined;//子节点的父节点设置为空
        return true;
    } 
    
    //删除当前节点下的所有的子节点 
    public RemoveChildren():void{
        this.mChildrenArray.forEach((obj:Object)=>this.RemoveChildByID(obj.ID) );
    } 
    
    //尝试删除自己
    public RemoveObject():void{ 
        if(this.mParent != undefined){
            this.mParent.RemoveChildByID(this.ID);
        }else{
            this.RemoveChildren();
            this.mPlayerBase.Destory();//刚体销毁自己 
        }
    }

    
    //ID对应着刚体ID，是绝对唯一的一个值
    public get ID():number { return this.mPlayerBase.ID; } 

    //自己的名称
    public get Name():string {  return this.mName; }  

    //自己的父节点
    public get Parent():Object { return this.mParent; } 
    public set Parent(parent:Object) { this.mParent = parent; } 

    //节点的位置信息
    public get Position():Vec2 { return this.PlayerBase.GetPosition(); }
    public set Position(pos:Vec2) { this.PlayerBase.SetPosition(pos.x,pos.y); } 
    
    //存储相对于父节点的旋转信息 
    public get Rotate():number { return this.PlayerBase.GetRotate(); }
    public set Rotate(rotate:number) { this.PlayerBase.SetRotate(rotate); } 
    
    //所有的子节点
    public get Children():Array<Object>{ return this.mChildrenArray; }

    //玩家的刚体信息
    public get PlayerBase():PlayerBase{ return this.mPlayerBase; }
    
    //存储相对于父节点的旋转信息 
    public get Param():string { return this.mParam; } 
};
