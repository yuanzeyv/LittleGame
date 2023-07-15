//本四叉树仅针对点查询，不包含特殊图形插入
import { QuatCurve, Rect, Size, Vec2 } from "cc";
type UserCustomData = any;

type PointsComparator = <T extends Point>(point1: T, point2: T) => boolean;
interface QuadTreeConfig {
    capacity?: number;
    removeEmptyNodes?: boolean;
    maximumDepth?: number | -1;
}
type DeepRequired<T> = T extends Function ? T : (T extends object ? { [P in keyof Required<T>]: DeepRequired<T[P]>; } : NonNullable<Required<T>>);

type QuadTreeConfigComplete = DeepRequired<QuadTreeConfig>;

abstract class Shape {
    public abstract Contains(point: Point): boolean;
    public abstract Intersects(range: Rect): boolean;
};
class Circle extends Shape{
    readonly mX: number;
    readonly mY: number;
    readonly mR: number;
    readonly mRPow2: number;
    constructor(x:number,y:number,r:number){
        super();
        this.mX = x;
        this.mY = y;
        this.mR = r;
        this.mRPow2 = r*r;
    }
    public Contains(point: Point): boolean {
        return point.mPos.lengthSqr() <= this.mRPow2;
    }
    public Intersects(range: Rect): boolean {
        const dX = this.mX - Math.max(range.x, Math.min(this.mX, range.x + range.width));
        const dY = this.mY - Math.max(range.y, Math.min(this.mY, range.y + range.height));
        return (dX * dX + dY * dY) <= (this.mRPow2);
    }
}
class Box extends Shape{
    readonly mX: number;
    readonly mY: number;
    readonly mW: number;
    readonly mH: number;

    public constructor(x: number, y: number, w: number, h: number, data?: UserCustomData) {
        super();
        this.mX = x;
        this.mY = y;
        this.mW = w;
        this.mH = h;
    }

    public Contains(point: Point): boolean {
        return point.mPos.x >= this.mX &&
            point.mPos.x <= this.mX + this.mW &&
            point.mPos.y >= this.mY &&
            point.mPos.y <= this.mY + this.mH;
    }

    public Intersects(range: Rect): boolean {
        return !(range.x > this.mX + this.mW|| range.x + range.width < this.mX|| range.y > this.mY + this.mH|| range.y + range.height < this.mY);
    }
}

const defaultConfig: QuadTreeConfigComplete = {
    capacity: 4,//最大容量是4
    removeEmptyNodes: false,//是否删除空的节点
    maximumDepth: -1, //最大深度
};
enum eQuartile{
    First,
    Second,
    Three,
    Four,
    Full
}
export class Point{
    public readonly mPos:Vec2 = new Vec2();//x坐标
    public readonly mUserData:UserCustomData;//用户数据
    constructor(x:number,y:number,data?:any){
        this.mPos.set(x,y);
        this.mUserData = data;
    }
}
type Tree =  Map<eQuartile,number|Tree>;
//四叉树类
export class QuadTree{
    private readonly mContainer: Rect;//当前的最大尺寸
    private mIsDivided:boolean;//是否分裂
    private mPoints: Map<number,Point>;
    private mQuartile:Map<eQuartile,QuadTree>;//象限
    private readonly mConfig: QuadTreeConfigComplete;

    constructor(container:Rect,config:QuadTreeConfigComplete = defaultConfig){
        this.mContainer = container;
        this.mConfig = config;
        this.mIsDivided = false;
        this.mPoints =  new Map<number,Point>();
    }

    public GetTree():Tree{
        return undefined
    }

    public GetAllPoints():Array<Point>{
        let pointArray:Array<Point> = new Array<Point>();
        this.GetAllPointsRecursive(pointArray);
        return pointArray;
    }
    
    private GetAllPointsRecursive(pointsList: Point[]): void {
        if (!this.mIsDivided) {
            for(let point of this.mPoints.values())
                pointsList.push(point);
            return;
        }
        for(let quadTree of this.mQuartile.values())
            quadTree.GetAllPointsRecursive(pointsList);
    }

    private GetNodePointAmount():number{
        return this.mPoints.size;
    }

    public Divide():void{
        const childMaximumDepth = this.mConfig.maximumDepth == -1 ? -1:this.mConfig.maximumDepth - 1;
        const childConfig:QuadTreeConfigComplete = Object.assign({},this.mConfig,{maximumDepth:childMaximumDepth});
        this.mIsDivided = true;
        const x:number = this.mContainer.x;
        const y:number = this.mContainer.y;
        const w:number = this.mContainer.width;
        const h:number = this.mContainer.height;
        this.mQuartile.set(eQuartile.First,new QuadTree( new Rect(x+w,y+h,w,h),childConfig));
        this.mQuartile.set(eQuartile.Second,new QuadTree( new Rect(x,y+h,w,h),childConfig));
        this.mQuartile.set(eQuartile.Three,new QuadTree( new Rect(x,y,w,h),childConfig));
        this.mQuartile.set(eQuartile.Four,new QuadTree( new Rect(x + w,y,w,h),childConfig));
        for(let point of this.mPoints.values())
            this.Insert(point);
        this.mPoints.clear();
    }

    public Remove(point:Point){
        this.RemoveRecursie(point);
    }

    public RemoveRecursie(point:Point):boolean{
        if(!this.mContainer.contains(point.mPos))//是否包含要寻找的点
            return false;
        if(!this.mIsDivided){//如果无法再分裂的话
            this.mPoints.delete(point.mUserData);
            return true;
        }
        for(let quadTree of this.mQuartile.values()){
            if(quadTree.RemoveRecursie(point)){
                break;
            }
        }
        let isEmpty:boolean = true;
        for(let quadTree of this.mQuartile.values()){
            if(quadTree.GetNodePointAmount() > 0)
                isEmpty = false;
        }
        if(isEmpty)
            this.mQuartile.clear();
        return true;
    }

    public Insert(point:Point){
        return this.InsertRecursive(point);
    }

    private InsertRecursive(point:Point){
        if(!this.mContainer.contains(point.mPos))
            return false;
        if(this.mIsDivided == false){//如果当前还没有分裂的话
            if(this.GetNodePointAmount() < this.mConfig.capacity || this.mConfig.capacity == 0){
                this.mPoints.set(point.mUserData,point);
                return true;
            }else if(this.mConfig.capacity == -1 || this.mConfig.maximumDepth > 0){
                this.Divide();//开始分裂
            }
        }
        if(this.mIsDivided){
            for(let quadTree of this.mQuartile.values()){
                if(quadTree.InsertRecursive(point))
                    return true;
            }
        }
        return false;
    }

    public Query(range:Shape):Array<Point>{
        const pointArray:Array<Point> = new Array<Point>();
        this.QueryRecursive(range,pointArray);
        return pointArray;
    }
 
    private QueryRecursive(range:Shape,pointsFound:Array<Point>):void{
        if(!range.Intersects(this.mContainer))
            return;
        if(this.mIsDivided){
            for(let quadTree of this.mQuartile.values())
                quadTree.QueryRecursive(range,pointsFound);
        } else {
            this.mPoints.forEach((point:Point)=> {
                if(range.Contains(point))
                    pointsFound.push(point)
            });
        }
    }
    private Clear():void{
        this.mPoints.clear();
        this.mIsDivided = false;
        this.mQuartile = undefined;

    }
}