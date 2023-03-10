
enum RBColor{RED,BLACK} 
//不能让其做类型检查，不然写不下去了
export class RBNode<K,V>{//红黑树对象
    public Parent:RBNode<K,V> |any ;//父亲节点 
    public Left:RBNode<K,V> | any;//左节点
    public Right:RBNode<K,V> | any;//右节点
    public Key:K | any;//当前的键值 
    public Value:V | any;//当前的值  
    public Color:RBColor = RBColor.RED;//当前节点的颜色
    public InitNodeLink(parent:RBNode<K,V>,leftNode:RBNode<K,V>,rightNode:RBNode<K,V>,color:RBColor = RBColor.RED){
        this.Parent = parent;
        this.Left = leftNode; 
        this.Right = rightNode;
        this.Color = color;
    } 
} 

//0 相同，1大于，-1小于
export type CompareDivisor<K> = (keyA:K,KeyB:K)=>number;//比较函数
export class RBTree<K,V>{//红黑树对象
    public RBNIL:RBNode<K,V>;
    private m_Root:RBNode<K,V>;//红黑树的根结点
    private m_Count:number = 0;
    private m_CompareDivisor:CompareDivisor<K>;
    constructor(copareHandle:CompareDivisor<K>){
        this.RBNIL = new RBNode<K,V>(); 
        this.RBNIL.InitNodeLink(this.RBNIL,this.RBNIL,this.RBNIL,RBColor.BLACK);
        this.m_Root = this.RBNIL;
        this.m_CompareDivisor = copareHandle;//设置计算因子
    }

    get Count(){
        return this.m_Count;
    }

    public Has(key:K):boolean{
        return this.Find(key) != this.RBNIL;
    }
    public Get(key:K):RBNode<K,V> | undefined{
        let node:RBNode<K,V>  = this.Find(key);
        return node == this.RBNIL ? undefined:node;
    }
    public GetNext(node:RBNode<K,V>):RBNode<K,V>{//找到当前节点的后继
        let checkNode:RBNode<K,V>  = this.Sucessor(node);
       return checkNode; 
    } 
    public GetFront(node:RBNode<K,V>):RBNode<K,V> | undefined{//找到当前节点的前驱
        return this.Predecessor(node);
    } 
    
    public GetMin():RBNode<K,V> | undefined{//获取到最小值
        let now = this.m_Root;
        while(now.Left != this.RBNIL){
            now  = now.Left;
        }
        return now == this.RBNIL ? undefined:now; 
    }
    public GetMax():RBNode<K,V> | undefined{//获取到最小值
        let now = this.m_Root;
        while(now.Right != this.RBNIL)
            now  = now.Right;
        return now == this.RBNIL ? undefined:now; 
    }
    public Clear(){
        this.m_Count = 0;
        this.m_Root = this.RBNIL;
    }
 
    private PreorderTraversal(node:RBNode<K,V>,loopHandle:(value:V,key?:K,node?:RBNode<K,V>)=>void){//使用前序遍历执行某个函数
        if(node == this.RBNIL)//为空直接返回
            return;
        if(node.Left != this.RBNIL)
            this.PreorderTraversal(node.Left,loopHandle);
        loopHandle(node.Value,node.Key,node);
        if(node.Right != this.RBNIL)
            this.PreorderTraversal(node.Right,loopHandle);
    }

    public forEach(loopHandle:(value:V,key?:K,node?:RBNode<K,V>)=>void){//直接以前序遍历，递归，遍历完整个红黑树
        this.PreorderTraversal(this.m_Root,loopHandle);
    }

    //寻找前驱节点（离当前节点最近的一个节点）
    private Predecessor(node:RBNode<K,V>):RBNode<K,V>{
        if(node == this.RBNIL) return this.RBNIL;
        if(node.Left == this.RBNIL){//左节点为空的情况下
            let predecessorNode:RBNode<K,V> = node;
            while(true){
                if(predecessorNode.Parent == this.RBNIL)//未找到
                    return this.RBNIL;//直接返回空
                if(predecessorNode == predecessorNode.Parent.m_LeftNode)
                    predecessorNode = predecessorNode.Parent;
                else 
                    return predecessorNode.Parent;
            }
        } else {//左节点不为空的情况下
            let predecessorNode:RBNode<K,V> = node.Left;
            let tempNode:RBNode<K,V> = predecessorNode.Right;//不停的寻找左节点的右节点
            while(tempNode != this.RBNIL){
                predecessorNode = tempNode;
                tempNode = tempNode.Right;
            }
            return predecessorNode;
        } 
    }

