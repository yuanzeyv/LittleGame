import { Vec2, Vec3 } from "cc";
import { GPhysicsScalingFactor } from "../Define/PhysicsConst";

export function GetGridPosByPos(physicsPos:Vec2|Vec3,mapWidth:number,mapHeight:number,isNodeAxes:boolean = false):Vec2{
    physicsPos = physicsPos.clone();
    if(isNodeAxes)
        physicsPos.multiplyScalar( 1 / GPhysicsScalingFactor);
    let posX:number = physicsPos.x - Math.floor(physicsPos.x) < 0.5 ? Math.floor(physicsPos.x) : Math.ceil(physicsPos.x);
    let posY:number = physicsPos.y - Math.floor(physicsPos.y) < 0.5 ? Math.floor(physicsPos.y) : Math.ceil(physicsPos.y);
    let gridX:number = Math.floor(mapWidth / 2) + posX; 
    let gridY:number = mapHeight - 1 - Math.floor(mapHeight / 2) -  posY ;
    return new Vec2(Math.round(gridX),Math.round(gridY)); 
}  

// export function GetPosByGridPos(gridX:number,gridY:number,mapWidth:number,mapHeig ht:number):Vec2{
//     let retPos:Vec2 = new Vec2(0,0);
//     retPos.x = (gridX - Math.floor(mapWidth / 2));
//     retPos.y = (Math.floor(mapHeight / 2) - gridY); 
//     return retPos;
// }      

// export function FindPos(startPos:Vec2,endPos:Vec2,gridInfo:PF.Grid,compress:boolean = false):number[][]{
//     let cloneGridInfo:PF.Grid = gridInfo.clone();
//     let finder:PF.Finder = new PF.BiAStarFinder ({heuristic: PF.Heuristic.chebyshev,diagonalMovement:PF.DiagonalMovement.OnlyWhenNoObstacles});
//     if( !cloneGridInfo.isWalkableAt(endPos.x,endPos.y))
//         return [];
//     if(compress)
//         return PF.Util.compressPath(finder.findPath(startPos.x,startPos.y,endPos.x,endPos.y,cloneGridInfo));
//     return finder.findPath(startPos.x,startPos.y,endPos.x,endPos.y,cloneGridInfo);
// }  