import { GameRefObject } from "./GameRefObject";

export abstract class GameObjectData{ 
    private mGameRefObject:GameRefObject<GameObjectData>;
    public abstract Reset(); 
    
    public get GameRefObject() { 
        return this.mGameRefObject;
    };

    public Init(refObj:GameRefObject<GameObjectData>){
        this.mGameRefObject = refObj;
    }
};
 