    //寻找后继节点
    private Sucessor(node:RBNode<K,V>):RBNode<K,V>{ 
        if(node == this.RBNIL) return this.RBNIL;
        if(node.Right == this.RBNIL) {
            let sucessorNode:RBNode<K,V> = node;//找到当前节点的右子树
            while(true){
                if(sucessorNode.Parent == this.RBNIL) return this.RBNIL;//没有父节点的话，也就没有后继节点了
                if(sucessorNode == sucessorNode.Parent.m_LeftNode)//找到了相邻的节点
                    return sucessorNode.Parent;
                else
                    sucessorNode = sucessorNode.Parent;
            } 
        }else{
            let sucessorNode:RBNode<K,V> = node.Right;//找到当前节点的右子树
            let tempNode:RBNode<K,V> = sucessorNode.Left;//循环遍历柚子树的左子树
            while(tempNode != this.RBNIL){
                sucessorNode = tempNode;
                tempNode = tempNode.Left;
            }
            return sucessorNode;//返回后继节点
        }
    }
    private Find(key:K):RBNode<K,V>{//查询一个二叉树节点
        let tempNode:RBNode<K,V> = this.m_Root;//创建一个当前节点的指针
        while(tempNode != this.RBNIL) //当前节点不为空的话
            if (this.m_CompareDivisor(key,tempNode.Key) < 0)
                tempNode = tempNode.Left;
            else if(this.m_CompareDivisor(key,tempNode.Key) > 0)
                tempNode = tempNode.Right;
            else//如果键值相同的话
                return tempNode;//返回
        return this.RBNIL; 
    }

    private LeftRotateNode(rotateNode:RBNode<K,V>):void{//左旋二叉树
        if( rotateNode ==  this.RBNIL ) return;//如果当前的旋转节点为空的话
        let rightNode:RBNode<K,V> = rotateNode.Right; //获取到当前旋转节点的右节点
        rotateNode.Right = rightNode.Left;//右节点等于左节点
        if(rightNode.Left != this.RBNIL){//如果当前的右节点不等于空的话
            rotateNode.Right.m_Parent = rotateNode;//数字父节点归属
        }
        rightNode.Parent = rotateNode.Parent;
        if(rightNode.Parent == this.RBNIL)//如果父节点等于空的话
            this.m_Root = rightNode;//根节点等于右节点
        else if(rightNode.Parent.m_LeftNode == rotateNode)//如果等于左节点的话
            rightNode.Parent.m_LeftNode = rightNode;//设置根的左节点为右节点
        else 
            rightNode.Parent.m_RightNode = rightNode;//设置根的右节点等于右节点
        rightNode.Left = rotateNode;
        rotateNode.Parent = rightNode;//设置右节点的父亲节点
    }

    private RightRotateNode(rotateNode:RBNode<K,V>):void{//右二叉树
        if( rotateNode ==  this.RBNIL ) return; //如果当前的节点为旋转节点
        let leftNode:RBNode<K,V> = rotateNode.Left; //获取到左边的儿子节点
        rotateNode.Left = leftNode.Right;
        if(leftNode.Right != this.RBNIL){//如果当前的右节点不等于空的话
            leftNode.Right.m_Parent = rotateNode;//数字父节点归属
        }
        leftNode.Parent = rotateNode.Parent;//设置左节点的父亲节点
        if(leftNode.Parent == this.RBNIL) //如果左节点的父亲节点为空的话
            this.m_Root = leftNode;//设置当前节点为根节点
        else if(leftNode.Parent.m_LeftNode == rotateNode)
            leftNode.Parent.m_LeftNode = leftNode;
        else 
            leftNode.Parent.m_RightNode = leftNode;
        leftNode.Right = rotateNode;
        rotateNode.Parent = leftNode;
    }   
    
