export interface IVectorType{
    Key:number; 
   Pos:{x:number,y:number};   
    CustomData?:any;//自定义数据信息
    Child?:Array<IVectorType>;
};

//梦魇Map描述
export interface INightmareMapDesc{
    HeroSpawnPoint:Array<{x:number,y:number}>;//英雄的出生点位信息
    MonsterSpawnPoint:Array<{x:number,y:number}>;//怪物的出生点位信息
    GameMap:IVectorType;//游戏中的地图属性
};