    private InsertNode(key:K,value:V):RBNode<K,V>{//插入一个节点,并返回这个节点
        if(this.m_Root == this.RBNIL){//首先判断当前的根节点是否有值\
            this.m_Root = new RBNode<K,V>();//创建一个节点
            this.m_Root.Key = key;
            this.m_Root.Value = value;
            this.m_Root.InitNodeLink(this.RBNIL,this.RBNIL,this.RBNIL,RBColor.BLACK);
            this.m_Count++;
            return this.m_Root;//直接返回被插入的节点
        }
        let loopNode:RBNode<K,V> = this.m_Root;//带遍历节点
        let parentNode:RBNode<K,V>;//待返回节点
        do{
            parentNode = loopNode; 
            if(this.m_CompareDivisor(key,loopNode.Key) < 0){//如果当前循环的键小于key的话
                loopNode = loopNode.Left;//loopnode变更为右节点
            }else if(this.m_CompareDivisor(key,loopNode.Key)){//如果当前的loopNode大于key的话
                loopNode = loopNode.Right;//loopNode变更为左节点
            }else {//如果直接相同了，那么直接返回当前的loopNode节点
                loopNode.Value = value;//找寻到了相同的值了
                return loopNode;
            }
        }while(loopNode != this.RBNIL)
        let insertNode:RBNode<K,V> = new RBNode<K,V>();//新建一个节点信息
        insertNode.Key = key;
        insertNode.Value = value;
        insertNode.InitNodeLink(this.RBNIL,this.RBNIL,this.RBNIL);
        insertNode.Parent = parentNode;
        if(this.m_CompareDivisor(key, parentNode.Key) < 0)
            parentNode.Left = insertNode;
        else
            parentNode.Right = insertNode;  
        this.m_Count++;
        return insertNode;
    }

    private FixAfterInsert(insertNode:RBNode<K,V>){
        if(insertNode == this.m_Root && insertNode.Color == RBColor.RED) //如果被修复的节点为根节点
            insertNode.Color = RBColor.BLACK;//恢复根节点颜色
        if(insertNode.Parent == this.RBNIL)//如果当前节点的父节点为空的话，就不再做遍历了
            return;
        if(insertNode.Parent.m_Color == RBColor.BLACK)//父节点只要为黑色就不做处理
            return;
        let parentNode:RBNode<K,V> = insertNode.Parent;
        let groundParentNode = parentNode.Parent; 
        if(groundParentNode.m_RightNode.m_Color == RBColor.RED && groundParentNode.m_LeftNode.m_Color == RBColor.RED  ){
            if(groundParentNode.m_LeftNode ==  parentNode){//LL上溢的情况
                groundParentNode.m_Color = RBColor.RED;//把祖父节点变更为红色
                parentNode.Color = RBColor.BLACK;//父亲节点变更为黑色
                groundParentNode.m_RightNode.m_Color = RBColor.BLACK;//叔叔节点变更为黑色
                this.FixAfterInsert(groundParentNode);//变更祖父为插入条件
            }  else if( groundParentNode.m_RightNode ==  parentNode && groundParentNode.m_LeftNode.m_Color == RBColor.RED ){//LL上溢的情况
                groundParentNode.m_Color = RBColor.RED;//把祖父节点变更为红色
                parentNode.Color = RBColor.BLACK;//父亲节点变更为黑色
                groundParentNode.m_LeftNode.m_Color = RBColor.BLACK;//叔叔节点变更为黑色
                this.FixAfterInsert(groundParentNode);//变更祖父为插入条件
            }
        }else{
            if(insertNode == parentNode.Left &&  parentNode == groundParentNode.m_LeftNode){//insert L  parent L
                groundParentNode.m_Color = RBColor.RED;//外祖父变为红色
                parentNode.Color = RBColor.BLACK;//父亲变为黑色
                this.RightRotateNode(groundParentNode);//进行一次右旋
            }else if(insertNode == parentNode.Right &&  parentNode == groundParentNode.m_RightNode){//insert R  parent R
                groundParentNode.m_Color = RBColor.RED;//外祖父变为红色
                parentNode.Color = RBColor.BLACK;//父亲变为黑色
                this.LeftRotateNode(groundParentNode);//进行一次右旋
            }else if(insertNode == parentNode.Left &&  parentNode == groundParentNode.m_RightNode){//insert L  parent R
                groundParentNode.m_Color = RBColor.RED;//外祖父变为红色
                insertNode.Color = RBColor.BLACK;//自己变为黑色 
                this.RightRotateNode(parentNode);//对父节点进行一次左旋
                this.LeftRotateNode(groundParentNode);//对祖父做一次左旋
            }else if(insertNode == parentNode.Right &&  parentNode == groundParentNode.m_LeftNode){//insert R  parent L
                groundParentNode.m_Color = RBColor.RED;//外祖父变为红色
                insertNode.Color = RBColor.BLACK;//自己变为黑色 
                this.LeftRotateNode(parentNode);//对父节点进行一次左旋
                this.RightRotateNode(groundParentNode);//对祖父做一次左旋
            } 
        }
    }

    Set(key:K,value:V):void{//设置 或者 单纯
        let insertNode:RBNode<K,V> = this.InsertNode(key,value);//首先插入一个节点
        this.FixAfterInsert(insertNode);//插入完成 进行修复当前的修复红黑树
    }

    private Remove(node:RBNode<K,V>){//删除一个节点，并返回需要修复的节点 
        if(node == this.RBNIL)//要删除的节点为空的话
            return; 
        let x:RBNode<K,V> = this.RBNIL;//真正要删除的节点
        let y:RBNode<K,V> = this.RBNIL;//要旋转的节点 
        if(node.Left == this.RBNIL || node.Right == this.RBNIL)
            x=node;
        else
            x=this.Sucessor(node);
        //左右孩子，一个为nil，一个实际存在
        if(x.Left != this.RBNIL)
            y=x.Left;
        if(x.Right != this.RBNIL)
            y=x.Right;
        y.Parent = x.Parent;
        if(x.Parent == this.RBNIL)
            this.m_Root = y;
        else if(x.Parent.m_LeftNode ==x)
            x.Parent.m_LeftNode=y;
        else 
            x.Parent.m_RightNode = y; 
        if(node != x) 
            node.Key = x.Key;
        if(x.Color == RBColor.BLACK)
            this.FixAfterDelete(y);
        this.m_Count--;
    }

    private FixAfterDelete(node:RBNode<K,V>){
        while( node.Parent != this.RBNIL && node.Color == RBColor.BLACK ){
            if(node == node.Parent.m_LeftNode){//node是左孩子
                let w:RBNode<K,V> = node.Parent.m_RightNode;
                if(w.Color == RBColor.RED){//第四种情况
                    w.Color= RBColor.BLACK;
                    node.Parent.m_Color=RBColor.RED;
                    this.LeftRotateNode(node.Parent);
                    w=node.Parent.m_RightNode;
                }
                if(w.Left.m_Color==RBColor.BLACK&&w.Right.m_Color==RBColor.BLACK){//第一种情况
                    w.Color=RBColor.RED;
                    node=node.Parent;
                }else{//不全是黑色，即2、3情况
                    if(w.Right.m_Color==RBColor.BLACK){//第三种情况
                        w.Left.m_Color=RBColor.BLACK;
                        w.Color=RBColor.RED;
                        this.RightRotateNode(w);
                        w=node.Parent.m_RightNode;
                    }
                    //第二种情况
                    w.Color=node.Parent.m_Color;
                    node.Parent.m_Color=RBColor.BLACK;
                    w.Right.m_Color=RBColor.BLACK;
                    this.LeftRotateNode(node.Parent);
                    node=this.m_Root;//退出循环
                }
            }else {//node是右孩子
                let w:RBNode<K,V> =node.Parent.m_LeftNode;
                if(w.Color==RBColor.RED){//第四种情况
                    w.Color=RBColor.BLACK;
                    node.Parent.m_Color=RBColor.RED;
                    this.RightRotateNode(node.Parent);
                    w=node.Parent.m_LeftNode;
                }
                if(w.Right.m_Color==RBColor.BLACK&&w.Left.m_Color==RBColor.BLACK){//第一种情况
                    w.Color=RBColor.RED;
                    node=node.Parent;
                }else{//不全是黑色，即2、3情况
                    if(w.Left.m_Color==RBColor.BLACK){//第三种情况
                        w.Right.m_Color=RBColor.BLACK;
                        w.Color=RBColor.RED;
                        this.LeftRotateNode(w);
                        w=node.Parent.m_LeftNode;
                    }
                    //第二种情况
                    w.Color=node.Parent.m_Color;
                    node.Parent.m_Color=RBColor.BLACK;
                    w.Left.m_Color=RBColor.BLACK;
                    this.RightRotateNode(node.Parent);
                    node=this.m_Root;//退出循环
                }
            }
        }
        node.Color=RBColor.BLACK; 
    }
    Del(key:K){//寻找当前节点是否存在于当前红黑树
        this.Remove(this.Find(key));//准备删除这个节点
    } 
}